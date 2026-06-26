import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Map, MapPin, Target, Users, Landmark, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="h-[40vh] w-full relative overflow-hidden bg-muted">
        <img 
          src="/images/maseru-city.png" 
          alt="Maseru City" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border shadow-xl rounded-3xl p-8 md:p-12 mb-16"
        >
          <div className="max-w-3xl">
            <span className="text-primary font-semibold tracking-wider text-sm mb-4 block">CONSTITUENCY NO. 32</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              {language === 'EN' ? "About Stadium Area" : "Ka Moo Sebakeng sa Setadieme"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {language === 'EN'
                ? "Located in the heart of Maseru District, the Stadium Area Constituency is a crucial administrative, cultural, and sporting division of Lesotho. It represents the vibrant intersection of traditional Basotho heritage and modern urban development."
                : "E fumaneha khubung ea Setereke sa Maseru, Lebatooa la Sebaka sa Setadieme ke karolo ea bohlokoa ea tsamaiso, setso, le lipapali ea Lesotho. E emela mateano a matla a lefa la setso la Basotho le ntlafatso ea kajeno ea litoropo."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <Card className="bg-muted/30 border-0 shadow-none">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-secondary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Coordinates</h3>
                <p className="text-muted-foreground">29°18'40"S, 27°30'0"E</p>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30 border-0 shadow-none">
              <CardContent className="p-6">
                <Target className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Elevation</h3>
                <p className="text-muted-foreground">~1,567m above sea level</p>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 border-0 shadow-none">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Time Zone</h3>
                <p className="text-muted-foreground">SAST (UTC+02:00)</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-serif font-bold text-foreground">
              {language === 'EN' ? "Civic Leadership" : "Boetapele ba Setjhaba"}
            </h2>
            
            <div className="bg-card border rounded-2xl p-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Landmark className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Hon. Justice N. Majara</h3>
                  <p className="text-muted-foreground">Current Member of Parliament</p>
                  <p className="text-sm text-muted-foreground mt-1">11th Parliament of Lesotho</p>
                </div>
              </div>
              <div className="border-t pt-6 flex items-start space-x-4">
                <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Mr. Sepipi</h3>
                  <p className="text-muted-foreground">Area Councillor</p>
                  <p className="text-sm text-muted-foreground mt-1">Elected 2023 (Revolution for Prosperity)</p>
                  <p className="text-sm text-muted-foreground">Former Mayor of Maseru City Council</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-serif font-bold text-foreground">
              {language === 'EN' ? "Electoral System" : "Tsamaiso ea Likhetho"}
            </h2>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Lesotho operates under a mixed-member proportional representation system. The Stadium Area constituency elects one member to the National Assembly directly, while also contributing to the national proportional vote.
              </p>
              <ul className="space-y-4">
                {[
                  "Directly elected constituency representation",
                  "Constituency No. 32 designation",
                  "Oversees 18 distinct villages and neighborhoods",
                  "Integral part of the Maseru District municipal governance"
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
