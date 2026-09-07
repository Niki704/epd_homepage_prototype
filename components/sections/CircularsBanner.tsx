import { useTranslations } from "next-intl";
import Badge from "@/components/ui/Badge";
import { circulars } from "@/data/circulars";

// Circulars / Procurement kept as its own clearly-labeled section — never
// merged with News/Notices (avoids the MOHE/DOA redundancy anti-pattern).
export default function CircularsBanner() {
  const t = useTranslations("circulars");

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold text-brand mb-6">{t("title")}</h2>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">
        {circulars.map((c) => (
          <div
            key={c.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-5 py-4"
          >
            <div>
              <p className="text-sm text-gray-800">{c.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{c.refNo}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge tone="brand">
                {new Date(c.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
