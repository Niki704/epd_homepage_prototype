# EPD Homepage Prototype

## Public Change Log and Pull Request Notes

**Release:** `v0.1.6`
**Project:** Educational Publications Department Homepage Prototype
**Status:** Prototype release
**Source:** Consolidated commit history for the `dev` branch (latest 11 commits)

## Release Overview

Version `0.1.6` is a homepage experience update focused on visual presentation,
navigation, and access to important EPD content. It introduces a full-bleed
photo hero with automatic slide rotation, responsive navigation with archive
search, new quick-links and highlights sections, and a refreshed related-sites
area. The release also includes responsive image-loading optimizations, a
production favicon fix, support for the development origin, and repository
instruction files for the Next.js setup.

The release includes:

- A full-bleed, auto-advancing photo slider for the homepage hero.
- Hero slide indicators, responsive content layout, quick-access tiles, and
  animated transitions.
- A responsive header with desktop navigation, archive search, and a mobile
  slide-out navigation drawer.
- New EPD Quick Links and Highlights sections on the homepage.
- A revised Related Sites section with partner institution logos.
- Responsive image-loading improvements across the header, hero, and content
  imagery.
- A local development-origin allowance in the Next.js configuration.
- A public favicon to prevent the production `vercel-favicon` fallback request.
- Next.js agent instruction files and removal of the tracked `devNotes`
  documentation from the repository.

## Commit 1

### `feat(fix): Resolved favicon.png request fallback from vercel-favicon/1.0 production-only issue.`

### Summary

Added a project favicon and registered it through the locale homepage metadata
so production requests resolve to the project's favicon instead of falling back
to Vercel's favicon endpoint.

### Files

- `app/[locale]/page.tsx`
  - Added favicon metadata to the homepage metadata configuration.
- `package.json`
  - Updated package metadata associated with the release state.
- `public/favicon.png`
  - Added the EPD favicon asset.

### Affected Areas

- Production browser metadata and favicon requests.

## Commit 2

### `fix(perf): optimize responsive image loading (Warnings cleared in the log)`

### Summary

Updated responsive image usage to provide more accurate dimensions and loading
behavior, clearing responsive-image warnings while preserving the existing
visual layouts.

### Files

- `components/layout/Header.tsx`
  - Added responsive sizing and eager loading for the main EPD logo.
- `components/sections/AdditionalCommissioners.tsx`
  - Improved image dimensions and responsive sizing.
- `components/sections/BookDetailModal.tsx`
  - Improved modal book image dimensions and responsive sizing.
- `components/sections/CommissionerGeneral.tsx`
  - Improved commissioner image dimensions and responsive sizing.
- `components/sections/Hero.tsx`
  - Added responsive sizing and eager loading for hero imagery.
- `components/sections/SupplementaryBookList.tsx`
  - Improved supplementary-book image dimensions and responsive sizing.

### Affected Areas

- Image loading performance and responsive image warnings across the homepage.

## Commit 3

### `feat: Update .gitignore to exclude devNotes directory`

### Summary

Removed the draft design and SEO notes from version control and updated the
ignore rules so local `devNotes` content is not reintroduced into the project.

### Files

- `.gitignore`
  - Added ignore rules for the development-notes directory.
- `docs/devNotes/EPD-Homepage-Prototype-Draft_Version_v0.1.0.md`
  - Removed the tracked draft document.
- `docs/devNotes/SEO v1.md`
  - Removed the tracked SEO notes.
- `docs/devNotes/SEO v1.pdf`
  - Removed the tracked SEO PDF.

### Affected Areas

- Repository documentation and local development-note hygiene.

## Commit 4

### `feat(ui): Some modifications to the hero section. (Committing unfinished work)`

### Summary

Began the hero redesign by expanding the hero layout, adding animated content
transitions, introducing quick-access tiles, and preparing the section for a
photo-led presentation.

### Affected Areas

- `components/sections/Hero.tsx`

## Commit 5

### `feat(hero): redesign homepage hero as full-bleed photo slider`

### Summary

