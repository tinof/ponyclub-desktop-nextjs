// types/bokun.d.ts
export {}; // Ensure this file is treated as a module.

declare global {
  interface Window {
    BokunWidgets?: {
      [key: string]: any;
      init?: (config?: { bookingChannelUUID?: string }) => void;
      reinit?: (config?: { bookingChannelUUID?: string }) => void;
      scan?: () => void;
      setLanguage?: (lang: string) => void;
    };
  }
}
