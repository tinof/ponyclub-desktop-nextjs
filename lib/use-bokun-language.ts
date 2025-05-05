import { useEffect } from 'react';

export function useBokunLanguage(lang: string) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const bokun = (window as any).BokunWidgets;
    if (!bokun) return;

    // Set global default for pop-up checkout (if supported)
    if (typeof bokun.setLanguage === 'function') {
      bokun.setLanguage(lang);
    }

    // Update all widgets and buttons with the new language
    document.querySelectorAll<HTMLElement>('.bokunWidget, .bokunButton').forEach(el => {
      // Update data-src URL with lang query param
      if (el.dataset.src) {
        let url = new URL(el.dataset.src, window.location.origin);
        url.searchParams.set('lang', lang);
        el.dataset.src = url.toString();
      }
      // Set data-lang attribute for newer widgets
      el.setAttribute('data-lang', lang);
    });

    // Reload widgets to apply language change
    if (typeof bokun.reload === 'function') {
      bokun.reload();
    }
  }, [lang]);
}
