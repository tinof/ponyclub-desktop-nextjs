/**
 * Centralized type definitions for c15t consent management.
 *
 * This file defines the specific consent categories used throughout the application.
 * By using a centralized type, we ensure type safety and consistency when checking
 * for consent, preventing typos and enabling better autocompletion.
 */

// Define the specific consent categories used in this project.
// This type should be used with the `useConsentManager` hook.
export type AppConsent = "necessary" | "analytics" | "marketing";
