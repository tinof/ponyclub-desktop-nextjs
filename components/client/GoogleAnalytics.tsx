"use client";

interface GoogleAnalyticsProps {
  gaId: string;
}

/**
 * GoogleAnalytics Component
 *
 * This component loads Google Analytics scripts with Partytown optimization.
 * It should be wrapped with ConsentGate in the layout to ensure consent-based loading.
 * The ConsentInitializer component handles the default consent state.
 */
export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
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
              ${
                process.env.NODE_ENV === "development"
                  ? `console.log('[GA] Google Analytics initialized in web worker with consent');
                     if (typeof gtag !== 'undefined') {
                       console.log('[GA] Google Analytics script loaded successfully via Partytown');
                     }`
                  : ""
              }
            } catch (error) {
              ${
                process.env.NODE_ENV === "development"
                  ? `console.error('[GA] Error initializing Google Analytics in web worker:', error);`
                  : ""
              }

              // Report error for monitoring
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
