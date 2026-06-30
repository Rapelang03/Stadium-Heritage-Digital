import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, MapPin, Home, Eye, EyeOff, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const VILLAGES = [
  "Thibella","Lower Thamae","Moshoeshoe II","Sea Point","Marallaneng","Phahameng",
  "Maseru East","Mohalalitoe","Pitso Ground","Upper Thamae","Cathedral Area",
  "Emmanuel Hostel","Fokothi","NTTC Area","Ntšerele","Temong","Thabong",
  "Save the Children Area","Other",
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "", email: "", whatsapp: "", password: "", village: "", address: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const [, nav] = useLocation();
  const { toast } = useToast();

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast({ title: "Welcome to the community!", description: "Your account has been created." });
      nav("/dashboard");
    } catch (err: any) {
      toast({ title: "Registration failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, icon: Icon, type = "text", field, placeholder, children }: any) => (
    <div>
      <label className="block text-sm font-medium font-display mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        {children || (
          <input
            type={type}
            value={form[field as keyof typeof form]}
            onChange={e => set(field, e.target.value)}
            required
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gold-gradient mb-4 shadow-lg">
            <span className="text-2xl">🦁</span>
          </div>
          <p className="section-label mb-2">Stadium Area Constituency</p>
          <h1 className="text-3xl font-bold font-serif">Join the Community</h1>
          <p className="text-muted-foreground mt-2 text-sm">Create your member account to access all portal features</p>
        </div>

        <div className="heritage-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Full Name" icon={User} field="name" placeholder="Thabo Nkosi" />
            <Field label="Email Address" icon={Mail} field="email" placeholder="your@email.com" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium font-display mb-1.5">WhatsApp Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={e => set("whatsapp", e.target.value)}
                    required
                    placeholder="+266 5800 0000"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium font-display mb-1.5">Village / Area</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                  <select
                    value={form.village}
                    onChange={e => set("village", e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm appearance-none"
                  >
                    <option value="">Select village</option>
                    {VILLAGES.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <Field label="Physical Address" icon={Home} field="address" placeholder="Street / Plot / Landmark" />

            <div>
              <label className="block text-sm font-medium font-display mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={e => set("password", e.target.value)}
                  required
                  minLength={6}
                  placeholder="Min. 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-gold w-full justify-center py-3 text-base mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Create Account
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Already a member?{" "}
              <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
