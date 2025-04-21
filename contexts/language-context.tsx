"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type Language, translations, type TranslationKeys } from "@/lib/translations"

type LanguageContextType = {
  language: Language
  t: TranslationKeys
  setLanguage: (lang: Language) => void
}

const defaultLanguage: Language = "en"

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)
  const [mounted, setMounted] = useState(false)

  // Set language based on localStorage or browser preference
  useEffect(() => {
    setMounted(true)

    // Check localStorage first
    const savedLanguage = localStorage.getItem("language") as Language

    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "el")) {
      setLanguageState(savedLanguage)
      return
    }

    // Check browser language
    const browserLanguage = navigator.language.split("-")[0]
    if (browserLanguage === "el") {
      setLanguageState("el")
    } else {
      setLanguageState("en") // Default to English for all other languages
    }
  }, [])

  // Save language preference to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  // Get translations for current language
  const t = translations[language]

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
