import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Plus, X, MapPin, User, Clock } from "lucide-react";
import { useAuth, apiFetch } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface Alert { id: number; title: string; description: string; severity: string; location: string; status: string; createdAt: string; userName: string; }

const SEVERITY_STYLES: Record<string, string> = {
  low: "badge-green",
  medium: "badge-gold",
  high: "bg-orange-500/15 text-orange-500 border border-orange-500/25 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium font-display tracking-wide",
  critical: "bg-red-500/15 text-red-500 border border-red-500/25 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium font-display tracking-wide",
};
const SEVERITY_ICONS: Record<string, string> = { low: "🟢", medium: "🟡", high: "🟠", critical: "🔴" };

export default function MokhosiPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", severity: "medium", location: "" });
  const [submitting, setSubmitting] = useState(false);

  const load = () => apiFetch("/mokhosi").then(setAlerts).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast({ title: "Sign in required", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      await apiFetch("/mokhosi", { method: "POST", body: JSON.stringify(form) });
      toast({ title: "Alert reported!", description: user.role === "admin" ? "Published immediately." : "Pending admin review." });
      setShowForm(false);
      setForm({ title: "", description: "", severity: "medium", location: "" });
      load();
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    } finally { setSubmitting(false); }
  };

  const timeAgo = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const h = Math.floor(diff / 3600000);
    if (h < 1) return `${Math.floor(diff / 60000)}m ago`;
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  return (
    <div className="min-h-screen hero-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="section-label mb-1">Crisis & Community</p>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold font-serif flex items-center gap-3"><AlertTriangle className="h-9 w-9 text-secondary" />Mokhosi Alerts</h1>
              <p className="text-muted-foreground mt-1">Emergency alerts, safety notices, and crisis information for Stadium Area</p>
            </div>
            {user ? (
              <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold font-display bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all shadow-sm">
                <Plus className="h-4 w-4" />Report Alert
              </button>
            ) : (
              <Link href="/login"><button className="btn-outline-gold">Sign in to report</button></Link>
            )}
          </div>
        </motion.div>

        {/* Banner */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="rounded-xl border border-secondary/30 bg-secondary/10 p-4 flex items-start gap-3 mb-7">
          <AlertTriangle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold font-display text-secondary">Community Safety Network</p>
            <p className="text-sm text-muted-foreground mt-0.5">Mokhosi alerts are verified by our admin team. For life-threatening emergencies, call <strong>112</strong> (police) or <strong>121</strong> (ambulance).</p>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20"><span className="h-8 w-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" /></div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-20">
            <AlertTriangle className="h-14 w-14 text-muted mx-auto mb-3" />
            <p className="text-muted-foreground">No active alerts. Community is safe!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className={`heritage-card p-5 border-l-4 ${a.severity === "critical" ? "border-l-red-500" : a.severity === "high" ? "border-l-orange-500" : a.severity === "medium" ? "border-l-primary" : "border-l-accent"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span>{SEVERITY_ICONS[a.severity] || "⚪"}</span>
                      <span className={SEVERITY_STYLES[a.severity] || "badge-gold"}>{a.severity.toUpperCase()}</span>
                    </div>
                    <h3 className="font-semibold font-display text-lg">{a.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{a.description}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                      {a.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{a.location}</span>}
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{a.userName}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{timeAgo(a.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md heritage-card p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold font-serif">Report an Alert</h2>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium font-display mb-1">Alert Title</label>
                  <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} required placeholder="Brief description of the alert" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium font-display mb-1">Details</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} required rows={3} placeholder="Provide as much detail as possible…" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium font-display mb-1">Severity</label>
                    <select value={form.severity} onChange={e => setForm(f => ({...f, severity: e.target.value}))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-display mb-1">Location</label>
                    <input value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} placeholder="Village / street" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>
                {user?.role !== "admin" && <p className="text-xs text-muted-foreground">Alerts are reviewed before publishing.</p>}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-semibold font-display hover:bg-muted transition-all">Cancel</button>
                  <button type="submit" disabled={submitting} className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold font-display bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all">
                    {submitting ? <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : "Submit Alert"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
