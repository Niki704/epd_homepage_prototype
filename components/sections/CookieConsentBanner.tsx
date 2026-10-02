"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  getConsent,
  setConsent as persistConsent,
  type ConsentChoice,
} from "@/lib/cookies/consent";

type ConsentState = ConsentChoice | "undecided";

export default function CookieConsentBanner() {
  const t = useTranslations("cookiebanner");
  const [consent, setConsentState] = useState<ConsentState | null>(null);

  useEffect(() => {
    const storedConsent = getConsent();

    if (storedConsent) {
      setConsentState(storedConsent);
      return;
    }

    setConsentState("undecided");
  }, []);

  const chooseConsent = (choice: Exclude<ConsentChoice, "undecided">) => {
    persistConsent(choice);
    setConsentState(choice);
  };

  return (
    <AnimatePresence>
      {consent === "undecided" && (
        <motion.aside
          role="region"
          aria-labelledby="cookie-banner-title"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{
            opacity: 0,
            x: "100%",
            transition: { duration: 0.25, ease: "easeIn" },
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="fixed bottom-14 rounded right-4 z-50 w-[calc(100%-2rem)] max-w-md border border-brand bg-white p-5 text-gray-900 shadow-2xl sm:right-5 sm:p-6"
        >
          <button
            type="button"
            onClick={() => chooseConsent("accepted")}
            aria-label={t("close")}
            className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center text-brand transition-colors hover:text-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <X aria-hidden="true" size={21} strokeWidth={2.5} />
          </button>
          <h2
            id="cookie-banner-title"
            className="pr-10 text-xl font-bold leading-tight text-brand"
          >
            {t("heading")}
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-700">{t("text")}</p>
          <div className="mt-5 flex flex-wrap gap-5">
            <button
              type="button"
              onClick={() => chooseConsent("accepted")}
              className="min-h-11 cursor-pointer border border-brand bg-brand px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {t("accept")}
            </button>
            <button
              type="button"
              onClick={() => chooseConsent("rejected")}
              className="min-h-11 cursor-pointer border-0 bg-transparent px-0 py-2 text-sm font-bold text-brand transition-colors hover:text-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {t("reject")}
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
