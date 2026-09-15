import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import packageJson from "@/package.json";

const appVersion = `v${packageJson.version}`;

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
          <p className="text-white/70 mb-1">
            Isurupaya, Baththaramulla, Sri Lanka
          </p>
          <p className="text-white/70 mb-1">+94 112 784 815</p>
          <p className="text-white/70">epditunit@gmail.com</p>
          {/* This email field is subject to change. */}
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
            <li>
              <Link href={`/${locale}#afwebs`} className="hover:text-white">
                {nav("afwebs")}
              </Link>
            </li>
          </ul>
          <div className="mt-4 border-t border-white/10 pt-4 flex items-center gap-4">
            <Image
              src="/icons/gic_en-1.gif"
              alt="Government Information Center"
              width={168}
              height={60}
              unoptimized
              className="h-8 w-auto object-contain"
            />
            <Image
              src="/icons/lgovlk-1.png"
              alt="Gov.lk"
              width={102}
              height={30}
              className="h-6 w-auto object-contain"
            />
          </div>
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
              className="hover:text-purple-400 transition-colors"
            >
              GitHub
            </a>
            <span className="rounded text-accent-gold-light bg-white/10 px-1.5 py-0.5">
              {appVersion}
            </span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-4 text-xs text-white/50">
          {t("copyright", { year })}
          <span className="text-white/40"> • </span>
          {t("madeWith")}
          <span className="text-purple-400"> ♥ </span>
        </div>
      </div>
    </footer>
  );
}
