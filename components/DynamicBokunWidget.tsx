'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// Enhanced loading placeholder with better UX
const LoadingPlaceholder = () => (
  <div className="h-96 w-full rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
      </div>
      <div className="flex justify-center items-center h-32">
        <div className="text-gray-500 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-2"></div>
          <p className="text-sm">Loading booking options...</p>
        </div>
      </div>
    </div>
  </div>
);

// Dynamically import BokunWidget with optimized loading
const BokunWidget = dynamic(() => import('@/components/BokunWidget'), {
  ssr: false,
  loading: LoadingPlaceholder,
});

type DynamicBokunWidgetProps = {
  experienceId: string;
  partialView?: number;
};

export default function DynamicBokunWidget({
  experienceId,
  partialView,
}: DynamicBokunWidgetProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) {
      return;
    }

    // Use modern Intersection Observer with better performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Delay loading slightly to improve perceived performance
          const timer = setTimeout(() => {
            setShouldLoad(true);
            observer.disconnect();
          }, 100);

          return () => clearTimeout(timer);
        }
      },
      {
        rootMargin: '150px 0px', // Reduced from 200px for better performance
        threshold: 0.1, // Increased threshold for better UX
      },
    );

    observer.observe(currentRef);

    // Cleanup observer on component unmount
    return () => {
      if (observer && currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  // Preload the widget when it becomes visible but before it loads
  useEffect(() => {
    if (isVisible && !shouldLoad) {
      // Preload critical resources
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = 'https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js';
      link.as = 'script';
      document.head.appendChild(link);
    }
  }, [isVisible, shouldLoad]);

  return (
    <div
      ref={ref}
      className="bokun-widget-wrapper"
      style={{ minHeight: '384px' }}
      // Add performance hints
      data-loading={shouldLoad ? 'loaded' : 'pending'}
    >
      {shouldLoad ? (
        <BokunWidget experienceId={experienceId} partialView={partialView} />
      ) : (
        <LoadingPlaceholder />
      )}
    </div>
  );
}
