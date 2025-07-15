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
  const [gtagLoaded, setGtagLoaded] = useState(false);
  const [environmentChecks, setEnvironmentChecks] = useState<
    EnvironmentCheck[]
  >([]);

  useEffect(() => {
    // Only show in development mode
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    // Check all required environment variables
    const checks: EnvironmentCheck[] = [
      {
        key: "NEXT_PUBLIC_GA_ID",
        label: "Google Analytics ID",
        value: process.env.NEXT_PUBLIC_GA_ID,
        required: true,
        status: process.env.NEXT_PUBLIC_GA_ID ? "set" : "missing",
      },
      {
        key: "NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID",
        label: "Google Ads Conversion ID",
        value: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID,
        required: true,
        status: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID
          ? "set"
          : "missing",
      },
      {
        key: "NEXT_PUBLIC_ADS_LABEL_HOMEPAGE_PACKAGE1",
        label: "Homepage Package 1 Label",
        value: process.env.NEXT_PUBLIC_ADS_LABEL_HOMEPAGE_PACKAGE1,
        required: true,
        status: process.env.NEXT_PUBLIC_ADS_LABEL_HOMEPAGE_PACKAGE1
          ? "set"
          : "missing",
      },
      {
        key: "NEXT_PUBLIC_ADS_LABEL_HOMEPAGE_PACKAGE2",
        label: "Homepage Package 2 Label",
        value: process.env.NEXT_PUBLIC_ADS_LABEL_HOMEPAGE_PACKAGE2,
        required: true,
        status: process.env.NEXT_PUBLIC_ADS_LABEL_HOMEPAGE_PACKAGE2
          ? "set"
          : "missing",
      },
      {
        key: "NEXT_PUBLIC_ADS_LABEL_PACKAGE1",
        label: "Package 1 Page Label",
        value: process.env.NEXT_PUBLIC_ADS_LABEL_PACKAGE1,
        required: true,
        status: process.env.NEXT_PUBLIC_ADS_LABEL_PACKAGE1 ? "set" : "missing",
      },
      {
        key: "NEXT_PUBLIC_ADS_LABEL_PACKAGE2",
        label: "Package 2 Page Label",
        value: process.env.NEXT_PUBLIC_ADS_LABEL_PACKAGE2,
        required: true,
        status: process.env.NEXT_PUBLIC_ADS_LABEL_PACKAGE2 ? "set" : "missing",
      },
      {
        key: "NEXT_PUBLIC_ADS_LABEL_PHONE_MOBILE",
        label: "Phone Mobile Label",
        value: process.env.NEXT_PUBLIC_ADS_LABEL_PHONE_MOBILE,
        required: true,
        status: process.env.NEXT_PUBLIC_ADS_LABEL_PHONE_MOBILE
          ? "set"
          : "missing",
      },
      {
        key: "NEXT_PUBLIC_ADS_LABEL_PHONE_DESKTOP",
        label: "Phone Desktop Label",
        value: process.env.NEXT_PUBLIC_ADS_LABEL_PHONE_DESKTOP,
        required: true,
        status: process.env.NEXT_PUBLIC_ADS_LABEL_PHONE_DESKTOP
          ? "set"
          : "missing",
      },
      {
        key: "NEXT_PUBLIC_ADS_LABEL_PHONE",
        label: "Phone Generic Label (Fallback)",
        value: process.env.NEXT_PUBLIC_ADS_LABEL_PHONE,
        required: false,
        status: process.env.NEXT_PUBLIC_ADS_LABEL_PHONE ? "set" : "missing",
      },
    ];

    setEnvironmentChecks(checks);

    // Check if gtag is loaded
    const checkGtag = () => {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        setGtagLoaded(true);
      }
    };

    // Check immediately and set up interval
    checkGtag();
    const interval = setInterval(checkGtag, 1000);

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
  const isHealthy = missingRequired.length === 0 && gtagLoaded;

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-md bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">
          Analytics Health Check
        </h3>
        <div
          className={`w-3 h-3 rounded-full ${isHealthy ? "bg-green-500" : "bg-red-500"}`}
        />
      </div>

      <div className="space-y-2 text-xs">
        {/* Google Tag Status */}
        <div className="flex items-center justify-between">
          <span>Google Tag (gtag.js) Loaded</span>
          <span className={gtagLoaded ? "text-green-600" : "text-red-600"}>
            {gtagLoaded ? "✅ Ready" : "❌ Not Loaded"}
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
              if (
                typeof window !== "undefined" &&
                (window as any).analyticsDebug
              ) {
                (window as any).analyticsDebug.checkEnvironment();
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
