// app/layout.tsx is a Server Component
import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import ClientLayout from "@/components/ClientLayout"; // Wraps client-side providers and PageLayout
import { SpeedInsights } from '@vercel/speed-insights/next'; // Moved here
import { Analytics } from "@vercel/analytics/react"; // Moved here
import { GoogleAnalytics } from '@next/third-parties/google' // Added Google Analytics

export const fetchCache = 'default-cache'; // Next.js 15 fetch caching strategy

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoSlab = Roboto_Slab({
  subsets: ["latin", "greek"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ponyclub.gr'),
  title: "Pony Club | Adventure Activities in Acheron River",
  description: "Pony Club offers rafting, horse riding, kayaking and trekking experiences in the beautiful Acheron River, Glyki, Greece. Join us for unforgettable outdoor adventures.",
  keywords: "Pony Club, Acheron River, rafting, horse riding, kayaking, trekking, Glyki, Greece, outdoor activities",
  generator: 'v0.dev',
  authors: [{ name: 'Pony Club' }],
  alternates: { // Added for canonical URL
    canonical: '/',
  },
  other: { // For JSON-LD and other arbitrary tags
    "structured-data": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      "name": "Pony Club",
      "description": "Outdoor adventure activities including rafting, horse riding, kayaking and trekking in Acheron River, Greece",
      "url": "https://ponyclub.gr",
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
      }
    }),
  },
  openGraph: {
    title: 'Pony Club | Adventure Activities in Acheron River',
    description: 'Join Pony Club for unforgettable rafting, horse riding, kayaking and trekking experiences in Acheron River, Greece.',
    url: 'https://ponyclub.gr',
    siteName: 'Pony Club',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/ponyclub_logo.png',
        width: 200,
        height: 200,
        alt: 'Pony Club Logo',
      }
    ],
  },
  icons: {
    icon: '/images/ponyclub_logo.png',
    shortcut: '/images/ponyclub_logo.png',
    apple: '/images/ponyclub_logo.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/images/ponyclub_logo.png',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This Server Component now renders the main HTML structure.
  // The lang attribute is set to a default; dynamic lang from useLanguage is complex here.
  // Metadata object handles locale for SEO.
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resource Hints moved from ClientLayout's HtmlWrapper */}
        <link rel="preconnect" href="https://static.bokun.io" />
        <link rel="preconnect" href="https://widgets.bokun.io" />
        <link rel="preconnect" href="https://universe-static.elfsightcdn.com" />
        <link rel="preconnect" href="https://static.elfsight.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        {/* Next.js will automatically inject other head elements from `metadata` */}
      </head>
      <body className={`${inter.variable} ${robotoSlab.variable} font-sans`} suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId="G-6J3ELVNTQE" />
      </body>
    </html>
  );
}
