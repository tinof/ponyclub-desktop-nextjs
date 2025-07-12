"use client";

import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";

interface GoogleAnalyticsProps {
	gaId: string;
}

/**
 * GoogleAnalytics Component
 *
 * This component loads Google Analytics using @next/third-parties for optimal performance.
 * It automatically runs in a web worker via Partytown when available.
 * It should be wrapped with ConsentGate in the layout to ensure consent-based loading.
 */
export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
	if (process.env.NODE_ENV === "development") {
		console.log("[GA] Google Analytics component loaded with ID:", gaId);
	}

	return <NextGoogleAnalytics gaId={gaId} />;
}
