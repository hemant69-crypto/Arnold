import { SiteLink as Link } from "./SiteLink";
import { CompanyLinkedIn } from "./SocialLink";
import { Arrow, LinkButton } from "./LinkButton";
export function Conversation({
  title = "What does your next chapter need?",
  interest = "",
}: {
  title?: string;
  interest?: string;
}) {
  return (
    <section className="conversation section">
      <p className="section-label">Let’s start with your business</p>
      <h2>{title}</h2>
      <LinkButton href={`/contact${interest ? `?interest=${interest}` : ""}`}>
        Discuss your business needs
      </LinkButton>
      <div className="candidate-entry">
        Looking for your next role?
        <Link href="/opportunities">
          Explore opportunities <Arrow diagonal />
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
          Business consulting for leadership,
          <br />
          talent and workforce capability.
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
            ["Training", "training"],
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
            ["Consulting", "/consulting"],
            ["GCC & Technology", "/gcc"],
            ["Expertise", "/expertise"],
            ["For employers", "/employers"],
            ["Approach", "/approach"],
            ["About", "/about"],
            ["Insights", "/insights"],
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
          <Link href="/contact">Discuss your business needs</Link>
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
