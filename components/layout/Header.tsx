"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import PublicStaffToggle from "@/components/ui/PublicStaffToggle";

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
    <header className="bg-brand-dark bg-brand sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
          {/* Reuses main-logo.png asset pattern from the Download Archive prototype. */}
          <Image
            src="/images/main-logo.png"
            alt="Educational Publications Department"
            width={40}
            height={40}
            className="rounded-sm"
          />
          <span className="text-white font-semibold leading-tight text-sm sm:text-base">
            Educational Publications
            <br className="hidden sm:block" /> Department
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-white text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>

        <PublicStaffToggle />
      </div>
    </header>
  );
}
