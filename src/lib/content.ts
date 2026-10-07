import "server-only";
import { cache } from "react";
import { services } from "@/content/services";
import { pages } from "@/content/pages";
import { articles } from "@/content/articles";
import type { Service, Article } from "@/content/types";
import type { EditorialPage } from "@/content/pages";
import { approvedProjection, type Publication } from "./publication";
export type ContentSnapshot = {
  services: Service[];
  pages: EditorialPage[];
  articles: Article[];
};
export function contentPaths(content: ContentSnapshot) {
  return [
    "/",
    "/capabilities",
    "/expertise",
    "/insights",
    "/opportunities",
    "/contact",
    "/privacy",
    "/terms",
    "/thank-you",
    ...content.services.map((s) => `/capabilities/${s.slug}`),
    ...content.pages.map((p) => p.path),
    ...content.articles.map((a) => `/insights/${a.slug}`),
  ];
}
export const getContent = cache(async (): Promise<ContentSnapshot> => {
  if (process.env.CMS_ENABLED !== "true") return { services, pages, articles };
  const project = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  const token = process.env.SANITY_READ_TOKEN;
  const secret = process.env.CMS_CONTENT_SIGNING_SECRET;
  if (
    process.env.CMS_ACCESS_REVIEWED !== "true" ||
    !project ||
    !/^[a-z0-9]+$/.test(project) ||
    !dataset ||
    !/^[a-z0-9_-]+$/.test(dataset) ||
    !token ||
    !secret ||
    secret.length < 32
  )
    throw new Error(
      "CMS access and publisher configuration must be reviewed before activation",
    );
  const query =
    '*[_type in ["service","insight","editorialPage"] && !(_id in path("drafts.**")) && !(_id in path("versions.**"))]{_id,_type,publicationStatus,approvedAt,expiresAt,signature,content{slug,name,headline,summary,cta,image,imageAlt,variant,faqs[]{question,answer},related,topic,title,readMinutes,path,label,interest,alt,sections[]{id,title,paragraphs,bullets,table{caption,headings,rows[]{cells}}}}}';
  const url = new URL(
    `https://${project}.api.sanity.io/v2025-02-19/data/query/${dataset}`,
  );
  url.searchParams.set("query", query);
  url.searchParams.set("perspective", "published");
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "force-cache",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error("CMS publication unavailable");
  const body = await response.json();
  if (!Array.isArray(body.result) || body.result.length > 100)
    throw new Error("Invalid CMS content");
  const snapshot: ContentSnapshot = { services: [], pages: [], articles: [] };
  for (const doc of body.result as Publication[]) {
    const projection = approvedProjection(doc, secret);
    if (!projection) continue;
    if (doc._type === "service") snapshot.services.push(projection as Service);
    else if (doc._type === "insight")
      snapshot.articles.push(projection as Article);
    else snapshot.pages.push(projection as EditorialPage);
  }
  return snapshot;
});
