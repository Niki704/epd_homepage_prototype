# EPD Homepage Prototype

## Architecture, Code Review, Security, and Handoff Report

**Document:** EPD-Homepage-Prototype-Draft_Version_v0.1.0.md  
**Project:** Educational Publications Department homepage prototype  
**Review date:** 2026-09-08  
**Application version:** 0.1.1  
**Status:** Prototype builds successfully; production handoff work remains.

## 1. Executive Summary

This project is a Next.js 15 App Router frontend prototype for the Educational Publications Department of Sri Lanka. It is primarily a static, localized website with mock content stored in TypeScript files. The only live backend integration is Upstash Redis for view and download counters.

The application is organized around these boundaries:

- `app/`: routing, layouts, pages, and API route handlers.
- `components/`: reusable layout, page-section, and UI components.
- `data/`: static prototype content.
- `messages/`: English, Sinhala, and Tamil translation dictionaries.
- `i18n/` and `middleware.ts`: locale validation and locale-prefixed routing.
- `lib/`: shared utilities and Redis integration.
- `public/`: local image and icon assets.

The codebase was already able to compile and generate static pages. The review found several prototype limitations and a few concrete defects. The concrete fixes made during this review are listed in Section 11.

## 2. Technology Stack

- Next.js 15 with the App Router
- React 18 and TypeScript
- Tailwind CSS with CSS variables
- Framer Motion for animation
- `next-intl` for locale-based routing and translations
- `next-themes` for theme context
- `lucide-react` for icons
- Upstash Redis REST client for counters
- ESLint and TypeScript for static validation

The package manager metadata is in `package.json`; the resolved dependency versions are recorded in `package-lock.json`.

## 3. Request and Rendering Model

A normal localized page request follows this path:

```text
Browser request: /en, /si, or /ta
    |
    v
middleware.ts
    |  validates/prefixes locale and adds baseline response headers
    v
app/[locale]/layout.tsx
    |  validates locale, loads messages, creates document shell/providers
    v
app/[locale]/page.tsx
    |  composes homepage sections in display order
    v
components/sections/*
    |  read static data and localized messages
    v
HTML + client hydration for interactive components
```

Counter requests use a separate path:

```text
StatsCounter mounts
    |
    +--> POST /api/counters/views
    |       |
    |       +--> lib/redis.ts -> Upstash Redis, when configured
    |
    +--> GET /api/counters/stats
            |
            +--> lib/redis.ts -> Upstash Redis, when configured

DownloadArchiveCTA click
    |
    +--> POST /api/counters/downloads
            |
            +--> lib/redis.ts -> Upstash Redis, when configured
```

When Redis credentials are absent, counter operations now return zero values instead of failing during module initialization. This keeps the prototype usable without external infrastructure, matching the README promise.

## 4. Directory and File Responsibilities

### Root configuration

- `package.json`: scripts, runtime dependencies, and development dependencies.
- `package-lock.json`: reproducible npm dependency resolution.
- `tsconfig.json`: strict TypeScript settings, path alias `@/*`, and Next.js type inclusion.
- `next.config.ts`: Next.js configuration, image behavior, security-related defaults, and response headers.
- `tailwind.config.ts`: Tailwind content paths, theme tokens, and custom colors.
- `postcss.config.js`: PostCSS/Tailwind processing configuration.
- `next-env.d.ts`: generated Next.js TypeScript environment declarations; it should not be edited manually.
- `i18n.config.ts`: supported locales (`en`, `si`, `ta`) and default locale.
- `middleware.ts`: locale middleware plus baseline security headers for matched page requests.
- `.env.local.example`: names of the optional Upstash Redis environment variables.
- `.eslintrc.json`: ESLint configuration based on Next.js rules.
- `.eslintignore`: excludes generated and dependency directories from ESLint.
- `README.md`: setup instructions, project status, known content gaps, and prototype context.

### `app/`

The App Router owns URL routing and server-side composition.

- `app/layout.tsx`: root layout entry point. It imports global CSS and forwards children. The localized document shell is intentionally in `app/[locale]/layout.tsx`.
- `app/globals.css`: global CSS variables, Tailwind layers, base styles, and theme rules.
- `app/[locale]/layout.tsx`: localized document shell. It validates the locale, loads messages, sets the HTML language, creates font variables, and renders providers plus global site chrome.
- `app/[locale]/page.tsx`: homepage composition. It renders every homepage section in order.
- `app/[locale]/loading.tsx`: loading UI for the localized route segment.
- `app/[locale]/not-found.tsx`: localized not-found UI.
- `app/[locale]/sitemap/page.tsx`: localized sitemap page linked by the utility bar.
- `app/api/counters/views/route.ts`: POST endpoint for incrementing total and daily views.
- `app/api/counters/downloads/route.ts`: POST endpoint for incrementing total downloads.
- `app/api/counters/stats/route.ts`: GET endpoint for reading current counters.

