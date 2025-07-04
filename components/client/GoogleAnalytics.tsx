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

      console.log('[GA] Google Analytics initialized on main thread');
    }
  }, [gaId]);

  return (
    <>
      {/* PERFORMANCE OPTIMIZATION: Google Analytics script running in web worker via Partytown */}
      <script
        id="ga-gtag-script"
        type="text/partytown"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />

      {/* Initialize Google Analytics in web worker with enhanced error handling */}
      <script
        id="ga-init-script"
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: `
            try {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_title: document.title,
                page_location: window.location.href
              });
              console.log('[GA] Google Analytics initialized in web worker');

              // Monitor script loading success
              if (typeof gtag !== 'undefined') {
                console.log('[GA] Google Analytics script loaded successfully via Partytown');
              }
            } catch (error) {
              console.error('[GA] Error initializing Google Analytics in web worker:', error);

              // Report error to console for monitoring
              if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                  description: 'GA initialization error: ' + error.message,
                  fatal: false,
                });
              }
            }
          `,
        }}
      />


    </>
  );
}
