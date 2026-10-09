"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Megaphone,
  Pause,
  Phone,
  Play,
} from "lucide-react";
// import Button from "@/components/ui/Button";

// MOE-style hero (01-design.md §4/§5): a full-bleed, auto-advancing photo
// slider fills the section, with a dark gradient overlay for text legibility.
// Headline, subhead and quick-access tiles sit left-aligned over the photo.
//
// Behaviour notes:
// - Slides cross-fade by stacking (the incoming photo fades in on top of the
//   outgoing one), so the white page never shows through mid-transition.
// - Entrance animation is pure CSS (.hero-rise in globals.css), so the
//   headline is visible in the server-rendered HTML and without JavaScript.
// - Autoplay only moves to a slide whose photo has finished loading, and it
//   stops for reduced-motion users, on hover/keyboard focus, and via the
//   pause button (WCAG 2.2.2).
const HERO_IMAGES = [
  "/images/hero/sch-child-edu.jpg",
  "/images/hero/slider5-1536x749-1.jpg",
];
const SLIDE_INTERVAL_MS = 5000;

// Quick-access targets. An `href` starting with "http" is treated as an
// external link (opens in a new tab); anything else is appended to
// `/${locale}`, so use "#section-id" for an on-page anchor or "/path" for
// another page.
const QUICK_TILES = [
  {
    key: "quickDownload",
    href: "https://edupubdownloads.vercel.app/",
    Icon: BookOpen,
  },
  { key: "quickNotices", href: "#news", Icon: Megaphone },
  { key: "quickContact", href: "/contact", Icon: Phone },
] as const;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const prefersReducedMotion = usePrefersReducedMotion();

  const [activeSlide, setActiveSlide] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<ReadonlySet<number>>(
    () => new Set(),
  );
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const markLoaded = (index: number) =>
    setLoadedSlides((prev) =>
      prev.has(index) ? prev : new Set(prev).add(index),
    );

  const autoplayPaused =
    prefersReducedMotion || userPaused || hovered || focused;

  // One timeout per slide (instead of a fixed interval) so a manual click on
  // an indicator restarts the countdown instead of advancing right after it.
  useEffect(() => {
    if (autoplayPaused || HERO_IMAGES.length < 2) return;

    const next = (activeSlide + 1) % HERO_IMAGES.length;
    if (!loadedSlides.has(next)) return; // wait until the next photo is ready

    const id = setTimeout(() => setActiveSlide(next), SLIDE_INTERVAL_MS);
    return () => clearTimeout(id);
  }, [activeSlide, loadedSlides, autoplayPaused]);

  const handlePointerEnter = (event: React.PointerEvent<HTMLElement>) => {
    // Ignore touch: a tap would otherwise leave "hover" stuck on.
    if (event.pointerType === "mouse") setHovered(true);
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    // Only keyboard focus pauses; tapping a dot on mobile should not.
    if (event.target.matches(":focus-visible")) setFocused(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  };

  return (
    <section
      className="relative flex min-h-[clamp(28rem,calc(100svh-6.6rem),45rem)] w-full flex-col justify-end overflow-hidden text-white"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setHovered(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* Background photo slider. `isolate` keeps the slide/overlay z-indexes
          inside this layer so they can never stack above the text. */}
      <div className="absolute inset-0 isolate">
        {HERO_IMAGES.map((src, index) => {
          const isActive = index === activeSlide;
          return (
            <div
              key={src}
              aria-hidden="true"
              className={`absolute inset-0 ${
                isActive
                  ? "z-10 opacity-100 transition-opacity duration-800 motion-reduce:transition-none"
                  : "z-0 opacity-0 transition-opacity duration-0 delay-800 motion-reduce:delay-0"
              }`}
            >
              {/* Decorative: the headline carries the meaning, so alt is empty
                  and screen readers don't announce hidden slides. */}
              <Image
                src={src}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                loading="eager"
                fetchPriority={index === 0 ? "high" : "low"}
                onLoad={() => markLoaded(index)}
              />
            </div>
          );
        })}

        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 z-20 bg-linear-to-t from-black/75 via-black/45 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 pt-10 pb-14 sm:pb-12 lg:pb-16">
        <div className="hero-rise max-w-2xl">
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/85 [text-shadow:0_1px_6px_rgb(0_0_0/0.6)] [&:lang(si)]:tracking-normal [&:lang(ta)]:tracking-normal">
            <span className="h-px w-8 bg-white/60" aria-hidden="true" />
            {t("established")}
          </p>
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
        </div>

        {/* Quick-access tiles sit directly below the hero copy. */}
        <div className="hero-rise hero-rise-delayed mt-8 flex w-full max-w-2xl flex-row flex-wrap gap-3">
          {QUICK_TILES.map(({ key, href, Icon }) => {
            const isExternal = href.startsWith("http");
            const TrailingIcon = isExternal ? ArrowUpRight : ArrowRight;

            return (
              <Link
                key={key}
                href={isExternal ? href : `/${locale}${href}`}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="flex min-w-34 flex-1 items-center gap-3 rounded-lg bg-white/10 px-4 py-3 backdrop-blur transition-colors hover:bg-white/20 ring-1 ring-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                <span className="text-sm text-white">{t(key)}</span>
                {isExternal && (
                  <span className="sr-only">{t("opensInNewTab")}</span>
                )}
                <TrailingIcon
                  className="ml-auto h-4 w-4 text-white/60"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Slide controls: indicator dots + pause/play. Each target is at least
          24px so it is easy to hit; the visible dot stays small. */}
      {HERO_IMAGES.length > 1 && (
        <div className="absolute bottom-1.75 left-1/2 z-10 flex -translate-x-1/2 items-center">
          {HERO_IMAGES.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={t("slideLabel", { number: i + 1 })}
              aria-current={i === activeSlide}
              onClick={() => setActiveSlide(i)}
              className="group flex h-6 min-w-6 items-center justify-center px-0.5 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
            >
              <span
                className={`block h-1.5 rounded-full transition-all ${
                  i === activeSlide
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/50 group-hover:bg-white/75"
                }`}
              />
            </button>
          ))}
          {!prefersReducedMotion && (
            <button
              type="button"
              aria-label={userPaused ? t("playSlides") : t("pauseSlides")}
              onClick={() => setUserPaused((paused) => !paused)}
              className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
            >
              {userPaused ? (
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
