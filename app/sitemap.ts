import type { MetadataRoute } from "next";
import { locales } from "@/i18n.config";
import { getLocaleUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) => [
    {
      url: getLocaleUrl(locale),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: getLocaleUrl(locale, "/sitemap"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ]);
}
