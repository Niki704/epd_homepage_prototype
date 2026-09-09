import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SitemapPage() {
  const t = useTranslations("nav");

  const links = [
    { href: "#about", label: t("about") },
    { href: "#divisions", label: t("divisions") },
    { href: "#news", label: t("news") },
    { href: "#bookshops", label: t("bookshops") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <section className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold text-brand mb-6">{t("siteMap")}</h1>
      <nav aria-label={t("siteMap")}>
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={`./${link.href}`}
                className="text-brand underline hover:no-underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
