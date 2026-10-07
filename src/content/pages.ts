import { expandSections } from "./enhancements";
import type { Section } from "./types";
import { consultingPage } from "./consulting";
export type EditorialPage = {
  path: string;
  label: string;
  title: string;
  summary: string;
  cta?: string;
  interest?: string;
  image?: string;
  alt?: string;
  sections: Section[];
};
const basePages: EditorialPage[] = [
  consultingPage,
  {
    path: "/gcc",
    label: "GCC & Enterprise Capability",
    title: "Build, scale and transform global capability from India.",
    summary:
      "Build the workforce behind your GCC mandate: leadership, product and engineering, technology and AI talent, critical skills and recruitment capacity, sequenced around the work ahead.",
    cta: "Build your GCC team",
    interest: "gcc",
    image: "bengaluru-aerial.jpg",
    alt: "Bengaluru cityscape illustrating a technology and GCC talent context",
    sections: [
      {
        id: "mandate",
        title: "Understand the centre you are building.",
        paragraphs: [
          "A GCC talent requirement should follow the business mandate. The team may be taking ownership of a function, extending a technology capability or supporting an established operation. Each situation creates different leadership, specialist and recruitment needs.",
          "Begin with the work the centre is expected to own, the decisions it will hold and the stage it has reached. Separate approved requirements from possible future growth. Make dependencies visible so a hiring plan reflects business readiness as well as ambition.",
          "Our consulting conversation turns that mandate into a people and workforce roadmap: leadership responsibilities, critical roles, hiring waves and the decisions needed to proceed. Executive Search, specialist recruitment, RPO and capability building then support the priorities within the agreed engagement.",
        ],
      },
      {
        id: "gcc-growth",
        title: "GCC setup, scaling and transformation: the people dimension.",
        paragraphs: [
          "For a new GCC, connect workforce planning with the first leaders, foundational specialists and recruitment readiness. As the centre scales, align hiring waves with the capability the global business expects it to own. For transformation, revisit the roles, skills and leadership needed for a changed mandate.",
          "GCC leadership and leadership localisation start with clear decision rights between the India team and global stakeholders. Product and engineering, technology and AI talent, and capability-building needs then follow that mandate, with recruitment and learning activities defined around the centre's priorities.",
          "Arnold’s contribution is leadership, talent and workforce capability. Full GCC establishment, legal or tax structuring, facilities, infrastructure and technology implementation need separately accountable specialists; these are not implied by GCC talent support.",
        ],
        bullets: [
          "Setup: Frame GCC leadership, critical skills, foundational talent and a workable recruitment plan.",
          "Scale: Connect specialist hiring, workforce capacity and recruitment governance with the next business milestone.",
          "Transform: Review leadership, technology and AI skills, workforce planning and capability needs around the new mandate.",
        ],
      },
      {
        id: "sequence",
        title: "Build capability in a deliberate sequence.",
        paragraphs: [
          "The first leadership appointments can shape many later roles. Identify who needs to define the function, calibrate specialist requirements and make selection decisions. Some hiring can proceed in parallel; other roles may depend on a leader, process or platform being ready.",
          "Group roles into practical hiring waves. For each wave, describe the work it enables, the capabilities required and the conditions needed for the team to be effective. A single headcount target can conceal these dependencies.",
          "For an established centre, the question may be different: adding a scarce capability, replacing a critical leader or increasing recruitment capacity without disrupting the internal team. The engagement should reflect that context rather than assume every requirement is a new-centre build.",
        ],
        bullets: [
          "Leadership roles and the decisions they need to shape.",
          "Specialist capabilities required for the next business milestone.",
          "Interview and approval capacity available to support selection.",
          "Dependencies that could change the timing or scope.",
        ],
      },
      {
        id: "specialists",
        title: "Define technology roles through the work.",
        paragraphs: [
          "Technology role titles do not explain the whole requirement. Software and product engineering, cloud, data engineering, AI/ML, cybersecurity, DevOps and enterprise platforms each include different environments and levels of ownership.",
          "A useful brief names the work, relevant technical context and the contribution expected from the role. Distinguish essential experience from familiarity that can develop. Give hiring managers a consistent basis for considering candidates.",
          "The technology expertise described here concerns talent. It does not imply that Arnold implements cloud or ERP systems, delivers engineering projects or provides managed technology services.",
        ],
      },
      {
        id: "capacity",
        title: "Match recruitment support to the demand.",
        paragraphs: [
          "A small group of specialist appointments can be approached through Permanent Staffing. A critical leadership role may require Executive Search. A defined hiring project or a continuing programme may call for RPO, with activities and decision ownership agreed explicitly.",
          "Before increasing recruitment activity, consider the internal team’s capacity, interviewer availability, approval process and ATS. Additional sourcing cannot independently solve an unclear role or a decision process that has no available owner.",
          "Where time-bound capacity is needed, discuss the Temporary Staffing model separately. Confirm employment, payroll, statutory and supervision responsibilities rather than assuming them from a staffing label.",
        ],
        table: {
          caption: "Connect the requirement with a starting point",
          headings: ["Business requirement", "Capability to discuss"],
          rows: [
            ["A leader to own a business-critical mandate", "Executive Search"],
            ["Continuing specialist roles", "Permanent Staffing"],
            [
              "Coordinated recruitment demand",
              "Recruitment Process Outsourcing",
            ],
            ["Defined workforce duration or capacity", "Temporary Staffing"],
            [
              "A scoped people issue or learning need",
              "HR Solutions or Capability Building, subject to confirmed scope",
            ],
          ],
        },
      },
      {
        id: "governance",
        title: "Make the working model explicit.",
        paragraphs: [
          "The engagement should identify the activities Arnold will perform and those retained by the client. Establish the source of truth for candidate information, the minimum systems access required and the process for recording decisions.",
          "Use a review rhythm that helps the business act: role priorities, candidate progression, stalled decisions and changes in demand. Agree reporting definitions and service levels for the actual engagement, so the team knows what each measure means and who owns the next action.",
          "Candidate communication is part of a coherent process. Confirm who owns updates, interview coordination and next-step decisions. A clear responsibility map protects the working experience for both the client team and candidates.",
        ],
      },
      {
        id: "brief",
        title: "Bring the business context to the first conversation.",
        paragraphs: [
          "Share the centre’s mandate, current stage and immediate priorities. An outline of functions, leadership requirements, specialist roles, timing and the existing recruitment model is enough to begin. Include the decisions that are still open.",
          "From that starting point, the appropriate service, delivery scope, systems access and review arrangements can be discussed. The objective is a talent engagement that fits the business, with its boundaries understood before commitments are made.",
        ],
      },
    ],
  },
  {
    path: "/employers",
    label: "For employers",
    title: "Start with the question your business needs to answer.",
    summary:
      "Begin with business consulting or a defined delivery need. Connect your next stage of growth with the leadership, talent, workforce and capability required to make it happen.",
    cta: "Discuss a business priority",
    sections: [
      {
        id: "starting-point",
        title: "Find the most useful starting point.",
        paragraphs: [
          "A continuing specialist role, a leadership mandate and a sustained recruitment programme are different requirements. So are a time-bound workforce need and a capability gap. A clearer description of the business situation helps identify the appropriate engagement.",
        ],
        table: {
          caption: "What does your business need next?",
          headings: ["Situation", "Start with"],
          rows: [
            [
              "We need to translate our growth priority into a practical plan",
              "Business Consulting",
            ],
            ["We need a leader for a critical mandate", "Executive Search"],
            [
              "We are hiring for continuing specialist roles",
              "Permanent Staffing",
            ],
            ["Our hiring programme needs recruitment capacity", "RPO"],
            ["We need capacity for a defined period", "Temporary Staffing"],
            ["We need to scope a people issue", "HR Solutions"],
            ["We need to develop a specific capability", "Capability Building"],
          ],
        },
      },
      {
        id: "prepare",
        title: "A useful brief can be short.",
        paragraphs: [
          "Share the objective, the functions involved, the timing and the decisions already made. Identify the internal owner and the part of the requirement you want support with. You can bring questions that have not yet been resolved.",
          "A job description or hiring forecast can help, but a candid description of the context is more useful than a document that appears final while hiding important uncertainty.",
        ],
        bullets: [
          "The work or business objective the requirement supports.",
          "The roles, audience or capability involved.",
          "Timing, location and practical constraints.",
          "The activities you want a partner to own.",
          "The stakeholders and decisions needed to proceed.",
        ],
      },
      {
        id: "engagement",
        title: "Know what you are agreeing to.",
        paragraphs: [
          "An engagement should make its scope, responsibilities and exclusions explicit. Confirm the delivery activities, systems access, commercial terms and decision checkpoints. Service levels, checks and any guarantees require a specific agreement.",
          "The first conversation is an opportunity to establish fit. It is not an automatic commitment to a standard package. If the requirement involves work outside Arnold’s confirmed capabilities, that boundary should be identified.",
        ],
      },
      {
        id: "candidates",
        title: "Keep candidate and employer journeys clear.",
        paragraphs: [
          "This route is for organisations discussing a business need. Candidates should use Opportunities and the configured application portal when it is available. Please do not send CVs or sensitive personal information through the employer enquiry form.",
        ],
      },
    ],
  },
  {
    path: "/approach",
    label: "The Arnold Workforce Framework",
    title: "Understand. Design. Build. Scale.",
    summary:
      "Connect business priorities with leadership, talent, workforce and capability. Four practical stages keep advice, execution and review aligned with the work ahead.",
    cta: "Discuss a business priority",
    image: "architecture-reflection.jpg",
    alt: "Illustrative architectural reflection",
    sections: [
      {
        id: "understand",
        title: "01 — Understand.",
        paragraphs: [
          "Begin with the work ahead and the people implications. Why is the requirement a priority? What should the role, team or engagement make possible? Which decisions are settled, and which need to be clarified?",
          "The answer helps distinguish a specialist search from a leadership mandate, a recruitment programme or a people capability need. The service follows the requirement.",
        ],
      },
      {
        id: "agree",
        title: "02 — Design.",
        paragraphs: [
          "Define the activities, intended deliverables, boundaries and responsibilities. Identify the client sponsor, the decision makers and the information or access required. Confirm the actual methods and any checking, reporting or service-level commitments.",
          "The scope should explain what happens when priorities change. A new requirement or a material change in demand deserves an explicit review rather than an informal expansion.",
        ],
      },
      {
        id: "coordinate",
        title: "03 — Build.",
        paragraphs: [
          "Connect delivery activities with the client’s internal team and systems. For recruitment, this includes role calibration, sourcing and screening responsibilities, interview coordination, feedback and appointment decisions as agreed.",
          "Keep candidate communication deliberate. Establish who gives updates, what information can be shared and where sensitive material should be handled. Avoid creating parallel records without a clear purpose.",
        ],
      },
      {
        id: "review",
        title: "04 — Scale.",
        paragraphs: [
          "Measure progress against the agreed purpose, improve delivery and adapt capacity as business demand changes. Review what has progressed, what remains unresolved and who owns the next action. Reporting should support a decision rather than simply describe activity.",
          "At the end of a defined engagement, confirm handover and closure. For continuing work, review the scope, capacity and operating fit. The working model should remain appropriate to the business requirement.",
        ],
      },
    ],
  },
  {
    path: "/about",
    label: "About Arnold",
    title:
      "Around 15 years of market experience. A forward-looking people focus.",
    summary:
      "Rooted in Bengaluru and serving clients in the USA, Arnold connects business consulting with leadership, talent, workforce and capability-building delivery for the next stage of growth.",
    cta: "Start a conversation",
    image: "architecture-reflection.jpg",
    alt: "Architectural forms reflected in glass, used illustratively",
    sections: [
      {
        id: "perspective",
        title: "Start with the business, then define the support.",
        paragraphs: [
          "Business consulting is the starting conversation: understand the growth priority, clarify the people and workforce decisions, and build a practical roadmap. A specialist role may enable a new capability. A leadership appointment may shape the direction of a function. Recruitment capacity may support the next stage of growth.",
          "Leadership, Talent, Workforce, Capability and GCC connect six delivery services: Permanent Staffing, Executive Search, Recruitment Process Outsourcing, HR Solutions, Temporary Staffing and capability building through Training. Choose the engagement around the requirement, with its scope and responsibilities agreed from the start.",
        ],
      },
      {
        id: "focus",
        title: "Technology, GCC teams and business functions.",
        paragraphs: [
          "Technology and GCC talent are central contexts for the Arnold service portfolio. Relevant role families include software and product engineering, cloud, data, AI/ML, cybersecurity, DevOps and enterprise platforms. Business-function requirements include sales, customer service, operations and business support.",
          "The focus is talent and people capability. A technology hiring context does not imply technology implementation, and GCC talent support does not imply responsibility for establishing or operating a centre.",
        ],
      },
      {
        id: "principles",
        title: "The principles behind a considered engagement.",
        paragraphs: [
          "Clarity means defining the requirement and the boundaries of the work. Alignment means the people making decisions share an understanding of the objective. Care means treating candidate information, communication and stakeholder time deliberately.",
          "These principles become useful through practical choices: a calibrated brief, named responsibilities, appropriate information access and review points connected with the next decision. The details should be confirmed for each engagement.",
        ],
      },
    ],
  },
  {
    path: "/expertise/technology",
    label: "Technology expertise",
    title: "Specialist roles. A precise understanding of the work.",
    summary:
      "Discuss technology hiring through the capability, environment and contribution required. Our expertise context is talent acquisition, rather than delivery of technology projects.",
    cta: "Discuss technology talent",
    interest: "technology",
    image: "technology-infrastructure.jpg",
    alt: "Illustrative technology infrastructure",
    sections: [
      {
        id: "engineering",
        title: "Software and product engineering.",
        paragraphs: [
          "Describe the product or system context, the engineering responsibility and the level of ownership. Software development and product engineering roles can require different experience even when the tools appear similar.",
          "Clarify the team structure, technical decision rights, collaboration requirements and the work the person will take on. The role brief should distinguish essential capability from a preference for a particular background.",
        ],
      },
      {
        id: "data",
        title: "Data engineering and AI/ML.",
        paragraphs: [
          "Identify the data environment, the problems the role supports and the relationship between engineering, analytics and model development. A broad data title can conceal very different responsibilities.",
          "Explain the expected contribution, the maturity of the work and the stakeholders involved in selection. Arnold’s role is recruitment support for relevant talent needs; it does not establish a data or AI implementation service.",
        ],
      },
      {
        id: "platforms",
        title: "Cloud, cybersecurity and DevOps.",
        paragraphs: [
          "Frame the requirement around the operating environment and the ownership expected. Platform, reliability, security and delivery responsibilities need specific role calibration.",
          "Discuss required experience and any qualifications relevant to the position with the hiring team. This page does not imply vendor certification or managed infrastructure services from Arnold.",
        ],
      },
      {
        id: "enterprise",
        title: "SAP, Oracle and enterprise platforms.",
        paragraphs: [
          "Specify the platform context, functional or technical responsibilities and whether the role supports an existing environment or a defined change. The same platform label can describe distinct specialist requirements.",
          "Continuing roles, critical leadership appointments and coordinated hiring programmes can be discussed through the relevant service. The engagement model and exact coverage should be confirmed against the actual mandate.",
        ],
      },
    ],
  },
  {
    path: "/expertise/business-functions",
    label: "Business-function expertise",
    title: "The people behind how your business works.",
    summary:
      "Connect sales, customer service, operations and business-support hiring with the work, stakeholders and responsibilities of the function.",
    cta: "Discuss a functional requirement",
    interest: "business-functions",
    sections: [
      {
        id: "commercial",
        title: "Sales and customer service.",
        paragraphs: [
          "A commercial role needs a clear account of the customer, the offering and the responsibilities the person will hold. Sales coverage, account ownership and service expectations should be described through the work rather than a familiar job title.",
          "For customer-service requirements, explain the channels, customer situations and escalation responsibilities. Confirm the experience needed to operate effectively in that context.",
        ],
      },
      {
        id: "operations",
        title: "Operations.",
        paragraphs: [
          "Define the process or operating activity the role supports, the volume or complexity involved and the decisions the person can make. Identify relationships with other functions and any practical location or working requirements.",
          "A role brief should distinguish responsibility for coordinating work from accountability for a broader business outcome. Staffing support does not automatically transfer management of a function.",
        ],
      },
      {
        id: "support",
        title: "Business support.",
        paragraphs: [
          "Business-support roles depend on the organisation around them. Describe the stakeholders, the work rhythm, the information handled and the capabilities needed to support decisions or processes.",
          "Agree what is essential at the start and what can develop with the business. Relevant experience should be considered against the actual environment and scope of responsibility.",
        ],
      },
      {
        id: "model",
        title: "Choose the right way to engage.",
        paragraphs: [
          "Continuing specialist roles can start with Permanent Staffing. A critical functional leader may require Executive Search. Defined workforce duration or a coordinated hiring programme should be scoped through Temporary Staffing or RPO respectively.",
          "Share the function, the reason for hiring and the responsibilities involved. Exact role coverage and the engagement terms are confirmed through discussion.",
        ],
      },
    ],
  },
];

export const pages: EditorialPage[] = basePages.map((page) => ({
  ...page,
  sections: expandSections(page.path, page.sections),
}));
