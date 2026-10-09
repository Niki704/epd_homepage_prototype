# EPD Homepage Prototype

## Public Change Log and Pull Request Notes

**Release:** `v0.1.7`
**Project:** Educational Publications Department Homepage Prototype
**Status:** Prototype release
**Source:** Consolidated commit history for the `dev` branch, including the
`feature/optimizehero` merge (commits listed below)

## Release Overview

Version `0.1.7` improves the reliability, accessibility, and polish of the EPD
homepage experience. It replaces the cookie consent banner with a native modal
dialog, rebuilds the hero slider with accessible autoplay and optimized image
loading, improves the responsive utility contact bar, and prevents duplicate
homepage view recordings.

The release includes:

- A native modal cookie consent experience with a functional backdrop, focus
  handling, Escape-key behavior, and reduced-motion support.
- Centralized consent storage utilities for consistent browser persistence.
- An accessible hero slider with controllable autoplay, reduced-motion support,
  internationalized labels, and CSS-based entrance animation.
- Improved hero image loading using Next.js image priorities and load-aware
  slide advancement.
- Responsive utility-bar contact interactions for hotline and email details.
- Directional contact animations that respond to pointer and keyboard movement.
- A safeguard against recording multiple page views from one mounted stats
  component.
- Application version `0.1.7`.

## Commit 1

### `feat(cookie-banner): add persistent EPD cookie consent banner`

### Summary

Introduced the EPD cookie consent experience as a persistent, localized banner
available from the locale layout rather than as homepage-only content.

### Files

- `app/[locale]/layout.tsx`
  - Added the cookie consent component to the shared localized layout.
- `app/[locale]/page.tsx`
  - Removed the homepage-specific banner placement.
- `components/sections/CookieConsentBanner.tsx`
  - Added Accept, Reject, and close actions.
  - Added responsive bottom-right presentation and animated entry/exit.
  - Added an EPD-branded heading and cookie explanation.
- `components/sections/DisclaimerBanner.tsx`
  - Removed the former prototype disclaimer component.
- `messages/en.json`, `messages/si.json`, `messages/ta.json`
  - Added localized cookie-banner content and controls.
- `package.json`
  - Updated the application version to `0.1.7`.

### Affected Areas

- Site-wide consent presentation and localized layout behavior.

## Commit 2

### `fix(cookie-consent): fix banner animation and centralize consent storage`

### Summary

Moved consent persistence into a shared utility and corrected the banner
animation flow so consent state is handled consistently across the component.

### Files

- `components/sections/CookieConsentBanner.tsx`
  - Updated the component to consume the shared consent API.
  - Preserved accepted and rejected consent behavior.
- `lib/cookies/consent.ts`
  - Added the shared consent storage key and `ConsentChoice` type.
  - Added `getConsent`, `setConsent`, and `clearConsent` helpers.
  - Added server-safe guards around browser storage access.

### Affected Areas

- Cookie consent persistence and client/server safety.

## Commit 3

### `feat: improve responsive utility bar contact interactions`

### Summary

Improved the utility bar contact experience across desktop and mobile layouts,
with clearer contact interactions, localized labels, and responsive behavior.

### Files

- `components/layout/TopUtilityBar.tsx`
  - Added responsive hotline and email contact controls.
  - Added direct `tel:` and `mailto:` links.
  - Added compact icon-only contact controls for mobile screens.
  - Added keyboard-accessible contact labels.
  - Preserved locale-aware sitemap and language navigation.
- `app/globals.css`
  - Added utility-bar contact layout and interaction styles.
- `messages/en.json`, `messages/si.json`, `messages/ta.json`
  - Added localized hotline and email labels.
- `.gitignore`
  - Updated repository ignore configuration related to the development setup.

### Affected Areas

- Top utility bar, contact discovery, and mobile navigation utility controls.

## Commit 4

### `feat(utility-bar): replace flip with directional slide on Hotline/Email`

### Summary

Replaced the previous contact-label flip interaction with a directional slide
that reveals the hotline or email value in response to pointer and keyboard
interaction.

### Files

- `components/layout/TopUtilityBar.tsx`
  - Added pointer-position detection to determine slide direction.
  - Added separate interaction phases for entry, exit, and idle states.
  - Kept contact values active while links retain keyboard or click focus.
  - Added animation-end handling so layout state resets after the exit motion.
- `app/globals.css`
  - Added the utility contact grid, face positioning, and slide animations.
- `package.json`
  - Updated package metadata associated with the utility-bar implementation.
- `pnpm-lock.yaml`
  - Updated the lockfile to match package metadata changes.

### Affected Areas

- Desktop utility-bar contact animation and keyboard interaction.

## Commit 5

### `feat: Small CSS adjustments for utility contact animations.`

### Summary

Fine-tuned the utility contact animation styles to improve timing and visual
consistency during directional entry and exit transitions.

### File

- `app/globals.css`
  - Adjusted utility contact animation definitions and supporting CSS values.

