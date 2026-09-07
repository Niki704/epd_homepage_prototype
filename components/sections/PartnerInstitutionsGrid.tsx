import { useTranslations } from "next-intl";

// Card row of sister institutions (emblem + name) — MOE pattern
// (01-design.md §4). Reinforces EPD's place in the education ecosystem,
// mirroring how MOE's own homepage lists EPD as a partner.
export default function PartnerInstitutionsGrid() {
  const t = useTranslations("partners");

  const partners = [
    "Ministry of Education",
    "National Institute of Education",
    "Dept. of Examinations",
    "State Printing Corporation",
    "National Education Commission",
    "UNESCO National Commission",
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold text-brand mb-6 text-center">{t("title")}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {partners.map((name) => (
          <div
            key={name}
            className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center gap-2 hover:shadow-md transition-shadow"
          >
            <div className="h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-lg">
              {name.charAt(0)}
            </div>
            <p className="text-xs text-gray-600 leading-tight">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
