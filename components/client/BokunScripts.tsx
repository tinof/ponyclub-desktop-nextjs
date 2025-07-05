'use client';

import Script from 'next/script';

interface BokunScriptsProps {
  locale: string;
}

export default function BokunScripts({ locale }: BokunScriptsProps) {
  return (
    <>
      {/* PERFORMANCE OPTIMIZATION: Bokun widgets script on main thread (requires DOM access) */}
      {/* Use consistent ID without locale to prevent duplicate script loading */}
      <Script
        id="bokun-widgets-loader"
        src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c078b762-6f7f-474f-8edb-bdd1bdb7d12a"
        strategy="afterInteractive"
        onLoad={() => {
          console.log(`[Bokun] Widget loader script loaded successfully for locale: ${locale}`);
          // Store the current locale for widget initialization
          if (typeof window !== 'undefined') {
            (window as any).__bokunCurrentLocale = locale;
          }
        }}
        onError={(error) => {
          console.error('[Bokun] Failed to load widget loader script:', error);
        }}
      />
    </>
  );
}
