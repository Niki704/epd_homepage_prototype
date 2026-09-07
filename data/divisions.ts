// Realistic mock data per Placeholder Data Policy (02-features.md).
// Staff counts intentionally vary (1 to 3+) per the confirmed design
// requirement in 02-features.md §6 — template must not assume 1 staff/card.

export interface DivisionStaff {
  name: string;
  title: string;
}

export interface Division {
  id: string;
  name: string;
  description: string;
  staff: DivisionStaff[];
}

export const divisions: Division[] = [
  {
    id: "textbook-development",
    name: "Textbook Development Division",
    description: "Develops and reviews textbook content in line with the national curriculum.",
    staff: [{ name: "Mr. Sunil Rathnayake", title: "Deputy Commissioner" }],
  },
  {
    id: "printing",
    name: "Printing Division",
    description: "Manages large-scale printing of textbooks and supplementary materials.",
    staff: [
      { name: "Mrs. Kumari Jayasinghe", title: "Deputy Commissioner" },
      { name: "Mr. Ajith Bandara", title: "Assistant Commissioner" },
    ],
  },
  {
    id: "distribution",
    name: "Distribution Division",
    description: "Coordinates island-wide distribution of books to provincial education offices.",
    staff: [
      { name: "Mr. Chaminda Silva", title: "Deputy Commissioner" },
      { name: "Mrs. Anoma Gunasekara", title: "Assistant Commissioner" },
      { name: "Mr. Priyantha Kumara", title: "Assistant Commissioner" },
    ],
  },
  {
    id: "finance",
    name: "Finance Division",
    description: "Manages budgeting, procurement finance, and expenditure oversight.",
    staff: [{ name: "Mrs. Sriyani Wickramasinghe", title: "Chief Accountant" }],
  },
  {
    id: "quality-assurance",
    name: "Quality Assurance Division",
    description: "Reviews print quality, paper standards, and editorial accuracy before release.",
    staff: [
      { name: "Mr. Nimal Rajapaksha", title: "Deputy Commissioner" },
      { name: "Mrs. Dilani Perera", title: "Assistant Commissioner" },
    ],
  },
  {
    id: "supplementary-publications",
    name: "Supplementary Publications Division",
    description: "Produces paid supplementary and enrichment books alongside free textbooks.",
    staff: [{ name: "Mr. Roshan Fernando", title: "Deputy Commissioner" }],
  },
  {
    id: "administration",
    name: "Administration Division",
    description: "Handles HR, internal administration, and staff welfare across EPD.",
    staff: [
      { name: "Mrs. Malani Dissanayake", title: "Deputy Commissioner" },
      { name: "Mr. Tharindu Wijekoon", title: "Assistant Commissioner" },
    ],
  },
  {
    id: "information-technology",
    name: "Information Technology Division",
    description: "Maintains digital systems, the online book archive, and internal software.",
    staff: [{ name: "Mr. Kasun Abeywardena", title: "Deputy Commissioner" }],
  },
  {
    id: "planning-monitoring",
    name: "Planning & Monitoring Division",
    description: "Oversees annual publication planning and performance monitoring.",
    staff: [
      { name: "Mrs. Champika Ranasinghe", title: "Deputy Commissioner" },
      { name: "Mr. Lasantha Gamage", title: "Assistant Commissioner" },
      { name: "Mrs. Iresha Madushani", title: "Assistant Commissioner" },
    ],
  },
];
