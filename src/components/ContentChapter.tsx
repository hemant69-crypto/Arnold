import type { Section } from "@/content/types";
import {
  isEnhancement,
  sectionResources,
  sectionStyle,
} from "@/content/enhancements/presentation";
import { contentPaths, getContent } from "@/lib/content";
import { SiteLink as Link } from "./SiteLink";
import { Arrow } from "./LinkButton";
import { CompanyLinkedIn } from "./SocialLink";

async function Resources({ id, title }: { id: string; title: string }) {
  const resources = sectionResources[id];
  const social = ["about3", "ins3", "opp3", "contact3"].includes(id);
  if (!resources?.length && !social) return null;
  const paths = contentPaths(await getContent());
  const available = resources?.filter(({ href }) =>
    paths.includes(href.split("#")[0]),
  );
  if (!available?.length && !social) return null;
  return (
    <nav
      className="chapter-resources"
      aria-label={`Related to ${title.replace(/\.$/, "")}`}
    >
      {available?.map(({ label, href }) => (
        <Link key={href} href={href}>
          {label}
          <Arrow diagonal />
        </Link>
      ))}
      {social && (
        <CompanyLinkedIn>
          {id === "opp3"
            ? "View hiring updates on LinkedIn"
            : id === "about3"
              ? "Follow Arnold’s professional updates"
              : "Connect with Arnold on LinkedIn"}
        </CompanyLinkedIn>
      )}
    </nav>
  );
}

function Bullet({ text }: { text: string }) {
  const split = text.indexOf(" — ");
  return split < 0 ? (
    <>{text}</>
  ) : (
    <>
      <strong>{text.slice(0, split)}</strong>
      <span>{text.slice(split + 3)}</span>
    </>
  );
}

export function ContentChapter({
  section,
  wide = false,
}: {
  section: Section;
  wide?: boolean;
}) {
  const style = sectionStyle(section.id);
  const enhanced = isEnhancement(section.id);
  return (
    <section
      className={`prose-section content-chapter chapter-${style}${wide ? " chapter-wide" : ""}`}
      id={section.id}
      data-enhancement={enhanced ? section.id : undefined}
    >
      <div className="chapter-heading">
        {style === "example" && (
          <p className="chapter-note">Discussion framework</p>
        )}
        <h2>{section.title}</h2>
      </div>
      <div className="chapter-body">
        {section.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {section.id === "cap3" && (
          <figure className="decision-path">
            <figcaption>
              Connect the decisions before choosing the delivery.
            </figcaption>
            <ol>
              <li>
                <span>Business priority</span>
                <small>The work to make possible</small>
                <Arrow />
              </li>
              <li>
                <span>People requirement</span>
                <small>The contribution or capacity needed</small>
                <Arrow />
              </li>
              <li>
                <span>Agreed engagement</span>
                <small>The services, scope and owners</small>
              </li>
            </ol>
          </figure>
        )}
        {section.bullets && (
          <ul
            className={`chapter-list${enhanced ? " chapter-list-structured" : ""}`}
          >
            {section.bullets.map((item) => (
              <li key={item}>
                <Bullet text={item} />
              </li>
            ))}
          </ul>
        )}
        {section.table && (
          <div className="content-table">
            <table className="decision-table">
              <caption>{section.table.caption}</caption>
              <thead>
                <tr>
                  {section.table.headings.map((h) => (
                    <th scope="col" key={h}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.table.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) =>
                      j === 0 ? (
                        <th scope="row" key={j}>
                          {cell}
                        </th>
                      ) : (
                        <td key={j} data-label={section.table!.headings[j]}>
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Resources id={section.id} title={section.title} />
      </div>
    </section>
  );
}

export function ContentChapters({
  sections,
  tone = "light",
  compact = false,
}: {
  sections: Section[];
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  return (
    <div
      className={`section content-chapters ${tone === "light" ? "light" : "chapters-dark"}${compact ? " chapters-compact" : ""}`}
    >
      {sections.map((section) => (
        <ContentChapter section={section} wide key={section.id} />
      ))}
    </div>
  );
}
