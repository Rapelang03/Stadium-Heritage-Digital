import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Clock, Church, Users, Music, ShoppingBag, Play, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const serviceTimes = [
  {
    nameEN: "Sunday Worship Service (Thapelo ea Sontaha)",
    nameST: "Kopelo ea Sontaha (Thapelo ea Sontaha)",
    timeEN: "Sunday at 9:00 AM",
    timeST: "Sontaha ho 9:00 kakang",
    descEN: "The main Sunday morning service — a time of praise, prayer, preaching, and fellowship for the whole congregation.",
    descST: "Kopelo e ka sehloohong ea Sontaha hoseng — nako ea tumelo, thapelo, polelo ea Molimo, le kopano bakeng sa phuthehano eohle.",
  },
  {
    nameEN: "Holy Communion Service",
    nameST: "Kopelo ea Mokamelo o Halalelang",
    timeEN: "First Sunday of the month at 9:00 AM",
    timeST: "Sontaha sa pele sa khoeli ho 9:00 kakang",
    descEN: "The observance of the Lord's Supper — a sacred moment of remembrance and renewed covenant with God, shared by all confirmed members of the congregation.",
    descST: "Ts'ebetso ea Seoelo sa Morena — nako e halalelang ea ho hopola le selekane se ncha le Molimo, e abelanoang ke litho tsohle tse tiisitsoeng tsa phuthehano.",
  },
  {
    nameEN: "Wednesday Prayer Meeting",
    nameST: "Kopano ea Thapelo ea Laboraro",
    timeEN: "Wednesday at 5:30 PM",
    timeST: "Laboraro ho 5:30 mantsiboea",
    descEN: "Midweek gathering for prayer, Bible study, and mutual encouragement. Open to all members and visitors.",
    descST: "Kopano ea bohareng ba beke bakeng sa thapelo, ho ithuta Bibele, le ho khothaletsa. E buleha bakeng sa litho tsohle le baeti.",
  },
  {
    nameEN: "Youth Fellowship (Bacha)",
    nameST: "Kopano ea Bacha",
    timeEN: "Friday at 5:00 PM",
    timeST: "Labohlano ho 5:00 mantsiboea",
    descEN: "The young people's meeting — a vibrant space for worship, discipleship, and community among the youth of Upper Thamae.",
    descST: "Kopano ea matsoalloa — sebaka se phelang sa kopelo, ho lateloa ha Kreste, le kopano ea bacha ba Thamae e Holimo.",
  },
];

const organisations = [
  {
    nameEN: "Mokhatlo oa Basali",
    nameST: "Mokhatlo oa Basali",
    icon: "👩",
    descEN: "The Women's Guild — a pillar of the Upper Thamae LECSA congregation. The Basali society meets regularly for prayer, Bible study, and community service. They coordinate fundraising, support bereaved families, and lead community outreach programmes throughout the year.",
    descST: "Mokhatlo oa Basali — setlamo sa phuthehano ea LECSA ea Thamae e Holimo. Mokhatlo oa Basali o kopana reroromela bakeng sa thapelo, ho ithuta Bibele, le ts'ebeletso ea sechaba. Ba hlophisa ho bokela chelete, ba ts'ehetsa malapa a masoabi, le ho etela sechaba ka selemo sohle.",
  },
  {
    nameEN: "Mokhatlo oa Banna",
    nameST: "Mokhatlo oa Banna",
    icon: "👨",
    descEN: "The Men's League — providing brotherhood, accountability, and service to the congregation and wider community. Banna members assist with church maintenance, lead in public worship, and engage in civic responsibility within Stadium Area.",
    descST: "Mokhatlo oa Banna — o fana ka botsoalle ba bo-ntate, boikarabello, le ts'ebeletso ho phuthehano le sechabeng se seholo. Litho tsa Banna li thusa ka bo-intlafatso ea kereke, li etela ts'ebetsong ea kopelo ea sechaba, le ho nka karolo ho maikarabelo a sechaba ka hare ho Sebaka sa Setadieme.",
  },
  {
    nameEN: "Bacha (Youth League)",
    nameST: "Bacha (Mokhatlo oa Bacha)",
    icon: "🌟",
    descEN: "The Youth League is the heart of tomorrow's church. Bacha members engage in worship leadership, drama, sports, and community service. They are active ambassadors of LECSA values and Basotho Christian identity among the younger generation.",
    descST: "Mokhatlo oa Bacha ke pelo ea kereke ea hosane. Litho tsa Bacha li nka karolo ho etaetsa kopelo, terama, lipapali, le ts'ebeletso ea sechaba. Ba baemeli ba phelang ba boleng ba LECSA le boitsebiso ba Bakreste ba Basotho hara moloko o mocha.",
  },
];

