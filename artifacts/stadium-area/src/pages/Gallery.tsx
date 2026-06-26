import { useState, type MouseEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
  { src: "/images/stadium.jpg", alt: "Setsoto Stadium, Maseru", category: "Sports" },
  { src: "/images/maseru.jpg", alt: "Maseru cityscape", category: "City" },
  { src: "/images/uptown.jpg", alt: "Uptown Maseru skyline", category: "Culture" },
  { src: "/images/south.jpg", alt: "Southern Maseru landscapes", category: "Nature" },
  { src: "/images/education.png", alt: "Lesotho school students", category: "Education" },
  { src: "/images/culture.png", alt: "Basotho tradition", category: "Culture" },
  { src: "/images/village.png", alt: "Village community scene", category: "Community" },
  { src: "/images/mokorotlo.png", alt: "Mokorotlo Hat craft", category: "Heritage" },
  { src: "/images/blanket.png", alt: "Lesotho traditional blanket", category: "Heritage" },
  { src: "/images/cathedral.png", alt: "Cathedral Maseru", category: "Landmark" },
  { src: "/images/football.png", alt: "Football match action", category: "Sports" }
];

export default function Gallery() {
  const { language, t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h1 className="text-5xl font-serif font-bold text-foreground mb-4">
            {language === 'EN' ? "Gallery" : "Difoto"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("galleryDescription")}
          </p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => openLightbox(i)}
            >
              <img src={img.src} alt={img.alt} className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Maximize2 className="text-white w-8 h-8" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-foreground mb-1 block">
                  {img.category}
                </span>
                <p className="text-white font-medium">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="h-8 w-8" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
              onClick={prevImage}
            >
              <ChevronLeft className="h-10 w-10" />
            </Button>

            <img 
              src={images[currentIndex].src} 
              alt={images[currentIndex].alt} 
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
              onClick={nextImage}
            >
              <ChevronRight className="h-10 w-10" />
            </Button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
