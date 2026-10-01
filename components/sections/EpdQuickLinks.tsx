import {
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type QuickLinkGroup = {
  title: string;
  icon: LucideIcon;
  links: string[];
};

const quickLinkGroups: QuickLinkGroup[] = [
  {
    title: "Academic calendar",
    icon: CalendarDays,
    links: ["Calendar", "National examinations dates"],
  },
  {
    title: "Admissions",
    icon: GraduationCap,
    links: [
      "Primary 1 registration",
      "Direct School Admission (DSA-Sec)",
      "Returning Singaporeans",
      "International students",
      "Secondary 1 posting",
      "Joint Admissions Exercise (JAE)",
      "MOE Kindergarten registration",
    ],
  },
  {
    title: "Careers",
    icon: BriefcaseBusiness,
    links: [
      "Teaching careers",
      "Teaching scholarships and sponsorships",
      "Non-teaching careers",
      "Adjunct and Relief Schemes",
    ],
  },
  {
    title: "Self-help tools",
    icon: Wrench,
    links: [
      "SchoolFinder",
      "CourseFinder",
      "Request examination entry proofs and education records",
      "Singapore Student Learning Space (SLS)",
      "Student Finance System (SFS)",
      "MySkillsFuture",
      "FAQ",
      "Financial assistance",
    ],
  },
];

export default function EpdQuickLinks() {
  return (
    <section
      className="bg-[#f6f8f8] px-4 py-8 sm:py-10 lg:py-14"
      aria-labelledby="mock-quick-links-title"
    >
      <div className="mx-auto max-w-6xl rounded-sm border border-gray-300 bg-white px-6 py-7 shadow-[0_2px_7px_rgba(15,23,42,0.08)] sm:px-8 sm:py-8 lg:px-7 lg:py-8">
        <h2 id="mock-quick-links-title" className="sr-only">
          Quick links
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {quickLinkGroups.map(({ title, icon: Icon, links }) => (
            <div key={title}>
              <div className="flex items-start gap-3">
                <Icon
                  className="mt-0.5 h-9 w-9 shrink-0 stroke-[1.8] text-[#1f2937]"
                  aria-hidden="true"
                />
                <h3 className="pt-1 text-lg font-semibold leading-tight text-[#374151]">
                  {title}
                </h3>
              </div>
              <ul className="mt-2.5 space-y-3 pl-12">
                {links.map((link) => (
                  <li
                    key={link}
                    className="relative pl-1 text-[1rem] leading-6"
                  >
                    <span
                      className="absolute -left-3.5 top-[0.65rem] h-2 w-2 -translate-y-1/2 rounded-full bg-[#f9c515]"
                      aria-hidden="true"
                    />
                    <a
                      href="#"
                      className="text-[#0869e8] underline-offset-2 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0869e8]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
