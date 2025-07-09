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
  // Comprehensive tracking function for analytics
  const trackBookingClick = useCallback(() => {
    // Extract numeric price for conversion tracking
    const numericPrice =
      Number.parseFloat(packagePrice.replace(/[^\d.]/g, "")) || 0;

    // Determine conversion label based on package type and source page
    let finalConversionLabel = conversionLabel;

    if (!finalConversionLabel && packageType && sourcePage) {
      // Generate conversion label based on package type and source page
      const labelKey =
        sourcePage === "homepage"
          ? `NEXT_PUBLIC_ADS_LABEL_HOMEPAGE_${packageType.toUpperCase()}`
          : `NEXT_PUBLIC_ADS_LABEL_${packageType.toUpperCase()}`;

      finalConversionLabel = process.env[labelKey as keyof typeof process.env];

      if (!finalConversionLabel && process.env.NODE_ENV === "development") {
        console.warn(`[BookingButton] Missing conversion label: ${labelKey}`);
      }
    }

    // Use centralized analytics helper with enhanced parameters
    trackBookingClickHelper({
      packageName,
      packagePrice: numericPrice,
      buttonId: id,
      trackingLabel: `${trackingLabel} - ${sourcePage}`,
      conversionLabel: finalConversionLabel,
      sourcePage,
      packageType,
    });

    if (process.env.NODE_ENV === "development") {
      console.log(
        `[BookingButton] ${trackingLabel} clicked - Package: ${packageName}, Price: €${numericPrice}`
      );
    }
  }, [trackingLabel, packageName, packagePrice, id]);

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
