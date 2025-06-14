'use client';

import type React from 'react';
import GDPRBanner from '@/components/client/GDPRBanner';
import PageLayout from '@/components/PageLayout';
import { ThemeProvider } from '@/components/theme-provider';
import { GDPRProvider } from '@/contexts/gdpr-context';
import { LanguageProvider } from '@/contexts/language-context';
import { useBokunInit } from '@/hooks/use-bokun-init'; // Import the hook

interface ClientLayoutProps {
  children: React.ReactNode;
  initialLocale: string;
}

export default function ClientLayout({
  children,
  initialLocale,
}: ClientLayoutProps) {
  useBokunInit(); // Initialize Bokun widgets globally

  return (
    <LanguageProvider initialLang={initialLocale}>
      <GDPRProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <PageLayout>{children}</PageLayout>
          <GDPRBanner />
          {/* Hidden Bokun widget container to ensure script initialization */}
          <div className="bokunWidget" style={{ display: 'none' }} />
        </ThemeProvider>
      </GDPRProvider>
    </LanguageProvider>
  );
}
