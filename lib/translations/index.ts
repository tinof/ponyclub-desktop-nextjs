import { el } from './el'
import { en } from './en'

export const translations = {
  en,
  el,
}

export type Language = 'en' | 'el'
export type TranslationKeys = typeof en
