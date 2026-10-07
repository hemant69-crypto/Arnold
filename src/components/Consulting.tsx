import type { EditorialPage } from "@/content/pages";
import type { Article, Section, Service } from "@/content/types";
import { consultingAdvisory } from "@/content/consulting";
import { SiteLink as Link } from "./SiteLink";
import { Arrow, LinkButton } from "./LinkButton";
import { InsightTeasers } from "./Home";
import { SignatureExperience, MotionControl } from "./SignatureExperience";
import { SectionVideo } from "./SectionVideo";
import { ConsultingMotion } from "./ConsultingMotion";
import "@/app/consulting.css";

const contents = [
  ["Business priorities", "business-priorities"],
  ["Advisory areas", "advisory-areas"],
  ["What you receive", "practical-outputs"],
  ["How we work", "working-together"],
  ["GCC & Technology", "gcc-and-technology"],
  ["Questions", "consulting-questions"],
];
const situationTargets = [
  "business-workforce-alignment",
  "leadership-critical-roles",
  "talent-acquisition-effectiveness",
  "workforce-capacity",
  "people-practices",
  "gcc-and-technology",
];
const articleOrder = [
  "calibrating-a-leadership-mandate",
  "choosing-an-rpo-engagement",
  "planning-a-gcc-hiring-roadmap",
];

