"use client"

import { useState } from "react"
import { ChevronDown, Home } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ActivitiesMenu() {
  const { t, language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHomepage = pathname === "/"

  const toggleDropdown = () => setIsOpen(!isOpen)
  const closeDropdown = () => setIsOpen(false)

  const activities = [
    { id: "kayak-rafting", label: "Kayak & Rafting", href: "/kayak-rafting" },
    { id: "riding", label: "Riding", href: "/riding" },
    { id: "trekking", label: "Trekking", href: "/trekking" },
  ]
  
  if (language === "en") {
    // River & Village is now a standalone menu item, so we don't need to add it here
  }

  return (
    <div className="flex items-center gap-2">
      {!isHomepage && (
        <Link
          href="/"
          className="relative flex items-center gap-1 px-3 py-2 rounded-full bg-white/90 hover:bg-white transition-colors text-[#6b8362] font-medium shadow-md border border-amber-100/50 hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Home</span>
          <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r from-amber-200/30 to-transparent blur-sm"></div>
        </Link>
      )}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="relative flex items-center gap-1 px-3 py-2 rounded-full bg-white/90 hover:bg-white transition-colors text-[#6b8362] font-medium shadow-md border border-amber-100/50 hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <span>Activities</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-gradient-to-r from-amber-200/30 to-transparent blur-sm"></div>
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={closeDropdown} />
            <div className="absolute left-0 mt-1 w-36 rounded-lg shadow-xl bg-white/95 backdrop-blur-sm ring-1 ring-amber-100 z-20 border border-amber-100/50 overflow-hidden">
              <div className="py-1">
                {activities.map((activity) => (
                  <Link
                    key={activity.id}
                    href={activity.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362] transition-colors"
                    onClick={closeDropdown}
                  >
                    {activity.label}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 