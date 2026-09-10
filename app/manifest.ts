import type { MetadataRoute } from "next";
import { siteName, siteUrl } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "EPD Sri Lanka",
    description:
      "Official website of the Educational Publications Department, Sri Lanka.",
    start_url: "/en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b3d62",
    icons: [
      {
        src: `${siteUrl}/favicon.ico`,
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
