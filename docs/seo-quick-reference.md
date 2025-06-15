# SEO Quick Reference Guide for AI Agents

> **📖 For comprehensive documentation, see [seo-master-documentation.md](./seo-master-documentation.md)**

## 🚀 Quick Start for AI Agents

### Current Status
- ✅ **Rafting page**: Fully optimized (83.3% score)
- 🔄 **Other activities**: Need optimization (riding, kayaking, trekking)

### Priority Tasks
1. **Apply rafting optimizations to other activity pages**
2. **Run validation after each optimization**
3. **Monitor performance and search rankings**

## 🛠️ Essential Commands

### SEO Validation
```bash
# Validate all pages
node scripts/validate-seo.js

# Test production
BASE_URL=https://ponyclub.gr node scripts/validate-seo.js
```

### Quick Tests
```bash
# Check meta tags
curl -s http://localhost:3000/en/rafting | grep -i "<meta"

# Verify structured data
curl -s http://localhost:3000/en/rafting | grep -o '"@type":"[^"]*"'

# Test mobile
curl -A "iPhone" http://localhost:3000/en/rafting
```

## 📋 Optimization Checklist

### For Each Activity Page:
- [ ] Enhanced metadata with target keywords
- [ ] Proper H1 tag and heading hierarchy
- [ ] Server-side SEO content (`SEOActivityContent`)
- [ ] Comprehensive noscript fallback (`NoScriptFallback`)
- [ ] Breadcrumb navigation
- [ ] Related activities internal linking
- [ ] Structured data (Activity, FAQ, Breadcrumb)
- [ ] Performance optimizations
- [ ] Validation score > 80%

## 🎯 Target Keywords by Activity

| Activity | Primary Keywords | Greek Keywords |
|----------|------------------|----------------|
| **Rafting** | "Acheron River rafting", "family rafting Greece" | "ράφτινγκ Αχέροντας", "οικογενειακό rafting" |
| **Riding** | "Acheron horse riding", "horseback riding Greece" | "ιππασία Αχέροντας", "οικογενειακή ιππασία" |
| **Kayaking** | "Acheron River kayaking", "kayaking Greece" | "καγιάκ Αχέροντας", "οικογενειακό καγιάκ" |
| **Trekking** | "Acheron canyon trekking", "hiking Greece" | "πεζοπορία Αχέροντας", "οικογενειακή πεζοπορία" |

## 🔧 Key Components

### Essential Imports
```typescript
import ActivityPageLayout from '@/components/ActivityPageLayout';
import SEOActivityContent from '@/components/SEOActivityContent';
import NoScriptFallback from '@/components/NoScriptFallback';
import RelatedActivities from '@/components/RelatedActivities';
import { generateActivityStructuredData, generateBreadcrumbStructuredData, generateFAQStructuredData } from '@/lib/structured-data';
```

### Metadata Template
```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'el' ? 'Greek Title with Keywords' : 'English Title with Keywords',
    description: locale === 'el' ? 'Greek Description' : 'English Description',
    keywords: 'activity,keywords,here',
    alternates: {
      canonical: `https://ponyclub.gr/${locale}/activity`,
      languages: { en: '/en/activity', el: '/el/activity' }
    },
    openGraph: { /* ... */ },
    twitter: { /* ... */ },
    robots: { index: true, follow: true, /* ... */ }
  };
}
```

### Page Structure Template
```typescript
const ActivityPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const isGreek = locale === 'el';
  
  // Structured data
  const structuredData = generateActivityStructuredData('activity', locale);
  const breadcrumbData = generateBreadcrumbStructuredData(breadcrumbs, currentPage);
  const faqData = generateFAQStructuredData(faqs, pageUrl);
  
  // Hybrid content
  const hybridContent = (
    <div className="space-y-8">
      <SEOActivityContent activityType="activity" locale={locale} />
      <DynamicBokunWidget experienceId={bokunId} />
      <NoScriptFallback activityType="activity" locale={locale} />
    </div>
  );
  
  return (
    <>
      <StructuredData data={[structuredData, breadcrumbData, faqData]} />
      <ActivityPageLayout
        title="Activity Title"
        subtitle="Activity Subtitle"
        descriptionTitle="Activity Description"
        descriptionContent={activityDescription}
        pricingTitle="Prices & Booking"
        pricingContent={hybridContent}
        detailsTitle="Details & FAQ"
        detailsContent={faqContent}
        breadcrumbs={breadcrumbItems}
      />
      <RelatedActivities currentActivity="activity" locale={locale} />
    </>
  );
};
```

## 📊 Validation Targets

### Minimum Scores
- **Meta Tags**: 100% (7/7)
- **Content Accessibility**: 100% (5/5)
- **Performance**: 100% (4/4)
- **Structured Data**: 80%+ (5/6+)
- **Overall**: 85%+

### Google Tools
- **Rich Results Test**: No errors
- **Mobile-Friendly Test**: Pass
- **PageSpeed Insights**: All Core Web Vitals green

## 🚨 Common Issues & Quick Fixes

### Meta Tags Missing
```typescript
// Ensure proper async/await
const { locale } = await params; // ✅ Correct
const { locale } = params; // ❌ Wrong
```

### H2 Tags Not Detected
```typescript
// Ensure titles are provided to ActivityPageLayout
descriptionTitle="Activity Description" // ✅ Creates H2
descriptionTitle="" // ❌ No H2 created
```

### Structured Data Errors
```typescript
// Validate required properties
const structuredData = generateActivityStructuredData('rafting', locale); // ✅
const structuredData = generateActivityStructuredData('invalid', locale); // ❌
```

### Performance Issues
```typescript
// Use optimized components
<DynamicBokunWidget experienceId={id} /> // ✅ Lazy loaded
<BokunWidget experienceId={id} /> // ❌ Blocks rendering
```

## 📈 Success Metrics

### Immediate (After Implementation)
- Validation score > 80%
- All meta tags present
- Server-side content accessible
- No console errors

### Short-term (1-2 weeks)
- Google Search Console shows improved crawling
- Rich Results Test passes
- PageSpeed Insights scores improve

### Long-term (1-3 months)
- Improved search rankings
- Higher Google Ads Quality Scores
- Increased organic traffic

## 🔄 Next Steps for AI Agents

1. **Choose next activity page** (riding, kayaking, or trekking)
2. **Copy rafting page structure** and adapt content
3. **Update SEOActivityContent** with activity-specific data
4. **Run validation** and achieve 80%+ score
5. **Test with Google tools**
6. **Document any issues** in master documentation
7. **Repeat for remaining pages**

## 📞 Need Help?

- **Full Documentation**: [seo-master-documentation.md](./seo-master-documentation.md)
- **Validation Script**: `scripts/validate-seo.js`
- **Test Commands**: See "Essential Commands" section above
- **Component Reference**: Check `components/` directory

## 📊 **Monitoring Quick Reference**

### **Key Metrics to Track**
- **Organic Traffic**: Target 25-35% increase in 3 months
- **CTR**: Target 10-15% improvement on optimized pages
- **Rankings**: Target top 5 for primary keywords
- **Conversions**: Target 20-30% improvement

### **Validation Commands**
```bash
# Weekly SEO health check
node scripts/validate-seo.js

# Check social media images
curl -I https://ponyclub.gr/images/og-image-ponyclub.jpg

# Monitor Core Web Vitals
lighthouse https://ponyclub.gr/en/rafting --only-categories=performance
```

---

*Last Updated: December 2024 | Version: 1.1 (Consolidated)*
