# Google Ads Conversion Tracking Setup

## Current Status

- ✅ Code updated to use environment variables
- ⚠️ **Action Required**: Configure actual Google Ads conversion values

## How to Fix the Conversion ID/Label Problem

### Step 1: Get Your Google Ads Conversion Details

1. **Login to Google Ads** at [ads.google.com](https://ads.google.com)
2. **Navigate to Conversions**:
   - Click "Tools & Settings" (wrench icon)
   - Under "Measurement" section, click "Conversions"
3. **Find or Create a Conversion Action**:
   - Look for existing "Book Now" or "Purchase" conversion
   - Or click "+" to create a new conversion action
   - Choose "Website" as the conversion source
   - Set up conversion details (name, value, category, etc.)
4. **Get the Conversion Tag**:
   - Click on your conversion action
   - Click "Tag setup"
   - Choose "Use Google Tag Manager" or "Install the tag yourself"
   - Copy the conversion ID and label from the code snippet

### Step 2: Extract the Values

From your Google Ads conversion code, you'll see something like:

```javascript
gtag('event', 'conversion', { send_to: 'AW-123456789/AbCdEfGhIj' })
```

Extract:

- **Conversion ID**: `AW-123456789` (the part before the slash)
- **Conversion Label**: `AbCdEfGhIj` (the part after the slash)

### Step 3: Configure Environment Variables

1. **Create `.env.local` file** in your project root (if it doesn't exist):

```bash
cp .env.local.example .env.local
```

2. **Update the values** in `.env.local`:

```env
# Replace with your actual values
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-123456789
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=AbCdEfGhIj
```

### Step 4: Restart Development Server

After updating environment variables:

```bash
npm run dev
```

## Verification

### Check Implementation

The updated `BookingButton.tsx` now:

- ✅ Uses environment variables instead of hardcoded placeholders
- ✅ Shows warning in console if conversion tracking not configured
- ✅ Only fires conversion events when properly configured

### Test the Setup

1. **Open browser console** when testing booking buttons
2. **Look for tracking events** in Network tab (filter by "collect" or
   "google-analytics")
3. **Check Google Ads** for conversion data (may take 24-48 hours to appear)

### Console Messages

- **Success**: No warnings about conversion tracking
- **Not Configured**: Warning message about missing environment variables
- **GDPR**: Events only fire when user has given analytics consent

## Troubleshooting

### Common Issues

#### Environment Variables Not Loading

- Ensure `.env.local` is in project root
- Variable names must start with `NEXT_PUBLIC_`
- Restart development server after changes

#### Conversions Not Showing in Google Ads

- Check that conversion action is enabled
- Verify the conversion ID/label are correct
- Test with Google Tag Assistant browser extension
- Allow 24-48 hours for data to appear

#### GDPR Blocking Events

- Ensure user has accepted analytics cookies
- Check browser console for consent status
- Test with different consent scenarios

## Security Notes

### Environment Variables

- `.env.local` is automatically ignored by Git
- `NEXT_PUBLIC_` variables are safe for client-side use
- Never commit actual conversion IDs to version control

### Best Practices

- Use different conversion actions for different packages if needed
- Set appropriate conversion values for ROI tracking
- Test in staging environment before production deployment

## Package-Specific Configuration

Currently both packages use the same conversion action. If you want separate
tracking:

1. **Create separate conversion actions** in Google Ads
2. **Update BookingButton component** to accept conversion details as props
3. **Pass different values** for each package in the homepage

Example enhancement:

```tsx
<BookingButton
  // ...existing props
  conversionId='AW-123456789'
  conversionLabel='Package1Label'
/>
```

This would require updating the `BookingButton` interface and implementation.

---

**Next Steps**:

1. Get your Google Ads conversion details
2. Update `.env.local` with actual values
3. Test the implementation
4. Monitor conversion data in Google Ads
