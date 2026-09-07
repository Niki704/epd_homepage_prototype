"use client";

import { useTranslations } from "next-intl";

// Floating circular accessibility button, bottom-right (MOE pattern).
// Prototype stub: wire up real font-size/contrast controls during build-out.
export default function AccessibilityWidget() {
  const t = useTranslations("accessibility");

  return (
    <button
      type="button"
      aria-label={t("widgetLabel")}
      className="fixed bottom-24 right-5 z-50 h-12 w-12 rounded-full bg-brand text-white shadow-lg flex items-center justify-center hover:bg-brand-light transition-colors"
    >
      <span aria-hidden="true">♿</span>
    </button>
  );
}
