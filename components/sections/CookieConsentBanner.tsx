"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import {
  getConsent,
  setConsent as persistConsent,
  type ConsentChoice,
} from "@/lib/cookies/consent";

// "dismissed" = closed with Esc for this page view only; nothing is stored.
type ConsentState = ConsentChoice | "undecided" | "dismissed";

export default function CookieConsentBanner() {
  const t = useTranslations("cookiebanner");
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [consent, setConsentState] = useState<ConsentState | null>(null);

  const isOpen = consent === "undecided";
  const slideX = reduceMotion ? 0 : "100%";

  useEffect(() => {
    const storedConsent = getConsent();

    if (storedConsent) {
      setConsentState(storedConsent);
      return;
    }

    setConsentState("undecided");
  }, []);

  // Open as a native modal: top layer, rest of the page becomes inert,
  // focus is contained. The dialog itself gets focus, so Enter can't
  // trigger the close button by accident.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog || dialog.open) return;

    dialog.showModal();
    dialog.focus();
  }, [isOpen]);

  const chooseConsent = (choice: Exclude<ConsentChoice, "undecided">) => {
    persistConsent(choice);
    setConsentState(choice);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <dialog
          key="cookie-consent"
          ref={dialogRef}
          tabIndex={-1}
          aria-labelledby="cookie-banner-title"
          onCancel={(event) => {
            // Esc: let Framer Motion play the exit instead of an instant close.
            event.preventDefault();
            setConsentState("dismissed");
          }}
          className="fixed inset-0 m-0 size-full max-h-none max-w-none overflow-hidden border-0 bg-transparent p-0 backdrop:bg-transparent focus:outline-none"
        >
          <div
            aria-hidden="true"
            className={`absolute inset-0 bg-black/40 transition-opacity motion-reduce:transition-none ${
              isOpen
                ? "opacity-100 duration-300 ease-out starting:opacity-0"
                : "opacity-0 delay-100 duration-300 ease-in-out"
            }`}
          />
          <motion.div
            initial={{ opacity: 0, x: slideX }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: slideX,
              transition: { duration: 0.4, ease: "easeIn" },
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute bottom-14 right-4 w-[calc(100%-2rem)] max-w-md rounded border border-brand bg-white p-5 text-gray-900 shadow-2xl sm:right-5 sm:p-6"
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
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => chooseConsent("accepted")}
                className="min-h-11 flex-1 cursor-pointer rounded-md border border-brand bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:flex-none"
              >
                {t("accept")}
              </button>
              <button
                type="button"
                onClick={() => chooseConsent("rejected")}
                className="min-h-11 flex-1 cursor-pointer rounded-md border border-brand bg-white px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand/10 active:bg-brand/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:flex-none"
              >
                {t("reject")}
              </button>
            </div>
          </motion.div>
        </dialog>
      )}
    </AnimatePresence>
  );
}
