import type { Service } from "./types";
import { capabilityThemes, homeWorkforceSections } from "./workforce";
import { engagementRows, engagementHeadings } from "./capability-transfers";

export const pillarServices: Service[] = [
  {
    slug: "workforce-solutions",
    name: "Workforce Solutions",
    headline: "The capacity you need. A workforce model that fits.",
    summary:
      "Contract and temporary staffing, contract-to-hire, payroll management and tailored workforce support. Shape the arrangement around the work, duration and responsibilities your business needs.",
    cta: "Discuss workforce requirements",
    image: "team-collaboration.jpg",
    imageAlt: "Illustrative team collaborating at a shared worktable",
    sections: [
      {
        id: "workforce-requirement",
        title: "Start with demand, duration and ownership.",
        paragraphs: [
          capabilityThemes[2].copy,
          "A project, seasonal workload, new team or operational transition can require a different mix of capacity. Begin with the work that needs coverage, the locations involved, the likely duration and the people who will supervise it. Separate approved demand from possible growth.",
          "HR, operations, finance and procurement teams need a shared view of the arrangement. Agree who can approve assignments, confirm attendance or inputs, resolve changes and review commercial commitments. Workforce support should follow those practical requirements.",
        ],
        table: {
          caption: "A defined workforce starting point",
          headings: engagementHeadings,
          rows: [engagementRows[3]],
        },
      },
      {
        id: "contract-temporary",
        title: "Contract and temporary staffing around the work.",
        paragraphs: [
          "Use a defined assignment to support a project, a period of additional demand or a changing workforce requirement. Clarify the role, essential experience, start and end conditions, location, working pattern and supervision before choosing the staffing arrangement.",
          "The actual agreement should name the employer, payroll and payment responsibilities, workplace access, tools, support and escalation route. Confirm the applicable requirements with the responsible parties. A service label alone does not settle the employment or commercial arrangement.",
        ],
        bullets: [
          "Requirement — Define the tasks, skills, period and expected workload.",
          "Readiness — Confirm the supervisor, tools, access and joining instructions.",
          "Review — Agree how changes, extensions and assignment closure are approved.",
        ],
      },
      {
        id: "contract-to-hire",
        title: "Make a possible transition explicit.",
        paragraphs: [
          "Contract-to-hire allows an agreed initial arrangement before a possible continuing appointment. Define the review point, evaluation criteria and conversion terms in advance, including who makes and communicates the decision.",
          "A transition depends on the actual agreement and the decisions of the parties involved. Keep role expectations, assignment conditions and any proposed continuing terms clear throughout. Confirm extensions or changes through the authorised owner.",
        ],
      },
      {
        id: "payroll-management",
        title: "Payroll management with clear inputs and controls.",
        paragraphs: [
          "Payroll management begins with an agreed population, pay structure, calendar and responsibility map. Establish which records the client supplies, who validates them, who approves processing and which payment or reporting activities are included.",
          "Name the owners for attendance inputs, additions and exits, approved adjustments, corrections, queries and access to payroll information. Agree secure information handling and a review of exceptions. Statutory or specialist work follows the confirmed engagement and accountable expertise.",
        ],
        table: {
          caption: "Payroll responsibilities to agree",
          headings: ["Decision", "What to establish"],
          rows: [
            [
              "Inputs",
              "Authorised source records, cut-off dates and validation owner.",
            ],
            [
              "Approval",
              "The person who approves the final information and processing.",
            ],
            [
              "Payment and reporting",
              "Included activities, responsible parties, timing and escalation.",
            ],
            [
              "Changes and queries",
              "Correction process, employee-query ownership and controlled access.",
            ],
          ],
        },
      },
      homeWorkforceSections[0],
      {
        id: "workforce-planning",
        title: "Connect capacity with the skills your business needs.",
        paragraphs: [
          "Workforce planning considers the work ahead, the capabilities already available and the capacity needed at each stage. Compare continuing appointments, assignments and recruitment support against the business milestone rather than a headcount number alone.",
          "Learning, internal mobility and external hiring can play different roles. A broader skills-gap analysis, compensation study, internal-mobility plan or reskilling strategy needs an agreed brief, appropriate evidence and confirmed specialist scope. Talent & Search provides the role calibration and talent-market conversation; HR Advisory and Capability Building connect the people and development decisions.",
        ],
      },
      {
        id: "workforce-delivery",
        title: "Agree. Mobilise. Review. Close or adapt.",
        paragraphs: [
          "Agree the requirement and commercial scope before mobilisation. Confirm the assignment brief, documentation responsibilities, workplace readiness and authorised points of contact. Use the existing client systems where included and settle access before work starts.",
          "Review capacity, attendance or other agreed inputs, open issues and upcoming changes with a named owner. At closure, confirm handover, outstanding records and access removal. A new location, increased population, extension or conversion should prompt an explicit scope review.",
        ],
        bullets: [
          "Prepare — Bring roles, locations, expected duration, workforce volumes and the current arrangement.",
          "Mobilise — Confirm readiness, records, approvals and communication owners.",
          "Review — Discuss service progress, exceptions and the next capacity decision.",
        ],
      },
    ],
    faqs: [
      {
        question: "How is Workforce Solutions different from RPO?",
        answer:
          "Workforce Solutions addresses staffing arrangements, payroll and workforce support. RPO supplies agreed recruitment activity and capacity. RPO belongs to Talent Acquisition & Executive Search; the two can connect when the scope and owners are explicit.",
      },
      {
        question: "Can we discuss payroll support separately?",
        answer:
          "Yes. Begin with the population, existing arrangement, required processing activities and approval owners. The engagement confirms what is included and which responsibilities remain with the client or other parties.",
      },
      {
        question: "Who employs and supervises the workforce?",
        answer:
          "That depends on the actual arrangement. Confirm the employer, supervisor, payroll and payment responsibilities, workplace readiness and escalation route before mobilisation.",
      },
      {
        question: "Does contract-to-hire guarantee a permanent appointment?",
        answer:
          "No. Any continuing appointment depends on the agreed conversion terms, review and decisions of the parties involved.",
      },
    ],
    related: [
      "temporary-staffing",
      "recruitment-process-outsourcing",
      "permanent-staffing",
      "hr-advisory",
    ],
  },
  {
    slug: "background-verification",
    name: "Background Verification",
    headline: "Check the facts behind the appointment.",
    summary:
      "Employment, education and reference verification within an agreed scope, with appropriate consent and applicable requirements. Help HR, compliance and onboarding teams make informed hiring decisions.",
    cta: "Discuss verification scope",
    image: "architecture-reflection.jpg",
    imageAlt: "Illustrative architectural reflection",
    sections: [
      {
        id: "verification-scope",
        title: "Agree what needs to be checked and why.",
        paragraphs: [
          "A verification engagement starts with the role, the hiring stage and the facts the employer needs to establish. Employment history, education and references answer different questions. Name the checks, the periods or qualifications covered and the intended use of the results.",
          "HR, compliance and onboarding teams should agree the sponsor, authorised information recipients and decision owner. Other checks are considered only within confirmed scope, appropriate consent and applicable law. The process should collect the information needed for that purpose.",
        ],
      },
      {
        id: "verification-checks",
        title: "Three useful checks. Three distinct purposes.",
        paragraphs: [
          "Scope each check around a specific factual question. Agree the relevant source and what counts as a completed response, an unresolved item or a discrepancy.",
        ],
        table: {
          caption: "Employment, education and reference verification",
          headings: ["Check", "Purpose", "Scope to agree"],
          rows: [
            [
              "Employment",
              "Confirm the agreed employment-history details with the relevant source.",
              "Employers, dates, role details and the information the source can confirm.",
            ],
            [
              "Education",
              "Verify the stated qualification or education record.",
              "Institution, qualification, study period and permitted source process.",
            ],
            [
              "References",
              "Explore relevant professional context through agreed referees.",
              "Referee relationship, consent, questions and factual reporting boundaries.",
            ],
          ],
        },
      },
      {
        id: "verification-consent",
        title: "Make consent and information access part of the process.",
        paragraphs: [
          "Before checks begin, confirm the candidate-information process, required authorisation and appropriate consent. Explain the agreed purpose and scope through the responsible employer channel. Identify who may share records, receive the report and handle questions.",
          "Use the agreed secure channel for candidate records. Establish permitted access, retention and closure responsibilities in the engagement. Initial website enquiries should describe the requirement at a high level; sensitive candidate documents belong in the confirmed process.",
        ],
      },
      {
        id: "verification-process",
        title: "Define the route from request to review.",
        paragraphs: [
          "Confirm the check list, candidate authorisation, source details and usable information before commencing. Record requests and follow up within the agreed process. The response may depend on an institution, previous employer or referee's availability and records.",
          "Report what was checked, which source responded and what remains unresolved. Distinguish verified information from an unavailable response or a discrepancy. Agree who will clarify an issue and how the employer will consider the report.",
        ],
        bullets: [
          "Define — Agree the role context, checks, recipients and decision owner.",
          "Prepare — Confirm authorisation, source details and the information channel.",
          "Check — Complete the agreed source enquiries and record their status.",
          "Review — Clarify unresolved items and support the employer's informed decision.",
        ],
      },
      {
        id: "verification-outcomes",
        title: "A report informs a decision.",
        paragraphs: [
          "Verification gives the employer information within the agreed check scope. It does not replace role assessment, references outside that scope or the employer's hiring judgement. A missing response and a confirmed inconsistency need different treatment.",
          "Agree a fair clarification route for incomplete or conflicting information. The employer owns its appointment and onboarding decisions, with relevant specialist input where required. Avoid turning an unresolved item into an unsupported conclusion about a candidate.",
        ],
      },
      {
        id: "verification-brief",
        title: "Bring a high-level requirement to the first conversation.",
        paragraphs: [
          "Share the hiring context, expected check types, approximate volumes, locations and intended timing. Describe your existing consent, onboarding and record-handling process so the engagement can connect with it.",
          "Agree the actual check coverage, source approach, reporting, responsibilities and commercial terms before sharing candidate records. Timelines depend on scope, information readiness and source response; confirm them for the particular engagement.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which checks can we discuss?",
        answer:
          "Employment, education and reference checks. Other verification work is considered only within confirmed scope, appropriate consent and applicable requirements.",
      },
      {
        question: "Should candidate documents be sent through this website?",
        answer:
          "Begin with a high-level employer requirement. Candidate records should use the secure process agreed for the engagement; the website enquiry form is not a verification-document upload channel.",
      },
      {
        question: "How are discrepancies handled?",
        answer:
          "The report should distinguish an inconsistency from incomplete information or an unavailable source. Agree clarification ownership and let the employer consider the evidence through its hiring process.",
      },
      {
        question: "Is every source response guaranteed?",
        answer:
          "Source access and response can vary. Agree reporting of unresolved items and the next action instead of assuming every check will return the same information or timing.",
      },
    ],
    related: [
      "permanent-staffing",
      "executive-search",
      "workforce-solutions",
      "hr-advisory",
    ],
  },
  {
    slug: "hr-advisory",
    name: "HR Advisory & Fractional HR Leadership",
    headline: "The HR foundations. The leadership to put them to work.",
    summary:
      "HR function setup, policies and processes, organisation design, performance management, compliance coordination and experienced HR leadership on a part-time or defined-engagement basis. Built around growing businesses and their people priorities.",
    cta: "Discuss HR priorities",
    image: "learning-session.jpg",
    imageAlt: "Illustrative learning and discussion session",
    sections: [
      {
        id: "hr-starting-point",
        title: "Build the HR support your next stage needs.",
        paragraphs: [
          "Growing companies, SMEs, new business units and teams without a complete in-house HR leadership function can reach a point where informal arrangements need clearer ownership. Begin with the work affected, the decisions that are difficult and the HR support already available.",
          "A focused issue, an HR function setup and an ongoing leadership requirement need different engagements. Agree the business sponsor, scope, intended outputs and who can approve or implement changes. Core Business Consulting remains the starting point for broader business priorities; HR Advisory focuses on the people function and its practical delivery.",
        ],
        table: {
          caption: "A people issue to clarify",
          headings: engagementHeadings,
          rows: [engagementRows[4]],
        },
      },
      {
        id: "hr-function-setup",
        title: "Put the essential HR foundations in place.",
        paragraphs: [
          "For a new function or business unit, map the employee journey and the decisions it needs to support. Prioritise the foundations that affect everyday work: joining, role clarity, records, policies, manager responsibilities and a route for employee questions.",
          "HR policies and processes should fit the business, its actual employment arrangements and accountable expertise. Agree which materials are to be drafted or reviewed, who approves them and how the team will use them. A document is useful when its owner, application and update process are clear.",
        ],
        bullets: [
          "Setup — Establish priorities, ownership and the core employee processes.",
          "Policies — Agree practical guidance, approval and communication responsibilities.",
          "Processes — Define the steps, records and escalation routes people will use.",
        ],
      },
      {
        id: "organisation-performance",
        title: "Connect roles, accountability and performance.",
        paragraphs: [
          "Organisation design starts with the work the business needs to coordinate. Clarify roles, reporting relationships, decision rights and dependencies before changing a structure. Use the business context to distinguish a missing capability from unclear ownership.",
          "Performance management should connect expectations with useful manager conversations and proportionate review. Define the outcomes and responsibilities of the role, how feedback is considered and who supports managers in applying the process. Agree any assessment or specialist work separately.",
        ],
      },
      {
        id: "fractional-leadership",
        title: "Experienced HR leadership at the scale you need.",
        paragraphs: [
          "Fractional HR leadership provides experienced direction on a part-time or defined-engagement basis. It can help a growing company prioritise the function, guide its internal HR team and maintain leadership attention during a transition or period of change.",
          "Define the remit, availability, meeting rhythm and decision authority. Name the priorities the leader will own, the work the internal team will carry out and the issues that need another specialist. Review the arrangement as the business develops, including a handover or a move to in-house leadership when appropriate.",
        ],
        table: {
          caption: "A workable fractional leadership remit",
          headings: ["Question", "Agreement to make"],
          rows: [
            [
              "Priorities",
              "The HR decisions and outcomes that need leadership attention.",
            ],
            ["Authority", "What the leader can decide, recommend or escalate."],
            [
              "Availability",
              "Time commitment, meeting rhythm and response expectations.",
            ],
            [
              "Internal team",
              "Execution owners, support and information access.",
            ],
            [
              "Review and handover",
              "How progress is assessed and responsibilities transition.",
            ],
          ],
        },
      },
      {
        id: "hr-compliance-coordination",
        title: "Coordinate specialist responsibilities deliberately.",
        paragraphs: [
          "HR compliance coordination makes the relevant requirements, records, deadlines and owners visible. Identify the responsible internal team and any legal, payroll or other specialists involved. Confirm the particular activities included in the engagement.",
          "Coordinate decisions and follow-up with those accountable parties. Specialist opinions, filings or legal representation require their own confirmed scope and qualified expertise. Payroll management has a distinct Workforce Solutions route, with its approvals and information responsibilities agreed separately.",
        ],
      },
      {
        id: "connected-capability",
        title: "Build the capability people need to use the plan.",
        paragraphs: [
          capabilityThemes[3].copy,
          "HR priorities can expose a learning or internal-mobility need. Describe the audience, the workplace situation and the observable improvement before selecting a development format. Capability Building supplies a separate scoping route for learning, with delivery expertise and application support confirmed.",
        ],
        table: {
          caption: "A defined learning engagement",
          headings: engagementHeadings,
          rows: [engagementRows[5]],
        },
      },
      {
        id: "hr-engagement",
        title: "From the people issue to a practical working plan.",
        paragraphs: [
          "Start with a high-level account of the situation and the decisions ahead. Agree priorities, deliverables, client contribution, sensitive-information handling and a review point. Keep the scope manageable enough for the organisation to apply.",
          "Review the usefulness of the work with its intended users. A policy, role map, performance process or leadership rhythm should help someone make a clearer decision. Establish handover and continuing ownership so the engagement supports the business beyond a single document or meeting.",
        ],
      },
    ],
    faqs: [
      {
        question: "How does this connect with Business Consulting?",
        answer:
          "Business Consulting clarifies broader growth priorities and the people or workforce roadmap. HR Advisory focuses on the HR function, processes and leadership needed to apply the people priorities. Each has a distinct page and scoped engagement.",
      },
      {
        question: "When is fractional HR leadership useful?",
        answer:
          "When a business needs experienced HR direction but has a part-time, transitional or defined engagement requirement. Agree the remit, time commitment and internal execution capacity before choosing the arrangement.",
      },
      {
        question: "Can we start with one HR issue?",
        answer:
          "Yes. Describe the issue, the work affected, the sponsor and the intended next decision. The existing HR Solutions page offers more detail about scoping a focused people question.",
      },
      {
        question: "Does this include payroll or specialist legal work?",
        answer:
          "Payroll management is discussed through Workforce Solutions. HR compliance coordination may involve specialists; legal opinions, filings or other specialist activity need a separately confirmed scope and accountable expertise.",
      },
    ],
    related: ["hr-solutions", "training", "workforce-solutions"],
  },
];
