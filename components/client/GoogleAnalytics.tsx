'use client';

import Script from 'next/script';
import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  gaId: string;
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  // Initialize gtag in a CSP-compliant way
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize dataLayer and gtag function
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', gaId, {
        page_title: document.title,
        page_location: window.location.href,
      });

      console.log('[GA] Google Analytics initialized');
    }
  }, [gaId]);

  return (
    <>
      {/* External gtag script - CSP compliant */}
      <Script
        id="ga-gtag-script"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('[GA] gtag.js loaded.');
        }}
        onError={() => {
          console.error('[GA] Failed to load gtag.js.');
        }}
      />
    </>
  );
}
