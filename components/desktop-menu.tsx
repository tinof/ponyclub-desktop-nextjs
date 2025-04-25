"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Globe } from "lucide-react"
import { useState } from "react"

export default function DesktopMenu() {
  const { t, language, setLanguage } = useLanguage()
  const pathname = usePathname()
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  
  // Activities menu items
  const activities = [
    { id: "kayak-rafting", label: "Kayak & Rafting", href: "/kayak-rafting" },
    { id: "riding", label: "Riding", href: "/riding" },
    { id: "trekking", label: "Trekking", href: "/trekking" },
  ]

  return (
    <nav className="flex items-center gap-2">
      {/* Home link */}
      <Link
        href="/"
        className={`relative px-4 py-2 rounded-full ${
          pathname === "/" 
            ? "bg-[#6b8362]/20 text-[#6b8362] font-semibold border-[#6b8362]/30" 
            : "bg-white/90 hover:bg-white text-[#6b8362] font-medium border-amber-100/50"
        } border shadow-md hover:shadow-lg transition-all`}
      >
        Home
        <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r from-amber-200/30 to-transparent blur-sm"></div>
      </Link>
      
      {/* Activities links */}
      {activities.map((activity) => (
        <Link
          key={activity.id}
          href={activity.href}
          className={`relative px-4 py-2 rounded-full ${
            pathname === activity.href 
              ? "bg-[#6b8362]/20 text-[#6b8362] font-semibold border-[#6b8362]/30" 
              : "bg-white/90 hover:bg-white text-[#6b8362] font-medium border-amber-100/50"
          } border shadow-md hover:shadow-lg transition-all`}
        >
          {activity.label}
          <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r from-amber-200/30 to-transparent blur-sm"></div>
        </Link>
      ))}
      
      {/* River & Village - English only */}
      {language === "en" && (
        <Link
          href="/river-village"
          className={`relative px-4 py-2 rounded-full ${
            pathname === "/river-village" 
              ? "bg-[#6b8362]/20 text-[#6b8362] font-semibold border-[#6b8362]/30" 
              : "bg-white/90 hover:bg-white text-[#6b8362] font-medium border-amber-100/50"
          } border shadow-md hover:shadow-lg transition-all`}
        >
          River & Village
          <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r from-amber-200/30 to-transparent blur-sm"></div>
        </Link>
      )}
      
      {/* Language selector */}
      <div className="relative ml-2">
        <button
          onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
          className="relative flex items-center gap-1 px-3 py-2 rounded-full bg-white/90 hover:bg-white transition-colors text-[#6b8362] font-medium shadow-md border border-amber-100/50 hover:shadow-lg"
        >
          <Globe className="w-4 h-4" />
          <span>{language === "en" ? "EN" : "EL"}</span>
          <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r from-amber-200/30 to-transparent blur-sm"></div>
        </button>
        
        {languageMenuOpen && (
          <div className="absolute right-0 mt-1 w-28 rounded-lg shadow-xl bg-white/95 backdrop-blur-sm ring-1 ring-amber-100 z-50 border border-amber-100/50 overflow-hidden">
            <div className="py-1">
              <button
                onClick={() => {
                  setLanguage("en")
                  setLanguageMenuOpen(false)
                }}
                className={`block w-full text-left px-3 py-2 text-sm ${language === "en" ? "bg-[#6b8362]/10 text-[#6b8362] font-semibold" : "text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]"}`}
              >
                English
              </button>
              <button
                onClick={() => {
                  setLanguage("el")
                  setLanguageMenuOpen(false)
                }}
                className={`block w-full text-left px-3 py-2 text-sm ${language === "el" ? "bg-[#6b8362]/10 text-[#6b8362] font-semibold" : "text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]"}`}
              >
                Ελληνικά
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 