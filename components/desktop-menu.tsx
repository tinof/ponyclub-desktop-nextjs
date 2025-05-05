"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Globe, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function DesktopMenu() {
  const { t, language, setLanguage } = useLanguage()
  const pathname = usePathname()
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [activitiesMenuOpen, setActivitiesMenuOpen] = useState(false)
  const activitiesMenuRef = useRef<HTMLDivElement>(null)
  const languageMenuRef = useRef<HTMLDivElement>(null)
  
  // Activities menu items
  const activities = language === "el" ? [
    { id: "kayaking", label: "Καγιάκ", href: "/kayaking" },
    { id: "rafting", label: "Ράφτινγκ", href: "/rafting" },
    { id: "riding", label: "Ιππασία", href: "/riding" },
    { id: "trekking", label: "Πεζοπορία", href: "/trekking" },
  ] : [
    { id: "kayaking", label: "Kayaking", href: "/kayaking" },
    { id: "rafting", label: "Rafting", href: "/rafting" },
    { id: "riding", label: "Riding", href: "/riding" },
    { id: "trekking", label: "Trekking", href: "/trekking" },
  ]

  // Handle clicks outside the menu to close them
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (activitiesMenuRef.current && !activitiesMenuRef.current.contains(event.target as Node)) {
        setActivitiesMenuOpen(false)
      }
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setLanguageMenuOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="flex items-center gap-3">
      {/* Home link */}
      <Link
        href="/"
        className={`relative px-5 py-3 rounded-full ${
          pathname === "/" 
            ? "bg-[#6b8362]/20 text-[#6b8362] font-semibold border-[#6b8362]/30" 
            : "bg-white/90 hover:bg-white text-[#6b8362] font-medium border-amber-100/50"
        } border shadow-md hover:shadow-lg transition-all text-base`}
      >
        Home
        <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r from-amber-200/30 to-transparent blur-sm"></div>
      </Link>
      
      {/* Activities dropdown */}
      <div className="relative" ref={activitiesMenuRef}>
        <button
          onClick={() => setActivitiesMenuOpen(!activitiesMenuOpen)}
          className={`relative flex items-center gap-1 px-5 py-3 rounded-full ${
            activities.some(activity => pathname === activity.href)
              ? "bg-[#6b8362]/20 text-[#6b8362] font-semibold border-[#6b8362]/30" 
              : "bg-white/90 hover:bg-white text-[#6b8362] font-medium border-amber-100/50"
          } border shadow-md hover:shadow-lg transition-all text-base`}
        >
          {language === "el" ? "Δραστηριότητες" : "Activities"}
          <ChevronDown className="w-5 h-5 ml-1" />
          <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r from-amber-200/30 to-transparent blur-sm"></div>
        </button>
        
        {activitiesMenuOpen && (
          <div className="absolute left-0 mt-2 w-52 rounded-lg shadow-xl bg-white/95 backdrop-blur-sm ring-1 ring-amber-100 z-50 border border-amber-100/50 overflow-hidden">
            <div className="py-1">
              {activities.map((activity) => (
                <Link
                  key={activity.id}
                  href={activity.href}
                  className={`block w-full text-left px-4 py-3 text-base ${
                    pathname === activity.href 
                      ? "bg-[#6b8362]/10 text-[#6b8362] font-semibold" 
                      : "text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]"
                  }`}
                >
                  {activity.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* River & Village - English only */}
      {language === "en" && (
        <Link
          href="/river-village"
          className={`relative px-5 py-3 rounded-full ${
            pathname === "/river-village" 
              ? "bg-[#6b8362]/20 text-[#6b8362] font-semibold border-[#6b8362]/30" 
              : "bg-white/90 hover:bg-white text-[#6b8362] font-medium border-amber-100/50"
          } border shadow-md hover:shadow-lg transition-all text-base`}
        >
          River & Village
          <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r from-amber-200/30 to-transparent blur-sm"></div>
        </Link>
      )}
      
      {/* For Schools (Για τα σχολεία) - Greek only */}
      {language === "el" && (
        <Link
          href="/for-schools"
          className={`relative px-5 py-3 rounded-full ${
            pathname === "/for-schools" 
              ? "bg-[#6b8362]/20 text-[#6b8362] font-semibold border-[#6b8362]/30" 
              : "bg-white/90 hover:bg-white text-[#6b8362] font-medium border-amber-100/50"
          } border shadow-md hover:shadow-lg transition-all text-base`}
        >
          Για τα σχολεία
          <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r from-amber-200/30 to-transparent blur-sm"></div>
        </Link>
      )}
      
      {/* Language selector */}
      <div className="relative ml-2" ref={languageMenuRef}>
        <button
          onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
          className="relative flex items-center gap-1 px-4 py-3 rounded-full bg-white/90 hover:bg-white transition-colors text-[#6b8362] font-medium shadow-md border border-amber-100/50 hover:shadow-lg text-base"
        >
          <Globe className="w-5 h-5" />
          <span>{language === "en" ? "EN" : "EL"}</span>
          <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r from-amber-200/30 to-transparent blur-sm"></div>
        </button>
        
        {languageMenuOpen && (
          <div className="absolute right-0 mt-2 w-32 rounded-lg shadow-xl bg-white/95 backdrop-blur-sm ring-1 ring-amber-100 z-50 border border-amber-100/50 overflow-hidden">
            <div className="py-1">
              <button
                onClick={() => {
                  setLanguage("en")
                  setLanguageMenuOpen(false)
                }}
                className={`block w-full text-left px-4 py-3 text-base ${language === "en" ? "bg-[#6b8362]/10 text-[#6b8362] font-semibold" : "text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]"}`}
              >
                English
              </button>
              <button
                onClick={() => {
                  setLanguage("el")
                  setLanguageMenuOpen(false)
                }}
                className={`block w-full text-left px-4 py-3 text-base ${language === "el" ? "bg-[#6b8362]/10 text-[#6b8362] font-semibold" : "text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]"}`}
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
