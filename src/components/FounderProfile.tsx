import Image from "next/image";
import { SceneAtmosphere } from "./SceneAtmosphere";

export function FounderProfile() {
  return (
    <section
      className="section founder-profile"
      id="founder"
      aria-labelledby="founder-name"
      data-scene="founder"
      data-field-status="static"
    >
      <SceneAtmosphere variant="founder" />
      <div className="founder-heading">
        <p className="section-label">Meet our founder</p>
        <p className="founder-intention">
          A business perspective.
          <br />A personal commitment.
        </p>
      </div>
      <div className="founder-composition">
        <div className="founder-visual">
          <figure className="founder-portrait">
            <Image
              src="/media/cyril-nazareth-founder.webp"
              alt="Cyril Nandan Nazareth, Founder and CEO of Arnold Consulting"
              width={900}
              height={1200}
              sizes="(max-width:767px) 86vw, (max-width:1100px) 35vw, 380px"
            />
          </figure>
          <p className="founder-location">Bengaluru, India</p>
        </div>
        <div className="founder-copy">
          <h2 id="founder-name">
            Cyril Nandan <span>Nazareth</span>
          </h2>
          <p className="founder-role">Founder &amp; CEO, Arnold Consulting</p>
          <p className="founder-lead">
            Cyril brings more than two decades of professional experience in
            talent acquisition, workforce strategy and business growth.
          </p>
          <p>
            Based in Bengaluru, his work connects the needs of growing
            businesses with the leadership, specialist talent and workforce
            support required for their next stage.
          </p>
          <p>
            At Arnold Consulting, that perspective shapes a practical
            conversation: understand the business priority, clarify the people
            decisions and agree the support that fits. Talent acquisition and
            executive search, workforce solutions, background verification and
            HR advisory connect with the core consulting proposition. His focus
            is a considered partnership, with clear responsibilities and
            attention to the people behind each requirement.
          </p>
          <a
            className="founder-link"
            href="https://www.linkedin.com/in/cyrilnandannazareth/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect with Cyril on LinkedIn <span aria-hidden="true">↗</span>
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
