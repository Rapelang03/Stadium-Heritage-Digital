import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Map, Phone, MapPin, Search } from "lucide-react";
import { apiFetch } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface Place { id: number; name: string; nameST: string; category: string; description: string; descriptionST: string; address: string; phone: string; }

const CAT_ICONS: Record<string, string> = {
  "Sports & Entertainment": "🏟️", "Religious & Heritage": "⛪", "Heritage & Royalty": "👑",
  "Culture & History": "🏛️", "Community & Recreation": "🌿", "Parks & Recreation": "🌳",
  "Education & Innovation": "🔬", "Shopping & Culture": "🛍️", "Education & Culture": "🎓",
  "Nature & Recreation": "🏞️", "Shopping & Commerce": "🏪", "Education & Heritage": "📚",
};

export default function TourismPage() {
  const { language, setLanguage, t } = useLanguage();
  const [places, setPlaces] = useState<Place[]>([]);
  const [filtered, setFiltered] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  useEffect(() => { apiFetch("/tourism").then(setPlaces).finally(() => setLoading(false)); }, []);
  useEffect(() => {
    let p = places;
    if (catFilter !== "All") p = p.filter(x => x.category === catFilter);
    if (search) p = p.filter(x =>
      x.name.toLowerCase().includes(search.toLowerCase()) ||
      x.description.toLowerCase().includes(search.toLowerCase()) ||
      x.nameST.toLowerCase().includes(search.toLowerCase()) ||
      x.descriptionST.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(p);
  }, [places, catFilter, search]);

  const cats = [...new Set(places.map(p => p.category))];

  return (
    <div className="min-h-screen hero-bg py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="section-label mb-1">Explore</p>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold font-serif flex items-center gap-3"><Map className="h-9 w-9 text-primary" />{t("tourismDirectory")}</h1>
              <p className="text-muted-foreground mt-1">{language === 'EN' ? "Discover the landmarks, culture, and attractions of Constituency No. 32" : "Fumana libaka, setso le ho tsosa takatso naheng e bitsoang Lesotho Ka Sebakeng sa Setadieme."}</p>
            </div>
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button onClick={() => setLanguage("EN")} className={`px-4 py-2 text-sm font-semibold font-display transition-all ${language === "EN" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{t("english")}</button>
              <button onClick={() => setLanguage("ST")} className={`px-4 py-2 text-sm font-semibold font-display transition-all ${language === "ST" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{t("sesotho")}</button>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t("searchPlaces")} className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", ...cats].map(c => (
              <button key={c} onClick={() => setCatFilter(c)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-display border transition-all ${catFilter === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}>
                {CAT_ICONS[c] && <span className="mr-1">{CAT_ICONS[c]}</span>}{c === 'All' ? t('all') : c}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20"><span className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20"><Map className="h-14 w-14 text-muted mx-auto mb-3" /><p className="text-muted-foreground">{t("noPlaces")}</p></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="heritage-card p-5 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-xl gold-gradient flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                    {CAT_ICONS[p.category] || "📍"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold font-display leading-snug">{language === "EN" ? p.name : (p.nameST || p.name)}</h3>
                    <span className="badge-gold text-xs">{p.category}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex-1 mb-3 line-clamp-4">
                  {language === "EN" ? p.description : (p.descriptionST || p.description)}
                </p>
                <div className="space-y-1.5 text-xs text-muted-foreground border-t border-border/50 pt-3">
                  <div className="flex items-start gap-1.5"><MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" /><span>{p.address}</span></div>
                  {p.phone && <div className="flex items-center gap-1.5"><Phone className="h-3 w-3 flex-shrink-0" />{p.phone}</div>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
