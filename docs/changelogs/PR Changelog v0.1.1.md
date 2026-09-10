# EPD Homepage Prototype

## Public Change Log and Pull Request Notes

**Release:** `v0.1.1`  
**Project:** Educational Publications Department Homepage Prototype  
**Status:** Prototype release  
**Source:** Consolidated commit history for the `v0.1.1` update

## Release Overview

Version `0.1.1` improves the EPD homepage prototype across backend integration, runtime reliability, architecture, localization, styling, SEO, analytics, and header usability.

The release includes:

- Live Redis-backed view and download counters.
- Defensive behavior when Redis credentials are unavailable.
- Tailwind CSS v4 migration.
- Improved locale routing and localized navigation.
- Security headers and linting improvements.
- Comprehensive technical SEO support.
- Vercel Speed Insights integration.
- Updated public-facing utility bar and header.
- Removal of the unused public/staff toggle.
- Replacement of the mock logo with the official combined logo asset.
- Automatic application-version display from `package.json`.

## Commit 1

### `feat(fix): Linked redis database for live counting. Wired Counters and Download Buttons for seamless integration.`

### Summary

Connected the homepage counter features to the Redis backend and wired the relevant user actions to the counter API routes.

### Changes

- Connected the application to Upstash Redis for live counter storage.
- Added live view counting for homepage visits.
- Added daily view counting.
- Added total download counting.
- Wired the download/archive action to the download counter endpoint.
- Added counter reads for displaying current totals.
- Integrated counter behavior into the homepage statistics section.
- Added graceful handling for counter requests so the UI can continue operating when the backend is unavailable.

### Affected Areas

- `lib/redis.ts`
- `app/api/counters/views/route.ts`
- `app/api/counters/downloads/route.ts`
- `app/api/counters/stats/route.ts`
- `components/sections/StatsCounter.tsx`
- `components/sections/DownloadArchiveCTA.tsx`
- `.env.local.example`

## Commit 2

### `feat(fix): Optimized EPD homepage prototype and add architecture documentation`

### Summary

Improved runtime reliability, localization, security headers, routing, lint configuration, and project documentation for the EPD homepage prototype.

### File: `lib/redis.ts`

- Made Redis initialization conditional on the presence of `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
- Added zero-value fallbacks when Redis credentials are unavailable.
- Prevented the application from failing during startup without Redis configuration.
- Preserved view, download, and daily counter behavior when Redis is configured.

### File: `next.config.ts`

- Disabled the Next.js powered-by response header.
- Added the `X-Frame-Options` security header.
- Added the `X-Content-Type-Options` security header.
- Added the `Referrer-Policy` security header.
- Added the `Permissions-Policy` security header.
- Applied headers through Next.js configuration so API routes receive them too.

### File: `middleware.ts`

- Removed the unused `NextResponse` import.
- Preserved locale routing and baseline security-header behavior.

### File: `components/layout/Footer.tsx`

- Added the `contact` anchor ID to the footer.
- Fixed existing navigation links pointing to `#contact`.
- Reformatted footer navigation markup for readability.

### File: `components/layout/Header.tsx`

- Removed the duplicate `bg-brand-dark` utility class.
- Preserved the intended `bg-brand` header styling.

### File: `components/sections/StatsCounter.tsx`

- Replaced the hardcoded “Total Titles Published” label with the localized `stats.totalTitles` translation key.
- Improved formatting and indentation of the stats state and effect logic.

### File: `package.json`

- Replaced the deprecated `next lint` command with `eslint .`.
- Added the `@tailwindcss/postcss` development dependency.
- Updated Tailwind-related development dependency configuration.

### File: `package-lock.json`

- Updated the locked dependency tree to match the package configuration changes.

### File: `.eslintignore`

- Added exclusions for `.next`, `next-env.d.ts`, and `node_modules`.
- Prevented generated files and dependencies from causing lint errors.

### File: `.eslintrc.json`

- Added Next.js Core Web Vitals and TypeScript ESLint configurations.
- Enabled the ESLint configuration required by the new `eslint .` command.

### File: `app/[locale]/sitemap/page.tsx`

- Added a localized sitemap page for English, Sinhala, and Tamil routes.
- Added navigation links for About, Divisions, News, Bookshops, and Contact.
- Resolved the previously missing localized sitemap route.

