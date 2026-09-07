import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Noto_Sans, Noto_Sans_Sinhala, Noto_Sans_Tamil } from "next/font/google";
import { locales, type Locale } from "@/i18n.config";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import TopUtilityBar from "@/components/layout/TopUtilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccessibilityWidget from "@/components/layout/AccessibilityWidget";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

const notoLatin = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});
const notoSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  variable: "--font-sinhala",
  display: "swap",
});
const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Educational Publications Department | Sri Lanka",
  description:
    "Official homepage prototype of the Educational Publications Department (EPD), Sri Lanka.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
    <html
      lang={locale}
      className={`${notoLatin.variable} ${notoSinhala.variable} ${notoTamil.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
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
      </body>
    </html>
  );
}
