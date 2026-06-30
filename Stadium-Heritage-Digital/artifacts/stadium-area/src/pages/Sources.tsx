import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Sources() {
  const { language } = useLanguage();

  const sourcesList = [
    {
      title: "Independent Electoral Commission (IEC) Lesotho",
      desc: "Data regarding constituency boundaries, voting demographics, and electoral systems.",
      url: "https://www.iec.org.ls",
      type: "Official"
    },
    {
      title: "National Assembly of Lesotho",
      desc: "Information regarding the 11th Parliament, current MPs, and legislative histories.",
      url: "https://www.nationalassembly.parliament.ls",
      type: "Official"
    },
    {
      title: "Bureau of Statistics Lesotho",
      desc: "Population census data, demographics, and urban expansion metrics for Maseru District.",
      url: "https://www.bos.gov.ls",
      type: "Data"
    },
    {
      title: "Lesotho Football Association (LeFA)",
      desc: "Historical data regarding Setsoto Stadium, renovations, and national league statistics.",
      type: "Sports"
    },
    {
      title: "Wikipedia: Maseru & Stadium Area",
      desc: "Historical context, founding dates (1869), and general geographic information.",
      url: "https://en.wikipedia.org/wiki/Maseru",
      type: "Reference"
    },
    {
      title: "Britannica: Lesotho",
      desc: "Historical timelines including the Gun War and independence movements.",
      type: "Reference"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center space-x-4 mb-6 text-primary">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              {language === 'EN' ? "Sources & References" : "Metheo le Mehloli"}
            </h1>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The information presented on this digital heritage portal has been aggregated from official government publications, historical archives, and recognized reference materials to ensure accuracy and respect for the constituency's history.
          </p>
        </motion.div>

        <div className="space-y-6">
          {sourcesList.map((source, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border border-border shadow-sm hover:shadow-md transition-shadow group">
                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold font-serif text-foreground">{source.title}</h3>
                      <span className="text-xs font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 rounded">
                        {source.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{source.desc}</p>
                  </div>
                  
                  {source.url && (
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/5 text-primary hover:bg-primary/10 transition-colors shrink-0"
                    >
                      <Globe className="w-5 h-5 mr-2" />
                      <span className="font-semibold text-sm">Visit Site</span>
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
