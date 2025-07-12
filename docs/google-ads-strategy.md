# Pony Club Acheron: Google Ads Strategy

## 1. Primary Objective & Conversion Goals

The primary objective of the Google Ads campaigns is to drive direct, measurable, and profitable customer actions. All campaigns, ad groups, and keywords will be optimized towards three specific conversion goals:

1.  **Package 1 Booking:** A user clicks the "Book Now" button associated with the "Package 1" offering on the homepage or dedicated package page.
2.  **Package 2 Booking:** A user clicks the "Book Now" button associated with the "Package 2" offering on the homepage or dedicated package page.
3.  **Phone Call Lead:** A user clicks the main phone number link in the website's top menu bar to initiate a call.

---

## 2. Campaign & Ad Group Structure

To ensure budget is allocated effectively and ad copy is highly relevant, the account will be structured as follows:

### Campaign 1: Acheron Core Activities (Search)
- **Goal:** Capture high-intent searches for the specific activities offered.
- **Ad Groups:**
    - **Ad Group: Rafting Acheron**
        - **Keywords:** `acheron rafting`, `rafting glyki`, `family rafting acheron`, `acheron river rafting prices`.
        - **Landing Page:** `/rafting`
    - **Ad Group: Horse Riding Acheron**
        - **Keywords:** `horse riding acheron`, `glyki horse riding`, `beginner horse riding greece`, `acheron horses`.
        - **Landing Page:** `/riding`
    - **Ad Group: Kayaking Acheron**
        - **Keywords:** `kayak acheron`, `acheron river kayaking`, `canoe kayak acheron`.
        - **Landing Page:** `/kayaking`

### Campaign 2: Holiday Packages (Search)
- **Goal:** Target users with a higher commercial intent who are searching for complete holiday packages.
- **Ad Groups:**
    - **Ad Group: Package 1 - Rafting & Riding**
        - **Keywords:** `acheron adventure package`, `rafting and riding holiday greece`, `epirus activity package`.
        - **Landing Page:** `/package-1` (once created)
    - **Ad Group: Package 2 - Full Adventure**
        - **Keywords:** `acheron holiday package`, `greece adventure holiday`, `epirus tour package`.
        - **Landing Page:** `/package-2` (once created)

### Campaign 3: Brand & Competitors (Search)
- **Goal:** Protect brand search terms and capture traffic from users comparing options.
- **Ad Groups:**
    - **Ad Group: Pony Club Brand**
        - **Keywords:** `pony club acheron`, `ponyclub glyki`, `acheron pony club`.
        - **Landing Page:** Homepage
    - **Ad Group: Competitors** (Optional, based on budget)
        - **Keywords:** `riverdream glyki`, `acheron river dream`.
        - **Landing Page:** Homepage

---

## 3. Keyword Targeting Strategy

- **Foundation:** The initial keyword lists will be built from `data/gads-performance-keywords.json`, prioritizing terms with a proven history of conversions.
- **Match Types:**
    - **Phrase Match:** Will be used for core commercial terms (e.g., "acheron rafting") to capture relevant variations.
    - **Exact Match:** Will be used for the highest-performing, top-converting keywords to maximize impression share.
    - **Broad Match:** To be used sparingly in Performance Max campaigns or for keyword discovery, with careful monitoring.
- **Negative Keywords:** A comprehensive negative keyword list will be maintained to exclude irrelevant searches (e.g., `free`, `jobs`, `reviews`, `videos`).

---

## 4. Ad Copy & Landing Page Alignment

- **Ad Copy Principles:**
    - **Highlight USPs:** Every ad should feature unique selling points like "Since 1999," "Family-Friendly," "Official & Safe."
    - **Strong Call-to-Action (CTA):** Use direct CTAs like "Book Your Adventure," "View Packages," "Call for Info."
    - **Keyword Relevance:** The ad headline and description must be highly relevant to the keywords in the ad group.
- **Landing Pages:**
    - Ads must direct users to the most specific and relevant page. An ad for "rafting prices" must go to the rafting page, not the homepage.
    - The new, dedicated package pages (`/package-1`, `/package-2`) will be the primary landing pages for package-related ads.

---

## 5. Conversion Tracking Implementation

Accurate tracking is non-negotiable for success. This requires a robust setup using Google Tag Manager (GTM) and Google Analytics 4 (GA4).

- **Step 1: Create GA4 Events:**
    - `click_book_package_1`
    - `click_book_package_2`
    - `click_phone_number`
- **Step 2: Configure GTM Triggers:**
    - **Trigger 1 (Package 1):** Fires on a click event where the Click Element matches the CSS selector for the "Book Now" button of Package 1.
    - **Trigger 2 (Package 2):** Fires on a click event where the Click Element matches the CSS selector for the "Book Now" button of Package 2.
    - **Trigger 3 (Phone Call):** Fires on a click event where the Click URL starts with `tel:`.
- **Step 3: Configure GTM Tags:**
    - Create three separate GA4 Event Tags, one for each of the events above, linking them to their respective triggers.
- **Step 4: Import to Google Ads:**
    - In the Google Ads interface, import the three GA4 events as primary conversion actions.

---

## 6. Budget, Bidding & Optimization

- **Bidding Strategy:**
    - **Initial Phase:** Start with "Maximize Clicks" to gather data.
    - **Primary Phase:** Swiftly move to a conversion-focused bidding strategy like **"Maximize Conversions"** or **"Target CPA"** (Cost Per Acquisition) once sufficient conversion data is available (approx. 15-20 conversions per month).
- **Budget Allocation:**
    - Allocate the majority of the budget to the "Acheron Core Activities" and "Holiday Packages" campaigns, as they target the highest-intent users.
- **Optimization Cycle:**
    - **Weekly:** Review search term reports to add new keywords and negative keywords. Pause underperforming keywords or ads.
    - **Monthly:** Analyze performance by campaign, ad group, and device. Adjust budgets based on which campaigns are driving the most cost-effective conversions.
