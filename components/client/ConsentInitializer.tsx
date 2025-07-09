"use client";

import Script from "next/script";

/**
 * ConsentInitializer Component
 * 
 * This component sends the default consent state to Google BEFORE any tracking scripts load.
 * This is critical for Google Consent Mode v2 compliance - it must run before any gtag scripts.
 * 
 * The component sets all consent types to 'denied' by default, except security_storage which
 * is always granted. When users provide consent through the c15t banner, ConsentBridge will
 * update these values using gtag('consent', 'update', {...}).
 */
export default function ConsentInitializer() {
	return (
		<Script
			id="consent-initializer"
			strategy="beforeInteractive"
			dangerouslySetInnerHTML={{
				__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          // Set default consent state (DENIED for all except security)
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'functionality_storage': 'denied',
            'personalization_storage': 'denied',
            'security_storage': 'granted'
          });

          ${
						process.env.NODE_ENV === "development"
							? `console.log('[ConsentInitializer] Default consent state set to denied for all categories except security');`
							: ""
					}
        `,
			}}
		/>
	);
}
