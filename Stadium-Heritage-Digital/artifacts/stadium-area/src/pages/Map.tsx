import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { MapPin, Navigation as NavIcon, Star, School, Church, Building } from "lucide-react";

const landmarks = [
  {
    id: 1,
    nameEN: "Setsoto National Stadium",
    nameST: "Setadieme sa Naha sa Setsoto",
    lat: -29.311667,
    lng: 27.5,
    type: "stadium",
    descEN: "Lesotho's national multi-purpose stadium with 20,000+ capacity. Home of the Lesotho national football team.",
    descST: "Setadieme sa naha sa Lesotho se nang le bokhoni ba ho feta 20,000. Lehae la sehlopha sa bolo ea maoto sa Lesotho.",
    icon: "🏟️",
  },
  {
    id: 2,
    nameEN: "Our Lady of Victories Cathedral",
    nameST: "Kerekeng ea Our Lady of Victories",
    lat: -29.318,
    lng: 27.494,
    type: "church",
    descEN: "Roman Catholic Cathedral, 1km SW of Setsoto Stadium. A spiritual landmark of Maseru.",
    descST: "Kerekeng ea Moromonyi oa Roma, 1km boroa-bophirima ba Setsoto. Sebaka sa tumelo sa Maseru.",
    icon: "⛪",
  },
  {
    id: 3,
    nameEN: "Lesotho High School",
    nameST: "Sekolo se Phahameng sa Lesotho",
    lat: -29.314,
    lng: 27.497,
    type: "school",
    descEN: "One of Lesotho's most prestigious secondary schools, located within Stadium Area constituency.",
    descST: "E le e 'ngoe ea litsekolo tse phahameng ka ho fetisisa tsa Lesotho, e sebetsang haufi le Setadieme.",
    icon: "🎓",
  },
  {
    id: 4,
    nameEN: "'Mabathoana High School",
    nameST: "Sekolo se Phahameng sa 'Mabathoana",
    lat: -29.319,
    lng: 27.492,
    type: "school",
    descEN: "Named after Archbishop Emmanuel Mabathoana. 600+ students, 1km from Setsoto Stadium.",
    descST: "E reilwe lebitso ka Archbishop Emmanuel Mabathoana. Baithuti ba 600+, 1km ho tsoa Setsoto.",
    icon: "🎓",
  },
  {
    id: 5,
    nameEN: "Lerotholi Polytechnic",
    nameST: "Politekniki ea Lerotholi",
    lat: -29.322,
    lng: 27.505,
    type: "school",
    descEN: "Technical and vocational institution on Moshoeshoe Road, providing skills and professional training.",
    descST: "Setheo sa thuto ea theknoloji le bokali ho Tsela ea Moshoeshoe.",
    icon: "🏫",
  },
  {
    id: 6,
    nameEN: "Royal Palace (King's Palace)",
    nameST: "Molapo oa Morena (Lekhotla la Morena)",
    lat: -29.308,
    lng: 27.479,
    type: "landmark",
    descEN: "The official residence and administrative seat of the King of Lesotho, located near Stadium Area.",
    descST: "Lehae la molao le setsi sa tsamaiso ea Morena oa Lesotho, e haufi le Sebaka sa Setadieme.",
    icon: "👑",
  },
  {
    id: 7,
    nameEN: "National Museum of Lesotho",
    nameST: "Musiamo oa Naha oa Lesotho",
    lat: -29.313,
    lng: 27.476,
    type: "landmark",
    descEN: "Showcasing Lesotho's rich cultural heritage, traditions, and history of the Basotho people.",
    descST: "E bonts'a fanaue e kholo ea setso sa Lesotho, mekhoa le nalane ea Basotho.",
    icon: "🏛️",
  },
  {
    id: 8,
    nameEN: "Upper Thamae Village",
    nameST: "Motse oa Thamae e Holimo",
    lat: -29.325,
    lng: 27.490,
    type: "village",
    descEN: "One of 18 vibrant villages within Stadium Area constituency, home to the LECSA church community.",
    descST: "E le e 'ngoe ea metse e 18 e phelang ka hare ho se-baka sa Setadieme.",
    icon: "🏘️",
  },
  {
    id: 9,
    nameEN: "Sea-Point Neighbourhood",
    nameST: "Motse oa Sea-Point",
    lat: -29.309,
    lng: 27.508,
    type: "village",
    descEN: "A well-known residential neighbourhood within Stadium Area with a strong community identity.",
    descST: "Motse oa bodulo o tsebahetseng ka hare ho Stadium Area o nang le boitsebo bo tiileng.",
    icon: "🏘️",
  },
  {
    id: 10,
    nameEN: "Little Flower English Medium School",
    nameST: "Sekolo sa Little Flower",
    lat: -29.316,
    lng: 27.503,
    type: "school",
    descEN: "An English medium school serving the Stadium Area community.",
    descST: "Sekolo sa Senyesemane se sebeletsang sechaba sa Sebaka sa Setadieme.",
    icon: "🎓",
  },
];

