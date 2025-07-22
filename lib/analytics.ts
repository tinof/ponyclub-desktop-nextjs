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
	if (typeof window === "undefined") return false;

	// Check for consent cookie from the existing consent system
	try {
		const consentCookie = document.cookie
			.split("; ")
			.find((row) => row.startsWith("consent="));

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
	if (typeof window === "undefined") return;

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
	trackGTMEvent({
		event: "phone_click",
		phone_number: phoneNumber,
		device_type: device,
	});
};

/**
 * Development debugging utilities for GTM
 * Available in browser console for testing
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
	// Expose GTM analytics functions for manual testing
	const analyticsDebug = {
		trackGTMEvent,
		trackBookingClick,
		trackPhoneClick,
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
		checkEnvironment: () => {
			console.log("GTM Analytics Environment Check:", {
				GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
				hasConsent: hasAnalyticsConsent(),
			});
		},
	};

	(window as any).analyticsDebug = analyticsDebug;

	console.log(
		"[GTM] Debug utilities available at window.analyticsDebug",
		"\nTry: analyticsDebug.checkEnvironment()",
		"\nTry: analyticsDebug.testBooking()",
		"\nTry: analyticsDebug.testPhoneClick()",
	);
}

// Note: This file now uses Google Tag Manager (GTM) instead of direct gtag calls
