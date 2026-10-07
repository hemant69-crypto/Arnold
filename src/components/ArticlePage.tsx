import { SiteLink as Link } from "./SiteLink";
import type { Article } from "@/content/types";
import { ProseSections, SectionNav } from "./ContentBlocks";
import { LinkButton } from "./LinkButton";
export function ArticlePage({
  article,
  relatedAvailable,
}: {
  article: Article;
  relatedAvailable: boolean;
}) {
  return (
    <>
      <header className="page-intro article-hero">
        <p className="section-label">{article.topic}</p>
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span>Arnold perspectives</span>
          <span>{article.readMinutes} minute read</span>
        </div>
      </header>
      <div className="section light service-layout article-layout">
        <SectionNav sections={article.sections} />
        <article>
          <p className="article-summary">{article.summary}</p>
          <ProseSections sections={article.sections} />
          <div className="related-links">
            {relatedAvailable && (
              <LinkButton href={article.related}>
                Explore the related capability
              </LinkButton>
            )}
            <Link href="/insights">All perspectives</Link>
          </div>
        </article>
      </div>
    </>
  );
}
