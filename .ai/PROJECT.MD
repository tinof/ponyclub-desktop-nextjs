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

- **Google Maps API**: Interactive maps with custom zoom controls and directions
- **Business Location**: Pony Club Acheron (39.3257662, 20.6069899)
- **CSP-Compliant Implementation**: No inline scripts, proper nonce handling

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

- ✅ **Google Maps Integration** (January 2025): CSP-compliant maps with custom controls
- ✅ **CSP Violations Resolution**: Comprehensive security header implementation
- ✅ **GDPR Compliance**: Full privacy compliance with consent management
- ✅ **TypeScript Improvements**: Enhanced type safety across all integrations
- ✅ **Build System Optimization**: Resolved all compilation errors for production deployment
