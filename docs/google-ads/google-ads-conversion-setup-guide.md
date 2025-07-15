# Google Ads Conversion Actions Setup Guide

## Required Conversion Actions

Create these 5 conversion actions in your Google Ads account:

### 1. Package 1 Booking - Homepage
- **Name:** "Package 1 Booking - Homepage"
- **Category:** Purchase
- **Value:** Use different values for each conversion
- **Count:** One
- **Attribution:** Data-driven (recommended)

### 2. Package 1 Booking - Package Page  
- **Name:** "Package 1 Booking - Package Page"
- **Category:** Purchase
- **Value:** Use different values for each conversion
- **Count:** One
- **Attribution:** Data-driven (recommended)

### 3. Package 2 Booking - Homepage
- **Name:** "Package 2 Booking - Homepage" 
- **Category:** Purchase
- **Value:** Use different values for each conversion
- **Count:** One
- **Attribution:** Data-driven (recommended)

### 4. Package 2 Booking - Package Page
- **Name:** "Package 2 Booking - Package Page"
- **Category:** Purchase  
- **Value:** Use different values for each conversion
- **Count:** One
- **Attribution:** Data-driven (recommended)

### 5. Phone Click - Mobile Priority
- **Name:** "Phone Click - Mobile"
- **Category:** Phone calls
- **Value:** 0 (or assign value for lead scoring)
- **Count:** One
- **Attribution:** Data-driven (recommended)

### 6. Phone Click - Desktop
- **Name:** "Phone Click - Desktop"
- **Category:** Phone calls
- **Value:** 0 (or assign value for lead scoring)  
- **Count:** One
- **Attribution:** Data-driven (recommended)

## After Creating Each Action

Google Ads will provide:
- **Conversion ID:** Format `AW-XXXXXXXXXX` (same for all actions)
- **Conversion Label:** Unique string for each action (different for each)

## Update Environment Variables

Once you have the IDs and labels, update your `.env.local` file:

```bash
# Google Ads Conversion Tracking
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXXX

# Package Booking Conversion Labels (Source-Aware)
NEXT_PUBLIC_ADS_LABEL_HOMEPAGE_PACKAGE1=your_homepage_package1_label
NEXT_PUBLIC_ADS_LABEL_HOMEPAGE_PACKAGE2=your_homepage_package2_label
NEXT_PUBLIC_ADS_LABEL_PACKAGE1=your_package_page_package1_label
NEXT_PUBLIC_ADS_LABEL_PACKAGE2=your_package_page_package2_label

# Phone Click Conversion Labels (Mobile-First)
NEXT_PUBLIC_ADS_LABEL_PHONE_MOBILE=your_mobile_phone_label
NEXT_PUBLIC_ADS_LABEL_PHONE_DESKTOP=your_desktop_phone_label
NEXT_PUBLIC_ADS_LABEL_PHONE=your_generic_phone_label
```

## Testing Conversion Tracking

1. **Install Google Tag Assistant** browser extension
2. **Enable Test Mode** in Google Ads for your conversion actions
3. **Test on your site** - conversions should appear in real-time in test mode
4. **Check Google Ads** - live conversions appear within 24-48 hours

## Verification Checklist

- [ ] All 6 conversion actions created in Google Ads
- [ ] Conversion ID and labels copied to `.env.local`
- [ ] Development server restarted (`pnpm dev`)
- [ ] Test conversions firing in browser console
- [ ] Google Tag Assistant shows conversions
- [ ] Test mode conversions appear in Google Ads dashboard
