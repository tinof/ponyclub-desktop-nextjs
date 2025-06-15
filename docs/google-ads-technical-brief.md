Excellent. You've provided a comprehensive and well-structured set of documentation. This gives us a crystal-clear view of your technical stack, SEO strategy, and development workflow.

Based on this, we can now create a highly specific, actionable, and data-driven plan for your AI agent. The goal is to bridge the gap between our high-level Google Ads strategy and the specific code-level changes needed on your website to make that strategy successful.

Here is the plan, written as a set of instructions for your AI agent.

---

### **Subject: Action Plan for SEO & Google Ads Synergy**



**Objective:** To execute targeted codebase improvements that directly support our new "Summer 2025" Google Ads campaigns. Our primary goal is to maximize the Quality Score and conversion rate of our ad traffic by creating the most relevant landing pages for our highest-intent keywords.

This plan integrates insights from our SEO documentation (`seo-master-documentation.md`) and our refined Google Ads strategy.

---

### **Phase 1: Immediate Priority - Optimizing Landing Pages for Core Ad Groups**

Our Google Ads campaign is structured into tightly-themed ad groups. Each ad group needs a perfectly corresponding, highly-optimized landing page. The existing rafting page is our template for success (`83.3%` validation score). We will now replicate this for all other core activities.

**Task 1.1: Optimize the Horse Riding Page**

*   **File to Modify:** `app/[locale]/riding/page.tsx`
*   **Ad Group:** `Horse Riding Acheron`
*   **Instructions:**
    1.  **Replicate Structure:** Use the `app/[locale]/rafting/page.tsx` as a direct template. Copy its layout, component structure (`ActivityPageLayout`, `SEOActivityContent`, `NoScriptFallback`, etc.), and structured data implementation.
    2.  **Update Metadata:** Implement the `generateMetadata` function using keywords from our Ads strategy.

        ```typescript
        // In app/[locale]/riding/page.tsx
        export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
          const title = locale === 'el' 
            ? "Ιππασία Αχέροντας | Βόλτα με Άλογα για Αρχάριους & Οικογένειες" 
            : "Acheron Horse Riding | Beginner & Family Horse Tours";
          const description = locale === 'el' 
            ? "Ζήστε μια μοναδική εμπειρία ιππασίας στις πηγές του Αχέροντα. Ασφαλείς διαδρομές για αρχάριους και παιδιά. Δείτε τιμές και κάντε κράτηση." 
            : "Experience a unique horse riding tour at the Acheron springs. Safe trails for beginners and children. View prices and book your ride.";
          
          return {
            title,
            description,
            keywords: locale === 'el' ? 'ιππασία αχέροντας, άλογα αχέροντας, ιππασία γλυκή' : 'acheron horse riding, horse riding greece, glyki horse tours',
            alternates: { canonical: `/${locale}/riding` },
            openGraph: {
                title,
                description,
                images: [{ url: '/images/riding-og.jpg' }], // Use the existing optimized OG image
            },
            // ... add other necessary metadata
          };
        }
        ```
    3.  **Update Content:**
        *   Modify the `SEOActivityContent` component to display horse-riding-specific details (e.g., "Weight limit: 100kg", "Duration: 45 minutes", "Beginner-friendly horses").
        *   Change the `H1` tag to reflect the page content, e.g., "Unforgettable Horse Riding on the Acheron River".
    4.  **Validate:** Run `node scripts/validate-seo.js` and ensure the `/riding` pages achieve an overall score of at least **85%**.

**Task 1.2 & 1.3: Optimize Kayaking and Trekking Pages**

*   **Files to Modify:** `app/[locale]/kayaking/page.tsx` and `app/[locale]/trekking/page.tsx`
*   **Repeat the exact same process as Task 1.1**, but use the specific keywords, content, and metadata for Kayaking and Trekking as outlined in `seo-master-documentation.md`.

---

### **Phase 2: Critical - Creating High-Conversion "Package" Landing Pages**

