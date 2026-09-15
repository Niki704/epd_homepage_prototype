"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import packageJson from "@/package.json";

const appVersion = `v${packageJson.version}`;

// Flat, max-2-level nav — MOE + Police.lk pattern (see 01-design.md §4).
// Avoid MOHE's deep megamenu anti-pattern.
export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}#about`, label: t("about") },
    { href: `/${locale}#divisions`, label: t("divisions") },
    { href: `/${locale}#news`, label: t("news") },
    { href: `/${locale}#bookshops`, label: t("bookshops") },
    { href: `/${locale}#contact`, label: t("contact") },
  ];

  return (
    <header className="bg-brand sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/main-logo.png"
            alt="Educational Publications Department"
            width={751}
            height={102}
            sizes="(max-width: 1024px) 75vw, 360px"
            className="h-auto w-[min(75vw,360px)]"
          />
        </Link>

        <nav
          className={`hidden lg:flex items-center text-white ${
            locale === "ta" ? "gap-3 text-[12px]" : "gap-6 text-[14px]"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link-fill inline-block font-semibold hover:scale-105 focus-visible:scale-105 ${
                locale === "ta" || locale === "si" ? "leading-tight" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <span className="shrink-0 rounded bg-white/10 px-2 py-1 text-xs text-accent-gold-light">
          {appVersion}
        </span>
      </div>
    </header>
  );
}
