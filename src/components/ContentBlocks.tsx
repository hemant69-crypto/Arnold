import Image from "next/image";
import { SiteLink as Link } from "./SiteLink";
import type { Section, Service } from "@/content/types";
import type { ReactNode } from "react";
import { Conversation } from "./Footer";
import { PageIntro } from "./PageIntro";
export { PageIntro } from "./PageIntro";
import { SectionVideo } from "./SectionVideo";
import { ContentChapter } from "./ContentChapter";
import { pillars } from "@/content/pillars";
import { PillarIntro } from "./PillarIntro";
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
  const presentations = {
    "workforce-solutions": {
      variant: "workforce" as const,
      after: "contract-to-hire",
      asset: "workforceTeam" as const,
      label: "People around a shared purpose",
      title: "Capacity, connected to the work.",
      summary:
        "The right skills, a clear assignment and an arrangement that supports your next business milestone.",
    },
    "background-verification": {
      variant: "verification" as const,
      after: "verification-consent",
      asset: "verificationReview" as const,
      label: "A considered review",
      title: "Clarity before the next decision.",
      summary:
        "Agreed checks. Appropriate consent. A clear account of what has been confirmed and what still needs attention.",
    },
    "hr-advisory": {
      variant: "advisory" as const,
      after: "fractional-leadership",
      asset: "advisoryMeeting" as const,
      label: "Experience at the table",
      title: "People leadership for your next stage.",
      summary:
        "Bring the business priority into the room. Build the HR direction, practical processes and leadership support around it.",
    },
  };
  const pillar = presentations[service.slug as keyof typeof presentations];
  const Intro = pillar ? PillarIntro : PageIntro;
  return (
    <div className={`service-page service-${service.variant ?? service.slug}`}>
      <Intro
        {...(pillar
          ? { variant: pillar.variant }
          : { variant: "talent" as const })}
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
        interludeAfter={
          pillar?.after ?? (service.slug === "training" ? "scope" : undefined)
        }
        interlude={
          pillar ? (
            <SectionVideo
              asset={pillar.asset}
              label={pillar.label}
              title={pillar.title}
              summary={pillar.summary}
            />
          ) : service.slug === "training" ? (
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
          <Link href="/capabilities">Talent &amp; Search</Link>
          <Link href="/consulting">Business Consulting</Link>
          {service.related
            .filter((slug) => available.includes(slug))
            .map((slug) => (
              <Link href={`/capabilities/${slug}`} key={slug}>
                {pillars.find((p) => p.interest === slug)?.name ??
                  (slug === "training"
                    ? "Capability Building"
                    : slug
                        .split("-")
                        .map((w) => w[0].toUpperCase() + w.slice(1))
                        .join(" "))}
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
