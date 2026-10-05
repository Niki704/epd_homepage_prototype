"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { locales } from "@/i18n.config";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  si: "සිංහල",
  ta: "தமிழ்",
};

const MOBILE_LOCALE_LABELS: Record<string, string> = {
  en: "En",
  si: "සිං",
  ta: "தமி",
};

type ContactType = "phone" | "email";

export default function TopUtilityBar() {
  const t = useTranslations("utilityBar");
  const locale = useLocale();
  const pathname = usePathname();
  const [activeContact, setActiveContact] = useState<ContactType | null>(null);

  // Strip the current locale prefix so we can rebuild it for each switch link.
  const pathWithoutLocale =
    pathname.replace(new RegExp(`^/(${locales.join("|")})`), "") || "/";

  const handleContactBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      !event.currentTarget.contains(
        event.relatedTarget ? (event.relatedTarget as Node) : null,
      )
    ) {
      setActiveContact(null);
    }
  };

  return (
    <div className="bg-brand opacity-85 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="utility-contacts hidden sm:grid"
            onMouseLeave={() => setActiveContact(null)}
            onBlur={handleContactBlur}
          >
            <span className="utility-contact-sizer" aria-hidden="true">
              <span>{t("hotline")}</span>
              <span>{t("ourEmail")}</span>
            </span>
            <a
              href={`tel:${t("phone")}`}
              className={`utility-contact utility-contact-phone ${
                activeContact === "phone" ? "utility-contact-active" : ""
              }`}
              onMouseEnter={() => setActiveContact("phone")}
              onFocus={() => setActiveContact("phone")}
              aria-label={`${t("hotline")}: ${t("phone")}`}
            >
              <span className="utility-contact-inner">
                <span className="utility-contact-face utility-contact-front" aria-hidden="true">
                  {t("hotline")}
                </span>
                <span className="utility-contact-face utility-contact-back" aria-hidden="true">
                  {t("phone")}
                </span>
              </span>
            </a>
            <a
              href={`mailto:${t("email")}`}
              className={`utility-contact utility-contact-email ${
                activeContact === "email" ? "utility-contact-active" : ""
              }`}
              onMouseEnter={() => setActiveContact("email")}
              onFocus={() => setActiveContact("email")}
              aria-label={`${t("ourEmail")}: ${t("email")}`}
            >
              <span className="utility-contact-inner">
                <span className="utility-contact-face utility-contact-front" aria-hidden="true">
                  {t("ourEmail")}
                </span>
                <span className="utility-contact-face utility-contact-back" aria-hidden="true">
                  {t("email")}
                </span>
              </span>
            </a>
          </div>
          <Link
            href={`/${locale}/sitemap`}
            className="hidden sm:inline-flex"
          >
            {t("siteMap")}
          </Link>
          <a
            href={`tel:${t("phone")}`}
            className="sm:hidden"
            aria-label={`${t("hotline")}: ${t("phone")}`}
          >
            <Phone aria-hidden="true" className="size-4" />
          </a>
          <a
            href={`mailto:${t("email")}`}
            className="sm:hidden"
            aria-label={`${t("ourEmail")}: ${t("email")}`}
          >
            <Mail aria-hidden="true" className="size-4" />
          </a>
        </div>
        <div className="flex items-center gap-3">
          {locales.map((l) => (
            <Link
              key={l}
              href={`/${l}${pathWithoutLocale}`}
              className={
                l === locale
                  ? "font-semibold underline"
                  : "nav-link-underline opacity-80 hover:opacity-100"
              }
            >
              <span className="hidden sm:inline">{LOCALE_LABELS[l]}</span>
              <span className="sm:hidden">{MOBILE_LOCALE_LABELS[l]}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
