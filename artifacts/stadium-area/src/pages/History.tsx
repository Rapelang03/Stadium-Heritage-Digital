import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function History() {
  const { t, language } = useLanguage();

  const milestones = [
    {
      year: "1869",
      titleEN: "Founding of Maseru",
      titleST: "Theho ea Maseru",
      descEN: "Established as a British police camp by Commandant J.H. Bowker, following the conclusion of the Free State–Basotho Wars. Maseru became the administrative capital of the Basutoland protectorate.",
      descST: "E thehiloe e le kampo ea mapolesa ea Borithane ke Molaoli J.H. Bowker. Maseru e ile ea fetoha motse-moholo oa tsamaiso oa ts'ireletso ea Basutoland."
    },
    {
      year: "1881",
      titleEN: "The Gun War",
      titleST: "Ntoa ea Lithunya",
      descEN: "Maseru played a pivotal role during the Gun War (Ntoa ea Lithunya) when Basotho leaders successfully resisted the Cape Colony's attempt to disarm them, preserving their autonomy.",
      descST: "Maseru e bile le seabo sa bohlokoa nakong ea Ntoa ea Lithunya ha baetapele ba Basotho ba hanela boiteko ba Cape Colony ba ho ba amoha libetsa."
    },
    {
      year: "1966",
      titleEN: "Lesotho Independence",
      titleST: "Boipuso ba Lesotho",
      descEN: "Lesotho gained full independence from Britain. Maseru expanded rapidly from a small administrative town into a vibrant national capital, and the Stadium Area began to formalize its boundaries.",
      descST: "Lesotho le fumane boipuso bo felletseng. Maseru e holile ka potlako ho tloha toropong e nyane ea tsamaiso ho ba motse-moholo oa naha."
    },
    {
      year: "1992",
      titleEN: "Setsoto Stadium Built",
      titleST: "Kaho ea Setadieme sa Setsoto",
      descEN: "The national stadium was constructed, forever changing the landscape and identity of Constituency No. 32, turning it into the undeniable sporting heartbeat of the nation.",
      descST: "Setadieme sa naha se ile sa ahoa, se fetola ponahalo le boitsebahatso ba Lebatooa la 32 ka ho sa feleng."
    },
    {
      year: "2010",
      titleEN: "First Major Renovation",
      titleST: "Ntlafatso ea Pele e Kholo",
      descEN: "Major renovations upgraded Setsoto Stadium, reflecting Maseru's ongoing modernization and the constituency's growing importance for national events.",
      descST: "Lintlafatso tse kholo li phahamisitse Setadieme sa Setsoto, li bontša ntlafatso e tsoelang pele ea Maseru."
    },
    {
      year: "2025",
      titleEN: "Modern Expansion",
      titleST: "Katoloso ea Kajeno",
      descEN: "An M85 million renovation project begins, expanding the stadium's capacity to 25,000 and cementing the area as a world-class sporting destination.",
      descST: "Morero oa ntlafatso o qala, o atolosa bokhoni ba setadieme ho fihla ho 25,000."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl font-serif font-bold mb-6">{language === 'EN' ? "History & Origins" : "Nalane le Tšimoloho"}</h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              {language === 'EN' 
                ? "The story of Stadium Area is the story of Maseru itself. From a modest 19th-century police camp to the bustling epicenter of a modern African nation."
                : "Pale ea Sebaka sa Setadieme ke pale ea Maseru ka boeona. Ho tloha kampong e nyane ea mapolesa lekholong la bo19 ho ea setsing se phetheselang sa naha."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4 relative">
        <div className="absolute left-8 md:left-1/2 top-24 bottom-24 w-px bg-border -translate-x-1/2" />
        
        <div className="space-y-16">
          {milestones.map((milestone, index) => (
            <motion.div 
              key={milestone.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative flex items-center justify-between md:justify-normal ${
                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 shadow-[0_0_0_4px_hsl(var(--background)),0_0_0_6px_hsl(var(--primary))]" />
              
              <div className="w-full pl-16 md:pl-0 md:w-[calc(50%-3rem)]">
                <div className="bg-card border p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                  <span className="text-secondary font-bold text-xl md:text-2xl font-serif mb-2 block">
                    {milestone.year}
                  </span>
                  <h3 className="text-2xl font-bold font-serif mb-3 text-foreground group-hover:text-primary transition-colors">
                    {language === 'EN' ? milestone.titleEN : milestone.titleST}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === 'EN' ? milestone.descEN : milestone.descST}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
