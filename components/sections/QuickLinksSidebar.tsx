import { useTranslations } from "next-intl";

// Dark navy card, white pill rows with chevron icons — MOE pattern
// (01-design.md §4). Sits alongside the News/Notices dual panel.
export default function QuickLinksSidebar() {
  const t = useTranslations("quickLinks");

  const links = [
    "New Textbook List 2026",
    "Grade 6 Syllabus Update",
    "Staff Circular Index",
    "Book Distribution Schedule",
    "Tender Notices Archive",
  ];

  return (
    <aside className="py-14">
      <div className="bg-navy rounded-xl p-5 h-[420px] flex flex-col">
        <h3 className="font-semibold text-white mb-4">{t("title")}</h3>
        <ul className="space-y-2 overflow-y-auto flex-1">
          {links.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="flex items-center gap-2 bg-white/90 hover:bg-white text-navy text-sm rounded-full px-4 py-2.5 transition-colors"
              >
                <span aria-hidden="true">‹</span>
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
