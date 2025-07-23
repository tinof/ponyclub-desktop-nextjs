#!/usr/bin/env node

/**
 * Validation script for Google Tag Manager environment variables
 * Run this before deploying to ensure all required variables are set
 *
 * NOTE: After GTM migration, conversion labels are managed in GTM container,
 * not as environment variables.
 */

const requiredEnvVars = ["NEXT_PUBLIC_GTM_ID"];

const optionalEnvVars = [
  "NEXT_PUBLIC_ENABLE_BOKUN", // Bokun feature flag
  "NEXT_PUBLIC_ENABLE_C15T", // C15T consent feature flag
];

console.log("🔍 Validating GTM Environment Variables...\n");

const missingRequired = [];
const missingOptional = [];

// Check required variables
requiredEnvVars.forEach((envVar) => {
  const value = process.env[envVar];
  if (!value) {
    missingRequired.push(envVar);
    console.log(`❌ ${envVar}: MISSING`);
  } else {
    console.log(`✅ ${envVar}: SET`);
  }
});

// Check optional variables
optionalEnvVars.forEach((envVar) => {
  const value = process.env[envVar];
  if (!value) {
    missingOptional.push(envVar);
    console.log(`⚠️  ${envVar}: MISSING (optional)`);
  } else {
    console.log(`✅ ${envVar}: SET (optional)`);
  }
});

console.log("\n📊 Summary:");
console.log(
  `Required variables: ${requiredEnvVars.length - missingRequired.length}/${requiredEnvVars.length} set`
);
console.log(
  `Optional variables: ${optionalEnvVars.length - missingOptional.length}/${optionalEnvVars.length} set`
);

if (missingRequired.length > 0) {
  console.log("\n❌ VALIDATION FAILED");
  console.log("Missing required environment variables:");
  missingRequired.forEach((envVar) => {
    console.log(`  - ${envVar}`);
  });
  console.log(
    "\nPlease set these variables in your .env.local file or deployment environment."
  );
  process.exit(1);
} else {
  console.log("\n✅ VALIDATION PASSED");
  console.log("All required environment variables are set!");

  if (missingOptional.length > 0) {
    console.log("\nOptional variables not set:");
    missingOptional.forEach((envVar) => {
      console.log(`  - ${envVar}`);
    });
  }

  process.exit(0);
}
