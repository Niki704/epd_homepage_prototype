// Realistic mock data per Placeholder Data Policy (02-features.md).
// These are PAID supplementary books, distinct from the free Download
// Archive titles. Modal fields confirmed in 02-features.md §14.

export interface SupplementaryBook {
  id: string;
  title: string;
  cover: string;
  price: number; // LKR
  author: string;
  printedYear: number;
  inStock: boolean;
}

export const supplementaryBooks: SupplementaryBook[] = [
  {
    id: "grade-6-maths-workbook",
    title: "Grade 6 Mathematics Workbook",
    cover: "/images/books/grade-6-maths-workbook.jpg",
    price: 350,
    author: "Dr. W.M. Karunaratne",
    printedYear: 2025,
    inStock: true,
  },
  {
    id: "grade-8-science-guide",
    title: "Grade 8 Science Practical Guide",
    cover: "/images/books/grade-8-science-guide.jpg",
    price: 420,
    author: "Mrs. S.K. Abeysekara",
    printedYear: 2025,
    inStock: true,
  },
  {
    id: "grade-10-english-companion",
    title: "Grade 10 English Language Companion",
    cover: "/images/books/grade-10-english-companion.jpg",
    price: 380,
    author: "Mr. D.M. Wickramasinghe",
    printedYear: 2024,
    inStock: false,
  },
  {
    id: "grade-5-scholarship-model-papers",
    title: "Grade 5 Scholarship Model Papers",
    cover: "/images/books/grade-5-scholarship-model-papers.jpg",
    price: 290,
    author: "EPD Curriculum Panel",
    printedYear: 2026,
    inStock: true,
  },
];
