"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BookOpen, Megaphone, Phone } from "lucide-react";
import Button from "@/components/ui/Button";

// Hybrid MOE-style hero (01-design.md §4/§5, revised):
// left = headline + mission blurb + CTAs, center = auto-advancing photo
// slider w/ fixed text badge, right = vertical quick-access tile stack.
// Structure follows MOE Singapore's clean 3-column layout; the photo slot
// keeps real photography (MOE Sri Lanka convention) instead of an
// illustration, auto-cycling between the two supplied hero images.
const HERO_IMAGES = [
  "/images/hero/sch-child-edu.jpg",
  "/images/hero/slider5-1536x749-1.jpg",
];
const SLIDE_INTERVAL_MS = 5000;

export default function Hero() {
  const t = useTranslations("hero");
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const quickTiles = [
    { label: "Download Books", Icon: BookOpen },
    { label: "Notices", Icon: Megaphone },
    { label: "Contact Us", Icon: Phone },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-[1fr_1fr_220px] gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-brand">
            {t("headline")}
          </h1>
          <p className="mt-4 text-slate-600 max-w-md">{t("subheadline")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="#download-archive" variant="secondary">
              {t("ctaPrimary")}
            </Button>
            <Button href="#about" variant="outline">
              {t("ctaSecondary")}
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative rounded-xl overflow-hidden aspect-video shadow-sm ring-1 ring-slate-200"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={HERO_IMAGES[activeSlide]}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={HERO_IMAGES[activeSlide]}
                alt="Students in an EPD-supported Sri Lankan classroom"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={activeSlide === 0}
              />
            </motion.div>
          </AnimatePresence>

          <span className="absolute bottom-3 left-3 z-10 bg-white/90 text-brand text-xs font-semibold rounded px-2.5 py-1">
            Est. 1985
          </span>

          {HERO_IMAGES.length > 1 && (
            <div className="absolute bottom-3 right-3 z-10 flex gap-1.5">
              {HERO_IMAGES.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Show slide ${i + 1}`}
                  onClick={() => setActiveSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeSlide
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          className="hidden lg:flex flex-col gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {quickTiles.map(({ label, Icon }) => (
            <div
              key={label}
              className="bg-slate-50 rounded-lg px-4 py-3 flex items-center gap-3 hover:bg-slate-100 transition-colors cursor-pointer ring-1 ring-slate-200"
            >
              <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
              <span className="text-sm text-slate-700">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
