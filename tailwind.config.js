/** @type {import('tailwindcss').Config} */
module.exports = {
  // Content paths are now auto-detected in v4, but keeping minimal config for compatibility
  darkMode: "class",

  // Minimal theme extensions - most configuration moved to CSS @theme blocks
  theme: {
    extend: {
      // Keep only essential customizations that can't be easily moved to CSS
      textShadow: {
        lg: "0 1px 2px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2)",
        xl: "0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6), 0 8px 16px rgba(0, 0, 0, 0.4)",
      },
    },
  },

  // Plugins are still needed for complex utilities that can't be expressed in CSS @utility blocks
  plugins: [],
};
