import type { MetadataRoute } from "next";
import { publicReleaseEnabled, productionOrigin } from "@/lib/site-config";
import { contentPaths, getContent } from "@/lib/content";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  return publicReleaseEnabled && productionOrigin
    ? contentPaths(content)
        .filter(
          (path) =>
            path !== "/thank-you" &&
            (!path.startsWith("/capabilities/") ||
              content.services.some(
                (s) => path === `/capabilities/${s.slug}`,
              )) &&
            (!path.startsWith("/insights/") ||
              content.articles.some((a) => path === `/insights/${a.slug}`)),
        )
        .map((path) => ({ url: productionOrigin + path }))
    : [];
}
