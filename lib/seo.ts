import type { Locale } from "@/i18n.config";
import { envClient } from "@/lib/env";

export const siteUrl = envClient.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

export const siteName = "Educational Publications Department";

const localeSeo: Record<
  Locale,
  { title: string; description: string; ogLocale: string }
> = {
  en: {
    title: "Educational Publications Department | Sri Lanka",
    description:
      "Official information, educational publications, textbooks, notices, divisions, and bookshop services from Sri Lanka's Educational Publications Department.",
    ogLocale: "en_LK",
  },
  si: {
    title: "අධ්‍යාපන ප්‍රකාශන දෙපාර්තමේන්තුව | ශ්‍රී ලංකාව",
    description:
      "ශ්‍රී ලංකා අධ්‍යාපන ප්‍රකාශන දෙපාර්තමේන්තුවේ නිල තොරතුරු, පෙළපොත්, අධ්‍යාපනික ප්‍රකාශන, නිවේදන සහ සේවා.",
    ogLocale: "si_LK",
  },
  ta: {
    title: "கல்வி வெளியீடுகள் திணைக்களம் | இலங்கை",
    description:
      "இலங்கை கல்வி வெளியீடுகள் திணைக்களத்தின் அதிகாரப்பூர்வ தகவல்கள், பாடப்புத்தகங்கள், கல்வி வெளியீடுகள், அறிவிப்புகள் மற்றும் சேவைகள்.",
    ogLocale: "ta_LK",
  },
};

export function getLocaleSeo(locale: Locale) {
  return localeSeo[locale];
}

export function getLocaleUrl(locale: Locale, pathname = "") {
  const normalizedPathname = pathname
    ? pathname.startsWith("/")
      ? pathname
      : `/${pathname}`
    : "";

  return `${siteUrl}/${locale}${normalizedPathname}`;
}

export function getAlternateLocaleUrls(pathname = "") {
  return {
    en: getLocaleUrl("en", pathname),
    si: getLocaleUrl("si", pathname),
    ta: getLocaleUrl("ta", pathname),
  };
}
