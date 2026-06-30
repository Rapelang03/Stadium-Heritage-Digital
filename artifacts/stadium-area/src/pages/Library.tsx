import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Download, Search, ChevronDown, ChevronUp, RefreshCw, Book, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const scriptures = [
  {
    ref: "Johane 3:16",
    EN: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    ST: "Hobane Molimo o ratile lefatše hakalo, ha a nea Mora oa hae ea tsoetsoeng a le mong, hore e mong le e mong ea lumelang ho eena a se ke a timela, empa a be le bophelo bo sa feleng.",
  },
  {
    ref: "Lipesaleme 23:1",
    EN: "The Lord is my shepherd; I shall not want.",
    ST: "Jehova ke mofuhi oa ka; ha ke tlo hloka letho.",
  },
  {
    ref: "Liproverbi 3:5-6",
    EN: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    ST: "Tshepa Jehova ka pelo ea hao yohle; 'me u se ike ho tlhalohanyo ea hao; U ipolele ho eena mehlolong eohle, 'me eena o tla loka metseleng ea hao.",
  },
  {
    ref: "Filipi 4:13",
    EN: "I can do all this through him who gives me strength.",
    ST: "Nka etsa tsohle ka Kreste ea nthusang.",
  },
  {
    ref: "Jeremaia 29:11",
    EN: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    ST: "Hobane Nna ke tseba merero eo ke nang le eona mabapi le lona, ho bolela Jehova, merero ea khotso e seng ea bobe, ho fa lona tshepo le bokhoni.",
  },
  {
    ref: "Mataeuse 6:33",
    EN: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    ST: "Empa patlang pele mmusong oa Molimo le ho loka ha hae; 'me tsena tsohle li tla eketsoa ho lona.",
  },
  {
    ref: "Isaia 40:31",
    EN: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    ST: "Empa ba etsang boits'oaro ho Jehova ba tla fumana matla a mats'o; ba tla fofa ba le mapheo a joaloka a makhola; ba tla matha, ha ba ketele; ba tla tsamaea, ha ba hone.",
  },
  {
    ref: "Liroma 8:28",
    EN: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    ST: "Ebile re a tseba hore li'tsohle li sebetsa hammoho ho molemo oa ba ratang Molimo, eo ke ba bitsitsoeng ho ya ka morero oa hae.",
  },
];

