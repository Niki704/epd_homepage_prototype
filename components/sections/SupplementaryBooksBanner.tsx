import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";

// Advertisement/promo-style banner for Supplementary (paid) Books —
// visually distinct from the free Download Archive CTA above, since these
// are purchasable, not free downloads (02-features.md §13).
export default function SupplementaryBooksBanner() {
  const t = useTranslations("supplementaryBooks");

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="bg-amber-500 text-amber-950 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide mb-1">Now available</p>
          <h2 className="text-xl font-bold">{t("title")} — 2026 Collection</h2>
        </div>
        <Button href="#supplementary-books" variant="secondary" className="bg-white text-amber-800">
          Browse Collection
        </Button>
      </div>
    </section>
  );
}
