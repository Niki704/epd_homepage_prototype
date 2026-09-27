## Summary

Fixes a production-only middleware crash (`ERR_MODULE_NOT_FOUND`) that caused
all page routes to 500 on Vercel while working normally in local dev and CI.

**Urgent Fix::Direct merge to main**

## Root cause

`"type": "module"` in `package.json` forced native Node ESM module resolution
(which requires explicit file extensions on relative imports) onto the deployed
middleware process, while the rest of the toolchain assumed bundler-style
resolution. This gap was invisible locally and in CI since neither runs
middleware through the same execution path as the deployed Lambda.

## What changed

- Removed `"type": "module"` from `package.json`.
- Reverted the `i18n.config` import in `middleware.ts` to its original
  extensionless form (bundler resolution handles it correctly).
- Cleaned up the middleware `config` export: removed an invalid `runtime: "edge"`
  value (middleware defaults to Edge; the key only accepts `"nodejs"` as an
  explicit opt-in) and tightened the `matcher` pattern to exclude `_next`,
  `/api/*`, and asset requests.

## Validation

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Verified `/en`, `/si`, `/ta` load correctly on the production deployment
  after promotion.

## Notes

Production environment variables should be reconfirmed under the Production
scope in Vercel project settings before merging.

EPD Homepage Prototype
PR: Fix — Middleware ESM Production Crash

Branch: fix/ESMProdError
Project: Educational Publications Department Homepage Prototype
Status: Bug fix
Source: Consolidated commit history for branch fix/ESMProdError

Overview

This PR resolves a production-only middleware crash (ERR_MODULE_NOT_FOUND: Cannot find module '/var/task/i18n.config') that only surfaced after deployment to Vercel, never locally or in CI. Root cause: "type": "module" in package.json switched Node's module resolution to strict native ESM (which requires explicit file extensions on relative imports) for any code path that executed as a plain Node process, while the project's imports and bundler config assumed the more forgiving CommonJS/bundler-style resolution used by next dev, next build, and Edge Middleware bundling. Fixing it required removing that flag and reverting two interim workarounds applied while isolating the cause.

Commit 1
feat(fix): Applied a fix (Attempt 01)

Summary: Initial attempt at resolving the ESM module resolution mismatch in middleware.

Changes:

Removed "type": "module" from package.json.
Added a file extension to the i18n.config import path in middleware.ts (./i18n.config → ./i18n.config.js) to satisfy native Node ESM's explicit-extension requirement.
Added an explicit runtime: "edge" value to the middleware config export to force Edge bundling.

Affected Areas:

package.json
middleware.ts
Commit 2
feat: Matcher updated in the middleware.

Summary: Refined the middleware matcher pattern to more precisely scope which requests invoke locale-routing middleware.

Changes:

Updated the matcher pattern in the middleware config export to exclude \_next, all /api/\* routes, and any path containing a file extension, ensuring middleware runs only against page navigations.

Affected Areas:

middleware.ts
Commit 3
feat(fix): Removed runtime: edge from middleware config. (Middleware defaults to edge and accepts only nodejs)

Summary: Corrected an invalid runtime declaration introduced in Commit 1.

Changes:

Removed the runtime: "edge" key from the middleware config export. Middleware runs on the Edge runtime by default and requires no explicit declaration; the runtime key in this config only accepts an opt-in value of "nodejs" (or the deprecated "experimental-edge"), so "edge" caused a build-time validation failure.

Affected Areas:

middleware.ts
Commit 4
feat(fix): Revert the changes applied to the i18n import path.

Summary: Reverted the extension workaround from Commit 1, now unnecessary.

Changes:

Reverted the i18n.config import in middleware.ts from ./i18n.config.js back to ./i18n.config. With "type": "module" removed, standard bundler resolution (webpack/Next, not native Node ESM) handles the extensionless import correctly; the explicit .js extension pointing at a .ts source file broke webpack's resolver instead.

Affected Areas:

middleware.ts
Root Cause Summary
"type": "module" in package.json forced strict native-ESM resolution rules onto any code executing as a plain Node.js process, requiring explicit extensions on relative imports.
This was invisible locally (next dev) and in CI (next build) because neither executes middleware through the same runtime path as the deployed Vercel Lambda.
Removing "type": "module" restored bundler-based resolution project-wide, which is what both the build tooling and the deployed middleware actually rely on.
Validation
npm run lint
npm run typecheck
npm run build
Verify middleware invocation and locale routing for /en, /si, and /ta on the production deployment (not just a preview URL).
Confirm the live edupubgov.vercel.app deployment ID matches the latest commit after promotion, not a stale cached build.
Known Limitations
Root cause was confirmed empirically through iterative deploys rather than a single documented Vercel/Next.js issue — worth a regression check on the next Next.js version bump.
Production environment variables (SITE_URL, NEXT_PUBLIC_SITE_URL, Upstash Redis pair) should be reconfirmed as set under the Production scope in Vercel project settings, not only Preview/Development.