const hymns = [
  {
    number: 1,
    titleEN: "In the Beginning Was the Word",
    titleST: "Pele lentsoe la na la re...",
    verses: [
      {
        EN: "In the beginning was the Word,\nAnd the Word was with God,\nAnd the Word was God himself.\nAll things were made through him,\nAnd without him nothing was made.",
        ST: "Pele lentsoe la na la re,\nLentsoe la na le Molimo,\nLentsoe leo e ne e le Molimo.\nTsohle li entsoe ke eena,\nKa ho se na eena ha ke na se entsoe.",
      },
      {
        EN: "The light shines in the darkness,\nAnd the darkness did not overcome it.\nHe came to his own people,\nBut his own did not receive him.\nBut to all who received him,\nHe gave the right to become children of God.",
        ST: "Leseli le a bonts'a lefifing,\nLefifi ha la ka la le hlola.\nO ile ho ba bao e leng ba hae,\nEmpa ba bae ba se ka ba mo amohela.\nEmpa bohle ba mo amohelang,\nO ba fa tokelo ea ho ba bana ba Molimo.",
      },
    ],
  },
  {
    number: 10,
    titleEN: "Oh, Have Mercy on Me",
    titleST: "Oho, nkutlwele bohloko",
    verses: [
      {
        EN: "Oh, have mercy on me,\nO Lord my God.\nI come before you broken,\nSeek your healing grace.\nFor your love endures forever,\nAnd your mercy never ends.",
        ST: "Oho, nkutlwele bohloko,\nO Morena Molimo oa ka.\nKe tla ho uena ke senyehile,\nKe batla mohau oa hao.\nHobane lerato la hao le leng ho feleng,\nMohau oa hao ha o fele.",
      },
      {
        EN: "Lift me from the mire,\nSet my feet on solid ground.\nLet your Spirit guide me,\nAll my days on earth.\nIn your light I see the pathway,\nTo the glory of your throne.",
        ST: "Nthutha tlung ea lerole,\nEme maoto a ka mabung a tiileng.\nHlohonolofatsa moya oa hao,\nKa matsatsi a ka ohle lefatšeng.\nKa leseli la hao ke bona tsela,\nE eang bobutsabotšo ba setulo sa hao.",
      },
    ],
  },
  {
    number: 145,
    titleEN: "I Have Seen the Way",
    titleST: "Ke bone, ke bone tsela",
    verses: [
      {
        EN: "I have seen, I have seen the way,\nThe way that leads to life.\nIt is narrow and it is straight,\nBut it leads me home.\nJesus is the way, the truth,\nAnd the life eternal.",
        ST: "Ke bone, ke bone tsela,\nTsela e eang bophelong.\nE monya ebile e otleloha,\nEmpa e nkisetsa lapeng.\nJesu ke tsela, nnete,\nLe bophelo bo sa feleng.",
      },
      {
        EN: "Though the mountains rise before me,\nAnd the valleys lie below.\nI will follow in his footsteps,\nFor his mercies are my guide.\nEvery morning brings new mercies,\nEvery night his love shines on.",
        ST: "Le ha lithaba li emelela,\nLe meqo e le tlase.\nKe tla latela mehato ea hae,\nHobane mohau oa hae ke karabo ea ka.\nMosebetsi o mohcha o tlisa mohau o mocha,\nBusong bohle lerato la hae le a bonts'a.",
      },
      {
        EN: "Praise the Lord all you nations,\nSing his glory evermore.\nFor his love is everlasting,\nAnd his truth will never end.\nAll creation joins in singing,\nAlleluia, praise the Lord.",
        ST: "Moraisa Jehova lintlo tsohle,\nBua tlotla ea hae kamehla.\nHobane lerato la hae le tšoaroa ntho,\nNnete ea hae ha e fele.\nBophetho bohle bo a opela,\nHalleluia, moraisa Jehova.",
      },
    ],
  },
  {
    number: 23,
    titleEN: "The Lord is My Shepherd",
    titleST: "Jehova ke mofuhi oa ka",
    verses: [
      {
        EN: "The Lord is my shepherd,\nI shall not be in want.\nHe makes me lie down in green pastures,\nHe leads me beside quiet waters.\nHe restores my soul.",
        ST: "Jehova ke mofuhi oa ka,\nHa ke tlo hloka letho.\nO a ntsiela mafulo a matala,\nO ntataisa le melapo e khutsitseng.\nO khulisa moya oa ka.",
      },
      {
        EN: "Even though I walk through the valley,\nOf the shadow of death,\nI will fear no evil,\nFor you are with me;\nYour rod and your staff comfort me.",
        ST: "Le ha kea tsamaea moqoleng,\nOa moriti oa lefu,\nHa ke tšabe bobe leha e le bofe,\nHobane u na le nna;\nLeqeba la hao le molamu oa hao li a nkopanya.",
      },
    ],
  },
  {
    number: 100,
    titleEN: "Make a Joyful Noise",
    titleST: "Etan'o hoeletsa Jehova",
    verses: [
      {
        EN: "Make a joyful noise to the Lord,\nAll the earth!\nServe the Lord with gladness;\nCome into his presence with joyful songs.",
        ST: "Etan'o hoeletsa Jehova ka thabo,\nLefatše lohle!\nSebeletsang Jehova ka thabo;\nTlang pela hae le bina lipina tsa thabo.",
      },
      {
        EN: "Know that the Lord is God!\nIt is he who made us,\nAnd we are his;\nWe are his people and the sheep of his pasture.",
        ST: "Tsebang hore Jehova ke Molimo!\nKe eena ea re entseng,\nRe le ba hae;\nRe sechaba sa hae le dinku tsa mafulo a hae.",
      },
    ],
  },
];