function Paragraphs({ section }: { section: Section }) {
  return (
    <>
      {section.paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </>
  );
}

export function Consulting({
  page,
  services,
  articles,
  paths,
}: {
  page: EditorialPage;
  services: Service[];
  articles: Article[];
  paths: string[];
}) {
  // A CMS publication must retain these composition IDs; validation is server-side.
  const part = (id: string) => page.sections.find((s) => s.id === id)!;
  const hero = part("hero-context"),
    point = part("perspective");
  const priorities = part("business-priorities"),
    areas = part("advisory-areas");
  const film = part("business-in-motion"),
    outputs = part("practical-outputs");
  const journey = part("working-together"),
    gcc = part("gcc-and-technology");
  const capabilities = part("connected-capabilities"),
    principles = part("working-principles");
  const perspectives = part("perspectives"),
    questions = part("consulting-questions");
  const closing = part("start-a-conversation");
  const enquiry = "/contact?interest=consulting";
  const relatedArticles = articleOrder.flatMap((slug) =>
    articles.filter((a) => a.slug === slug),
  );
  return (
    <ConsultingMotion>
      <SignatureExperience>
        <section
          className="consulting-hero"
          id="consulting"
          aria-labelledby="consulting-title"
          data-motion-scene="0"
        >
          <p className="consulting-category">Business consulting</p>
          <h1 id="consulting-title">{page.title}</h1>
          <p className="consulting-descriptor">{page.summary}</p>
          <div className="consulting-hero-lower">
            <p>{hero.paragraphs[1]}</p>
            <div className="consulting-hero-actions">
              <LinkButton href={enquiry}>{page.cta}</LinkButton>
              <LinkButton href="#advisory-areas" quiet>
                Explore our advisory areas
              </LinkButton>
            </div>
          </div>
          <div className="consulting-hero-bottom">
            <span>
              Rooted in India.
              <br />
              Working with the USA.
            </span>
            <MotionControl />
            <Link href="#perspective">
              Start with the business decision <Arrow />
            </Link>
          </div>
        </section>
      </SignatureExperience>

      <nav
        className="consulting-contents"
        aria-label="Consulting page contents"
      >
        {contents.map(([label, id]) => (
          <Link key={id} href={`#${id}`} data-consult-contents={id}>
            {label}
          </Link>
        ))}
      </nav>

      <section
        className="consulting-point consulting-light consulting-section"
        id="perspective"
        aria-labelledby="perspective-title"
      >
        <div className="consulting-section-head">
          <p className="consulting-note">Our point of view</p>
          <h2 id="perspective-title" data-consult-reveal>
            {point.title}
          </h2>
        </div>
        <div className="consulting-point-body">
          <p className="consulting-lead">{hero.paragraphs[0]}</p>
          <div className="consulting-prose">
            <Paragraphs section={point} />
          </div>
          <p className="consulting-pull">{point.bullets?.[0]}</p>
        </div>
      </section>

      <section
        className="consulting-priorities consulting-light consulting-section"
        id="business-priorities"
        data-consult-chapter
        aria-labelledby="priorities-title"
      >
        <div className="consulting-section-head">
          <p className="consulting-note">The questions ahead</p>
          <h2 id="priorities-title" data-consult-reveal>
            {priorities.title}
          </h2>
          <div className="consulting-prose">
            <Paragraphs section={priorities} />
          </div>
        </div>
        <div className="consulting-situations">
          {priorities.table?.rows.map(([title, copy], i) => (
            <Link
              className="consulting-situation"
              href={`#${situationTargets[i]}`}
              key={title}
            >
              <span className="consulting-number" aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <Arrow diagonal />
            </Link>
          ))}
        </div>
      </section>

      <section
        className="consulting-advisory consulting-section"
        id="advisory-areas"
        data-consult-chapter
        aria-labelledby="advisory-title"
      >
        <div className="consulting-advisory-intro">
          <p className="consulting-note">Our advisory focus</p>
          <h2 id="advisory-title" data-consult-reveal>
            {areas.title}
          </h2>
          <div className="consulting-prose">
            <Paragraphs section={areas} />
          </div>
        </div>
        <div className="consulting-advisory-layout">
          <nav className="consulting-area-nav" aria-label="Six advisory areas">
            {consultingAdvisory.map((area, i) => (
              <Link
                key={area.id}
                href={`#${area.id}`}
                data-consult-area={area.id}
              >
                <span aria-hidden="true">0{i + 1}</span>
                <span>{area.label}</span>
              </Link>
            ))}
            <p>
              Begin with the business priority.
              <br />
              Agree the work around it.
            </p>
          </nav>
          <div className="consulting-advisory-narratives">
            {consultingAdvisory.map((area, i) => {
              const section = part(area.id);
              const related = area.services.flatMap((slug) =>
                services.filter((s) => s.slug === slug),
              );
              return (
                <article
                  className="consulting-advisory-item"
                  key={area.id}
                  id={area.id}
                  data-consult-narrative
                  aria-labelledby={`${area.id}-title`}
                >
                  <p className="consulting-note">
                    <span aria-hidden="true">0{i + 1} / </span>
                    {area.label}
                  </p>
                  <h3 id={`${area.id}-title`} data-consult-reveal>
                    {section.title}
                  </h3>
                  <div className="consulting-prose">
                    <Paragraphs section={section} />
                  </div>
                  <div className="consulting-focus">
                    <p>Focus of the conversation</p>
                    <ul>
                      {section.bullets?.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  {related.length > 0 && (
                    <div className="consulting-related">
                      <p>Connected capabilities</p>
                      <div>
                        {related.map((s) => (
                          <Link key={s.slug} href={`/capabilities/${s.slug}`}>
                            {s.name}
                            <Arrow diagonal />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <div
        className="consulting-film"
        id="business-in-motion"
        data-consult-film
      >
        <SectionVideo
          asset="consultingDiscussion"
          label="The business conversation"
          title={film.title}
          summary={film.paragraphs[0]}
          cinematic
        />
      </div>

      <section
        className="consulting-outputs consulting-light consulting-section"
        id="practical-outputs"
        data-consult-chapter
        aria-labelledby="outputs-title"
      >
        <div className="consulting-section-head">
          <p className="consulting-note">What you receive</p>
          <h2 id="outputs-title" data-consult-reveal>
            {outputs.title}
          </h2>
          <p className="consulting-prose">{outputs.paragraphs[0]}</p>
        </div>
        <div className="consulting-output-layout">
          <figure className="consulting-priority-map">
            <figcaption>
              A priority map <span>Illustrative format</span>
            </figcaption>
            <div className="consulting-map-graphic">
              <svg
                viewBox="0 0 500 470"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M250 60 V130 M250 130 H65 V220 M250 130 V220 M250 130 H435 V220 M65 265 V355 H250 M435 265 V355 H250 M250 265 V410"
                  data-consult-path
                />
              </svg>
              <p className="map-origin">Business priority</p>
              <div className="map-branches">
                <p>
                  Leadership
                  <br />
                  mandate
                </p>
                <p>
                  Specialist
                  <br />
                  roles
                </p>
                <p>
                  Skills and
                  <br />
                  capacity
                </p>
              </div>
              <p className="map-result">
                Decisions, dependencies
                <br />
                and a route forward
              </p>
            </div>
            <p className="consulting-map-caption">
              Start with the priority. Connect the people requirements. Make the
              next decision clear.
            </p>
          </figure>
          <div className="consulting-output-list">
            {outputs.table?.rows.map(([title, copy], i) => (
              <div className="consulting-output" key={title}>
                <span className="consulting-number" aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
            <p className="consulting-prose">{outputs.paragraphs[1]}</p>
          </div>
        </div>
      </section>

      <section
        className="consulting-journey consulting-light consulting-section"
        id="working-together"
        data-consult-chapter
        aria-labelledby="journey-title"
      >
        <div className="consulting-section-head">
          <p className="consulting-note">Working together</p>
          <h2 id="journey-title" data-consult-reveal>
            {journey.title}
          </h2>
        </div>
        <ol className="consulting-stages" data-consult-journey>
          {[1, 2, 3, 4].map((n) => {
            const stage = part(`engagement-${n}`);
            return (
              <li key={n} className="consulting-stage">
                <span className="consulting-stage-number" aria-hidden="true">
                  0{n}
                </span>
                <h3 data-consult-reveal>{stage.title}</h3>
                <div className="consulting-prose">
                  <Paragraphs section={stage} />
                  <p className="consulting-decision">
                    <span>The decision to make</span>
                    {stage.bullets?.[0]}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
        {paths.includes("/approach") && (
          <LinkButton href="/approach" quiet>
            Explore our approach
          </LinkButton>
        )}
      </section>

      <section
        className="consulting-gcc consulting-section"
        id="gcc-and-technology"
        data-consult-chapter
        aria-labelledby="gcc-title"
      >
        <div className="consulting-gcc-copy">
          <p className="consulting-note">Business context: GCC & Technology</p>
          <h2 id="gcc-title" data-consult-reveal>
            {gcc.title}
          </h2>
          <div className="consulting-prose">
            <Paragraphs section={gcc} />
          </div>
          {paths.includes("/gcc") && (
            <LinkButton href="/gcc">Explore GCC & Technology</LinkButton>
          )}
        </div>
        <figure className="consulting-gcc-sequence">
          <figcaption>From mandate to people requirements</figcaption>
          <ol>
            {[
              "Business mandate",
              "Leadership priorities",
              "Specialist roles",
              "Recruitment capacity",
              "Review and alignment",
            ].map((s, i) => (
              <li key={s}>
                <span aria-hidden="true">0{i + 1}</span>
                {s}
                {i < 4 && (
                  <span
                    className="consulting-sequence-line"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
          <p>
            Rooted in India.
            <br />
            Working with the USA.
          </p>
        </figure>
      </section>

      <section
        className="consulting-capabilities consulting-light consulting-section"
        id="connected-capabilities"
        aria-labelledby="capabilities-title"
      >
        <div className="consulting-section-head">
          <p className="consulting-note">Advice into action</p>
          <h2 id="capabilities-title" data-consult-reveal>
            {capabilities.title}
          </h2>
          <p className="consulting-prose">{capabilities.paragraphs[0]}</p>
        </div>
        <div className="consulting-service-map">
          {capabilities.table?.rows
            .filter((r) => services.some((s) => s.slug === r[2]))
            .map(([title, copy, slug], i) => (
              <Link
                className="consulting-service-row"
                key={slug}
                href={`/capabilities/${slug}`}
              >
                <span className="consulting-number" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <Arrow diagonal />
              </Link>
            ))}
        </div>
        <div className="consulting-capabilities-end">
          <p>{capabilities.paragraphs[1]}</p>
          <LinkButton href="/capabilities" quiet>
            Explore all capabilities
          </LinkButton>
        </div>
      </section>

      <section
        className="consulting-principles consulting-section"
        id="working-principles"
        aria-labelledby="principles-title"
      >
        <div className="consulting-principles-copy">
          <p className="consulting-note">A considered partnership</p>
          <h2 id="principles-title" data-consult-reveal>
            {principles.title}
          </h2>
          <div>
            {principles.table?.rows.map(([title, copy]) => (
              <div className="consulting-principle" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="consulting-secondary-film">
          <SectionVideo
            asset="consultingPerspective"
            label="A moment of perspective"
            title="A clear view of what comes next."
            headingLevel={3}
          />
          <p className="consulting-film-caption">
            Space to consider the choices. A practical way to move forward.
          </p>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section
          className="consulting-perspectives consulting-section"
          id="perspectives"
          aria-labelledby="perspectives-title"
        >
          <div className="consulting-section-head">
            <p className="consulting-note">Perspectives</p>
            <h2 id="perspectives-title" data-consult-reveal>
              {perspectives.title}
            </h2>
            <p className="consulting-prose">{perspectives.paragraphs[0]}</p>
          </div>
          <InsightTeasers articles={relatedArticles} />
        </section>
      )}

      <section
        className="consulting-questions consulting-light consulting-section"
        id="consulting-questions"
        data-consult-chapter
        aria-labelledby="questions-title"
      >
        <div>
          <p className="consulting-note">Before the conversation</p>
          <h2 id="questions-title" data-consult-reveal>
            {questions.title}
          </h2>
          <p>More about our focus, the work and a useful place to begin.</p>
        </div>
        <div>
          {page.sections
            .filter((s) => s.id.startsWith("question-"))
            .map((q) => (
              <details className="faq consulting-faq" key={q.id}>
                <summary>{q.title}</summary>
                <Paragraphs section={q} />
              </details>
            ))}
        </div>
      </section>

      <section
        className="consulting-closing consulting-section"
        id="start-a-conversation"
        aria-labelledby="closing-title"
      >
        <p className="consulting-note">Let’s start with your business</p>
        <h2 id="closing-title" data-consult-reveal>
          {closing.title}
        </h2>
        <div className="consulting-prose">
          <Paragraphs section={closing} />
        </div>
        <LinkButton href={enquiry}>{page.cta}</LinkButton>
        <div className="candidate-entry">
          Looking for your next role?
          <Link href="/opportunities">
            Explore opportunities <Arrow diagonal />
          </Link>
        </div>
      </section>
    </ConsultingMotion>
  );
}
