import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Building2, TrendingUp, HardHat, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Developments() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-24"
        >
          <span className="text-primary font-semibold tracking-wider text-sm mb-4 block uppercase">Future Vision</span>
          <h1 className="text-5xl font-serif font-bold text-foreground mb-6">
            {language === 'EN' ? "Developments & Future" : "Ntsetsopele le Bokamoso"}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {language === 'EN' 
              ? "Stadium Area is at the forefront of Maseru's modernization. From monumental sporting infrastructure to urban expansion, we are building a legacy for tomorrow."
              : "Sebaka sa Setadieme se kapele ntlafatsong ea Maseru. Ho tloha meahong e meholo ea lipapali ho ea katolosong ea toropo, re aha lefa la kamoso."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl text-primary mb-2">
              <HardHat className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground">The M85m Stadium Renovation</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The flagship project of the constituency is the massive M85 million renovation of Setsoto Stadium. Following international standards requirements, this project will transform the venue into a world-class 25,000-capacity arena by October 2026.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-foreground font-medium">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Phase 1: Structural reinforcement and seating expansion</span>
              </li>
              <li className="flex items-center space-x-3 text-foreground font-medium">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Phase 2: Pitch replacement and facility modernization</span>
              </li>
              <li className="flex items-center space-x-3 text-foreground font-medium">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Target: Hosting international football by March 2026</span>
              </li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card border rounded-3xl p-8 shadow-sm flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Building2 className="w-64 h-64" />
            </div>
            <h3 className="text-2xl font-bold font-serif mb-4 relative z-10">Maseru Urban Expansion</h3>
            <p className="text-muted-foreground mb-8 text-lg relative z-10">
              Since independence in 1966, Maseru has expanded its urban footprint sevenfold, growing from just 20km² to over 138km². The Stadium Area sits at the nexus of this growth, managing the delicate balance between historic village identities and modern urban density.
            </p>
            <div className="flex items-end space-x-4 relative z-10">
              <div className="text-5xl font-bold text-primary">7x</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest pb-2">Growth Since 1966</div>
            </div>
          </motion.div>
        </div>

        <div className="border-t pt-24">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">Future Aspirations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="h-6 w-6" />,
                title: "Economic Empowerment",
                desc: "Creating local hubs for small businesses and vendors around the stadium precinct to boost community wealth."
              },
              {
                icon: <Building2 className="h-6 w-6" />,
                title: "Infrastructure Resilience",
                desc: "Upgrading road networks and drainage systems across all 18 villages to handle increasing urban density."
              },
              {
                icon: <Lightbulb className="h-6 w-6" />,
                title: "Youth Facilities",
                desc: "Developing community centers and accessible sports courts to nurture the next generation of talent."
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow border-0 bg-muted/50">
                  <CardContent className="p-8">
                    <div className="bg-background w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold font-serif text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