export default function Library() {
  const { language } = useLanguage();
  const [scriptureIdx, setScriptureIdx] = useState(0);
  const [hymnSearch, setHymnSearch] = useState("");
  const [openHymn, setOpenHymn] = useState<number | null>(null);
  const [openVerse, setOpenVerse] = useState<number>(0);

  const nextScripture = () => {
    setScriptureIdx((i) => (i + 1) % scriptures.length);
  };

  const filteredHymns = hymns.filter((h) => {
    const q = hymnSearch.toLowerCase();
    return (
      String(h.number).includes(q) ||
      h.titleEN.toLowerCase().includes(q) ||
      h.titleST.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-primary/10 via-background to-background border-b border-border py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">
              {language === "EN" ? "Digital Spiritual Hub" : "Setsi sa Moya sa Leseli"}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-4">
              {language === "EN" ? "Library & Worship Centre" : "Laeborari le Setsi sa Kopelo"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "EN"
                ? "Access sacred texts, explore hymns of the Basotho church tradition, and draw daily inspiration from scripture. A digital sanctuary for the Stadium Area community."
                : "Fumana mangolo a halalelang, hlahloba lifela tsa kereke ea Basotho, le fumana tšusumetso ea letsatsi le letsatsi ho tsoa manalaneng. Sebaka sa ho phomola moya bakeng sa sechaba sa Sebaka sa Setadieme."}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 py-12 space-y-16">

        {/* Scripture Card */}
        <section>
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">
            {language === "EN" ? "Daily Scripture" : "Mangolo a Letsatsi"}
          </h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={scriptureIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto rounded-2xl border border-border bg-card shadow-lg p-8 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-green-600 to-amber-600" />
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-4" />
              <p className="text-lg md:text-xl font-serif italic leading-relaxed mb-4 text-foreground">
                "{language === "EN" ? scriptures[scriptureIdx].EN : scriptures[scriptureIdx].ST}"
              </p>
              <p className="text-sm font-bold text-primary tracking-wide">
                — {scriptures[scriptureIdx].ref}
              </p>
              {language === "EN" && (
                <p className="text-sm text-muted-foreground italic mt-2">
                  "{scriptures[scriptureIdx].ST}"
                </p>
              )}
              {language === "ST" && (
                <p className="text-sm text-muted-foreground italic mt-2">
                  "{scriptures[scriptureIdx].EN}"
                </p>
              )}
              <Button
                variant="outline"
                size="sm"
                className="mt-6 rounded-full gap-2"
                onClick={nextScripture}
              >
                <RefreshCw className="h-4 w-4" />
                {language === "EN" ? "Next Verse" : "Temana e latelang"}
              </Button>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Download Cards */}
        <section>
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">
            {language === "EN" ? "Sacred Texts" : "Mangolo a Halalelang"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <Book className="h-16 w-16 text-primary mx-auto mb-2" />
                  <span className="text-sm font-semibold text-primary">
                    {language === "EN" ? "Holy Bible" : "Bibele e Halalelang"}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-xl mb-2">
                  {language === "EN" ? "Bibele e Halalelang" : "Bibele e Halalelang"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "EN"
                    ? "The complete Holy Bible in Sesotho — the sacred foundation of faith for the Basotho people. Download for offline reading and study."
                    : "Bibele e halalelang e fellang ka Sesotho — motheo o halalelang oa tumelo bakeng sa Basotho. Nka ho bala le ho ithuta ntle le inthanete."}
                </p>
                <a
                  href="/bibele-e-halalelang.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full rounded-xl gap-2">
                    <Download className="h-4 w-4" />
                    {language === "EN" ? "Download Bible (PDF)" : "Nka Bibele (PDF)"}
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-green-600/20 to-green-600/5 flex items-center justify-center">
                <div className="text-center">
                  <Music className="h-16 w-16 text-green-600 mx-auto mb-2" />
                  <span className="text-sm font-semibold text-green-600">
                    {language === "EN" ? "Hymn Book" : "Buka ea Lifela"}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-xl mb-2">
                  {language === "EN" ? "Lifela tsa Sione" : "Lifela tsa Sione"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "EN"
                    ? "The Lesotho church hymnal — Lifela tsa Sione — containing hundreds of beloved hymns in Sesotho. A treasure of worship and praise."
                    : "Buka ea lifela ea kereke ea Lesotho — Lifela tsa Sione — e nang le lifela tse ngata tse ratehang ka Sesotho. Letlotlo la kopelo le tumelo."}
                </p>
                <a
                  href="/lifela-tsa-sione.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full rounded-xl gap-2 bg-green-600 hover:bg-green-700 text-white">
                    <Download className="h-4 w-4" />
                    {language === "EN" ? "Download Hymn Book (PDF)" : "Nka Buka ea Lifela (PDF)"}
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hymn Explorer */}
        <section>
          <h2 className="text-2xl font-serif font-bold mb-2 text-center">
            {language === "EN" ? "Hymn Explorer" : "Hlahloba Lifela"}
          </h2>
          <p className="text-center text-muted-foreground mb-6 text-sm">
            {language === "EN"
              ? "Search hymns by number or title. Click to reveal lyrics."
              : "Batlisisa lifela ka palo kapa lebitso. Tobetsa ho bonts'a maele."}
          </p>
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={hymnSearch}
              onChange={(e) => setHymnSearch(e.target.value)}
              placeholder={
                language === "EN"
                  ? "Search by number or title..."
                  : "Batla ka palo kapa lebitso..."
              }
              className="pl-9 rounded-full"
            />
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            {filteredHymns.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                {language === "EN" ? "No hymns found." : "Ha ho na lifela tse fumanoeng."}
              </p>
            )}
            {filteredHymns.map((hymn) => (
              <motion.div
                key={hymn.number}
                layout
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-accent/10 transition-colors text-left"
                  onClick={() =>
                    setOpenHymn(openHymn === hymn.number ? null : hymn.number)
                  }
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {hymn.number}
                    </span>
                    <div>
                      <p className="font-semibold text-sm">
                        {language === "EN" ? hymn.titleEN : hymn.titleST}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {language === "EN" ? hymn.titleST : hymn.titleEN}
                      </p>
                    </div>
                  </div>
                  {openHymn === hymn.number ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {openHymn === hymn.number && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-border mt-0 pt-4">
                        <div className="flex gap-2 mb-4">
                          {hymn.verses.map((_, vi) => (
                            <button
                              key={vi}
                              onClick={() => setOpenVerse(vi)}
                              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                                openVerse === vi
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "border-border hover:bg-accent/10"
                              }`}
                            >
                              {language === "EN"
                                ? `Verse ${vi + 1}`
                                : `Temana ea ${vi + 1}`}
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] font-bold tracking-widest text-primary uppercase mb-2">Sesotho</p>
                            <p className="text-sm leading-relaxed whitespace-pre-line text-foreground font-serif italic">
                              {hymn.verses[openVerse]?.ST}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-2">English</p>
                            <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground font-serif italic">
                              {hymn.verses[openVerse]?.EN}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
