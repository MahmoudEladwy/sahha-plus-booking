import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import i18n from "@/lib/i18n";

type Lang = "ar" | "en";
type Ctx = { lang: Lang; dir: "rtl" | "ltr"; toggle: () => void; setLang: (l: Lang) => void };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("sehha-lang") as Lang)) || "ar";
    setLangState(saved);
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
    i18n.changeLanguage(lang);
    if (typeof window !== "undefined") localStorage.setItem("sehha-lang", lang);
  }, [lang]);

  const value: Ctx = {
    lang,
    dir: lang === "ar" ? "rtl" : "ltr",
    toggle: () => setLangState((l) => (l === "ar" ? "en" : "ar")),
    setLang: setLangState,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
