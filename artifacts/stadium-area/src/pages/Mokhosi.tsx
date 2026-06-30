import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Megaphone, Plus, X, AlertTriangle, MapPin, MessageSquare, Send, ThumbsUp, Filter } from "lucide-react";
import { useAuth, apiFetch } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

interface Alert { id: number; title: string; description: string; location: string; severity: string; status: string; createdAt: string; userName: string; userId: number; likes: number; comments: Comment[]; }
interface Comment { id: number; alertId: number; userName: string; userId: number; content: string; createdAt: string; }

const SEVERITY_OPTIONS = ["Info", "Warning", "Urgent"];

const SEVERITY_STYLES: Record<string, string> = {
  "Info": "bg-blue-500",
  "Warning": "bg-amber-500",
  "Urgent": "bg-red-500",
};

export default function MokhosiPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filtered, setFiltered] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [sevFilter, setSevFilter] = useState("All");
  const [form, setForm] = useState({ title: "", description: "", location: "", severity: "Info" });
  const [submitting, setSubmitting] = useState(false);
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null);
  const [commentText, setCommentText] = useState<Record<number, string>>({});
  const [commentSubmitting, setCommentSubmitting] = useState<Record<number, boolean>>({});

  const load = () => apiFetch("/mokhosi").then(setAlerts).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);
  useEffect(() => {
    let a = alerts;
    if (sevFilter !== "All") a = a.filter(x => x.severity === sevFilter);
    setFiltered(a);
  }, [alerts, sevFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast({ title: "Sign in required", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      await apiFetch("/mokhosi", { method: "POST", body: JSON.stringify(form) });
      toast({ title: "Alert submitted!", description: "Pending admin review." });
      setShowForm(false);
      setForm({ title: "", description: "", location: "", severity: "Info" });
      load();
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    } finally { setSubmitting(false); }
  };

  const handleLike = async (alertId: number) => {
    if (!user) { toast({ title: "Sign in required", variant: "destructive" }); return; }
    try {
      await apiFetch(`/mokhosi/${alertId}/like`, { method: "POST" });
      load();
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    }
  };

  const handleComment = async (alertId: number) => {
    const text = commentText[alertId]?.trim();
    if (!user || !text) return;
    setCommentSubmitting(prev => ({ ...prev, [alertId]: true }));
    try {
      await apiFetch(`/mokhosi/${alertId}/comments`, { method: "POST", body: JSON.stringify({ content: text }) });
      toast({ title: "Comment added!" });
      setCommentText(prev => ({ ...prev, [alertId]: "" }));
      load();
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    } finally { setCommentSubmitting(prev => ({ ...prev, [alertId]: false })); }
  };

  const toggleExpand = (id: number) => {
    setExpandedAlert(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen hero-bg py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="section-label mb-1">{language === "EN" ? "Safety" : "Tshireletso"}</p>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold font-serif flex items-center gap-3">
                <Megaphone className="h-9 w-9 text-primary" />{t("mokhosi")}
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === 'EN'
                  ? "Important safety alerts and announcements for Stadium Area community"
                  : "Ditlhahisoleseding tse bohlokoa tsa tshireletso le ditsebiso bakeng sa Sechaba sa Sebakeng sa Setadieme"}
              </p>
            </div>
            {user ? (
              <button onClick={() => setShowForm(true)} className="btn-gold"><Plus className="h-4 w-4" />{language === "EN" ? "Report Alert" : "Tsebisa Lehlokomelo"}</button>
            ) : (
              <Link href="/login"><button className="btn-outline-gold">{language === "EN" ? "Sign in to report" : "Kena ho tsebisa"}</button></Link>
            )}
          </div>
        </motion.div>

        {/* Severity filter */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2 mb-6">
          <Filter className="h-4 w-4 text-muted-foreground mt-1" />
          {["All", "Info", "Warning", "Urgent"].map(s => (
            <button key={s} onClick={() => setSevFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-display border transition-all ${sevFilter === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}>
              {s === "All" ? (language === "EN" ? "All" : "Tsohle") : s}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20"><span className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Megaphone className="h-14 w-14 text-muted mx-auto mb-3" />
            <p className="text-muted-foreground">{language === "EN" ? "No alerts at this time." : "Ha ho ditlhahisoleseding ha joale."}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((alert, i) => (
              <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="heritage-card p-5">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white ${SEVERITY_STYLES[alert.severity] || "bg-muted-foreground"}`}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold font-display text-lg">{alert.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                      </div>
                      <span className={`badge-gold text-xs whitespace-nowrap ${alert.severity === "Urgent" ? "bg-red-100 text-red-700 border-red-200" : alert.severity === "Warning" ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-blue-100 text-blue-700 border-blue-200"}`}>{alert.severity}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{alert.location}</span>
                      <span>{new Date(alert.createdAt).toLocaleDateString("en-LS")}</span>
                      <span>{alert.userName}</span>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
                      <button onClick={() => handleLike(alert.id)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <ThumbsUp className="h-4 w-4" />{alert.likes || 0}
                      </button>
                      <button onClick={() => toggleExpand(alert.id)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <MessageSquare className="h-4 w-4" />{(alert.comments?.length || 0) + (language === "EN" ? " Comments" : " Dikgetho")}
                      </button>
                    </div>
                    {/* Comments section */}
                    {expandedAlert === alert.id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 pt-3 border-t border-border/50">
                        {alert.comments && alert.comments.length > 0 && (
                          <div className="space-y-2 mb-3">
                            {alert.comments.map((c) => (
                              <div key={c.id} className="bg-muted/50 rounded-lg p-2.5 text-sm">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-semibold text-xs">{c.userName}</span>
                                  <span className="text-[10px] text-muted-foreground">{new Date(c.createdAt).toLocaleDateString("en-LS")}</span>
                                </div>
                                <p className="text-muted-foreground">{c.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {user && (
                          <div className="flex gap-2">
                            <input
                              value={commentText[alert.id] || ""}
                              onChange={e => setCommentText(prev => ({ ...prev, [alert.id]: e.target.value }))}
                              placeholder={language === "EN" ? "Add a comment..." : "Kenya kgetho..."}
                              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                              onKeyDown={e => e.key === "Enter" && handleComment(alert.id)}
                            />
                            <button onClick={() => handleComment(alert.id)} disabled={commentSubmitting[alert.id] || !commentText[alert.id]?.trim()} className="btn-gold px-3">
                              <Send className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                        {!user && (
                          <p className="text-xs text-muted-foreground">
                            <Link href="/login" className="text-primary hover:underline">{language === "EN" ? "Sign in" : "Kena"}</Link> {language === "EN" ? "to join the discussion" : "ho kenya kgetho"}
                          </p>
                        )}
                      </motion.div>
                    )}
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
                <h2 className="text-xl font-bold font-serif">{language === "EN" ? "Report Alert" : "Tsebisa Lehlokomelo"}</h2>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium font-display mb-1">{language === "EN" ? "Alert Title" : "Thaetlele ya Lehlokomelo"}</label>
                  <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} required placeholder={language === "EN" ? "Short title..." : "Thaetlele e khutsoanyane..."} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium font-display mb-1">{language === "EN" ? "Description" : "Tlhaloso"}</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} required rows={3} placeholder={language === "EN" ? "What is happening?" : "Ho etsahalang?"} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium font-display mb-1">{language === "EN" ? "Location" : "Sebaka"}</label>
                    <input value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} required placeholder={language === "EN" ? "Village/Area" : "Motse/Sebaka"} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-display mb-1">{language === "EN" ? "Severity" : "Bohlokwa"}</label>
                    <select value={form.severity} onChange={e => setForm(f => ({...f, severity: e.target.value}))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                      {SEVERITY_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{language === "EN" ? "Alerts are reviewed by admin before publishing." : "Ditlhahisoleseding di hlahlojoa ke mookameli pele di phatlalatswa."}</p>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-semibold font-display hover:bg-muted transition-all">{language === "EN" ? "Cancel" : "Hlakola"}</button>
                  <button type="submit" disabled={submitting} className="btn-gold flex-1 justify-center">
                    {submitting ? <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : (language === "EN" ? "Submit" : "Kengela")}
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
