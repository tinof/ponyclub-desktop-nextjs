'use client';

import { Partytown } from '@qwik.dev/partytown/react';

/**
 * Partytown configuration component for Next.js 15 app directory
 * This component configures Partytown to run third-party scripts in web workers
 * improving main thread performance and Core Web Vitals scores
 */
export default function PartyTownConfig() {
  return (
    <Partytown
      // Enable debug mode in development
      debug={process.env.NODE_ENV === 'development'}
      // Forward specific functions that third-party scripts need access to
      forward={[
        // Google Analytics forwarding
        'dataLayer.push',
        'gtag',
        // Bokun widgets removed from forwarding - now runs on main thread
      ]}
      // Configure library path for Next.js (files are in public/~partytown)
      lib="/~partytown/"
    />
  );
}
