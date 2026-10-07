import Image from "next/image";
import { SiteLink as Link } from "./SiteLink";
import { SignatureExperience, MotionControl } from "./SignatureExperience";
import { HeroHeadline } from "./HeroHeadline";
import { Cinema } from "./Cinema";
import { Arrow, LinkButton } from "./LinkButton";
import { Conversation } from "./Footer";
import type { Article } from "@/content/types";
import { ClientStrip } from "./ClientStrip";
import {
  capabilityThemes,
  homeWorkforceSections,
  workforceFramework,
} from "@/content/workforce";
import { ContentChapters } from "./ContentChapter";
export const familyData = capabilityThemes;
export function Families({
  available,
  paths,
  scenes = false,
}: {
  available: string[];
  paths: string[];
  scenes?: boolean;
}) {
  const canLink = (href: string) => {
    const path = href.split("#")[0];
    return path.startsWith("/capabilities/")
      ? available.includes(path.split("/")[2])
      : paths.includes(path);
  };
  return (
    <div className={scenes ? "capability-scenes" : "families"}>
      {familyData
        .filter((f) => f.links.some(([, href]) => canLink(href)))
        .map((f, index) => (
          <article
            className={scenes ? "family capability-scene" : "family"}
            key={f.title}
            data-motion-scene={scenes ? index + 1 : undefined}
          >
            <figure>
              <Image
                src={`/media/${f.image}`}
                alt={f.alt}
                fill
                sizes={
                  scenes
                    ? "(max-width:1023px) 100vw, 58vw"
                    : "(max-width:767px) 100vw, 32vw"
                }
              />
            </figure>
            <div className="family-body">
              {scenes && (
                <p className="scene-index" aria-hidden="true">
                  0{index + 1}
                </p>
              )}
              <h3>{f.title}</h3>
              <p>{f.copy}</p>
              <div className="family-links">
                {f.links
                  .filter(([, href]) => canLink(href))
                  .map(([label, href]) => (
                    <Link href={href} key={href}>
                      {label}
                      <Arrow diagonal />
                    </Link>
                  ))}
              </div>
            </div>
          </article>
        ))}
    </div>
  );
}
export function InsightTeasers({ articles }: { articles: Article[] }) {
  return (
    <div className="insight-list">
      {articles.map((item) => (
        <article className="insight-item" key={item.slug}>
          <p className="topic">{item.topic}</p>
          <h3>
            <Link href={`/insights/${item.slug}`}>{item.title}</Link>
          </h3>
          <p>{item.summary}</p>
          <LinkButton href={`/insights/${item.slug}`} quiet>
            Read perspective
          </LinkButton>
        </article>
      ))}
    </div>
  );
}
const gccSupport = [
  {
    title: "Leadership search",
    copy: "Appoint leaders around the decisions your centre needs to own.",
    slug: "executive-search",
  },
  {
    title: "Specialist technology talent",
    copy: "Find the engineering, data, cloud and platform talent the work calls for.",
    slug: "permanent-staffing",
  },
  {
    title: "Recruitment capacity",
    copy: "Support the next hiring wave with clear priorities and shared ownership.",
    slug: "recruitment-process-outsourcing",
  },
];
export function Home({
  articles,
  available,
  paths,
}: {
  paths: string[];
  articles: Article[];
  available: string[];
}) {
  return (
    <>
      <SignatureExperience>
        <section className="hero" data-motion-scene="0">
          <HeroHeadline />
          <div className="hero-lower">
            <p>
              Business consulting for your next stage of growth. We help
              organizations build the leadership, talent, skills and workforce
              capability required to turn business priorities into results.
            </p>
            <div className="hero-actions">
              <LinkButton href="/contact?interest=consulting">
                Discuss a business priority
              </LinkButton>
              <LinkButton href="/consulting" quiet>
                Explore business consulting
              </LinkButton>
            </div>
          </div>
          <div className="hero-bottom">
            <span>
              Around 15 years of
              <br />
              market experience.
            </span>
            <a href="#perspective">Scroll to explore ↓</a>
          </div>
          <MotionControl />
        </section>
        <section className="section context signature-context" id="perspective">
          <p className="section-label">
            Business consulting, connected to delivery
          </p>
          <div>
            <h2>
              Your next business chapter.
              <br />
              The decisions behind it.
            </h2>
            <div className="context-copy">
              <p>
                Growth, a new GCC mandate or changing technology can reshape
                what your business needs from its people. Which leaders will
                take it forward? What skills will matter? How should capacity
                grow with demand?
              </p>
              <p>
                We start with those business questions. Clarify priorities,
                compare the routes available and build a practical plan. Then
                connect the advice with leadership search, talent, workforce
                models, capability building and GCC teams.
              </p>
            </div>
          </div>
        </section>
        <ClientStrip />
        <section className="section signature-capabilities">
          <div className="capability-head">
            <div>
              <p className="section-label">From consulting to execution</p>
              <h2>
                From business priority
                <br />
                to people capability.
              </h2>
            </div>
            <LinkButton href="/capabilities" quiet>
              Find your starting point
            </LinkButton>
          </div>
          <Families available={available} paths={paths} scenes />
        </section>
      </SignatureExperience>
      {paths.includes("/gcc") && (
        <section
          className="section light gcc-feature"
          id="gcc-technology"
          aria-labelledby="gcc-feature-heading"
        >
          <figure>
            <div className="gcc-image">
              <Image
                src="/media/bengaluru-aerial.jpg"
                alt="Aerial view of tree-lined neighbourhoods and offices"
                fill
                sizes="(max-width:1023px) 100vw, 45vw"
              />
            </div>
            <figcaption>
              <span>Bengaluru, India</span>
              <span>Illustrative cityscape</span>
            </figcaption>
          </figure>
          <div className="gcc-feature-copy">
            <p className="section-label">GCC & Enterprise Capability</p>
            <h2 id="gcc-feature-heading">
              Global capability.
              <br />
              Built around people.
            </h2>
            <p className="gcc-summary">
              Build, scale and transform global capability from India. Connect
              GCC leadership, product and engineering, technology and AI talent
              with the workforce plan behind your next business milestone.
            </p>
            <ul className="gcc-support">
              {gccSupport
                .filter(({ slug }) => available.includes(slug))
                .map(({ title, copy, slug }) => (
                  <li key={slug}>
                    <Link href={`/capabilities/${slug}`}>
                      <div>
                        <h3>{title}</h3>
                        <p>{copy}</p>
                      </div>
                      <Arrow diagonal />
                    </Link>
                  </li>
                ))}
            </ul>
            <LinkButton href="/gcc">Build your GCC team</LinkButton>
          </div>
        </section>
      )}
      <Cinema />
      <ContentChapters sections={homeWorkforceSections.slice(0, 2)} />
      {paths.includes("/approach") && (
        <section className="section light approach-preview">
          <div>
            <p className="section-label">The Arnold Workforce Framework</p>
            <h2>
              Understand. Design.
              <br />
              Build. Scale.
            </h2>
            <LinkButton href="/approach" quiet>
              How we work together
            </LinkButton>
          </div>
          <div>
            {workforceFramework.map(([n, title, copy]) => (
              <div className="checkpoint" key={n}>
                <span>{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <ContentChapters sections={homeWorkforceSections.slice(2)} />
      {articles.length ? (
        <section className="section">
          <div className="capability-head">
            <div>
              <p className="section-label">Arnold Insights</p>
              <h2>
                Better questions.
                <br />
                Clearer decisions.
              </h2>
            </div>
            <LinkButton href="/insights" quiet>
              Explore Arnold Insights
            </LinkButton>
          </div>
          <InsightTeasers articles={articles} />
        </section>
      ) : null}
      <Conversation />
    </>
  );
}
