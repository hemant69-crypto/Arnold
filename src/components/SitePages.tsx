import Image from "next/image";
import { SiteLink as Link } from "./SiteLink";
import type { Article } from "@/content/types";
import type { EditorialPage } from "@/content/pages";
import {
  PageIntro,
  ProseSections,
  ReadingSequence,
  SectionNav,
} from "./ContentBlocks";
import { ContentChapters } from "./ContentChapter";
import { enhancementSections } from "@/content/enhancements";
import { Conversation } from "./Footer";
import { Families, InsightTeasers } from "./Home";
import { LinkButton } from "./LinkButton";
import { ContactForm } from "./ContactForm";
import { SectionVideo } from "./SectionVideo";
import { homeWorkforceSections } from "@/content/workforce";
export function Editorial({ page }: { page: EditorialPage }) {
  return (
    <>
      <PageIntro
        label={page.label}
        title={page.title}
        summary={page.summary}
        cta={page.cta}
        href={`/contact${page.interest ? `?interest=${page.interest}` : ""}`}
      />
      {page.image ? (
        <figure className="service-hero-image">
          <Image
            src={`/media/${page.image}`}
            alt={page.alt ?? ""}
            fill
            sizes="100vw"
            quality={page.path === "/gcc" ? 65 : 75}
            preload={page.path === "/gcc"}
          />
        </figure>
      ) : null}
      <ReadingSequence
        sections={page.sections}
        interludeAfter={
          page.path === "/gcc"
            ? "specialists"
            : page.path === "/approach"
              ? "app2"
              : undefined
        }
        interlude={
          page.path === "/gcc" ? (
            <SectionVideo
              asset="technology"
              label="Specialist talent, shared direction"
              title="The mandate connects the team."
              summary="Leadership, critical specialists and recruitment capacity, considered in the right sequence."
            />
          ) : page.path === "/approach" ? (
            <SectionVideo
              asset="workshop"
              label="A useful conversation"
              title="Get the right questions into the room."
              summary="Start with the business objective. Make the priorities, responsibilities and next decision clear."
            />
          ) : undefined
        }
      >
        {page.path.startsWith("/expertise/") ? (
          <nav className="related-links" aria-label="Related routes">
            <Link href="/expertise">All expertise</Link>
            <Link href="/capabilities">Our capabilities</Link>
          </nav>
        ) : null}
      </ReadingSequence>
      {page.cta ? <Conversation interest={page.interest} /> : null}
    </>
  );
}
export function Capabilities({
  available,
  paths,
}: {
  available: string[];
  paths: string[];
}) {
  return (
    <>
      <PageIntro
        label="Our capabilities"
        title="From business priority to people capability."
        summary="Business consulting sets the direction. Leadership, Talent, Workforce, Capability and GCC connect six delivery services with the priorities and practical plan that follow."
        cta="Explore business consulting"
        href="/consulting"
      />
      <section className="section">
        <Families available={available} paths={paths} />
      </section>
      <ContentChapters sections={enhancementSections["/capabilities"]} />
      <ContentChapters sections={homeWorkforceSections.slice(0, 2)} />
      <section className="section light context">
        <p className="section-label">Choosing the right starting point</p>
        <div>
          <h2>Let the requirement shape the engagement.</h2>
          <div className="context-copy">
            <p>
              A specialist role and a leadership mandate call for different
              conversations. A recruitment programme and a time-bound workforce
              requirement need different responsibility maps.
            </p>
            <p>
              Begin with business consulting when the route is still open. Bring
              the objective, the decisions ahead and the timing. We connect
              those priorities with a practical people and workforce plan, then
              agree the right delivery.
            </p>
          </div>
          <div className="related-links">
            <LinkButton href="/consulting" quiet>
              Start with business consulting
            </LinkButton>
          </div>
        </div>
      </section>
      <Conversation />
    </>
  );
}
export function Expertise() {
  return (
    <>
      <PageIntro
        label="Our expertise"
        title="The context makes the capability relevant."
        summary="Understand the work, the operating environment and the contribution required. Explore technology and GCC talent, alongside selected business-function hiring contexts."
      />
      <ContentChapters
        sections={enhancementSections["/expertise"].slice(0, 1)}
      />
      <section className="section light">
        <div className="role-clusters">
          <article className="role-cluster">
            <h2>Technology</h2>
            <div className="wide-image">
              <Image
                src="/media/technology-infrastructure.jpg"
                alt="Illustrative technology infrastructure"
                fill
                sizes="(max-width:767px) 100vw, 45vw"
              />
            </div>
            <p>
              Software and product engineering, cloud, data engineering, AI/ML,
              cybersecurity, DevOps, SAP and Oracle talent requirements.
            </p>
            <LinkButton href="/expertise/technology" quiet>
              Explore technology talent
            </LinkButton>
          </article>
          <article className="role-cluster">
            <h2>Business functions</h2>
            <div className="wide-image">
              <Image
                src="/media/team-collaboration.jpg"
                alt="Illustrative business collaboration"
                fill
                sizes="(max-width:767px) 100vw, 45vw"
              />
            </div>
            <p>
              Sales, customer service, operations and business support,
              calibrated around the responsibilities of the function.
            </p>
            <LinkButton href="/expertise/business-functions" quiet>
              Explore business functions
            </LinkButton>
          </article>
        </div>
      </section>
      <ContentChapters
        sections={enhancementSections["/expertise"].slice(1)}
        tone="dark"
      />
      <Conversation />
    </>
  );
}
export function Insights({ articles }: { articles: Article[] }) {
  return (
    <>
      <PageIntro
        label="Arnold Insights"
        title="Perspectives on what comes next."
        summary="Leadership. Workforce. AI & Work. GCC. Talent & Skills. Practical thinking for business leaders and professionals making decisions about the next stage."
      />
      <ContentChapters
        sections={enhancementSections["/insights"].slice(0, 1)}
      />
      <section className="section">
        <InsightTeasers articles={articles} />
      </section>
      <ContentChapters sections={enhancementSections["/insights"].slice(1)} />
      <Conversation />
    </>
  );
}
export function Contact({
  enabled,
  requestId,
}: {
  enabled: boolean;
  requestId: string;
}) {
  return (
    <>
      <PageIntro
        label="Contact"
        title="What does your business need next?"
        summary="Start with your business priority: growth, a leadership decision, a GCC mandate or a workforce challenge. We can clarify the consulting conversation and the delivery that follows."
      />
      <section className="section light contact-layout">
        <div>
          <h2>Start with the context.</h2>
          <p>
            Share what you want the business to achieve, what is getting in the
            way and which decisions need attention. You can begin with business
            consulting or bring a defined leadership, talent, GCC or workforce
            requirement.
          </p>
          <div className="notice">
            <h3>Looking for a role?</h3>
            <p>
              Candidate applications belong in the Opportunities journey. Please
              keep CVs out of the employer enquiry form.
            </p>
            <LinkButton href="/opportunities" quiet>
              Explore opportunities
            </LinkButton>
          </div>
          <p>
            For sensitive or confidential requirements, start with a high-level
            description and agree an appropriate channel for further details.
          </p>
        </div>
        <ContactForm enabled={enabled} requestId={requestId} />
      </section>
      <ContentChapters sections={enhancementSections["/contact"]} />
    </>
  );
}
export function Opportunities({ ats }: { ats: string | null }) {
  const [contexts, journey, questions] = enhancementSections["/opportunities"];
  return (
    <>
      <PageIntro
        label="Opportunities"
        title="Your career is changing. We help you stay ahead."
        summary="Find opportunities that match your skills, ambitions and future potential. Explore the work behind the role, prepare for interviews and build the skills your next chapter requires."
      />
      <section className="section light service-layout">
        <SectionNav
          sections={[
            { id: "portal", title: "Application portal", paragraphs: [] },
            contexts,
            {
              id: "prepare",
              title: "Prepare your information",
              paragraphs: [],
            },
            journey,
            { id: "care", title: "Application care", paragraphs: [] },
            questions,
          ]}
        />
        <div>
          <section className="availability" id="portal">
            <h2>
              {ats
                ? "Continue to the application portal."
                : "The application portal is not connected yet."}
            </h2>
            <p>
              {ats
                ? "The portal opens on the ATS provider’s website. Review its privacy information and the details of each role before applying."
                : "No vacancies are displayed in this preview, and applications cannot be submitted here. The portal link will appear once it is supplied and verified."}
            </p>
            {ats ? (
              <LinkButton href={ats}>Open application portal</LinkButton>
            ) : (
              <p>
                Please return once the portal is available. The business enquiry
                form does not accept CVs or applications.
              </p>
            )}
          </section>
          <ProseSections sections={[contexts]} />
          <section className="prose-section" id="prepare">
            <h2>Prepare a useful account of your experience.</h2>
            <p>
              When the portal is available, review the specific role and
              location before applying. Keep your experience, skills and contact
              details accurate and relevant to the requirement.
            </p>
            <p>
              Technology and business-function roles can have different
              responsibilities even when their titles are similar. Use the
              actual vacancy description as your guide.
            </p>
          </section>
          <ProseSections sections={[journey]} />
          <section className="prose-section" id="care">
            <h2>Use the confirmed application channel.</h2>
            <p>
              Do not send sensitive identity, financial or candidate information
              through the employer enquiry form. Application steps and privacy
              information should be provided through the verified ATS.
            </p>
            <p>
              A portal visit does not mean an application has been submitted.
              Follow the provider’s process and check for its actual
              confirmation.
            </p>
          </section>
          <ProseSections sections={[questions]} />
        </div>
      </section>
    </>
  );
}
export function ThankYou({ accepted }: { accepted: boolean }) {
  const sections = enhancementSections["/thank-you"].map((section) =>
    accepted && section.id === "thank1"
      ? {
          ...section,
          paragraphs: [
            "The configured delivery provider accepted your enquiry. Please avoid immediately sending the same request again. Provider acceptance does not confirm inbox delivery or a human response; follow-up depends on the confirmed business process.",
          ],
        }
      : accepted && section.id === "thank3"
        ? {
            ...section,
            title: "Useful routes while you wait.",
            paragraphs: [
              "Explore Capabilities for the six services or Approach for the working relationship. If you arrived here while looking for a role, Opportunities keeps applications separate from business enquiries.",
            ],
          }
        : section,
  );
  return (
    <>
      <PageIntro
        label={accepted ? "Enquiry accepted" : "Enquiry confirmation"}
        title={
          accepted
            ? "Thank you. Your enquiry has been accepted."
            : "There is no confirmed enquiry for this visit."
        }
        summary={
          accepted
            ? "The configured delivery provider accepted your enquiry for processing. That confirms acceptance, rather than inbox delivery or a response from the team."
            : "Opening this page does not submit an enquiry. Start with the contact form to discuss a business requirement."
        }
      />
      <ContentChapters sections={sections} compact />
      <section className="section light confirmation-routes">
        <LinkButton href={accepted ? "/capabilities" : "/contact"}>
          {accepted ? "Explore our capabilities" : "Go to contact"}
        </LinkButton>
        <LinkButton href="/approach" quiet>
          Our approach
        </LinkButton>
        <LinkButton href="/opportunities" quiet>
          For candidates
        </LinkButton>
      </section>
    </>
  );
}
