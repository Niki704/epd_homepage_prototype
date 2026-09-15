"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

// Floating circular accessibility button, bottom-right (MOE pattern).
// Prototype stub: wire up real font-size/contrast controls during build-out.
export default function AccessibilityWidget() {
  const t = useTranslations("accessibility");

  return (
    <button
      type="button"
      aria-label={t("widgetLabel")}
      className="fixed bottom-5 right-5 z-50 flex h-5 w-5 items-center justify-center rounded-full sm:h-11 sm:w-11 border-2 border-brand/50 bg-transparent shadow-lg transition-colors hover:bg-slate-100"
    >
      <Image
        src="/icons/accessibility_02.png"
        alt="Accessibility_Options"
        width={32}
        height={32}
        aria-hidden="true"
      />
    </button>
  );
}
