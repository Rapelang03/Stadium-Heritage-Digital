import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Plus, X, MapPin, Clock, User } from "lucide-react";
import { useAuth, apiFetch } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface Event { id: number; title: string; description: string; location: string; eventDate: string; status: string; createdAt: string; userName: string; userId: number; }

export default function EventsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", location: "", eventDate: "" });
  const [submitting, setSubmitting] = useState(false);

  const load = () => apiFetch("/events").then(setEvents).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast({ title: "Sign in required", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      await apiFetch("/events", { method: "POST", body: JSON.stringify(form) });
      toast({ title: "Event submitted!", description: user.role === "admin" ? "Published." : "Pending admin review." });
      setShowForm(false);
      setForm({ title: "", description: "", location: "", eventDate: "" });
      load();
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    } finally { setSubmitting(false); }
  };

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString("en-LS", { day: "numeric", month: "long", year: "numeric" }); }
    catch { return d; }
  };

  return (
    <div className="min-h-screen hero-bg py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="section-label mb-1">Community</p>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold font-serif flex items-center gap-3"><Calendar className="h-9 w-9 text-primary" />Events & Announcements</h1>
              <p className="text-muted-foreground mt-1">Community events, meetings, and announcements for Stadium Area</p>
            </div>
            {user ? (
              <button onClick={() => setShowForm(true)} className="btn-gold"><Plus className="h-4 w-4" />Post Event</button>
            ) : (
              <Link href="/login"><button className="btn-outline-gold">Sign in to post</button></Link>
            )}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20"><span className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="h-14 w-14 text-muted mx-auto mb-3" />
            <p className="text-muted-foreground">No events yet. Be the first to post!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((ev, i) => (
              <motion.div key={ev.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="heritage-card p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl gold-gradient flex flex-col items-center justify-center shadow-md text-primary-foreground">
                    <span className="text-lg font-bold leading-none">{new Date(ev.eventDate).getDate() || "?"}</span>
                    <span className="text-[10px] font-display uppercase tracking-wide">
                      {ev.eventDate ? new Date(ev.eventDate).toLocaleDateString("en-LS", { month: "short" }) : ""}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold font-display text-lg">{ev.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{ev.description}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.location}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatDate(ev.eventDate)}</span>
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{ev.userName}</span>
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
                <h2 className="text-xl font-bold font-serif">Post Event</h2>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium font-display mb-1">Event Title</label>
                  <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} required placeholder="Community Meeting, Sports Day…" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium font-display mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} required rows={3} placeholder="What, why, and who should attend…" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium font-display mb-1">Location</label>
                    <input value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} required placeholder="Venue / Area" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-display mb-1">Date</label>
                    <input type="date" value={form.eventDate} onChange={e => setForm(f => ({...f, eventDate: e.target.value}))} required className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>
                {user?.role !== "admin" && <p className="text-xs text-muted-foreground">Events are reviewed by admin before publishing.</p>}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-semibold font-display hover:bg-muted transition-all">Cancel</button>
                  <button type="submit" disabled={submitting} className="btn-gold flex-1 justify-center">
                    {submitting ? <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : "Submit"}
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
