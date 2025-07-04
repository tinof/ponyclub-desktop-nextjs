'use client';

import Script from 'next/script';

interface BokunScriptsProps {
  locale: string;
}

export default function BokunScripts({ locale }: BokunScriptsProps) {
  return (
    <>
      {/* PERFORMANCE OPTIMIZATION: Bokun widgets script on main thread (requires DOM access) */}
      <Script
        id={`bokun-widgets-loader-${locale}`}
        src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c078b762-6f7f-474f-8edb-bdd1bdb7d12a"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('[Bokun] Widget loader script loaded successfully on main thread');
        }}
        onError={(error) => {
          console.error('[Bokun] Failed to load widget loader script:', error);
        }}
      />
    </>
  );
}
