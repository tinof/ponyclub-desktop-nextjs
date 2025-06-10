'use client'

import type React from 'react'

import GDPRBanner from '@/components/client/GDPRBanner'
import PageLayout from '@/components/PageLayout'
import { ThemeProvider } from '@/components/theme-provider'
import { GDPRProvider } from '@/contexts/gdpr-context'
import { LanguageProvider } from '@/contexts/language-context' // useLanguage is not directly used here anymore for <html>
// SpeedInsights, Analytics, Inter, Roboto_Slab, and useLanguage (for HtmlWrapper) are removed
// as their responsibilities are now handled by app/layout.tsx or are no longer needed here.

// The HtmlWrapper component is removed as app/layout.tsx now handles <html>, <head>, and <body>.
// Font class variables are applied to the <body> tag in app/layout.tsx.

interface ClientLayoutProps {
  children: React.ReactNode
  initialLocale: string // Required since app/[locale]/layout.tsx will always pass it
}

export default function ClientLayout({ children, initialLocale }: ClientLayoutProps) {
  // ClientLayout now only wraps the core client-side providers and the PageLayout.
  // It will be rendered inside the <body> tag defined in app/layout.tsx.
  return (
    <LanguageProvider initialLang={initialLocale}>
      <GDPRProvider>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          <PageLayout>{children}</PageLayout>
          <GDPRBanner />
        </ThemeProvider>
      </GDPRProvider>
    </LanguageProvider>
  )
}
