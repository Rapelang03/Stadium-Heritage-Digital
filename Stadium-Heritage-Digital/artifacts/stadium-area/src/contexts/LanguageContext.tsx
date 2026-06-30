import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'EN' | 'ST';

interface Translations {
  [key: string]: {
    EN: string;
    ST: string;
  };
}

const translations: Translations = {
  home: { EN: 'Home', ST: 'Lapeng' },
  history: { EN: 'History', ST: 'Nalane' },
  about: { EN: 'About', ST: 'Ka Moo' },
  villages: { EN: 'Villages', ST: 'Metse' },
  education: { EN: 'Education', ST: 'Thuto' },
  sports: { EN: 'Sports', ST: 'Lipapali' },
  culture: { EN: 'Culture', ST: 'Setso' },
  places: { EN: 'Places', ST: 'Libaka tse Battsoang' },
  developments: { EN: 'Developments', ST: 'Ntsetsopele' },
  news: { EN: 'News', ST: 'Litaba' },
  gallery: { EN: 'Gallery', ST: 'Difoto' },
  contacts: { EN: 'Contact', ST: 'Ikopanya' },
  faq: { EN: 'FAQ', ST: 'Lipotso' },
  sources: { EN: 'Sources', ST: 'Metheo le Mehloli' },
  map: { EN: 'Interactive Map', ST: 'Mmapa oa Poraena' },
  sefika: { EN: 'Sefika Campus', ST: 'Kepe ea Sefika' },
  thamaeChurch: { EN: 'Thamae Church', ST: 'Kereke ea Thamae' },
  library: { EN: 'Spiritual Hub', ST: 'Setsi sa Moya' },
  welcome: { EN: 'Welcome to Stadium Area', ST: 'Rea u amohela Sebakeng sa Setadieme' },
  learnMore: { EN: 'Learn More', ST: 'Ithuta Hape' },
  explore: { EN: 'Explore', ST: 'Hlahloba' },
  discover: { EN: 'Discover', ST: 'Tseba' },
  community: { EN: 'Community', ST: 'Sechaba' },
  institutions: { EN: 'Institutions', ST: 'Mekhatlo' },
  civic: { EN: 'Civic', ST: 'Setjhaba' },
  info: { EN: 'Info', ST: 'Lintlha' },
  campus: { EN: 'Campus & Faith', ST: 'Kepe le Tumelo' },
  heritage: { EN: 'Heritage', ST: 'Lefa' },
  tourism: { EN: 'Tourism', ST: 'Bohahlauli' },
  tourismDirectory: { EN: 'Tourism Directory', ST: 'Lenane la Bohahlauli' },
  digitalLibrary: { EN: 'Digital Library', ST: 'Laeborari ea Dijithale' },
  galleryDescription: { EN: 'A visual archive of our vibrant community, landscapes, and heritage.', ST: 'Setšoantšo sa mahlo sa sechaba sa rona se phelang, libaka tse ntle le lefa.' },
  placesDescription: { EN: 'Explore the landmarks and scenic areas that make Constituency No. 32 a unique destination in Lesotho.', ST: 'Hlahloba libaka tse tummeng le libaka tse ntle tse etsang Setereke sa 32 sebaka se ikhethang Lesotho.' },
  searchPlaces: { EN: 'Search places...', ST: 'Batla libaka...' },
  all: { EN: 'All', ST: 'Tsohle' },
  noPlaces: { EN: 'No places found', ST: 'Ha ho libaka tse fumanoeng' },
  english: { EN: 'English', ST: 'Sekhooa' },
  sesotho: { EN: 'Sesotho', ST: 'Sesotho' },
  marketplace: { EN: 'Marketplace', ST: 'Mmaraka' },
  events: { EN: 'Events', ST: 'Liketsahalo' },
  mokhosiAlerts: { EN: 'Mokhosi Alerts', ST: 'Tsebiso tsa Mokhosi' },
  businessDirectory: { EN: 'Business Directory', ST: 'Lenane la Likhoebo' },
  signIn: { EN: 'Sign In', ST: 'Kena' },
  join: { EN: 'Join', ST: 'Ikopanye' },
  dashboard: { EN: 'Dashboard', ST: 'Phanele' },
  myDashboard: { EN: 'My Dashboard', ST: 'Phanele ea Ka' },
  adminPanel: { EN: 'Admin Panel', ST: 'Phanele ea Admin' },
  signOut: { EN: 'Sign Out', ST: 'Hora' },
  landmark: { EN: 'Landmark', ST: 'Sebaka se tummeng' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('EN');

  useEffect(() => {
    const saved = localStorage.getItem('app-language') as Language;
    if (saved && (saved === 'EN' || saved === 'ST')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
