# Migration Guide: From gtag.js to Google Tag Manager (GTM)

## 1. Overview & Benefits

This guide outlines the process of migrating the Pony Club website's analytics from a direct `gtag.js` implementation to a comprehensive Google Tag Manager (GTM) setup.

**Current Setup:** Uses `@next/third-parties` to load `gtag.js` directly. Events are pushed from the application code using custom helper functions.

**Target Setup:** Uses `@next/third-parties` to load the GTM container. The application code pushes generic events to the `dataLayer`, and all marketing/analytics tags are managed within the GTM interface.

### Key Benefits for a Solo Developer/Marketer:

-   **Workflow Efficiency:** Stop editing, testing, and deploying the application for simple tracking changes. Manage tags for Google Ads, Analytics, Facebook Pixel, etc., directly from the GTM web interface.
-   **Code Simplification:** Remove analytics-specific logic (like conversion labels) from components, leading to a cleaner, more maintainable codebase.
-   **Superior Debugging:** Utilize GTM's powerful Preview Mode to see exactly which tags are firing and why, without `console.log` statements.
-   **Future-Proofing:** Easily integrate new marketing and analytics tools in the future (e.g., Hotjar, LinkedIn Ads) by adding new tags in GTM, with no code changes required.

---

## 2. Prerequisites

Before starting the migration, you must complete the following in your Google accounts:

1.  **Create a GTM Account and Container:**
    *   Go to [tagmanager.google.com](https://tagmanager.google.com/).
    *   Create a new account for `ponyclub.gr`.
    *   Create a new **Web** container for the site.
    *   You will be given a GTM Container ID, which looks like `GTM-XXXXXXX`.

2.  **Prepare Environment Variables:**
    *   Open the `.env.local` file in the project root.
    *   Add your new GTM ID:
        ```bash
        # Google Tag Manager Configuration
        NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
        ```
    *   You can now safely **remove** all the Google Ads conversion label variables (`NEXT_PUBLIC_ADS_LABEL_*`), as this logic will move into GTM. The `NEXT_PUBLIC_GA_ID` can also be removed if you plan to manage the GA4 tag entirely through GTM (which is recommended).

---

## 3. Technical Migration Steps (The Code Changes)

These are the one-time code changes required to install GTM.

### Step 3.1: Switch the Core Analytics Component

-   **File to Edit:** `app/[locale]/layout.tsx`
-   **Action:** Replace the `<GoogleAnalytics>` component with the `<GoogleTagManager>` component.

    ```typescript
    // ------- SEARCH
    import { GoogleAnalytics } from "@next/third-parties/google";
    // ...
    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    // =======
    import { GoogleTagManager } from "@next/third-parties/google";
    // ...
    <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
    // +++++++ REPLACE
    ```

### Step 3.2: Refactor the Central Analytics Helper

-   **File to Edit:** `lib/analytics.ts`
-   **Action:** Rewrite the event tracking functions to use `sendGTMEvent`, which pushes to the `dataLayer`.

    ```typescript
    // ------- SEARCH
    // This entire file needs to be refactored.
    // The old implementation uses window.gtag directly.
    // =======
    "use client";

    import { sendGTMEvent } from "@next/third-parties/google";

    // Generic GTM Event Function
    export const trackGTMEvent = (eventData: Record<string, unknown>) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[GTM]", eventData);
      }
      sendGTMEvent(eventData);
    };

    // Specific Event for Booking Button Clicks
    interface BookingClickProps {
      packageName: string;
      packagePrice: string | number;
      sourcePage: string;
    }
    export const trackBookingClick = ({
      packageName,
      packagePrice,
      sourcePage,
    }: BookingClickProps) => {
      trackGTMEvent({
        event: "booking_click",
        package_name: packageName,
        value: packagePrice,
        currency: "EUR",
        source_page: sourcePage,
      });
    };

    // Specific Event for Phone Link Clicks
    interface PhoneClickProps {
      phoneNumber: string;
      device: "mobile" | "desktop";
    }
    export const trackPhoneClick = ({ phoneNumber, device }: PhoneClickProps) => {
      trackGTMEvent({
        event: "phone_click",
        phone_number: phoneNumber,
        device_type: device,
      });
    };
    // +++++++ REPLACE
    ```

### Step 3.3: Update Event-Triggering Components

-   **Files to Edit:** `components/client/BookingButton.tsx`, `components/client/PhoneLink.tsx`, etc.
-   **Action:** Update these components to call the new GTM-based tracking functions from `lib/analytics.ts`.

    **Example for `BookingButton.tsx`:**
    ```typescript
    // ------- SEARCH
    // Old tracking function call
    // =======
    // New tracking function call
    import { trackBookingClick } from "@/lib/analytics";

    // Inside the onClick handler:
    trackBookingClick({
      packageName: props.packageName,
      packagePrice: props.packagePrice,
      sourcePage: props.sourcePage,
    });
    // +++++++ REPLACE
    ```

---

## 4. GTM Container Configuration (The "No-Code" Part)

After the code is deployed, you will manage all tracking from the GTM website.

### Step 4.1: Set Up GA4 Configuration

1.  **Create a Variable:** In GTM, go to `Variables` -> `User-Defined Variables` -> `New`.
    *   **Type:** `Google Tag: Configuration Settings`
    *   **Parameter:** `measurement_id`
    *   **Value:** Your GA4 ID (`G-6J3ELVNTQE`)
    *   **Name it:** `GA4 Measurement ID`

2.  **Create the GA4 Config Tag:** Go to `Tags` -> `New`.
    *   **Type:** `Google Tag`
    *   **Tag ID:** Your GA4 ID (`G-6J3ELVNTQE`)
    *   **Configuration Settings Variable:** Select the `{{GA4 Measurement ID}}` variable you just created.
    *   **Triggering:** Set it to fire on `Initialization - All Pages`.
    *   **Name it:** `GA4 - Configuration`

### Step 4.2: Set Up Event Tracking (Example: Booking Click)

1.  **Create a Trigger:** Go to `Triggers` -> `New`.
    *   **Type:** `Custom Event`
    *   **Event Name:** `booking_click`
    *   **Fires on:** All Custom Events
    *   **Name it:** `Event - booking_click`

2.  **Create a GA4 Event Tag:** Go to `Tags` -> `New`.
    *   **Type:** `Google Analytics: GA4 Event`
    *   **Measurement ID:** Your GA4 ID (`G-6J3ELVNTQE`)
    *   **Event Name:** `booking_click` (This can be the same or different from the trigger name)
    *   **Triggering:** Select the `Event - booking_click` trigger.
    *   **Name it:** `GA4 - Event - Booking Click`

3.  **Create a Google Ads Conversion Tag:** Go to `Tags` -> `New`.
    *   **Type:** `Google Ads Conversion Tracking`
    *   **Conversion ID:** Your Google Ads Conversion ID (`AW-XXXXXXXXXX`)
    *   **Conversion Label:** The specific label for this booking action.
    *   **Triggering:** Select the `Event - booking_click` trigger.
    *   **Name it:** `Ads - Conversion - Booking Click`

### Step 4.3: Test and Publish

1.  **Enter Preview Mode:** Click the "Preview" button in GTM. This will open your website in a new tab with the GTM debugger panel.
2.  **Test:** Click the buttons and perform the actions you want to track. Watch the debugger panel to see your custom events fire and confirm that the correct GA4 and Ads tags are triggered.
3.  **Publish:** Once you've confirmed everything works, go back to the GTM interface and click "Submit" to publish your container changes live.

This migration provides a robust, scalable, and efficient foundation for all future analytics and marketing efforts.
