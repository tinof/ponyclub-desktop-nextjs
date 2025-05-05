"use client"

import Script from "next/script";
import { useLanguage } from "@/contexts/language-context";
import { bokunLangMap } from "@/lib/bokun-lang";

export default function BookingButton() {
  const { language } = useLanguage();
  const bokunLang = bokunLangMap[language] || "en";

  return (
    <>
      <Script
        src="https://integrations.beyonk.com/v1/sdk"
        strategy="lazyOnload"
        onLoad={() => {
          // Optionally, you can add any initialization logic here if needed
          // For most cases, the <portal-button> custom element will be available after script load
        }}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          is="portal-button"
          {...{
            organisation: "pjpem0f0",
            color: "hsl(var(--river-accent))",
            lang: bokunLang,
          }}
        ></div>
      </div>
    </>
  );
}
