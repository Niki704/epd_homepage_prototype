import { useTranslations } from "next-intl";
import Card from "@/components/ui/Card";
import { divisions } from "@/data/divisions";

// 9 divisions, one card each. Template supports a variable-length staff
// list (1 to 3+) per division — confirmed requirement (02-features.md §6).
export default function DivisionsSection() {
  const t = useTranslations("divisions");

  return (
    <section id="divisions" className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold text-brand mb-6">{t("title")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {divisions.map((division) => (
          <Card key={division.id} className="flex flex-col">
            <h3 className="font-semibold text-gray-900 mb-1">{division.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{division.description}</p>
            <ul className="mt-auto space-y-1.5 border-t border-gray-100 pt-3">
              {division.staff.map((staff) => (
                <li key={staff.name} className="text-sm">
                  <span className="text-gray-800 font-medium">{staff.name}</span>
                  <span className="text-gray-400"> — {staff.title}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
