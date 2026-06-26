import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Trophy, Calendar, Users, Info } from "lucide-react";
import { useEffect, useState } from "react";

export default function Sports() {
  const { language } = useLanguage();
  const [progress, setProgress] = useState(0);

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 500); // 50% through the 20,000 -> 25,000 renovation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img src="/images/stadium.png" alt="Setsoto Stadium" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
              {language === 'EN' ? "Sports & Recreation" : "Lipapali le Boikhathollo"}
            </h1>
            <p className="text-xl text-muted-foreground">
              {language === 'EN' 
                ? "Home to the iconic Setsoto Stadium, the Constituency is the beating heart of Lesotho's sporting culture and national pride."
                : "Lehae la Setadieme sa Setsoto se tummeng, Lebatooa ke pelo e otlang ea setso sa lipapali sa Lesotho."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stadium Deep Dive */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6 text-foreground">Setsoto Stadium</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Built in 1992 and named "Setsoto" (meaning "amazement" or "marvel"), the stadium is the home of the Lesotho national football team (Likuena). It features an artificial turf pitch and has historically hosted everything from athletics and rugby to motorsport and grand concerts.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Beyond sports, it is a site of national ceremony. It hosted the coronation of King Letsie III in October 1997, and the wedding of former Prime Minister Tom Thabane in August 2017.
              </p>
            </div>

            {/* Renovation Progress */}
            <div className="bg-card border rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-serif font-bold mb-2">M85m Renovation Project</h3>
              <p className="text-muted-foreground mb-8">Expanding capacity from ~20,000 to 25,000 seats by October 2026.</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-foreground">Current Capacity (20,000)</span>
                  <span className="text-primary">Target (25,000)</span>
                </div>
                <Progress value={progress} className="h-4" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Phase 1</span>
                  <span>Phase 2</span>
                  <span>Completion</span>
                </div>
              </div>
              
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start space-x-3 text-amber-700 dark:text-amber-400">
                <Info className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="text-sm">
                  Following FIFA's condemnation of the ground in 2021, this extensive renovation will bring the facility back to international standards, allowing the national team to play home games in Maseru by March 2026.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-primary text-primary-foreground rounded-3xl p-8">
              <h3 className="font-serif text-2xl font-bold mb-6">Quick Facts</h3>
              <ul className="space-y-6">
                <li className="flex items-center space-x-4">
                  <Calendar className="h-6 w-6 opacity-80" />
                  <div>
                    <div className="font-semibold">Built</div>
                    <div className="text-primary-foreground/80">1992 (Renovated 2010)</div>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <Users className="h-6 w-6 opacity-80" />
                  <div>
                    <div className="font-semibold">Capacity</div>
                    <div className="text-primary-foreground/80">~20,000 (expanding)</div>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <Trophy className="h-6 w-6 opacity-80" />
                  <div>
                    <div className="font-semibold">Surface</div>
                    <div className="text-primary-foreground/80">Artificial Turf</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-card border rounded-3xl p-8">
              <h3 className="font-serif text-xl font-bold mb-4">Football Capital</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Maseru dominates Lesotho's football landscape. 12 out of the 16 Premier League teams are based in Maseru.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                  <span className="font-medium text-sm">Matlama FC</span>
                  <span className="text-xs font-bold bg-primary text-primary-foreground px-2 py-1 rounded">8 Titles</span>
                </div>
                <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                  <span className="font-medium text-sm">Royal Lesotho Defence Force</span>
                  <span className="text-xs font-bold bg-primary text-primary-foreground px-2 py-1 rounded">8 Titles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
