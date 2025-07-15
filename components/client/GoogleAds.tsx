"use client";

import Script from "next/script";

interface GoogleAdsProps {
  conversionId: string;
}

/**
 * GoogleAds Component
 *
 * This component loads Google Ads gtag script for conversion tracking.
 * It loads alongside GoogleAnalytics to enable both GA4 analytics and Google Ads conversions.
 * It should be wrapped with ConsentGate in the layout to ensure consent-based loading.
 */
export default function GoogleAds({ conversionId }: GoogleAdsProps) {
  if (!conversionId) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Google Ads] No conversion ID provided");
    }
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    console.log(
      "[Google Ads] Google Ads component loaded with ID:",
      conversionId
    );
  }

  return (
    <>
      {/* Load Google Ads gtag script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`}
        strategy="afterInteractive"
      />

      {/* Initialize Google Ads gtag */}
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${conversionId}');
        `}
      </Script>
    </>
  );
}
