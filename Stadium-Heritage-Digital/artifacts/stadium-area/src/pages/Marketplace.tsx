import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Plus, X, Search, Send, Tag, MapPin } from "lucide-react";
import { useAuth, apiFetch } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface Post { id: number; title: string; description: string; price: string; category: string; status: string; createdAt: string; userName: string; userVillage: string; userWhatsapp: string; userId: number; }

const CATEGORIES = ["General","Food & Produce","Clothing & Textiles","Electronics","Furniture","Services","Livestock","Tools","Other"];

export default function MarketplacePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filtered, setFiltered] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", price: "", category: "General" });
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [msgTarget, setMsgTarget] = useState<Post | null>(null);
  const [msgText, setMsgText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = () => apiFetch("/marketplace").then(setPosts).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);
  useEffect(() => {
    let p = posts;
    if (catFilter !== "All") p = p.filter(x => x.category === catFilter);
    if (search) p = p.filter(x => x.title.toLowerCase().includes(search.toLowerCase()) || x.description.toLowerCase().includes(search.toLowerCase()));
    setFiltered(p);
  }, [posts, catFilter, search]);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast({ title: "Sign in required", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      await apiFetch("/marketplace", { method: "POST", body: JSON.stringify(form) });
      toast({ title: "Listing posted!" });
      setShowForm(false);
      setForm({ title: "", description: "", price: "", category: "General" });
      load();
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    } finally { setSubmitting(false); }
  };

  const sendMsg = async () => {
    if (!user || !msgTarget || !msgText.trim()) return;
    setSubmitting(true);
    try {
      await apiFetch("/messages", { method: "POST", body: JSON.stringify({ recipientId: msgTarget.userId, postId: msgTarget.id, content: msgText }) });
      toast({ title: "Message sent!" });
      setMsgTarget(null); setMsgText("");
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    } finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen hero-bg py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="section-label mb-1">Community</p>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold font-serif flex items-center gap-3">
                <ShoppingBag className="h-9 w-9 text-primary" />Community Marketplace
              </h1>
              <p className="text-muted-foreground mt-1">Buy, sell, and trade within Stadium Area constituency</p>
            </div>
            {user && (
              <button onClick={() => setShowForm(true)} className="btn-gold">
                <Plus className="h-4 w-4" />Post Listing
              </button>
            )}
            {!user && (
              <Link href="/login"><button className="btn-outline-gold">Sign in to post</button></Link>
            )}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search listings…"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", ...CATEGORIES].map(c => (
              <button key={c} onClick={() => setCatFilter(c)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-display border transition-all ${catFilter === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}>{c}</button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20"><span className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-14 w-14 text-muted mx-auto mb-3" />
            <p className="text-muted-foreground">No listings found</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="heritage-card p-5 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="badge-gold">{p.category}</span>
                  <span className="text-lg font-bold text-primary font-display">M {p.price}</span>
                </div>
                <h3 className="font-semibold font-display text-base mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground flex-1 line-clamp-3">{p.description}</p>
                <div className="mt-3 pt-3 border-t border-border/50">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" />{p.userVillage} · {p.userName}
                  </div>
                  <div className="flex gap-2">
                    {p.userWhatsapp && (
                      <a href={`https://wa.me/${p.userWhatsapp.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" className="btn-gold text-xs px-3 py-1.5 flex-1 justify-center">WhatsApp</a>
                    )}
                    {user && user.id !== p.userId && (
                      <button onClick={() => setMsgTarget(p)} className="btn-outline-gold text-xs px-3 py-1.5 flex-1 justify-center">Message</button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* New Listing Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md heritage-card p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold font-serif">New Listing</h2>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handlePost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium font-display mb-1">Title</label>
                  <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} required placeholder="What are you selling?" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium font-display mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} required rows={3} placeholder="Describe your item or service…" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium font-display mb-1">Price (M)</label>
                    <input value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))} required placeholder="150" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-display mb-1">Category</label>
                    <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-semibold font-display hover:bg-muted transition-all">Cancel</button>
                  <button type="submit" disabled={submitting} className="btn-gold flex-1 justify-center">
                    {submitting ? <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : "Post Listing"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Message Modal */}
        {msgTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm heritage-card p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold font-serif">Message Seller</h2>
                <button onClick={() => setMsgTarget(null)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">About: <span className="font-medium text-foreground">{msgTarget.title}</span></p>
              <textarea value={msgText} onChange={e => setMsgText(e.target.value)} rows={4} placeholder="Write your message…" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 mb-3" />
              <div className="flex gap-3">
                <button onClick={() => setMsgTarget(null)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-semibold font-display hover:bg-muted transition-all">Cancel</button>
                <button onClick={sendMsg} disabled={submitting || !msgText.trim()} className="btn-gold flex-1 justify-center">
                  <Send className="h-4 w-4" />Send
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
