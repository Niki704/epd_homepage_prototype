"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

// Same dismissible disclaimer pattern as the Download Archive sibling
// prototype (01-design.md §6) — same copy, same dismiss behavior.
export default function DisclaimerBanner() {
  const t = useTranslations("disclaimer");
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-amber-50 border-b border-amber-200 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-amber-800 text-sm">
            <span>⚠️ {t("text")}</span>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="font-medium hover:underline"
            >
              {t("dismiss")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
