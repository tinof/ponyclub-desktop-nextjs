"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Menu, Phone } from "lucide-react"

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
        className="flex items-center justify-center p-2 w-10 h-10 rounded-full hover:bg-secondary transition-colors" /* Simplified style */
        aria-label="Menu"
      >
        <Menu className="w-5 h-5 text-foreground hover:text-primary" /> {/* Standard icon color */}
        {/* Removed inset div */}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-card z-50 border border-border overflow-hidden"> {/* Cleaner dropdown style */}
          <div className="py-2 px-1">
            {/* Call us button - prominently displayed at top */}
            <a
              href={`tel:${t.contact.phone1.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-3 mx-3 mb-3 px-4 py-3 text-primary-foreground bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-xl shadow-md border border-primary-foreground/10 backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
              onClick={closeMenu}
            >
              <Phone className="w-5 h-5 text-primary-foreground/90" />
              <span className="font-medium tracking-wide">{language === "el" ? "Καλέστε μας" : "Call Us"}</span>
            </a>

            {/* Home link */}
            <Link
              href="/"
              className={`block px-4 py-2.5 text-sm ${ /* Removed rounded-md */
                pathname === "/"
                  ? "text-primary font-semibold" /* Active: darker green text, no bg */
                  : "text-foreground hover:bg-secondary hover:text-primary" /* Inactive: hover bg and text */
              } transition-colors`}
              onClick={closeMenu}
            >
              Home
            </Link>

            {/* River & Village - English only */}
            {language === "en" && (
              <Link
                href="/river-village"
                className={`block px-4 py-2.5 text-sm ${ /* Removed rounded-md */
                  pathname === "/river-village"
                    ? "text-primary font-semibold"
                    : "text-foreground hover:bg-secondary hover:text-primary"
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
                className={`block px-4 py-2.5 text-sm ${ /* Removed rounded-md */
                  pathname === "/for-schools"
                    ? "text-primary font-semibold"
                    : "text-foreground hover:bg-secondary hover:text-primary"
                } transition-colors`}
                onClick={closeMenu}
              >
                Για τα σχολεία
              </Link>
            )}

            {/* Activities section */}
            <div className="mt-1 pt-1 border-t border-border"> {/* Cleaner border */}
              <div className="px-4 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider"> {/* Standard header text */}
                {language === "el" ? "Δραστηριότητες" : "Activities"}
              </div>
              {activities.map((activity) => (
                <Link
                  key={activity.id}
                  href={activity.href}
                  className={`block px-4 py-2.5 text-sm ${ /* Removed rounded-md */
                    pathname === activity.href
                      ? "text-primary font-semibold"
                      : "text-foreground hover:bg-secondary hover:text-primary"
                  } transition-colors`}
                  onClick={closeMenu}
                >
                  {activity.label}
                </Link>
              ))}
            </div>

            {/* Language selector in menu */}
            <div className="mt-1 pt-1 border-t border-border"> {/* Cleaner border */}
              <div className="px-4 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider"> {/* Standard header text */}
                Language
              </div>
              {/* Simplified language buttons to look like text options */}
              <button
                className={`block w-full text-left px-4 py-2.5 text-sm ${language === "en" ? "text-primary font-semibold" : "text-foreground hover:bg-secondary hover:text-primary"} transition-colors`}
                onClick={() => handleLanguageChange("en")}
              >
                English
              </button>
              <button
                className={`block w-full text-left px-4 py-2.5 text-sm ${language === "el" ? "text-primary font-semibold" : "text-foreground hover:bg-secondary hover:text-primary"} transition-colors`}
                onClick={() => handleLanguageChange("el")}
              >
                Ελληνικά
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
