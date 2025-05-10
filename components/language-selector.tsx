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
        className="relative flex items-center gap-1 px-3 py-2 rounded-full bg-white/90 hover:bg-white transition-colors text-[#6b8362] font-medium shadow-md border border-amber-100/50 hover:shadow-lg hover:scale-105 transition-all duration-200"
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span>{language === "en" ? "EN" : "EL"}</span>
        <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-linear-to-r from-amber-200/30 to-transparent blur-xs"></div>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={closeDropdown} aria-hidden="true" />
          <div className="absolute right-0 mt-1 w-36 rounded-lg shadow-xl bg-white/95 backdrop-blur-xs ring-1 ring-amber-100 z-20 border border-amber-100/50 overflow-hidden">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <button
                className={`w-full text-left px-4 py-2 text-sm ${
                  language === "en" ? "bg-[#6b8362]/10 font-medium text-[#6b8362]" : "text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]"
                } transition-colors`}
                onClick={() => handleLanguageChange("en")}
                role="menuitem"
              >
                {t.language.en}
              </button>
              <button
                className={`w-full text-left px-4 py-2 text-sm ${
                  language === "el" ? "bg-[#6b8362]/10 font-medium text-[#6b8362]" : "text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]"
                } transition-colors`}
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
