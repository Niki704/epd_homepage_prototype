"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const HIGHLIGHT_IMAGE = "/images/hero/1-English-Post-910x1024.jpg";

const highlights = [
  {
    id: "textbook-schedule",
    title: "2027 Textbook Printing Schedule Released",
    excerpt:
      "The Educational Publications Department has released the planned printing schedule for textbooks supporting the next academic year.",
  },
  {
    id: "grade-nine-science",
    title: "Updated Grade 9 Science Textbook Introduced",
    excerpt:
      "A refreshed Grade 9 Science textbook brings clearer activities and updated examples to classrooms across Sri Lanka.",
  },
  {
    id: "northern-distribution",
    title: "Book Distribution Begins for Northern Province Schools",
    excerpt:
      "Distribution teams have started delivering learning materials to schools in the Northern Province ahead of the new term.",
  },
  {
    id: "education-exhibition",
    title: "EPD at the National Education Exhibition",
    excerpt:
      "Visit the EPD display to explore new publications, supplementary materials, and the growing digital book archive.",
  },
  {
    id: "digital-archive",
    title: "Digital Archive Reaches One Million Downloads",
    excerpt:
      "Teachers and students continue to access freely available textbooks and learning resources through the EPD archive.",
  },
  {
    id: "reading-programme",
    title: "New Reading Programme Resources Available",
    excerpt:
      "A collection of reading programme materials is now available to support schools, teachers, and young readers.",
  },
];

export default function EpdHighlights() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    const updateVisibleCards = () => {
      setVisibleCards(window.innerWidth >= 768 ? 3 : 1);
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const lastIndex = Math.max(highlights.length - visibleCards, 0);
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < lastIndex;

  const goToPrevious = () => {
    setActiveIndex((index) => Math.max(index - 1, 0));
  };

  const goToNext = () => {
    setActiveIndex((index) => Math.min(index + 1, lastIndex));
  };

  useEffect(() => {
    setActiveIndex((index) => Math.min(index, lastIndex));
  }, [lastIndex]);

  return (
    <section
      className="overflow-hidden bg-white px-4 py-12 sm:py-14 lg:py-16"
      aria-labelledby="epd-highlights-title"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="epd-highlights-title"
          className="text-center text-3xl font-bold text-brand sm:text-4xl"
        >
          Highlights
        </h2>

        <div className="relative mt-10 px-0 sm:px-12 lg:px-14">
          <button
            type="button"
            aria-label="Previous highlights"
            title="Previous highlights"
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-md transition-colors hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-35 sm:flex"
          >
            <ArrowLeft aria-hidden="true" size={21} />
          </button>

          <button
            type="button"
            aria-label="Next highlights"
            title="Next highlights"
            onClick={goToNext}
            disabled={!canGoNext}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-md transition-colors hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-35 sm:flex"
          >
            <ArrowRight aria-hidden="true" size={21} />
          </button>

          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: `${-(activeIndex * (100 / visibleCards))}%`,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
            >
              {highlights.map((highlight) => (
                <article
                  key={highlight.id}
                  className="w-full shrink-0 px-0 md:w-1/3 md:px-2.5"
                >
                  <div className="h-full overflow-hidden border border-gray-200 bg-white shadow-sm">
                    <Image
                      src={HIGHLIGHT_IMAGE}
                      alt="Educational Publications Department highlight"
                      width={910}
                      height={1024}
                      className="aspect-[16/9] w-full object-cover"
                    />
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg font-semibold leading-7 text-[#0869e8] sm:text-xl">
                        {highlight.title}
                      </h3>
                      <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
                        {highlight.excerpt}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-center gap-2.5">
          {highlights.map((highlight, index) => (
            <button
              key={highlight.id}
              type="button"
              aria-label={`Show highlight ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(Math.min(index, lastIndex))}
              className={`h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                index === activeIndex
                  ? "bg-brand"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-3 sm:hidden">
          <button
            type="button"
            aria-label="Previous highlights"
            title="Previous highlights"
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-md transition-colors hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowLeft aria-hidden="true" size={19} />
          </button>
          <button
            type="button"
            aria-label="Next highlights"
            title="Next highlights"
            onClick={goToNext}
            disabled={!canGoNext}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-md transition-colors hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowRight aria-hidden="true" size={19} />
          </button>
        </div>
      </div>
    </section>
  );
}
