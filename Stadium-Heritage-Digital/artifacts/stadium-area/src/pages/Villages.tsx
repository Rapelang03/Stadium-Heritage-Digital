import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Map } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const allVillages = [
  "Aupolasi (Lower Thamae)", "Cathedral Area", "Emmanuel Hostel", 
  "Fokothi", "Lesotho High School area", "Lower Thamae", 
  "Mabathoana High School area", "Maseru East", "Mohalalitoe", 
  "Moshoeshoe II", "NTTC", "Ntshirele (Lower Thamae)", 
  "Save The Children", "Sea-Point", "Temong", "Thabong", 
  "Thibella", "Upper Thamae"
];

export default function Villages() {
  const { language } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = allVillages.filter(v => 
    v.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              {language === 'EN' ? "Villages & Neighbourhoods" : "Metse le Mathlobo"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {language === 'EN' 
                ? "The Stadium Area is home to 18 distinct communities, each with its own character, history, and contribution to Maseru's vibrant life."
                : "Sebaka sa Setadieme ke lehae la metse e 18 e fapaneng, e 'ngoe le e 'ngoe e na le botho ba eona, nalane ea eona."}
            </p>
          </div>
          
          <div className="w-full md:w-72 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={language === 'EN' ? "Search villages..." : "Batla metse..."}
              className="pl-10 bg-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Decorative Map Banner */}
        <div className="w-full h-48 bg-primary rounded-3xl mb-12 overflow-hidden relative flex items-center justify-center border-4 border-primary/20">
          <div className="absolute inset-0 opacity-20">
            <img src="/images/village.png" alt="Map background" className="w-full h-full object-cover mix-blend-overlay" />
          </div>
          <div className="relative z-10 flex items-center text-primary-foreground space-x-3">
            <Map className="h-8 w-8" />
            <span className="text-2xl font-serif font-bold">Constituency No. 32 Map Overview</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((village, index) => (
              <motion.div
                key={village}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow border-border/60 hover:border-primary/50 group overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors">
                      {village}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {language === 'EN' 
                        ? `A proud community within the Stadium Area, contributing to the rich cultural tapestry of Maseru.`
                        : `Motse o motlotlo o ka har'a Sebaka sa Setadieme.`}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg">No villages found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