const typeColors: Record<string, string> = {
  stadium: "bg-primary",
  church: "bg-green-600",
  school: "bg-amber-600",
  landmark: "bg-purple-600",
  village: "bg-rose-600",
};

const typeLabels: Record<string, { EN: string; ST: string }> = {
  stadium: { EN: "Stadium", ST: "Setadieme" },
  church: { EN: "Church", ST: "Kereke" },
  school: { EN: "School", ST: "Sekolo" },
  landmark: { EN: "Landmark", ST: "Sebaka se Hlokehang" },
  village: { EN: "Village", ST: "Motse" },
};

export default function Map() {
  const { language } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    let L: typeof import("leaflet") | null = null;
    let mapInstance: import("leaflet").Map | null = null;

    const initMap = async () => {
      if (!mapRef.current || mapInstanceRef.current) return;
      L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      mapInstance = L.map(mapRef.current, {
        center: [-29.314, 27.495],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      mapInstanceRef.current = mapInstance;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstance);

      landmarks.forEach((lm) => {
        const icon = L!.divIcon({
          html: `<div class="flex items-center justify-center w-10 h-10 rounded-full text-xl shadow-lg border-2 border-white" style="background:${
            lm.type === "stadium"
              ? "#003B6F"
              : lm.type === "church"
              ? "#2E8B57"
              : lm.type === "school"
              ? "#C4622D"
              : lm.type === "landmark"
              ? "#7C3AED"
              : "#E11D48"
          }">${lm.icon}</div>`,
          className: "",
          iconSize: [40, 40],
          iconAnchor: [20, 20],
          popupAnchor: [0, -22],
        });

        const name = language === "ST" ? lm.nameST : lm.nameEN;
        const desc = language === "ST" ? lm.descST : lm.descEN;

        L!.marker([lm.lat, lm.lng], { icon })
          .addTo(mapInstance!)
          .bindPopup(
            `<div style="font-family:serif;min-width:180px"><strong style="font-size:14px">${name}</strong><br/><span style="font-size:12px;color:#555;display:block;margin-top:4px">${desc}</span></div>`,
            { maxWidth: 260 }
          );
      });
    };

    initMap();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const typeList = ["stadium", "church", "school", "landmark", "village"];

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary/5 border-b border-border py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">
              {language === "EN" ? "Interactive Map" : "Mmapa oa Poraena"}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-4">
              {language === "EN"
                ? "Explore Stadium Area"
                : "Hlahloba Sebaka sa Setadieme"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {language === "EN"
                ? "Navigate the landmarks, schools, churches, and villages of Constituency No. 32. Click any marker to learn more about each location."
                : "Leba libaka tse hlokehang, litsekolo, likereke, le metse ea Constituency No. 32. Tobetsa molapo oa sign le o mong ho ithuta hape ka sebaka seo."}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden border border-border shadow-xl" style={{ height: "600px" }}>
              <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {language === "EN"
                ? "Map data © OpenStreetMap contributors. Coordinates centred on Setsoto Stadium, Maseru."
                : "Data ea mmapa © OpenStreetMap. Maemo a sehare ka Setsoto, Maseru."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-border p-4 bg-card">
              <h3 className="font-serif font-bold text-lg mb-3">
                {language === "EN" ? "Map Legend" : "Sengoloa sa Mmapa"}
              </h3>
              <div className="space-y-2">
                {typeList.map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${typeColors[type]}`} />
                    <span className="text-sm text-muted-foreground">
                      {language === "EN"
                        ? typeLabels[type].EN
                        : typeLabels[type].ST}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border p-4 bg-card">
              <h3 className="font-serif font-bold text-lg mb-3">
                {language === "EN" ? "Key Landmarks" : "Libaka tse Bohlokoa"}
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {landmarks.map((lm) => (
                  <div key={lm.id} className="flex items-start gap-2 group">
                    <span className="text-xl mt-0.5">{lm.icon}</span>
                    <div>
                      <p className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">
                        {language === "EN" ? lm.nameEN : lm.nameST}
                      </p>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded text-white ${typeColors[lm.type]}`}
                      >
                        {language === "EN"
                          ? typeLabels[lm.type].EN
                          : typeLabels[lm.type].ST}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border p-4 bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <NavIcon className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-sm">
                  {language === "EN" ? "Centre Coordinates" : "Maemo a Setsi"}
                </h4>
              </div>
              <p className="text-xs text-muted-foreground">
                29°18'40"S, 27°30'0"E
                <br />
                {language === "EN"
                  ? "~1,567m above sea level"
                  : "~1,567m holimo ho lewatle"}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-serif font-bold mb-6">
            {language === "EN"
              ? "All Mapped Locations"
              : "Libaka Tsohle tse Khethiloeng"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {landmarks.map((lm, i) => (
              <motion.div
                key={lm.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{lm.icon}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${typeColors[lm.type]}`}
                  >
                    {language === "EN"
                      ? typeLabels[lm.type].EN
                      : typeLabels[lm.type].ST}
                  </span>
                </div>
                <h3 className="font-semibold text-sm mb-1">
                  {language === "EN" ? lm.nameEN : lm.nameST}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {language === "EN" ? lm.descEN : lm.descST}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
