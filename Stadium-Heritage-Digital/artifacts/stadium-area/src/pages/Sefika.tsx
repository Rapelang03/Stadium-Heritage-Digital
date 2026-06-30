import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, ShoppingBag, Users, Award, ChevronDown, ChevronUp, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const lgcseResults = [
  { subject: "English Language", subjectST: "Puo ea Senyesemane", grade: "A", year: 2023 },
  { subject: "Sesotho", subjectST: "Sesotho", grade: "A", year: 2023 },
  { subject: "Mathematics", subjectST: "Lipalo", grade: "B", year: 2023 },
  { subject: "Biology", subjectST: "Bioloji", grade: "A", year: 2023 },
  { subject: "Chemistry", subjectST: "Khemistri", grade: "B+", year: 2023 },
  { subject: "Physics", subjectST: "Fisiks", grade: "B", year: 2023 },
  { subject: "History", subjectST: "Nalane", grade: "A", year: 2023 },
  { subject: "Geography", subjectST: "Lihalofo", grade: "A-", year: 2023 },
  { subject: "Commerce", subjectST: "Khoebo", grade: "B+", year: 2023 },
  { subject: "Accounts", subjectST: "Liakhaonte", grade: "B", year: 2023 },
];

const storeItems = [
  {
    nameEN: "Full School Uniform Bundle",
    nameST: "Sepheo Sohle sa Seaparo sa Sekolo",
    descEN: "Complete Sefika High School uniform including blazer, trousers/skirt, shirt, tie, and socks.",
    descST: "Seaparo se fellang sa Sekolo se Phahameng sa Sefika se kenyeletsang bhleiza, sekhokho/sekobo, hempe, tae, le matseke.",
    price: "M 850",
    badge: "Best Value",
    badgeST: "Theko e Molemo",
  },
  {
    nameEN: "Form 1 Textbook Package",
    nameST: "Sepheo sa Libuka tsa Form 1",
    descEN: "All core textbooks required for Form 1 students including Mathematics, Science, English and Sesotho.",
    descST: "Libuka tsohle tsa bohlokoa tse hlokehang bakeng sa baithuti ba Form 1 ho kenyeletsoa Lipalo, Saense, Senyesemane le Sesotho.",
    price: "M 620",
    badge: "Form 1",
    badgeST: "Form 1",
  },
  {
    nameEN: "PE Kit & Sports Pack",
    nameST: "Sepheo sa Lipapali",
    descEN: "Official Sefika sports uniform, water bottle, and athletics gear for inter-school competitions.",
    descST: "Seaparo sa lipapali sa molao sa Sefika, fororo ea metsi, le thepa ea papali bakeng sa lipapali tsa litsekolo.",
    price: "M 390",
    badge: "Sports",
    badgeST: "Lipapali",
  },
  {
    nameEN: "Form 3–5 Science Lab Kit",
    nameST: "Sepheo sa Laaboratori ea Saense",
    descEN: "Laboratory equipment and safety gear for Form 3 to Form 5 science practicals.",
    descST: "Thepa ea laaboratori le seaparo sa ts'ireletso bakeng sa ho etsa boithuto ba saense ho Form 3 ho ya Form 5.",
    price: "M 280",
    badge: "Lab",
    badgeST: "Laaboratori",
  },
];

const videos = [
  {
    file: "/sports.mp4",
    titleEN: "Inter-High Sports & Athletics",
    titleST: "Lipapali tsa Litsekolo le Molapo oa Mohato",
    descEN: "Watch Sefika High School students compete in inter-high athletics, demonstrating team spirit, endurance, and athletic excellence across the district.",
    descST: "Sheba baithuti ba Sekolo se Phahameng sa Sefika ba sebetsana ka lipapali tsa litsekolo, ba bonts'a moea oa sehlopha, mamello le bokahohle ba papali lefapheng.",
  },
  {
    file: "/bochaba.mp4",
    titleEN: "Bochaba Traditional Day Celebrations",
    titleST: "Monyako oa Letsatsi la Mekhoa ea Bochaba",
    descEN: "A vibrant celebration of Basotho cultural heritage — traditional music, dance, attire, and ceremonies performed by Sefika students during Bochaba Day.",
    descST: "Phehlo e phelang ea fanaue ea setso sa Basotho — mokitlane, papali, seaparo, le mekhoa e etsoa ke baithuti ba Sefika ka Letsatsi la Bochaba.",
  },
];

