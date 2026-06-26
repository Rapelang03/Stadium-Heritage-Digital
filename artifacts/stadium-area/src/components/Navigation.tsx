import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Moon, Sun, Globe, User, Shield, LogOut, ChevronDown, Bell, ShoppingBag, Building2, Calendar, Map } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface NavItem { href: string; label: string; icon?: any; }
interface NavGroup { title: string; items: NavItem[]; }

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMobileOpen(false); setOpenGroup(null); setUserMenuOpen(false); }, [location]);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null); setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navGroups: NavGroup[] = [
    {
      title: t("discover") || "Discover",
      items: [
        { href: "/", label: t("home") || "Home" },
        { href: "/about", label: t("about") || "About" },
        { href: "/history", label: t("history") || "History" },
        { href: "/map", label: t("map") || "Interactive Map", icon: Map },
      ],
    },
    {
      title: t("heritage") || "Heritage",
      items: [
        { href: "/villages", label: t("villages") || "Villages" },
        { href: "/culture", label: t("culture") || "Culture" },
        { href: "/places", label: t("places") || "Sacred Places" },
        { href: "/gallery", label: t("gallery") || "Gallery" },
        { href: "/sources", label: t("sources") || "Sources" },
      ],
    },
    {
      title: t("institutions") || "Institutions",
      items: [
        { href: "/education", label: t("education") || "Education" },
        { href: "/sports", label: t("sports") || "Sports" },
        { href: "/sefika", label: t("sefika") || "Sefika Campus" },
        { href: "/thamae-church", label: t("thamaeChurch") || "LECSA Church" },
        { href: "/library", label: t("digitalLibrary") || "Digital Library" },
      ],
    },
    {
      title: t("community") || "Community",
      items: [
        { href: "/marketplace", label: t("marketplace") || "Marketplace", icon: ShoppingBag },
        { href: "/events", label: t("events") || "Events", icon: Calendar },
        { href: "/mokhosi", label: t("mokhosiAlerts") || "Mokhosi Alerts", icon: Bell },
        { href: "/businesses", label: t("businessDirectory") || "Business Directory", icon: Building2 },
        { href: "/tourism", label: t("tourism") || "Tourism", icon: Map },
        { href: "/developments", label: t("developments") || "Developments" },
        { href: "/news", label: t("news") || "News" },
        { href: "/contacts", label: t("contacts") || "Contacts" },
        { href: "/faq", label: t("faq") || "FAQ" },
      ],
    },
  ];

  const isActive = (href: string) => href === "/" ? location === "/" : location.startsWith(href);

  return (
    <nav ref={navRef} className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md shadow-sm">
      {/* Gold top stripe */}
      <div className="h-0.5 gold-gradient" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 mr-4 group">
            <div className="h-9 w-9 rounded-lg gold-gradient flex items-center justify-center text-lg font-bold shadow-sm group-hover:shadow-md transition-shadow">
              🦁
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-bold font-display tracking-tight">Stadium Area</p>
              <p className="text-[10px] text-muted-foreground font-display tracking-wider uppercase">Constituency No. 32</p>
            </div>
          </Link>

          {/* Desktop Nav Groups */}
          <div className="hidden lg:flex items-center gap-1 flex-1">
            {navGroups.map(group => (
              <div key={group.title} className="relative">
                <button
                  onClick={() => setOpenGroup(openGroup === group.title ? null : group.title)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold font-display transition-all ${openGroup === group.title ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground/80 hover:text-foreground"}`}
                >
                  {group.title}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openGroup === group.title ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openGroup === group.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-56 heritage-card shadow-xl py-1.5 z-50"
                    >
                      {group.items.map(item => (
                        <Link key={item.href} href={item.href}>
                          <div className={`flex items-center gap-2 px-4 py-2.5 text-sm font-display cursor-pointer transition-all ${isActive(item.href) ? "text-primary bg-primary/8 font-semibold" : "text-foreground/80 hover:text-foreground hover:bg-muted"}`}>
                            {item.icon && <item.icon className="h-3.5 w-3.5 text-muted-foreground" />}
                            {item.label}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "EN" ? "ST" : "EN")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-display border border-border hover:border-primary/40 hover:bg-muted transition-all"
            >
              <Globe className="h-3.5 w-3.5" />
              {language === "EN" ? "ST" : "EN"}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8 flex items-center justify-center rounded-lg border border-border hover:border-primary/40 hover:bg-muted transition-all"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-border hover:border-primary/40 bg-muted/50 hover:bg-muted transition-all"
                >
                  <div className="h-6 w-6 rounded-full gold-gradient flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold font-display hidden sm:block max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
                  <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 heritage-card shadow-xl py-1.5 z-50"
                    >
                      <div className="px-4 py-2.5 border-b border-border/50">
                        <p className="text-sm font-semibold font-display">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.village}</p>
                        {user.role === "admin" && <span className="badge-terra text-xs mt-1">Admin</span>}
                      </div>
                      <Link href="/dashboard">
                        <div className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-display cursor-pointer hover:bg-muted transition-colors">
                          <User className="h-4 w-4 text-muted-foreground" />{t("myDashboard")}
                        </div>
                      </Link>
                      {user.role === "admin" && (
                        <Link href="/admin">
                          <div className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-display cursor-pointer hover:bg-muted transition-colors">
                            <Shield className="h-4 w-4 text-muted-foreground" />{t("adminPanel")}
                          </div>
                        </Link>
                      )}
                      <button
                        onClick={async () => { await logout(); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-display cursor-pointer hover:bg-muted transition-colors text-destructive"
                      >
                        <LogOut className="h-4 w-4" />{t("signOut")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <button className="px-3 py-1.5 text-sm font-semibold font-display hover:bg-muted rounded-lg transition-all">{t("signIn")}</button>
                </Link>
                <Link href="/register">
                  <button className="btn-gold py-1.5 px-4 text-sm">{t("join")}</button>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-all"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-border bg-card/95 backdrop-blur-sm overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navGroups.map(group => (
                <div key={group.title}>
                  <p className="section-label py-2 px-2">{group.title}</p>
                  {group.items.map(item => (
                    <Link key={item.href} href={item.href}>
                      <div className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-display cursor-pointer transition-all ${isActive(item.href) ? "text-primary bg-primary/8 font-semibold" : "text-foreground/80 hover:bg-muted"}`}>
                        {item.icon && <item.icon className="h-3.5 w-3.5" />}
                        {item.label}
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
              <div className="pt-3 border-t border-border mt-2">
                {user ? (
                  <div>
                    <Link href="/dashboard"><div className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-display cursor-pointer hover:bg-muted"><User className="h-4 w-4" />Dashboard</div></Link>
                    <button onClick={async () => { await logout(); }} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-display cursor-pointer hover:bg-muted text-destructive"><LogOut className="h-4 w-4" />Sign Out</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login" className="flex-1"><button className="w-full py-2.5 rounded-lg border border-border text-sm font-semibold font-display hover:bg-muted transition-all">Sign In</button></Link>
                    <Link href="/register" className="flex-1"><button className="btn-gold w-full justify-center">Join</button></Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
