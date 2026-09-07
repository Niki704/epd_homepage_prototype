import { useTranslations } from "next-intl";
import Badge from "@/components/ui/Badge";
import { bookshops } from "@/data/bookshops";

// Table format, columns confirmed in 02-features.md §9:
// Bookshop, Address, Contact, Email, Google Map link, Availability.
export default function BookshopTable() {
  const t = useTranslations("bookshops");

  const availabilityTone = {
    "In Stock": "green",
    "Limited Stock": "brand",
    "Out of Stock": "red",
  } as const;

  return (
    <section id="bookshops" className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold text-brand mb-6">{t("title")}</h2>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="px-5 py-3 font-medium">{t("name")}</th>
              <th className="px-5 py-3 font-medium">{t("address")}</th>
              <th className="px-5 py-3 font-medium">{t("contact")}</th>
              <th className="px-5 py-3 font-medium">{t("email")}</th>
              <th className="px-5 py-3 font-medium">{t("map")}</th>
              <th className="px-5 py-3 font-medium">{t("availability")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookshops.map((shop) => (
              <tr key={shop.name}>
                <td className="px-5 py-3 font-medium text-gray-800 whitespace-nowrap">{shop.name}</td>
                <td className="px-5 py-3 text-gray-600">{shop.address}</td>
                <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{shop.contact}</td>
                <td className="px-5 py-3 text-gray-600">{shop.email}</td>
                <td className="px-5 py-3">
                  <a
                    href={shop.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:underline"
                  >
                    View
                  </a>
                </td>
                <td className="px-5 py-3">
                  <Badge tone={availabilityTone[shop.availability]}>{shop.availability}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
