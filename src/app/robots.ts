import type { MetadataRoute } from "next";
import { publicReleaseEnabled, productionOrigin } from "@/lib/site-config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: publicReleaseEnabled ? "/" : undefined,
      disallow: publicReleaseEnabled ? ["/api/", "/thank-you"] : "/",
    },
    ...(publicReleaseEnabled && productionOrigin
      ? { sitemap: `${productionOrigin}/sitemap.xml` }
      : {}),
  };
}
