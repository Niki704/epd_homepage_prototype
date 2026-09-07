"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

// Three-part MOE-style hero (01-design.md §4/§5):
// left = headline + mission blurb + CTAs, center = photo w/ text badge,
// right = vertical quick-access tile stack.
// Reuses the Download Archive's top-banner.png as the photo element.
export default function Hero() {
  const t = useTranslations("hero");

  const quickTiles = [
    { label: "Download Books", icon: "📘" },
    { label: "Notices", icon: "📢" },
    { label: "Contact Us", icon: "☎️" },
  ];

  return (
    <section className="bg-gradient-to-b from-brand to-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-[1fr_1fr_220px] gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{t("headline")}</h1>
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

        <motion.div
          className="relative rounded-xl overflow-hidden aspect-video"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Image
            src="/images/hero/top-banner.png"
            alt="EPD"
            fill
            className="object-cover"
            priority
          />
          <span className="absolute bottom-3 left-3 bg-white/90 text-brand text-xs font-semibold rounded px-2.5 py-1">
            Est. 1985
          </span>
        </motion.div>

        <motion.div
          className="hidden lg:flex flex-col gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {quickTiles.map((tile) => (
            <div
              key={tile.label}
              className="bg-white/10 backdrop-blur rounded-lg px-4 py-3 flex items-center gap-3 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <span aria-hidden="true">{tile.icon}</span>
              <span className="text-sm">{tile.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
