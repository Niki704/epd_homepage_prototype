"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, Megaphone, Phone } from "lucide-react";
// import Button from "@/components/ui/Button";

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
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const preloadImages = HERO_IMAGES.map(
      (src) =>
        new Promise<void>((resolve) => {
          const image = new window.Image();

          const finish = () => resolve();
          image.onload = () => {
            if (typeof image.decode === "function") {
              image
                .decode()
                .catch(() => undefined)
                .finally(finish);
            } else {
              finish();
            }
          };
          image.onerror = finish;
          image.src = src;
        }),
    );

    Promise.all(preloadImages).then(() => {
      if (!cancelled) setImagesReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!imagesReady) return;

    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [imagesReady]);

  const quickTiles = [
    { label: "Download Books", Icon: BookOpen },
    { label: "Notices", Icon: Megaphone },
    { label: "Contact Us", Icon: Phone },
  ];

  return (
    <section className="relative h-[calc(100svh-6rem)] max-h-180 w-full overflow-hidden text-white sm:h-[calc(100svh-6rem)] lg:h-[calc(100svh-6.25rem)]">
      {/* Background photo slider */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((src, index) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: index === activeSlide ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={src}
              alt="Students in an EPD-supported Sri Lankan classroom"
              fill
              sizes="100vw"
              className="object-cover"
              loading="eager"
            />
          </motion.div>
        ))}

        {/* Dark overlay for text legibility, matching the Media Mart reference */}
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/45 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-10 sm:pb-12 lg:pb-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              {t("headline")}
            </h1>
            <p className="mt-4 text-white/85 max-w-md">{t("subheadline")}</p>
            {/*
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#download-archive" variant="secondary">
                {t("ctaPrimary")}
              </Button>
              <Button href="#about" variant="outline">
                {t("ctaSecondary")}
              </Button>
            </div>
            */}
          </motion.div>
        </div>

        {/* Quick-access tiles sit directly below the hero copy. */}
        <motion.div
          className="mt-8 flex w-full max-w-2xl flex-row flex-wrap gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {quickTiles.map(({ label, Icon }) => (
            <div
              key={label}
              className="flex min-w-34 flex-1 items-center gap-3 rounded-lg bg-white/10 px-4 py-3 backdrop-blur transition-colors hover:bg-white/20 ring-1 ring-white/20"
            >
              <Icon className="h-5 w-5 text-white" aria-hidden="true" />
              <span className="text-sm text-white">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Est. badge */}
      <span className="absolute bottom-4 right-4 z-10 rounded bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand">
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
