'use client';

import Script from 'next/script';

interface BokunScriptsProps {
  locale: string;
}

export default function BokunScripts({ locale }: BokunScriptsProps) {
  // Feature flag to conditionally disable Bokun scripts for performance testing
  const isBokunEnabled = process.env.NEXT_PUBLIC_ENABLE_BOKUN !== 'false';

  // If Bokun is disabled, return null to skip script loading
  if (!isBokunEnabled) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Bokun] Scripts disabled via NEXT_PUBLIC_ENABLE_BOKUN feature flag');
    }
    return null;
  }

  return (
    <>
      {/* PERFORMANCE OPTIMIZATION: Bokun widgets script on main thread (requires DOM access) */}
      {/* Use consistent ID without locale to prevent duplicate script loading */}
      <Script
        id="bokun-widgets-loader"
        src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c078b762-6f7f-474f-8edb-bdd1bdb7d12a"
        strategy="lazyOnload"
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
