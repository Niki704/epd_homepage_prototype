# EPD Homepage Prototype

## Public Change Log and Pull Request Notes

**Release:** `v0.1.3`  
**Project:** Educational Publications Department Homepage Prototype  
**Status:** Prototype release  
**Source:** Consolidated commit history for the `v0.1.3` update

## Release Overview

Version `0.1.3` refines the public-facing navigation, footer, utility controls, and supporting visual assets. It also improves locale-specific rendering, keeps the displayed application version synchronized with `package.json`, strengthens the ESM and environment configuration, and adds CI pipeline support.

The release includes:

- Updated header and navigation-link animations.
- Locale-specific CSS variants for rendered navigation elements.
- New icons and visual elements in the public asset directory.
- A refreshed footer using real data and affiliated websites.
- Image and GIF support for footer and navigation content.
- Updated helper buttons with image-based controls and hover states.
- A top utility bar underline animation replacing the previous navigation underline animation.
- ESM compatibility fixes for middleware and PostCSS configuration.
- Compile-time environment-variable validation using Zod.
- GitHub Actions CI pipelines and an updated CI workflow.
- Application version synchronization for the `v0.1.3` release.

## Commit 1

### `feat(ui): Applied some changes in the header/nav bar`

### Summary

Updated the header and navigation bar presentation with revised link animations, locale-aware styling variants, and the new application version.

### Changes

- Changed the animation style used by navigation links.
- Added CSS variants for each supported locale during rendering.
- Updated the application version for the `v0.1.3` release.

### Affected Areas

- `components/layout/Header.tsx`
- `app/globals.css`
- `package.json`
- `messages/en.json`
- `messages/si.json`
- `messages/ta.json`

## Commit 2

### `feat: Added new icons/elements to the public directory`

### Changes

- Added new public image assets for interface controls and visual elements.
- Added the image resources required by the updated header, footer, and helper-button presentations.

### Affected Areas

- `public/icons/`
- `public/images/`

## Commit 3

### `feat(ui): Footer updated.`

### Summary

Refreshed the footer with real application data, dynamic version information, affiliated-website navigation, and updated visual styling.

### Changes

- Read the displayed application version dynamically from `package.json`.
- Replaced placeholder footer content with real data.
- Added affiliated websites to the navigation structure.
- Added image and GIF assets used by the footer and related navigation content.
- Updated footer CSS styling.
- Applied a minor related change in the header component.

### Affected Areas

- `components/layout/Footer.tsx`
- `components/layout/Header.tsx`
- `app/globals.css`
- `package.json`
- `public/images/`

## Commit 4

### `feat(ui): Modifiations to the Helper buttons.`

### Summary

Updated the scroll-to-top and accessibility helper controls with image-based buttons, hover states, and refined styling.

### Changes

- Added separate up-arrow images for the normal and hover states.
- Added two accessibility button icons with slight color variations.
- Replaced helper-button text labels with image controls.
- Updated the CSS for the helper buttons.

### Affected Areas

- `components/layout/ScrollToTopButton.tsx`
- `components/layout/AccessibilityWidget.tsx`
- `app/globals.css`
- `public/icons/`
- `public/images/`

## Commit 5

### `feat(ui): Previous underline animation is now swapped to the Top Utility Bar.`

### Changes

- Moved the previous underline animation behavior from the navigation links to the Top Utility Bar.
- Updated the utility-bar interaction styling to use the underline animation.
- Kept the header and utility navigation presentation consistent with the revised UI direction.

### Affected Areas

- `components/layout/TopUtilityBar.tsx`
- `components/layout/Header.tsx`
- `app/globals.css`

## Commit 6

### `feat(fix): Includes security fix`

### Summary

Improved module compatibility, environment validation, and automated integration checks for the application build and deployment workflow.

### Changes

- Added `"type": "module"` to `package.json` to resolve the middleware invocation issue under ESM.
- Renamed the PostCSS configuration for ESM compatibility.
- Created GitHub Actions CI pipelines.
- Added compile-time environment-variable validation through the Zod validator.
- Updated `seo.ts` and `redis.ts` to use the validated environment configuration.

### Affected Areas

- `package.json`
- `postcss.config.cjs`
- `lib/env.ts`
- `lib/seo.ts`
- `lib/redis.ts`
- `.github/workflows/`

## Commit 7

### `feat(optimize): CI Pipeline has been updated.`

### Changes

- Updated the CI pipeline workflow for the current project configuration.
- Improved the automated validation path used for linting, type checking, and build verification.
- Aligned CI execution with the ESM, environment-validation, and Next.js application setup.

