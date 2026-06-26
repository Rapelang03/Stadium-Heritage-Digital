import { type ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Building, ShieldAlert, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Contact = {
  name: string;
  phone: string;
  details?: string;
  email?: string;
  address?: string;
};

type DirectorySection = {
  category: string;
  icon: ReactNode;
  contacts: Contact[];
};

export default function Contacts() {
  const { language } = useLanguage();

  const directories: DirectorySection[] = [
    {
      category: "Constituency Office",
      icon: <Building className="h-6 w-6" />,
      contacts: [
        { name: "MP's Office", details: "Hon. Justice N. Majara", phone: "+266 2231 0001", email: "office@stadiumarea.gov.ls" },
        { name: "Area Councillor", details: "Mr. Sepipi", phone: "+266 2231 0002" }
      ]
    },
    {
      category: "Emergency Services",
      icon: <ShieldAlert className="h-6 w-6" />,
      contacts: [
        { name: "Police (Maseru Central)", phone: "112 / +266 2231 2222" },
        { name: "Fire Department", phone: "115 / +266 2232 2222" },
        { name: "Ambulance / Medical", phone: "114" }
      ]
    },
    {
      category: "Educational Institutions",
      icon: <GraduationCap className="h-6 w-6" />,
      contacts: [
        { name: "Lesotho High School", phone: "+266 2231 3333", address: "Stadium Area, Maseru" },
        { name: "Mabathoana High School", phone: "+266 2231 4444" },
        { name: "Lerotholi Polytechnic", phone: "+266 2231 5555" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h1 className="text-5xl font-serif font-bold text-foreground mb-6">
            {language === 'EN' ? "Useful Contacts" : "Likopano tse Molemo"}
          </h1>
          <p className="text-xl text-muted-foreground">
            A directory of essential services, offices, and institutions serving Constituency No. 32.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {directories.map((dir, i) => (
            <motion.div
              key={dir.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border border-border shadow-sm">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-8 pb-4 border-b border-border">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                      {dir.icon}
                    </div>
                    <h2 className="text-xl font-serif font-bold text-foreground">{dir.category}</h2>
                  </div>

                  <div className="space-y-6">
                    {dir.contacts.map((contact, idx) => (
                      <div key={idx} className="space-y-2">
                        <h3 className="font-semibold text-foreground">{contact.name}</h3>
                        {contact.details && <p className="text-sm text-muted-foreground">{contact.details}</p>}
                        
                        <div className="flex flex-col space-y-2 mt-2">
                          {contact.phone && (
                            <div className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                              <Phone className="w-4 h-4 mr-3 shrink-0" />
                              <span>{contact.phone}</span>
                            </div>
                          )}
                          {contact.email && (
                            <div className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                              <Mail className="w-4 h-4 mr-3 shrink-0" />
                              <span>{contact.email}</span>
                            </div>
                          )}
                          {contact.address && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-3 shrink-0" />
                              <span>{contact.address}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
