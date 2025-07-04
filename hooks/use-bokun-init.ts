'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom hook to ensure Bokun widgets are properly initialized
 * This hook waits for the Bokun script to load and then initializes all widgets
 * It's designed to work on any page, regardless of whether BokunWidget components are present
 */
export function useBokunInit() {
  const initAttempts = useRef(0);
  const maxAttempts = 50; // Maximum attempts to wait for Bokun script
  const retryDelay = 100; // Delay between attempts in milliseconds

  useEffect(() => {
    const initializeBokun = () => {
      if (typeof window === 'undefined') {
        return;
      }

      // Check if Bokun script is loaded
      if (window.BokunWidgets) {
        if (process.env.NODE_ENV === 'development') {
          console.log(
            '[Bokun Init] BokunWidgets found, checking for elements...',
          );
          console.log('[Bokun Init] Available methods:', Object.keys(window.BokunWidgets));
          console.log('[Bokun Init] BokunWidgets object:', window.BokunWidgets);
        }

        // Check if there are any Bokun elements that need initialization
        const widgets = document.querySelectorAll('.bokunWidget, .bokunButton');
        if (widgets.length === 0) {
          if (process.env.NODE_ENV === 'development') {
            console.log(
              '[Bokun Init] No Bokun elements found, skipping initialization',
            );
          }
          initAttempts.current = 0;
          return true;
        }

        if (process.env.NODE_ENV === 'development') {
          console.log(
            `[Bokun Init] Found ${widgets.length} Bokun elements to initialize`,
          );
        }

        try {
          // Check if BokunWidgets is already initialized
          if (window.BokunWidgets.bookingChannelUUID && window.BokunWidgets.origin) {
            if (process.env.NODE_ENV === 'development') {
              console.log('[Bokun Init] BokunWidgets already initialized');
            }
            // Reset attempt counter on successful initialization
            initAttempts.current = 0;
            return true;
          }

          // Initialize BokunWidgets using the correct API
          if (typeof window.BokunWidgets.init === 'function') {
            // Extract booking channel UUID from the script URL
            const scriptElements = document.querySelectorAll('script[src*="bokun"]');
            let bookingChannelUUID = '';

            for (const script of scriptElements) {
              const src = script.getAttribute('src');
              if (src && src.includes('bookingChannelUUID=')) {
                const match = src.match(/bookingChannelUUID=([^&]+)/);
                if (match) {
                  bookingChannelUUID = match[1];
                  break;
                }
              }
            }

            if (bookingChannelUUID) {
              window.BokunWidgets.init({
                bookingChannelUUID,
                origin: 'https://widgets.bokun.io'
              });
              if (process.env.NODE_ENV === 'development') {
                console.log('[Bokun Init] Successfully initialized BokunWidgets with bookingChannelUUID:', bookingChannelUUID);
              }
              // Reset attempt counter on successful initialization
              initAttempts.current = 0;
              return true;
            } else {
              if (process.env.NODE_ENV === 'development') {
                console.warn('[Bokun Init] Could not find bookingChannelUUID in script src');
              }
              return false;
            }
          } else {
            if (process.env.NODE_ENV === 'development') {
              console.warn('[Bokun Init] BokunWidgets.init method not available');
            }
            return false;
          }
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error(
              '[Bokun Init] Error initializing Bokun widgets:',
              error,
            );
          }
          return false;
        }
      }

      // If Bokun script is not ready yet, retry
      initAttempts.current++;
      if (initAttempts.current < maxAttempts) {
        if (process.env.NODE_ENV === 'development') {
          console.log(
            `[Bokun Init] BokunWidgets not ready yet, attempt ${initAttempts.current}/${maxAttempts}`,
          );
        }
        setTimeout(initializeBokun, retryDelay);
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            '[Bokun Init] Max attempts reached, Bokun widgets may not be available',
          );
        }
      }

      return false;
    };

    // Start initialization process
    const timeoutId = setTimeout(initializeBokun, 100); // Small delay to ensure DOM is ready

    // Cleanup timeout on unmount
    return () => {
      clearTimeout(timeoutId);
      initAttempts.current = 0;
    };
  }, []); // Run once on mount

  // Also provide a manual reinit function for cases where new widgets are added dynamically
  const reinitBokun = () => {
    if (typeof window !== 'undefined' && window.BokunWidgets) {
      try {
        if (typeof window.BokunWidgets.reinit === 'function') {
          // Try calling reinit without parameters first (safer)
          window.BokunWidgets.reinit();
          if (process.env.NODE_ENV === 'development') {
            console.log('[Bokun Init] Manual reinit called successfully');
          }
          return true;
        }
        if (typeof window.BokunWidgets.scan === 'function') {
          // Try scan method as alternative
          window.BokunWidgets.scan();
          if (process.env.NODE_ENV === 'development') {
            console.log('[Bokun Init] Manual scan called successfully');
          }
          return true;
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[Bokun Init] Error during manual reinit:', error);
        }
        return false;
      }
    }
    return false;
  };

  return { reinitBokun };
}
