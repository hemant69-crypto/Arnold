import type { Section } from "../types";

export const legalEnhancements: Record<string, Section[]> = {
  "/privacy": [
    {
      id: "priv1",
      title: "Retention and deletion.",
      paragraphs: [
        "The local preview does not send enquiry messages to a delivery provider or collect CV uploads. Optional motion choices are stored for the browser visit. Production retention cannot be inferred from that preview behaviour.",
        "Before live collection begins, the accountable owner must approve the records kept, the purpose, access and deletion arrangements across the configured services. The following describes the current state and the decisions still needed; it does not promise an unconfigured deletion schedule.",
      ],
      table: {
        caption: "Current information lifecycle and production decisions",
        headings: ["Information", "Current preview", "Before activation"],
        rows: [
          [
            "Enquiry/provider records",
            "No connected delivery or website enquiry database.",
            "Confirm recipient access, provider retention and a workable deletion process.",
          ],
          [
            "Abuse prevention / request status",
            "Live enquiry handling is unavailable.",
            "Review the configured limiter and request-status record lifecycle.",
          ],
          [
            "Hosting logs",
            "The local server serves this preview.",
            "Review actual host access, processing and log retention.",
          ],
          [
            "Visit preferences",
            "Motion choices may be stored in session storage for this visit.",
            "Retain truthful controls and explain any change in storage behaviour.",
          ],
        ],
      },
    },
    {
      id: "priv2",
      title: "Who receives information and where it is processed.",
      paragraphs: [
        "This preview has no connected enquiry recipient, live analytics provider or ATS. A future host, email provider, authorised business recipient or candidate portal may process information needed for its function. Its actual role and processing arrangements must be recorded when configured.",
        "Before activation, review which information each provider receives, where it is processed, who can access it and which contractual or other requirements apply. A statement that Arnold serves USA clients does not by itself establish the location or legal arrangements of website processing.",
      ],
    },
    {
      id: "priv3",
      title: "External links and visitor choices.",
      paragraphs: [
        "The website includes a plain link to Arnold’s LinkedIn company page. Following it takes you to LinkedIn, where that service’s terms, privacy information and account choices apply. The website does not embed a LinkedIn feed or install a social tracking pixel through this link.",
        "You can pause the website’s automatic visual motion through its controls. A browser preference for reduced motion provides still alternatives. Optional visit preferences contain no enquiry message. Analytics remains disabled in this preview; any future activation requires reviewed events and the appropriate visitor choices.",
      ],
    },
  ],
  "/terms": [
    {
      id: "terms1",
      title: "Separate agreements define the work.",
      paragraphs: [
        "Service descriptions and business examples help introduce a discussion. An enquiry or website visit does not begin an engagement, reserve capacity or establish a delivery commitment. The approved agreement defines the actual services, responsibilities, commercial terms and other commitments.",
        "Illustrative briefs, diagrams and checklists are general discussion aids. They contain no client results and do not replace a scoped engagement. Candidate information and hiring updates are not an employment offer; a hiring organisation’s actual selection and employment process applies.",
      ],
    },
    {
      id: "terms2",
      title: "Following an external link.",
      paragraphs: [
        "The company LinkedIn link offers a route to professional updates. A future verified ATS link will offer a separate application route. The external service controls its content, availability and applicable terms and privacy information.",
        "A company update can remain visible after a hiring need changes. Check the current vacancy and its instructions before applying. Visiting a profile or portal is not an application confirmation, and an external service’s decisions are not established by its link on this website.",
      ],
    },
    {
      id: "terms3",
      title: "Questions, corrections and updates.",
      paragraphs: [
        "The Contact page identifies the available business route and the current state of enquiry sending. The local preview has no monitored website submission channel. A responsible production contact must be confirmed before this becomes a public route for website questions or corrections.",
        "The accountable owner must review the final terms and identify their effective or last-reviewed date before launch. Material updates should be recorded clearly. This preview does not claim that visiting the website retroactively accepts an unreviewed future agreement.",
      ],
    },
  ],
};
