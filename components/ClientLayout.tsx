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

// Component to call useBokunInit
function BokunInitializer() {
  useBokunInit();
  return null; // This component doesn't render anything itself
}

export default function ClientLayout({
  children,
  initialLocale,
}: ClientLayoutProps) {
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
        {/* Hidden Bokun widget container to ensure script initialization */}
        <div className="bokunWidget" style={{ display: 'none' }} />
      </ThemeProvider>
    </LanguageProvider>
  );
}
