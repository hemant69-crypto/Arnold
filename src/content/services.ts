import { expandSections, additionalServiceFAQs } from "./enhancements";
import type { Service } from "./types";
const baseServices: Service[] = [
  {
    slug: "permanent-staffing",
    name: "Permanent Staffing",
    headline: "Specialist talent for work that matters.",
    summary:
      "Hire for the contribution the business needs. Define the role, understand the specialist capability required and give selection a clear basis.",
    cta: "Discuss a hiring requirement",
    image: "technology-infrastructure.jpg",
    imageAlt: "Illustrative technology infrastructure",
    sections: [
      {
        id: "priorities",
        title: "Describe the contribution the role needs to make.",
        paragraphs: [
          "A continuing role is an investment in capability. Whether you are adding a specialist, strengthening a function or replacing a departing colleague, the brief should explain the work that needs to get done and the context in which the person will do it.",
          "Clarify the responsibilities, team relationships and essential experience before turning the requirement into a search. A focused brief makes it easier to explain the opportunity and to assess whether a candidate’s background is relevant.",
          "For technology teams, the same title may cover very different environments. A data engineer working on a new platform needs a different context from one supporting an established estate. Business-function roles also need a clear account of customers, operating responsibilities and the stage of the team.",
        ],
      },
      {
        id: "calibration",
        title: "Make the criteria useful in the real market.",
        paragraphs: [
          "Separate what the person must bring on arrival from capabilities that can be developed. Identify which requirements protect the quality of the work and which reflect preferences. A crowded specification can obscure the capabilities that actually determine success.",
          "Discuss location, working arrangements, the compensation framework and the practical interview process. If priorities change during a search, revisit the brief and explain the effect on the requirement rather than continuing against an outdated specification.",
        ],
        bullets: [
          "What should the person be able to take ownership of?",
          "Which experience is essential, and why?",
          "What team, tools and decision support will be available?",
          "Who can assess the role, and who makes the appointment decision?",
        ],
      },
      {
        id: "hiring",
        title: "Connect sourcing with considered selection.",
        paragraphs: [
          "Agree the activities involved in sourcing, screening and presenting potential candidates. A shortlist should be considered against the role priorities, with relevant experience and open questions made clear. Screening is a starting point for the client’s selection process, not a substitute for it.",
          "The client’s interviews should explore how candidates would approach the actual work. Feedback that identifies specific evidence and unanswered questions is more useful than a general impression. Keep interview availability and decision ownership visible so promising candidates are not left without direction.",
          "Agree coordination, checks, timelines and any post-placement support for the actual engagement. Make those commitments explicit so the hiring team and candidates know what to expect.",
        ],
      },
      {
        id: "brief",
        title: "A short, clear brief can be enough to begin.",
        paragraphs: [
          "For an initial discussion, share the role or function, the reason for hiring, the location and the approximate timing. Describe the part of the search you want help with and the constraints already known. A final job description is useful, but it is not a prerequisite for clarifying the requirement.",
          "Avoid sending personal candidate information through the business enquiry form. If you already have a recruitment process or ATS, explain how the engagement needs to connect with it. Data access and record ownership should be settled before delivery begins.",
        ],
      },
      {
        id: "fit",
        title: "Choose the engagement around the requirement.",
        paragraphs: [
          "Permanent Staffing is the starting point for continuing specialist roles. A business-critical leadership appointment may need an Executive Search mandate. A coordinated hiring programme with sustained demand may be better addressed through RPO.",
          "Where the requirement has a defined duration or a distinct workforce model, discuss Temporary Staffing instead. The aim is to make the service fit the work, with the responsibilities and terms understood before a search begins.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can we discuss several roles together?",
        answer:
          "Yes. Share the functions, priorities and timing. If the main challenge is coordinated recruitment capacity across a programme, RPO may also be relevant.",
      },
      {
        question: "Are checks and replacement arrangements included?",
        answer:
          "The specific checks, responsibilities, commercial terms and any replacement arrangements must be agreed for the engagement.",
      },
    ],
    related: ["executive-search", "recruitment-process-outsourcing"],
  },
  {
    slug: "executive-search",
    name: "Executive Search",
    variant: "executive",
    headline: "Leadership for the business you are becoming.",
    summary:
      "A critical appointment begins with a clear mandate. Align the business context, leadership outcomes and decision makers before approaching the market.",
    cta: "Discuss a leadership mandate",
    image: "leadership-discussion.jpg",
    imageAlt: "An illustrative leadership discussion around a meeting table",
    sections: [
      {
        id: "mandate",
        title: "Start with the mandate, not the title.",
        paragraphs: [
          "A leadership vacancy can represent very different business needs: building a new function, bringing discipline to a growing organisation, navigating a transition or taking an established team into its next stage. A familiar job title rarely captures the decisions that the incoming leader will need to make.",
          "The first conversation should establish what the appointment must accomplish, the environment in which the leader will work and the trade-offs that matter. That provides a more useful basis for a search than a long list of desirable attributes.",
          "For a GCC, this may include the relationship between the local leadership team and the global business, the maturity of the centre and the responsibilities the role will hold. For an established function, the immediate question may be continuity, succession or a change in capability.",
        ],
      },
      {
        id: "alignment",
        title: "One brief. A shared definition of success.",
        paragraphs: [
          "Different stakeholders can describe the same appointment differently. Before a search gathers momentum, make the essential decisions visible: reporting relationships, decision rights, team context, required experience and the outcomes expected from the role.",
          "Separate capabilities that are necessary on entry from those that can develop with the organisation. Discuss the compensation framework, location, working arrangements and any constraints that could change the addressable market. Resolve conflicts early so candidates encounter a coherent opportunity.",
        ],
        bullets: [
          "The business situation and the outcomes the leader will be accountable for.",
          "Essential experience, with a reason for each requirement.",
          "The stakeholders involved in interviews and the final appointment.",
          "The information that can be shared, with whom and at which stage.",
        ],
      },
      {
        id: "decisions",
        title: "A search shaped around decisions.",
        paragraphs: [
          "Agree the search scope and market approach before outreach begins. The engagement should set out the responsibilities for identifying potential candidates, considering relevant experience, coordinating discussions and maintaining communication. Any assessment or checking method must be explicitly agreed.",
          "At each review, compare candidates with the mandate rather than with whichever profile arrived most recently. Interview feedback is most useful when it identifies evidence, unanswered questions and the next decision. A consistent framework helps stakeholders distinguish a compelling presentation from a strong fit for the work.",
          "The client retains the appointment decision. A clear interview sequence and an identified decision owner can prevent a carefully developed shortlist from stalling while priorities change.",
        ],
      },
      {
        id: "confidentiality",
        title: "Handle sensitive information deliberately.",
        paragraphs: [
          "Some appointments involve commercially sensitive plans, an incumbent or a confidential succession discussion. Agree the level of confidentiality at the beginning, including the company information that may be disclosed and the point at which additional stakeholders become involved.",
          "Candidate communication also needs care. Establish the interview process, expected decision checkpoints and the information candidates will need to assess the role. Confidentiality arrangements, references, checks and post-appointment support belong in the agreed engagement scope; they should never be assumed from the service name.",
        ],
      },
      {
        id: "prepare",
        title: "Bring the context. We can clarify the brief together.",
        paragraphs: [
          "You do not need a finished role specification for an initial conversation. Bring the business objective, the reason for the appointment and the questions on which your stakeholders still disagree. It is useful to know who will sponsor the search, which decisions are already settled and where flexibility remains.",
          "If the requirement is one of several continuing specialist roles, Permanent Staffing may be the more appropriate starting point. If the challenge is recruitment capacity across a hiring programme, consider RPO. The right engagement follows the business requirement.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can we begin before the job description is final?",
        answer:
          "Yes. An initial discussion can start with the business context, intended outcomes and stakeholder questions. The search scope and role criteria need to be agreed before delivery begins.",
      },
      {
        question:
          "Does Executive Search include assessments and reference checks?",
        answer:
          "Specific assessment methods, references, checks and responsibilities must be agreed for the mandate. They are not automatically included by the service label.",
      },
      {
        question: "How should a confidential requirement be introduced?",
        answer:
          "Share a high-level description through the enquiry form. Avoid naming an incumbent or providing sensitive personal or commercial information; agree a suitable channel for detailed discussions.",
      },
    ],
    related: ["permanent-staffing", "recruitment-process-outsourcing"],
  },
  {
    slug: "recruitment-process-outsourcing",
    name: "Recruitment Process Outsourcing",
    variant: "rpo",
    headline: "Recruitment capacity, organised around your business.",
    summary:
      "When hiring becomes a programme, connect recruitment capacity to demand. Agree the activities, decision ownership and review rhythm around your internal team.",
    cta: "Scope recruitment capacity",
    sections: [
      {
        id: "demand",
        title: "Make the demand visible first.",
        paragraphs: [
          "Hiring pressure is often described as a number of open roles. The more useful picture includes when those roles are needed, how similar they are, which capabilities are scarce, how much internal recruitment capacity is available and who can make timely selection decisions.",
          "RPO creates a structure for an agreed recruitment programme or project. Its value depends on the fit between the demand, the activities assigned to the delivery team and the client’s own responsibilities. Adding recruiters to a poorly defined process will not resolve unclear priorities or unavailable interviewers.",
          "Start by separating approved demand from possible future demand. Identify the functions and locations involved, expected hiring waves, priority roles and the assumptions likely to change. For GCC teams, this should connect with the centre’s leadership sequence and functional milestones rather than an isolated headcount target.",
        ],
      },
      {
        id: "fit",
        title: "Choose the engagement that fits the shape of hiring.",
        paragraphs: [
          "A defined hiring project has a bounded objective: a team build, a new function or a particular recruitment wave. A longer-running programme needs an operating rhythm that can respond to changing demand and continue alongside the client’s talent acquisition team.",
          "Neither model should be chosen because it sounds more comprehensive. Consider the stability of the requirement, the availability of internal recruitment leadership, the responsibilities you want to retain and the decisions that a partner is permitted to make.",
          "For a small number of independent continuing roles, Permanent Staffing may be simpler. A business-critical leadership appointment can be treated as an Executive Search mandate. RPO is appropriate when the coordination of demand, delivery capacity and process ownership is itself part of the challenge.",
        ],
        table: {
          caption: "Two starting points for a scoping conversation",
          headings: ["Consideration", "Defined project", "Ongoing programme"],
          rows: [
            [
              "Demand",
              "A bounded hiring wave or team build",
              "Recurring demand with changing priorities",
            ],
            [
              "Review focus",
              "Progress against the agreed project scope",
              "Capacity, pipeline and changes in demand",
            ],
            [
              "Transition",
              "Closure and handover agreed at the start",
              "Review and transition arrangements agreed for the programme",
            ],
          ],
        },
      },
      {
        id: "ownership",
        title: "Define ownership before increasing activity.",
        paragraphs: [
          "An effective working model makes the responsibility split explicit. Arnold’s agreed recruitment activities should connect with your internal team, hiring managers and existing systems. The client remains responsible for business priorities and final appointment decisions unless an engagement expressly states otherwise.",
          "The map below is a discussion framework, not a statement that every activity is included. Use it to identify gaps, duplicate work and decisions that could become bottlenecks.",
        ],
        table: {
          caption: "A responsibility map to agree together",
          headings: ["Activity", "Question to resolve"],
          rows: [
            [
              "Demand and priorities",
              "Who approves roles, changes priorities and confirms timing?",
            ],
            [
              "Sourcing and screening",
              "Which role groups and activities belong in Arnold’s scope?",
            ],
            [
              "Interview coordination",
              "Who owns scheduling, feedback and escalation?",
            ],
            [
              "Selection and offers",
              "Who approves the candidate, terms and offer communication?",
            ],
            [
              "Systems and data",
              "Which ATS is used, and what access is necessary?",
            ],
            [
              "Reporting and review",
              "Which measures inform decisions, and who acts on them?",
            ],
          ],
        },
      },
      {
        id: "rhythm",
        title: "Use reporting to move decisions forward.",
        paragraphs: [
          "A working rhythm should tell the team what needs attention. A pipeline report without an owner for the next action can become a record of delay. Agree how often the teams will review role priorities, candidate progression, interview availability and changes in the requirement.",
          "Choose measures with clear definitions and a practical purpose. A measure of stage ageing, for example, needs an agreed starting point and a named owner for stalled decisions. Activity volume, candidate quality, process speed and appointment outcomes answer different questions; avoid treating them as interchangeable.",
          "Agree service levels, recruiter capacity and reporting commitments for the actual programme. Where demand changes materially, review the capacity and scope together so the engagement remains aligned with the work.",
        ],
      },
      {
        id: "systems",
        title: "Work with the process you need to operate.",
        paragraphs: [
          "The client’s ATS, data access rules and internal processes should be considered during scoping. Identify the minimum access required, the source of truth for candidate information and the responsibilities for updating records. Existing systems should support the programme without creating duplicate candidate databases.",
          "Before delivery, also agree escalation routes, candidate communication and the handover or exit arrangement. A defined project should have a clear close. A continuing programme should have review points that allow both sides to reassess scope, capacity and operating fit.",
        ],
      },
      {
        id: "prepare",
        title: "A useful first brief is an honest one.",
        paragraphs: [
          "Bring an outline of approved hiring demand, anticipated timing, priority functions and your current recruitment team. Include what is working, where the process is slowing down and which activities you want support with. Uncertainty is useful information when it is identified explicitly.",
          "The next step is to establish the engagement model and responsibilities. Commercial terms, service levels, reporting, systems access and delivery capacity can then be considered against a shared requirement.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is RPO the same as outsourcing every hiring decision?",
        answer:
          "No. The responsibilities are agreed for the programme or project. Business priorities, selection decisions and offer approvals need clear owners; they do not automatically transfer to Arnold.",
      },
      {
        question: "Can the programme use our current ATS?",
        answer:
          "Your existing ATS and access requirements should be discussed during scoping. Supported access, data responsibilities and the source of truth must be agreed before delivery.",
      },
      {
        question: "Do we need a fixed hiring forecast?",
        answer:
          "A perfect forecast is unnecessary. Separate approved demand, likely demand and uncertain assumptions so capacity and review arrangements can be scoped realistically.",
      },
    ],
    related: ["permanent-staffing", "temporary-staffing"],
  },
  {
    slug: "hr-solutions",
    name: "HR Solutions",
    headline: "Give the people question a clearer starting point.",
    summary:
      "Bring the people challenge into focus: what is happening, who it affects and what needs to change. Start there, then agree the appropriate support and scope.",
    cta: "Discuss a people challenge",
    variant: "hr",
    sections: [
      {
        id: "issue",
        title: "Begin with the situation you need to change.",
        paragraphs: [
          "People questions often arrive as broad labels: a process needs attention, a team is growing or managers need a clearer way of working. The label alone is not enough to define a useful engagement.",
          "Describe what is happening, who is affected and the business consequence. Identify whether the immediate need is to understand the issue, agree a course of action or support a clearly defined activity. These are different requirements and may need different expertise.",
          "Use the first conversation to define the issue, intended outcome and boundaries. Confirm the specific advisory or operational support through scoping, including any specialist expertise the requirement calls for.",
        ],
      },
      {
        id: "discovery",
        title: "Make the context visible.",
        paragraphs: [
          "A useful starting brief includes the part of the business involved, the current process, the people who own it and what has already been tried. Share the desired outcome in terms that can be reviewed. A request to improve a process becomes more actionable when the team can describe the decisions or working practices that need to change.",
          "Consider the stakeholders who need to participate and the information available to understand the problem. There may be questions that require specialist legal, tax or regulatory advice. Identify those boundaries early and agree who will address them.",
        ],
        bullets: [
          "What is the issue, and what makes it a priority now?",
          "Who is affected, and who owns the relevant business decision?",
          "What would a useful outcome look like?",
          "Which information can be shared safely for scoping?",
        ],
      },
      {
        id: "scope",
        title: "Agree the work before assuming the solution.",
        paragraphs: [
          "The engagement needs a specific objective, an agreed set of activities and named responsibilities. Confirm the deliverables, access requirements, review points and exclusions. The client’s HR and business leaders should be clear about which decisions remain with them.",
          "Do not assume a package of compensation consulting, organisation design, employment-law advice or HR transformation from the HR Solutions label. Any specialist intervention must be explicitly confirmed for the actual requirement.",
          "A well-scoped initial stage can help establish what further work is appropriate. If the primary need is recruitment, leadership hiring or learning, a more focused capability may be the better route.",
        ],
      },
      {
        id: "review",
        title: "Keep the outcome and ownership in view.",
        paragraphs: [
          "Agree how progress will be reviewed and what information is needed to make decisions. Distinguish the completion of an activity from the change you want it to support. A document delivered or a meeting held does not, by itself, establish that the intended outcome has occurred.",
          "At each checkpoint, review the findings, unresolved questions and next decisions. If the issue changes or additional specialist work is needed, revisit the scope. The engagement should remain connected to the original business question rather than expand without a clear reason.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do we need to know the intervention in advance?",
        answer:
          "No. Start with the issue, context and intended outcome. The appropriate activities and whether Arnold can support them must be confirmed during scoping.",
      },
      {
        question: "Does this include legal or compensation advice?",
        answer:
          "These are specialist areas and are not implied. Any such requirement must be identified and separately confirmed with an appropriate qualified provider.",
      },
    ],
    related: ["training", "recruitment-process-outsourcing"],
  },
  {
    slug: "temporary-staffing",
    name: "Temporary Staffing",
    headline: "The capacity you need. For the work in view.",
    summary:
      "Plan time-bound workforce capacity around the role, duration and working environment. Confirm employment, supervision and transition responsibilities before deployment.",
    cta: "Discuss workforce capacity",
    variant: "temporary",
    sections: [
      {
        id: "need",
        title: "Define the work and the window.",
        paragraphs: [
          "A time-bound requirement can arise from a project, an absence, a workload change or a specific operating period. Before choosing a staffing model, describe the work, its expected duration and the capability required.",
          "Clarify whether the need is for a defined role or for a broader delivery outcome. Temporary Staffing addresses workforce capacity; it should not be confused with outsourcing responsibility for an entire business function or technology project.",
          "Identify the location, working arrangements, required skills, supervision needs and any access or onboarding constraints. These practical details shape the suitability of the engagement as much as the proposed duration.",
        ],
      },
      {
        id: "model",
        title: "The responsibility split matters.",
        paragraphs: [
          "Define the operating model explicitly. Identify the responsible entity for employment, payroll, benefits and statutory obligations, alongside ownership of day-to-day supervision. Confirm each responsibility in the engagement before work begins.",
          "Use the scoping conversation to identify the responsible entity and contact for each part of the arrangement. Resolve access, attendance, leave, escalation and workplace requirements before the person starts.",
        ],
        table: {
          caption: "Responsibilities to confirm before deployment",
          headings: ["Area", "Decision to agree"],
          rows: [
            [
              "Employment arrangement",
              "Who contracts with and employs the individual?",
            ],
            [
              "Pay and obligations",
              "Who owns payroll, benefits and statutory responsibilities?",
            ],
            [
              "Work and supervision",
              "Who assigns work, provides equipment and manages performance?",
            ],
            [
              "Access and information",
              "Who authorises system access and its removal?",
            ],
            [
              "Review and transition",
              "Who approves changes, extensions and closure?",
            ],
          ],
        },
      },
      {
        id: "deployment",
        title: "Prepare the start as carefully as the search.",
        paragraphs: [
          "A defined role needs a practical onboarding plan. Agree the starting requirements, the information the individual needs and the person responsible for day-to-day direction. The client should identify its internal owner for the work and the route for resolving issues.",
          "Screening, documentation, checks, deployment coordination and ongoing support must be specified for the engagement. The same applies to any service-level commitment. A staffing arrangement should not depend on assumptions about what another party is handling.",
        ],
      },
      {
        id: "review",
        title: "Review changes before they become a different engagement.",
        paragraphs: [
          "Duration and workload can change. Establish review points for the actual requirement and a process for confirming extensions, role changes or additional capacity. A temporary arrangement that changes significantly needs a renewed conversation about scope and responsibilities.",
          "Agree the transition at the beginning: notice arrangements, handover, records, equipment and system access. Closure should be planned rather than left to the last day. Any move to a continuing role needs to follow the agreed terms and the relevant employment arrangements.",
        ],
      },
      {
        id: "prepare",
        title: "Bring the details that shape the model.",
        paragraphs: [
          "Share the work to be done, expected duration, location, skills and likely start window. Explain the supervision available and any constraints on the employment or commercial arrangement. If the duration is uncertain, say which assumptions could change it.",
          "For continuing roles, Permanent Staffing may be more suitable. If the underlying challenge is managing recruitment demand across a programme, RPO can be considered separately. A useful first conversation helps identify the appropriate starting point.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who employs and pays temporary staff?",
        answer:
          "The responsible entity and the employment, payroll, benefits and statutory arrangements must be explicitly confirmed for the engagement. This page does not imply a default model.",
      },
      {
        question: "Can a temporary requirement be extended?",
        answer:
          "Extensions and changes depend on the agreed terms, the actual requirement and the applicable employment arrangements. Establish the review and approval process at the start.",
      },
    ],
    related: ["permanent-staffing", "recruitment-process-outsourcing"],
  },
  {
    slug: "training",
    name: "Training",
    headline: "Learning with a clear purpose in the work.",
    summary:
      "Give learning a practical purpose. Identify what people need to do differently, define the audience and shape an engagement around that capability need.",
    cta: "Discuss capability needs",
    image: "learning-session.jpg",
    imageAlt: "Illustrative group learning session",
    variant: "training",
    sections: [
      {
        id: "gap",
        title: "Name the capability, not just the topic.",
        paragraphs: [
          "A request for training often begins with a subject. A useful brief goes further: who needs to learn, what the work requires and what participants should be able to do afterwards.",
          "Describe the situations in which the capability matters. Identify whether the audience is new to the work, building on existing experience or adapting to a changed responsibility. A mixed audience may need different starting points rather than the same session for everyone.",
          "Training is one possible response to a capability gap. If the issue is unclear responsibility, missing resources or a process that prevents people from applying a skill, those factors need to be considered alongside the learning requirement.",
        ],
      },
      {
        id: "objectives",
        title: "Turn the requirement into an observable objective.",
        paragraphs: [
          "An objective should describe the application of learning in a relevant context. This makes it easier to discuss content, format and evaluation without promising a business outcome that a learning engagement cannot independently control.",
          "Work with the business or HR sponsor to define the participants, their current experience and the situations in which the learning will be used. Agree what information is available to establish the starting point.",
        ],
        table: {
          caption: "From a broad request to a useful brief",
          headings: ["Briefing question", "What to describe"],
          rows: [
            [
              "Audience",
              "Roles, existing experience and the context in which people work",
            ],
            [
              "Application",
              "The task or decision participants need to handle more effectively",
            ],
            [
              "Constraints",
              "Timing, access, availability and delivery requirements",
            ],
            [
              "Review",
              "How participants and managers can consider the application of learning",
            ],
          ],
        },
      },
      {
        id: "scope",
        title: "Confirm the programme and delivery scope.",
        paragraphs: [
          "Confirm programmes, formats, facilitators, delivery arrangements and any relevant qualifications against the actual need. Keep the learning scope specific to the audience and purpose; course availability and accreditation require separate confirmation.",
          "The agreed engagement should explain the learning objectives, content boundaries, participant preparation and responsibilities for attendance and follow-through. Any assessment, materials, certification or subsequent support must be stated explicitly.",
          "Discuss the conditions needed for participants to apply the learning: manager involvement, opportunities to practise and the availability of relevant work. The learning event and its application are connected, but they are not the same thing.",
        ],
      },
      {
        id: "evaluation",
        title: "Review learning in the context of its purpose.",
        paragraphs: [
          "Agree a proportionate approach to evaluation before delivery. Participant feedback can describe the experience. A practical activity may show how a skill is understood. A later review with managers can explore application in the work. Each answers a different question.",
          "Business outcomes depend on factors beyond a training engagement. Be clear about what the evaluation can establish and what remains uncertain. Use the findings to decide whether the learning needs reinforcement, a different approach or changes in the working environment.",
        ],
      },
      {
        id: "prepare",
        title: "A useful starting conversation is specific.",
        paragraphs: [
          "Bring the audience, the capability gap and an example of where it matters in the work. Include timing, practical constraints and the sponsor’s intended outcome. You do not need to choose a format before the need is understood.",
          "If the question is broader than learning, HR Solutions can provide a route to scope the issue. The engagement should follow the requirement, with the actual delivery capability confirmed before commitments are made.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is there a fixed course catalogue?",
        answer:
          "Specific programmes, facilitators and formats are confirmed through scoping. No catalogue or accreditation is implied by this page.",
      },
      {
        question: "How can we evaluate the engagement?",
        answer:
          "Agree the learning objective first, then choose proportionate measures for understanding, participant experience and application. Business-outcome guarantees are not assumed.",
      },
    ],
    related: ["hr-solutions", "permanent-staffing"],
  },
];
export const services: Service[] = baseServices.map((service) => ({
  ...service,
  sections: expandSections(`/capabilities/${service.slug}`, service.sections),
  faqs: [...service.faqs, ...(additionalServiceFAQs[service.slug] ?? [])],
}));
export function serviceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
