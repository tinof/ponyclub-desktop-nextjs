import { Inter, Playfair_Display, Roboto_Slab } from "next/font/google";

/**
 * Centralized font configuration for the application
 * Using next/font/google for optimal performance and self-hosting
 */

// Primary font - Inter for body text and UI elements
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Improves font loading performance
  preload: true, // Preload the font for better performance
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

// Secondary font - Roboto Slab for headings and emphasis
export const robotoSlab = Roboto_Slab({
  subsets: ["latin", "greek"], // Include Greek subset for localization
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

// Decorative font - Playfair Display for vintage/elegant elements
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair-display",
  display: "swap",
  preload: false, // Only preload if used above the fold
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/**
 * Font class names for easy usage in components
 */
export const fontClassNames = {
  inter: inter.variable,
  robotoSlab: robotoSlab.variable,
  playfairDisplay: playfairDisplay.variable,
} as const;

/**
 * Combined font variables for applying to the body element
 */
export const allFontVariables = `${inter.variable} ${robotoSlab.variable} ${playfairDisplay.variable}`;

/**
 * Font optimization utilities
 */
export const fontOptimizations = {
  // Preconnect hints for Google Fonts (if any external fonts are still used)
  preconnectHints: [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
  ],

  // Font display strategies
  displayStrategies: {
    critical: "swap", // For above-the-fold content
    deferred: "optional", // For below-the-fold content
  },
} as const;
