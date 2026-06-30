import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function News() {
  const { language } = useLanguage();

  const newsItems = [
    {
      date: "October 15, 2025",
      category: "Infrastructure",
      title: "Setsoto Stadium Renovation Reaches 50% Milestone",
      excerpt: "The M85 million renovation project is on track. Structural reinforcements are complete, and work on the new seating arrangements has begun ahead of schedule."
    },
    {
      date: "September 28, 2025",
      category: "Education",
      title: "Lesotho High School Tops National Results Again",
      excerpt: "Students from our prestigious local institution have once again achieved the highest aggregate scores in the national secondary examinations."
    },
    {
      date: "September 10, 2025",
      category: "Community",
      title: "Annual Cultural Festival Announced for Next Month",
      excerpt: "The 18 villages of Constituency No. 32 are preparing for the annual heritage showcase, featuring traditional music, dance, and food markets."
    },
    {
      date: "August 22, 2025",
      category: "Sports",
      title: "Matlama FC Announces Youth Academy Expansion",
      excerpt: "The historic Maseru-based football club is expanding its youth training facilities within the Stadium Area to nurture local talent."
    },
    {
      date: "August 05, 2025",
      category: "Local Government",
      title: "New Drainage Systems Installed in Lower Thamae",
      excerpt: "Addressing long-standing concerns, the Area Councillor has unveiled the completed drainage infrastructure project ahead of the rainy season."
    },
    {
      date: "July 18, 2025",
      category: "Community",
      title: "Local Vendors Market to Open Near Cathedral Area",
      excerpt: "A new initiative to support small businesses will see a formalized, covered market space open for local artisans and food vendors."
    }
  ];

  const events = [
    { date: "Oct 25", name: "Constituency Town Hall" },
    { date: "Nov 02", name: "Youth Sports Tournament" },
    { date: "Nov 15", name: "Heritage Market Day" },
    { date: "Dec 01", name: "Stadium Progress Tour" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-5xl font-serif font-bold text-foreground mb-4">
                {language === 'EN' ? "News & Announcements" : "Litaba le Liphatlalatso"}
              </h1>
              <p className="text-xl text-muted-foreground">
                Stay updated with the latest happenings, developments, and stories from our community.
              </p>
            </motion.div>

            <div className="space-y-8">
              {newsItems.map((item, index) => (
                <motion.article 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border rounded-2xl p-6 md:p-8 hover:shadow-md transition-shadow group cursor-pointer"
                >
                  <div className="flex flex-wrap gap-4 items-center mb-4 text-sm">
                    <span className="font-bold text-primary uppercase tracking-wider">{item.category}</span>
                    <span className="text-muted-foreground flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {item.date}
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {item.excerpt}
                  </p>
                  <div className="text-sm font-semibold text-primary flex items-center group-hover:translate-x-1 transition-transform">
                    Read Full Story <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <Card className="bg-muted/30 border-0 shadow-none">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Upcoming Events</h3>
                  <div className="space-y-6">
                    {events.map((event, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center justify-center bg-background rounded-lg p-3 min-w-[4rem] border shadow-sm text-center">
                          <span className="text-xs text-muted-foreground uppercase font-bold">{event.date.split(' ')[0]}</span>
                          <span className="text-xl font-serif font-bold text-foreground">{event.date.split(' ')[1]}</span>
                        </div>
                        <div className="flex items-center">
                          <h4 className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                            {event.name}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
