/**
 * Centralized analytics helper for Google Analytics and Google Ads tracking
 * Ensures GDPR compliance and consistent tracking across the application
 *
 * Debug Mode: Set NODE_ENV=development to enable console logging
 * Test Mode: Use window.analyticsDebug = true for verbose logging
 */

type ConsentStatus = {
  analytics: boolean;
  marketing: boolean;
};

/**
 * Check if user has given consent for analytics tracking
 * Integrates with the existing consent management system
 */
function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;

  // Check for consent cookie from the existing consent system
  try {
    const consentCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("consent="));

    if (consentCookie) {
      const consent = JSON.parse(
        decodeURIComponent(consentCookie.split("=")[1])
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
 * Safe wrapper for Google Analytics gtag events
 * Only fires if user has given analytics consent and gtag is available
 */
export function gtagEvent(
  eventName: string,
  parameters: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  // Check consent first
  if (!hasAnalyticsConsent()) {
    if (process.env.NODE_ENV === "development") {
      console.debug(
        "[Analytics] Event blocked - no analytics consent:",
        eventName,
        parameters
      );
    }
    return;
  }

  // Check if gtag is available
  if (typeof window.gtag !== "function") {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Analytics] gtag not available for event:", eventName);
    }
    return;
  }

  try {
    window.gtag("event", eventName, parameters);

    if (process.env.NODE_ENV === "development") {
      console.debug("[Analytics] Event sent:", eventName, parameters);
    }
  } catch (error) {
    console.warn("[Analytics] Error sending event:", error);
  }
}

/**
 * Send Google Ads conversion event
 * @param conversionLabel - The conversion label from Google Ads
 * @param value - The conversion value (default: 0)
 * @param currency - The currency code (default: 'EUR')
 */
