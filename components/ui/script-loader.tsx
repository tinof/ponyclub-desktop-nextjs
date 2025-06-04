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
 * ReviewsScript component - Specialized for reviews script
 */
export function ReviewsScript() {
  return (
    <OptimizedScript
      id="elfsight-reviews-script"
      src="https://static.elfsight.com/platform/platform.js"
      strategy="beforeInteractive"
      inViewport={false}
    />
  );
}

export default OptimizedScript;