Completed the hero redesign as a full-bleed photo slider with automatic
five-second rotation, crossfade transitions, image preloading, slide controls,
and a dark readability overlay. The layout adapts the hero content and
quick-access tiles for desktop and mobile viewports.

### File: `components/sections/Hero.tsx`

- Added two homepage hero photographs as slider sources.
- Added image preloading and decoding before automatic rotation begins.
- Added automatic slide advancement every five seconds.
- Added animated crossfade transitions between slides.
- Added manual slide indicator buttons with accessible labels.
- Added a dark gradient overlay to preserve text contrast over photography.
- Added responsive hero sizing and bottom-aligned headline content.
- Added quick-access tiles for book downloads, notices, and contact access.
- Added the `Est. 1985` badge.

### Affected Areas

- Homepage first-viewport presentation and hero interaction.

## Commit 6

### `feat: Update next.config.ts to allow dev origin. (Network default)`

### Summary

Allowed the configured development origin in the Next.js configuration so the
homepage can be accessed through the development network workflow.

### File: `next.config.ts`

- Added the development origin to the allowed-origin configuration.

### Affected Areas

- Local development and network access to the Next.js dev server.

## Commit 7

### `feat(header): add responsive navigation drawer and search bar`

### Summary

Added a responsive navigation system with desktop links, an archive search
field, and an animated mobile drawer. The drawer supports overlay dismissal,
Escape-key dismissal, accessible menu state, and automatic close-on-navigation.

### Files

- `components/layout/Header.tsx`
  - Added archive search input and search button.
  - Added mobile menu toggle with accessible `aria-expanded` state.
  - Added animated navigation drawer and backdrop.
  - Added Escape-key handling and close-on-link navigation.
  - Preserved locale-aware navigation links for all supported languages.
- `messages/en.json`
  - Added the English archive-search translation.

### Affected Areas

- Site navigation, mobile usability, and archive discovery.

## Commit 8

### `feat(homepage): refine hero and add post-hero content sections`

### Summary

Refined the hero presentation and inserted the new post-hero content sections
into the homepage composition. Accessibility controls were also adjusted to
support the updated layout.

### Files

- `app/[locale]/page.tsx`
  - Added `EpdQuickLinks` immediately after the hero.
  - Added `EpdHighlights` immediately after quick links.
- `components/layout/AccessibilityWidget.tsx`
  - Updated the accessibility widget behavior and presentation.
- `components/sections/Hero.tsx`
  - Refined hero layout, content spacing, and responsive behavior.

### Affected Areas

- Homepage section order and the transition from hero content to services.

## Commit 9

### `chore: add Next.js agent instruction files`

### Summary

Added repository-level agent guidance for the current Next.js version and linked
the Claude configuration to the shared instructions.

### Files

- `AGENTS.md`
  - Added the generated Next.js agent rules.
- `CLAUDE.md`
  - Referenced the shared agent rules.

### Affected Areas

- Repository development workflow and AI-assisted maintenance.

## Commit 10

### `feat(homepage): add quick links and highlights sections`

### Summary

Added two new content sections modeled around quick access to common education
services and a responsive carousel of EPD highlights.

### Files

- `components/sections/EpdQuickLinks.tsx`
  - Added grouped links for academic calendars, admissions, careers, and
    self-help tools.
  - Added Lucide category icons and responsive four-column layout.
- `components/sections/EpdHighlights.tsx`
  - Added a six-item highlights carousel with responsive one-card and
    three-card layouts.
  - Added previous/next controls, pagination indicators, and animated sliding.
  - Added responsive image presentation for highlight cards.

### Affected Areas

- Homepage information discovery and post-hero content.

## Commit 11

### `feat(homepage): redesign related sites section`

### Summary

Refreshed the Related Sites section to present partner institutions in a clean,
responsive logo grid with improved spacing, sizing, and hover feedback.

### File: `components/sections/PartnerInstitutionsGrid.tsx`

- Added a dedicated `Related sites` heading.
- Added responsive two-column and four-column logo layouts.
- Added institution labels through image alt text.
- Added bounded logo dimensions and object-contain presentation.
- Added a subtle hover scale effect for partner logos.

