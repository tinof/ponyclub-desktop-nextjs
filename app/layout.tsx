import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Roboto_Slab } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const robotoSlab = Roboto_Slab({
  subsets: ["latin", "greek"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
})

export const metadata: Metadata = {
  title: "1-day excursion in Acheron River",
  description: "Explore the beautiful Acheron River with our 1-day excursion packages",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
      </head>
      <body className={`${inter.variable} ${robotoSlab.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
