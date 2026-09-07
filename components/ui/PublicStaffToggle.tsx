"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

// Display-only local preference — no auth, no gated content behind it.
// Matches the exact pattern used on the Download Archive sibling prototype.
export default function PublicStaffToggle() {
  const t = useTranslations("nav");
  const [mode, setMode] = useState<"public" | "staff">("public");

  return (
    <div className="inline-flex rounded-full border border-white/30 p-0.5 text-xs">
      <button
        type="button"
        onClick={() => setMode("public")}
        className={
          mode === "public"
            ? "rounded-full bg-white text-brand px-3 py-1 font-medium"
            : "rounded-full px-3 py-1 text-white/80"
        }
      >
        {t("publicToggle")}
      </button>
      <button
        type="button"
        onClick={() => setMode("staff")}
        className={
          mode === "staff"
            ? "rounded-full bg-white text-brand px-3 py-1 font-medium"
            : "rounded-full px-3 py-1 text-white/80"
        }
      >
        {t("staffToggle")}
      </button>
    </div>
  );
}