### Affected Areas

- Homepage partner-institution discovery and visual polish.

## Release Highlights

### Homepage experience

- Full-bleed photographic hero with automatic and manual slide controls.
- New quick links and highlights sections directly below the hero.
- Refreshed related-sites presentation with partner logos.

### Navigation and accessibility

- Responsive desktop and mobile navigation.
- Archive search field in the global header.
- Keyboard and overlay dismissal for the mobile navigation drawer.
- Accessible labels and state attributes for interactive controls.

### Performance and deployment

- Responsive image metadata and loading improvements across major homepage
  imagery.
- Explicit project favicon for production deployments.
- Development-origin support in Next.js configuration.

## Known Limitations for `v0.1.6`

- Quick-link entries are currently placeholder links using `#` targets and need
  to be connected to final EPD destinations.
- Highlight stories and excerpts are prototype content and need confirmation
  against approved EPD news and notices.
- The hero quick-access tiles are currently presentation-only and do not yet
  navigate to their final destinations.
- The archive search field is presentational and does not yet execute a search.
- Sinhala and Tamil translations should be reviewed for the newly exposed
  navigation and homepage workflows.
- Accessibility controls, carousel behavior, and mobile drawer focus handling
  require further production hardening and automated testing.
- Automated unit, integration, accessibility, and end-to-end tests are still
  recommended.

## Pull Request Message

### PR Title

```text
Release v0.1.6: refresh homepage experience with responsive navigation and content sections
```

### PR Description

```markdown
## Summary

This pull request releases v0.1.6 of the Educational Publications Department
homepage prototype. It refreshes the homepage presentation with a full-bleed
photo slider, adds responsive navigation and archive search, and introduces new
quick-links, highlights, and related-sites sections.

## What changed

### Homepage

- Added a full-bleed, auto-advancing photo hero with manual slide controls.
- Added hero quick-access tiles and animated transitions.
- Added EPD Quick Links for academic calendars, admissions, careers, and tools.
- Added a responsive Highlights carousel.
- Redesigned the Related Sites partner-logo grid.

### Navigation and accessibility

- Added desktop archive search.
- Added an animated mobile navigation drawer with overlay and Escape-key
  dismissal.
- Added accessible labels and menu state handling for the new controls.
- Added the English archive-search translation.

### Performance and configuration

- Optimized responsive image loading across the homepage.
- Added an explicit public favicon for production deployments.
- Allowed the development origin in `next.config.ts`.
- Added Next.js agent instruction files and excluded local `devNotes` content.

## Validation

- [ ] `pnpm run lint`
- [ ] `pnpm run typecheck`
- [ ] `pnpm run build`
- [ ] Verify `/en`, `/si`, and `/ta` routes.
- [ ] Verify hero slide rotation and manual indicators on desktop and mobile.
- [ ] Verify mobile navigation open, close, overlay, and Escape-key behavior.
- [ ] Verify the favicon and responsive images in a production-like build.
- [ ] Confirm placeholder quick links, search behavior, and highlight content
      are tracked for follow-up implementation.

## Release notes

This release remains a prototype. Several links, search interactions, and
content entries are presentation-only and require final EPD destinations and
content approval before production use.
```

## Release Checklist

- [ ] Confirm package version is `0.1.6`.
- [ ] Run `pnpm run lint`, `pnpm run typecheck`, and `pnpm run build`.
- [ ] Verify `/en`, `/si`, and `/ta` routes in a preview deployment.
- [ ] Test the hero slider, indicators, and responsive layout on desktop and
      mobile viewports.
- [ ] Test the desktop search field and mobile navigation interactions.
- [ ] Confirm the favicon resolves correctly in the deployed application.
- [ ] Confirm responsive image warnings remain cleared after the build.
- [ ] Review Sinhala and Tamil translations for the updated navigation.
- [ ] Replace placeholder quick-link destinations and highlight content before
      production release.
- [ ] Confirm whether this PR should close any linked GitHub issue (not
      specified here).
