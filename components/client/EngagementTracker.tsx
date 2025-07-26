"use client";

import { useEffect } from "react";

import { trackGTMEvent } from "@/lib/analytics";

/**
 * Component to initialize engagement tracking for micro-conversions
 * Tracks scroll depth and time on page for low-traffic optimization
 * Now uses GTM events instead of direct gtag calls
 */
export default function EngagementTracker() {
  useEffect(() => {
    // Initialize scroll depth tracking with GTM
    const scrollDepths = [25, 50, 75, 90];
    const trackedDepths = new Set<number>();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100,
      );

      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);
          trackGTMEvent({
            event: "scroll_depth",
            scroll_depth: depth,
            scroll_threshold: `${depth}%`,
          });
        }
      });
    };

    // Initialize time on page tracking with GTM
    const timeThresholds = [30, 60, 120, 300]; // seconds
    const trackedTimes = new Set<number>();

    timeThresholds.forEach(threshold => {
      setTimeout(() => {
        if (!trackedTimes.has(threshold)) {
          trackedTimes.add(threshold);
          trackGTMEvent({
            event: "time_on_page",
            time_threshold: threshold,
            time_threshold_label: `${threshold}s`,
          });
        }
      }, threshold * 1000);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup scroll tracking on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // This component doesn't render anything
  return null;
}
