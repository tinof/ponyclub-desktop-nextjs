// types/bokun.d.ts
export {}; // Ensure this file is treated as a module.

declare global {
  interface Window {
    BokunWidgets?: {
      [key: string]: unknown;
      init?: (config?: {
        bookingChannelUUID?: string;
        origin?: string;
      }) => void;
      reinit?: (config?: {
        bookingChannelUUID?: string;
        origin?: string;
      }) => void;
      scan?: () => void;
      setLanguage?: (lang: string) => void;
    };
  }
}
