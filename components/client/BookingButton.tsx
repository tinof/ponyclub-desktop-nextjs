"use client";

import { useCallback } from "react";

import {
  trackAdsConversion,
  trackBookingClick as trackBookingClickHelper,
} from "@/lib/analytics";

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
  // Helper function to determine the correct Google Ads conversion label
  const getConversionLabel = useCallback(() => {
    if (conversionLabel) return conversionLabel;

    // Map package type and source page to conversion labels from Google Ads
    const conversionMap = {
      package1: {
        homepage: "w73CCPf9-e8aEMz6q8gp", // Package 1 Booking - Homepage (€18)
        "package-page": "5A7RCLybo_gaEMz6q8gp", // Package 1 Booking - Package Page (€25)
      },
      package2: {
        homepage: "yTUXCPr9-e8aEMz6q8gp", // Package 2 Booking - Homepage (€20)
        "package-page": "z5nWCLmbo_gaEMz6q8gp", // Package 2 Booking - Package Page (€30)
      },
    };

    return (
      packageType &&
      conversionMap[packageType]?.[
        sourcePage as keyof typeof conversionMap.package1
      ]
    );
  }, [conversionLabel, packageType, sourcePage]);

  // Get conversion value based on package and source
  const getConversionValue = useCallback(() => {
    const valueMap = {
      package1: {
        homepage: 18,
        "package-page": 25,
      },
      package2: {
        homepage: 20,
        "package-page": 30,
      },
    };

    const mappedValue =
      packageType &&
      valueMap[packageType]?.[sourcePage as keyof typeof valueMap.package1];
    return mappedValue || parseFloat(packagePrice) || 0;
  }, [packageType, sourcePage, packagePrice]);

  // GTM-based tracking function for analytics
  const trackBookingClick = useCallback(() => {
    // Use centralized GTM analytics helper for general booking event
    trackBookingClickHelper({
      packageName,
      packagePrice,
      sourcePage: sourcePage || "unknown",
    });

    // Track Google Ads conversion if we have a conversion label
    const adsConversionLabel = getConversionLabel();
    if (adsConversionLabel) {
      trackAdsConversion({
        conversionLabel: adsConversionLabel,
        value: getConversionValue(),
        currency: "EUR",
      });
    }

    if (process.env.NODE_ENV === "development") {
      console.log(
        `[BookingButton] ${trackingLabel} clicked - Package: ${packageName}, Price: ${packagePrice}, Conversion Label: ${adsConversionLabel}`
      );
    }
  }, [
    trackingLabel,
    packageName,
    packagePrice,
    sourcePage,
    getConversionLabel,
    getConversionValue,
  ]);

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
