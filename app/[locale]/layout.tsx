// app/[locale]/layout.tsx is a Server Component
import '../globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, ResolvingMetadata } from 'next';
import { Inter, Roboto_Slab } from 'next/font/google';
import Script from 'next/script';
import { connection } from 'next/server';
import type React from 'react';
import ClientLayout from '@/components/ClientLayout';
import GoogleAnalytics from '@/components/client/GoogleAnalytics';
import {
  generateWebsiteStructuredData,
  organizationData,
} from '@/lib/structured-data';
import StructuredData from '@/components/StructuredData';
// Remove the fetchCache export as we need dynamic rendering
// export const fetchCache = 'default-cache';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const robotoSlab = Roboto_Slab({
  subsets: ['latin', 'greek'],
  weight: ['400', '700'],
  variable: '--font-roboto-slab',
  display: 'swap',
});

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
  const websiteStructuredData = generateWebsiteStructuredData(locale);

  // We'll render structured data in the component instead of metadata
  // to have better control and avoid duplication

  return commonMetadata;
}

export default async function LocaleLayout({
  children,
  params: paramsPromise,
}: LocaleLayoutProps) {
  // Opt-out of static generation for CSP nonce support
  await connection();

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

        {/* Nosecone automatically handles nonces, so we can remove manual nonce handling */}
        <Script
          id={`bokun-widgets-loader-${locale}`}
          src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c078b762-6f7f-474f-8edb-bdd1bdb7d12a"
          strategy="lazyOnload"
        />
      </head>
      <body
        className={`
          ${inter.variable}
          ${robotoSlab.variable}
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
        </ClientLayout>
      </body>
    </html>
  );
}