const marketplaceItems = [
  {
    nameEN: "Uniform Fabric Bundle (Church Attire)",
    nameST: "Sepheo sa Lesela la Seaparo sa Kereke",
    descEN: "Official LECSA uniform fabric for women and youth. Supplied in the traditional church colours. Contact the parish office for sizing and availability.",
    descST: "Lesela la seaparo sa LECSA sa molao bakeng sa basali le bacha. Le filoeng ka mebala ea tloaelehileng ea kereke. Ikopanya le ofisi ea leparishi bakeng sa boemo le ho fumana.",
    price: "M 120",
  },
  {
    nameEN: "Church Badges & Insignia",
    nameST: "Libetji le Lintlha tsa Kereke",
    descEN: "Official LECSA membership badges for Basali, Banna, and Bacha organisations. Beautifully crafted insignia representing each fellowship.",
    descST: "Libetji tsa litho tsa LECSA tsa molao bakeng sa mekhatlo ea Basali, Banna, le Bacha. Lintlha tse entsoeng hantle tse emetseng kopano e 'ngoe le e 'ngoe.",
    price: "M 45",
  },
  {
    nameEN: "Choir Concert Tickets",
    nameST: "Lithikethe tsa Sebina sa Khorale",
    descEN: "Tickets for the annual Upper Thamae LECSA Choir Concert — an evening of sacred song, thanksgiving, and community celebration. Dates announced each year.",
    descST: "Lithikethe tsa Sebina sa Khorale ea LECSA ea Thamae e Holimo sa selemo — motsiamong oa pina e halalelang, thanksgiving, le monyako oa sechaba. Matsatsi a tsebisoa selemo se seng le se seng.",
    price: "M 80",
  },
];

