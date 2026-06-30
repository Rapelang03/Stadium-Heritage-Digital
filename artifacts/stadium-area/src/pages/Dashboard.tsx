import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { User, Package, MessageSquare, Building2, Megaphone, Calendar, Shield, LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/contexts/AuthContext";

interface MyPost { id: number; title: string; category: string; status: string; createdAt: string; }
interface InboxMsg { id: number; senderName: string; content: string; postId: number | null; read: string; createdAt: string; }

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const [, nav] = useLocation();
  const { toast } = useToast();
  const [myPosts, setMyPosts] = useState<MyPost[]>([]);
  const [inbox, setInbox] = useState<InboxMsg[]>([]);

  useEffect(() => {
    if (!loading && !user) nav("/login");
  }, [user, loading, nav]);

  useEffect(() => {
    if (user) {
      apiFetch("/marketplace/mine").then(setMyPosts).catch(() => {});
      apiFetch("/messages/inbox").then(setInbox).catch(() => {});
    }
  }, [user]);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><span className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    toast({ title: "Signed out", description: "See you soon!" });
    nav("/");
  };

  const unread = inbox.filter(m => m.read === "false").length;

  return (
    <div className="min-h-screen hero-bg py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="section-label mb-1">Member Portal</p>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold font-serif">Welcome, {user.name.split(" ")[0]}</h1>
              <p className="text-muted-foreground mt-1">{user.village} · {user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              {user.role === "admin" && (
                <Link href="/admin">
                  <button className="btn-outline-gold flex items-center gap-2">
                    <Shield className="h-4 w-4" />Admin Panel
                  </button>
                </Link>
              )}
              <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold font-display border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-all">
                <LogOut className="h-4 w-4" />Sign Out
              </button>
            </div>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="heritage-card p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full gold-gradient flex items-center justify-center text-xl font-bold text-primary-foreground shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-semibold font-display">{user.name}</h2>
                <span className={`badge-${user.role === "admin" ? "terra" : "gold"}`}>
                  {user.role === "admin" ? "Admin" : "Member"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{user.email} · {user.whatsapp}</p>
              <p className="text-sm text-muted-foreground">{user.address}</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { href: "/marketplace", icon: Package, label: "Marketplace", count: myPosts.length, color: "text-primary" },
            { href: "/marketplace", icon: MessageSquare, label: "Inbox", count: unread, color: unread > 0 ? "text-secondary" : "text-muted-foreground", badge: unread > 0 },
            { href: "/businesses", icon: Building2, label: "Businesses", color: "text-accent" },
            { href: "/events", icon: Calendar, label: "Events", color: "text-primary" },
          ].map(({ href, icon: Icon, label, count, color, badge }) => (
            <Link key={label} href={href}>
              <div className="heritage-card p-4 text-center cursor-pointer hover:border-primary/40 group">
                <div className={`mb-2 ${color} group-hover:scale-110 transition-transform inline-block`}>
                  <Icon className="h-7 w-7 mx-auto" />
                </div>
                <p className="text-sm font-semibold font-display">{label}</p>
                {count !== undefined && count > 0 && (
                  <p className={`text-xs mt-0.5 ${badge ? "text-secondary font-bold" : "text-muted-foreground"}`}>
                    {badge ? `${count} new` : `${count} listings`}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* My Listings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="heritage-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-display flex items-center gap-2"><Package className="h-4 w-4 text-primary" />My Listings</h3>
              <Link href="/marketplace"><button className="text-xs text-primary hover:underline font-display">View All</button></Link>
            </div>
            {myPosts.length === 0 ? (
              <div className="text-center py-6">
                <Package className="h-10 w-10 text-muted mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No listings yet</p>
                <Link href="/marketplace"><button className="btn-gold mt-3 text-xs px-3 py-1.5">Post Something</button></Link>
              </div>
            ) : (
              <ul className="space-y-2">
                {myPosts.slice(0, 5).map(p => (
                  <li key={p.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{p.title}</p>
                      <p className="text-xs text-muted-foreground">{p.category}</p>
                    </div>
                    <span className={`badge-${p.status === "active" ? "green" : "terra"} text-xs`}>{p.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* Inbox */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="heritage-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-display flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />Inbox
                {unread > 0 && <span className="badge-terra text-xs">{unread} new</span>}
              </h3>
            </div>
            {inbox.length === 0 ? (
              <div className="text-center py-6">
                <MessageSquare className="h-10 w-10 text-muted mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No messages yet</p>
              </div>
            ) : (
              <ul className="space-y-2">
                {inbox.slice(0, 5).map(m => (
                  <li key={m.id} className={`p-3 rounded-lg border transition-all cursor-pointer ${m.read === "false" ? "border-primary/30 bg-primary/5" : "border-border/50"}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${m.read === "false" ? "text-primary" : ""}`}>{m.senderName}</p>
                        <p className="text-xs text-muted-foreground truncate">{m.content}</p>
                      </div>
                      {m.read === "false" && <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>

        {/* Community links */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 heritage-card p-6">
          <h3 className="font-semibold font-display mb-4 flex items-center gap-2"><Megaphone className="h-4 w-4 text-primary" />Community Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { href: "/mokhosi", label: "Mokhosi Alerts", icon: "🚨", desc: "Crisis & emergency alerts" },
              { href: "/businesses", label: "Business Register", icon: "🏪", desc: "Register your business" },
              { href: "/marketplace", label: "Buy & Sell", icon: "🛒", desc: "Community marketplace" },
              { href: "/tourism", label: "Tourism Directory", icon: "🗺️", desc: "Discover local spots" },
              { href: "/events", label: "Events", icon: "📅", desc: "Community announcements" },
              { href: "/map", label: "Area Map", icon: "📍", desc: "Interactive constituency map" },
            ].map(({ href, label, icon, desc }) => (
              <Link key={href} href={href}>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 cursor-pointer transition-all group">
                  <span className="text-lg">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold font-display group-hover:text-primary transition-colors">{label}</p>
                    <p className="text-xs text-muted-foreground truncate">{desc}</p>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
