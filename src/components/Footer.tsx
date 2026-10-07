import { SiteLink as Link } from "./SiteLink";
import { CompanyLinkedIn } from "./SocialLink";
import { Arrow, LinkButton } from "./LinkButton";
export function Conversation({
  title = "What does your next stage require?",
  interest = "",
}: {
  title?: string;
  interest?: string;
}) {
  return (
    <section className="conversation section">
      <p className="section-label">Let’s start with the business question</p>
      <h2>{title}</h2>
      <LinkButton href={`/contact${interest ? `?interest=${interest}` : ""}`}>
        Discuss a business priority
      </LinkButton>
      <div className="candidate-entry">
        Looking for your next role?
        <Link href="/opportunities">
          Find your next opportunity <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
export function Footer({
  available,
  paths,
}: {
  available: string[];
  paths: string[];
}) {
  return (
    <footer className="site-footer" data-menu-background>
      <div className="footer-top">
        <Link className="wordmark" href="/">
          arnold <span>consulting</span>
        </Link>
        <p>
          Business consulting.
          <br />
          Connected to delivery.
        </p>
      </div>
      <div className="footer-nav">
        <nav aria-label="Footer capabilities">
          <p>Capabilities</p>
          {[
            ["Permanent Staffing", "permanent-staffing"],
            ["Executive Search", "executive-search"],
            [
              "Recruitment Process Outsourcing",
              "recruitment-process-outsourcing",
            ],
            ["HR Solutions", "hr-solutions"],
            ["Temporary Staffing", "temporary-staffing"],
            ["Capability Building", "training"],
          ]
            .filter(([, slug]) => available.includes(slug))
            .map(([label, slug]) => (
              <Link href={`/capabilities/${slug}`} key={slug}>
                {label}
              </Link>
            ))}
        </nav>
        <nav aria-label="Footer explore">
          <p>Explore</p>
          {[
            ["Business Consulting", "/consulting"],
            ["GCC & Enterprise Capability", "/gcc"],
            ["Expertise", "/expertise"],
            ["For employers", "/employers"],
            ["Approach", "/approach"],
            ["About", "/about"],
            ["Arnold Insights", "/insights"],
          ]
            .filter(([, href]) => paths.includes(href))
            .map(([label, href]) => (
              <Link href={href} key={href}>
                {label}
              </Link>
            ))}
        </nav>
        <nav aria-label="Footer connect">
          <p>Connect</p>
          <Link href="/contact">Discuss a business priority</Link>
          <Link href="/opportunities">Opportunities</Link>
          <CompanyLinkedIn />
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Arnold Consulting</span>
        <span>Business ambition. People to make it happen.</span>
      </div>
    </footer>
  );
}
