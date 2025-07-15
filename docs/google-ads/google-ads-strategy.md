# Pony Club Acheron: Google Ads Strategy

## 1. Primary Objective & Conversion Goals

The primary objective of the Google Ads campaigns is to drive direct, measurable, and profitable customer actions. All campaigns, ad groups, and keywords will be optimized towards three specific conversion goals:

1.  **Package 1 Booking:** A user clicks the "Book Now" button associated with the "Package 1" offering on the homepage or dedicated package page.
2.  **Package 2 Booking:** A user clicks the "Book Now" button associated with the "Package 2" offering on the homepage or dedicated package page.
3.  **Phone Call Lead:** A user clicks the main phone number link in the website's top menu bar to initiate a call.

'''

# Pony Club Acheron: Google Ads Strategy (Updated July 2025)

## 0. Executive Summary of Changes

This document outlines the live, updated strategy for the Pony Club Acheron Google Ads account. Key strategic shifts from the original plan include:

- **Expanded Ad Group Structure:** Addition of dedicated `Competitors` and `General & Springs` ad groups to capture a wider range of user intent.
- **Data-Driven Keyword Expansion:** Keyword list has been expanded based on competitor gap analysis (DataForSEO) and live Search Term Reports.
- **Refined Bidding Strategy:** A two-phase approach has been implemented, starting with **Maximize Clicks (with a bid cap)** to gather data, before graduating to **Maximize Conversions**. This replaces the obsolete ECPC strategy.
- **Ad Asset Implementation:** A formal strategy for Sitelinks, Callouts, and Structured Snippets has been added to improve ad rank and CTR.
- **Audience Layering:** In-Market and Affinity audiences are now applied in "Observation" mode to gather data and inform automated bidding.

## 1. Primary Objective & Conversion Goals

The primary objective is to drive direct, measurable, and profitable customer actions. All campaigns are optimized towards a set of granular conversion goals which signal high user intent.

**Primary Conversion Actions:**

1.  **Package Bookings:** A user clicks a "Book Now" button for any package. Tracking is source-aware (distinguishing between homepage and package page clicks).
2.  **Phone Call Leads:** A user clicks a `tel:` link to initiate a call. Tracking is device-aware (distinguishing between mobile and desktop clicks).

_(For a detailed breakdown of the specific conversion actions and their setup, see the `google-ads-conversion-setup-guide.md` document.)_

---

## 2. Campaign & Ad Group Structure

The account uses language-based campaigns to consolidate conversion data, allowing Google's AI to learn faster and optimize budget allocation effectively.

### Campaign 1: `GR - Search - Summer 2025`

- **Goal:** Target Greek speakers within Greece for all activity and package intents.
- **Language Targeting:** Greek
- **Location Targeting:** Greece
- **Ad Groups:**
  - **GR - Acheron General & Springs:** (NEW) Captures broad, top-of-funnel searches.
    - **Keywords:** `αχεροντασ`, `πηγεσ αχεροντα`, `αχερων ποταμόσ`
    - **Landing Page:** `/el/packages` or `/el/`
  - **GR - Rafting Acheron:**
    - **Keywords:** `rafting αχεροντασ`, `τιμες rafting αχεροντας`
    - **Landing Page:** `/el/rafting`
  - **GR - Horse Riding Acheron:**
    - **Keywords:** `ιππασία αχέρων`, `ιππασια αχεροντας τιμη`
    - **Landing Page:** `/el/riding`
  - **GR - Kayaking Acheron:**
    - **Keywords:** `kayak acheron`, `καγιακ`, `canoe kayak`
    - **Landing Page:** `/el/kayaking`
  - **GR - Holiday Packages:** High-intent users looking for bundled activities.
    - **Keywords:** `πηγεσ αχεροντα δραστηριοτητεσ`, `αχεροντασ δραστηριοτητεσ`
    - **Landing Page:** `/el/packages`
  - **GR - Brand Pony Club:**
    - **Keywords:** `pony club acheron`, `ponyclub glyki`
    - **Landing Page:** `/el/`
  - **GR - Competitors:** (NEW) Targets users searching for competitors by name.
    - **Keywords:** `riverdream`, `acheron rafting club`
    - **Landing Page:** `/el/`

### Campaign 2: `ENG - Search - Summer 2025`

- **Goal:** Target international tourists searching in English.
- **Language Targeting:** English
- **Location Targeting:** UK, Germany, Netherlands, Italy, USA, France, Austria **AND Greece** (to catch tourists already here).
- **Ad Groups:**
  - **ENG - Rafting Acheron:**
    - **Keywords:** `acheron rafting`, `rafting acheron prices`
    - **Landing Page:** `/rafting`
  - **ENG - Horse Riding Acheron:**
    - **Keywords:** `horse riding acheron`, `acheron river horse riding`
    - **Landing Page:** `/riding`
  - **ENG - Kayaking Acheron:**
    - **Keywords:** `kayak acheron`, `acheron river kayaking`
    - **Landing Page:** `/kayaking`
  - **ENG - Holiday Packages:**
    - **Keywords:** `acheron adventure package`, `acheron river tour`, `acheron springs`
    - **Landing Page:** `/packages`
  - **ENG - Brand Pony Club:**
    - **Keywords:** `pony club acheron`, `ponyclub glyki`
    - **Landing Page:** `/`
  - **ENG - Competitors:**
    - **Keywords:** `riverdream`, `acheron river club`
    - **Landing Page:** `/`

---

## 3. Keyword Targeting Strategy

- **Foundation:** The keyword list is built and continuously expanded from three core sources:
  1.  Historical campaign performance (`gads-performance-keywords.json`).
  2.  Ongoing analysis of the **Search Terms Report** to "mine" for converting queries.
  3.  Competitive gap analysis using the **DataForSEO API** to find keywords competitors rank for.
- **Match Types:**
  - **Phrase & Exact Match:** Used for the majority of core commercial and high-intent terms to maintain tight control and relevance (e.g., `"acheron rafting prices"`, `[things to do in parga]`).
  - **Broad Match:** Used sparingly and strategically only for high-volume, single-word discovery keywords like `καγιακ`, where we want to capture the widest possible range of related searches.
- **Negative Keywords:** A comprehensive negative keyword list is maintained at the campaign level to exclude irrelevant searches. Key categories include:
  - **Geographical:** `corfu`, `zakynthos`, `athens`, etc.
  - **Informational:** `jobs`, `reviews`, `videos`, `map`, `wiki`.
  - **Irrelevant:** `free`, `youtube`, competitor names from other regions.

---

## 4. Ad Copy & Asset Strategy

- **Ad Copy Principles:**
  - **Highlight USPs:** Every ad features unique selling points like **"Since 1999," "Family-Run," "The Original Acheron Club,"** and **"Safety First."**
  - **Strong Call-to-Action (CTA):** Use direct CTAs like **"Book Your Adventure," "View Packages," "Κλείστε την Θέση σας."**
  - **Competitor Conquesting:** Ads in competitor ad groups directly contrast Pony Club's strengths (e.g., "The Original Experts, Not [Competitor Name]") to capture competitor search traffic.
- **Ad Assets (Extensions):**
  - **Sitelinks:** Implemented at the campaign level to direct users to key pages (Packages, Rafting, Horse Riding, Kayaking), increasing ad size and providing more options.
  - **Callouts:** Used to highlight key business benefits that don't fit in headlines (e.g., "Family-Friendly Fun," "Book Online," "Ασφάλεια & Πιστοποίηση").
  - **Structured Snippets:** Used to list the range of services offered (Rafting, Horse Riding, Kayaking, etc.) under the "Service catalog" header.
  - **Call Assets:** Implemented to display the phone number directly in ads, facilitating direct call leads.

---

## 5. Audience & Conversion Tracking

- **Audience Strategy:** Proven high-performing "In-Market" and "Affinity" audiences (e.g., _Travel Buffs_, _Trips to Greece_) are applied to campaigns in **"Observation" mode**. This allows us to gather performance data for these segments without restricting ad delivery, feeding crucial signals to Google's automated bidding strategies.
- **Conversion Tracking:** A granular, component-based tracking system is implemented directly in the Next.js application. This provides highly specific conversion data to Google's AI. For full implementation details, see **`google-ads-conversion-setup-guide.md`**.

---

## 6. Budget, Bidding & Optimization

This campaign employs a modern, two-phase bidding strategy designed for optimal data collection and performance scaling.

- ### Bidding Strategy

  - **Phase 1: Data & Traffic Generation (First ~3-4 Weeks)**

    - **Strategy:** **Maximize Clicks**
    - **Critical Control:** A **Max CPC bid limit** (e.g., €0.75) is set to act as a safety rail, ensuring the budget is spent efficiently across many clicks rather than on a few expensive ones.
    - **Goal:** Gather sufficient click and conversion data to "teach" Google's algorithm what a valuable user looks like.

  - **Phase 2: Performance & Scaling (After 20-30 Conversions/Month)**
    - **Strategy:** **Maximize Conversions**
    - **Goal:** Transition to a fully automated, conversion-focused strategy. The algorithm will use the data from Phase 1 to predict and bid higher on users most likely to convert.
    - **Optional Refinement:** A **Target CPA (Cost Per Acquisition)** can be added later to maintain efficiency as the budget scales.

- ### Optimization Cycle
  - **Weekly:** Review **Search Term Reports** to add new negative keywords and "mine" for new high-performing exact/phrase match keywords.
  - **Monthly:** Analyze performance by **Campaign, Ad Group, and Audience Segment**. Adjust ad group bids and ad copy based on which areas are driving the most cost-effective conversions.
