'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// Dynamically import BokunWidget with ssr: false and a loading placeholder
const BokunWidget = dynamic(
  () => import(/* webpackChunkName: "bokun-widget" */ '@/components/BokunWidget'),
  {
    ssr: false,
    loading: () => (
      <div
        className={`
      h-96 w-full animate-pulse rounded-lg bg-gray-200 flex items-center justify-center
    `}
      >
        <span className="text-gray-500">Loading booking widget...</span>
      </div>
    ),
  }
);

type DynamicBokunWidgetProps = {
  experienceId: string;
  partialView?: number;
};

export default function DynamicBokunWidget({
  experienceId,
  partialView,
}: DynamicBokunWidgetProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Load when the placeholder is intersecting or nearly intersecting
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect(); // Stop observing once loaded
        }
      },
      {
        rootMargin: '200px 0px', // Load when 200px away from viewport
        threshold: 0.01, // Trigger even if only 1% is visible
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
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div ref={ref} style={{ minHeight: '384px' }}>
      {' '}
      {/* PERFORMANCE OPTIMIZATION: Fixed height to prevent CLS */}
      {shouldLoad ? (
        <BokunWidget experienceId={experienceId} partialView={partialView} />
      ) : (
        // Render the loading placeholder with fixed height to prevent CLS
        <div
          className="h-96 w-full animate-pulse rounded-lg bg-gray-200 flex items-center justify-center"
          style={{ minHeight: '384px' }} // Ensure consistent height
        >
          <span className="text-gray-500">Loading booking widget...</span>
        </div>
      )}
    </div>
  );
}
