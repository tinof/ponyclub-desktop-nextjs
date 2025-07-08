"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

interface GoogleAnalyticsProps {
	gaId: string;
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
	const [hasConsent, setHasConsent] = useState(false);

	// Check for analytics consent on mount and when cookies change
	useEffect(() => {
		const checkConsent = () => {
			try {
				const consentCookie = document.cookie
					.split("; ")
					.find((row) => row.startsWith("consent="));

				if (consentCookie) {
					const consent = JSON.parse(
						decodeURIComponent(consentCookie.split("=")[1]),
					);
					setHasConsent(consent.analytics === true);
				}
			} catch (error) {
				if (process.env.NODE_ENV === "development") {
					console.warn("[GA] Error reading consent:", error);
				}
			}
		};

		checkConsent();

		// Listen for consent changes
		const handleStorageChange = () => checkConsent();
		window.addEventListener("storage", handleStorageChange);

		// Also check periodically for cookie changes
		const interval = setInterval(checkConsent, 1000);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
			clearInterval(interval);
		};
	}, []);

	// Only render Google Analytics if user has given consent
	if (!hasConsent) {
		return null;
	}

	return (
		<>
			{/* PERFORMANCE OPTIMIZATION: Google Analytics script running in web worker via Partytown */}
			<script
				id="ga-gtag-script"
				type="text/partytown"
				src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
			/>

			{/* Initialize Google Analytics in web worker with enhanced error handling */}
			<script
				id="ga-init-script"
				type="text/partytown"
				dangerouslySetInnerHTML={{
					__html: `
            try {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_title: document.title,
                page_location: window.location.href
              });
              ${
								process.env.NODE_ENV === "development"
									? `console.log('[GA] Google Analytics initialized in web worker');
                     if (typeof gtag !== 'undefined') {
                       console.log('[GA] Google Analytics script loaded successfully via Partytown');
                     }`
									: ""
							}
            } catch (error) {
              ${
								process.env.NODE_ENV === "development"
									? `console.error('[GA] Error initializing Google Analytics in web worker:', error);`
									: ""
							}

              // Report error for monitoring
              if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                  description: 'GA initialization error: ' + error.message,
                  fatal: false,
                });
              }
            }
          `,
				}}
			/>
		</>
	);
}
