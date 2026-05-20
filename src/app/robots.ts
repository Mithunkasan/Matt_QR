import type { MetadataRoute } from "next"

import { publicEnv } from "@/lib/public-env"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/admin"],
      },
    ],
    sitemap: `${publicEnv.appUrl}/sitemap.xml`,
  }
}