const admissionsFAQ = [
  {
    qEN: "What are the Form 1 entry requirements?",
    qST: "Litlhoko tsa ho kena Form 1 ke life?",
    aEN: "Students must have completed Primary School Certificate (PSC) or equivalent, with a minimum pass in core subjects. Age requirements typically apply for the current academic year.",
    aST: "Baithuti ba tlameha ho phethela Setifikeite sa Sekolo sa Mathomo (PSC) kapa e tšoanang le eona, ka phaposi ea bonyane ho litaba tse ka sehloohong. Litlhoko tsa lilemo li sebetsa ka selemo sa thuto sa hajoale.",
  },
  {
    qEN: "When do admissions open for the new academic year?",
    qST: "Kena tse ncha li bula neng?",
    aEN: "Admissions typically open in October for the following January academic year intake. Early applications are strongly encouraged. Contact the school office for current intake dates.",
    aST: "Likena li bula hangata ka Mphalane bakeng sa intake ea selemo sa thuto sa Pherekhong se latelang. Kopo ea kapele e khothaletsoang haholo. Ikopanya le ofisi ea sekolo bakeng sa matsatsi a hajoale a intake.",
  },
  {
    qEN: "Are boarding facilities available?",
    qST: "Mabitla a khona na?",
    aEN: "Sefika High School has limited boarding facilities. Priority is given to students from rural and distant areas. Applications for boarding must be submitted alongside the school admission application.",
    aST: "Sekolo se Phahameng sa Sefika se na le mabitla a fokolang. Boikhethelo bo fiwa baithuti ba tsoang libakeng tsa mahaeng le tse hole. Likopo tsa mabitla li tlameha ho isioa hammoho le kopo ea sekolo.",
  },
  {
    qEN: "What documents are required for admission?",
    qST: "Mangolong afe a hlokehang bakeng sa kena?",
    aEN: "Required documents include: PSC certificate or results slip, birth certificate, two passport photos, parent/guardian ID, proof of residence, and transfer letter (if transferring from another school).",
    aST: "Mangolo a hlokehang a kenyelletsa: setifikeite sa PSC kapa slip ea liphetho, setifikeite sa tsoalo, lifoto tse peli tsa pasiporte, ID ea motsoali/moetapele, bopaki ba bodulo, le lengolo la phetisetso (ha e sena ho fetisetsa ho tsoa sekolong se seng).",
  },
];

