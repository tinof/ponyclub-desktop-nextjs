"use client";

import { useConsentManager } from "@c15t/nextjs";
import { useEffect, useState } from "react";

// Note: c15t only supports 'necessary' and 'marketing' categories
// We map 'analytics' to 'marketing' for compatibility
type ConsentCategory = "necessary" | "analytics" | "marketing";

interface ConsentGateProps {
  children: React.ReactNode;
  preference: ConsentCategory;
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
      // Map analytics to marketing since c15t only has 'necessary' and 'marketing'
      const c15tCategory =
        preference === "analytics" ? "marketing" : preference;
      setShouldRender(hasConsentFor(c15tCategory as any));
    }
  }, [consents, hasConsentFor, preference]);

  // Don't render anything until consent data is loaded
  if (!consents) {
    return <>{fallback}</>;
  }

  // Only render children if consent is granted for this preference
  return shouldRender ? <>{children}</> : <>{fallback}</>;
}
