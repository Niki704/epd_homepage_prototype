import { useTranslations } from "next-intl";
import Card from "@/components/ui/Card";

// Structure confirmed in 02-features.md §3: main description, then
// Vision / Mission / Objectives as a 3-card layout.
export default function AboutUs() {
  const t = useTranslations("about");

  const objectives = [
    "Ensure timely availability of textbooks for every school in Sri Lanka",
    "Maintain high editorial and print-quality standards",
    "Expand digital access to educational publications",
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold text-brand mb-4">{t("title")}</h2>
      <p className="text-gray-700 max-w-3xl leading-relaxed mb-10">{t("description")}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-semibold text-brand mb-2">{t("vision")}</h3>
          <p className="text-sm text-gray-600">{t("visionText")}</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-brand mb-2">{t("mission")}</h3>
          <p className="text-sm text-gray-600">{t("missionText")}</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-brand mb-2">{t("objectives")}</h3>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            {objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
