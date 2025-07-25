"use client";

import { useEffect, useState } from "react";

interface AnalyticsStatusProps {
  className?: string;
}

interface EnvironmentCheck {
  key: string;
  label: string;
  value: string | undefined;
  required: boolean;
  status: "set" | "missing" | "partial";
}

export default function AnalyticsStatus({
  className = "",
}: AnalyticsStatusProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [gtmLoaded, setGtmLoaded] = useState(false);
  const [environmentChecks, setEnvironmentChecks] = useState<
    EnvironmentCheck[]
  >([]);

  useEffect(() => {
    // Only show in development mode
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    // Check GTM environment variables (post-migration)
    const checks: EnvironmentCheck[] = [
      {
        key: "NEXT_PUBLIC_GTM_ID",
        label: "Google Tag Manager ID",
        value: process.env.NEXT_PUBLIC_GTM_ID,
        required: true,
        status: process.env.NEXT_PUBLIC_GTM_ID ? "set" : "missing",
      },
      {
        key: "NEXT_PUBLIC_ENABLE_BOKUN",
        label: "Bokun Feature Flag",
        value: process.env.NEXT_PUBLIC_ENABLE_BOKUN,
        required: false,
        status: process.env.NEXT_PUBLIC_ENABLE_BOKUN ? "set" : "missing",
      },
      {
        key: "NEXT_PUBLIC_ENABLE_C15T",
        label: "C15T Consent Feature Flag",
        value: process.env.NEXT_PUBLIC_ENABLE_C15T,
        required: false,
        status: process.env.NEXT_PUBLIC_ENABLE_C15T ? "set" : "missing",
      },
    ];

    setEnvironmentChecks(checks);

    // Check if GTM dataLayer is loaded
    const checkGTM = () => {
      if (
        typeof window !== "undefined" &&
        window.dataLayer &&
        Array.isArray(window.dataLayer)
      ) {
        setGtmLoaded(true);
      }
    };

    // Check immediately and set up interval
    checkGTM();
    const interval = setInterval(checkGTM, 1000);

    // Show the component
    setIsVisible(true);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Don't render anything in production or if not visible
  if (process.env.NODE_ENV !== "development" || !isVisible) {
    return null;
  }

  const allRequired = environmentChecks.filter((check) => check.required);
  const missingRequired = allRequired.filter(
    (check) => check.status === "missing"
  );
  const isHealthy = missingRequired.length === 0 && gtmLoaded;

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-md bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">
          GTM Analytics Health Check
        </h3>
        <div
          className={`w-3 h-3 rounded-full ${isHealthy ? "bg-green-500" : "bg-red-500"}`}
        />
      </div>

      <div className="space-y-2 text-xs">
        {/* GTM Status */}
        <div className="flex items-center justify-between">
          <span>Google Tag Manager (GTM) Loaded</span>
          <span className={gtmLoaded ? "text-green-600" : "text-red-600"}>
            {gtmLoaded ? "✅ Ready" : "❌ Not Loaded"}
          </span>
        </div>

        {/* Environment Variables */}
        <div className="border-t pt-2">
          <h4 className="font-medium mb-2">Environment Variables:</h4>
          {environmentChecks.map((check) => (
            <div key={check.key} className="flex items-center justify-between">
              <span className={check.required ? "" : "text-gray-500"}>
                {check.label}
                {!check.required && " (optional)"}
              </span>
              <span
                className={
                  check.status === "set"
                    ? "text-green-600"
                    : check.required
                      ? "text-red-600"
                      : "text-gray-500"
                }
              >
                {check.status === "set" ? "✅ Set" : "❌ Missing"}
              </span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border-t pt-2">
          <div
            className={`font-medium ${isHealthy ? "text-green-600" : "text-red-600"}`}
          >
            {isHealthy
              ? "✅ All systems ready for deployment!"
              : `❌ ${missingRequired.length} required items missing`}
          </div>
        </div>

        {/* Quick Debug Button */}
        <div className="border-t pt-2">
          <button
            onClick={() => {
              if (typeof window !== "undefined" && window.analyticsDebug) {
                window.analyticsDebug.checkEnvironment();
              }
            }}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Run Debug Check (Console)
          </button>
        </div>
      </div>
    </div>
  );
}
