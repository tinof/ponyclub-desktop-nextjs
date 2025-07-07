'use client';

import type React from 'react';
import PageLayout from '@/components/PageLayout';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/contexts/language-context';
import { useBokunInit } from '@/hooks/use-bokun-init'; // Import the hook

interface ClientLayoutProps {
  children: React.ReactNode;
  initialLocale: string;
}

// Component to call useBokunInit - respects feature flag
function BokunInitializer() {
  const isBokunEnabled = process.env.NEXT_PUBLIC_ENABLE_BOKUN !== 'false';

  if (!isBokunEnabled) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Bokun] Initializer disabled via NEXT_PUBLIC_ENABLE_BOKUN feature flag');
    }
    return null;
  }

  useBokunInit();
  return null; // This component doesn't render anything itself
}

export default function ClientLayout({
  children,
  initialLocale,
}: ClientLayoutProps) {
  const isBokunEnabled = process.env.NEXT_PUBLIC_ENABLE_BOKUN !== 'false';

  return (
    <LanguageProvider initialLang={initialLocale}>
      <BokunInitializer />
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <PageLayout>{children}</PageLayout>
        {/* Hidden Bokun widget container to ensure script initialization - only if Bokun is enabled */}
        {isBokunEnabled && (
          <div className="bokunWidget" style={{ display: 'none' }} />
        )}
      </ThemeProvider>
    </LanguageProvider>
  );
}
