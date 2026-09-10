"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, animate } from "framer-motion";
import { formatCount } from "@/lib/utils";

// Live counters via Upstash Redis (the one real backend touchpoint — see
// 03-architecture.md). Total Titles Published stays a static prototype
// number pending confirmation of whether it should ever be dynamic.
function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.2,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{formatCount(display)}</span>;
}

export default function StatsCounter() {
  const t = useTranslations("about");
  const s = useTranslations("stats");

  const [stats, setStats] = useState({
    totalViews: 0,
    totalDownloads: 0,
    todayViews: 0,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Increments the view counters, then reads back the fresh totals.
    fetch("/api/counters/views", { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setStats((prev) => ({
            ...prev,
            totalViews: data.totalViews,
            todayViews: data.todayViews,
          }));
        }
      })
      .catch(() => {})
      .finally(() => {
        // Total Downloads isn't returned by the views endpoint, so fetch it separately.
        fetch("/api/counters/stats")
          .then((res) => (res.ok ? res.json() : null))
          .then(
            (data) =>
              data &&
              setStats((prev) => ({
                ...prev,
                totalDownloads: data.totalDownloads,
              })),
          )
          .finally(() => setLoaded(true));
      });
  }, []);

  const items = [
    { label: s("totalTitles"), value: 716 }, //Ensure to update this concurrently with the actual number of titles published in the download archive since the database is not counting it yet.
    { label: s("totalViews"), value: stats.totalViews },
    { label: s("totalDownloads"), value: stats.totalDownloads },
    { label: s("todayViews"), value: stats.todayViews },
  ];

  return (
    <section className="bg-brand text-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-8 text-center">
          {t("statsTitle")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {items.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold">
                {loaded ? <AnimatedNumber value={item.value} /> : "—"}
              </div>
              <p className="text-white/70 text-sm mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
