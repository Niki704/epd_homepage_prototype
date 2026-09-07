import { useTranslations } from "next-intl";
import Image from "next/image";
import { additionalCommissioners } from "@/data/commissioners";

// Two-column layout — confirmed by stakeholder (02-features.md §5).
// Photo + Name + Title + Contact only; no message/bio (that's exclusive
// to the Commissioner General).
export default function AdditionalCommissioners() {
  const t = useTranslations("commissioners");
  const cgT = useTranslations("commissionerGeneral");

  return (
    <section className="max-w-5xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold text-brand mb-6 text-center">{t("title")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {additionalCommissioners.map((c) => (
          <div
            key={c.name}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center gap-4"
          >
            <div className="relative h-20 w-20 rounded-full overflow-hidden bg-gray-200 shrink-0">
              <Image src={c.photo} alt={c.name} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{c.name}</h3>
              <p className="text-sm text-brand mb-2">{c.title}</p>
              <p className="text-xs text-gray-500">
                {cgT("telephone")}: {c.telephone}
              </p>
              <p className="text-xs text-gray-500 break-all">
                {cgT("email")}: {c.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
