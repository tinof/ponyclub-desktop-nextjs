import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Roboto_Slab } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import PageLayout from "@/components/PageLayout"
import Script from "next/script"
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const robotoSlab = Roboto_Slab({
  subsets: ["latin", "greek"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ponyclub.gr'),
  title: "Pony Club | Adventure Activities in Acheron River",
  description: "Pony Club offers rafting, horse riding, kayaking and trekking experiences in the beautiful Acheron River, Glyki, Greece. Join us for unforgettable outdoor adventures.",
  keywords: "Pony Club, Acheron River, rafting, horse riding, kayaking, trekking, Glyki, Greece, outdoor activities",
  generator: 'v0.dev',
  authors: [{ name: 'Pony Club' }],
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
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resource Hints */}
        <link rel="preconnect" href="https://static.bokun.io" />
        <link rel="preconnect" href="https://widgets.bokun.io" />
        <link rel="preconnect" href="https://universe-static.elfsightcdn.com" />
        <link rel="preconnect" href="https://static.elfsight.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        
        {/* <Script src="https://static.elfsight.com/platform/platform.js" strategy="afterInteractive" /> */}
        {/* Canonical link for homepage */}
        <link rel="canonical" href="https://ponyclub.gr/" />
        {/* JSON-LD structured data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            })
          }}
        />
        <Script id="vercel-analytics" strategy="afterInteractive" src="https://vercel.live/analytics" />
      </head>
      <body className={`${inter.variable} ${robotoSlab.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <PageLayout>
              {children}
            </PageLayout>
          </LanguageProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
