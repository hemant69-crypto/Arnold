import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Home } from "@/components/Home";
import { ServicePage } from "@/components/ContentBlocks";
import { legalPages } from "@/content/legal";
import { ArticlePage } from "@/components/ArticlePage";
import { Consulting } from "@/components/Consulting";
import {
  Capabilities,
  Editorial,
  Expertise,
  Insights,
  Opportunities,
} from "@/components/SitePages";
import { atsUrl } from "@/lib/site-config";
import { contentPaths, getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
type Props = { params: Promise<{ slug?: string[] }> };
export async function generateStaticParams() {
  const { services, pages, articles } = await getContent();
  const routes = [
    "/",
    "/capabilities",
    "/expertise",
    "/insights",
    "/opportunities",
    ...services.map((s) => `/capabilities/${s.slug}`),
    ...pages.map((p) => p.path),
    ...legalPages.map((p) => p.path),
    ...articles.map((a) => `/insights/${a.slug}`),
  ];
  return routes.map((path) => ({ slug: path.split("/").filter(Boolean) }));
}
export const dynamicParams = false;
const hubs: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Business ambition. People to make it happen.",
    description:
      "Leadership search, specialist talent, recruitment outsourcing and people capability for businesses and GCC teams.",
  },
  "/capabilities": {
    title: "Our capabilities",
    description:
      "Six connected services for leadership, talent acquisition, workforce delivery and people capability.",
  },
  "/expertise": {
    title: "Our expertise",
    description:
      "Technology, GCC and business-function talent contexts, connected with the work your organisation needs.",
  },
  "/insights": {
    title: "Perspectives",
    description:
      "Original perspectives on GCC hiring roadmaps, recruitment capacity and leadership mandates.",
  },
  "/opportunities": {
    title: "Opportunities",
    description:
      "Find the availability of Arnold’s candidate portal and prepare for the application journey.",
  },
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { services, pages, articles } = await getContent();
  const { slug = [] } = await params;
  const path = "/" + slug.join("/");
  const service =
    slug[0] === "capabilities"
      ? services.find((s) => s.slug === slug[1])
      : undefined;
  const page = [...pages, ...legalPages].find((p) => p.path === path);
  const article =
    slug[0] === "insights"
      ? articles.find((a) => a.slug === slug[1])
      : undefined;
  const meta =
    path === "/consulting"
      ? {
          title: "Business Consulting for Talent and Workforce",
          description:
            "Connect business priorities with leadership, talent and workforce capability. Explore Arnold Consulting’s approach to business and people decisions.",
        }
      : service
        ? { title: service.name, description: service.summary }
        : page
          ? { title: page.label, description: page.summary }
          : article
            ? { title: article.title, description: article.summary }
            : (hubs[path] ?? {
                title: "Arnold Consulting",
                description:
                  "Leadership search, specialist talent, recruitment outsourcing and people capability for businesses and GCC teams.",
              });
  return pageMetadata(meta.title, meta.description, path);
}
export default async function Page({ params }: Props) {
  const { services, pages, articles } = await getContent();
  const { slug = [] } = await params;
  const path = "/" + slug.join("/");
  if (!slug.length)
    return (
      <Home
        articles={articles}
        available={services.map((s) => s.slug)}
        paths={contentPaths({ services, pages, articles })}
      />
    );
  if (path === "/capabilities")
    return <Capabilities available={services.map((s) => s.slug)} />;
  if (path === "/expertise") return <Expertise />;
  if (path === "/insights") return <Insights articles={articles} />;
  if (path === "/opportunities") return <Opportunities ats={atsUrl} />;
  const service =
    slug.length === 2 && slug[0] === "capabilities"
      ? services.find((s) => s.slug === slug[1])
      : undefined;
  if (service)
    return (
      <ServicePage service={service} available={services.map((s) => s.slug)} />
    );
  const page = [...pages, ...legalPages].find((p) => p.path === path);
  if (page && path === "/consulting")
    return (
      <Consulting
        page={page}
        services={services}
        articles={articles}
        paths={contentPaths({ services, pages, articles })}
      />
    );
  if (page) return <Editorial page={page} />;
  const article =
    slug.length === 2 && slug[0] === "insights"
      ? articles.find((a) => a.slug === slug[1])
      : undefined;
  if (article)
    return (
      <ArticlePage
        article={article}
        relatedAvailable={
          services.some((s) => article.related === `/capabilities/${s.slug}`) ||
          pages.some((p) => p.path === article.related)
        }
      />
    );
  notFound();
}
