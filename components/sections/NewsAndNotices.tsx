import { useTranslations } from "next-intl";
import Badge from "@/components/ui/Badge";
import { news } from "@/data/news";
import { notices } from "@/data/notices";

// Two side-by-side, INDEPENDENTLY scrollable panels — MOE pattern
// (01-design.md §4). Each item = title + date + category, thin dividers.
// This is the section that must NOT become MOHE's redundant triple-listing.
function Panel({
  title,
  items,
}: {
  title: string;
  items: { id: string; title: string; date: string; category: string }[];
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col h-[420px]">
      <h3 className="font-semibold text-brand px-5 py-4 border-b border-gray-100">{title}</h3>
      <ul className="overflow-y-auto flex-1 divide-y divide-gray-100">
        {items.map((item) => (
          <li key={item.id} className="px-5 py-3">
            <p className="text-sm text-gray-800">{item.title}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge tone="gray">{item.category}</Badge>
              <span className="text-xs text-gray-400">
                {new Date(item.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NewsAndNotices() {
  const t = useTranslations("newsNotices");

  return (
    <section id="news" className="py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Panel title={t("newsTitle")} items={news} />
        <Panel title={t("noticesTitle")} items={notices} />
      </div>
    </section>
  );
}
