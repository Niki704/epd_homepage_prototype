import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import DisclaimerBanner from "@/components/sections/DisclaimerBanner";
import BookCategoryGrid from "@/components/sections/BookCategoryGrid";
import QuickServiceTiles from "@/components/sections/QuickServiceTiles";
import AboutUs from "@/components/sections/AboutUs";
import StatsCounter from "@/components/sections/StatsCounter";
import DownloadArchiveCTA from "@/components/sections/DownloadArchiveCTA";
import CommissionerGeneral from "@/components/sections/CommissionerGeneral";
import AdditionalCommissioners from "@/components/sections/AdditionalCommissioners";
import DivisionsSection from "@/components/sections/DivisionsSection";
import NewsAndNotices from "@/components/sections/NewsAndNotices";
import CircularsBanner from "@/components/sections/CircularsBanner";
import SupplementaryBooksBanner from "@/components/sections/SupplementaryBooksBanner";
import SupplementaryBookList from "@/components/sections/SupplementaryBookList";
import BookshopTable from "@/components/sections/BookshopTable";
import PartnerInstitutionsGrid from "@/components/sections/PartnerInstitutionsGrid";
import QuickLinksSidebar from "@/components/sections/QuickLinksSidebar";

// Section order per 01-design.md §5 (v2, MOE-reference update).
// Leadership sections (Commissioner General / Additional Commissioners) and
// Divisions are placed after the Download Archive CTA and before News —
// confirmed features, order among themselves not yet pinned down by
// stakeholder; adjust freely once that's confirmed.
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <DisclaimerBanner />
      <BookCategoryGrid />
      <QuickServiceTiles />
      <AboutUs />
      <StatsCounter />
      <DownloadArchiveCTA />
      <CommissionerGeneral />
      <AdditionalCommissioners />
      <DivisionsSection />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 max-w-7xl mx-auto px-4">
        <NewsAndNotices />
        <QuickLinksSidebar />
      </div>
      <CircularsBanner />
      <SupplementaryBooksBanner />
      <SupplementaryBookList />
      <BookshopTable />
      <PartnerInstitutionsGrid />
    </>
  );
}
