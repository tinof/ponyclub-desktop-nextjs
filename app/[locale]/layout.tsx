// app/[locale]/layout.tsx is a Server Component
import '../globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, ResolvingMetadata } from 'next';
import { inter, robotoSlab, allFontVariables } from '@/app/fonts';
import Script from 'next/script';
// PERFORMANCE OPTIMIZATION: Removed connection import as it's no longer needed
// import { connection } from 'next/server';
import type React from 'react';
import ClientLayout from '@/components/ClientLayout';
import BokunScripts from '@/components/client/BokunScripts';
import GoogleAnalytics from '@/components/client/GoogleAnalytics';
import PartyTownConfig from '@/components/PartyTownConfig';
import StructuredData from '@/components/StructuredData';
import {
  generateWebsiteStructuredData,
  organizationData,
} from '@/lib/structured-data';

// Remove the fetchCache export as we need dynamic rendering
// export const fetchCache = 'default-cache';

// Fonts are now imported from centralized fonts.ts file

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'el' }];
}

export async function generateMetadata(
  { params: paramsPromise }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await paramsPromise;
  const baseUrl = (await parent).metadataBase || new URL('https://ponyclub.gr');

  // Common metadata, can be extended or overridden
  const commonMetadata: Metadata = {
    metadataBase: baseUrl,
    title: 'Pony Club | Adventure Activities in Acheron River',
    description:
      'Pony Club offers rafting, horse riding, kayaking and trekking experiences in the beautiful Acheron River, Glyki, Greece. Join us for unforgettable outdoor adventures.',
    keywords:
      'Pony Club, Acheron River, rafting, horse riding, kayaking, trekking, Glyki, Greece, outdoor activities',
    generator: 'v0.dev',
    authors: [{ name: 'Pony Club' }],
    alternates: {
      canonical: '/',
      languages: {
        en: '/en',
        el: '/el',
      },
    },
    openGraph: {
      title: 'Pony Club | Adventure Activities in Acheron River',
      description:
        'Join Pony Club for unforgettable rafting, horse riding, kayaking and trekking experiences in Acheron River, Greece.',
      url: new URL(locale, baseUrl).toString(),
      siteName: 'Pony Club',
      locale: locale === 'el' ? 'el_GR' : 'en_US',
      type: 'website',
      images: [
        {
          url: new URL('/images/ponyclub_logo.png', baseUrl).toString(),
          width: 200,
          height: 200,
          alt: 'Pony Club Logo',
        },
      ],
    },
    icons: {
      icon: new URL('/images/ponyclub_logo.png', baseUrl).toString(),
      shortcut: new URL('/images/ponyclub_logo.png', baseUrl).toString(),
      apple: new URL('/images/ponyclub_logo.png', baseUrl).toString(),
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: new URL('/images/ponyclub_logo.png', baseUrl).toString(),
      },
    },
  };

  // Generate structured data using our utilities
  const _websiteStructuredData = generateWebsiteStructuredData(locale);

  // We'll render structured data in the component instead of metadata
  // to have better control and avoid duplication

  return commonMetadata;
}

export default async function LocaleLayout({
  children,
  params: paramsPromise,
}: LocaleLayoutProps) {
  // PERFORMANCE OPTIMIZATION: Removed connection() call to enable static generation
  // Previously: await connection(); - This was forcing dynamic rendering

  const { locale } = await paramsPromise;

  // Generate structured data for the layout
  const websiteStructuredData = generateWebsiteStructuredData(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://static.bokun.io" />
        <link rel="preconnect" href="https://widgets.bokun.io" />
        <link rel="preconnect" href="https://universe-static.elfsightcdn.com" />
        <link rel="preconnect" href="https://static.elfsight.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />

        <link rel="manifest" href="/manifest.json" />

        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon_io/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon_io/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon_io/apple-touch-icon.png"
        />

        <meta name="theme-color" content="#6b8362" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pony Club" />

        {/* PERFORMANCE OPTIMIZATION: Partytown configuration for web worker scripts */}
        <PartyTownConfig />


      </head>
      <body
        className={`
          ${allFontVariables}
          font-sans
        `}
        suppressHydrationWarning
      >
        <StructuredData data={[websiteStructuredData, organizationData]} />
        <ClientLayout initialLocale={locale}>
          {children}
          <SpeedInsights />
          <Analytics />
          <GoogleAnalytics gaId="G-6J3ELVNTQE" />
          <BokunScripts locale={locale} />
        </ClientLayout>
      </body>
    </html>
  );
}
