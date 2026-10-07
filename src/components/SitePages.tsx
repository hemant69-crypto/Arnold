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
export function Capabilities({ available }: { available: string[] }) {
  return (
    <>
      <PageIntro
        label="Our capabilities"
        title="Different needs. Connected capabilities."
        summary="Start with the business situation. Six services, organised into three families, provide clear routes to discuss leadership, talent, workforce capacity and people capability."
        cta="Discuss your business needs"
      />
      <section className="section">
        <Families available={available} />
      </section>
      <ContentChapters sections={enhancementSections["/capabilities"]} />
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
              If the service is not yet clear, bring the objective, the people
              involved and the timing. The first step is to understand the
              requirement and confirm an appropriate scope.
            </p>
          </div>
          <div className="related-links">
            <LinkButton href="/employers" quiet>
              Prepare for a conversation
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
        label="Perspectives"
        title="Better questions for the decisions ahead."
        summary="Practical thinking on leadership mandates, recruitment capacity and GCC hiring. Start with the context, make the responsibilities clear and keep the next decision in view."
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
        summary="Tell us about the work ahead and the people requirement. A short outline is enough to begin a useful conversation."
      />
      <section className="section light contact-layout">
        <div>
          <h2>Start with the context.</h2>
          <p>
            Share the role, function, programme or capability you want to
            discuss. We can clarify the service and scope around the
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
        title="Your next chapter deserves a clear starting point."
        summary="Explore career opportunities through Arnold’s application portal when it is connected. Applications and candidate information belong in the ATS, separate from business enquiries."
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
