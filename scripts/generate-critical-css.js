#!/usr/bin/env node

/**
 * Critical CSS Generation Script for Next.js App Router
 * 
 * This script processes all statically generated HTML files after Next.js build
 * and inlines critical CSS using Beasties (formerly critical) for improved FCP/LCP.
 * 
 * Based on the "Fully Static With Both: Regular CSS and CSS-in-JS" approach
 * optimized for Next.js 15 App Router with internationalization support.
 */

const fs = require('node:fs');
const path = require('node:path');
const { parse } = require('node-html-parser');
const Beasties = require('beasties');
const crypto = require('crypto-js');
const { minify } = require('csso');

// Configuration
const BUILD_DIR = '.next';
const STATIC_DIR = path.join(BUILD_DIR, 'static');
const SERVER_DIR = path.join(BUILD_DIR, 'server');
const STANDALONE_DIR = path.join(BUILD_DIR, 'standalone');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Find all HTML files in the build output
 */
function findHtmlFiles(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      findHtmlFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Find CSS files in the static directory
 */
function findCssFiles() {
  const cssFiles = [];
  const staticCssDir = path.join(STATIC_DIR, 'css');
  
  if (!fs.existsSync(staticCssDir)) {
    log('⚠️  No CSS directory found in static build', 'yellow');
    return cssFiles;
  }
  
  const files = fs.readdirSync(staticCssDir);
  for (const file of files) {
    if (file.endsWith('.css') && !file.includes('.map')) {
      cssFiles.push(path.join(staticCssDir, file));
    }
  }
  
  return cssFiles;
}

/**
 * Create Beasties instance with optimized configuration
 */
function createBeasties() {
  return new Beasties({
    // Path configuration
    path: BUILD_DIR,
    publicPath: '/_next/',
    
    // Critical CSS extraction settings
    width: 1200,
    height: 900,
    
    // Performance optimizations
    inlineThreshold: 0, // Inline all critical CSS
    minimumExternalSize: 0, // Don't inline external CSS
    pruneSource: false, // Keep original CSS files
    mergeStylesheets: true,
    
    // Font optimization
    preloadFonts: true,
    fontDisplay: 'swap',
    
    // Advanced options
    allowRules: [
      // Allow Tailwind utilities
      /^\.[\w-]+$/,
      // Allow CSS custom properties
      /^--[\w-]+$/,
      // Allow keyframes
      /@keyframes/,
      // Allow media queries
      /@media/
    ],
    
    // Ignore certain selectors that might cause issues
    ignore: [
      // Ignore print styles
      /@media\s+print/,
      // Ignore dark mode styles (will be loaded separately)
      /\.dark\s/,
      // Ignore animation-only styles
      /animation-/
    ],
    
    // Logging
    logLevel: 'info'
  });
}

/**
 * Process a single HTML file
 */
async function processHtmlFile(filePath, beasties) {
  try {
    log(`📄 Processing: ${path.relative(process.cwd(), filePath)}`, 'blue');
    
    const originalHtml = fs.readFileSync(filePath, 'utf8');
    const optimizedHtml = await beasties.process(originalHtml);
    
    // Additional optimizations
    const root = parse(optimizedHtml);
    
    // Add preload hints for remaining CSS
    const head = root.querySelector('head');
    if (head) {
      // Find all remaining CSS links
      const cssLinks = root.querySelectorAll('link[rel="stylesheet"]');
      
      cssLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('/_next/static/css/')) {
          // Add preload hint
          const preload = parse(`<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">`);
          head.appendChild(preload);
          
          // Make original link load asynchronously
          link.setAttribute('media', 'print');
          link.setAttribute('onload', "this.media='all'");
        }
      });
    }
    
    // Write optimized HTML
    fs.writeFileSync(filePath, root.toString());
    log(`✅ Optimized: ${path.relative(process.cwd(), filePath)}`, 'green');
    
    return true;
  } catch (error) {
    log(`❌ Error processing ${filePath}: ${error.message}`, 'red');
    return false;
  }
}

/**
 * Generate hash for cache busting
 */
function generateHash(content) {
  return crypto.MD5(content).toString().substring(0, 8);
}

/**
 * Main execution function
 */
async function main() {
  log('🚀 Starting Critical CSS Generation', 'bright');
  log('=====================================', 'cyan');
  
  const startTime = Date.now();
  
  // Check if build directory exists
  if (!fs.existsSync(BUILD_DIR)) {
    log('❌ Build directory not found. Run "next build" first.', 'red');
    process.exit(1);
  }
  
  // Find all HTML files to process
  const htmlFiles = [
    ...findHtmlFiles(path.join(SERVER_DIR, 'app')),
    ...findHtmlFiles(path.join(STANDALONE_DIR, '.next', 'server', 'app'))
  ].filter(Boolean);
  
  if (htmlFiles.length === 0) {
    log('⚠️  No HTML files found to process', 'yellow');
    return;
  }
  
  log(`📋 Found ${htmlFiles.length} HTML files to process`, 'cyan');
  
  // Find CSS files
  const cssFiles = findCssFiles();
  log(`🎨 Found ${cssFiles.length} CSS files`, 'cyan');
  
  // Create Beasties instance
  const beasties = createBeasties();
  
  // Process each HTML file
  let processed = 0;
  let failed = 0;
  
  for (const htmlFile of htmlFiles) {
    const success = await processHtmlFile(htmlFile, beasties);
    if (success) {
      processed++;
    } else {
      failed++;
    }
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  log('', 'reset');
  log('📊 Critical CSS Generation Complete', 'bright');
  log('===================================', 'cyan');
  log(`✅ Successfully processed: ${processed} files`, 'green');
  if (failed > 0) {
    log(`❌ Failed to process: ${failed} files`, 'red');
  }
  log(`⏱️  Total time: ${duration}s`, 'blue');
  log('', 'reset');
  
  if (failed > 0) {
    log('⚠️  Some files failed to process. Check the logs above.', 'yellow');
    process.exit(1);
  }
  
  log('🎯 Next steps:', 'bright');
  log('1. Deploy your build and test a page', 'yellow');
  log('2. Check browser DevTools for inlined critical CSS in <head>', 'yellow');
  log('3. Run Lighthouse to measure FCP/LCP improvements', 'yellow');
  log('4. Monitor Core Web Vitals in production', 'yellow');
}

// Execute if run directly
if (require.main === module) {
  main().catch(error => {
    log(`💥 Fatal error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  });
}

module.exports = { main, processHtmlFile, findHtmlFiles };