Our Google Ads data shows that combined packages are our most valuable offering. The homepage is too general. We need dedicated landing pages to send this high-intent traffic to.

**Task 2.1: Create "Rafting & Riding Package" Landing Page**

*   **Action:** Create a new page dedicated to your most popular package.
*   **Instructions:**
    1.  **Create New File:** `app/[locale]/packages/rafting-riding/page.tsx`.
    2.  **Structure:** Use the `ActivityPageLayout` component for consistency.
    3.  **H1 Tag:** `"Rafting & Horse Riding Adventure Package"`
    4.  **Content:** Clearly detail what's included in the package, the total duration, the price, and the benefits (e.g., "Best value for a full day of adventure!"). Use language from our "Acheron Packages" ad group.
    5.  **Call to Action:** Include the `DynamicBokunWidget` configured for this specific package.
    6.  **Metadata:**

        ```typescript
        // In app/[locale]/packages/rafting-riding/page.tsx
        export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
          const title = locale === 'el' 
            ? "Πακέτο Rafting & Ιππασία στον Αχέροντα | Καλύτερη Τιμή" 
            : "Acheron Rafting & Horse Riding Package | Best Value Deal";
          const description = locale === 'el' 
            ? "Συνδυάστε τις δύο κορυφαίες δραστηριότητες στον Αχέροντα σε ένα πακέτο. Ιδανικό για οικογένειες και παρέες. Κλείστε online στην καλύτερη τιμή." 
            : "Combine the top two Acheron activities in one package. Ideal for families and groups. Book online for the best price.";
          
          return {
            title,
            description,
            // ... add other necessary metadata and a unique OG image for this package
          };
        }
        ```

---

### **Phase 3: Codebase & Performance Enhancements**

Your documentation is excellent. Here are improvements to make the codebase even more robust and performant, which will further improve your Google Ads Quality Score.

**Task 3.1: Refactor SEO Content into a Centralized Data Structure**

*   **Problem:** Currently, the content for `SEOActivityContent` is likely hardcoded within the component or on each page. This is hard to maintain.
*   **Solution:** Create a centralized data store for all SEO and activity content.
*   **Instructions:**
    1.  Create a new directory: `app/data/`.
    2.  Create a file: `app/data/activities.ts`.
    3.  Define a structure and populate it:

        ```typescript
        // In app/data/activities.ts
        export const activitiesData = {
          rafting: {
            en: { title: 'Acheron River Rafting', price: '€15', duration: '1 hour', ... },
            el: { title: 'Rafting Αχέροντας', price: '€15', duration: '1 ώρα', ... }
          },
          riding: {
            en: { title: 'Acheron Horse Riding', price: '€20', duration: '45 mins', ... },
            el: { title: 'Ιππασία Αχέροντας', price: '€20', duration: '45 λεπτά', ... }
          },
          // ... add kayaking and trekking
        };
        ```
    4.  Modify the `SEOActivityContent` component and the `generateMetadata` functions on each page to pull data from this centralized file based on the `activityType` and `locale`. This makes future updates (e.g., price changes) a one-line fix.

**Task 3.2: Enhance the SEO Validation Script**

*   **Problem:** The current script validates pages but doesn't enforce keyword consistency.
*   **Solution:** Improve `scripts/validate-seo.js` to check if the target keywords from your `seo-master-documentation.md` are present in the key meta tags.
*   **Instructions:**
    1.  In `scripts/validate-seo.js`, for each page check:
        *   Read the target keywords for that activity (e.g., for `/en/rafting`, the primary keyword is "Acheron River rafting").
        *   Verify that the primary keyword exists in the `<title>` tag.
        *   Verify that the primary keyword exists in the `<h1>` tag.
        *   Verify that the primary keyword exists in the `<meta name="description">` content.
    2.  Update the validation score to include these checks. This ensures every page is perfectly aligned with our Google Ads targeting.

This action plan provides clear, data-driven, and technically specific instructions. By executing these tasks, you will create a website that is not just SEO-friendly, but is a high-performance conversion engine for your Google Ads campaigns.