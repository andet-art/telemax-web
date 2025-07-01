// src/context/LanguageContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import de from "../i18n/de.json";
import en from "../i18n/en.json";

const translations = { de, en };
type Language = "de" | "en";

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}>({
  lang: "de",
  setLang: () => {},
  toggleLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem("lang") as Language) || "de";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "de" ? "en" : "de"));
  };

  const t = (key: string) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
