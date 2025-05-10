'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface DeferredScriptProps {
  src: string;
  id?: string;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  onLoad?: () => void;
  onError?: () => void;
  dangerouslySetInnerHTML?: { __html: string };
  inViewport?: boolean; // Only load when in viewport
  dataSrc?: string;
  dataTestId?: string;
}

/**
 * OptimizedScript component - A wrapper for Next.js Script component
 * with improved loading strategies and performance optimizations
 */
export function OptimizedScript({
  src,
  id,
  strategy = 'lazyOnload',
  onLoad,
  onError,
  dangerouslySetInnerHTML,
  inViewport = false,
  dataSrc,
  dataTestId,
}: DeferredScriptProps) {
  const [shouldLoad, setShouldLoad] = useState(!inViewport);

  useEffect(() => {
    if (inViewport) {
      // Create intersection observer for viewport detection
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      });

      // Create a div element to observe
      const element = document.createElement('div');
      element.id = `script-observer-${id || Math.random().toString(36).substring(2)}`;
      element.style.height = '1px';
      element.style.width = '1px';
      element.style.position = 'absolute';
      element.style.bottom = '200px'; // Load slightly before scrolling to it
      element.style.left = '0';
      document.body.appendChild(element);

      observer.observe(element);

      return () => {
        observer.disconnect();
        if (document.body.contains(element)) {
          document.body.removeChild(element);
        }
      };
    }
  }, [id, inViewport]);

  if (!shouldLoad) {
    return null;
  }

  return (
    <Script
      id={id}
      src={src}
      strategy={strategy}
      onLoad={onLoad}
      onError={onError}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      data-src={dataSrc}
      data-testid={dataTestId}
    />
  );
}

/**
 * BookingScripts component - Specialized for booking scripts
 * Now loads script on demand and calls a callback when the loader script is loaded.
 */
interface BookingScriptsProps {
  loadTrigger?: boolean;
  onLoaderLoaded?: () => void; // Callback when BokunWidgetsLoader.js itself has loaded
}

export function BookingScripts({ loadTrigger, onLoaderLoaded }: BookingScriptsProps) {
  // If loadTrigger is false, don't render the script.
  // When loadTrigger becomes true, OptimizedScript will be rendered and will load the script.
  if (!loadTrigger) {
    return null;
  }

  return (
    <OptimizedScript
      id="bokun-widgets-loader-homepage" // Unique ID for this instance
      src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c078b762-6f7f-474f-8edb-bdd1bdb7d12a"
      strategy="afterInteractive" // Or 'lazyOnload', 'afterInteractive' might be better if triggered by click
      onLoad={onLoaderLoaded}
      onError={() => {
        console.error('Failed to load BokunWidgetsLoader.js via OptimizedScript.');
      }}
    />
  );
}

/**
 * ReviewsScript component - Specialized for reviews script
 */
export function ReviewsScript() {
  return (
    <OptimizedScript
      src="https://static.elfsight.com/platform/platform.js"
      strategy="lazyOnload"
      inViewport={true}
    />
  );
}

export default OptimizedScript;
