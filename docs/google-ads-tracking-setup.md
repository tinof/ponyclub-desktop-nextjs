# Google Ads Conversion Tracking Setup

This document explains how to configure Google Ads conversion tracking for the "Book Now" buttons on the Pony Club website.

## Current Implementation

The BookingButton component (`components/client/BookingButton.tsx`) includes comprehensive tracking that fires when users click "Book Now" buttons. This includes:

1. **Google Analytics 4 Events**
2. **Enhanced Ecommerce Tracking**
3. **Google Ads Conversion Tracking**
4. **Vercel Analytics**
5. **Facebook Pixel** (if configured)

## Setting Up Google Ads Conversion Tracking

### Step 1: Create Conversion Actions in Google Ads

1. Log into your Google Ads account
2. Go to **Tools & Settings** > **Conversions**
3. Click the **+** button to create a new conversion action
4. Choose **Website** as the conversion source
5. Set up conversion details:
   - **Conversion name**: "Book Now Click" or "Booking Initiated"
   - **Category**: "Purchase" or "Lead"
   - **Value**: Use different values for each package or set to "Don't use a value"
   - **Count**: "One" (recommended for booking buttons)
   - **Attribution model**: Choose based on your business needs

### Step 2: Get Your Conversion ID and Labels

After creating the conversion action, Google Ads will provide:
- **Conversion ID**: Format `AW-XXXXXXXXXX`
- **Conversion Label**: A unique string for this conversion action

### Step 3: Update the Code

Replace the placeholder in `components/client/BookingButton.tsx`:

```typescript
// Current placeholder (line 85):
send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL'

// Replace with your actual values:
send_to: 'AW-1234567890/AbCdEfGhIj_KlMnOpQr'
```

### Step 4: Test the Implementation

1. Deploy your changes
2. Use Google Tag Assistant or Google Ads conversion tracking test
3. Click the "Book Now" buttons and verify events are firing
4. Check Google Ads for conversion data (may take 24-48 hours to appear)

## Tracking Events Fired

When a user clicks a "Book Now" button, the following events are tracked:

### Google Analytics 4
- **Event**: `book_now_click`
- **Parameters**: package name, price, button ID, page location
- **Event**: `begin_checkout` (Enhanced Ecommerce)

### Google Ads
- **Event**: `conversion`
- **Value**: Package price in EUR
- **Transaction ID**: Unique identifier for deduplication

## GDPR Compliance

The tracking implementation is designed to be GDPR-compliant:
- Events only fire if tracking scripts are loaded (user consent)
- No personal data is collected
- All tracking is anonymous and aggregated
- Users can opt out through browser settings or cookie consent tools

## Package-Specific Tracking

Each "Book Now" button includes specific tracking parameters:

### Package 1 (Rafting + Riding + Hiking)
- **Tracking Label**: "Homepage Package 1"
- **Package Name**: "Package 1 - Rafting + Riding + Hiking"
- **Price**: €20

### Package 2 (Kayak + Riding + Hiking)
- **Tracking Label**: "Homepage Package 2"
- **Package Name**: "Package 2 - Kayak + Riding + Hiking"
- **Price**: €25

## Monitoring and Optimization

### Key Metrics to Track
1. **Click-through Rate**: Percentage of visitors who click "Book Now"
2. **Conversion Rate**: Percentage of clicks that result in actual bookings
3. **Cost per Conversion**: Google Ads spend divided by conversions
4. **Return on Ad Spend (ROAS)**: Revenue divided by ad spend

### Recommended Google Ads Optimizations
1. Use conversion data for Smart Bidding strategies
2. Create audiences based on users who clicked "Book Now"
3. Optimize ad copy based on which packages get more clicks
4. Use conversion data for campaign budget allocation

## Troubleshooting

### Common Issues
1. **Conversions not showing**: Check conversion ID/label, verify gtag is loaded
2. **Duplicate conversions**: Ensure transaction IDs are unique
3. **Low conversion volume**: May need to lower conversion requirements or check tracking

### Debug Mode
The implementation includes console logging for debugging:
```javascript
console.log(`[Booking Tracking] ${trackingLabel} clicked - Package: ${packageName}, Price: €${numericPrice}`);
```

Check browser console to verify events are firing correctly.
