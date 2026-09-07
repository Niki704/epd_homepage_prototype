import { useTranslations } from "next-intl";

// Icon + label + one-line description row — Police.lk service-tile pattern.
export default function QuickServiceTiles() {
  const t = useTranslations("quickServices");

  const tiles = [
    { key: "downloadBooks", icon: "⬇️" },
    { key: "searchArchive", icon: "🔍" },
    { key: "staffPortal", icon: "🧑‍💼" },
    { key: "notices", icon: "📢" },
    { key: "contact", icon: "☎️" },
    { key: "aboutEpd", icon: "ℹ️" },
  ] as const;

  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-brand mb-6">{t("title")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {tiles.map((tile) => (
            <div
              key={tile.key}
              className="bg-white rounded-lg border border-gray-100 p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="text-2xl mb-1" aria-hidden="true">{tile.icon}</div>
              <p className="text-sm font-medium text-gray-700">{t(tile.key)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
