"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type Language, translations, type TranslationKeys } from "@/lib/translations"
import { bokunLangMap } from "@/lib/bokun-lang"
import { useBokunLanguage } from "@/lib/use-bokun-language"

type LanguageContextType = {
  language: Language
  t: TranslationKeys
  setLanguage: (lang: Language) => void
}

const defaultLanguage: Language = "en";

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLang?: string; // From URL via app/[locale]/layout.tsx
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialLang }: LanguageProviderProps) {
  // Initialize state: prioritize initialLang from URL, then localStorage, then browser, then default
  const [language, setLanguageState] = useState<Language>(() => {
    if (initialLang && (initialLang === "en" || initialLang === "el")) {
      return initialLang as Language;
    }
    // This part runs only on the client after hydration, if initialLang wasn't set server-side
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "el")) {
        return savedLanguage;
      }
      const browserLanguage = navigator.language.split("-")[0];
      if (browserLanguage === "el") {
        return "el";
      }
    }
    return defaultLanguage;
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If initialLang was provided (from URL), it's already set.
    // If not, this effect ensures client-side preferences (localStorage, browser) are applied.
    // This effect also handles cases where initialLang might not be 'en' or 'el' (though unlikely with current setup).
    if (!initialLang || (initialLang !== "en" && initialLang !== "el")) {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "el")) {
        if (language !== savedLanguage) setLanguageState(savedLanguage);
        return;
      }

      const browserLanguage = navigator.language.split("-")[0];
      const currentBrowserLang = browserLanguage === "el" ? "el" : "en";
      if (language !== currentBrowserLang) setLanguageState(currentBrowserLang);
    }
  }, [initialLang, language]); // Rerun if initialLang changes (e.g. route change) or if language state is updated externally

  // Save language preference to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  // Get translations for current language
  const t = translations[language]

  // Hook to update Bokun widgets language on change
  useBokunLanguage(bokunLangMap[language])

  // Only render children when mounted to avoid hydration issues
  if (!mounted) {
    return null
  }

  return <LanguageContext.Provider value={{ language, t, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
