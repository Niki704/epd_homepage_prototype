// Realistic mock data per Placeholder Data Policy (02-features.md).

export interface NewsItem {
  id: string;
  title: string;
  date: string; // ISO date
  category: string;
}

export const news: NewsItem[] = [
  {
    id: "n1",
    title: "2027 Textbook Printing Schedule Released",
    date: "2026-08-20",
    category: "Announcement",
  },
  {
    id: "n2",
    title: "EPD Launches Updated Grade 9 Science Textbook",
    date: "2026-08-05",
    category: "Publication",
  },
  {
    id: "n3",
    title: "Book Distribution Begins for Northern Province Schools",
    date: "2026-07-22",
    category: "Distribution",
  },
  {
    id: "n4",
    title: "EPD Participates in National Education Exhibition",
    date: "2026-07-10",
    category: "Event",
  },
  {
    id: "n5",
    title: "Digital Archive Downloads Cross One Million Milestone",
    date: "2026-06-28",
    category: "Milestone",
  },
];
