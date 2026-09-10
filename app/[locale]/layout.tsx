import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  Noto_Sans,
  Noto_Sans_Sinhala,
  Noto_Sans_Tamil,
} from "next/font/google";
import { locales, type Locale } from "@/i18n.config";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import TopUtilityBar from "@/components/layout/TopUtilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccessibilityWidget from "@/components/layout/AccessibilityWidget";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import {
  getAlternateLocaleUrls,
  getLocaleSeo,
  getLocaleUrl,
  siteName,
  siteUrl,
} from "@/lib/seo";

const notoLatin = Noto_Sans({
  subsets: ["latin"],
  variable: "--epd-font-latin",
  display: "swap",
});
const notoSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  variable: "--epd-font-sinhala",
  display: "swap",
});
const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--epd-font-tamil",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const typedLocale = locale as Locale;
  const seo = getLocaleSeo(typedLocale);
  const alternateLanguages = getAlternateLocaleUrls();

  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    applicationName: siteName,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    category: "government",
    alternates: {
      canonical: getLocaleUrl(typedLocale),
      languages: alternateLanguages,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url: getLocaleUrl(typedLocale),
      siteName,
      title: seo.title,
      description: seo.description,
      locale: seo.ogLocale,
      alternateLocale: locales
        .filter((candidate) => candidate !== typedLocale)
        .map((candidate) => getLocaleSeo(candidate).ogLocale),
      images: [
        {
          url: "/images/hero/top-banner.png",
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/images/hero/top-banner.png"],
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <div
      lang={locale}
      className={`${notoLatin.variable} ${notoSinhala.variable} ${notoTamil.variable}`}
    >
      <div className="font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <TopUtilityBar />
            <Header />
            <main>{children}</main>
            <Footer />
            <AccessibilityWidget />
            <ScrollToTopButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </div>
    </div>
  );
}
