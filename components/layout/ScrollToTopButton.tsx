"use client";

import Image from "next/image";
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
      className="group fixed bottom-21 right-5 z-50 flex h-5 w-5 items-center justify-center rounded-full bg-navy shadow-lg transition-colors duration-200 hover:bg-[#c5d9f5] sm:h-11 sm:w-11"
    >
      <Image
        src="/icons/up-arrow.png"
        alt=""
        width={20}
        height={20}
        aria-hidden="true"
        className="transition-opacity duration-200 group-hover:opacity-0"
      />
      <Image
        src="/icons/up-arrow-hover.png"
        alt=""
        width={20}
        height={20}
        aria-hidden="true"
        className="absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
    </button>
  );
}
