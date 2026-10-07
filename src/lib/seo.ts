import "server-only";
import type { Metadata } from "next";
import { productionOrigin, publicReleaseEnabled } from "./site-config";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url =
    publicReleaseEnabled && productionOrigin
      ? productionOrigin + path
      : undefined;
  return {
    title,
    description,
    ...(url
      ? {
          alternates: { canonical: url },
          openGraph: {
            type: "website",
            title,
            description,
            url,
            siteName: "Arnold Consulting",
            images: [
              {
                url: productionOrigin + "/media/social.png",
                width: 1200,
                height: 630,
                alt: "Arnold Consulting — Business ambition. People to make it happen.",
              },
            ],
          },
          twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [productionOrigin + "/media/social.png"],
          },
        }
      : {}),
  };
}
