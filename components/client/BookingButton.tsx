"use client";

import { useCallback } from "react";

import { trackBookingClick as trackBookingClickHelper } from "@/lib/analytics";

interface BookingButtonProps {
  id: string;
  dataSrc: string;
  className?: string;
  children: React.ReactNode;
  trackingLabel?: string; // For identifying which button was clicked
  packageName?: string; // For enhanced ecommerce tracking
  packagePrice?: string; // For conversion value tracking
  conversionLabel?: string; // Google Ads conversion label
  sourcePage?: string; // Source page context (homepage, package-page, etc.)
  packageType?: "package1" | "package2"; // Package type for specific conversion labels
}

export default function BookingButton({
  id,
  dataSrc,
  className,
  children,
  trackingLabel = "Unknown",
  packageName = "Unknown Package",
  packagePrice = "0",
  conversionLabel,
  sourcePage = "unknown",
  packageType,
}: BookingButtonProps) {
  // GTM-based tracking function for analytics
  const trackBookingClick = useCallback(() => {
    // Use centralized GTM analytics helper
    trackBookingClickHelper({
      packageName,
      packagePrice,
      sourcePage: sourcePage || "unknown",
    });

    if (process.env.NODE_ENV === "development") {
      console.log(
        `[BookingButton] ${trackingLabel} clicked - Package: ${packageName}, Price: ${packagePrice}`
      );
    }
  }, [trackingLabel, packageName, packagePrice, sourcePage]);

  const handleBookNowClick = () => {
    // Defer tracking the click to avoid interfering with Bokun's immediate action
    setTimeout(() => {
      trackBookingClick();
    }, 0); // Defer to the next tick of the event loop

    // Allow Bokun's native click handler to execute immediately
    // No need for manual re-initialization or re-clicking the button here,
    // as Bokun's script should handle it if properly loaded.
  };

  return (
    <button
      type="button"
      className={`
        bokunButton
        ${className}
      `}
      id={id}
      data-src={dataSrc}
      data-testid="widget-book-button"
      onClick={handleBookNowClick}
      aria-label={`Book ${packageName} package for ${packagePrice}`}
      aria-describedby={`${id}-description`}
    >
      {children}
      <span id={`${id}-description`} className="sr-only">
        Opens booking form for {packageName} adventure package
      </span>
    </button>
  );
}
