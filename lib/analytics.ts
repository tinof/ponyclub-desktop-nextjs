/**
 * Centralized analytics helper for Google Tag Manager (GTM) tracking
 * Ensures GDPR compliance and consistent tracking across the application
 *
 * Debug Mode: Set NODE_ENV=development to enable console logging
 * Test Mode: Use window.analyticsDebug = true for verbose logging
 */

"use client";

import { sendGTMEvent } from "@next/third-parties/google";

type ConsentStatus = {
  analytics: boolean;
  marketing: boolean;
};

/**
 * Check if user has given consent for analytics tracking
 * Integrates with the existing consent management system
 */
function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  // Check for consent cookie from the existing consent system
  try {
    const consentCookie = document.cookie
      .split("; ")
      .find(row => row.startsWith("consent="));

    if (consentCookie) {
      const consent = JSON.parse(
        decodeURIComponent(consentCookie.split("=")[1]),
      ) as ConsentStatus;
      return consent.analytics;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Analytics] Error reading consent:", error);
    }
  }

  return false;
}

/**
 * Generic GTM Event Function
 * Pushes events to the dataLayer via sendGTMEvent
 */
export const trackGTMEvent = (eventData: Record<string, unknown>) => {
  if (typeof window === "undefined") {
    return;
  }

  // Check consent first
  if (!hasAnalyticsConsent()) {
    if (process.env.NODE_ENV === "development") {
      console.debug("[GTM] Event blocked - no analytics consent:", eventData);
    }
    return;
  }

  try {
    if (process.env.NODE_ENV === "development") {
      console.log("[GTM]", eventData);
    }
    sendGTMEvent(eventData);
  } catch (error) {
    console.warn("[GTM] Error sending event:", error);
  }
};

/**
 * Specific Event for Booking Button Clicks
 */
interface BookingClickProps {
  packageName: string;
  packagePrice: string | number;
  sourcePage: string;
}

export const trackBookingClick = ({
  packageName,
  packagePrice,
  sourcePage,
}: BookingClickProps) => {
  trackGTMEvent({
    event: "booking_click",
    package_name: packageName,
    value: packagePrice,
    currency: "EUR",
    source_page: sourcePage,
  });
};

/**
 * Specific Event for Phone Link Clicks
 */
interface PhoneClickProps {
  phoneNumber: string;
  device: "mobile" | "desktop";
}

export const trackPhoneClick = ({ phoneNumber, device }: PhoneClickProps) => {
	// Send the GA4 event for general analytics
	trackGTMEvent({
		event: "phone_click",
		phone_number: phoneNumber,
		device_type: device,
	});

	// Determine the correct Google Ads conversion label based on the device
	const conversionLabel =
		device === "mobile"
			? "-i5YCP39-e8aEMz6q8gp" // Phone Click - Mobile
			: "9_TlCPj--e8aEMz6q8gp"; // Phone Click - Desktop

	// Send a dedicated conversion event to Google Ads
	trackAdsConversion({
		conversionLabel,
		value: 5, // Assign a static value of €5 for a phone call lead
		currency: "EUR",
	});
};

/**
 * Google Ads Conversion Tracking
 * Sends conversion events to Google Ads via GTM
 */
interface AdsConversionProps {
  conversionLabel: string;
  value?: number;
  currency?: string;
  transactionId?: string;
}

export const trackAdsConversion = ({
  conversionLabel,
  value,
  currency = "EUR",
  transactionId = "",
}: AdsConversionProps) => {
  if (typeof window === "undefined") {
    return;
  }

  // Check consent first
  if (!hasAnalyticsConsent()) {
    if (process.env.NODE_ENV === "development") {
      console.debug("[GTM] Ads conversion blocked - no analytics consent:", {
        conversionLabel,
        value,
        currency,
      });
    }
    return;
  }

  try {
    const conversionData = {
      event: "ads_conversion",
      conversion_label: conversionLabel,
      value: value || 0,
      currency,
      transaction_id: transactionId,
    };

    if (process.env.NODE_ENV === "development") {
      console.log("[GTM] Ads Conversion:", conversionData);
    }

    sendGTMEvent(conversionData);
  } catch (error) {
    console.warn("[GTM] Error sending ads conversion:", error);
  }
};

// Type definition for analytics debug utilities
interface AnalyticsDebug {
  trackGTMEvent: typeof trackGTMEvent;
  trackBookingClick: typeof trackBookingClick;
  trackPhoneClick: typeof trackPhoneClick;
  trackAdsConversion: typeof trackAdsConversion;
  hasConsent: typeof hasAnalyticsConsent;
  testBooking: () => void;
  testPhoneClick: () => void;
  testPhoneClickDesktop: () => void;
  testAdsConversion: () => void;
  checkEnvironment: () => void;
}

// Extend Window interface to include analyticsDebug
declare global {
  interface Window {
    analyticsDebug?: AnalyticsDebug;
  }
}

/**
 * Development debugging utilities for GTM
 * Available in browser console for testing
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  // Expose GTM analytics functions for manual testing
  const analyticsDebug: AnalyticsDebug = {
    trackGTMEvent,
    trackBookingClick,
    trackPhoneClick,
    trackAdsConversion,
    hasConsent: hasAnalyticsConsent,
    testBooking: () => {
      trackBookingClick({
        packageName: "Test Package",
        packagePrice: 100,
        sourcePage: "debug-test",
      });
    },
    testPhoneClick: () => {
      trackPhoneClick({
        phoneNumber: "+30 26650 61314",
        device: "mobile",
      });
      console.log("Phone click test (mobile) fired");
    },
    testPhoneClickDesktop: () => {
      trackPhoneClick({
        phoneNumber: "+30 26650 61314",
        device: "desktop",
      });
      console.log("Phone click test (desktop) fired");
    },
    testAdsConversion: () => {
      trackAdsConversion({
        conversionLabel: "w73CCPf9-e8aEMz6q8gp",
        value: 18,
        currency: "EUR",
      });
      console.log("Google Ads conversion test fired");
    },
    checkEnvironment: () => {
      console.log("GTM Analytics Environment Check:", {
        GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
        hasConsent: hasAnalyticsConsent(),
      });
    },
  };

  window.analyticsDebug = analyticsDebug;

  console.log(
    "[GTM] Debug utilities available at window.analyticsDebug",
    "\nTry: analyticsDebug.checkEnvironment()",
    "\nTry: analyticsDebug.testBooking()",
    "\nTry: analyticsDebug.testPhoneClick()",
    "\nTry: analyticsDebug.testAdsConversion()",
  );
}

// Note: This file now uses Google Tag Manager (GTM) instead of direct gtag calls
