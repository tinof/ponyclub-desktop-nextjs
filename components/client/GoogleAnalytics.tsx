"use client";

interface GoogleAnalyticsProps {
  gaId: string;
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  // PERFORMANCE OPTIMIZATION: Google Analytics now runs exclusively in Partytown web worker
  // Removed main thread initialization to prevent double-loading

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