### `components/layout/`

Global components rendered by the localized layout:

- `TopUtilityBar.tsx`: phone, email, sitemap, and language-switch links.
- `Header.tsx`: sticky brand header, main navigation, logo, and public/staff display toggle.
- `Footer.tsx`: contact details, navigation, media links, credits, and copyright. It now owns the `contact` anchor used by navigation.
- `ThemeProvider.tsx`: client-side `next-themes` provider.
- `AccessibilityWidget.tsx`: floating accessibility control. It is currently a visual prototype stub.
- `ScrollToTopButton.tsx`: client-side button for returning to the top of the page.

### `components/sections/`

These components represent homepage content blocks. They are composed by `app/[locale]/page.tsx` rather than routed independently.

- `Hero.tsx`: headline, hero image, primary CTAs, and quick-access visual tiles.
- `DisclaimerBanner.tsx`: dismissible prototype notice.
- `BookCategoryGrid.tsx`: textbook category cards.
- `QuickServiceTiles.tsx`: service shortcut tiles.
- `AboutUs.tsx`: department description, vision, mission, and objectives.
- `StatsCounter.tsx`: animated counters and client-side API calls.
- `DownloadArchiveCTA.tsx`: external archive CTA and download-counter request.
- `CommissionerGeneral.tsx`: commissioner general profile/contact content.
- `AdditionalCommissioners.tsx`: additional commissioner cards.
- `DivisionsSection.tsx`: division cards/list.
- `NewsAndNotices.tsx`: news and notice panels.
- `CircularsBanner.tsx`: circulars/procurement callout.
- `SupplementaryBooksBanner.tsx`: supplementary books callout.
- `SupplementaryBookList.tsx`: supplementary book list and selected-book state.
- `BookDetailModal.tsx`: selected supplementary book detail view.
- `BookshopTable.tsx`: affiliated bookshop table and map links.
- `PartnerInstitutionsGrid.tsx`: partner institution cards.
- `QuickLinksSidebar.tsx`: quick links beside news and notices.

### `components/ui/`

Small reusable visual and interaction primitives:

- `Button.tsx`: link-or-button abstraction with primary, secondary, and outline variants.
- `Card.tsx`: shared card styling.
- `Badge.tsx`: shared badge styling.
- `Modal.tsx`: animated modal shell used by detail content.
- `PublicStaffToggle.tsx`: local public/staff display preference. It is not authentication and does not currently change page content.

### `data/`

Static prototype data modules:

- `books.ts`: book and supplementary book records.
- `bookshops.ts`: bookshop records.
- `circulars.ts`: circular/procurement records.
- `commissioners.ts`: leadership records.
- `divisions.ts`: division records.
- `news.ts`: news records.
- `notices.ts`: notice records.

These modules are appropriate for a visual prototype. They should be replaced or backed by a CMS/API before production publication.

### `i18n/` and `messages/`

- `i18n/request.ts`: request-time locale and message loading for `next-intl`.
- `messages/en.json`: English dictionary.
- `messages/si.json`: Sinhala dictionary.
- `messages/ta.json`: Tamil dictionary.

The locale dictionary is used by `NextIntlClientProvider` and `useTranslations` calls. Not all visible content is translated yet; several static data records and some labels remain English-only.

### `lib/`

- `lib/utils.ts`: shared helpers such as class-name merging and count formatting.
- `lib/redis.ts`: sole backend integration. It defines Redis keys and read/increment operations, and now degrades to zero counters when credentials are not configured.

### `public/`

- `public/images/hero/`: hero image assets.
- `public/images/books/`: book-related assets.
- `public/images/commissioners/`: commissioner assets.
- `public/images/divisions/`: division assets.
- `public/images/main-logo.png`: header logo.
- `public/icons/`: local icon assets.

Files under `public/` are served from the site root, so `public/images/main-logo.png` is referenced as `/images/main-logo.png`.

## 5. Parent-to-Child Component Relationships

The global parent relationship is:

