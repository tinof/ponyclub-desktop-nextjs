// app/[locale]/layout.tsx is a Server Component
import type React from "react";
import "../globals.css"; // Adjusted path
import type { Metadata, ResolvingMetadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react";
import GDPRGoogleAnalytics from '@/components/client/GDPRGoogleAnalytics';
// import Script from 'next/script'; // Import next/script - No longer needed for Bokun here

export const fetchCache = 'default-cache';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const robotoSlab = Roboto_Slab({
  subsets: ["latin", "greek"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
  display: 'swap',
});

// Define a type for the props including locale
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Params is a Promise
}

// Function to generate static paths for locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'el' }];
}

// Dynamic metadata generation
export async function generateMetadata(
  // Updated to treat params as a Promise, matching the error behavior
  { params: paramsPromise }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await paramsPromise; // Await params here
  // const resolvedLocale = locale || 'en'; // Use the awaited locale
  const baseUrl = (await parent).metadataBase || new URL('https://ponyclub.gr');

  // Common metadata, can be extended or overridden
  const commonMetadata: Metadata = {
    metadataBase: baseUrl,
    title: "Pony Club | Adventure Activities in Acheron River",
    description: "Pony Club offers rafting, horse riding, kayaking and trekking experiences in the beautiful Acheron River, Glyki, Greece. Join us for unforgettable outdoor adventures.",
    keywords: "Pony Club, Acheron River, rafting, horse riding, kayaking, trekking, Glyki, Greece, outdoor activities",
    generator: 'v0.dev',
    authors: [{ name: 'Pony Club' }],
    // Alternates will now correctly resolve to /en or /el
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'el': '/el',
      },
    },
    openGraph: {
      title: 'Pony Club | Adventure Activities in Acheron River',
      description: 'Join Pony Club for unforgettable rafting, horse riding, kayaking and trekking experiences in Acheron River, Greece.',
      url: new URL(locale, baseUrl).toString(), // URL will be locale-specific
      siteName: 'Pony Club',
      locale: locale === 'el' ? 'el_GR' : 'en_US', // Dynamic locale
      type: 'website',
      images: [
        {
          url: new URL('/images/ponyclub_logo.png', baseUrl).toString(),
          width: 200,
          height: 200,
          alt: 'Pony Club Logo',
        }
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
    // other: { ... } // JSON-LD might need locale-specific descriptions if they differ
  };

  // Example for locale-specific JSON-LD (if needed)
  // For now, keeping the generic one from parent or define a new one
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Pony Club",
    "description": locale === 'el'
      ? "Το Pony Club προσφέρει εμπειρίες ράφτινγκ, ιππασίας, καγιάκ και πεζοπορίας στον πανέμορφο ποταμό Αχέροντα, Γλυκή, Ελλάδα. Ελάτε μαζί μας για αξέχαστες υπαίθριες περιπέτειες."
      : "Pony Club offers rafting, horse riding, kayaking and trekking experiences in the beautiful Acheron River, Glyki, Greece. Join us for unforgettable outdoor adventures.",
    "url": new URL(locale, baseUrl).toString(),
    "image": [
      new URL('/images/hero-image.webp', baseUrl).toString(),
      new URL('/images/round1.jpg', baseUrl).toString(),
      new URL('/images/round2.jpg', baseUrl).toString(),
      new URL('/images/round3.jpg', baseUrl).toString()
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Glyki, Thesprotias",
      "addressRegion": "Epirus",
      "postalCode": "46200",
      "addressCountry": "GR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.32581744774602",
      "longitude": "20.606971798121965"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "10:00",
      "closes": "18:00"
    },
    "priceRange": "€€",
    "telephone": "+30 26650 71150",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "156",
      "bestRating": "5"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": locale === 'el' ? "Πακέτο Ράφτινγκ & Ιππασία" : "Rafting & Horse Riding Package",
        "description": locale === 'el'
          ? "Ράφτινγκ 30 λεπτά, ιππασία 10-15 λεπτά, πεζοπορία διάσχισης φαραγγιού"
          : "30 minutes rafting, 10-15 minutes horse riding, canyon crossing hiking",
        "price": "20",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": locale === 'el' ? "Πακέτο Καγιάκ & Ιππασία" : "Kayak & Horse Riding Package",
        "description": locale === 'el'
          ? "Καγιάκ 30 λεπτά, ιππασία 10-15 λεπτά, πεζοπορία διάσχισης φαραγγιού"
          : "30 minutes kayak, 10-15 minutes horse riding, canyon crossing hiking",
        "price": "25",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/ponyclub.acheron",
      "https://www.instagram.com/ponyclub_acheron"
    ]
  };
  commonMetadata.other = { "structured-data": JSON.stringify(structuredData) };


  return commonMetadata;
}

export default async function LocaleLayout({ // Added async
  children,
  params: paramsPromise, // Renamed: this is the Promise
}: LocaleLayoutProps) {
  const { locale } = await paramsPromise; // Await to get the actual locale
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://static.bokun.io" />
        <link rel="preconnect" href="https://widgets.bokun.io" />
        <link rel="preconnect" href="https://universe-static.elfsightcdn.com" />
        <link rel="preconnect" href="https://static.elfsight.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon_io/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon_io/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon_io/apple-touch-icon.png" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#6b8362" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pony Club" />

        {/* CRITICAL FIX: BokunWidgetsLoader.js loaded once in head - using direct script tag */}
        <script
          id="bokun-widgets-loader-global"
          src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c078b762-6f7f-474f-8edb-bdd1bdb7d12a"
          async
        ></script>
      </head>
      <body className={`${inter.variable} ${robotoSlab.variable} font-sans`} suppressHydrationWarning>
        {/* Pass locale to ClientLayout, which will then pass it to LanguageProvider */}
        <ClientLayout initialLocale={locale}>
          {children}
          <SpeedInsights />
          <Analytics />
          <GDPRGoogleAnalytics gaId="G-6J3ELVNTQE" />
        </ClientLayout>
      </body>
    </html>
  );
}
