# **Pony Club Acheron: Final Data-Driven SEO Action Plan**

**Objective:** To execute a precise, data-driven SEO strategy that leverages insights from Google Search Console, DataForSEO, and Google Ads to significantly improve organic rankings, traffic, and conversions.

---

### **Core Insights & Strategy**

*   **GSC Insight:** The site has visibility but low Click-Through Rates (CTR) for key terms.
*   **DataForSEO Insight:** Competitors are winning on high-value commercial keywords and long-tail questions.
*   **Google Ads Insight:** We have a list of keywords with **proven commercial value** that drive conversions.
*   **Overarching Strategy:** Our priority is to align on-page SEO and content with the keywords that have the highest commercial intent, as validated by Google Ads data, and then to capture new traffic by filling the keyword gaps identified by DataForSEO.

---

### **Phase 1: Surgical On-Page Optimization (High-Conversion Keywords)**

This phase focuses on immediate, high-impact changes to existing pages based on our most profitable keywords.

**Task 1.1: Homepage Optimization (`app/[locale]/page.tsx`)**

*   **Action:** Modify the homepage to target top-converting keywords.
*   **Code-Level Instructions:**
    1.  In `app/[locale]/page.tsx`, add the following `generateMetadata` function. This uses language from proven ad campaigns.

        ```typescript
        // In app/[locale]/page.tsx
        export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
          const title = locale === 'el'
            ? "Pony Club Αχέροντας | Rafting, Ιππασία & Kayak - Κάντε Κράτηση"
            : "Pony Club Acheron: Official Rafting, Riding & Kayak Tours - Book Now";
          const description = locale === 'el'
            ? "Οι καλύτερες δραστηριότητες στον Αχέροντα από το 1999. Ασφαλές rafting, ιππασία για αρχάριους και οικογένειες. Δείτε τα πακέτα μας!"
            : "The original Acheron River adventures since 1999. Safe rafting, beginner-friendly horse riding, and family fun. View our packages and book your tour today!";

          return {
            title,
            description,
            alternates: {
              canonical: `/${locale}`,
            },
          };
        }
        ```
    2.  Within the `HomePageContent` component, ensure the main `<h1>` tag is updated to: `The Original Acheron River Adventures: Rafting, Riding & More`.
    3.  Add a new section on the homepage titled "Our Adventure Packages" that prominently features "Package 1" and "Package 2", using language from high-performing ads.

**Task 1.2: Activity Page Optimization (e.g., `app/[locale]/rafting/page.tsx`)**

*   **Action:** Refine each activity page to target its most valuable commercial keywords.
*   **Code-Level Instructions (Example for Rafting):**
    1.  In `app/[locale]/rafting/page.tsx`, add the following `generateMetadata` function:

        ```typescript
        // In app/[locale]/rafting/page.tsx
        export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
          const title = locale === 'el' ? "Rafting Αχέροντας Τιμές | Ασφαλής Κατάβαση για Οικογένειες" : "Acheron River Rafting Prices | Safe Family Rafting Tours";
          const description = locale === 'el' ? "Δείτε τις τιμές για rafting στον Αχέροντα. Προσφέρουμε ασφαλείς καταβάσεις για οικογένειες και αρχάριους. Κλείστε την περιπέτειά σας σήμερα!" : "See our Acheron River rafting prices. We offer safe river descents perfect for families and beginners. Book your adventure today!";

          return {
            title,
            description,
            alternates: {
              canonical: `/${locale}/rafting`,
            },
          };
        }
        ```
    2.  On the page, add a visible section with the heading `<h2>Rafting Prices & Packages</h2>`.
    3.  Add a small FAQ section answering 2-3 questions from the keyword data, e.g., "How long is the rafting trip?", "Is rafting on the Acheron safe for kids?".

*   **Repeat this process for `kayaking`, `riding`, and `trekking`, using their respective top-converting keywords.**

---

### **Phase 2: Strategic Content & Authority Building**

This phase creates new assets to capture untapped keyword opportunities.

**Task 2.1: Create Dedicated Package Landing Pages**

*   **Action:** Create two new, highly-optimized landing pages for your main products.
*   **Instructions:**
    1.  Create the file `app/[locale]/package-1/page.tsx`.
    2.  The page's H1 should be "Package 1: Rafting & Horse Riding Adventure".
    3.  The content should detail everything included in the package, using keywords from the "Rafting & Horse Riding Package" ad group.
    4.  Add a `generateMetadata` function optimized for package-specific keywords.
    5.  Repeat this process for a new `app/[locale]/package-2/page.tsx` file.

**Task 2.2: Create High-Intent Blog Content**

*   **Action:** Write and publish blog posts that target users who are ready to buy.
*   **Instructions:**
    1.  Create a new file at `app/[locale]/blog/family-guide-acheron/page.tsx`.
    2.  **Title:** "A Complete Family Guide to the Acheron River"
    3.  **Content:** This post should answer common questions families have, positioning Pony Club as the ideal choice. It should naturally link to the rafting, riding, and package pages.
    4.  Include a `generateMetadata` function optimized for "family activities acheron", "kids activities glyki", etc.

---

### **Phase 3: Final Data Gathering & Future Strategy**

This phase sets the stage for ongoing success.

**Task 3.1: Conduct Backlink Analysis**

*   **Action:** This is the final critical data-gathering step.
*   **Instructions for Human Analyst:**
    1.  Use the `dataforseo.backlinks_competitors` tool with the target `ponyclub.gr`.
    2.  Use the `dataforseo.backlinks_domain_intersection` tool, comparing `ponyclub.gr` to top competitors like `riverdream.gr`.
    3.  Save the results to `data/dataforseo-backlinks-competitors.json` and `data/dataforseo-backlinks-intersection.json`.
*   **Goal:** To identify high-authority local and travel-related domains that link to competitors but not to Pony Club. This list will be the foundation of a future link-building campaign.

**Task 3.2: Monitor & Iterate**

*   **Action:** After the on-page and content changes are deployed, wait 4-6 weeks.
*   **Instructions for Human Analyst:**
    1.  Re-run the `gsc.search_analytics` query and compare the new results to `data/gsc-search-performance.json`.
    2.  Look for improved rankings and, most importantly, higher CTR for the optimized pages.
    3.  In Google Analytics, track conversions from organic search to measure the true business impact of these changes.
