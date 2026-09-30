"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BookOpen, Megaphone, Phone } from "lucide-react";
import Button from "@/components/ui/Button";

// Hybrid MOE-style hero (01-design.md §4/§5, revised again):
// Full-bleed auto-advancing photo slider fills the whole section, with a
// dark gradient overlay for text legibility (MOE Sri Lanka convention,
// closer to the "Media Mart" reference). Headline/subhead/CTAs sit
// left-aligned over the photo; quick-access tiles float as a translucent
// glass panel on the right (desktop) / stack below the CTAs (mobile).
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
    <section className="relative w-full min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] overflow-hidden text-white">
      {/* Background photo slider */}
      <div className="absolute inset-0">
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
              sizes="100vw"
              className="object-cover"
              priority={activeSlide === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay for text legibility, matching the Media Mart reference */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex flex-col justify-center">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              {t("headline")}
            </h1>
            <p className="mt-4 text-white/85 max-w-md">{t("subheadline")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#download-archive" variant="secondary">
                {t("ctaPrimary")}
              </Button>
              <Button href="#about" variant="outline">
                {t("ctaSecondary")}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Quick-access tiles: floating glass panel on desktop, stacked below on mobile */}
        <motion.div
          className="flex flex-row lg:flex-col gap-3 mt-10 lg:mt-0 lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 lg:w-56"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {quickTiles.map(({ label, Icon }) => (
            <div
              key={label}
              className="flex-1 lg:flex-none bg-white/10 backdrop-blur rounded-lg px-4 py-3 flex items-center gap-3 hover:bg-white/20 transition-colors cursor-pointer ring-1 ring-white/20"
            >
              <Icon className="h-5 w-5 text-white" aria-hidden="true" />
              <span className="text-sm text-white">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Est. badge */}
      <span className="absolute bottom-4 left-4 z-10 bg-white/90 text-brand text-xs font-semibold rounded px-2.5 py-1">
        Est. 1985
      </span>

      {/* Slide indicators */}
      {HERO_IMAGES.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
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
    </section>
  );
}
