"use client"

import { useLanguage } from "@/contexts/language-context"
import type { Language } from "@/lib/translations"
import { Globe } from "lucide-react"
import { useState } from "react"

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)
  const closeDropdown = () => setIsOpen(false)

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    closeDropdown()
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 px-3 py-2 rounded-full bg-white/80 hover:bg-white transition-colors text-[#6b8362] font-medium"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span>{language === "en" ? "EN" : "EL"}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={closeDropdown} aria-hidden="true" />
          <div className="absolute right-0 mt-1 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <button
                className={`w-full text-left px-4 py-2 text-sm ${
                  language === "en" ? "bg-[#6b8362]/10 font-medium text-[#6b8362]" : "text-gray-700"
                }`}
                onClick={() => handleLanguageChange("en")}
                role="menuitem"
              >
                {t.language.en}
              </button>
              <button
                className={`w-full text-left px-4 py-2 text-sm ${
                  language === "el" ? "bg-[#6b8362]/10 font-medium text-[#6b8362]" : "text-gray-700"
                }`}
                onClick={() => handleLanguageChange("el")}
                role="menuitem"
              >
                {t.language.el}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