export function sendAdsConversion(
  conversionLabel: string,
  value: number = 0,
  currency: string = "EUR"
): void {
  if (typeof window === "undefined") return;

  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;

  if (!conversionId) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Analytics] Missing NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID environment variable"
      );
    }
    return;
  }

  if (!conversionLabel) {
    console.warn("[Analytics] Missing conversion label for ads conversion");
    return;
  }

  // Check consent
  if (!hasAnalyticsConsent()) {
    if (process.env.NODE_ENV === "development") {
      console.debug(
        "[Analytics] Ads conversion blocked - no analytics consent"
      );
    }
    return;
  }

  // Generate unique transaction ID to prevent duplicate conversions
  const transactionId = `conversion_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

  gtagEvent("conversion", {
    send_to: `${conversionId}/${conversionLabel}`,
    value: value,
    currency: currency,
    transaction_id: transactionId,
  });
}

/**
 * Track booking button clicks with enhanced ecommerce
 */
export function trackBookingClick(params: {
  packageName: string;
  packagePrice: number;
  buttonId: string;
  trackingLabel: string;
  conversionLabel?: string;
  sourcePage?: string;
  packageType?: string;
}): void {
  const {
    packageName,
    packagePrice,
    buttonId,
    trackingLabel,
    conversionLabel,
    sourcePage = "unknown",
    packageType,
  } = params;

  // Standard GA4 event with source page and package type
  gtagEvent("book_now_click", {
    event_category: "Booking",
    event_label: trackingLabel,
    package_name: packageName,
    package_price: packagePrice,
    package_type: packageType,
    source_page: sourcePage,
    currency: "EUR",
    button_id: buttonId,
    page_location: typeof window !== "undefined" ? window.location.href : "",
    page_title: typeof window !== "undefined" ? document.title : "",
  });

  // Enhanced Ecommerce - Begin Checkout Event
  gtagEvent("begin_checkout", {
    currency: "EUR",
    value: packagePrice,
    items: [
      {
        item_id: buttonId,
        item_name: packageName,
        item_category: "Adventure Package",
        price: packagePrice,
        quantity: 1,
      },
    ],
  });

  // Google Ads conversion if label provided
  if (conversionLabel) {
    sendAdsConversion(conversionLabel, packagePrice);
  }
}

/**
 * Track phone click events
 */
export function trackPhoneClick(phone: string): void {
  gtagEvent("phone_click", {
    event_category: "Contact",
    event_label: "Phone Call",
    phone_number: phone.replace(/\s+/g, ""),
  });

  // Send ads conversion for phone clicks
  const phoneConversionLabel = process.env.NEXT_PUBLIC_ADS_LABEL_PHONE;
  if (phoneConversionLabel) {
    sendAdsConversion(phoneConversionLabel, 0);
  }
}

/**
 * Track engagement micro-conversions for low-traffic optimization
 */
export function trackEngagement(params: {
  type: "scroll_depth" | "time_on_page" | "page_interaction" | "content_view";
  value?: number;
  threshold?: string;
  element?: string;
}): void {
  const { type, value, threshold, element } = params;

  // Track engagement event with detailed parameters
  gtagEvent("engagement", {
    event_category: "Engagement",
    event_label: type,
    engagement_type: type,
    engagement_value: value,
    engagement_threshold: threshold,
    engagement_element: element,
    page_location: typeof window !== "undefined" ? window.location.href : "",
    page_title: typeof window !== "undefined" ? document.title : "",
  });

  if (process.env.NODE_ENV === "development") {
    console.debug(`[Analytics] Engagement tracked: ${type}`, params);
  }
}

/**
 * Initialize scroll depth tracking for engagement optimization
 */
export function initScrollTracking(): (() => void) | void {
  if (typeof window === "undefined") return;

  const scrollDepths = [25, 50, 75, 90];
  const trackedDepths = new Set<number>();

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        100
    );

    scrollDepths.forEach((depth) => {
      if (scrollPercent >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth);
        trackEngagement({
          type: "scroll_depth",
          value: depth,
          threshold: `${depth}%`,
        });
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Clean up function
  return () => window.removeEventListener("scroll", handleScroll);
}

/**
 * Initialize time on page tracking
 */
export function initTimeTracking(): void {
  if (typeof window === "undefined") return;

  const timeThresholds = [30, 60, 120, 300]; // seconds
  const trackedTimes = new Set<number>();

  timeThresholds.forEach((threshold) => {
    setTimeout(() => {
      if (!trackedTimes.has(threshold)) {
        trackedTimes.add(threshold);
        trackEngagement({
          type: "time_on_page",
          value: threshold,
          threshold: `${threshold}s`,
        });
      }
    }, threshold * 1000);
  });
}

/**
 * Track other analytics platforms if available
 */
export function trackToAllPlatforms(
  eventName: string,
  data: Record<string, unknown>
): void {
  // Google Analytics (already handled by gtagEvent)
  gtagEvent(eventName, data);

  // Vercel Analytics
  if (typeof window !== "undefined" && window.va) {
    try {
      window.va("event", {
        name: eventName,
        data: data,
      });
    } catch (error) {
      console.warn("[Analytics] Vercel Analytics error:", error);
    }
  }

  // Facebook Pixel (if consent given for marketing)
  if (typeof window !== "undefined" && window.fbq && hasAnalyticsConsent()) {
    try {
      // Map common events to Facebook Pixel events
      if (eventName === "book_now_click") {
        window.fbq("track", "InitiateCheckout", {
          content_name: data.package_name as string,
          content_category: "Adventure Package",
          value: data.package_price as number,
          currency: "EUR",
        });
      }
    } catch (error) {
      console.warn("[Analytics] Facebook Pixel error:", error);
    }
  }
}

/**
 * Development debugging utilities
 * Available in browser console for testing
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  // Expose analytics functions for manual testing
  (window as any).analyticsDebug = {
    gtagEvent,
    sendAdsConversion,
    trackBookingClick,
    hasConsent: hasAnalyticsConsent,
    testBooking: () => {
      trackBookingClick({
        packageName: "Test Package",
        packagePrice: 100,
        buttonId: "test-btn",
        trackingLabel: "Debug Test",
        conversionLabel: "TEST_LABEL",
      });
    },
    testPhoneClick: () => {
      gtagEvent("phone_click", {
        event_category: "Contact",
        event_label: "Debug Test",
        phone_number: "+30 26650 61314",
      });
      sendAdsConversion("TEST_PHONE_LABEL", 0);
    },
    checkEnvironment: () => {
      console.log("Analytics Environment Check:", {
        GA_ID: process.env.NEXT_PUBLIC_GA_ID,
        ADS_CONVERSION_ID: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID,
        PACKAGE1_LABEL: process.env.NEXT_PUBLIC_ADS_LABEL_PACKAGE1,
        PACKAGE2_LABEL: process.env.NEXT_PUBLIC_ADS_LABEL_PACKAGE2,
        PHONE_LABEL: process.env.NEXT_PUBLIC_ADS_LABEL_PHONE,
        hasConsent: hasAnalyticsConsent(),
        gtagAvailable: typeof window.gtag === "function",
      });
    },
  };

  console.log(
    "[Analytics] Debug utilities available at window.analyticsDebug",
    "\nTry: analyticsDebug.checkEnvironment()",
    "\nTry: analyticsDebug.testBooking()",
    "\nTry: analyticsDebug.testPhoneClick()"
  );
}

// Note: Global types for gtag and fbq are declared in types/global.d.ts
