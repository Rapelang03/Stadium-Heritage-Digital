import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Plus, X, Phone, Globe, MapPin, Search } from "lucide-react";
import { useAuth, apiFetch } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface Business { id: number; name: string; description: string; category: string; address: string; phone: string; whatsapp: string; website: string; status: string; ownerName: string; }

const CATS = ["General","Food & Beverage","Retail & Trade","Professional Services","Construction & Property","Transport","Health & Wellness","Education","Technology","Agriculture","Arts & Crafts","Other"];

export default function BusinessesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filtered, setFiltered] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [catFilter, setCatFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", description: "", category: "General", address: "", phone: "", whatsapp: "", website: "" });
  const [submitting, setSubmitting] = useState(false);

  const load = () => apiFetch("/businesses").then(setBusinesses).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);
  useEffect(() => {
    let b = businesses;
    if (catFilter !== "All") b = b.filter(x => x.category === catFilter);
    if (search) b = b.filter(x => x.name.toLowerCase().includes(search.toLowerCase()) || x.description.toLowerCase().includes(search.toLowerCase()));
    setFiltered(b);
  }, [businesses, catFilter, search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast({ title: "Sign in required", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      await apiFetch("/businesses", { method: "POST", body: JSON.stringify(form) });
      toast({ title: "Business registered!", description: "Pending admin approval. You'll be listed once reviewed." });
      setShowForm(false);
      setForm({ name: "", description: "", category: "General", address: "", phone: "", whatsapp: "", website: "" });
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    } finally { setSubmitting(false); }
  };

  const CAT_ICONS: Record<string, string> = {
    "Food & Beverage": "🍽️", "Retail & Trade": "🛍️", "Professional Services": "💼",
    "Construction & Property": "🏗️", "Transport": "🚗", "Health & Wellness": "🏥",
    "Education": "📚", "Technology": "💻", "Agriculture": "🌱",
    "Arts & Crafts": "🎨", "General": "🏪", "Other": "📦",
  };

  return (
    <div className="min-h-screen hero-bg py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="section-label mb-1">Community</p>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold font-serif flex items-center gap-3"><Building2 className="h-9 w-9 text-primary" />Business Directory</h1>
              <p className="text-muted-foreground mt-1">Discover and support local businesses in Stadium Area constituency</p>
            </div>
            {user ? (
              <button onClick={() => setShowForm(true)} className="btn-gold"><Plus className="h-4 w-4" />Register Business</button>
            ) : (
              <Link href="/login"><button className="btn-outline-gold">Sign in to register</button></Link>
            )}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search businesses…" className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", ...CATS].map(c => (
              <button key={c} onClick={() => setCatFilter(c)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-display border transition-all ${catFilter === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}>{c}</button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20"><span className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Building2 className="h-14 w-14 text-muted mx-auto mb-3" />
            <p className="text-muted-foreground">{search || catFilter !== "All" ? "No businesses match your search." : "No approved businesses yet."}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((b, i) => (
              <motion.div key={b.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="heritage-card p-5 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center text-2xl flex-shrink-0">
                    {CAT_ICONS[b.category] || "🏪"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold font-display truncate">{b.name}</h3>
                    <span className="badge-gold text-xs">{b.category}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex-1 line-clamp-2 mb-3">{b.description}</p>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3 flex-shrink-0" /><span className="truncate">{b.address}</span></div>
                  <div className="flex items-center gap-1.5"><Phone className="h-3 w-3 flex-shrink-0" />{b.phone}</div>
                  {b.website && <div className="flex items-center gap-1.5"><Globe className="h-3 w-3 flex-shrink-0" /><a href={b.website} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate">{b.website}</a></div>}
                </div>
                {b.whatsapp && (
                  <a href={`https://wa.me/${b.whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" className="btn-gold text-xs mt-3 justify-center">WhatsApp</a>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg heritage-card p-6 shadow-2xl my-4">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold font-serif">Register Your Business</h2>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium font-display mb-1">Business Name</label>
                    <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} required placeholder="Your Business Name" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium font-display mb-1">Description</label>
                    <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} required rows={2} placeholder="What does your business offer?" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-display mb-1">Category</label>
                    <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                      {CATS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-display mb-1">Phone</label>
                    <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} required placeholder="+266 5800 0000" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium font-display mb-1">Address</label>
                    <input value={form.address} onChange={e => setForm(f => ({...f, address: e.target.value}))} required placeholder="Street, Village, Maseru" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-display mb-1">WhatsApp (optional)</label>
                    <input value={form.whatsapp} onChange={e => setForm(f => ({...f, whatsapp: e.target.value}))} placeholder="+266 5800 0000" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-display mb-1">Website (optional)</label>
                    <input value={form.website} onChange={e => setForm(f => ({...f, website: e.target.value}))} placeholder="https://..." className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Businesses require admin approval before being listed publicly.</p>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-semibold font-display hover:bg-muted transition-all">Cancel</button>
                  <button type="submit" disabled={submitting} className="btn-gold flex-1 justify-center">
                    {submitting ? <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : "Submit for Review"}
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
