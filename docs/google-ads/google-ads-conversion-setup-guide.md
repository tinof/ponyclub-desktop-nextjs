# Google Ads Conversion Actions Setup Guide

## 1. Strategic Purpose

This guide outlines a granular conversion tracking setup for the Pony Club Acheron Next.js website. The strategy is to create distinct conversion actions for each high-value user interaction. This provides the Google Ads automated bidding algorithm with precise data, allowing it to differentiate between high and low-intent clicks and optimize bids more effectively.

**Key Principles:**

- **Source Awareness:** Differentiate between a booking made from the homepage versus a dedicated package page.
- **Device Awareness:** Differentiate between a phone call made from a mobile device versus a desktop.
- **Primary vs. Secondary Actions:** All actions defined here are direct revenue-drivers or lead generators and should be set as **Primary conversion actions** in Google Ads to be used for bidding optimization.

## 2. Required Conversion Actions

Create these 6 conversion actions in your Google Ads account:

### 1. Package 1 Booking - Homepage

- **Name:** "Package 1 Booking - Homepage"
- **Category:** Purchase
- **Value:** Use different values for each conversion (e.g., based on package price)
- **Count:** One
- **Goal Type:** Primary

### 2. Package 1 Booking - Package Page

- **Name:** "Package 1 Booking - Package Page"
- **Category:** Purchase
- **Value:** Use different values for each conversion
- **Count:** One
- **Goal Type:** Primary

### 3. Package 2 Booking - Homepage

- **Name:** "Package 2 Booking - Homepage"
- **Category:** Purchase
- **Value:** Use different values for each conversion
- **Count:** One
- **Goal Type:** Primary

### 4. Package 2 Booking - Package Page

- **Name:** "Package 2 Booking - Package Page"
- **Category:** Purchase
- **Value:** Use different values for each conversion
- **Count:** One
- **Goal Type:** Primary

### 5. Phone Click - Mobile

- **Name:** "Phone Click - Mobile"
- **Category:** Phone call lead
- **Value:** Assign a nominal value for lead scoring (e.g., €1) or leave as 0.
- **Count:** One
- **Goal Type:** Primary

### 6. Phone Click - Desktop

- **Name:** "Phone Click - Desktop"
- **Category:** Phone call lead
- **Value:** Assign a nominal value for lead scoring (e.g., €1) or leave as 0.
- **Count:** One
- **Goal Type:** Primary

## 3. Implementation in Next.js

### After Creating Each Action

Google Ads will provide:

- **Conversion ID:** Format `AW-XXXXXXXXXX` (this will be the same for all actions in the account).
- **Conversion Label:** A unique string for each of the 6 actions created above.

### Update Environment Variables

Once you have the ID and labels, update your `.env.local` file. This allows the Next.js components (`<BookingButton />`, `<PhoneLink />`) to dynamically fire the correct conversion event.

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
```
