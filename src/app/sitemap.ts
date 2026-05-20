import type { MetadataRoute } from "next"

import { DEMO_FORM_ID } from "@/lib/constants"
import { publicEnv } from "@/lib/public-env"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: publicEnv.appUrl,
      lastModified: new Date(),
    },
    {
      url: `${publicEnv.appUrl}/form/${DEMO_FORM_ID}`,
      lastModified: new Date(),
    },
    {
      url: `${publicEnv.appUrl}/thank-you`,
      lastModified: new Date(),
    },
  ]
}
