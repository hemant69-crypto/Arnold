import Image from "next/image";
import { SiteLink as Link } from "./SiteLink";
import type { Section, Service } from "@/content/types";
import type { ReactNode } from "react";
import { Conversation } from "./Footer";
import { LinkButton } from "./LinkButton";
import { SectionVideo } from "./SectionVideo";
import { ContentChapter } from "./ContentChapter";
export function PageIntro({
  label,
  title,
  summary,
  cta,
  href = "/contact",
}: {
  label: string;
  title: string;
  summary: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="page-intro">
      <p className="section-label">{label}</p>
      <h1>{title}</h1>
      <div className="intro-bottom">
        <p>{summary}</p>
        {cta ? <LinkButton href={href}>{cta}</LinkButton> : null}
      </div>
    </section>
  );
}
export function ProseSections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section) => (
        <ContentChapter key={section.id} section={section} />
      ))}
    </>
  );
}
export function SectionNav({ sections }: { sections: Section[] }) {
  return (
    <aside className="page-aside">
      <p>On this page</p>
      <nav aria-label="On this page">
        {sections.map((s) => (
          <Link key={s.id} href={`#${s.id}`}>
            {s.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
export function ReadingSequence({
  sections,
  interlude,
  interludeAfter,
  children,
}: {
  sections: Section[];
  interlude?: ReactNode;
  interludeAfter?: string;
  children?: ReactNode;
}) {
  const anchor = interludeAfter
    ? sections.findIndex((s) => s.id === interludeAfter)
    : -1;
  const split = interlude
    ? anchor >= 0
      ? anchor + 1
      : Math.ceil(sections.length / 2)
    : sections.length;
  return (
    <>
      <div className="section light service-layout">
        <SectionNav sections={sections} />
        <div>
          <ProseSections sections={sections.slice(0, split)} />
          {!interlude && children}
        </div>
      </div>
      {interlude}
      {interlude && (
        <div className="section light service-layout">
          <div aria-hidden="true" />
          <div>
            <ProseSections sections={sections.slice(split)} />
            {children}
          </div>
        </div>
      )}
    </>
  );
}
export function ServicePage({
  service,
  available,
}: {
  service: Service;
  available: string[];
}) {
  return (
    <div className={`service-page service-${service.variant ?? service.slug}`}>
      <PageIntro
        label={service.name}
        title={service.headline}
        summary={service.summary}
        cta={service.cta}
        href={`/contact?interest=${service.slug}`}
      />
      {service.image ? (
        <figure className="service-hero-image">
          <Image
            src={`/media/${service.image}`}
            alt={service.imageAlt ?? ""}
            fill
            sizes="100vw"
            quality={service.slug === "training" ? 65 : 75}
            preload
          />
        </figure>
      ) : null}
      <ReadingSequence
        sections={service.sections}
        interludeAfter={service.slug === "training" ? "scope" : undefined}
        interlude={
          service.slug === "training" ? (
            <SectionVideo
              asset="workshop"
              label="Learning with a purpose"
              title="Build capability around the work."
              summary="A defined audience. A practical learning need. A clear way to discuss progress."
            />
          ) : undefined
        }
      >
        <section className="prose-section">
          <h2>A few practical questions</h2>
          {service.faqs.map((faq) => (
            <details className="faq" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </section>
        <nav className="related-links" aria-label="Related capabilities">
          <Link href="/capabilities">All capabilities</Link>
          {service.related
            .filter((slug) => available.includes(slug))
            .map((slug) => (
              <Link href={`/capabilities/${slug}`} key={slug}>
                {slug
                  .split("-")
                  .map((w) => w[0].toUpperCase() + w.slice(1))
                  .join(" ")}
              </Link>
            ))}
        </nav>
      </ReadingSequence>
      <Conversation
        title={
          service.cta === "Discuss a leadership mandate"
            ? "What does your next leader need to make possible?"
            : "Let’s put the requirement in perspective."
        }
        interest={service.slug}
      />
    </div>
  );
}
