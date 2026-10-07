"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { locales } from "@/i18n.config";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  si: "සිංහල",
  ta: "தமிழ்",
};

const MOBILE_LOCALE_LABELS: Record<string, string> = {
  en: "En",
  si: "සිං",
  ta: "தமி",
};

type ContactType = "phone" | "email";
type PushDirection = "up" | "down";
type AnimationPhase = "idle" | "enter" | "exit";

/**
 * Which half of the element the pointer is in (or has left through).
 * Only the vertical position matters: a pointer that crosses the left or right
 * edge is still classified by whether it is above or below the centre line.
 *
 * The text is "pushed" the way the pointer is travelling:
 * - entering from the bottom half: pointer moves up, so the text slides up
 * - leaving through the bottom half: pointer moves down, so the text slides down
 */
function getPointerSide(
  event: React.MouseEvent<HTMLElement>,
): "top" | "bottom" {
  const bounds = event.currentTarget.getBoundingClientRect();
  return event.clientY < bounds.top + bounds.height / 2 ? "top" : "bottom";
}

export default function TopUtilityBar() {
  const t = useTranslations("utilityBar");
  const locale = useLocale();
  const pathname = usePathname();
  const [activeContact, setActiveContact] = useState<ContactType | null>(null);
  const [pushDirection, setPushDirection] = useState<PushDirection>("up");
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>("idle");

  // Strip the current locale prefix so we can rebuild it for each switch link.
  const pathWithoutLocale =
    pathname.replace(new RegExp(`^/(${locales.join("|")})`), "") || "/";

  const contacts: {
    type: ContactType;
    label: string;
    value: string;
    href: string;
  }[] = [
    {
      type: "phone",
      label: t("hotline"),
      value: t("phone"),
      href: `tel:${t("phone")}`,
    },
    {
      type: "email",
      label: t("ourEmail"),
      value: t("email"),
      href: `mailto:${t("email")}`,
    },
  ];

  const handleContactBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      !event.currentTarget.contains(
        event.relatedTarget ? (event.relatedTarget as Node) : null,
      )
    ) {
      setPushDirection("down");
      setAnimationPhase("exit");
    }
  };

  const handleContactEnter = (
    contact: ContactType,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    setPushDirection(getPointerSide(event) === "top" ? "down" : "up");
    setActiveContact(contact);
    setAnimationPhase("enter");
  };

  const handleContactLeave = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Keep the value showing while the link has keyboard / click focus.
    if (document.activeElement === event.currentTarget) {
      return;
    }

    setPushDirection(getPointerSide(event) === "top" ? "up" : "down");
    setAnimationPhase("exit");
  };

  const handleContactFocus = (contact: ContactType) => {
    // A mouse click focuses the link after hover already ran the enter swap.
    if (activeContact === contact && animationPhase === "enter") {
      return;
    }

    setPushDirection("up");
    setActiveContact(contact);
    setAnimationPhase("enter");
  };

  // Keep the active anchor spanning both columns until the exit swap finishes,
  // otherwise the value would be squeezed into the narrow label column mid-animation.
  const handleContactAnimationEnd = (
    contact: ContactType,
    event: React.AnimationEvent<HTMLSpanElement>,
  ) => {
    if (
      activeContact === contact &&
      animationPhase === "exit" &&
      event.animationName === "utility-slide-out"
    ) {
      setActiveContact(null);
      setAnimationPhase("idle");
    }
  };

  return (
    <div className="bg-brand opacity-85 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="utility-contacts hidden sm:grid"
            onBlur={handleContactBlur}
          >
            <span className="utility-contact-sizer" aria-hidden="true">
              <span>{t("hotline")}</span>
              <span>{t("ourEmail")}</span>
            </span>
            {contacts.map(({ type, label, value, href }) => {
              const isActive = activeContact === type;

              return (
                <a
                  key={type}
                  href={href}
                  className={`utility-contact utility-contact-${type} ${
                    isActive ? "utility-contact-active" : ""
                  }`}
                  onMouseEnter={(event) => handleContactEnter(type, event)}
                  onMouseLeave={handleContactLeave}
                  onFocus={() => handleContactFocus(type)}
                  aria-label={`${label}: ${value}`}
                >
                  <span
                    className="utility-contact-inner"
                    data-phase={isActive ? animationPhase : "idle"}
                    data-push={pushDirection}
                    onAnimationEnd={(event) =>
                      handleContactAnimationEnd(type, event)
                    }
                  >
                    <span
                      className="utility-contact-face utility-contact-front"
                      aria-hidden="true"
                    >
                      {label}
                    </span>
                    <span
                      className="utility-contact-face utility-contact-back"
                      aria-hidden="true"
                    >
                      {value}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
          <Link href={`/${locale}/sitemap`} className="hidden sm:inline-flex">
            {t("siteMap")}
          </Link>
          <a
            href={`tel:${t("phone")}`}
            className="sm:hidden"
            aria-label={`${t("hotline")}: ${t("phone")}`}
          >
            <Phone aria-hidden="true" className="size-4" />
          </a>
          <a
            href={`mailto:${t("email")}`}
            className="sm:hidden"
            aria-label={`${t("ourEmail")}: ${t("email")}`}
          >
            <Mail aria-hidden="true" className="size-4" />
          </a>
        </div>
        <div className="flex items-center gap-3">
          {locales.map((l) => (
            <Link
              key={l}
              href={`/${l}${pathWithoutLocale}`}
              className={
                l === locale
                  ? "font-semibold underline"
                  : "nav-link-underline opacity-80 hover:opacity-100"
              }
            >
              <span className="hidden sm:inline">{LOCALE_LABELS[l]}</span>
              <span className="sm:hidden">{MOBILE_LOCALE_LABELS[l]}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