### Affected Areas

- Utility-bar animation polish.

## Commit 6

### `feat(fix): prevent multiple view recordings in StatsCounter`

### Summary

Added a component-level guard to prevent the homepage view counter from being
incremented more than once during a single mounted component lifecycle.

### File: `components/sections/StatsCounter.tsx`

- Added a ref-backed recording guard before posting to the views endpoint.
- Preserved the existing loading state and total-counter refresh behavior.

### Affected Areas

- Homepage analytics counters and view-count accuracy.

## Commit 7

### `fix(cookie-consent): rebuild banner as native modal dialog with working backdrop`

### Summary

Rebuilt cookie consent as a native modal dialog so the page becomes inert while
consent is requested and the backdrop behaves as a true modal backdrop rather
than a visual layer behind an interactive page.

### File: `components/sections/CookieConsentBanner.tsx`

- Replaced the custom `motion.aside` and separate overlay with a native
  `<dialog>` opened through `showModal()`.
- Moved the backdrop inside the dialog and synchronized it with the panel
  animation through one keyed `AnimatePresence` child.
- Increased the backdrop opacity from `black/20` to `black/40`.
- Focused the dialog itself on open so pressing Enter cannot accidentally
  trigger the close/Accept control.
- Added `onCancel` handling for Escape-key dismissal.
- Treats Escape dismissal as current-page-only dismissal without persisting a
  consent choice.
- Added `useReducedMotion` support to replace sliding with fade-only motion
  when requested by the user’s system preferences.
- Preserved the existing banner text, translation keys, heading, description,
  close, Accept, and Reject controls.

### Consent Note

The close (X) button continues to persist `accepted`, matching the behavior
before this commit. Treating close as a separate consent state should be
reviewed in a future consent-policy update.

### Affected Areas

- Consent modal accessibility, focus management, page inertness, and backdrop
  behavior.

## Commit 8

### `feat(hero): rebuild slider with accessible autoplay, i18n and CSS entrance`

### Summary

Rebuilt the homepage hero slider to improve visual transitions, performance,
accessibility, internationalization, and responsive behavior across supported
locales.

### Slider and loading

- Changed slide transitions to stacked cross-fades so the incoming photo fades
  over the outgoing photo without exposing the page background.
- Isolated the hero background layer so slide and overlay stacking cannot cover
  the hero text.
- Removed raw-image preloading in favor of optimized `next/image` loading.
- Assigned high fetch priority to the first slide and low priority to later
  slides.
- Advances autoplay only after the target image has finished loading.
- Uses one timeout per slide so manual indicator selection restarts the slide
  countdown.

### Accessibility

- Pauses autoplay on mouse hover and keyboard focus.
- Added a dedicated pause/play control.
- Stops autoplay when `prefers-reduced-motion` is enabled.
- Treats hero photos as decorative with empty alt text and `aria-hidden`.
- Increased slide-indicator hit areas to 24px.
- Added `aria-current` to identify the active slide.
- Converted quick-access tiles into real links with visible keyboard focus
  outlines.

### Performance and responsive layout

- Replaced the Framer Motion entrance effect with the CSS `hero-rise` animation.
- Keeps the hero headline available in server-rendered HTML without requiring
  JavaScript for the entrance effect.
- Removed Framer Motion usage from the hero component.
- Replaced fixed hero height with a clamped minimum height so content can grow
  for larger text and Sinhala/Tamil headlines.
- Added mobile bottom padding so hero content clears the slide controls.

### UI and internationalization

- Replaced the solid `Est. 1985` badge with a small eyebrow above the headline.
- Disabled wide letter spacing for Sinhala and Tamil text.
- Added trailing arrows to quick-access tiles.
- Opens external tiles in a new tab with `rel="noopener noreferrer"` and
  screen-reader text.
- Moved tile labels, the establishment label, slide labels, and pause/play
  labels into the hero translations.
- Added `opensInNewTab` translations for English, Sinhala, and Tamil.

### Files

- `components/sections/Hero.tsx`
- `app/globals.css`
- `messages/en.json`
- `messages/si.json`
- `messages/ta.json`

### Affected Areas

- Homepage first viewport, hero accessibility, loading performance, and locale
  support.

## Commit 9

### `Merge pull request #11 from Niki704/feature/optimizehero`

### Summary

Merged the optimized hero and native cookie-consent work from
`feature/optimizehero` into `dev`, bringing the release branch up to the
`v0.1.7` application version.

### Included Changes

- Native cookie consent dialog and functional modal backdrop.
- Accessible, optimized, internationalized hero slider.
- CSS hero entrance animation.
- Updated hero and cookie-banner translation content.

### Affected Areas

- `app/globals.css`
- `components/sections/CookieConsentBanner.tsx`
- `components/sections/Hero.tsx`
- `messages/en.json`

## Release Highlights

### Consent and privacy experience

