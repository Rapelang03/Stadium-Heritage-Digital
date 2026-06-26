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