### File: `docs/EPD-Homepage-Prototype-Draft_Version_v0.1.0.md`

- Added a complete project architecture review.
- Documented the responsibilities of every major directory.
- Documented parent-child component relationships.
- Documented locale routing and translation loading.
- Documented static data and Redis API flows.
- Documented confirmed bugs, incomplete features, and security risks.
- Documented production-readiness recommendations.
- Documented all fixes applied during the review.
- Documented validation commands and results.

### Validation

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

All validation checks completed successfully.

## Commit 3

### `feat(fix): migrate Tailwind and fix locale routing`

### Changes

- Migrated Tailwind CSS to the v4 CSS-first configuration model.
- Updated PostCSS to use `@tailwindcss/postcss`.
- Moved custom colors and font variables into `app/globals.css`.
- Removed the obsolete `tailwind.config.ts` configuration file.
- Added CSS module declarations for TypeScript compatibility.
- Fixed root layout document tags for invalid routes.
- Preserved locale-specific providers and font variables.
- Updated `next-intl` request handling to use `requestLocale`.
- Added missing `nav.siteMap` translations for all supported locales.
- Added the application favicon.
- Refined top utility bar styling.
- Refined language-switching links.

### Affected Areas

- `app/globals.css`
- `app/layout.tsx`
- `app/[locale]/layout.tsx`
- `i18n/request.ts`
- `i18n.config.ts`
- `postcss.config.js`
- `package.json`
- `package-lock.json`
- `messages/en.json`
- `messages/si.json`
- `messages/ta.json`
- `app/favicon.ico`
- `globals.d.ts`
- `tailwind.config.ts` removed
- `components/layout/TopUtilityBar.tsx`

## Commit 4

### `feat: implement comprehensive SEO foundation for localized EPD website`

### Summary

Added professional technical SEO support across the Next.js application, including localized metadata, canonical URLs, `hreflang` links, structured data, sitemap generation, robots directives, web app manifest support, social sharing metadata, and SEO documentation.

### File: `lib/seo.ts`

- Added centralized SEO configuration and URL utilities.
- Added configurable `NEXT_PUBLIC_SITE_URL` support.
- Added a fallback canonical origin for local builds.
- Added localized English, Sinhala, and Tamil SEO titles.
- Added localized meta descriptions.
- Added Open Graph locale mappings.
- Added canonical and alternate-language URL helpers.
- Ensured generated URLs preserve the `https://` protocol correctly.

### File: `app/[locale]/layout.tsx`

- Replaced generic metadata with locale-aware `generateMetadata`.
- Added localized page titles and descriptions.
- Added `metadataBase` configuration.
- Added canonical URLs for each locale.
- Added `hreflang` alternate-language links for English, Sinhala, and Tamil.
- Added author, creator, publisher, application, and category metadata.
- Added index/follow directives for search engines.
- Added Googlebot image, snippet, and video preview directives.
- Added Open Graph website metadata.
- Added Open Graph image metadata.
- Added Twitter `summary_large_image` metadata.
- Added favicon metadata.

### File: `app/[locale]/page.tsx`

- Added server-rendered JSON-LD structured data.
- Added `GovernmentOrganization` schema for the Educational Publications Department.
- Added Ministry of Education parent organization information.
- Added organization logo and Sri Lanka service area metadata.
- Added `WebSite` schema with publisher relationships.
- Added `WebPage` schema with localized URL, language, title, and description.
- Added localized JSON-LD identifiers for each locale.

### File: `app/[locale]/sitemap/page.tsx`

- Added page-specific SEO metadata for localized sitemap pages.
- Added unique sitemap page titles and descriptions.
- Added canonical URLs for `/en/sitemap`, `/si/sitemap`, and `/ta/sitemap`.
- Added `hreflang` links for localized sitemap pages.

### File: `app/sitemap.ts`

- Added a generated XML sitemap at `/sitemap.xml`.
- Added English, Sinhala, and Tamil homepage URLs.
- Added localized sitemap page URLs.
- Added `lastModified` values.
- Added `changeFrequency` values.
- Added route priorities.
- Excluded API and non-indexable application routes.

### File: `app/robots.ts`

- Added generated robots directives at `/robots.txt`.
- Allowed crawlers to access public localized routes.
- Disallowed `/api/`.
- Disallowed `/_next/`.
- Added the absolute sitemap URL.
- Added the canonical host value.

