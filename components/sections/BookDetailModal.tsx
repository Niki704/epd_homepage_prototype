"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import type { SupplementaryBook } from "@/data/books";

export default function BookDetailModal({
  book,
  onClose,
}: {
  book: SupplementaryBook | null;
  onClose: () => void;
}) {
  const t = useTranslations("supplementaryBooks");

  return (
    <Modal open={!!book} onClose={onClose}>
      {book && (
        <div>
          <div className="relative h-40 w-28 mx-auto rounded overflow-hidden bg-gray-100 mb-4">
            <Image src={book.cover} alt={book.title} fill className="object-cover" />
          </div>
          <h3 className="font-semibold text-lg text-center text-gray-900 mb-4">{book.title}</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-400">{t("author")}</dt>
              <dd className="text-gray-800">{book.author}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-400">{t("price")}</dt>
              <dd className="text-gray-800">Rs. {book.price.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-400">{t("printedYear")}</dt>
              <dd className="text-gray-800">{book.printedYear}</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-gray-400">{t("availability")}</dt>
              <dd>
                <Badge tone={book.inStock ? "green" : "red"}>
                  {book.inStock ? t("inStock") : t("outOfStock")}
                </Badge>
              </dd>
            </div>
          </dl>
        </div>
      )}
    </Modal>
  );
}
