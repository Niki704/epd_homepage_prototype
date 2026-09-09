"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { locales } from "@/i18n.config";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  si: "සිංහල",
  ta: "தமிழ்",
};

export default function TopUtilityBar() {
  const t = useTranslations("utilityBar");
  const locale = useLocale();
  const pathname = usePathname();

  // Strip the current locale prefix so we can rebuild it for each switch link.
  const pathWithoutLocale =
    pathname.replace(new RegExp(`^/(${locales.join("|")})`), "") || "/";

  return (
    <div className="bg-brand opacity-85 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href={`tel:${t("phone")}`} className="hover:underline">
            {t("phone")}
          </a>
          <a
            href={`mailto:${t("email")}`}
            className="hidden sm:inline hover:underline"
          >
            {t("email")}
          </a>
          <Link
            href={`/${locale}/sitemap`}
            className="hidden sm:inline hover:underline"
          >
            {t("siteMap")}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {locales.map((l) => (
            <Link
              key={l}
              href={`/${l}${pathWithoutLocale}`}
              className={
                l === locale
                  ? "font-semibold underline"
                  : "opacity-80 hover:opacity-100"
              }
            >
              {LOCALE_LABELS[l]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
