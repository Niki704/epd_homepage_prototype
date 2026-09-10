"use client";

import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import { ExternalLink } from "lucide-react";

// Hero-style featured CTA card (NIE's Digital Library block pattern),
// linking to the live, approved sibling prototype.
export default function DownloadArchiveCTA() {
  const t = useTranslations("downloadArchiveCta");

  return (
    <section id="download-archive" className="max-w-7xl mx-auto px-4 pb-14">
      <div className="bg-gradient-to-r from-brand to-brand-light text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
          <p className="text-white/85 max-w-xl">{t("description")}</p>
        </div>
        <Button
          href="https://epd-download-prototype.vercel.app"
          variant="secondary"
          className="shrink-0"
          onClick={() => {
            fetch("/api/counters/downloads", { method: "POST" }).catch(
              () => {},
            );
          }}
        >
          {t("button")}
          <ExternalLink className="ml-1.5 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
