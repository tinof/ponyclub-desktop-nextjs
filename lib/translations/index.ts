import { el } from "./el.ts";
import { en } from "./en.ts";

export const translations = {
  en,
  el,
};

export type Language = "en" | "el";
export type TranslationKeys = typeof en;
