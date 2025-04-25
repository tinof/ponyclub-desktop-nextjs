"use client"

import { useState } from "react"
import { ChevronDown, Home } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ActivitiesMenu() {
  const { t } = useLanguage()
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

  return (
    <div className="flex items-center gap-2">
      {!isHomepage && (
        <Link
          href="/"
          className="flex items-center gap-1 px-3 py-2 rounded-full bg-white/80 hover:bg-white transition-colors text-[#6b8362] font-medium"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Home</span>
        </Link>
      )}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-1 px-3 py-2 rounded-full bg-white/80 hover:bg-white transition-colors text-[#6b8362] font-medium"
        >
          <span>Activities</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={closeDropdown} />
            <div className="absolute left-0 mt-1 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
              <div className="py-1">
                {activities.map((activity) => (
                  <Link
                    key={activity.id}
                    href={activity.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]"
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