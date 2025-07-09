"use client";

import { useConsentManager } from "@c15t/nextjs";
import { useEffect, useState } from "react";

interface ConsentGateProps {
  children: React.ReactNode;
  preference: "necessary" | "analytics" | "marketing";
  fallback?: React.ReactNode;
}

/**
 * ConsentGate Component
 *
 * Conditionally renders children based on user's consent preferences.
 * This ensures third-party scripts and components only load after consent.
 */
export default function ConsentGate({
  children,
  preference,
  fallback = null,
}: ConsentGateProps) {
  const { hasConsentFor, consents } = useConsentManager();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only render if consent preferences are available and the specific preference is granted
    if (consents) {
      setShouldRender(hasConsentFor(preference as any));
    }
  }, [consents, hasConsentFor, preference]);

  // Don't render anything until consent data is loaded
  if (!consents) {
    return <>{fallback}</>;
  }

  // Only render children if consent is granted for this preference
  return shouldRender ? <>{children}</> : <>{fallback}</>;
}
