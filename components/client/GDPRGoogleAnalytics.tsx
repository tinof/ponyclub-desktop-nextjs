'use client'

import Script from 'next/script'
import { useEffect } from 'react'

import { useGDPR, CookieConsent } from '@/contexts/gdpr-context' // Import CookieConsent

interface GDPRGoogleAnalyticsProps {
  gaId: string
}

export default function GDPRGoogleAnalytics({ gaId }: GDPRGoogleAnalyticsProps) {
  const { consent } = useGDPR() // Get the consent object

  useEffect(() => {
    // This effect handles applying consent changes to gtag
    if (typeof window !== 'undefined' && window.gtag && consent) {
      window.gtag('consent', 'update', {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied', // Assuming marketing consent maps to ad_storage
        ad_user_data: consent.marketing ? 'granted' : 'denied',
        ad_personalization: consent.marketing ? 'granted' : 'denied',
      })
      console.log('[GDPR GA] Consent updated:', consent)
    }
  }, [consent]) // Re-run when consent object changes

  // Initialize gtag in a CSP-compliant way
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize dataLayer and gtag function
      window.dataLayer = window.dataLayer || []
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args)
      }
      window.gtag = gtag

      // Set default consent to denied
      gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        wait_for_update: 500,
      })

      gtag('js', new Date())
      gtag('config', gaId, {
        page_title: document.title,
        page_location: window.location.href,
      })

      console.log('[GDPR GA] gtag initialized with default denied consent')
    }
  }, [gaId])

  return (
    <>
      {/* External gtag script - CSP compliant */}
      <Script
        id='ga-gtag-script'
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy='afterInteractive'
        onLoad={() => {
          console.log('[GDPR GA] gtag.js loaded.')
        }}
        onError={() => {
          console.error('[GDPR GA] Failed to load gtag.js.')
        }}
      />
    </>
  )
}
