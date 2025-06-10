'use client'

import { Globe, ChevronDown, Phone } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

import { useLanguage } from '@/contexts/language-context'

export default function DesktopMenu() {
  const { t, language, setLanguage } = useLanguage()
  const pathname = usePathname()
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [activitiesMenuOpen, setActivitiesMenuOpen] = useState(false)
  const activitiesMenuRef = useRef<HTMLDivElement>(null)
  const languageMenuRef = useRef<HTMLDivElement>(null)

  // Activities menu items
  const activities =
    language === 'el'
      ? [
          { id: 'kayaking', label: 'Καγιάκ', href: '/kayaking' },
          { id: 'rafting', label: 'Ράφτινγκ', href: '/rafting' },
          { id: 'riding', label: 'Ιππασία', href: '/riding' },
          { id: 'trekking', label: 'Πεζοπορία', href: '/trekking' },
        ]
      : [
          { id: 'kayaking', label: 'Kayaking', href: '/kayaking' },
          { id: 'rafting', label: 'Rafting', href: '/rafting' },
          { id: 'riding', label: 'Riding', href: '/riding' },
          { id: 'trekking', label: 'Trekking', href: '/trekking' },
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

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className='flex items-center gap-4'>
      {' '}
      {/* Increased gap */}
      {/* Home link */}
      <Link
        href='/'
        className={`px-3 py-2 transition-all text-base border-b-2 ${
          /* Adjusted padding, removed relative, rounded-full, bg, border, shadow */
          pathname === '/'
            ? 'text-primary font-semibold border-primary' /* Darker green active text, active border */
            : 'text-foreground hover:text-primary font-medium border-transparent' /* Standard text, hover, transparent border */
        }`}
      >
        {t.navigation.home}
        {/* Removed inset div */}
      </Link>
      {/* Activities dropdown */}
      <div className='relative' ref={activitiesMenuRef}>
        <button
          onClick={() => setActivitiesMenuOpen(!activitiesMenuOpen)}
          className={`flex items-center gap-1 px-3 py-2 transition-all text-base border-b-2 ${
            /* Adjusted padding, removed relative, rounded-full, bg, border, shadow */
            activities.some(activity => pathname === activity.href) || activitiesMenuOpen
              ? 'text-primary font-semibold border-primary' /* Darker green active text, active border */
              : 'text-foreground hover:text-primary font-medium border-transparent' /* Standard text, hover, transparent border */
          }`}
        >
          {t.navigation.activities}
          <ChevronDown className='w-5 h-5 ml-1' />
          {/* Removed inset div */}
        </button>

        {activitiesMenuOpen && (
          <div className='absolute left-0 mt-2 w-52 rounded-lg shadow-lg bg-card z-50 border border-border overflow-hidden'>
            {' '}
            {/* Cleaner dropdown style */}
            <div className='py-1'>
              {activities.map(activity => (
                <Link
                  key={activity.id}
                  href={activity.href}
                  className={`block w-full text-left px-4 py-2 text-base ${
                    /* Adjusted padding */
                    pathname === activity.href
                      ? 'text-primary font-semibold' /* Active item: darker green text, no bg */
                      : 'text-foreground hover:bg-secondary hover:text-primary' /* Standard item: hover bg and text */
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
      {language === 'en' && (
        <Link
          href='/river-village'
          className={`px-3 py-2 transition-all text-base border-b-2 ${
            /* Adjusted padding, removed relative, rounded-full, bg, border, shadow */
            pathname === '/river-village'
              ? 'text-primary font-semibold border-primary' /* Darker green active text, active border */
              : 'text-foreground hover:text-primary font-medium border-transparent' /* Standard text, hover, transparent border */
          }`}
        >
          River & Village
          {/* Removed inset div */}
        </Link>
      )}
      {/* For Schools (Για τα σχολεία) - Greek only */}
      {language === 'el' && (
        <Link
          href='/for-schools'
          className={`px-3 py-2 transition-all text-base border-b-2 ${
            /* Adjusted padding, removed relative, rounded-full, bg, border, shadow */
            pathname === '/for-schools'
              ? 'text-primary font-semibold border-primary' /* Darker green active text, active border */
              : 'text-foreground hover:text-primary font-medium border-transparent' /* Standard text, hover, transparent border */
          }`}
        >
          Για τα σχολεία
          {/* Removed inset div */}
        </Link>
      )}
      {/* Phone number with click tracking */}
      <a
        href={`tel:${t.contact.phone1.replace(/\s+/g, '')}`}
        onClick={() => {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'conversion', {
              send_to: 'AW-PLACEHOLDER-CONVERSION_ID/PLACEHOLDER_LABEL',
              value: 0,
              currency: 'EUR',
            })
          }
        }}
        className='flex items-center gap-1 px-3 py-2 ml-2 text-accent font-medium cursor-pointer select-text'
      >
        <Phone className='w-4 h-4' />
        <span>{t.contact.phone1}</span>
      </a>
      {/* Language selector */}
      <div className='relative ml-2' ref={languageMenuRef}>
        <button
          onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
          className={`flex items-center gap-1 px-3 py-2 transition-all text-base border-b-2 ${
            /* Adjusted padding, removed relative, rounded-full, bg, border, shadow */
            languageMenuOpen
              ? 'text-primary font-semibold border-primary' /* Darker green active text, active border */
              : 'text-foreground hover:text-primary font-medium border-transparent' /* Standard text, hover, transparent border */
          }`}
        >
          <Globe className='w-5 h-5' />
          <span>{language === 'en' ? 'EN' : 'EL'}</span>
          {/* Removed inset div */}
        </button>

        {languageMenuOpen && (
          <div className='absolute right-0 mt-2 w-32 rounded-lg shadow-lg bg-card z-50 border border-border overflow-hidden'>
            {' '}
            {/* Cleaner dropdown style */}
            <div className='py-1'>
              <button
                onClick={() => {
                  setLanguage('en')
                  setLanguageMenuOpen(false)
                }}
                className={`block w-full text-left px-4 py-2 text-base ${language === 'en' ? 'text-primary font-semibold' : 'text-foreground hover:bg-secondary hover:text-primary'}`} /* Adjusted padding, active/hover style */
              >
                English
              </button>
              <button
                onClick={() => {
                  setLanguage('el')
                  setLanguageMenuOpen(false)
                }}
                className={`block w-full text-left px-4 py-2 text-base ${language === 'el' ? 'text-primary font-semibold' : 'text-foreground hover:bg-secondary hover:text-primary'}`} /* Adjusted padding, active/hover style */
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
