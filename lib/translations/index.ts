import { en } from "./en"
import { el } from "./el"

export const translations = {
  en,
  el,
}

export type Language = "en" | "el"
export type TranslationKeys = typeof en
