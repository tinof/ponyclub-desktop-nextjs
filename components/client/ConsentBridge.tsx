"use client";

import { useConsentManager } from "@c15t/nextjs";
import { useEffect } from "react";

/**
 * ConsentBridge Component
 *
 * This component bridges c15t consent state to the existing JSON cookie system.
 * It maintains backward compatibility with the current GoogleAnalytics.tsx and
 * lib/analytics.ts logic while providing the professional c15t UI.
 */

type LegacyConsentStatus = {
	analytics: boolean;
	marketing: boolean;
};

export default function ConsentBridge() {
	const { consents, hasConsentFor } = useConsentManager();

	// Function to handle consent revocation and cleanup
	const handleConsentRevocation = (category: "analytics" | "marketing") => {
		if (typeof window === "undefined") return;

		if (category === "analytics") {
			// Remove Google Analytics cookies
			const gaCookies = [
				"_ga",
				"_ga_*",
				"_gid",
				"_gat",
				"_gat_gtag_*",
				"_gcl_au",
				"_gcl_dc",
				"_gcl_aw",
			];

			gaCookies.forEach((cookieName) => {
				// Remove for current domain
				document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
				// Remove for parent domain (with leading dot)
				document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
				// Remove without domain specification
				document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
			});

			// Clear Vercel Analytics data if available
			if (window.va) {
				try {
					// Vercel Analytics doesn't have a direct clear method, but we can stop tracking
					console.log("[ConsentBridge] Analytics consent revoked - cleared GA cookies");
				} catch (error) {
					console.warn("[ConsentBridge] Error clearing Vercel Analytics:", error);
				}
			}
		}

		if (category === "marketing") {
			// Remove Facebook Pixel cookies
			const fbCookies = ["_fbp", "_fbc", "fr"];

			fbCookies.forEach((cookieName) => {
				// Remove for current domain
				document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
				// Remove for parent domain (with leading dot)
				document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
				// Remove without domain specification
				document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
			});

			// Revoke Facebook Pixel consent if available
			if (window.fbq) {
				try {
					window.fbq("consent", "revoke");
					console.log("[ConsentBridge] Marketing consent revoked - cleared FB cookies");
				} catch (error) {
					console.warn("[ConsentBridge] Error revoking Facebook Pixel consent:", error);
				}
			}
		}

		if (process.env.NODE_ENV === "development") {
			console.log(`[ConsentBridge] Cleaned up cookies for revoked ${category} consent`);
		}
	};

	// Function to update the legacy JSON cookie format
	const updateLegacyCookie = (
		analyticsConsent: boolean,
		marketingConsent: boolean,
	) => {
		const legacyConsent: LegacyConsentStatus = {
			analytics: analyticsConsent,
			marketing: marketingConsent,
		};

		// Set the cookie in the same format as the existing system
		const cookieValue = encodeURIComponent(JSON.stringify(legacyConsent));
		const expires = new Date();
		expires.setFullYear(expires.getFullYear() + 1); // 1 year expiry

		document.cookie = `consent=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

		if (process.env.NODE_ENV === "development") {
			console.log("[ConsentBridge] Updated legacy cookie:", legacyConsent);
		}
	};

	// Function to read existing legacy cookie and sync to c15t if needed
	const readLegacyCookie = (): LegacyConsentStatus | null => {
		try {
			const consentCookie = document.cookie
				.split("; ")
				.find((row) => row.startsWith("consent="));

			if (consentCookie) {
				const consent = JSON.parse(
					decodeURIComponent(consentCookie.split("=")[1]),
				) as LegacyConsentStatus;
				return consent;
			}
		} catch (error) {
			if (process.env.NODE_ENV === "development") {
				console.warn("[ConsentBridge] Error reading legacy cookie:", error);
			}
		}
		return null;
	};

	// Sync c15t consent changes to legacy cookie format AND Google Consent Mode v2
	useEffect(() => {
		if (!consents) return;

		const analyticsConsent = hasConsentFor("analytics" as any);
		const marketingConsent = hasConsentFor("marketing" as any);

		// Check for consent revocation and clean up if needed
		const previousConsent = readLegacyCookie();
		if (previousConsent) {
			if (previousConsent.analytics && !analyticsConsent) {
				handleConsentRevocation("analytics");
			}
			if (previousConsent.marketing && !marketingConsent) {
				handleConsentRevocation("marketing");
			}
		}

		// Update the legacy cookie format (existing functionality)
		updateLegacyCookie(analyticsConsent, marketingConsent);

		// NEW: Update Google Consent Mode v2
		if (typeof window !== "undefined" && window.gtag) {
			window.gtag("consent", "update", {
				analytics_storage: analyticsConsent ? "granted" : "denied",
				ad_storage: marketingConsent ? "granted" : "denied",
				ad_user_data: marketingConsent ? "granted" : "denied",
				ad_personalization: marketingConsent ? "granted" : "denied",
				functionality_storage: "granted", // Usually always granted for necessary functionality
				personalization_storage: analyticsConsent ? "granted" : "denied",
			});

			if (process.env.NODE_ENV === "development") {
				console.log("[ConsentBridge] Updated Google Consent Mode v2:", {
					analytics_storage: analyticsConsent ? "granted" : "denied",
					ad_storage: marketingConsent ? "granted" : "denied",
					ad_user_data: marketingConsent ? "granted" : "denied",
					ad_personalization: marketingConsent ? "granted" : "denied",
					functionality_storage: "granted",
					personalization_storage: analyticsConsent ? "granted" : "denied",
				});
			}
		}

		// Trigger storage event for components listening to consent changes
		// This ensures GoogleAnalytics.tsx picks up the changes immediately
		window.dispatchEvent(new Event("storage"));

		if (process.env.NODE_ENV === "development") {
			console.log("[ConsentBridge] Synced consent to legacy format:", {
				analytics: analyticsConsent,
				marketing: marketingConsent,
			});
		}
	}, [consents, hasConsentFor]);

	// Initialize c15t with existing legacy consent if available
	useEffect(() => {
		const legacyConsent = readLegacyCookie();
		if (legacyConsent) {
			// Check if c15t consent differs from legacy consent
			const c15tAnalytics = hasConsentFor("analytics" as any);
			const c15tMarketing = hasConsentFor("marketing" as any);

			if (
				c15tAnalytics !== legacyConsent.analytics ||
				c15tMarketing !== legacyConsent.marketing
			) {
				if (process.env.NODE_ENV === "development") {
					console.log(
						"[ConsentBridge] Syncing legacy consent to c15t:",
						legacyConsent,
					);
				}

				// Note: In a real implementation, you would use c15t's API to update consent
				// For now, we'll let c15t be the source of truth and update the legacy cookie
				updateLegacyCookie(c15tAnalytics, c15tMarketing);
			}
		}
	}, [consents, hasConsentFor]);

	// This component doesn't render anything - it's just for bridging consent state
	return null;
}

/**
 * Utility function to check consent status (for use in other components)
 * This maintains compatibility with the existing hasAnalyticsConsent() function
 */
export function checkConsentStatus(): LegacyConsentStatus {
	try {
		const consentCookie = document.cookie
			.split("; ")
			.find((row) => row.startsWith("consent="));

		if (consentCookie) {
			const consent = JSON.parse(
				decodeURIComponent(consentCookie.split("=")[1]),
			) as LegacyConsentStatus;
			return consent;
		}
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.warn("[ConsentBridge] Error checking consent status:", error);
		}
	}

	// Default to no consent
	return {
		analytics: false,
		marketing: false,
	};
}

/**
 * Utility function to check if analytics consent is granted
 * This maintains compatibility with the existing hasAnalyticsConsent() function
 */
export function hasAnalyticsConsent(): boolean {
	return checkConsentStatus().analytics;
}

/**
 * Utility function to check if marketing consent is granted
 */
export function hasMarketingConsent(): boolean {
	return checkConsentStatus().marketing;
}
