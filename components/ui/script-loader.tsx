'use client';

import Script from 'next/script';
import { ScriptProps } from 'next/script';
import { useEffect, useState } from 'react';

interface ScriptLoaderProps {
  src: string;
  id?: string;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  onLoad?: () => void;
  onError?: () => void;
  dangerouslySetInnerHTML?: { __html: string };
  inViewport?: boolean; // Only load when in viewport
  dataSrc?: string;
  dataTestId?: string;
  nonce?: string; // Allow passing nonce as a prop
}

/**
 * OptimizedScript component - A wrapper for Next.js Script component
 * with improved loading strategies and performance optimizations
 */
export function ScriptLoader({
  src,
  id,
  strategy = 'afterInteractive',
  onLoad,
  onError,
  dangerouslySetInnerHTML,
  inViewport = false,
  dataSrc,
  dataTestId,
  nonce: propNonce, // Use the prop name
  ...props
}: ScriptLoaderProps) {
  const [shouldLoad, setShouldLoad] = useState(!inViewport);
  const [effectiveNonce, setEffectiveNonce] = useState(propNonce || '');

  useEffect(() => {
    if (!propNonce) {
      // If nonce is not passed as a prop, try to get it from the meta tag
      const metaNonce = document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content') || '';
      setEffectiveNonce(metaNonce);
    }
  }, [propNonce]); // Re-run if propNonce changes (though unlikely for this use case)

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
      nonce={dangerouslySetInnerHTML ? effectiveNonce : undefined} // Use effectiveNonce
    />
  );
}

/**
 * ReviewsScript component - Specialized for reviews script
 */
export function ReviewsScript() {
  return (
    <ScriptLoader
      id="elfsight-reviews-script"
      src="https://static.elfsight.com/platform/platform.js"
      strategy="afterInteractive"
      inViewport={true}
    />
  );
}

export default ScriptLoader;
