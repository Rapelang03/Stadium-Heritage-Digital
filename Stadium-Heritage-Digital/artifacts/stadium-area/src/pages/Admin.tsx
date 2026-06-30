import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Shield, Users, Building2, Megaphone, AlertTriangle, Check, X, Trash2, BarChart3, Calendar } from "lucide-react";
import { useAuth, apiFetch } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Stats { userCount: number; pendingBusinesses: number; pendingEvents: number; pendingAlerts: number; pendingAds: number; }
interface User { id: number; name: string; email: string; whatsapp: string; village: string; role: string; createdAt: string; }
interface Business { id: number; name: string; category: string; address: string; phone: string; status: string; ownerName: string; ownerEmail: string; createdAt: string; }
interface Event { id: number; title: string; location: string; eventDate: string; status: string; userName: string; }
interface Alert { id: number; title: string; severity: string; location: string; status: string; userName: string; }
interface Ad { id: number; title: string; description: string; contactInfo: string; status: string; ownerName: string; ownerEmail: string; }

type Tab = "stats" | "users" | "businesses" | "events" | "alerts" | "ads";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [, nav] = useLocation();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("stats");
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) nav("/login");
  }, [user, loading, nav]);

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    apiFetch("/admin/stats").then(setStats).catch(() => {});
    apiFetch("/admin/users").then(setUsers).catch(() => {});
    apiFetch("/businesses/all").then(setBusinesses).catch(() => {});
    apiFetch("/events").then(setEvents).catch(() => {});
    apiFetch("/mokhosi").then(setAlerts).catch(() => {});
    apiFetch("/advertisements/all").then(setAds).catch(() => {});
  }, [user]);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><span className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!user || user.role !== "admin") return null;

  const act = async (path: string, method = "PATCH", body?: any) => {
    try {
      await apiFetch(path, { method, body: body ? JSON.stringify(body) : undefined });
      toast({ title: "Done!" });
      apiFetch("/admin/stats").then(setStats).catch(() => {});
      apiFetch("/admin/users").then(setUsers).catch(() => {});
      apiFetch("/businesses/all").then(setBusinesses).catch(() => {});
      apiFetch("/events").then(setEvents).catch(() => {});
      apiFetch("/mokhosi").then(setAlerts).catch(() => {});
      apiFetch("/advertisements/all").then(setAds).catch(() => {});
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    }
  };

  const TABS: { id: Tab; label: string; icon: any; badge?: number }[] = [
    { id: "stats", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users, badge: stats?.userCount },
    { id: "businesses", label: "Businesses", icon: Building2, badge: stats?.pendingBusinesses },
    { id: "events", label: "Events", icon: Calendar, badge: stats?.pendingEvents },
    { id: "alerts", label: "Alerts", icon: AlertTriangle, badge: stats?.pendingAlerts },
    { id: "ads", label: "Adverts", icon: Megaphone, badge: stats?.pendingAds },
  ];

  return (
    <div className="min-h-screen hero-bg py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="section-label mb-1">Administration</p>
          <h1 className="text-4xl font-bold font-serif flex items-center gap-3"><Shield className="h-9 w-9 text-primary" />Admin Panel</h1>
          <p className="text-muted-foreground mt-1">Manage all community content, users, and approvals</p>
        </motion.div>

        {/* Tab Bar */}
        <div className="flex gap-1 bg-muted/50 rounded-xl p-1 mb-6 flex-wrap">
          {TABS.map(({ id, label, icon: Icon, badge }) => (
            <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold font-display transition-all flex-1 min-w-[100px] justify-center ${tab === id ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted"}`}>
              <Icon className="h-4 w-4" />{label}
              {badge !== undefined && badge > 0 && <span className="bg-secondary text-secondary-foreground text-xs rounded-full px-1.5">{badge}</span>}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "stats" && stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Total Members", value: stats.userCount, icon: Users, color: "text-primary" },
              { label: "Pending Businesses", value: stats.pendingBusinesses, icon: Building2, color: "text-secondary" },
              { label: "Pending Events", value: stats.pendingEvents, icon: Calendar, color: "text-primary" },
              { label: "Pending Alerts", value: stats.pendingAlerts, icon: AlertTriangle, color: "text-secondary" },
              { label: "Pending Adverts", value: stats.pendingAds, icon: Megaphone, color: "text-primary" },
            ].map(({ label, value, icon: Icon, color }) => (
              <motion.div key={label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="heritage-card p-5 text-center">
                <Icon className={`h-8 w-8 ${color} mx-auto mb-2`} />
                <p className="text-3xl font-bold font-display">{value}</p>
                <p className="text-xs text-muted-foreground mt-1 font-display">{label}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Users */}
        {tab === "users" && (
          <div className="heritage-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    {["Name", "Email", "Village", "Role", "Joined", "Actions"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-semibold font-display text-xs text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{u.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{u.village}</td>
                      <td className="px-4 py-3"><span className={u.role === "admin" ? "badge-terra" : "badge-gold"}>{u.role}</span></td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {u.role !== "admin" && u.id !== user.id && (
                            <button onClick={() => act(`/admin/users/${u.id}/role`, "PATCH", { role: "admin" })} className="text-xs px-2 py-1 rounded border border-primary/40 text-primary hover:bg-primary/10 font-display">Make Admin</button>
                          )}
                          {u.role === "admin" && u.id !== user.id && (
                            <button onClick={() => act(`/admin/users/${u.id}/role`, "PATCH", { role: "member" })} className="text-xs px-2 py-1 rounded border border-border text-muted-foreground hover:bg-muted font-display">Demote</button>
                          )}
                          {u.id !== user.id && (
                            <button onClick={() => act(`/admin/users/${u.id}`, "DELETE")} className="text-xs px-2 py-1 rounded border border-destructive/40 text-destructive hover:bg-destructive/10 font-display">Delete</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Businesses */}
        {tab === "businesses" && (
          <div className="space-y-3">
            {businesses.length === 0 && <div className="text-center py-10 text-muted-foreground">No businesses yet.</div>}
            {businesses.map(b => (
              <div key={b.id} className="heritage-card p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold font-display">{b.name}</h3>
                    <span className="badge-gold text-xs">{b.category}</span>
                    <span className={`text-xs font-display px-2 py-0.5 rounded-full border ${b.status === "approved" ? "badge-green" : b.status === "rejected" ? "badge-terra" : "badge-gold"}`}>{b.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{b.ownerName} · {b.ownerEmail} · {b.address}</p>
                </div>
                {b.status === "pending" && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => act(`/businesses/${b.id}/status`, "PATCH", { status: "approved" })} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-semibold font-display hover:bg-accent/90 transition-all"><Check className="h-3 w-3" />Approve</button>
                    <button onClick={() => act(`/businesses/${b.id}/status`, "PATCH", { status: "rejected" })} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground text-xs font-semibold font-display hover:bg-destructive/90 transition-all"><X className="h-3 w-3" />Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Events */}
        {tab === "events" && (
          <div className="space-y-3">
            {events.length === 0 && <div className="text-center py-10 text-muted-foreground">No events submitted.</div>}
            {events.map(e => (
              <div key={e.id} className="heritage-card p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold font-display">{e.title}</h3>
                    <span className={`text-xs font-display px-2 py-0.5 rounded-full border ${e.status === "active" ? "badge-green" : "badge-gold"}`}>{e.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{e.userName} · {e.location} · {e.eventDate}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {e.status !== "active" && <button onClick={() => act(`/events/${e.id}/status`, "PATCH", { status: "active" })} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-semibold font-display hover:bg-accent/90 transition-all"><Check className="h-3 w-3" />Approve</button>}
                  <button onClick={() => act(`/events/${e.id}`, "DELETE")} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-destructive/40 text-destructive text-xs font-semibold font-display hover:bg-destructive/10 transition-all"><Trash2 className="h-3 w-3" /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Alerts */}
        {tab === "alerts" && (
          <div className="space-y-3">
            {alerts.length === 0 && <div className="text-center py-10 text-muted-foreground">No alerts submitted.</div>}
            {alerts.map(a => (
              <div key={a.id} className={`heritage-card p-4 flex items-center gap-4 border-l-4 ${a.severity === "critical" ? "border-l-red-500" : a.severity === "high" ? "border-l-orange-500" : "border-l-primary"}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold font-display">{a.title}</h3>
                    <span className="badge-terra text-xs">{a.severity}</span>
                    <span className="badge-gold text-xs">{a.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{a.userName} · {a.location}</p>
                </div>
                {a.status === "active" && (
                  <button onClick={() => act(`/mokhosi/${a.id}/resolve`, "PATCH")} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-semibold font-display hover:bg-accent/90 transition-all">Resolve</button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Ads */}
        {tab === "ads" && (
          <div className="space-y-3">
            {ads.length === 0 && <div className="text-center py-10 text-muted-foreground">No advertisements submitted.</div>}
            {ads.map(a => (
              <div key={a.id} className="heritage-card p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold font-display">{a.title}</h3>
                    <span className={`text-xs font-display px-2 py-0.5 rounded-full border ${a.status === "approved" ? "badge-green" : a.status === "rejected" ? "badge-terra" : "badge-gold"}`}>{a.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{a.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{a.ownerName} · {a.ownerEmail} · {a.contactInfo}</p>
                </div>
                {a.status === "pending" && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => act(`/advertisements/${a.id}/status`, "PATCH", { status: "approved" })} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-semibold font-display hover:bg-accent/90 transition-all"><Check className="h-3 w-3" />Approve</button>
                    <button onClick={() => act(`/advertisements/${a.id}/status`, "PATCH", { status: "rejected" })} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground text-xs font-semibold font-display hover:bg-destructive/90 transition-all"><X className="h-3 w-3" />Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
