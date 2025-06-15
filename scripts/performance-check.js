#!/usr/bin/env node

/**
 * Performance Check Script
 * Monitors key performance metrics and bundle sizes
 */

const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function formatBytes(bytes) {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

function checkImageSizes() {
  log('\n📸 Checking Image Sizes', 'cyan');
  log('========================', 'cyan');

  const imageDir = path.join(process.cwd(), 'public', 'images');
  const criticalImages = [
    'hero-image.webp',
    'hero-video.mp4',
    'hero-video.webm',
    'ponyclub_logo.png',
  ];

  criticalImages.forEach((imageName) => {
    const imagePath = path.join(imageDir, imageName);
    if (fs.existsSync(imagePath)) {
      const stats = fs.statSync(imagePath);
      const size = formatBytes(stats.size);
      const isLarge = stats.size > 500 * 1024; // 500KB threshold

      log(`${imageName}: ${size}`, isLarge ? 'red' : 'green');

      if (isLarge) {
        log('  ⚠️  Consider optimizing this image', 'yellow');
      }
    } else {
      log(`${imageName}: Not found`, 'yellow');
    }
  });
}

function checkBundleSize() {
  log('\n📦 Checking Bundle Information', 'cyan');
  log('===============================', 'cyan');

  const nextDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(nextDir)) {
    log('❌ .next directory not found. Run "npm run build" first.', 'red');
    return;
  }

  try {
    // Check if build info exists
    const buildManifest = path.join(nextDir, 'build-manifest.json');
    if (fs.existsSync(buildManifest)) {
      const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
      log('✅ Build manifest found', 'green');

      // Count total pages
      const pages = Object.keys(manifest.pages || {});
      log(`📄 Total pages: ${pages.length}`, 'blue');
    }

    // Check static directory size
    const staticDir = path.join(nextDir, 'static');
    if (fs.existsSync(staticDir)) {
      const totalSize = getTotalDirectorySize(staticDir);
      log(`📊 Static assets size: ${formatBytes(totalSize)}`, 'blue');

      if (totalSize > 5 * 1024 * 1024) {
        // 5MB
        log('  ⚠️  Static assets are quite large', 'yellow');
      }
    }
  } catch (error) {
    log(`❌ Error checking bundle: ${error.message}`, 'red');
  }
}

function getTotalDirectorySize(dirPath) {
  let totalSize = 0;

  function calculateSize(currentPath) {
    const stats = fs.statSync(currentPath);
    if (stats.isDirectory()) {
      const files = fs.readdirSync(currentPath);
      files.forEach((file) => {
        calculateSize(path.join(currentPath, file));
      });
    } else {
      totalSize += stats.size;
    }
  }

  try {
    calculateSize(dirPath);
  } catch (_error) {
    // Ignore errors for inaccessible files
  }

  return totalSize;
}

function checkPerformanceConfig() {
  log('\n⚙️  Checking Performance Configuration', 'cyan');
  log('=====================================', 'cyan');

  // Check next.config.js
  const nextConfigPath = path.join(process.cwd(), 'next.config.js');
  if (fs.existsSync(nextConfigPath)) {
    const config = fs.readFileSync(nextConfigPath, 'utf8');

    // Check for performance optimizations
    const checks = [
      { pattern: /optimizeCss.*true/, message: '✅ CSS optimization enabled' },
      {
        pattern: /removeConsole.*production/,
        message: '✅ Console removal in production',
      },
      { pattern: /esmExternals.*true/, message: '✅ ESM externals enabled' },
      {
        pattern: /formats.*webp.*avif/,
        message: '✅ Modern image formats configured',
      },
    ];

    checks.forEach((check) => {
      if (check.pattern.test(config)) {
        log(check.message, 'green');
      } else {
        log(check.message.replace('✅', '❌'), 'red');
      }
    });
  } else {
    log('❌ next.config.js not found', 'red');
  }

  // Check package.json for performance-related scripts
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const scripts = packageJson.scripts || {};

    if (scripts.analyze) {
      log('✅ Bundle analyzer script available', 'green');
    } else {
      log('❌ Bundle analyzer script not found', 'red');
    }
  }
}

function generateRecommendations() {
  log('\n💡 Performance Recommendations', 'magenta');
  log('===============================', 'magenta');

  const recommendations = [
    '1. Run "npm run analyze" to visualize bundle sizes',
    '2. Compress hero video using "./scripts/compress-hero-video.sh"',
    '3. Monitor Core Web Vitals with Google PageSpeed Insights',
    '4. Consider implementing service worker for caching',
    '5. Use "npm run build" to check for build warnings',
  ];

  recommendations.forEach((rec) => {
    log(rec, 'yellow');
  });
}

function main() {
  log('🚀 Performance Check Report', 'bright');
  log('===========================', 'bright');
  log(`Timestamp: ${new Date().toISOString()}`, 'blue');

  checkImageSizes();
  checkBundleSize();
  checkPerformanceConfig();
  generateRecommendations();

  log('\n✨ Performance check complete!', 'green');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, checkImageSizes, checkBundleSize };
