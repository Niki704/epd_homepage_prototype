import { useTranslations } from "next-intl";
import Card from "@/components/ui/Card";

// NIE "Faculties" card-grid pattern, adapted to EPD's book category
// taxonomy — mirrors the Download Archive's existing categories.
export default function BookCategoryGrid() {
  const t = useTranslations("bookCategories");

  const categories = [
    { key: "textbooks", icon: "📚" },
    { key: "modules", icon: "📗" },
    { key: "pirivena", icon: "📙" },
    { key: "activityBooks", icon: "✏️" },
  ] as const;

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold text-brand mb-6">{t("title")}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((c) => (
          <Card key={c.key} className="text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-2" aria-hidden="true">{c.icon}</div>
            <p className="font-medium text-gray-800">{t(c.key)}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
