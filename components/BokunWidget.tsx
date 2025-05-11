"use client";

import React, { useEffect, useRef } from "react";
import Script from "next/script";
import { iframeResizer, IFrameOptions, IFramePage } from "iframe-resizer"; // Types for v3/v4
import { useLanguage } from "@/contexts/language-context";
import { bokunLangMap } from "@/lib/bokun-lang";

type BokunWidgetProps = {
  experienceId: string;
  partialView?: number;
};

export default function BokunWidget({ experienceId, partialView = 1 }: BokunWidgetProps) {
  const { language } = useLanguage();
  const bokunLang = bokunLangMap[language] || "en";
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  const baseUrl = "https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience";
  const bokunWidgetSrcUrl = `${baseUrl}/${experienceId}?partialView=${partialView}&lang=${bokunLang}`;

  useEffect(() => {
    const containerElement = widgetContainerRef.current;
    if (!containerElement) {
      console.log("[Bokun Widget Parent] Container ref not found.");
      return;
    }

    console.log("[Bokun Widget Parent] useEffect triggered. Container element:", containerElement);

    const observer = new MutationObserver((mutationsList, observerInstance) => {
      const iframe = containerElement.querySelector("iframe");
      if (iframe) {
        console.log("[Bokun Widget Parent] Found iframe:", iframe);
        try {
          const options: IFrameOptions = {
            log: true,
            checkOrigin: false, // Be cautious in production
            messageCallback: (messageData: { iframe: HTMLIFrameElement; message: any; }) => {
              console.log(
                "[Bokun Widget Parent] Received message from iframe (messageCallback):",
                messageData.message
              );
            },
            resizedCallback: (sizeData: { iframe: HTMLIFrameElement; height: number; width: number; type: string; }) => {
              console.log(
                "[Bokun Widget Parent] iframeResizer resizedCallback:",
                sizeData
              );
            },
            initCallback: (iFrameEl: HTMLIFrameElement) => {
                 console.log(
                "[Bokun Widget Parent] iframeResizer initCallback: iframe is ready.",
                iFrameEl
              );
            }
          };
          // In v4, iframeResizer() returns an array of the iFrame HTML elements it's acting on.
          const iFrameElements = iframeResizer(options, iframe);
          console.log("[Bokun Widget Parent] iframeResizer initialized. Result (iFrame elements):", iFrameElements);
        } catch (error) {
          console.error("[Bokun Widget Parent] Error initializing iframeResizer:", error);
        }
        observerInstance.disconnect();
      } else {
        console.log("[Bokun Widget Parent] iframe not found in MutationObserver callback.");
      }
    });

    console.log("[Bokun Widget Parent] Starting MutationObserver on container.");
    observer.observe(containerElement, { childList: true, subtree: true });

    return () => {
      console.log("[Bokun Widget Parent] useEffect cleanup: Disconnecting MutationObserver.");
      observer.disconnect();
      // iframe-resizer v4 might require manual cleanup if the iframe is removed.
      // Accessing iframeResizer.iframeResizer.close(iframeId) if an ID was set.
      // For now, we rely on the component unmounting.
    };
  }, [bokunWidgetSrcUrl]); // Re-run if the URL changes

  return (
    <>
      <Script
        id="bokun-widget-loader"
        src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c078b762-6f7f-474f-8edb-bdd1bdb7d12a"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("[Bokun Widget Parent] BokunWidgetsLoader.js script loaded via next/script.");
        }}
      />
      <div
        ref={widgetContainerRef}
        className="bokunWidget"
        data-src={bokunWidgetSrcUrl}
        data-lang={bokunLang}
        style={{ width: "100%", minHeight: "500px" }} // Ensure div has dimensions
      >
        {/* Bokun's script will inject the iframe here */}
      </div>
      <noscript>Please enable javascript in your browser to book</noscript>
    </>
  );
}
