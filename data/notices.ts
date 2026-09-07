// Realistic mock data per Placeholder Data Policy (02-features.md).

export interface NoticeItem {
  id: string;
  title: string;
  date: string; // ISO date
  category: string;
}

export const notices: NoticeItem[] = [
  {
    id: "s1",
    title: "Public Holiday Notice — Book Centres Closed Sept 15",
    date: "2026-09-01",
    category: "Notice",
  },
  {
    id: "s2",
    title: "Correction Notice: Grade 7 History Textbook, p. 42",
    date: "2026-08-18",
    category: "Correction",
  },
  {
    id: "s3",
    title: "Applications Open for School Book Monitor Volunteers",
    date: "2026-08-12",
    category: "Recruitment",
  },
  {
    id: "s4",
    title: "Maintenance Window: Online Archive Sept 10, 12am–4am",
    date: "2026-08-30",
    category: "System",
  },
];
