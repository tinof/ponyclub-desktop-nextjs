"use client";

import { ChevronDown, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import PhoneLink from "@/components/client/PhoneLink";
import { useLanguage } from "@/contexts/language-context";

export default function DesktopMenu() {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [activitiesMenuOpen, setActivitiesMenuOpen] = useState(false);
  const activitiesMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  // Activities menu items
  const activities =
    language === "el"
      ? [
          { id: "kayaking", label: "Καγιάκ", href: "/kayaking" },
          { id: "rafting", label: "Ράφτινγκ", href: "/rafting" },
          { id: "riding", label: "Ιππασία", href: "/riding" },
          { id: "trekking", label: "Πεζοπορία", href: "/trekking" },
        ]
      : [
          { id: "kayaking", label: "Kayaking", href: "/kayaking" },
          { id: "rafting", label: "Rafting", href: "/rafting" },
          { id: "riding", label: "Riding", href: "/riding" },
          { id: "trekking", label: "Trekking", href: "/trekking" },
        ];

  // Handle clicks outside the menu to close them
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        activitiesMenuRef.current &&
        !activitiesMenuRef.current.contains(event.target as Node)
      ) {
        setActivitiesMenuOpen(false);
      }
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setLanguageMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center gap-4">
      {" "}
      {/* Increased gap */}
      {/* Home link */}
      <Link
        href="/"
        className={`
          border-b-2 px-3 py-2 text-base transition-all
          ${
            /* Adjusted padding, removed relative, rounded-full, bg, border, shadow */
            pathname === "/"
              ? "border-primary font-semibold text-primary" /* Darker green active text, active border */
              : "border-transparent font-medium text-foreground hover:text-primary" /* Standard text, hover, transparent border */
          }
        `}
      >
        {t.navigation.home}
        {/* Removed inset div */}
      </Link>
      {/* Activities dropdown */}
      <div className="relative" ref={activitiesMenuRef}>
        <button
          type="button"
          onClick={() => setActivitiesMenuOpen(!activitiesMenuOpen)}
          className={`
            flex items-center gap-1 border-b-2 px-3 py-2 text-base
            transition-all
            ${
              /* Adjusted padding, removed relative, rounded-full, bg, border, shadow */
              activities.some((activity) => pathname === activity.href) ||
              activitiesMenuOpen
                ? "border-primary font-semibold text-primary" /* Darker green active text, active border */
                : "border-transparent font-medium text-foreground hover:text-primary" /* Standard text, hover, transparent border */
            }
          `}
          aria-label="Activities menu"
          aria-expanded={activitiesMenuOpen}
        >
          {t.navigation.activities}
          <ChevronDown className="ml-1 h-5 w-5" />
          {/* Removed inset div */}
        </button>

        {activitiesMenuOpen && (
          <div
            className={`
              absolute left-0 z-50 mt-2 w-52 overflow-hidden rounded-lg border
              border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg
              supports-[backdrop-filter]:bg-white/90
            `}
          >
            {" "}
            {/* Cleaner dropdown style */}
            <div className="py-1">
              {activities.map((activity) => (
                <Link
                  key={activity.id}
                  href={activity.href}
                  className={`
                    block w-full px-4 py-2 text-left text-base
                    ${
                      /* Adjusted padding */
                      pathname === activity.href
                        ? "font-semibold text-primary" /* Active item: darker green text, no bg */
                        : "text-foreground hover:bg-secondary hover:text-primary" /* Standard item: hover bg and text */
                    }
                  `}
                >
                  {activity.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Packages link - Critical for SEO */}
      <Link
        href="/packages"
        className={`
          border-b-2 px-3 py-2 text-base transition-all
          ${
            pathname.startsWith("/packages") || pathname.startsWith("/package-")
              ? "border-primary font-semibold text-primary"
              : "border-transparent font-medium text-foreground hover:text-primary"
          }
        `}
      >
        {language === "el" ? "Πακέτα" : "Packages"}
      </Link>
      {/* River & Village - English only */}
      {language === "en" && (
        <Link
          href="/river-village"
          className={`
            border-b-2 px-3 py-2 text-base transition-all
            ${
              /* Adjusted padding, removed relative, rounded-full, bg, border, shadow */
              pathname === "/river-village"
                ? "border-primary font-semibold text-primary" /* Darker green active text, active border */
                : "border-transparent font-medium text-foreground hover:text-primary" /* Standard text, hover, transparent border */
            }
          `}
        >
          River & Village
          {/* Removed inset div */}
        </Link>
      )}
      {/* For Schools (Για τα σχολεία) - Greek only */}
      {language === "el" && (
        <Link
          href="/for-schools"
          className={`
            border-b-2 px-3 py-2 text-base transition-all
            ${
              /* Adjusted padding, removed relative, rounded-full, bg, border, shadow */
              pathname === "/for-schools"
                ? "border-primary font-semibold text-primary" /* Darker green active text, active border */
                : "border-transparent font-medium text-foreground hover:text-primary" /* Standard text, hover, transparent border */
            }
          `}
        >
          Για τα σχολεία
          {/* Removed inset div */}
        </Link>
      )}
      {/* Phone number with click tracking */}
      <PhoneLink
        phone={t.contact.phone1}
        className={`
          ml-2 flex cursor-pointer items-center gap-1 px-3 py-2 font-medium
          text-accent select-text
        `}
      >
        <span>{t.navigation.callUs}</span>
      </PhoneLink>
      {/* Language selector */}
      <div className="relative ml-2" ref={languageMenuRef}>
        <button
          type="button"
          onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
          className={`
            flex items-center gap-1 border-b-2 px-3 py-2 text-base
            transition-all
            ${
              /* Adjusted padding, removed relative, rounded-full, bg, border, shadow */
              languageMenuOpen
                ? "border-primary font-semibold text-primary" /* Darker green active text, active border */
                : "border-transparent font-medium text-foreground hover:text-primary" /* Standard text, hover, transparent border */
            }
          `}
        >
          <Globe className="h-5 w-5" />
          <span>{language === "en" ? "EN" : "EL"}</span>
          {/* Removed inset div */}
        </button>

        {languageMenuOpen && (
          <div
            className={`
              absolute right-0 z-50 mt-2 w-32 overflow-hidden rounded-lg border
              border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg
              supports-[backdrop-filter]:bg-white/90
            `}
          >
            {" "}
            {/* Cleaner dropdown style */}
            <div className="py-1">
              <button
                type="button"
                onClick={() => {
                  setLanguage("en");
                  setLanguageMenuOpen(false);
                }}
                className={`
                  block w-full px-4 py-2 text-left text-base
                  ${language === "en" ? "font-semibold text-primary" : "text-foreground hover:bg-secondary hover:text-primary"}
                `} /* Adjusted padding, active/hover style */
              >
                English
              </button>
              <button
                type="button"
                onClick={() => {
                  setLanguage("el");
                  setLanguageMenuOpen(false);
                }}
                className={`
                  block w-full px-4 py-2 text-left text-base
                  ${language === "el" ? "font-semibold text-primary" : "text-foreground hover:bg-secondary hover:text-primary"}
                `} /* Adjusted padding, active/hover style */
              >
                Ελληνικά
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
