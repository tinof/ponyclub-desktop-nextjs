"use client";

import { ConsentManagerProvider } from "@c15t/nextjs";
import { useLanguage } from "@/contexts/language-context";
import ConsentBridge from "./ConsentBridge";

interface ConsentProviderProps {
	children: React.ReactNode;
}

/**
 * ConsentProvider Component
 *
 * This component wraps the c15t ConsentManagerProvider and includes
 * the consent bridge logic to maintain compatibility with the existing
 * analytics system.
 */
export default function ConsentProvider({ children }: ConsentProviderProps) {
	const { language } = useLanguage();

	return (
		<ConsentManagerProvider
			options={{
				mode: "offline", // Use offline mode - no backend required
				consentCategories: ["necessary", "analytics", "marketing"] as any,
				ignoreGeoLocation: true, // Useful for development
			}}
		>
			<ConsentBridge />
			{children}
		</ConsentManagerProvider>
	);
}
