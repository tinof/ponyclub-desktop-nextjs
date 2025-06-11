'use client'

import { Globe } from 'lucide-react'
import { useState } from 'react'

import { useLanguage } from '@/contexts/language-context'
import type { Language } from '@/lib/translations'

export default function LanguageSelector() {
  const { language: currentLocale, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)
  const closeDropdown = () => setIsOpen(false)

  const handleLanguageChange = (newLocale: Language) => {
    closeDropdown()
    if (currentLocale !== newLocale) {
      setLanguage(newLocale)
    }
  }

  return (
    <div className='relative'>
      <button
        onClick={toggleDropdown}
        className={`
          relative flex items-center gap-1 rounded-full border
          border-amber-100/50 bg-white/90 px-3 py-2 font-medium text-[#6b8362]
          shadow-md transition-all transition-colors duration-200
          hover:scale-105 hover:bg-white hover:shadow-lg
        `}
        aria-haspopup='true'
        aria-label={`Change language, currently ${currentLocale === 'en' ? 'English' : 'Greek'}`}
      >
        <Globe className='h-4 w-4' />
        {/* Display based on context language, which updates from URL via LanguageProvider */}
        <span>{currentLocale === 'en' ? 'EN' : 'EL'}</span>
        <div
          className={`
            absolute -inset-[0.5px] -z-10 rounded-full bg-linear-to-r
            from-amber-200/30 to-transparent blur-xs
          `}
        ></div>
      </button>

      {isOpen && (
        <>
          <div className='fixed inset-0 z-10' onClick={closeDropdown} aria-hidden='true' />
          <div
            className={`
              absolute right-0 z-20 mt-1 w-36 overflow-hidden rounded-lg border
              border-amber-100/50 bg-white/95 shadow-xl ring-1 ring-amber-100
              backdrop-blur-xs
            `}
          >
            <div className='py-1' role='menu' aria-orientation='vertical'>
              <button
                className={`
                  w-full px-4 py-2 text-left text-sm
                  ${
                    currentLocale === 'en'
                      ? 'bg-[#6b8362]/10 font-medium text-[#6b8362]'
                      : 'text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]'
                  }
                  transition-colors
                `}
                onClick={() => handleLanguageChange('en')}
                role='menuitem'
                aria-label='Switch to English'
              >
                {t.language.en}
              </button>
              <button
                className={`
                  w-full px-4 py-2 text-left text-sm
                  ${
                    currentLocale === 'el'
                      ? 'bg-[#6b8362]/10 font-medium text-[#6b8362]'
                      : 'text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]'
                  }
                  transition-colors
                `}
                onClick={() => handleLanguageChange('el')}
                role='menuitem'
                aria-label='Switch to Greek'
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