export default function ThamaeChurch() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Church className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-widest uppercase opacity-80">
                  {language === "EN" ? "Upper Thamae, Stadium Area" : "Thamae e Holimo, Sebaka sa Setadieme"}
                </p>
                <h1 className="text-3xl md:text-4xl font-serif font-bold">
                  {language === "EN"
                    ? "Upper Thamae LECSA Church Portal"
                    : "Leseli la Kereke ea LECSA ea Thamae e Holimo"}
                </h1>
              </div>
            </div>
            <p className="text-lg opacity-90 max-w-2xl leading-relaxed">
              {language === "EN"
                ? "The Lesotho Evangelical Church in Southern Africa (LECSA) congregation at Upper Thamae is a cornerstone of faith, community, and Basotho spiritual heritage in the heart of Stadium Area Constituency."
                : "Phuthehano ea Kereke ea Evangeli ea Lesotho Afrika Boroa (LECSA) e Thamae e Holimo ke motheo oa tumelo, sechaba, le fanaue ea moya oa Basotho ka pela ea Sebaka sa Setadieme."}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {[
                { EN: "LECSA Congregation", ST: "Phuthehano ea LECSA" },
                { EN: "Upper Thamae", ST: "Thamae e Holimo" },
                { EN: "Est. 1800s", ST: "E thehiloe 1800s" },
              ].map((tag) => (
                <span key={tag.EN} className="text-xs px-3 py-1 rounded-full bg-white/20 font-medium">
                  {language === "EN" ? tag.EN : tag.ST}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 py-12 space-y-16">

        {/* Service Times */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Clock className="h-6 w-6 text-green-700" />
            <h2 className="text-2xl font-serif font-bold">
              {language === "EN" ? "Service Times" : "Linako tsa Kopelo"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceTimes.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-600" />
                  <h3 className="font-semibold text-sm">
                    {language === "EN" ? s.nameEN : s.nameST}
                  </h3>
                </div>
                <p className="text-xs font-bold text-green-700 dark:text-green-400 mb-2">
                  {language === "EN" ? s.timeEN : s.timeST}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === "EN" ? s.descEN : s.descST}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-5">
            <div className="flex items-start gap-3">
              <Star className="h-5 w-5 text-green-700 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1 text-green-900 dark:text-green-100">
                  {language === "EN" ? "Holy Communion Notice" : "Tsebiso ea Mokamelo o Halalelang"}
                </h4>
                <p className="text-xs text-green-800 dark:text-green-300 leading-relaxed">
                  {language === "EN"
                    ? "Holy Communion is observed on the first Sunday of every month during the 9:00 AM service. All confirmed members of the LECSA congregation are invited to partake. Visitors who are confirmed members of other Christian churches are also welcome. Please speak with the Pastor before the service if you have any questions."
                    : "Mokamelo o Halalelang o etsoa Sontaha sa pele sa khoeli ka kopeleng ea 9:00 kakang. Litho tsohle tse tiisitsoeng tsa phuthehano ea LECSA li memooa ho nka karolo. Le baeti ba leng litho tse tiisitsoeng tsa likereke tse ling tsa Bokreste ba amohetsoe. Ka kopo bua le Moruti pele ho kopelo haeba u na le lipotso."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Organisations */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-green-700" />
            <h2 className="text-2xl font-serif font-bold">
              {language === "EN" ? "Church Organisations" : "Mekhatlo ea Kereke"}
            </h2>
          </div>
          <div className="space-y-4">
            {organisations.map((org, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{org.icon}</span>
                  <div>
                    <h3 className="font-serif font-bold text-lg">
                      {language === "EN" ? org.nameEN : org.nameST}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {language === "EN" ? org.descEN : org.descST}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Worship Media */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Music className="h-6 w-6 text-green-700" />
            <h2 className="text-2xl font-serif font-bold">
              {language === "EN" ? "Worship Media" : "Bonts'o ea Kopelo"}
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card overflow-hidden shadow-md"
          >
            <div
              className="relative bg-black rounded-t-2xl overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            >
              <video
                controls
                className="w-full h-full object-cover"
                preload="metadata"
              >
                <source src="/church.mp4" type="video/mp4" />
                <p className="text-white text-center p-4 text-sm">
                  {language === "EN"
                    ? "Your browser does not support HTML5 video."
                    : "Sebetsanyi sa hao ha se ts'ehetse vithio ea HTML5."}
                </p>
              </video>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Play className="h-4 w-4 text-green-700" />
                <h3 className="font-semibold">
                  {language === "EN"
                    ? "Upper Thamae LECSA — Church Worship Service"
                    : "Thamae e Holimo LECSA — Kopelo ea Kereke"}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === "EN"
                  ? "A recording of worship at the Upper Thamae LECSA congregation — featuring the church choir, congregational singing in Sesotho, and the proclamation of the Word. Experience the warmth, devotion, and community spirit that defines this historic church."
                  : "Letsohla la kopelo ho phuthehano ea LECSA ea Thamae e Holimo — le kenyeletsang khorale ea kereke, pina ea phuthehano ka Sesotho, le ho tsebisa Lentsoeng. Iphela mofuthu, boikokobetso, le moea oa sechaba o hlalefang kereke ena ea nalane."}
              </p>
            </div>
          </motion.div>
        </section>

        {/* Parish Marketplace */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="h-6 w-6 text-green-700" />
            <h2 className="text-2xl font-serif font-bold">
              {language === "EN" ? "Parish Marketplace" : "Mmaraka oa Leparishi"}
            </h2>
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            {language === "EN"
              ? "Official LECSA Upper Thamae church items available through the parish office. All proceeds support the congregation's ministry and outreach programmes."
              : "Thepa ea kereke ea LECSA Thamae e Holimo ea molao e fumanoeng ofising ea leparishi. Chelete eohle e ts'ehetsa boshebeletsi le mananeo a phatlalatso ea phuthehano."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {marketplaceItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-sm mb-2">
                  {language === "EN" ? item.nameEN : item.nameST}
                </h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  {language === "EN" ? item.descEN : item.descST}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-green-700">{item.price}</span>
                  <Button size="sm" variant="outline" className="text-xs border-green-600 text-green-700 hover:bg-green-50">
                    {language === "EN" ? "Order" : "Reka"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About LECSA */}
        <section className="rounded-2xl bg-gradient-to-br from-green-50 to-background dark:from-green-900/20 dark:to-background border border-border p-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-6 w-6 text-green-700" />
            <h2 className="text-xl font-serif font-bold">
              {language === "EN"
                ? "About LECSA"
                : "Ka LECSA"}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {language === "EN"
              ? "The Lesotho Evangelical Church in Southern Africa (LECSA) traces its roots to the arrival of French Protestant missionaries — the Paris Evangelical Missionary Society — in Lesotho in 1833. The church has grown over nearly two centuries to become one of the most significant Christian denominations in Lesotho, with congregations across the country and into South Africa."
              : "Kereke ea Evangeli ea Lesotho Afrika Boroa (LECSA) e fumana metheo ea eona ho tlo ha baromisi ba Baporotestanta ba Fora — Mokhatlo oa Baromisi oa Evangeli oa Paris — Lesotho ka 1833. Kereke e holile ha e se e ka lilemong tse ka bang mashome a mabeli ho ba e 'ngoe ea lithuto tsa Bokreste tse bohlokoa ka ho fetisisa Lesotho, e nang le liphuthehano lefatšeng lohle le Afrika Boroa."}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {language === "EN"
              ? "The Upper Thamae congregation is among the established LECSA parishes in the Maseru area. It serves families across the Thamae villages, providing pastoral care, education, and community development alongside its core mission of worship and evangelism."
              : "Phuthehano ea Thamae e Holimo ke e 'ngoe ea liparishi tsa LECSA tse tiileng libakeng tsa Maseru. E sebelletsa malapa a metse ea Thamae, e fana ka tlhokomelo ea mofuputsi, thuto, le nts'etsopele ea sechaba hammoho le mosebetsi oa eona o ka sehloohong oa kopelo le phatlalatso ea Evangeli."}
          </p>
        </section>
      </div>
    </div>
  );
}
