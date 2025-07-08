"use client";

import { useEffect } from "react";

import { initScrollTracking, initTimeTracking } from "@/lib/analytics";

/**
 * Component to initialize engagement tracking for micro-conversions
 * Tracks scroll depth and time on page for low-traffic optimization
 */
export default function EngagementTracker() {
  useEffect(() => {
    // Initialize scroll depth tracking
    const cleanupScroll = initScrollTracking();
    
    // Initialize time on page tracking
    initTimeTracking();

    // Cleanup scroll tracking on unmount
    return () => {
      if (typeof cleanupScroll === "function") {
        cleanupScroll();
      }
    };
  }, []);

  // This component doesn't render anything
  return null;
}
