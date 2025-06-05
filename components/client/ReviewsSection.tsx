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
    const attempts = [1000, 2000, 3000, 5000];
    let initialized = false;

    const initializeElfsight = () => {
      if (initialized) return true;
      
      // Check if window.elfsight exists and has a reload method
      if (window.elfsight && typeof window.elfsight.reload === 'function') {
        window.elfsight.reload();
        initialized = true;
        return true;
      }

      // Check if the widget element exists but is empty
      const widgetElement = document.querySelector('.elfsight-app-5d3672ca-b26e-43cf-b887-e87f811a1622');
      if (widgetElement && widgetElement.children.length === 0) {
        // The ReviewsScript component already handles loading the script properly with CSP compliance
        // No need to manually create script elements here
        return false;
      }

      if (widgetElement && widgetElement.children.length > 0) {
        initialized = true;
        return true;
      }
      
      return false;
    };

    // Try multiple times with increasing delays
    const timeouts = attempts.map((delay) => 
      setTimeout(() => {
        initializeElfsight();
      }, delay)
    );

    return () => {
      // Cleanup timeouts
      timeouts.forEach(timeout => clearTimeout(timeout));
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