- Native modal behavior makes the rest of the page inert while consent is
  requested.
- Backdrop, focus, Escape handling, and reduced-motion behavior are now
  aligned with accessible modal expectations.
- Consent persistence is centralized and server-safe.

### Hero experience

- Smoother stacked image transitions with load-aware autoplay.
- Pause, play, hover, focus, and reduced-motion support.
- Real quick-access links with keyboard and external-link affordances.
- Better handling of long localized headlines and short mobile screens.

### Utility navigation

- Hotline and email details are easier to discover on desktop and mobile.
- Directional animations respond naturally to pointer and keyboard interaction.
- Contact values remain usable as direct phone and email links.

### Reliability

- Prevented duplicate view recordings from the statistics component.
- Application version updated to `0.1.7`.

## Known Limitations for `v0.1.7`

- Cookie consent remains prototype-level and does not yet manage granular
  cookie categories or integrate with analytics/marketing consent controls.
- Closing the consent dialog with X currently persists `accepted`, while Escape
  dismisses only for the current page view. These behaviors require a final
  product and legal consent policy.
- Utility-bar contact content and hero labels require native-speaker review for
  Sinhala and Tamil.
- Hero quick-access destinations should be confirmed against final EPD routes.
- The search field and several homepage links remain presentational until their
  backend destinations are connected.
- View-counter accuracy still depends on the availability and behavior of the
  Redis-backed API endpoints.
- Automated unit, accessibility, integration, and end-to-end tests are still
  recommended.

## Pull Request Message

### PR Title

```text
Release v0.1.7: improve hero accessibility, cookie consent, and utility navigation
```

### PR Description

```markdown
## Summary

This pull request releases v0.1.7 of the Educational Publications Department
homepage prototype. It merges the optimized hero work from
`feature/optimizehero` into `dev` and improves the cookie consent, utility
navigation, and homepage statistics experiences.

## What changed

### Cookie consent
- Rebuilt the cookie banner as a native modal dialog using `showModal()`.
- Added a working backdrop that makes the rest of the page inert.
- Added dialog focus handling and Escape-key dismissal.
- Added reduced-motion support for consent animations.
- Centralized consent persistence in `lib/cookies/consent.ts`.

### Hero slider
- Added stacked cross-fade transitions and load-aware autoplay.
- Added pause/play, hover pause, keyboard-focus pause, and reduced-motion
  support.
- Improved slide indicator hit areas and active-slide announcements.
- Converted quick-access tiles into accessible links.
- Replaced the JavaScript entrance animation with the CSS `hero-rise` effect.
- Improved responsive sizing for long localized headlines and mobile screens.
- Moved hero labels and accessibility text into the locale messages.

### Utility bar
- Improved responsive hotline and email interactions.
- Added direct phone and email links for mobile and desktop use.
- Replaced the previous flip interaction with directional slide animations.
- Added pointer- and keyboard-aware animation behavior.

### Reliability and release metadata
- Prevented duplicate view recordings in `StatsCounter`.
- Updated the application version to `0.1.7`.

## Validation

- [ ] `pnpm run lint`
- [ ] `pnpm run typecheck`
- [ ] `pnpm run build`
- [ ] Verify cookie consent focus containment, backdrop inertness, and Escape
      behavior.
- [ ] Verify Accept, Reject, X, and Escape behavior against the final consent
      policy.
- [ ] Verify hero autoplay, pause/play, hover pause, keyboard focus, and
      reduced-motion behavior.
- [ ] Verify hero image loading and slide transitions on desktop and mobile.
- [ ] Verify English, Sinhala, and Tamil hero and utility-bar translations.
- [ ] Verify hotline, email, language, and sitemap links.
- [ ] Confirm that each homepage visit records at most one view increment.

## Release notes

This remains a prototype release. Consent policy, final content destinations,
translation review, and automated accessibility coverage should be completed
before production use.
```

## Release Checklist

- [ ] Confirm package version is `0.1.7`.
- [ ] Run `pnpm run lint`, `pnpm run typecheck`, and `pnpm run build`.
- [ ] Verify `/en`, `/si`, and `/ta` routes in a preview deployment.
- [ ] Test the cookie dialog with keyboard-only navigation.
- [ ] Verify focus behavior when the dialog opens and closes.
- [ ] Verify backdrop opacity, page inertness, and Escape handling.
- [ ] Test the hero slider with reduced motion enabled and disabled.
- [ ] Test autoplay pause/play, hover pause, focus pause, and manual indicators.
- [ ] Confirm optimized image loading and no layout clipping on mobile.
- [ ] Review Sinhala and Tamil translations with native speakers.
- [ ] Verify utility-bar phone and email links on desktop and mobile.
- [ ] Confirm duplicate view recording is prevented.
- [ ] Confirm whether the X button should persist accepted consent or use a
  separate dismissal state in the final consent policy.
- [ ] Confirm whether this PR should close any linked GitHub issue (not
  specified here).