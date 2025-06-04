"use client"

import { useEffect } from 'react'
import Script from 'next/script'

interface GDPRGoogleAnalyticsProps {
  gaId: string
}

export default function GDPRGoogleAnalytics({ gaId }: GDPRGoogleAnalyticsProps) {
  useEffect(() => {
    // Initialize Google Analytics with consent denied by default
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        wait_for_update: 500
      })
    }
  }, [])

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Set default consent to denied
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href
          });
        `}
      </Script>
    </>
  )
}