export default function Sefika() {
  const { language } = useLanguage();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-gradient-to-br from-primary via-primary/80 to-primary/60 text-primary-foreground py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-widest uppercase opacity-80">
                  {language === "EN" ? "Stadium Area Constituency" : "Sebaka sa Setadieme"}
                </p>
                <h1 className="text-3xl md:text-4xl font-serif font-bold">
                  {language === "EN" ? "Sefika Campus Hub" : "Setsi sa Kepe ea Sefika"}
                </h1>
              </div>
            </div>
            <p className="text-lg opacity-90 max-w-2xl leading-relaxed">
              {language === "EN"
                ? "Sefika High School stands as one of Lesotho's finest secondary schools — a centre of academic excellence, cultural pride, and community development in the heart of Stadium Area."
                : "Sekolo se Phahameng sa Sefika se eme e le e 'ngoe ea litsekolo tse phahameng ka ho fetisisa tsa Lesotho — setsi sa phethahalo ea thuto, boikhohomoso ba setso, le nts'etsopele ea sechaba ka pela ea Sebaka sa Setadieme."}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 py-12 space-y-16">

        {/* About Sefika */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-serif font-bold mb-4">
              {language === "EN" ? "About Sefika High School" : "Ka Sekolo se Phahameng sa Sefika"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {language === "EN"
                ? "Located in the Upper Thamae area of Stadium Area Constituency, Sefika High School has shaped generations of Basotho leaders, professionals, and community builders. Its name — derived from the Sesotho word meaning 'a rock' — reflects the school's foundational role in the academic and social fabric of Maseru."
                : "E le haufi le sebaka sa Thamae e Holimo ho Sebaka sa Setadieme, Sekolo se Phahameng sa Sefika se bopile liphoofolo tsa Basotho, litsebi le baetsi ba sechaba ka marareo a mangata. Lebitso la sona — le tsoang lentsong la Sesotho le bolelang 'lefika' — le bonts'a karolo ea sekolo e tiileng mohopong oa thuto le machaba oa Maseru."}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {language === "EN"
                ? "The school offers a broad curriculum under the Lesotho General Certificate of Secondary Education (LGCSE) framework, with strong programmes in sciences, humanities, and vocational subjects. Extra-curricular activities — from inter-school athletics to Bochaba cultural celebrations — ensure students develop holistically."
                : "Sekolo se fana ka lengolo le pharaletseng tlasa moralo oa Setifikeite sa Kakaretso sa Thuto ea Sekolo se Phahameng sa Lesotho (LGCSE), le mananeo a matla a saense, litsa le litaba tsa bokali. Mesebetsi e etsahala ntle le kakapa — ho tloha lipapaling tsa litsekolo ho ea monyakong oa setso oa Bochaba — e netefatsa hore baithuti ba hola ka botlalo."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { EN: "LGCSE Curriculum", ST: "Lengolo la LGCSE" },
                { EN: "Science Labs", ST: "Lilaaboratori tsa Saense" },
                { EN: "Sports Facilities", ST: "Mabitla a Lipapali" },
                { EN: "Cultural Programmes", ST: "Mananeo a Setso" },
              ].map((tag) => (
                <span
                  key={tag.EN}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                >
                  {language === "EN" ? tag.EN : tag.ST}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-primary/5 border border-border p-8 space-y-4"
          >
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-primary" />
              <h3 className="font-serif font-bold text-lg">
                {language === "EN" ? "School at a Glance" : "Sekolo Ka Potlako"}
              </h3>
            </div>
            {[
              { label: { EN: "Type", ST: "Mofuta" }, value: { EN: "Government-Aided Secondary School", ST: "Sekolo sa Bothatelo sa Mmuso" } },
              { label: { EN: "Location", ST: "Sebaka" }, value: { EN: "Upper Thamae, Stadium Area", ST: "Thamae e Holimo, Sebaka sa Setadieme" } },
              { label: { EN: "Curriculum", ST: "Lengolo" }, value: { EN: "LGCSE (Cambridge-aligned)", ST: "LGCSE" } },
              { label: { EN: "School Colours", ST: "Mebala ea Sekolo" }, value: { EN: "Blue & Gold", ST: "Buluu le Gauda" } },
              { label: { EN: "Activities", ST: "Mesebetsi" }, value: { EN: "Sports, Drama, Culture, Music", ST: "Lipapali, Terama, Setso, Mmino" } },
            ].map((item) => (
              <div key={item.label.EN} className="flex justify-between items-start gap-2 py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">
                  {language === "EN" ? item.label.EN : item.label.ST}
                </span>
                <span className="text-sm font-medium text-right">
                  {language === "EN" ? item.value.EN : item.value.ST}
                </span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* LGCSE Results */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-serif font-bold">
              {language === "EN" ? "LGCSE Academic Results Panel" : "Liphetho tsa Thuto tsa LGCSE"}
            </h2>
          </div>
          <div className="rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="bg-primary/5 px-6 py-3 flex items-center justify-between border-b border-border">
              <span className="text-sm font-semibold">
                {language === "EN" ? "2023 LGCSE Results — Sample Subject Grades" : "Liphetho tsa LGCSE 2023 — Litaba tse Khethiloang"}
              </span>
              <Badge variant="secondary">
                {language === "EN" ? "Academic Year 2023" : "Selemo sa Thuto 2023"}
              </Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="text-left px-6 py-3 font-semibold text-muted-foreground">
                      {language === "EN" ? "Subject" : "Taba"}
                    </th>
                    <th className="text-center px-6 py-3 font-semibold text-muted-foreground">
                      {language === "EN" ? "Grade" : "Moeli"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lgcseResults.map((r, i) => (
                    <tr
                      key={r.subject}
                      className={`border-t border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/10"} hover:bg-primary/5 transition-colors`}
                    >
                      <td className="px-6 py-3 font-medium">
                        {language === "EN" ? r.subject : r.subjectST}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span
                          className={`inline-block w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center ${
                            r.grade.startsWith("A")
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}
                        >
                          {r.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Admissions */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-serif font-bold">
              {language === "EN" ? "Form 1 Admissions" : "Kena ea Form 1"}
            </h2>
          </div>
          <div className="space-y-3">
            {admissionsFAQ.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-accent/10 text-left transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                >
                  <span className="font-medium text-sm">
                    {language === "EN" ? item.qEN : item.qST}
                  </span>
                  {openFAQ === i ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openFAQ === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-6 pb-5 pt-0 border-t border-border"
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                      {language === "EN" ? item.aEN : item.aST}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* School Store */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-serif font-bold">
              {language === "EN" ? "School Store" : "Setolo sa Sekolo"}
            </h2>
          </div>
          <p className="text-muted-foreground mb-6 text-sm">
            {language === "EN"
              ? "Official school supplies, uniform bundles, and textbook packages available for Sefika High School students."
              : "Thepa ea sekolo ea molao, sepheo sa seaparo, le sepheo sa libuka tse fumanoang bakeng sa baithuti ba Sekolo se Phahameng sa Sefika."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {storeItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-semibold text-sm">
                    {language === "EN" ? item.nameEN : item.nameST}
                  </h3>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    {language === "EN" ? item.badge : item.badgeST}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  {language === "EN" ? item.descEN : item.descST}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{item.price}</span>
                  <Button size="sm" variant="outline" className="text-xs">
                    {language === "EN" ? "Enquire" : "Botsa"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Video Showcase */}
        <section>
          <h2 className="text-2xl font-serif font-bold mb-6">
            {language === "EN" ? "Video Showcase" : "Bonts'o ea Vithio"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((vid, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card overflow-hidden shadow-md"
              >
                <div className="relative bg-black rounded-t-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <video
                    controls
                    className="w-full h-full object-cover"
                    preload="metadata"
                  >
                    <source src={vid.file} type="video/mp4" />
                    <p className="text-white text-center p-4 text-sm">
                      {language === "EN"
                        ? "Your browser does not support HTML5 video."
                        : "Sebetsanyi sa hao ha se ts'ehetse vithio ea HTML5."}
                    </p>
                  </video>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Play className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">
                      {language === "EN" ? vid.titleEN : vid.titleST}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {language === "EN" ? vid.descEN : vid.descST}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
