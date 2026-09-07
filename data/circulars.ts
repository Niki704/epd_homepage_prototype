// Realistic mock data per Placeholder Data Policy (02-features.md).

export interface Circular {
  id: string;
  title: string;
  date: string; // ISO date
  refNo: string;
}

export const circulars: Circular[] = [
  {
    id: "c1",
    title: "Procurement Notice — Paper Supply Tender 2026/07",
    date: "2026-08-25",
    refNo: "EPD/PROC/2026/07",
  },
  {
    id: "c2",
    title: "Circular on Revised Textbook Distribution Timelines",
    date: "2026-08-14",
    refNo: "EPD/CIRC/2026/19",
  },
  {
    id: "c3",
    title: "Tender: Binding & Finishing Services",
    date: "2026-07-30",
    refNo: "EPD/PROC/2026/06",
  },
];
