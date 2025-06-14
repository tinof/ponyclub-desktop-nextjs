'use client';

import { usePathname, useRouter } from 'next/navigation';
import type React from 'react';
import { createContext, useContext } from 'react';

import { bokunLangMap } from '@/lib/bokun-lang';
import {
  type Language,
  type TranslationKeys,
  translations,
} from '@/lib/translations';
import { useBokunLanguage } from '@/lib/use-bokun-language';

type LanguageContextType = {
  language: Language;
  t: TranslationKeys;
  setLanguage: (lang: Language) => void;
};

const defaultLanguage: Language = 'en';

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLang: string; // From URL via app/[locale]/layout.tsx
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({
  children,
  initialLang,
}: LanguageProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  // The language is now directly determined by the `initialLang` prop from the URL.
  // This ensures the URL is the single source of truth.
  const language =
    initialLang === 'en' || initialLang === 'el'
      ? initialLang
      : defaultLanguage;

  // This function will be called by the language selector.
  // It sets a cookie with the new language preference and then navigates
  // to the new URL, causing the app to re-render with the correct locale.
  const setLanguage = (newLocale: Language) => {
    // Set cookie to remember the user's choice
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;

    // Determine the new path
    const currentLocale = language;
    let newPath;
    if (pathname.startsWith(`/${currentLocale}/`)) {
      newPath = pathname.replace(`/${currentLocale}/`, `/${newLocale}/`);
    } else if (pathname === `/${currentLocale}`) {
      newPath = `/${newLocale}`;
    } else {
      // Fallback for unexpected path structures
      newPath = `/${newLocale}${pathname === '/' ? '' : pathname}`;
    }

    // Navigate to the new path, preserving query parameters
    const search = window.location.search;
    router.push(newPath + search);
  };

  // Get translations for the current language
  const t = translations[language];

  // Hook to update Bokun widgets language on change
  useBokunLanguage(bokunLangMap[language]);

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
