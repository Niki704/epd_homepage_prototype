import { useTranslations } from "next-intl";
import Image from "next/image";
import { commissionerGeneral } from "@/data/commissioners";

// Single-column layout — confirmed by stakeholder (02-features.md §4).
// Distinct section, not merged into a leadership grid.
export default function CommissionerGeneral() {
  const t = useTranslations("commissionerGeneral");
  const cg = commissionerGeneral;

  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-brand mb-6 text-center">{t("title")}</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
          <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gray-200 mb-4">
            <Image src={cg.photo} alt={cg.name} fill className="object-cover" />
          </div>
          <h3 className="font-semibold text-lg text-gray-900">{cg.name}</h3>
          <p className="text-sm text-brand font-medium mb-4">{t("title")}</p>
          <p className="text-gray-600 max-w-xl leading-relaxed mb-6">{cg.message}</p>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm w-full max-w-md border-t border-gray-100 pt-4">
            <div>
              <dt className="text-gray-400">{t("telephone")}</dt>
              <dd className="text-gray-700">{cg.telephone}</dd>
            </div>
            <div>
              <dt className="text-gray-400">{t("fax")}</dt>
              <dd className="text-gray-700">{cg.fax}</dd>
            </div>
            <div>
              <dt className="text-gray-400">{t("email")}</dt>
              <dd className="text-gray-700 break-all">{cg.email}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
