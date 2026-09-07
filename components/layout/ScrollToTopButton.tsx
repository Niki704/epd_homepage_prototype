"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function ScrollToTopButton() {
  const t = useTranslations("accessibility");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label={t("scrollToTop")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full bg-navy text-white shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
