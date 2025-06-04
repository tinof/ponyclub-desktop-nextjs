"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

interface GDPRContextType {
  consent: CookieConsent | null
  showBanner: boolean
  showCustomize: boolean
  acceptAll: () => void
  rejectAll: () => void
  saveCustom: (consent: CookieConsent) => void
  openCustomize: () => void
  closeBanner: () => void
}

const GDPRContext = createContext<GDPRContextType | undefined>(undefined)

const CONSENT_COOKIE_NAME = 'ponyclub-cookie-consent'
const CONSENT_VERSION = '1.0'

export function GDPRProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)

  // Load consent from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedConsent = localStorage.getItem(CONSENT_COOKIE_NAME)
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent)
        if (parsed.version === CONSENT_VERSION) {
          setConsent(parsed.consent)
          // Apply consent to tracking scripts
          applyConsent(parsed.consent)
        } else {
          // Version mismatch, show banner again
          setShowBanner(true)
        }
      } catch (error) {
        console.error('Error parsing consent cookie:', error)
        setShowBanner(true)
      }
    } else {
      // No consent found, show banner
      setShowBanner(true)
    }
  }, [])

  const saveConsent = (newConsent: CookieConsent) => {
    const consentData = {
      consent: newConsent,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString()
    }
    
    localStorage.setItem(CONSENT_COOKIE_NAME, JSON.stringify(consentData))
    setConsent(newConsent)
    setShowBanner(false)
    setShowCustomize(false)
    
    // Apply consent to tracking scripts
    applyConsent(newConsent)
    
    // Track consent choice
    trackConsentChoice(newConsent)
  }

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true
    })
  }

  const rejectAll = () => {
    saveConsent({
      necessary: true, // Always true - required for site functionality
      analytics: false,
      marketing: false
    })
  }

  const saveCustom = (customConsent: CookieConsent) => {
    saveConsent({
      ...customConsent,
      necessary: true // Always true - required for site functionality
    })
  }

  const openCustomize = () => {
    setShowCustomize(true)
  }

  const closeBanner = () => {
    setShowBanner(false)
    setShowCustomize(false)
  }

  return (
    <GDPRContext.Provider
      value={{
        consent,
        showBanner,
        showCustomize,
        acceptAll,
        rejectAll,
        saveCustom,
        openCustomize,
        closeBanner
      }}
    >
      {children}
    </GDPRContext.Provider>
  )
}

export function useGDPR() {
  const context = useContext(GDPRContext)
  if (context === undefined) {
    throw new Error('useGDPR must be used within a GDPRProvider')
  }
  return context
}

// Apply consent to tracking scripts
function applyConsent(consent: CookieConsent) {
  if (typeof window === 'undefined') return

  // Google Analytics
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
      ad_user_data: consent.marketing ? 'granted' : 'denied',
      ad_personalization: consent.marketing ? 'granted' : 'denied'
    })
  }

  // Facebook Pixel
  if (window.fbq && !consent.marketing) {
    // Disable Facebook Pixel if marketing consent is denied
    window.fbq('consent', 'revoke')
  } else if (window.fbq && consent.marketing) {
    window.fbq('consent', 'grant')
  }

  console.log('[GDPR] Consent applied:', consent)
}

// Track consent choice for analytics
function trackConsentChoice(consent: CookieConsent) {
  if (typeof window === 'undefined') return

  // Only track if analytics consent is given
  if (consent.analytics && window.gtag) {
    window.gtag('event', 'consent_update', {
      event_category: 'GDPR',
      analytics_consent: consent.analytics,
      marketing_consent: consent.marketing,
      consent_method: 'banner'
    })
  }
}
