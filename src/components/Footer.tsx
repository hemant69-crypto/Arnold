import { SiteLink as Link } from "./SiteLink";
import { CompanyLinkedIn } from "./SocialLink";
import { Arrow, LinkButton } from "./LinkButton";
import { pillars } from "@/content/pillars";
import { company } from "@/content/company";
import { BrandLogo } from "./BrandLogo";
import { ContactDetails } from "./ContactDetails";
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
        <Link className="wordmark" href="/" aria-label="Arnold Consulting home">
          <BrandLogo />
        </Link>
        <p>
          Business consulting.
          <br />
          Connected to delivery.
        </p>
      </div>
      <div className="footer-main">
        <div className="footer-contact">
          <ContactDetails />
        </div>
        <div className="footer-nav">
          <nav aria-label="Footer capabilities">
            <p>Our service pillars</p>
            {pillars
              .filter((p) => paths.includes(p.href))
              .map((p) => (
                <Link href={p.href} key={p.href}>
                  {p.name}
                </Link>
              ))}
            {available.includes("training") && (
              <Link href="/capabilities/training">Capability Building</Link>
            )}
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
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {company.legalName}
        </span>
        <span>Business ambition. People to make it happen.</span>
      </div>
    </footer>
  );
}
