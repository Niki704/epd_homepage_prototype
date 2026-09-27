# EPD Homepage Prototype

## Public Change Log and Pull Request Notes

**Release:** `v0.1.5`
**Project:** Educational Publications Department Homepage Prototype
**Status:** Prototype release
**Source:** Consolidated commit history for the `fix/ESMProdError` branch (merged with `main`)

## Release Overview

Version `0.1.5` finalizes the production middleware ESM resolution effort and merges in the already-landed Next.js 16 / audit-remediation work from `main`. It closes out the multi-attempt debugging saga around `next-intl/middleware`'s module interop, migrates the middleware file to the Next.js 16 `proxy.ts` convention, and brings the branch fully current with the dependency and lint-tooling upgrades already on `main`.

The release includes:

- Removal of a duplicate `getRequestConfig` definition in the i18n configuration.
- Resolution (via rollback) of a `next-intl/middleware` CommonJS/ESM interop workaround that proved unnecessary.
- Full merge of `main`'s Next.js 16 upgrade, next-intl v4 upgrade, and pnpm audit remediation.
- Migration of the middleware file from `middleware.ts` to the Next.js 16 `proxy.ts` convention.
- ESLint flat-config migration (`eslint.config.mjs`, ESLint 9).
- Removal of the webpack-only `extensionAlias` workaround, no longer needed under Turbopack.
- `tsconfig.json` updates for Next.js 16 type generation.

## Commit 1

### `feat(fix): Removed duplicate getRequestConfig from i18n. (Attempt: 03)`

### Summary

Third attempt in the middleware ESM debugging series. Removed a duplicate `getRequestConfig` definition from the i18n configuration to prevent conflicting request-config registration.

### Affected Areas

- i18n configuration (specific file not confirmed — no diff available for this commit)

## Commit 2

### `feat(fix): Modified middleware initial creation method. (Attempt: 04)`

### Summary

Fourth attempt in the middleware ESM debugging series. Reworked how `createMiddleware` is obtained from `next-intl/middleware` to defend against a suspected interop failure in production.

### File: `middleware.ts`

- Renamed the default import from `next-intl/middleware` to `nextIntlMiddleware`, to free up the `createMiddleware` identifier.
- Added a defensive unwrap: `const createMiddleware = (nextIntlMiddleware as unknown as { default?: typeof nextIntlMiddleware }).default ?? nextIntlMiddleware;`
- Rationale: guarded against `next-intl/middleware`'s CommonJS export sometimes not being unwrapped correctly by native ESM default-import interop.

### Affected Areas

- `middleware.ts`

## Commit 3

### `feat(fix): Middleware rolled back to the old standards. (Attempt: 05)`

### Summary

Fifth attempt in the middleware ESM debugging series. Reverted the Attempt 04 interop workaround after determining it was unnecessary, and simplified the middleware back to a synchronous, plain-import implementation.

### File: `middleware.ts`

- Reverted to a plain `import createMiddleware from "next-intl/middleware";` default import.
- Removed the `.default ?? nextIntlMiddleware` interop unwrap added in Attempt 04.
- Removed the inline comment on `localePrefix: "always"`.
- Removed `async`/`await` around the middleware function and the `intlMiddleware(request)` call — the handler is synchronous again.
- Preserved the security headers block and the `matcher` config unchanged.

### Affected Areas

- `middleware.ts`

## Commit 4

### `Merge remote-tracking branch 'origin/main' into fix/ESMProdError`

### Summary

Brought the already-completed Next.js 16 upgrade, next-intl v4 upgrade, and pnpm audit remediation from `main` into `fix/ESMProdError`, and renamed the middleware file to match the Next.js 16 `proxy.ts` convention.

### File: `.eslintignore`

- Removed. Superseded by the `ignores` array in `eslint.config.mjs`.

### File: `.eslintrc.json`

- Removed. Superseded by flat config.

### File: `eslint.config.mjs`

- Created. Uses `FlatCompat` to bridge `next/core-web-vitals` and `next/typescript` legacy shareable configs into ESLint's flat config format.
- Declares `ignores` for `node_modules`, `.next`, `out`, `build`, and `next-env.d.ts`.

### File: `next.config.ts`

- Removed the webpack `resolve.extensionAlias` block (`{ ".js": [".ts", ".tsx", ".js"] }`), no longer needed now that Turbopack is the default build tool and extensionless imports are used instead.

### File: `package.json`

- Version set to `0.1.5`.
- `next`: `^15.0.0` → `^16.3.6`.
- `next-intl`: `^3.21.0` → `^4.14.6`.
- `eslint`: `^8.57.0` → `^9.39.5`.
- `eslint-config-next`: `^15.0.0` → `^15.5.26`.
- Added `@eslint/eslintrc: ^3.3.7` as a development dependency (required by the `FlatCompat` bridge).

### File: `pnpm-lock.yaml`

- Updated to match the dependency changes above.

### File: `pnpm-workspace.yaml`

- Added build-script allowances for `@parcel/watcher` and `@swc/core`.

