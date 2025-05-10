"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { usePathname } from "next/navigation"

export default function StandaloneMenuItems() {
  const { language } = useLanguage()
  const pathname = usePathname()
  
  // Only show River & Village for English language
  if (language !== "en") {
    return null
  }
  
  const isActive = pathname === "/river-village"
  
  return (
    <Link
      href="/river-village"
      className={`relative flex items-center gap-1 px-3 py-2 rounded-full ${
        isActive 
          ? "bg-[#6b8362]/20 text-[#6b8362] font-semibold border-[#6b8362]/30" 
          : "bg-white/90 hover:bg-white text-[#6b8362] font-medium border-amber-100/50"
      } transition-colors shadow-md border hover:shadow-lg hover:scale-105 transition-all duration-200`}
    >
      <span>River & Village</span>
      <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-linear-to-r from-amber-200/30 to-transparent blur-xs"></div>
    </Link>
  )
} 