```text
RootLayout (app/layout.tsx)
└── LocaleLayout (app/[locale]/layout.tsx)
    ├── NextIntlClientProvider
    │   └── ThemeProvider
    │       ├── TopUtilityBar
    │       ├── Header
    │       │   └── PublicStaffToggle
    │       ├── main
    │       │   └── HomePage (app/[locale]/page.tsx)
    │       │       ├── Hero
    │       │       ├── DisclaimerBanner
    │       │       ├── BookCategoryGrid
    │       │       ├── QuickServiceTiles
    │       │       ├── AboutUs
    │       │       ├── StatsCounter
    │       │       ├── DownloadArchiveCTA
    │       │       ├── CommissionerGeneral
    │       │       ├── AdditionalCommissioners
    │       │       ├── DivisionsSection
    │       │       ├── NewsAndNotices
    │       │       ├── QuickLinksSidebar
    │       │       ├── CircularsBanner
    │       │       ├── SupplementaryBooksBanner
    │       │       ├── SupplementaryBookList
    │       │       │   └── BookDetailModal -> Modal
    │       │       ├── BookshopTable
    │       │       └── PartnerInstitutionsGrid
    │       ├── Footer
    │       ├── AccessibilityWidget
    │       └── ScrollToTopButton
```

Important implementation pattern: most page sections are server components by default. Components that use browser APIs, React state, effects, animation hooks, or event handlers begin with `"use client"`. Examples include `Header`, `StatsCounter`, `DownloadArchiveCTA`, `Modal`, `PublicStaffToggle`, and the accessibility/scroll controls.

## 6. Internationalization Architecture

1. `middleware.ts` uses `next-intl/middleware` to require locale-prefixed paths.
2. `i18n.config.ts` defines the supported locale union and default locale.
3. `app/[locale]/layout.tsx` rejects unsupported locales and calls `setRequestLocale`.
4. `i18n/request.ts` loads `messages/{locale}.json` for the current request.
5. `NextIntlClientProvider` makes messages available to client components.
6. Components call `useTranslations(namespace)` for visible dictionary content.

Supported URLs include:

- `/en`
- `/si`
- `/ta`
- `/en/sitemap`
- `/si/sitemap`
- `/ta/sitemap`

Remaining localization work:

- Translate static data records in `data/`.
- Replace hardcoded English labels in section components.
- Add translated date formatting using the current locale rather than a fixed English locale.
- Review Sinhala and Tamil text with native speakers.
- Add automated translation-key parity checks across all dictionaries.

## 7. Data and API Architecture

Static data is imported directly into components. This keeps the prototype simple and fast but means content changes require a deployment.

Redis is isolated in `lib/redis.ts` with three logical values:

- `total_views`
- `total_downloads`
- `views:YYYY-MM-DD`

The current counter design is best understood as prototype analytics. A view is incremented on client component mount, and a download is incremented when the external archive CTA is clicked. Neither represents a verified unique user view or completed file download.

## 8. Confirmed Issues and Residual Risks

### High priority before public deployment

- Counter POST routes are unauthenticated and have no rate limiting. An attacker can inflate counts and increase Upstash usage by repeatedly calling them.
- Counter reads are public and expose traffic metrics.
- There is no bot filtering, idempotency, per-IP throttling, or abuse monitoring.
- The staff toggle is not an authentication boundary. It must not be used to protect staff content.
- Real government contact details, approved staff data, and official links are still pending.

### Medium priority

- `AccessibilityWidget.tsx` is a visual button without implemented settings, keyboard workflow, focus management, or contrast/font controls.
- `Modal.tsx` lacks a dialog role, labelled relationship, Escape-key close, focus trapping, focus restoration, and body-scroll management.
- Quick category cards, quick service tiles, and hero quick tiles look interactive but are not actual links/buttons.
- `QuickLinksSidebar.tsx` uses `href="#"` placeholders.
- Some visible content is hardcoded in English instead of using `messages/*.json`.
- Counter fetch failures are mostly suppressed in the UI, so an outage can look like valid zero data.
- The download counter measures CTA clicks rather than successful downloads.
- The root layout is unconventional because `<html>` and `<body>` are supplied by the locale layout. The current build accepts this arrangement, but root-level error/not-found behavior should be verified during a future Next.js upgrade.

### Low priority or prototype limitations

- All or many imagery/content records are placeholders according to `README.md`.
- No automated unit, integration, accessibility, or end-to-end tests exist.
- No CMS or editorial workflow exists.
- No monitoring, structured logging, alerting, or uptime check is configured.
- SEO can be improved with locale-specific metadata, canonical URLs, `hreflang`, `robots.txt`, and a generated XML sitemap.

