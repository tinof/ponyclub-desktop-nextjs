# Project: Pony Club

## Main Goal

A website for a family-run business in Greece, offering Riding, Rafting, Kayaking, and Trekking for domestic and international audiences.

## Core Stack

- Next.js 15.3.2
- React 19.1.0
- TypeScript 5.8.3
- Tailwind CSS 4.1.6
- Radix UI (various components)
- Shadcn UI (inferred from dependencies and `components.json`)

## Key Integrations & Features

### Maps & Location Services

- **Google Maps Embed**: Simplified integration using @next/third-parties GoogleMapsEmbed
- **Business Location**: Pony Club Acheron (39.3257662, 20.6069899)
- **Performance Optimized**: 40KB iframe vs 250+ KB JavaScript bundle
- **GDPR Compliant**: No tracking cookies, privacy-friendly by default

### Security & Compliance

- **Content Security Policy (CSP)**: Automated with @nosecone/next
- **GDPR Compliance**: Full cookie consent system with granular controls
- **TypeScript Safety**: Comprehensive type definitions for all integrations

### Analytics & Tracking

- **Google Analytics 4**: GDPR-compliant implementation
- **Google Ads Conversion Tracking**: Enhanced ecommerce events
- **Facebook Pixel**: Marketing tracking with consent management

### Booking & Widgets

- **Bokun Integration**: Third-party booking widgets for activities
- **Elfsight Reviews**: Customer review widgets
- **Multi-language Support**: English and Greek translations

## Recent Major Updates

- ✅ **Performance Optimization** (June 2025): Implemented Google PageSpeed recommendations, including critical CSS inlining and resource optimization.
- ✅ **Sentry Integration** (May 2025): Added comprehensive error monitoring and performance tracing with Sentry.
- ✅ **Standalone Production Build** (April 2025): The build script now produces a self-contained `.next/standalone` output for optimized deployment.
- ✅ **New Content Pages** (March 2025): Added several new activity pages, including `/for-schools` and `/river-village`.
- ✅ **Google Maps & CSP Hardening** (January 2025): Initial secure integration of Google Maps and a robust Content Security Policy.
