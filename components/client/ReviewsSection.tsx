"use client"

import { useEffect } from "react"
import { ReviewsScript } from '@/components/ui/script-loader'

// Declare Elfsight type for TypeScript
declare global {
  interface Window {
    elfsight?: {
      reload: () => void;
    };
  }
}

export default function ReviewsSection() {
  // Improved Elfsight widget initialization
  useEffect(() => {
    // Try to initialize Elfsight at different intervals to ensure it loads
    const attempts = [500, 1000, 2000, 3000];

    const initializeElfsight = () => {
      // Check if window.elfsight exists and has a reload method
      if (window.elfsight && typeof window.elfsight.reload === 'function') {
        window.elfsight.reload();
        return true;
      }

      // Check if the widget element exists but is empty
      const widgetElement = document.querySelector('.elfsight-app-5d3672ca-b26e-43cf-b887-e87f811a1622');
      if (widgetElement && widgetElement.children.length === 0) {
        // Try to manually append the script
        const existingScript = document.getElementById('elfsight-reviews-script');

        if (!existingScript) {
          const script = document.createElement('script');
          script.id = 'elfsight-manual-script';
          script.src = 'https://static.elfsight.com/platform/platform.js';
          script.async = true;
          document.body.appendChild(script);
        }

        return false;
      }

      return widgetElement && widgetElement.children.length > 0;
    };

    // Try multiple times with increasing delays
    attempts.forEach((delay) => {
      setTimeout(() => {
        initializeElfsight();
      }, delay);
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <>
      <ReviewsScript />
      <div className="px-4 md:px-8 mt-6 mb-20">
        <div className="max-w-6xl mx-auto bg-white/90 p-4 rounded-2xl shadow-md">
          <div className="elfsight-app-5d3672ca-b26e-43cf-b887-e87f811a1622"></div>
        </div>
      </div>
    </>
  );
} 