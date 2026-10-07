import Image from "next/image";
import { SiteLink as Link } from "./SiteLink";
import { SignatureExperience, MotionControl } from "./SignatureExperience";
import { HeroHeadline } from "./HeroHeadline";
import { Cinema } from "./Cinema";
import { Arrow, LinkButton } from "./LinkButton";
import { Conversation } from "./Footer";
import type { Article } from "@/content/types";
import { ClientStrip } from "./ClientStrip";
export const familyData = [
  {
    title: "Talent acquisition",
    image: "leadership-discussion.jpg",
    alt: "Illustrative discussion between business leaders",
    copy: "Find the specialists who move the work forward. Appoint the leaders who give it direction.",
    links: [
      ["Permanent Staffing", "permanent-staffing"],
      ["Executive Search", "executive-search"],
    ],
  },
  {
    title: "Workforce delivery",
    image: "team-collaboration.jpg",
    alt: "Illustrative team collaborating at a shared worktable",
    copy: "Bring recruitment capacity and time-bound talent into step with demand, with clear ownership throughout.",
    links: [
      ["Recruitment Process Outsourcing", "recruitment-process-outsourcing"],
      ["Temporary Staffing", "temporary-staffing"],
    ],
  },
  {
    title: "People capability",
    image: "learning-session.jpg",
    alt: "Illustrative learning and discussion session",
    copy: "Turn a people question or learning need into a focused engagement, with a clear audience and purpose.",
    links: [
      ["HR Solutions", "hr-solutions"],
      ["Training", "training"],
    ],
  },
];
export function Families({
  available,
  scenes = false,
}: {
  available: string[];
  scenes?: boolean;
}) {
  return (
    <div className={scenes ? "capability-scenes" : "families"}>
      {familyData
        .filter((f) => f.links.some(([, slug]) => available.includes(slug)))
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
                  .filter(([, slug]) => available.includes(slug))
                  .map(([label, slug]) => (
                    <Link href={`/capabilities/${slug}`} key={slug}>
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
              Connect your next business priority with the leadership,
              specialist talent and people capability to move it forward.
            </p>
            <div className="hero-actions">
              <LinkButton href="/contact">
                Discuss your business needs
              </LinkButton>
              <LinkButton
                href={
                  paths.includes("/consulting")
                    ? "/consulting"
                    : "/capabilities"
                }
                quiet
              >
                {paths.includes("/consulting")
                  ? "Explore consulting"
                  : "Explore capabilities"}
              </LinkButton>
            </div>
          </div>
          <div className="hero-bottom">
            <span>
              Rooted in India.
              <br />
              Working with the USA.
            </span>
            <a href="#perspective">Scroll to explore ↓</a>
          </div>
          <MotionControl />
        </section>
        <section className="section context signature-context" id="perspective">
          <p className="section-label">The business comes first</p>
          <div>
            <h2>
              New direction.
              <br />
              New demands on your people.
            </h2>
            <div className="context-copy">
              <p>
                A growing team. A critical appointment. A hiring programme that
                needs more capacity. Each starts with a different business
                question.
              </p>
              <p>
                We help connect that question to the right talent, workforce or
                people engagement, with the priorities and responsibilities
                clear from the start.
              </p>
            </div>
          </div>
        </section>
        <ClientStrip />
        <section className="section signature-capabilities">
          <div className="capability-head">
            <div>
              <p className="section-label">Connected capabilities</p>
              <h2>
                Different challenges.
                <br />
                Connected capabilities.
              </h2>
            </div>
            <LinkButton href="/capabilities" quiet>
              Find your starting point
            </LinkButton>
          </div>
          <Families available={available} scenes />
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
            <p className="section-label">GCC & Technology</p>
            <h2 id="gcc-feature-heading">
              Your next stage.
              <br />
              The right people.
            </h2>
            <p className="gcc-summary">
              Whether you are appointing a centre leader or growing a technology
              team, make the people plan follow the work ahead. Connect your
              next business milestone with the talent and hiring support it
              needs.
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
            <LinkButton href="/gcc">Explore GCC & Technology</LinkButton>
          </div>
        </section>
      )}
      <Cinema />
      {paths.includes("/approach") && (
        <section className="section light approach-preview">
          <div>
            <p className="section-label">A considered approach</p>
            <h2>
              A clear brief.
              <br />A shared direction.
            </h2>
            <LinkButton href="/approach" quiet>
              How we work together
            </LinkButton>
          </div>
          <div>
            {[
              [
                "01",
                "Understand the business context",
                "What needs to change? Start with the work ahead and the contribution people need to make.",
              ],
              [
                "02",
                "Agree the scope and ownership",
                "Define the priorities, the work involved and who owns each decision.",
              ],
              [
                "03",
                "Review what matters",
                "Review progress, remove stalled decisions and adjust when the business requirement changes.",
              ],
            ].map(([n, title, copy]) => (
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
      {articles.length ? (
        <section className="section">
          <div className="capability-head">
            <div>
              <p className="section-label">Perspectives</p>
              <h2>
                Better questions.
                <br />
                Clearer decisions.
              </h2>
            </div>
            <LinkButton href="/insights" quiet>
              Explore our perspectives
            </LinkButton>
          </div>
          <InsightTeasers articles={articles} />
        </section>
      ) : null}
      <Conversation />
    </>
  );
}
