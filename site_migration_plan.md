# Website Migration Plan: WordPress to Vercel (Same Domain: www.ponyclub.gr)

This document outlines the essential steps to ensure a smooth transition from the old WordPress site to the new Vercel-hosted Next.js application, while maintaining the `www.ponyclub.gr` domain and optimizing for search engine ranking.

## I. Pre-Migration & Configuration (Critical)

1.  **Verify Ownership in Google Search Console (GSC)**
    *   **Status:** Completed (`sc-domain:ponyclub.gr` is verified).
    *   **Action:** No further action needed for verification.

2.  **Implement 301 Redirects (Highest Priority)**
    *   **Why:** Permanently redirect all old WordPress URLs to their corresponding new URLs on the Vercel app. This is crucial for transferring link equity (ranking power) and ensuring a good user experience.
    *   **How:**
        *   Create a comprehensive list of all old WordPress URLs and their new equivalents.
        *   Implement these redirects in your Next.js application or via Vercel's `vercel.json` configuration.
        *   Example for `next.config.js`:
            ```javascript
            module.exports = {
              async redirects() {
                return [
                  {
                    source: '/old-blog-post/:slug',
                    destination: '/blog/:slug', // Or your new blog path
                    permanent: true,
                  },
                  // ... more redirects
                ];
              },
            };
            ```
    *   **Responsibility:** User to implement in the Vercel project.

3.  **Create and Validate an Updated Sitemap (`sitemap.xml`)**
    *   **Why:** Helps Google discover all pages on your new site.
    *   **Current Concern:** The existing sitemap (`https://ponyclub.gr/sitemap.xml`) showed 0 URLs indexed out of 7 submitted.
    *   **Action:**
        *   **Generate a new sitemap:** Ensure your Vercel/Next.js app generates an accurate `sitemap.xml` listing all *new*, crawlable, 200-status pages. Libraries like `next-sitemap` can be used, or leverage built-in Next.js sitemap generation features.
        *   **Validate:** Check the sitemap for correct formatting and valid URLs.
        *   **Submit to GSC:** Once correct, submit it via Google Search Console.
    *   **Responsibility:** User to generate/update; AI can assist with GSC submission if the URL is provided.

4.  **Review and Update `robots.txt`**
    *   **Why:** Instructs search engine crawlers on which parts of your site to crawl or ignore.
    *   **Action:**
        *   Ensure your new `robots.txt` on Vercel is correctly configured.
        *   It should allow crawling of all important content and disallow any development paths, admin areas, or sensitive information.
        *   Ensure it's not accidentally blocking main content.
    *   **Responsibility:** User to implement in the Vercel project.

## II. Technical SEO & Monitoring (Post-Launch)

5.  **Monitor Indexing Status**
    *   **Why:** Verify that Google is finding and indexing your new pages.
    *   **How:**
        *   Use the "URL Inspection" tool in GSC for key pages.
        *   Monitor the "Coverage" report in GSC.
    *   **Responsibility:** User to monitor in GSC; AI can perform individual URL checks.

6.  **Check for Crawl Errors**
    *   **Why:** Identify and fix issues like broken links (404s) or server errors.
    *   **How:** Regularly check the "Coverage" report in GSC.
    *   **Responsibility:** User to monitor and fix.

7.  **Update Internal Links**
    *   **Why:** Ensure all links within your new website point to the correct new URLs.
    *   **How:** Audit content and templates on the new Vercel site.
    *   **Responsibility:** User to implement.

8.  **Update Important External Links (Where Possible)**
    *   **Action:** If you control links from social media, business directories, or partner sites, update them to point to the new URLs.
    *   **Responsibility:** User (manual step).

9.  **Monitor Search Traffic and Rankings**
    *   **How:**
        *   Use the Performance report in GSC.
        *   Use any other analytics tools (e.g., Google Analytics).
    *   **Responsibility:** User to monitor; AI can fetch GSC performance data.

## III. Performance & User Experience

10. **Address Lighthouse Performance Issues**
    *   **Current Scores (Mobile):**
        *   Performance: 43/100
        *   Accessibility: 93/100
        *   Best Practices: 75/100
        *   SEO: 100/100
    *   **Key Areas for Improvement:**
        *   **Largest Contentful Paint (LCP):** 5.3s (Target: < 2.5s)
        *   **Cumulative Layout Shift (CLS):** 0.802 (Target: < 0.1) - *Very high, needs urgent attention.*
        *   **Time to Interactive (TTI):** 19.6s (Target: < 3.8s) - *Very high.*
        *   **Speed Index:** 9.1s (Target: < 3.4s)
    *   **Recommendations:**
        *   **Optimize Images:** Compress, use modern formats (WebP), ensure `width` and `height` attributes.
        *   **Reduce CLS:** Identify and fix elements causing layout shifts (images without dimensions, ads, embeds, dynamically injected content).
        *   **JavaScript Optimization:** Reduce JS execution time, minimize main-thread work, code splitting.
        *   Utilize Vercel's caching and edge network capabilities.
    *   **Responsibility:** User to implement code and configuration changes.

11. **Ensure Mobile-Friendliness**
    *   **Status:** GSC `index_inspect` showed "VERDICT_UNSPECIFIED". Lighthouse accessibility is good (93/100).
    *   **Action:** Continue to test on various mobile devices. Ensure responsive design is working correctly.
    *   **Responsibility:** User.

## IV. Content & Advanced SEO

12. **Check Structured Data (Schema Markup)**
    *   **Action:** If your WordPress site used structured data, ensure it's correctly implemented on the new Vercel site. Validate using GSC or other schema testing tools.
    *   **Responsibility:** User.

13. **Content Parity**
    *   **Action:** Ensure all valuable content from the old WordPress site has been migrated or has an equivalent on the new site. Do not lose important informational pages.
    *   **Responsibility:** User.

## V. Tools & GSC Actions Available via AI

The AI assistant can help with the following GSC-related tasks:

*   `mcp_gsc_list_sites`: List verified sites.
*   `mcp_gsc_search_analytics`: Fetch performance data (clicks, impressions, CTR, position for queries/pages).
*   `mcp_gsc_index_inspect`: Check the indexing status of a specific URL.
*   `mcp_gsc_list_sitemaps`: List submitted sitemaps.
*   `mcp_gsc_get_sitemap`: Get details of a specific sitemap.
*   `mcp_gsc_submit_sitemap`: Submit a new or updated sitemap (requires URL).
*   `mcp_lighthouse_run_audit`: Run Lighthouse audits for performance, accessibility, etc.

## Timeline & Review

*   **Immediate:** Focus on 301 redirects and sitemap generation/validation.
*   **Post-Launch (First Week):** Monitor GSC for crawl errors, indexing status. Address critical performance issues (CLS, TTI, LCP).
*   **Ongoing:** Regularly review GSC data, performance metrics, and rankings.

This plan should be revisited as tasks are completed and new data becomes available. 