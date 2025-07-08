"use client";

import type React from "react";
// Temporarily disabled due to c15t TypeScript compilation issues
// import ConsentProvider from "@/components/client/ConsentProvider";
// import CookieConsentBanner from "@/components/client/CookieConsentBanner";
import PageLayout from "@/components/PageLayout";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import { useBokunInit } from "@/hooks/use-bokun-init"; // Import the hook

interface ClientLayoutProps {
	children: React.ReactNode;
	initialLocale: string;
}

// Component to call useBokunInit - respects feature flag
function BokunInitializer() {
	useBokunInit();
	return null; // This component doesn't render anything itself
}

export default function ClientLayout({
	children,
	initialLocale,
}: ClientLayoutProps) {
	const isBokunEnabled = process.env.NEXT_PUBLIC_ENABLE_BOKUN !== "false";
	const isC15tEnabled = process.env.NEXT_PUBLIC_ENABLE_C15T !== "false";

	// Conditional wrapper for c15t consent provider
	// Temporarily disabled due to c15t TypeScript compilation issues
	const ConsentWrapper = ({ children }: { children: React.ReactNode }) => {
		if (isC15tEnabled) {
			console.warn('[ClientLayout] c15t enabled but disabled due to compilation issues');
			// return <ConsentProvider>{children}</ConsentProvider>;
		}
		return <>{children}</>;
	};

	return (
		<LanguageProvider initialLang={initialLocale}>
			<ConsentWrapper>
				<BokunInitializer />
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<PageLayout>{children}</PageLayout>
					{/* Show c15t banner only if enabled - temporarily disabled */}
					{/* {isC15tEnabled && <CookieConsentBanner />} */}
					{/* Hidden Bokun widget container to ensure script initialization - only if Bokun is enabled */}
					{isBokunEnabled && (
						<div className="bokunWidget" style={{ display: "none" }} />
					)}
				</ThemeProvider>
			</ConsentWrapper>
		</LanguageProvider>
	);
}
