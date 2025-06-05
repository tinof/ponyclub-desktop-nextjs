'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useGDPR, CookieConsent } from '@/contexts/gdpr-context'; // Import CookieConsent

interface GDPRGoogleAnalyticsProps {
  gaId: string;
}

export default function GDPRGoogleAnalytics({ gaId }: GDPRGoogleAnalyticsProps) {
  const { consent } = useGDPR(); // Get the consent object
  const [nonce, setNonce] = useState('');

  useEffect(() => {
    // Get nonce from meta tag or header
    const metaNonce = document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content') || 
                     document.querySelector('script[nonce]')?.getAttribute('nonce') || '';
    setNonce(metaNonce);
  }, []); // Run once to get nonce

  useEffect(() => {
    // This effect handles applying consent changes to gtag
    if (typeof window !== 'undefined' && window.gtag && consent) {
      window.gtag('consent', 'update', {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied', // Assuming marketing consent maps to ad_storage
        ad_user_data: consent.marketing ? 'granted' : 'denied',
        ad_personalization: consent.marketing ? 'granted' : 'denied'
      });
      console.log('[GDPR GA] Consent updated:', consent);
    }
  }, [consent]); // Re-run when consent object changes

  // Determine if the scripts should be rendered based on analytics consent
  // The gtag setup script should always load to set default consent states.
  // The actual tracking will be controlled by the consent state.

  return (
    <>
      {/* External gtag script - does not need nonce itself as it's an external URL allowed by script-src 'self' and domains */}
      <Script
        id="ga-gtag-script"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('[GDPR GA] gtag.js loaded.');
        }}
        onError={() => {
          console.error('[GDPR GA] Failed to load gtag.js.');
        }}
      />
      {/* Inline script for gtag configuration - this needs a nonce */}
      <Script id="google-analytics-config" strategy="afterInteractive" nonce={nonce}>
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
