// types/bokun.d.ts
export {} // Ensure this file is treated as a module.

declare global {
  interface Window {
    BokunWidgets?: {
      [key: string]: any
      init?: () => void
      reinit?: () => void
      setLanguage?: (lang: string) => void
    }
  }
}