### File: `middleware.ts` → `proxy.ts`

- Renamed to match the Next.js 16 `proxy.ts` convention.
- Changed the `NextRequest` import to a type-only import: `import type { NextRequest } from "next/server";`.
- Changed the i18n config import from extensioned (`./i18n.config.js`) to extensionless (`./i18n.config`), matching Turbopack's resolver.
- Renamed the exported function from `middleware` to `proxy`.
- Preserved the security headers block and `matcher` config unchanged.

### File: `tsconfig.json`

- Reformatted `lib`, `plugins`, and `paths` arrays to multiline.
- `jsx`: `"preserve"` → `"react-jsx"`.
- Added `.next/dev/types/**/*.ts` to `include`.

### Affected Areas

- `.eslintignore` (removed)
- `.eslintrc.json` (removed)
- `eslint.config.mjs` (created)
- `next.config.ts`
- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `middleware.ts` → `proxy.ts`
- `tsconfig.json`

## Release Highlights

### Middleware and runtime

- Closed out the multi-attempt `next-intl/middleware` interop debugging series.
- Migrated to the Next.js 16 `proxy.ts` convention.
- Removed the now-obsolete webpack-only ESM resolution workaround.

### Platform and dependencies

- Next.js upgraded to `16.3.6` (Turbopack default build).
- `next-intl` upgraded to `4.14.6`.
- All `pnpm audit` vulnerabilities resolved (postcss advisories via the Next.js bump, next-intl advisories via the major version bump).

### Tooling

- ESLint migrated to flat config (`eslint.config.mjs`) on ESLint `9.39.5`, working around an `eslint-plugin-react` incompatibility with ESLint 10.
- `tsconfig.json` updated for Next.js 16 type generation.

## Known Limitations for `v0.1.5`

- **This branch's final state has not been re-validated in this session** — `pnpm run lint`, `tsc --noEmit`, and `pnpm run build` were last confirmed clean *before* the Attempt 03/04/05 middleware rework and the merge from `main`. Re-run all three before merging.
- Locale routes (`/en`, `/si`, `/ta`) and the proxy middleware need to be manually re-verified after this merge, given the file rename and import changes.
- Much of the content remains prototype or placeholder data.
- Redis counter write endpoints require rate limiting before public production use.
- Sinhala and Tamil content requires native-speaker review.
- Accessibility controls and modal behavior require further production hardening.
- Automated unit, integration, accessibility, and end-to-end tests are still recommended.

## Pull Request Message

### PR Title

```text
Release v0.1.5: finalize middleware ESM resolution and merge Next.js 16 / audit remediation
```

### PR Description

```markdown
## Summary

This pull request finalizes the `fix/ESMProdError` middleware debugging effort
and merges it with the already-landed Next.js 16 upgrade and pnpm audit
remediation from `main`. It closes out the multi-attempt interop debugging
around `next-intl/middleware` and completes the migration to the Next.js 16
`proxy.ts` convention.

## What changed

### Middleware / runtime
- Removed a duplicate `getRequestConfig` definition from the i18n configuration.
- Attempted, then rolled back, a defensive `next-intl/middleware` CommonJS/ESM
  interop workaround after determining it was unnecessary.
- Simplified `middleware.ts` back to a synchronous, plain-import implementation.
- Merged in `main`'s work and renamed `middleware.ts` to `proxy.ts`, switching
  to a type-only `NextRequest` import and an extensionless i18n config import.

### Dependencies
- `next`: `15.0.0` → `16.3.6` (Turbopack default build).
- `next-intl`: `3.21.0` → `4.14.6`.
- `eslint`: `8.57.0` → `9.39.5`; migrated to flat config (`eslint.config.mjs`).
- `eslint-config-next`: `15.0.0` → `15.5.26`.
- Removed the webpack-only `extensionAlias` resolution workaround.

## Validation

- [ ] `pnpm run lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm run build`
- [ ] Verify `/en`, `/si`, `/ta` routes resolve correctly.
- [ ] Verify the proxy middleware runs correctly in a deployed/preview environment.

> Note: the above have not yet been re-run since the Attempt 03–05 middleware
> rework and the merge from `main` — run them before merging this PR.

## Release notes

This release remains a prototype. Locale routing and the proxy middleware
should be re-verified in a preview deployment before this is treated as
production-stable, given the file rename and interop changes in this PR.
```

## Release Checklist

- [ ] Confirm package version is `0.1.5`.
- [ ] Run `pnpm run lint`, `pnpm exec tsc --noEmit`, and `pnpm run build` locally — none of these have been re-confirmed since the Attempt 03–05 middleware changes.
- [ ] Verify `/en`, `/si`, `/ta` routes in a preview deployment.
- [ ] Verify the proxy middleware (security headers + locale redirect) in a deployed environment, not just locally.
- [ ] Confirm `pnpm audit` still reports 0 vulnerabilities after the merge.
- [ ] Confirm whether this PR should close any linked GitHub issue (not specified here).
- [ ] Delete `fix/ESMProdError` after merge.
