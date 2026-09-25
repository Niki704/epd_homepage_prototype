// Locales confirmed in 03-architecture.md: English, Sinhala, Tamil.
// Static dictionaries authored in code — no machine translation.
export const locales = ["en", "si", "ta"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";