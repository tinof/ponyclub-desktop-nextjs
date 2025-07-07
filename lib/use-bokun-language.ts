import { useEffect, useRef } from "react";

export function useBokunLanguage(lang: string) {
  const previousLang = useRef<string>(lang);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Skip if language hasn't actually changed
    if (previousLang.current === lang) {
      return;
    }

    const bokun = (
      window as Window & { BokunWidgets?: { [key: string]: unknown } }
    ).BokunWidgets;
    if (!bokun) {
      // Store the language for when Bokun loads
      (
        window as Window & { __bokunPendingLanguage?: string }
      ).__bokunPendingLanguage = lang;
      previousLang.current = lang;
      return;
    }

    console.log(
      `[Bokun Language] Switching from ${previousLang.current} to ${lang}`
    );

    // Set global default for pop-up checkout (if supported)
    if (typeof bokun.setLanguage === "function") {
      bokun.setLanguage(lang);
    }

    // Update all widgets and buttons with the new language
    document
      .querySelectorAll<HTMLElement>(".bokunWidget, .bokunButton")
      .forEach((el) => {
        // Update data-src URL with lang query param
        if (el.dataset.src) {
          const url = new URL(el.dataset.src, window.location.origin);
          url.searchParams.set("lang", lang);
          el.dataset.src = url.toString();
        }
        // Set data-lang attribute for newer widgets
        el.setAttribute("data-lang", lang);
      });

    // PERFORMANCE OPTIMIZATION: Only reload widgets if language actually changed
    // and avoid reload during initial page load
    if (previousLang.current !== lang && typeof bokun.reload === "function") {
      // Use a small delay to batch multiple language changes
      setTimeout(() => {
        (bokun as any).reload();
        console.log(`[Bokun Language] Widgets reloaded for language: ${lang}`);
      }, 100);
    }

    previousLang.current = lang;
  }, [lang]);
}
