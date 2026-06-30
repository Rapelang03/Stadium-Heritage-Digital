import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  const { language } = useLanguage();

  const faqs = [
    {
      qEN: "What are the boundaries of Constituency No. 32?",
      qST: "Meeli ea Lebatooa la 32 ke efe?",
      aEN: "The constituency covers 18 distinct villages and neighborhoods in central Maseru, encompassing the national stadium area, several major high schools, and extending through communities like Lower Thamae, Maseru East, and Thibella.",
      aST: "Lebatooa le akaretsa metse e 18 bohareng ba Maseru, ho kenyeletsoa sebaka sa setadieme sa naha, likolo tse phahameng tse kholo, 'me le atolohela metseng e kang Lower Thamae, Maseru East, le Thibella."
    },
    {
      qEN: "How do I register to vote in this constituency?",
      qST: "Nka ingolisa joang ho vouta lebatooeng lee?",
      aEN: "Voter registration is handled by the Independent Electoral Commission (IEC). You must present your Lesotho National ID card at the local IEC registration office within the constituency boundaries or during designated mobile registration periods.",
      aST: "Ho ingolisa ha bakhethi ho tšoaroa ke Komisi e Ikemetseng ea Likhetho (IEC). U tlameha ho hlahisa karete ea hao ea boitsebiso ea naha liofising tsa ngoliso tsa IEC tse haufi."
    },
    {
      qEN: "When will the Setsoto Stadium renovation be completed?",
      qST: "Ntlafatso ea Setadieme sa Setsoto e tla phethoa neng?",
      aEN: "The current M85 million renovation project is targeted for completion in October 2026. However, the first phase should allow for international matches to return by March 2026.",
      aST: "Morero oa hajoale oa ntlafatso oa M85 million o lebelletsoe ho phethoa ka Mphalane 2026."
    },
    {
      qEN: "How do I contact the Area Councillor?",
      qST: "Nka ikopanya joang le Khanselara ea Sebaka?",
      aEN: "You can reach Mr. Sepipi through the Constituency Office, or check the Contacts page for direct office telephone numbers and operating hours.",
      aST: "U ka ikopanya le Mong. Sepipi ka Ofisi ea Lebatooa, kapa ua sheba leqepheng la Likopano bakeng sa linomoro tsa thelefono tsa ofisi."
    },
    {
      qEN: "Are community facilities available for private events?",
      qST: "Na libaka tsa sechaba lia fumaneha bakeng sa liketsahalo tsa poraefete?",
      aEN: "Yes, certain community halls and school grounds can be booked for events. You need to apply through the local village chief or the specific institution's administration.",
      aST: "E, liholo tse ling tsa sechaba le mabala a likolo a ka behelloa bakeng sa liketsahalo. U lokela ho etsa kopo ka morena oa motse kapa tsamaiso ea setsi se amehang."
    },
    {
      qEN: "What educational options exist for secondary students?",
      qST: "Mekhoa ea thuto e fumanehang bakeng sa baithuti ba sekolo se phahameng ke efe?",
      aEN: "The constituency boasts several premier options, most notably Lesotho High School and Mabathoana High School, both offering robust academic programs.",
      aST: "Lebatooa le na le likhetho tse 'maloa tse hlahelletseng, haholo Lesotho High School le Mabathoana High School."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-serif font-bold text-foreground mb-6">
            {language === 'EN' ? "Frequently Asked Questions" : "Lipotso Tse Botsoang Khafetsa"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {language === 'EN' 
              ? "Find answers to common questions about our constituency, services, and local administration."
              : "Fumana likarabo tsa lipotso tse tloaelehileng mabapi le lebatooa la rona, litšebeletso, le tsamaiso ea lehae."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border rounded-3xl p-6 md:p-10 shadow-sm"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b-border/60 py-2">
                <AccordionTrigger className="text-left font-serif text-lg md:text-xl font-bold hover:text-primary transition-colors">
                  {language === 'EN' ? faq.qEN : faq.qST}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-6">
                  {language === 'EN' ? faq.aEN : faq.aST}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}
