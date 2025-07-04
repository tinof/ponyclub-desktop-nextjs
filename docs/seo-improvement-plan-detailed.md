### **Data-Driven SEO Improvement Plan: Pony Club Acheron**

**Initial Key Findings:**

1.  **Performance Baseline (GSC):** Your site has existing visibility (`gsc-search-performance.json`), but there's a significant opportunity to improve click-through rates (CTR) for high-impression keywords. Many users are seeing you, but not clicking.
2.  **Indexing Status (GSC):** Your key pages appear to be indexed (`gsc-indexing-status.json`), which is great. Our foundational work will build on this solid base.
3.  **Competitive Landscape (DataForSEO):** The SERP analysis (`*-serp.json`) confirms that competitors like `riverdream.gr` are ranking for high-value commercial keywords.
4.  **The Keyword Gap (DataForSEO):** The gap analysis (`*-keyword-gap-*.json`) reveals that competitors are capturing traffic from dozens of relevant keywords that `ponyclub.gr` currently has no visibility for. This is our biggest area of opportunity.
5.  **New Opportunities (DataForSEO):** The keyword ideas data (`-keyword-ideas-en.json`) provides a rich source of long-tail keywords and user questions that we can target with new content.

---

### **Phase 1: On-Page Optimization & Targeting (Low-Hanging Fruit)**

This phase focuses on optimizing existing pages to immediately capture more traffic from keywords you already have some visibility for.

**Task 1.1: Optimize Homepage Content & Metadata**
*   **Data Insight:** The GSC data shows you rank for your brand name, but we need to strengthen commercial intent.
*   **Action:**
    1.  **Update Homepage Title & H1:** Modify the homepage's main heading (H1 tag) and the `generateMetadata` function in `app/[locale]/page.tsx` to be more direct.
        *   **Proposed Title:** `Pony Club Acheron: Official Rafting, Riding & Kayak Tours`
        *   **Proposed H1:** `The Original Acheron River Adventures: Rafting, Riding & More`
    2.  **Enrich Homepage Content:** Add a short section to the homepage explicitly mentioning the key activities and targeting terms found in the keyword gap analysis (e.g., "family rafting Acheron," "horse riding for beginners Glyki").

**Task 1.2: Optimize Core Activity Pages**
*   **Data Insight:** The keyword gap analysis shows competitors rank for specific terms like "acheron river rafting prices" or "best horse riding glyki". Your activity pages need to target these.
*   **Action (for each activity page like `/rafting`, `/riding`, etc.):**
    1.  **Update Metadata:** Refine the `generateMetadata` function with a primary and secondary keyword focus based on the gap analysis.
    2.  **Enrich Page Content:** Update the text on each page to include variations of the target keywords.
    3.  **Add an FAQ Section:** Add a small "Frequently Asked Questions" section at the bottom of each activity page, answering 2-3 questions directly from the `dataforseo-keyword-ideas-en.json` file (e.g., "How long does the rafting trip take?", "Is horse riding suitable for children?"). This directly targets long-tail search queries.

**Task 1.3: Improve CTR for High-Impression Keywords**
*   **Data Insight:** The `gsc-search-performance.json` file will show queries with high impressions but low CTR.
*   **Action:**
    1.  Identify the top 5 pages corresponding to these low-CTR queries.
    2.  Rewrite the meta descriptions for these pages to be more compelling, include a stronger call-to-action (e.g., "Book Now," "View Packages"), and feature the target keyword prominently.

---

### **Phase 2: New Content Creation & Authority Building**

This phase focuses on creating new content to capture the keyword opportunities identified in the DataForSEO analysis.

**Task 2.1: Create a "Why Choose Us" Section/Page**
*   **Data Insight:** You were established in 1999. This is a major trust signal that competitors don't have.
*   **Action:** Create a prominent section on the homepage or a dedicated "About" page that tells your story. Use keywords like "most experienced Acheron tours," "since 1999," "original Acheron pony club."

**Task 2.2: Develop a Content Calendar**
*   **Data Insight:** The keyword ideas file is full of questions users are asking.
*   **Action:** Create 2-3 blog posts or informational articles based on this data. This will attract users higher up in the marketing funnel.
    *   **Article Idea 1:** "A Family Guide to Acheron River: Top Activities for Kids & Adults"
    *   **Article Idea 2:** "Rafting vs. Kayaking on the Acheron: Which is Right for You?"
    *   **Article Idea 3:** "The History of the Acheron River and the Myths of the Underworld"

---

### **Phase 3: Future Data Gathering & Continuous Refinement**

SEO is an ongoing process. This phase outlines the next steps to keep the momentum going.

**Task 3.1: Fetch Google Ads Data**
*   **Data Missing:** We still need to analyze your Google Ads performance data.
*   **Action (Next Step):** Use the `gads` MCP tool to execute a query that finds your all-time best-performing keywords based on conversions. This will tell us which keywords are most commercially valuable, and we will double down on optimizing for them organically.

**Task 3.2: Conduct Backlink Analysis**
*   **Data Missing:** We haven't analyzed competitor backlinks yet.
*   **Action (Next Step):** Use the `dataforseo.backlinks_competitors` tool to find websites that link to your competitors but not to you. This will provide a target list for future outreach and link-building campaigns to boost your site's authority.

**Task 3.3: Monitor & Iterate**
*   **Action:** After implementing Phases 1 and 2, we must wait 4-6 weeks and then re-run the GSC and DataForSEO queries to measure the impact. We will look for:
    *   Improved rankings for target keywords.
    *   Increased CTR for optimized pages.
    *   New traffic from the blog posts.
