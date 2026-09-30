"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";

// Flat, max-2-level nav — MOE + Police.lk pattern (see 01-design.md §4).
// Avoid MOHE's deep megamenu anti-pattern.
export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}#about`, label: t("about") },
    { href: `/${locale}#divisions`, label: t("divisions") },
    { href: `/${locale}#news`, label: t("news") },
    { href: `/${locale}#bookshops`, label: t("bookshops") },
    { href: `/${locale}#contact`, label: t("contact") },
  ];

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="bg-brand sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/main-logo.png"
            alt="Educational Publications Department"
            width={751}
            height={102}
            sizes="(max-width: 639px) 70.5vw, 360px"
            loading="eager"
            className="h-auto w-[clamp(42vw,calc(70.5vw-91.2px),360px)] sm:w-90"
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

        <form
          role="search"
          className="relative shrink-0 h-8 sm:h-9 w-31 sm:w-45 md:w-58 lg:w-72"
        >
          <input
            type="search"
            placeholder={t("searchArchive")}
            aria-label={t("searchArchive")}
            className="h-full w-full rounded-md border border-white/30 bg-white px-2 sm:px-3 py-1 pr-7 sm:pr-10 text-xs sm:text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-white focus:ring-1 sm:focus:ring-2 focus:ring-toputilbg/30"
          />
          <button
            type="submit"
            aria-label={t("searchArchive")}
            className="absolute inset-y-0 right-0 flex w-9 sm:w-10 items-center justify-center text-brand"
          >
            <Search aria-hidden="true" size={18} strokeWidth={2.5} />
          </button>
        </form>

        <button
          type="button"
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-controls="mobile-navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
        >
          <Menu aria-hidden="true" size={24} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="fixed right-0 top-0 z-50 flex h-dvh w-[min(82vw,20rem)] flex-col bg-brand px-6 py-6 shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <X aria-hidden="true" size={24} />
                </button>
              </div>
              <motion.nav
                className="mt-8 flex flex-col gap-6"
                initial="closed"
                animate="open"
                variants={{
                  closed: { opacity: 0 },
                  open: {
                    opacity: 1,
                    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
                  },
                }}
              >
                {links.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={{
                      closed: { opacity: 0, x: 16 },
                      open: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="nav-link-fill inline-block text-base font-semibold text-white"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
