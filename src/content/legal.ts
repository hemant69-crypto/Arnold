import { expandSections } from "./enhancements";
import type { EditorialPage } from "./pages";
const baseLegalPages: EditorialPage[] = [
  {
    path: "/privacy",
    label: "Privacy",
    title: "Your information, handled deliberately.",
    summary:
      "This notice describes the current local preview. Public launch requires confirmation of the responsible legal entity, contact channel, providers and retention arrangements.",
    sections: [
      {
        id: "preview",
        title: "The current preview.",
        paragraphs: [
          "The current website preview has no connected enquiry delivery service, candidate portal or analytics provider. Its enquiry form is unavailable for sending. It does not create a candidate database or accept CV uploads.",
          "The website may load its own images, fonts and illustrative video. Motion preferences can be kept in session storage for the current visit. Those preferences contain no enquiry information.",
        ],
      },
      {
        id: "enquiries",
        title: "Business enquiries when enabled.",
        paragraphs: [
          "A configured business enquiry will request your name, email address, company, service interest and message, with an optional phone number. The purpose is to consider and respond to your business requirement. It is not a subscription to marketing.",
          "Delivery must be connected to an approved recipient and provider before the form is enabled. Processing locations, access, retention and deletion arrangements must be confirmed in this notice before public submission is offered. Please do not include sensitive personal information, CVs or confidential candidate records.",
        ],
      },
      {
        id: "technical",
        title: "Technical and abuse-prevention information.",
        paragraphs: [
          "The hosting service may process connection information needed to serve and protect the website. Actual hosting access, log retention and processing arrangements must be confirmed for the production environment.",
          "When enquiries are enabled, limited abuse-prevention and request-status records are used to rate-limit requests and avoid repeated delivery. The implementation is designed to keep enquiry messages out of routine logs and analytics. Provider retention must be reviewed before launch.",
        ],
      },
      {
        id: "candidates",
        title: "Candidate applications.",
        paragraphs: [
          "Applications belong in Arnold’s configured ATS, when available. The Opportunities page identifies whether a portal is connected. The ATS provider’s privacy information and application process must be reviewed when the portal is added.",
        ],
      },
      {
        id: "analytics",
        title: "Analytics and optional services.",
        paragraphs: [
          "Analytics is disabled in this preview. An analytics provider, its permitted events and any required consent mechanism must be approved before activation. No enquiry field, CV or sensitive personal information should be sent to analytics.",
        ],
      },
      {
        id: "requests",
        title: "Questions and requests.",
        paragraphs: [
          "The production privacy contact and the legal entity responsible for the website are awaiting confirmation. The local preview is not a channel for submitting privacy requests. These details must be published and the notice reviewed before launch.",
        ],
      },
    ],
  },
  {
    path: "/terms",
    label: "Website terms",
    title: "Clear conditions for using this website.",
    summary:
      "These terms describe the local website preview. The legal entity, jurisdiction and production contact must be confirmed and reviewed before public launch.",
    sections: [
      {
        id: "information",
        title: "Information and service scope.",
        paragraphs: [
          "Website content introduces proposed service descriptions and general perspectives. It does not form an engagement agreement, employment offer or guarantee of an outcome. Specific services, responsibilities, commercial terms and commitments require a separate agreement.",
          "General articles are intended to help frame a business conversation. They do not replace advice tailored to a particular organisation or specialist legal, tax, regulatory or employment guidance.",
        ],
      },
      {
        id: "use",
        title: "Appropriate use.",
        paragraphs: [
          "Use the website for lawful business or career information. Do not attempt to disrupt its operation, misuse enquiry channels, introduce malicious content or obtain information you are not authorised to access.",
          "Do not submit sensitive personal information, CVs or confidential candidate records through the employer enquiry form. Candidate applications should use the configured ATS when available.",
        ],
      },
      {
        id: "material",
        title: "Website material and third-party services.",
        paragraphs: [
          "The preview contains original website code and writing, self-hosted fonts and licensed illustrative media. Stock subjects and locations are not presented as Arnold employees, clients or offices. Rights in third-party material remain with the relevant rights holders.",
          "A configured candidate portal or other external service operates under its own terms and privacy information. Its availability and application decisions are not established merely by a link appearing on this website.",
        ],
      },
      {
        id: "availability",
        title: "Availability and enquiries.",
        paragraphs: [
          "The local preview has no connected live enquiry delivery service or candidate portal. A successful enquiry confirmation will be shown only after a configured provider accepts the request; acceptance does not establish inbox delivery or a human response.",
          "Production availability, operating responsibilities and contact details must be confirmed before launch. No uninterrupted service or hiring outcome is promised through this preview.",
        ],
      },
      {
        id: "review",
        title: "Production review.",
        paragraphs: [
          "The accountable owner must confirm the legal entity, applicable jurisdiction, contact details and final wording before publishing these terms. Until then, the website remains a local review environment.",
        ],
      },
    ],
  },
];

export const legalPages: EditorialPage[] = baseLegalPages.map((page) => ({
  ...page,
  sections: expandSections(page.path, page.sections),
}));
