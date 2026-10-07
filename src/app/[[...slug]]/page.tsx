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
      "Business consulting for your next stage of growth, connected to leadership, talent, workforce capability and GCC teams. Around 15 years of market experience.",
  },
  "/capabilities": {
    title: "Our capabilities",
    description:
      "Business consulting sets the direction. Leadership, Talent, Workforce, Capability and GCC connect the advice with six practical delivery services.",
  },
  "/expertise": {
    title: "Our expertise",
    description:
      "Technology, GCC and business-function talent contexts, connected with the work your organisation needs.",
  },
  "/insights": {
    title: "Arnold Insights",
    description:
      "Original perspectives on leadership, workforce, AI and work, GCC, talent and skills.",
  },
  "/opportunities": {
    title: "Find your next opportunity",
    description:
      "Your career is changing. Prepare for interviews, explore future skills and check the availability of Arnold’s application portal.",
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
          title: "Business Consulting",
          description:
            "Turn growth priorities into a practical people and workforce roadmap. Business consulting connected to leadership, talent, workforce capability and GCC delivery.",
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
                  "Business consulting connected to leadership, talent, workforce capability and GCC teams.",
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
    return (
      <Capabilities
        available={services.map((s) => s.slug)}
        paths={contentPaths({ services, pages, articles })}
      />
    );
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
