#!/usr/bin/env node

/**
 * SEO Validation Script for Pony Club Rafting Page
 * 
 * This script validates the SEO improvements implemented for the rafting page.
 * Run with: node scripts/validate-seo.js
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const TEST_PATHS = ['/en/rafting', '/el/rafting'];

console.log('🔍 Starting SEO Validation for Pony Club...\n');

/**
 * Fetch page content
 */
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, html: data, headers: res.headers }));
    }).on('error', reject);
  });
}

/**
 * Validate meta tags
 */
function validateMetaTags(html, path) {
  console.log(`📄 Validating Meta Tags for ${path}:`);
  
  const checks = [
    { name: 'Title Tag', regex: /<title[^>]*>([^<]+)<\/title>/i },
    { name: 'Meta Description', regex: /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i },
    { name: 'Meta Keywords', regex: /<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["']/i },
    { name: 'Canonical URL', regex: /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i },
    { name: 'Open Graph Title', regex: /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i },
    { name: 'Open Graph Description', regex: /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i },
    { name: 'Twitter Card', regex: /<meta[^>]*name=["']twitter:card["'][^>]*content=["']([^"']+)["']/i }
  ];

  let passed = 0;
  checks.forEach(check => {
    const match = html.match(check.regex);
    if (match) {
      console.log(`  ✅ ${check.name}: ${match[1].substring(0, 60)}${match[1].length > 60 ? '...' : ''}`);
      passed++;
    } else {
      console.log(`  ❌ ${check.name}: Not found`);
    }
  });

  console.log(`  📊 Meta Tags Score: ${passed}/${checks.length}\n`);
  return passed / checks.length;
}

/**
 * Validate structured data
 */
function validateStructuredData(html, path) {
  console.log(`🏗️ Validating Structured Data for ${path}:`);
  
  const schemas = [
    { name: 'TouristAttraction', regex: /"@type":\s*"TouristAttraction"/i },
    { name: 'Product Schema', regex: /"@type":\s*"Product"/i },
    { name: 'Service Schema', regex: /"@type":\s*"Service"/i },
    { name: 'FAQ Schema', regex: /"@type":\s*"FAQPage"/i },
    { name: 'Breadcrumb Schema', regex: /"@type":\s*"BreadcrumbList"/i },
    { name: 'Organization Schema', regex: /"@type":\s*"Organization"/i }
  ];

  let passed = 0;
  schemas.forEach(schema => {
    if (html.match(schema.regex)) {
      console.log(`  ✅ ${schema.name}: Found`);
      passed++;
    } else {
      console.log(`  ❌ ${schema.name}: Not found`);
    }
  });

  console.log(`  📊 Structured Data Score: ${passed}/${schemas.length}\n`);
  return passed / schemas.length;
}

/**
 * Validate heading structure
 */
function validateHeadings(html, path) {
  console.log(`📝 Validating Heading Structure for ${path}:`);
  
  const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi) || [];
  const h2Matches = html.match(/<h2[^>]*>([^<]+)<\/h2>/gi) || [];
  const h3Matches = html.match(/<h3[^>]*>([^<]+)<\/h3>/gi) || [];

  console.log(`  📍 H1 Tags: ${h1Matches.length} found`);
  h1Matches.forEach((h1, i) => {
    const text = h1.replace(/<[^>]*>/g, '').trim();
    console.log(`    ${i + 1}. ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`);
  });

  console.log(`  📍 H2 Tags: ${h2Matches.length} found`);
  console.log(`  📍 H3 Tags: ${h3Matches.length} found`);

  const score = h1Matches.length === 1 && h2Matches.length > 0 ? 1 : 0.5;
  console.log(`  📊 Heading Structure Score: ${score === 1 ? 'Perfect' : 'Needs Improvement'}\n`);
  return score;
}

/**
 * Validate SEO content accessibility
 */
function validateContentAccessibility(html, path) {
  console.log(`🔍 Validating Content Accessibility for ${path}:`);
  
  const checks = [
    { name: 'Activity Description', regex: /rafting|ράφτινγκ/i },
    { name: 'Pricing Information', regex: /€\d+|price|τιμ/i },
    { name: 'Contact Information', regex: /\+30|phone|τηλέφωνο/i },
    { name: 'Booking Information', regex: /book|κράτηση|reservation/i },
    { name: 'Noscript Fallback', regex: /<noscript[^>]*>[\s\S]*<\/noscript>/i }
  ];

  let passed = 0;
  checks.forEach(check => {
    if (html.match(check.regex)) {
      console.log(`  ✅ ${check.name}: Found`);
      passed++;
    } else {
      console.log(`  ❌ ${check.name}: Not found`);
    }
  });

  console.log(`  📊 Content Accessibility Score: ${passed}/${checks.length}\n`);
  return passed / checks.length;
}

/**
 * Validate performance hints
 */
function validatePerformance(html, path) {
  console.log(`⚡ Validating Performance Optimizations for ${path}:`);
  
  const checks = [
    { name: 'Preconnect to Bokun', regex: /<link[^>]*rel=["']preconnect["'][^>]*href=["'][^"']*bokun[^"']*["']/i },
    { name: 'DNS Prefetch', regex: /<link[^>]*rel=["']dns-prefetch["']/i },
    { name: 'Lazy Loading', regex: /loading=["']lazy["']/i },
    { name: 'Optimized Images', regex: /<img[^>]*sizes=["'][^"']+["']/i }
  ];

  let passed = 0;
  checks.forEach(check => {
    if (html.match(check.regex)) {
      console.log(`  ✅ ${check.name}: Implemented`);
      passed++;
    } else {
      console.log(`  ❌ ${check.name}: Not found`);
    }
  });

  console.log(`  📊 Performance Score: ${passed}/${checks.length}\n`);
  return passed / checks.length;
}

/**
 * Main validation function
 */
async function validateSEO() {
  const results = [];

  for (const path of TEST_PATHS) {
    const url = `${BASE_URL}${path}`;
    console.log(`🌐 Testing: ${url}`);
    console.log('='.repeat(50));

    try {
      const { status, html, headers } = await fetchPage(url);
      
      if (status !== 200) {
        console.log(`❌ HTTP Status: ${status}\n`);
        continue;
      }

      console.log(`✅ HTTP Status: ${status}`);
      console.log(`📦 Content-Type: ${headers['content-type']}\n`);

      const scores = {
        path,
        metaTags: validateMetaTags(html, path),
        structuredData: validateStructuredData(html, path),
        headings: validateHeadings(html, path),
        contentAccessibility: validateContentAccessibility(html, path),
        performance: validatePerformance(html, path)
      };

      const overallScore = Object.values(scores)
        .filter(v => typeof v === 'number')
        .reduce((sum, score) => sum + score, 0) / 5;

      scores.overall = overallScore;
      results.push(scores);

      console.log(`🎯 Overall SEO Score for ${path}: ${(overallScore * 100).toFixed(1)}%`);
      console.log('\n' + '='.repeat(50) + '\n');

    } catch (error) {
      console.log(`❌ Error testing ${url}: ${error.message}\n`);
    }
  }

  // Summary
  console.log('📊 SEO VALIDATION SUMMARY');
  console.log('='.repeat(50));
  
  results.forEach(result => {
    console.log(`\n${result.path}:`);
    console.log(`  Meta Tags: ${(result.metaTags * 100).toFixed(1)}%`);
    console.log(`  Structured Data: ${(result.structuredData * 100).toFixed(1)}%`);
    console.log(`  Headings: ${(result.headings * 100).toFixed(1)}%`);
    console.log(`  Content Accessibility: ${(result.contentAccessibility * 100).toFixed(1)}%`);
    console.log(`  Performance: ${(result.performance * 100).toFixed(1)}%`);
    console.log(`  Overall: ${(result.overall * 100).toFixed(1)}%`);
  });

  const avgScore = results.reduce((sum, r) => sum + r.overall, 0) / results.length;
  console.log(`\n🏆 Average SEO Score: ${(avgScore * 100).toFixed(1)}%`);
  
  if (avgScore >= 0.9) {
    console.log('🎉 Excellent! Your SEO optimization is ready for production.');
  } else if (avgScore >= 0.7) {
    console.log('👍 Good! Minor improvements recommended.');
  } else {
    console.log('⚠️ Needs improvement. Review failed checks above.');
  }
}

// Run validation
validateSEO().catch(console.error);
