"use client";

import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context"; // useLanguage is not directly used here anymore for <html>
import PageLayout from "@/components/PageLayout";
// SpeedInsights, Analytics, Inter, Roboto_Slab, and useLanguage (for HtmlWrapper) are removed
// as their responsibilities are now handled by app/layout.tsx or are no longer needed here.

// The HtmlWrapper component is removed as app/layout.tsx now handles <html>, <head>, and <body>.
// Font class variables are applied to the <body> tag in app/layout.tsx.

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ClientLayout now only wraps the core client-side providers and the PageLayout.
  // It will be rendered inside the <body> tag defined in app/layout.tsx.
  return (
    <LanguageProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <PageLayout>
          {children}
        </PageLayout>
      </ThemeProvider>
    </LanguageProvider>
  );
}
