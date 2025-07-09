"use client";

import { CookieBanner } from "@c15t/nextjs";
import { useLanguage } from "@/contexts/language-context";

/**
 * CookieConsentBanner Component
 *
 * This component renders the c15t cookie consent banner with styling
 * that matches the Pony Club vintage design system.
 */
export default function CookieConsentBanner() {
  const { language } = useLanguage();

  return (
    <div
      className="cookie-consent-banner"
      style={
        {
          "--c15t-primary-color": "#6b8362",
          "--c15t-background-color": "#ffffff",
          "--c15t-text-color": "#333333",
          "--c15t-border-radius": "8px",
          "--c15t-box-shadow":
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          "--c15t-border": "1px solid #e5e7eb",
          "--c15t-button-padding": "8px 16px",
          "--c15t-font-family": "inherit",
          "--c15t-font-size": "14px",
          "--c15t-line-height": "1.5",
        } as React.CSSProperties
      }
    >
      <CookieBanner />
    </div>
  );
}
