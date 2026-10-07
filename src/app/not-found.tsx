import { PageIntro } from "@/components/ContentBlocks";
import { LinkButton } from "@/components/LinkButton";
export default function NotFound() {
  return (
    <>
      <PageIntro
        label="Page not found"
        title="A different starting point."
        summary="This address does not lead to an available page. Explore Arnold’s capabilities, find opportunities or start a conversation."
      />
      <section className="section light empty-state">
        <div className="recovery-grid">
          <div>
            <h2>Explore business support.</h2>
            <p>
              Compare the six capabilities or bring a business requirement to
              Contact.
            </p>
            <div className="related-links">
              <LinkButton href="/capabilities" quiet>
                Capabilities
              </LinkButton>
              <LinkButton href="/contact" quiet>
                Contact
              </LinkButton>
            </div>
          </div>
          <div>
            <h2>Find a career route.</h2>
            <p>
              Check the verified application portal’s availability and prepare
              for a hiring conversation.
            </p>
            <LinkButton href="/opportunities" quiet>
              Opportunities
            </LinkButton>
          </div>
          <div>
            <h2>Learn about Arnold.</h2>
            <p>
              Read our company perspective and practical thinking on the
              decisions ahead.
            </p>
            <div className="related-links">
              <LinkButton href="/about" quiet>
                About Arnold
              </LinkButton>
              <LinkButton href="/insights" quiet>
                Arnold Insights
              </LinkButton>
            </div>
          </div>
        </div>
        <div className="related-links">
          <LinkButton href="/">Home</LinkButton>
        </div>
      </section>
    </>
  );
}