## 9. Security Review

Implemented baseline protections:

- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling camera, microphone, and geolocation
- `poweredByHeader: false`
- Headers are configured in `next.config.ts` so they also apply to API routes.
- No raw HTML injection or `dangerouslySetInnerHTML` was found in the reviewed application code.
- External links opened in a new tab use `rel="noopener noreferrer"` where applicable.

Recommended next security steps:

1. Add rate limiting for all counter endpoints, preferably at the edge or through a durable Redis-based limiter.
2. Decide whether public counter reads are acceptable; otherwise return only aggregated values or protect the endpoint.
3. Add request origin checks and a bot/abuse strategy for write endpoints.
4. Add a Content Security Policy after inventorying image, font, analytics, and external-link sources.
5. Enable HSTS only when HTTPS is guaranteed for every production environment.
6. Validate all official links and replace mock contact data before deployment.
7. Add security headers and API behavior tests to CI.
8. Use real authentication and authorization if staff functionality is introduced.

## 10. Development and Validation

Expected setup:

```text
npm install
copy .env.local.example .env.local
npm run dev
```

Redis variables are optional for the prototype after the defensive Redis change. With no Redis configuration, counters remain zero.

Checks run during this review:

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed after migrating from deprecated `next lint` to `eslint .` and excluding generated `next-env.d.ts`.
- `npm run build`: passed.
- Static output includes `/en`, `/si`, `/ta`, and all three localized sitemap routes.

The earlier `npm run dev` exit code of 1 did not include its first error line in the available terminal context, so its exact original cause cannot be proven from the exit code alone. The most relevant source-level risk was eager Redis initialization without credentials; this has been made defensive. Other common causes include an occupied port, unsupported Node.js version, or stale build state.

## 11. Changes Applied in This Review

- Made Redis configuration optional in `lib/redis.ts`; missing credentials now produce zero-counter responses instead of initialization failure.
- Changed the hardcoded stats label in `StatsCounter.tsx` to use the `stats.totalTitles` translation key.
- Removed the duplicate `bg-brand-dark` class from `Header.tsx`.
- Added `id="contact"` to the footer so existing contact navigation resolves to a real anchor.
- Added `poweredByHeader: false` and baseline response headers in `next.config.ts`, including API routes.
- Migrated the `lint` script from deprecated `next lint` to `eslint .`.
- Removed the unused `NextResponse` import from `middleware.ts`.
- Added `.eslintignore` entries for generated and dependency directories.
- Added `app/[locale]/sitemap/page.tsx` for the sitemap links already present in the utility bar.
- Created this report at `docs/EPD-Homepage-Prototype-Draft_Version_v0.1.0.md`.

## 12. Recommended Implementation Roadmap

### Phase 1: Stabilize the prototype

- Replace placeholder images and mock contact/staff content.
- Convert visible interactive-looking tiles into real links or buttons.
- Replace `#` quick links with approved destinations.
- Implement modal accessibility behavior.
- Implement or relabel the accessibility widget so it does not imply unavailable features.
- Add empty, loading, and API-error states for live counters.

### Phase 2: Prepare content operations

- Choose a CMS or controlled content API.
- Move books, news, notices, circulars, staff, divisions, and bookshops out of source files.
- Define content ownership, approval, publishing, and archival workflows.
- Add translation review and fallback rules.

### Phase 3: Harden production APIs

- Add rate limiting and abuse detection.
- Define whether counters are unique, session-based, or raw events.
- Add API tests, structured logs, alerting, and Redis failure monitoring.
- Protect staff features with real authentication and authorization.

### Phase 4: Quality and release engineering

- Add unit tests for utilities and data adapters.
- Add component/accessibility tests.
- Add Playwright coverage for locale routes, navigation, modal behavior, and counter failure states.
- Add CI for lint, typecheck, build, translation parity, and broken-link checks.
- Add locale-aware SEO metadata, `robots.txt`, canonical URLs, `hreflang`, and an XML sitemap.

## 13. Final Assessment

The project has a coherent prototype architecture and a sensible separation between routing, layout, sections, static content, translations, and the single backend integration. It is suitable for stakeholder review after replacing mock content and implementing the missing interaction behavior.

It is not yet suitable as a public production site without rate limiting, approved content, stronger accessibility behavior, real staff authentication if required, operational monitoring, and automated tests. The application currently passes TypeScript, ESLint, and production build validation after the fixes in this review.
