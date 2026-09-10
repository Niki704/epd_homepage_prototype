import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

// 3-column MOE-style footer (see 01-design.md §4/§5):
// (1) logo + contact + socials, (2) Site Navigations, (3) Media Center + gov.lk badge.
// Footer credits pattern (creator, supervisor, version badge) carried over
// exactly from the Download Archive sibling prototype — see 01-design.md §6.
export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-navy text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="font-semibold text-base mb-3">
            Educational Publications Department
          </h3>
          <p className="text-white/70 mb-1">+94 11 000 0000</p>
          <p className="text-white/70">info@epd.gov.lk</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">{t("navTitle")}</h4>
          <ul className="space-y-2 text-white/70">
            <li>
              <Link href={`/${locale}#about`} className="hover:text-white">
                {nav("about")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}#divisions`} className="hover:text-white">
                {nav("divisions")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}#news`} className="hover:text-white">
                {nav("news")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}#contact`} className="hover:text-white">
                {nav("contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">{t("mediaTitle")}</h4>
          <ul className="space-y-2 text-white/70">
            <li>
              <Link href={`/${locale}#news`} className="hover:text-white">
                {nav("news")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}#bookshops`} className="hover:text-white">
                {nav("bookshops")}
              </Link>
            </li>
          </ul>
          <span className="inline-block mt-4 text-xs bg-white/10 rounded px-2 py-1">
            {t("govBadge")}
          </span>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <p>
            {t("credit")} · {t("supervisedBy")}
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              GitHub
            </a>
            <span className="rounded bg-white/10 px-1.5 py-0.5">v1.00</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-4 text-xs text-white/50">
          {t("copyright", { year })} · {t("madeWith")}
        </div>
      </div>
    </footer>
  );
}
