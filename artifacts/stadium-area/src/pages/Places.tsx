import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Places() {
  const { language } = useLanguage();

  const places = [
    {
      name: "Setsoto Stadium",
      desc: "The national stadium and beating heart of the constituency. A monumental structure hosting national football matches and historic ceremonies.",
      image: "/images/stadium.png"
    },
    {
      name: "Our Lady of Victories Cathedral",
      desc: "Located just 1km southwest of the stadium. A stunning architectural landmark and central place of worship for the Catholic community in Maseru.",
      image: "/images/cathedral.png"
    },
    {
      name: "Maseru City Centre",
      desc: "The bustling heart of Lesotho's capital, featuring traditional markets, modern shopping, and the beautiful red sandstone architecture the city is named for.",
      image: "/images/maseru-city.png"
    },
    {
      name: "Surrounding Landscapes",
      desc: "Just outside the urban center lie the majestic rolling hills and mountains that define Lesotho's geography, perfect for hiking and photography.",
      image: "/images/nature.png"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h1 className="text-5xl font-serif font-bold text-foreground mb-6">
            {language === 'EN' ? "Places to Visit" : "Libaka tse Battsoang"}
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore the landmarks and scenic areas that make Constituency No. 32 a unique destination in Lesotho.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {places.map((place, i) => (
            <motion.div 
              key={place.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer"
            >
              <img 
                src={place.image} 
                alt={place.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center space-x-2 text-white/80 mb-2">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">Landmark</span>
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mb-3">{place.name}</h3>
                <p className="text-white/80 text-lg leading-relaxed">{place.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
