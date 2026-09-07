import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // All images are served locally from /public per the architecture decision
    // (no cloud storage / remote image domains needed for the prototype).
    unoptimized: false,
  },
};

export default withNextIntl(nextConfig);
