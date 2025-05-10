// types/bokun.d.ts
export {}; // Ensure this file is treated as a module.

declare global {
  interface Window {
    BokunWidgets?: {
      init?: () => void;    // Added init
      reinit?: () => void; // Assuming a reinit method might exist
      // Add other BokunWidgets methods or properties if known
    };
  }
}
