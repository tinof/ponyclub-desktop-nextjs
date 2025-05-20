"use client"

import { useLanguage } from "@/contexts/language-context";
import type { Language } from "@/lib/translations";
import { Globe } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";

export default function LanguageSelector() {
  // language from context is named currentLocaleFromContext for clarity here
  const { language: currentLocaleFromContext, setLanguage, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname(); // Gets current path, e.g., /en/about
  // useParams() might not be needed if currentLocaleFromContext is reliable
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleLanguageChange = (newLocaleTarget: Language) => {
    closeDropdown();

    if (currentLocaleFromContext === newLocaleTarget) {
      return; // Already on the target locale, no action needed
    }

    // currentLocaleFromContext should be the current language segment in the URL (e.g., 'en', 'el')
    // pathname is the current full path (e.g., /en/some-page)

    let newPath;
    if (pathname.startsWith(`/${currentLocaleFromContext}/`)) {
        // Path is like /en/some/page -> /el/some/page
        newPath = pathname.replace(`/${currentLocaleFromContext}/`, `/${newLocaleTarget}/`);
    } else if (pathname === `/${currentLocaleFromContext}`) {
        // Path is like /en (root of the current locale) -> /el
        newPath = `/${newLocaleTarget}`;
    } else {
        // Fallback: This case implies the current pathname does not have the expected locale prefix
        // or currentLocaleFromContext is not matching the pathname's prefix.
        // Given middleware should enforce locale prefixes, this might indicate an issue
        // if pathname is something unexpected like "/" or "/unprefixed-path".
        // A robust fallback is to navigate to the root of the new locale,
        // or attempt to prefix the current path if it seems valid.
        console.warn(`LanguageSelector: Pathname "${pathname}" or current locale "${currentLocaleFromContext}" mismatch. Attempting to build new path for "${newLocaleTarget}".`);
        // If current path is just the root, go to new locale root. Otherwise, prefix current path.
        newPath = `/${newLocaleTarget}${pathname === '/' ? '' : pathname.startsWith('/') ? pathname : `/${pathname}`}`;
    }

    const search = window.location.search; // Preserve existing query parameters
    router.push(newPath + search);

    // No need to call setLanguage from context here, as the LanguageProvider
    // will re-initialize based on the new URL's locale parameter after navigation.
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="relative flex items-center gap-1 px-3 py-2 rounded-full bg-white/90 hover:bg-white transition-colors text-[#6b8362] font-medium shadow-md border border-amber-100/50 hover:shadow-lg hover:scale-105 transition-all duration-200"
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        {/* Display based on context language, which updates from URL via LanguageProvider */}
        <span>{currentLocaleFromContext === "en" ? "EN" : "EL"}</span>
        <div className="absolute -inset-[0.5px] -z-10 rounded-full bg-linear-to-r from-amber-200/30 to-transparent blur-xs"></div>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={closeDropdown} aria-hidden="true" />
          <div className="absolute right-0 mt-1 w-36 rounded-lg shadow-xl bg-white/95 backdrop-blur-xs ring-1 ring-amber-100 z-20 border border-amber-100/50 overflow-hidden">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <button
                className={`w-full text-left px-4 py-2 text-sm ${
                  currentLocaleFromContext === "en" ? "bg-[#6b8362]/10 font-medium text-[#6b8362]" : "text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]"
                } transition-colors`}
                onClick={() => handleLanguageChange("en")}
                role="menuitem"
              >
                {t.language.en}
              </button>
              <button
                className={`w-full text-left px-4 py-2 text-sm ${
                  currentLocaleFromContext === "el" ? "bg-[#6b8362]/10 font-medium text-[#6b8362]" : "text-gray-700 hover:bg-[#6b8362]/10 hover:text-[#6b8362]"
                } transition-colors`}
                onClick={() => handleLanguageChange("el")}
                role="menuitem"
              >
                {t.language.el}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