### Affected Areas

- `.github/workflows/`
- `package.json`
- `package-lock.json`

## Release Highlights

### Header and navigation

- Revised navigation-link animation behavior.
- Added locale-specific CSS rendering variants.
- Moved the underline animation to the Top Utility Bar.
- Added affiliated websites to the navigation experience.
- Preserved application-version synchronization with `package.json`.

### Footer and content

- Replaced footer placeholders with real data.
- Added dynamic application-version output.
- Added affiliated-website links.
- Added supporting images and GIFs.
- Refined footer and related header styling.

### Helper controls

- Added normal and hover up-arrow assets.
- Added accessibility icon variants.
- Replaced text-based helper controls with image-based controls.
- Updated helper-button CSS and hover behavior.

### Assets

- Added new icons and interface elements under the public asset directories.
- Added image resources used by the updated layout and helper controls.

### Security and tooling

- Enabled ESM behavior through the package configuration.
- Renamed the PostCSS configuration for ESM compatibility.
- Added compile-time environment validation with Zod.
- Connected SEO and Redis configuration to validated environment values.
- Added and updated GitHub Actions CI pipelines.

## Validation

The changes in this document are based on the supplied commit history. This changelog is documentation-only; no additional validation commands were run while creating it.

Recommended release validation:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Verify middleware invocation and locale routing for `/en`, `/si`, and `/ta`.
- Verify header, Top Utility Bar, footer, ScrollToTop, and AccessibilityWidget interactions.
- Verify normal and hover helper-button assets load correctly.
- Verify CI workflows complete successfully in GitHub Actions.
- Verify required environment variables fail clearly at compile time when missing.

## Known Limitations for `v0.1.3`

- The application remains a prototype and may contain placeholder content outside the updated areas.
- Sinhala and Tamil content still requires native-speaker review.
- Accessibility controls and helper-button behavior require full keyboard and assistive-technology testing.
- Public counter APIs require rate limiting before a production launch.
- CI validation depends on correctly configured repository secrets and environment variables.
- Final production-domain configuration remains necessary for canonical SEO URLs.

## Pull Request Message

### PR Title

```text
Release v0.1.3: refine public UI, helper controls, ESM compatibility, and CI
```

### PR Description

```markdown
## Summary

This pull request prepares the EPD Homepage Prototype for the `v0.1.3` release.
It refines the header, navigation, Top Utility Bar, footer, and helper controls,
adds new public assets, and improves ESM compatibility, environment validation,
and CI pipeline coverage.

## What changed

### UI and navigation

- Updated header and navigation-link animations.
- Added locale-specific CSS variants during rendering.
- Moved the underline animation to the Top Utility Bar.
- Added affiliated websites to the navigation experience.

### Footer and assets

- Updated the footer with real data.
- Added dynamic application-version output from `package.json`.
- Added images and GIFs for the updated layout.
- Added new icons and visual elements under `public/`.

### Helper controls

- Added normal and hover up-arrow assets.
- Added accessibility icon variants.
- Replaced helper-button text with image-based controls.
- Updated helper-button styling.

### Security and tooling

- Added ESM configuration through `package.json`.
- Renamed the PostCSS configuration for ESM compatibility.
- Added Zod-based compile-time environment validation.
- Updated SEO and Redis configuration to use validated environment values.
- Created and updated GitHub Actions CI pipelines.

## Validation

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Verify localized routes and updated UI interactions.
- Verify the GitHub Actions workflows.

## Release notes

This release remains a prototype and requires accessibility testing, native-speaker
translation review, production counter rate limiting, final environment configuration,
and final official-domain configuration before public production launch.
```

## Release Checklist

- [ ] Confirm package version is `0.1.3`.
- [ ] Verify ESM middleware invocation.
- [ ] Verify the renamed PostCSS configuration is loaded successfully.
- [ ] Verify `/en`, `/si`, and `/ta` routes.
- [ ] Verify header and Top Utility Bar animations for all supported locales.
- [ ] Verify footer real data, affiliated websites, images, and GIFs.
- [ ] Verify ScrollToTop and AccessibilityWidget normal and hover states.
- [ ] Verify required environment variables are validated during compilation.
- [ ] Run lint, type checking, and production build validation.
- [ ] Verify all GitHub Actions CI workflows pass.
- [ ] Review Sinhala and Tamil translations with native speakers.
- [ ] Complete accessibility and end-to-end testing.
- [ ] Review API rate limiting before public production launch.
