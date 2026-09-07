"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import BookDetailModal from "@/components/sections/BookDetailModal";
import { supplementaryBooks, type SupplementaryBook } from "@/data/books";

// Clicking a book opens a modal with full detail — first modal/popup
// pattern on the homepage prototype (02-features.md §14).
export default function SupplementaryBookList() {
  const t = useTranslations("supplementaryBooks");
  const [selected, setSelected] = useState<SupplementaryBook | null>(null);

  return (
    <section id="supplementary-books" className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold text-brand mb-6">{t("title")}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {supplementaryBooks.map((book) => (
          <button
            key={book.id}
            type="button"
            onClick={() => setSelected(book)}
            className="text-left bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[3/4] bg-gray-100">
              <Image src={book.cover} alt={book.title} fill className="object-cover" />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-gray-800 line-clamp-2">{book.title}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-brand font-semibold text-sm">Rs. {book.price}</span>
                <Badge tone={book.inStock ? "green" : "red"}>
                  {book.inStock ? t("inStock") : t("outOfStock")}
                </Badge>
              </div>
            </div>
          </button>
        ))}
      </div>

      <BookDetailModal book={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
