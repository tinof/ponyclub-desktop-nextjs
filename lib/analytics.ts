/**
 * Centralized analytics helper for Google Tag Manager (GTM) tracking
 * Consistent tracking across the application
 *
 * Debug Mode: Set NODE_ENV=development to enable console logging
 */

"use client";

import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Generic GTM Event Function
 * Pushes events to the dataLayer via sendGTMEvent
 */
export const trackGTMEvent = (eventData: Record<string, unknown>) => {
  if (typeof window === "undefined") {
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

// Note: This file now uses Google Tag Manager (GTM) instead of direct gtag calls