### File: `app/manifest.ts`

- Added a generated web app manifest at `/manifest.webmanifest`.
- Added the official application name and short name.
- Added the application description.
- Added `/en` as the default start URL.
- Added standalone display configuration.
- Added theme and background colors.
- Added favicon application icon configuration.

### File: `.env.local.example`

- Added `NEXT_PUBLIC_SITE_URL` configuration.
- Documented the canonical public HTTPS origin used by metadata, sitemap, robots, manifest, and JSON-LD generation.

### File: `docs/SEO v1.md`

- Documented the complete SEO implementation.
- Documented every modified SEO file.
- Documented metadata, canonical, `hreflang`, Open Graph, Twitter, and JSON-LD behavior.
- Documented sitemap, robots, and manifest routes.
- Documented production deployment requirements.
- Documented Search Console and Bing Webmaster Tools setup.
- Documented SEO limitations and recommended future improvements.
- Documented validation results and known pre-launch requirements.

### Validation

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- Verified `/sitemap.xml`.
- Verified `/robots.txt`.
- Verified `/manifest.webmanifest`.
- Verified canonical metadata on `/en`.
- Verified `hreflang` metadata on `/en`.
- Verified Open Graph metadata.
- Verified JSON-LD structured data.

## Commit 5

### `feat: Add vercel's Speed Insights.`

### Changes

- Added the `@vercel/speed-insights` dependency.
- Prepared the application for Vercel Speed Insights integration.
- Enabled collection of real-user performance information when deployed with the supported Vercel integration.
- Added a foundation for monitoring Core Web Vitals and frontend performance trends.

### Affected Areas

- `package.json`
- `package-lock.json`
- Application root/layout integration, where applicable.

## Commit 6

### `feat: UI Changes`

### Changes

- Added the telephone number to the Top Utility Bar.
- Added the email address to the Top Utility Bar.
- Added localized utility-bar contact links using `tel:` and `mailto:` URLs.
- Removed `PublicStaffToggle` from the header because the site is public-only.
- Deleted the unused `PublicStaffToggle` component.
- Removed the unused public/staff translation keys from the locale dictionaries.

### Affected Areas

- `components/layout/TopUtilityBar.tsx`
- `components/layout/Header.tsx`
- `components/ui/PublicStaffToggle.tsx` removed
- `messages/en.json`
- `messages/si.json`
- `messages/ta.json`

## Commit 7

### `feat: UI Changes in Header.`

### Changes

- Replaced the mock logo presentation with the actual combined brand image.
- Updated the header logo to use `/images/main-logo.png`.
- Configured the image dimensions as `751x102` to match the source asset.
- Removed the duplicate department-name text rendered beside the image.
- Preserved the image aspect ratio with responsive sizing.
- Added application-version display in the header.
- Sourced the version from `package.json` so it remains synchronized with the application release version.
- Displayed the current version as `v0.1.1`.
- Added hover scaling to header navigation links.
- Added a contrasting animated underline to header navigation links.
- Updated the underline to draw symmetrically from the center toward both ends.
- Increased underline thickness to `3px`.
- Simplified the hover implementation to reduce flicker and unnecessary transform interactions.

### Affected Areas

- `components/layout/Header.tsx`
- `package.json`
- `public/images/main-logo.png`

## Release Highlights

### Backend and reliability

- Live Redis-backed homepage counters.
- Optional Redis configuration with safe zero-value fallback behavior.
- Counter API integration for views, downloads, and statistics.

### Platform and architecture

- Tailwind CSS v4 CSS-first configuration.
- Improved Next.js root document structure.
- Improved locale routing and `next-intl` request handling.
- Added favicon and CSS module declarations.
- Replaced deprecated lint configuration with ESLint CLI support.

### Localization

- English, Sinhala, and Tamil route support.
- Locale-specific metadata and canonical URLs.
- Localized sitemap routes and navigation labels.
- Improved language-switching utility links.

### SEO and discoverability

- Canonical metadata.
- `hreflang` alternate-language metadata.
- Open Graph metadata.
- Twitter card metadata.
- JSON-LD organization, website, and webpage structured data.
- Generated XML sitemap.
- Generated robots policy.
- Web app manifest.

