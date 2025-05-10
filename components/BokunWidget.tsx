"use client"

import React from "react";
import Script from "next/script"; // Import next/script
import { useLanguage } from "@/contexts/language-context";
import { bokunLangMap } from "@/lib/bokun-lang";

type BokunWidgetProps = {
  experienceId: string;
  partialView?: number;
};

export default function BokunWidget({ experienceId, partialView = 1 }: BokunWidgetProps) {
  const { language } = useLanguage();
  const bokunLang = bokunLangMap[language] || "en";

  const baseUrl = "https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience";
  const url = `${baseUrl}/${experienceId}?partialView=${partialView}&lang=${bokunLang}`;

  return (
    <>
      <Script
        id="bokun-widget-loader"
        src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c078b762-6f7f-474f-8edb-bdd1bdb7d12a"
        strategy="lazyOnload"
      />
      <div className="bokunWidget" data-src={url} data-lang={bokunLang}></div>
      <noscript>Please enable javascript in your browser to book</noscript>
    </>
  );
}
