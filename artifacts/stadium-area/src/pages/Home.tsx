import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users, Building, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/stadium.png" 
            alt="Setsoto Stadium" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent dark:from-background/95 dark:via-background/80 dark:to-background/20" />
        </div>
        
        <div className="container relative z-10 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider mb-6">
              CONSTITUENCY NO. 32
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
              {t("welcome")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              {language === 'EN' 
                ? "The heartbeat of Maseru. Home to Lesotho's national stadium, 18 vibrant villages, and the enduring pride of a nation."
                : "Pelo ea Maseru. Lehae la setadieme sa naha sa Lesotho, metse e 18 e phelang, le boikhohomoso bo tsoelang pele ba naha."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-base px-8 py-6 rounded-full" asChild>
                <Link href="/villages">
                  {t("explore")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-full bg-background/50 backdrop-blur-md" asChild>
                <Link href="/history">
                  {t("learnMore")}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center px-4"
            >
              <Users className="h-8 w-8 mx-auto mb-4 text-secondary" />
              <div className="text-4xl font-bold font-serif text-foreground mb-2">21,906</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Population</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center px-4"
            >
              <MapPin className="h-8 w-8 mx-auto mb-4 text-accent" />
              <div className="text-4xl font-bold font-serif text-foreground mb-2">18</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{t("villages")}</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center px-4"
            >
              <Building className="h-8 w-8 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold font-serif text-foreground mb-2">1</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">National Stadium</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center px-4"
            >
              <Flag className="h-8 w-8 mx-auto mb-4 text-foreground" />
              <div className="text-4xl font-bold font-serif text-foreground mb-2">1966</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Independence Year</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-foreground">
                {language === 'EN' ? "A Living Archive of Basotho Pride" : "Pokello e Phelang ea Boikhohomoso ba Basotho"}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {language === 'EN' 
                  ? "From its origins in the Maseru founding of 1869, the Stadium Area has grown into the cultural and sporting epicentre of Lesotho. Explore our rich history, vibrant neighborhoods, and the dynamic community that shapes our future."
                  : "Ho tloha tšimolohong ea eona theong ea Maseru ka 1869, Sebaka sa Setadieme se thehile setsi sa setso le lipapali sa Lesotho. Hlahloba nalane ea rona e ruileng, libaka tse phelang, le sechaba se matla se bōpang bokamoso ba rona."}
              </p>
              <Button asChild variant="outline">
                <Link href="/history">{t("history")} &rarr;</Link>
              </Button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src="/images/culture.png" alt="Basotho Culture" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Latest News Preview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-2">{t("news")}</h2>
              <p className="text-muted-foreground">Latest updates from Constituency No. 32</p>
            </div>
            <Button variant="link" asChild>
              <Link href="/news">View all {t("news")} &rarr;</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl overflow-hidden shadow-sm border border-border group hover:shadow-md transition-all"
              >
                <div className="h-48 bg-muted overflow-hidden">
                  <img src={`/images/${i === 1 ? 'stadium' : i === 2 ? 'village' : 'education'}.png`} alt="News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary font-semibold mb-2">Community</div>
                  <h3 className="text-xl font-bold font-serif mb-3 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                    {i === 1 ? "Setsoto Stadium Renovation Reaches 50% Milestone" : i === 2 ? "Annual Cultural Festival Announced for Next Month" : "Local Schools Report Highest Graduation Rates"}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">October 12, 2025</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