### UI and branding

- Official combined logo asset in the header.
- Application version badge sourced from `package.json`.
- Public-only header without the staff toggle.
- Telephone and email access in the Top Utility Bar.
- Animated, centered nav underlines with hover scaling.
- Refined header and utility-bar styling.

### Observability

- Added Vercel Speed Insights dependency and integration foundation.

## Known Limitations for `v0.1.1`

- Much of the content remains prototype or placeholder data.
- Redis counter write endpoints require rate limiting before public production use.
- The public/staff toggle was removed; no staff-only workflow is included.
- Sinhala and Tamil content requires native-speaker review.
- Accessibility controls and modal behavior require further production hardening.
- Automated unit, integration, accessibility, and end-to-end tests are still recommended.
- Official production domain configuration is required for canonical SEO URLs.
- Search Console and Bing Webmaster Tools registration must be completed after deployment.

## Pull Request Message

### PR Title

```text
Release v0.1.1: improve reliability, localization, SEO, observability, and public UI
```

### PR Description

```markdown
## Summary

This pull request prepares the EPD Homepage Prototype for the `v0.1.1` release.
It improves live counter integration, runtime reliability, locale routing,
Tailwind configuration, technical SEO, performance observability, and public
header/utility-bar presentation.

## What changed

### Backend and reliability

- Connected view, daily-view, and download counters to Upstash Redis.
- Added safe zero-value behavior when Redis credentials are unavailable.
- Preserved live counter behavior when Redis is configured.
- Added security headers for page and API responses.
- Disabled the Next.js powered-by response header.

### Architecture and tooling

- Migrated Tailwind CSS to v4 CSS-first configuration.
- Updated PostCSS to use `@tailwindcss/postcss`.
- Removed the obsolete `tailwind.config.ts` file.
- Fixed locale request handling with `requestLocale`.
- Added ESLint CLI configuration and replaced deprecated `next lint` usage.
- Added CSS module declarations and a favicon.

### Localization and routing

- Preserved English, Sinhala, and Tamil localized routes.
- Added localized sitemap pages.
- Added missing sitemap translations.
- Improved language-switching links and utility-bar styling.
- Fixed contact navigation with a valid contact anchor.

### SEO

- Added locale-aware titles and descriptions.
- Added canonical URLs and `hreflang` links.
- Added Open Graph and Twitter metadata.
- Added GovernmentOrganization, WebSite, and WebPage JSON-LD.
- Added generated `/sitemap.xml` and `/robots.txt` routes.
- Added `/manifest.webmanifest`.
- Added centralized SEO URL configuration through `NEXT_PUBLIC_SITE_URL`.
- Added complete SEO documentation in `docs/SEO v1.md`.

### UI and branding

- Added telephone and email links to the Top Utility Bar.
- Removed the unused public/staff toggle from the public-only header.
- Replaced the mock logo with the combined official logo asset.
- Added a header version badge synchronized with `package.json`.
- Added hover scaling and centered animated underlines to navigation links.

### Observability

- Added Vercel Speed Insights support for frontend performance monitoring.

## Validation

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- Verified localized routes for `/en`, `/si`, and `/ta`.
- Verified `/sitemap.xml`, `/robots.txt`, and `/manifest.webmanifest`.
- Verified canonical, `hreflang`, Open Graph, Twitter, and JSON-LD output.

## Release notes

This release remains a prototype and requires approved production content,
rate limiting for public counter APIs, native-speaker translation review,
accessibility hardening, and final official-domain configuration before public
production launch.
```

## Release Checklist

- [ ] Confirm package version is `0.1.1`.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final official HTTPS domain.
- [ ] Confirm Upstash Redis production credentials.
- [ ] Verify counters in a deployed environment.
- [ ] Verify Vercel Speed Insights is enabled for the deployment.
- [ ] Verify `/en`, `/si`, and `/ta` routes.
- [ ] Verify `/sitemap.xml` and `/robots.txt`.
- [ ] Register the sitemap with Google Search Console.
- [ ] Register the sitemap with Bing Webmaster Tools.
- [ ] Review Sinhala and Tamil translations with native speakers.
- [ ] Replace remaining placeholder content and imagery.
- [ ] Review API rate limiting before public production launch.
- [ ] Complete accessibility and end-to-end testing.
