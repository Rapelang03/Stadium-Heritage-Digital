import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function Culture() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-secondary text-secondary-foreground py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-serif font-bold mb-6"
          >
            {language === 'EN' ? "Culture & Heritage" : "Setso le Lefa"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary-foreground/90 leading-relaxed"
          >
            Maseru translates to "place of the red sandstone" in Sesotho. 
            The Stadium Area reflects the enduring spirit and traditions of the Basotho people.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl"
          >
            <img src="/images/blanket.png" alt="Basotho Blanket" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-serif font-bold text-foreground">The Basotho Blanket</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The heritage blanket (kobo) is an iconic symbol of Lesotho. Worn by both men and women, 
              the intricate patterns and deep colors tell stories of status, occasion, and national identity. 
              In the Stadium Area, you will see the blanket worn proudly during cultural ceremonies, 
              weddings, and particularly during the colder mountain winters.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24 md:flex-row-reverse">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:order-2 aspect-[4/3] rounded-3xl overflow-hidden shadow-xl"
          >
            <img src="/images/mokorotlo.png" alt="Mokorotlo Hat" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:order-1"
          >
            <h2 className="text-4xl font-serif font-bold text-foreground">The Mokorotlo</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The woven mokorotlo hat is so central to Basotho identity that it features on the national flag. 
              Its distinctive conical shape is said to be inspired by Mount Qiloane. Artisans in Maseru 
              continue the traditional weaving techniques, creating these beautiful pieces of functional art.
            </p>
          </motion.div>
        </div>

        <div className="bg-card border rounded-3xl p-10 text-center max-w-4xl mx-auto shadow-sm">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Community Spirit</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Beyond attire, culture in the Stadium Area is lived through music, dance, and profound community spirit. 
            The Sesotho language binds the people together. Religious life is also central, with the stunning 
            Our Lady of Victories Cathedral just 1km from the stadium serving as a spiritual anchor for many.
          </p>
        </div>
      </div>
    </div>
  );
}
