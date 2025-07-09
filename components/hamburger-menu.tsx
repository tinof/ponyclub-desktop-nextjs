"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import PhoneLink from "@/components/client/PhoneLink";
import { useLanguage } from "@/contexts/language-context";

export default function HamburgerMenu() {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Activities menu items
  const activities = [
    {
      id: "kayak-rafting",
      label: language === "el" ? "Καγιάκ & Ράφτινγκ" : "Kayak & Rafting",
      href: "/kayak-rafting",
    },
    {
      id: "riding",
      label: language === "el" ? "Ιππασία" : "Riding",
      href: "/riding",
    },
    {
      id: "trekking",
      label: language === "el" ? "Πεζοπορία" : "Trekking",
      href: "/trekking",
    },
  ];

  // Handle language change
  const handleLanguageChange = (lang: "en" | "el") => {
    setLanguage(lang);
    closeMenu();
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Hamburger button */}
      <button
        type="button"
        onClick={toggleMenu}
        className={`
          flex h-10 w-10 items-center justify-center rounded-full p-2
          transition-colors
          hover:bg-secondary
        `} /* Simplified style */
        aria-label="Menu"
      >
        <Menu
          className={`
            h-5 w-5 text-foreground
            hover:text-primary
          `}
        />{" "}
        {/* Standard icon color */}
        {/* Removed inset div */}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`
            absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg border
            border-[--border] bg-[--card] shadow-lg
          `}
        >
          {" "}
          {/* Cleaner dropdown style */}
          <div className="px-1 py-2">
            {/* Call us button - prominently displayed at top */}
            <PhoneLink
              phone={t.contact.phone1}
              onClick={closeMenu}
              className={`
                mx-3 mb-3 flex items-center justify-center gap-3 rounded-xl
                border border-primary-foreground/10 bg-gradient-to-r
                from-primary to-primary/80 px-4 py-3 text-primary-foreground
                shadow-md backdrop-blur-sm transition-all duration-200
                hover:scale-[1.02] hover:from-primary/90 hover:to-primary/70
                hover:shadow-lg
              `}
              showIcon={true}
            >
              <span className="font-medium tracking-wide">
                {t.navigation.callUs}
              </span>
            </PhoneLink>

            {/* Home link */}
            <Link
              href="/"
              className={`
                block px-4 py-2.5 text-sm
                ${
                  /* Removed rounded-md */
                  pathname === "/"
                    ? "font-semibold text-primary" /* Active: darker green text, no bg */
                    : "text-foreground hover:bg-secondary hover:text-primary" /* Inactive: hover bg and text */
                }
                transition-colors
              `}
              onClick={closeMenu}
            >
              {t.navigation.home}
            </Link>

            {/* River & Village - English only */}
            {language === "en" && (
              <Link
                href="/river-village"
                className={`
                  block px-4 py-2.5 text-sm
                  ${
                    /* Removed rounded-md */
                    pathname === "/river-village"
                      ? "font-semibold text-primary"
                      : "text-foreground hover:bg-secondary hover:text-primary"
                  }
                  transition-colors
                `}
                onClick={closeMenu}
              >
                River & Village
              </Link>
            )}

            {/* For Schools (Για τα σχολεία) - Greek only */}
            {language === "el" && (
              <Link
                href="/for-schools"
                className={`
                  block px-4 py-2.5 text-sm
                  ${
                    /* Removed rounded-md */
                    pathname === "/for-schools"
                      ? "font-semibold text-primary"
                      : "text-foreground hover:bg-secondary hover:text-primary"
                  }
                  transition-colors
                `}
                onClick={closeMenu}
              >
                Για τα σχολεία
              </Link>
            )}

            {/* Activities section */}
            <div className="mt-1 border-t border-border pt-1">
              {" "}
              {/* Cleaner border */}
              <div
                className={`
                  px-4 py-1.5 text-xs font-semibold tracking-wider
                  text-muted-foreground uppercase
                `}
              >
                {" "}
                {/* Standard header text */}
                {t.navigation.activities}
              </div>
              {activities.map((activity) => (
                <Link
                  key={activity.id}
                  href={activity.href}
                  className={`
                    block px-4 py-2.5 text-sm
                    ${
                      /* Removed rounded-md */
                      pathname === activity.href
                        ? "font-semibold text-primary"
                        : "text-foreground hover:bg-secondary hover:text-primary"
                    }
                    transition-colors
                  `}
                  onClick={closeMenu}
                >
                  {activity.label}
                </Link>
              ))}
            </div>

            {/* Language selector in menu */}
            <div className="mt-1 border-t border-[--border] pt-1">
              {" "}
              {/* Cleaner border */}
              <div
                className={`
                  px-4 py-1.5 text-xs font-semibold tracking-wider
                  text-muted-foreground uppercase
                `}
              >
                {" "}
                {/* Standard header text */}
                {t.navigation.language}
              </div>
              {/* Simplified language buttons to look like text options */}
              <button
                type="button"
                className={`
                  block w-full px-4 py-2.5 text-left text-sm
                  ${language === "en" ? "font-semibold text-primary" : "text-foreground hover:bg-secondary hover:text-primary"}
                  transition-colors
                `}
                onClick={() => handleLanguageChange("en")}
                aria-label="Switch to English"
              >
                English
              </button>
              <button
                type="button"
                className={`
                  block w-full px-4 py-2.5 text-left text-sm
                  ${language === "el" ? "font-semibold text-primary" : "text-foreground hover:bg-secondary hover:text-primary"}
                  transition-colors
                `}
                onClick={() => handleLanguageChange("el")}
                aria-label="Switch to Greek"
              >
                Ελληνικά
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
