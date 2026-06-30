import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, GraduationCap, School } from "lucide-react";
import { motion } from "framer-motion";

export default function Education() {
  const { language } = useLanguage();

  const schools = [
    {
      name: "Lesotho High School",
      type: "Secondary Education",
      desc: "One of the most prestigious secondary schools in the country, located squarely within the constituency. It has a long history of producing national leaders.",
      icon: <GraduationCap className="h-6 w-6 text-primary" />
    },
    {
      name: "Mabathoana High School",
      type: "Secondary Education",
      desc: "Named after Archbishop Emmanuel Mabathoana. Located just 1km from Setsoto Stadium, serving over 600 students.",
      icon: <School className="h-6 w-6 text-secondary" />
    },
    {
      name: "Lerotholi Polytechnic",
      type: "Tertiary / Vocational",
      desc: "Situated on Moshoeshoe Road, this is Lesotho's premier technical and vocational training institution, crucial for the nation's skills development.",
      icon: <BookOpen className="h-6 w-6 text-accent" />
    },
    {
      name: "Little Flower English Medium School",
      type: "Primary Education",
      desc: "Providing strong foundational education to young students within the Stadium Area.",
      icon: <School className="h-6 w-6 text-primary" />
    },
    {
      name: "St. Bernadette Primary",
      type: "Primary Education",
      desc: "A cornerstone primary education facility serving the local communities and neighborhoods.",
      icon: <School className="h-6 w-6 text-secondary" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-serif font-bold text-foreground">
              {language === 'EN' ? "Education & Excellence" : "Thuto le Bokhabane"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {language === 'EN'
                ? "The Stadium Area is a vital hub for education in Maseru, housing some of the nation's most prestigious academic institutions from primary through to tertiary vocational levels."
                : "Sebaka sa Setadieme ke setsi sa bohlokoa sa thuto Maseru, se nang le tse ling tsa litsi tsa thuto tse hlomphehang haholo naheng."}
            </p>
            <div className="bg-card border p-6 rounded-2xl shadow-sm mt-8">
              <h3 className="font-semibold text-lg mb-3">Lesotho Education System Overview</h3>
              <div className="flex flex-col space-y-3 text-sm text-muted-foreground">
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Primary Education</span>
                  <span className="font-medium text-foreground">8 years (from age 6)</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Secondary Education</span>
                  <span className="font-medium text-foreground">From age 14</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tertiary</span>
                  <span className="font-medium text-foreground">Vocational & University</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
          >
            <img src="/images/education.png" alt="Students in Lesotho" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schools.map((school, i) => (
            <motion.div
              key={school.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border rounded-2xl p-8 hover:shadow-lg transition-shadow group"
            >
              <div className="bg-muted w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {school.icon}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                {school.type}
              </span>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                {school.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {school.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
