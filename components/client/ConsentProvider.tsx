"use client";

import { ConsentManagerProvider } from "@c15t/nextjs";
import ConsentBridge from "./ConsentBridge.tsx";

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
  // Note: language is available but not currently used in this component
  // const { language } = useLanguage();

  return (
    <ConsentManagerProvider
      options={{
        mode: "offline", // Use offline mode - no backend required
        consentCategories: ["necessary", "marketing"],
        ignoreGeoLocation: true, // Useful for development
      }}
    >
      <ConsentBridge />
      {children}
    </ConsentManagerProvider>
  );
}
