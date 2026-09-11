import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n.config";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always", // /en/, /si/, /ta/ — each independently indexable for SEO
});

export default async function middleware(request: NextRequest) {
  const response = await intlMiddleware(request);
  if (!response) return;

  // Basic security headers (see 03-architecture.md — Security Basics).
  // No admin surface exists, so this is a lightweight baseline, not a
  // hardened production config.
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
