"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Menu } from "lucide-react"

export default function HamburgerMenu() {
  const { t, language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  
  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Activities menu items
  const activities = [
    { id: "kayak-rafting", label: language === "el" ? "Καγιάκ & Ράφτινγκ" : "Kayak & Rafting", href: "/kayak-rafting" },
    { id: "riding", label: language === "el" ? "Ιππασία" : "Riding", href: "/riding" },
    { id: "trekking", label: language === "el" ? "Πεζοπορία" : "Trekking", href: "/trekking" },
  ]

  // Handle language change
  const handleLanguageChange = (lang: "en" | "el") => {
    setLanguage(lang)
    closeMenu()
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Hamburger button */}
      <button
        onClick={toggleMenu}
        className="relative flex items-center justify-center p-2 w-10 h-10 rounded-full bg-white/90 hover:bg-white transition-colors shadow-md border border-amber-100/50 hover:shadow-lg hover:scale-105 transition-all duration-200"
        aria-label="Menu"
      >
        <Menu className="w-5 h-5 text-[#6b8362]" />
        <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r from-amber-200/30 to-transparent blur-sm"></div>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-xl bg-white/95 backdrop-blur-sm ring-1 ring-amber-100 z-50 border border-amber-100/50 overflow-hidden">
          <div className="py-2 px-1">
            {/* Home link */}
            <Link
              href="/"
              className={`block px-4 py-2.5 text-sm rounded-md ${
                pathname === "/" 
                  ? "bg-[#6b8362]/10 text-[#6b8362] font-semibold" 
                  : "text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]"
              } transition-colors`}
              onClick={closeMenu}
            >
              Home
            </Link>
            
            {/* River & Village - English only */}
            {language === "en" && (
              <Link
                href="/river-village"
                className={`block px-4 py-2.5 text-sm rounded-md ${
                  pathname === "/river-village" 
                    ? "bg-[#6b8362]/10 text-[#6b8362] font-semibold" 
                    : "text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]"
                } transition-colors`}
                onClick={closeMenu}
              >
                River & Village
              </Link>
            )}
            
            {/* For Schools (Για τα σχολεία) - Greek only */}
            {language === "el" && (
              <Link
                href="/for-schools"
                className={`block px-4 py-2.5 text-sm rounded-md ${
                  pathname === "/for-schools" 
                    ? "bg-[#6b8362]/10 text-[#6b8362] font-semibold" 
                    : "text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]"
                } transition-colors`}
                onClick={closeMenu}
              >
                Για τα σχολεία
              </Link>
            )}
            
            {/* Activities section - already grouped correctly */}
            <div className="mt-1 pt-1 border-t border-amber-100/50">
              <div className="px-4 py-1.5 text-xs font-semibold text-[#6b8362]/70 uppercase tracking-wider">
                {language === "el" ? "Δραστηριότητες" : "Activities"}
              </div>
              {activities.map((activity) => (
                <Link
                  key={activity.id}
                  href={activity.href}
                  className={`block px-4 py-2.5 text-sm rounded-md ${
                    pathname === activity.href 
                      ? "bg-[#6b8362]/10 text-[#6b8362] font-semibold" 
                      : "text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]"
                  } transition-colors`}
                  onClick={closeMenu}
                >
                  {activity.label}
                </Link>
              ))}
            </div>
            
            {/* Language selector in menu */}
            <div className="mt-1 pt-1 border-t border-amber-100/50">
              <div className="px-4 py-1.5 text-xs font-semibold text-[#6b8362]/70 uppercase tracking-wider">
                Language
              </div>
              <div className="px-4 py-2">
                <button 
                  className={`inline-block px-3 py-1.5 rounded-md text-sm ${language === "en" ? "bg-[#6b8362]/20 text-[#6b8362] font-semibold" : "text-gray-700 hover:bg-[#6b8362]/10"} mr-2 transition-colors`}
                  onClick={() => handleLanguageChange("en")}
                >
                  English
                </button>
                <button 
                  className={`inline-block px-3 py-1.5 rounded-md text-sm ${language === "el" ? "bg-[#6b8362]/20 text-[#6b8362] font-semibold" : "text-gray-700 hover:bg-[#6b8362]/10"} transition-colors`}
                  onClick={() => handleLanguageChange("el")}
                >
                  Ελληνικά
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 