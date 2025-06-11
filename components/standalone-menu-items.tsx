'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useLanguage } from '@/contexts/language-context'

export default function StandaloneMenuItems() {
  const { language } = useLanguage()
  const pathname = usePathname()

  // Only show River & Village for English language
  if (language !== 'en') {
    return null
  }

  const isActive = pathname === '/river-village'

  return (
    <Link
      href='/river-village'
      className={`
        relative flex items-center gap-1 rounded-full px-3 py-2
        ${
          isActive
            ? 'border-[#6b8362]/30 bg-[#6b8362]/20 font-semibold text-[#6b8362]'
            : 'border-amber-100/50 bg-white/90 font-medium text-[#6b8362] hover:bg-white'
        }
        border shadow-md transition-all transition-colors duration-200
        hover:scale-105 hover:shadow-lg
      `}
    >
      <span>River & Village</span>
      <div
        className={`
          absolute -inset-[0.5px] -z-10 rounded-full bg-linear-to-r
          from-amber-200/30 to-transparent blur-xs
        `}
      ></div>
    </Link>
  )
}
