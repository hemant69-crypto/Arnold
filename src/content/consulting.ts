// Original Arnold draft adapted from the researched brief. Existing factual/publication approval applies.
import type { EditorialPage } from "./pages";

export const consultingAdvisory = [
  {
    id: "business-workforce-alignment",
    label: "Business and workforce alignment",
    services: [
      "hr-solutions",
      "permanent-staffing",
      "recruitment-process-outsourcing",
      "training",
    ],
  },
  {
    id: "leadership-critical-roles",
    label: "Leadership and critical roles",
    services: ["executive-search", "permanent-staffing"],
  },
  {
    id: "talent-acquisition-effectiveness",
    label: "Talent acquisition effectiveness",
    services: ["recruitment-process-outsourcing", "permanent-staffing"],
  },
  {
    id: "workforce-capacity",
    label: "Workforce capacity and deployment",
    services: ["temporary-staffing", "permanent-staffing"],
  },
  {
    id: "people-practices",
    label: "People practices and team effectiveness",
    services: ["hr-solutions", "training"],
  },
  {
    id: "learning-capability",
    label: "Learning and capability development",
    services: ["training", "hr-solutions"],
  },
] as const;

export const consultingPage: EditorialPage = {
  path: "/consulting",
  label: "Consulting",
  title: "Business consulting for your next chapter.",
  summary:
    "Leadership, talent and workforce capability, aligned with where your business needs to go.",
  cta: "Discuss your business priorities",
  interest: "consulting",
  sections: [
    {
      id: "hero-context",
      title: "Business consulting",
      paragraphs: [
        "Growth changes what a business needs from its people. A new direction may call for different leadership, specialist skills, more hiring capacity or a clearer way of working.",
        "Arnold Consulting works with business leaders to connect those needs with a practical response. We begin with your priorities, shape the right engagement and bring relevant advisory and delivery capabilities together around the work ahead.",
      ],
    },
    {
      id: "perspective",
      title: "Start with the business decision.",
      paragraphs: [
        "A growth plan becomes real through the decisions a business makes about its people: who will lead, which capabilities matter, how work will be resourced and what needs to change as the organisation develops.",
        "Those decisions are connected. A critical leadership appointment influences the team that follows. A new capability changes the hiring requirement. A larger recruitment programme places different demands on internal capacity, management attention and the candidate experience.",
        "Our consulting approach brings these questions into the same conversation. We work from the business priority towards a focused people and workforce agenda, with clear choices about what to address first and how to put the agreed response into practice.",
        "The starting point may be a leadership mandate, a growing team, a recruitment process under pressure or a capability gap. The purpose is consistent: connect the work your business needs to do with the people and practical arrangements that can support it.",
      ],
      bullets: [
        "A useful recommendation should make the next decision clearer.",
      ],
    },
    {
      id: "business-priorities",
      title: "Where does your business need to move forward?",
      paragraphs: [
        "You may have a clear requirement, or you may still be working out what the business needs. These are useful places to start.",
      ],
      table: {
        caption: "Where does your business need to move forward?",
        headings: ["Business situation", "A useful starting point"],
        rows: [
          [
            "Preparing for growth",
            "Your next stage requires more than an additional hiring list. Identify the leadership, specialist roles and recruitment capacity that the business will depend on.",
          ],
          [
            "Appointing a critical leader",
            "An important role needs a shared mandate. Align the expectations, business context and contribution required before the search begins.",
          ],
          [
            "Making hiring work more effectively",
            "Demand is increasing, decisions are slowing or the process is producing inconsistent results. Examine the work, responsibilities and constraints behind the hiring requirement.",
          ],
          [
            "Balancing workforce capacity",
            "Some needs are continuing; others are tied to a project or a period of change. Consider the staffing arrangement alongside the duration, supervision and work involved.",
          ],
          [
            "Strengthening people capability",
            "A team needs to work differently, managers need support or a skill gap is becoming visible. Define the issue and the capability to develop before choosing an intervention.",
          ],
          [
            "Building a GCC or technology team",
            "The business mandate must translate into leadership, specialist roles and a workable hiring sequence. Connect the team plan with the centre's actual responsibilities.",
          ],
        ],
      },
    },
    {
      id: "advisory-areas",
      title: "A connected view of the decisions ahead.",
      paragraphs: [
        "Business priorities rarely fit neatly into a single service. Our consulting focus connects leadership, talent, workforce capacity and people capability, then identifies the work most relevant to your situation.",
      ],
    },
    {
      id: "business-workforce-alignment",
      title: "Translate the next business priority into a people agenda.",
      paragraphs: [
        "Expansion, a new operating responsibility or a change in direction can alter what a business needs from its teams. Begin by identifying the work that must happen, the roles that carry it and the capabilities that are essential to progress.",
        "We help frame those implications as practical priorities: which requirements are immediate, which depend on earlier decisions and where hiring, flexible capacity or learning may be appropriate. The resulting agenda should make assumptions visible and give the business a useful basis for deciding what to do next.",
      ],
      bullets: [
        "Critical capabilities",
        "role priorities",
        "dependencies",
        "the contribution expected from internal teams and external support",
      ],
    },
    {
      id: "leadership-critical-roles",
      title: "Give important appointments a clear business mandate.",
      paragraphs: [
        "The value of a leadership appointment depends on what that person is expected to accomplish in a particular business. A title and a list of qualifications provide only part of the picture.",
        "We connect the search brief with the business situation: the priorities ahead, the decisions the leader will own, the team they will join and the experience the role requires. Role calibration and market mapping give the search a more considered foundation and help stakeholders evaluate candidates against a shared requirement.",
      ],
      bullets: [
        "Leadership contribution",
        "stakeholder expectations",
        "relevant experience",
        "role context",
        "search priorities and selection responsibilities",
      ],
    },
    {
      id: "talent-acquisition-effectiveness",
      title: "Make recruitment serve the business plan.",
      paragraphs: [
        "When hiring becomes difficult, the cause may involve more than access to candidates. An unclear role, delayed feedback, competing priorities or insufficient recruiter capacity can affect the whole process.",
        "We examine the requirement alongside the way recruitment needs to operate. Establish the demand, clarify the decision points and identify the support needed across role calibration, sourcing, screening, interviews and candidate communication. A focused search, a recruitment project and an ongoing RPO programme address different situations; the model should follow the work.",
      ],
      bullets: [
        "Approved demand",
        "role clarity",
        "recruitment stages",
        "ownership",
        "recruiter capacity",
        "useful reporting and candidate care",
      ],
    },
    {
      id: "workforce-capacity",
      title: "Match the staffing arrangement to the work.",
      paragraphs: [
        "Businesses need different forms of capacity at different times. Continuing responsibilities, temporary cover and a defined project each create different requirements for skills, duration and management.",
        "We bring those practical considerations into the staffing conversation. Define the work, the likely time window, the skills involved and the supervision available. Then consider the appropriate recruitment or staffing route, with employment, payroll, access and transition responsibilities agreed for the actual engagement.",
      ],
      bullets: [
        "Continuing versus time-bound needs",
        "skills and location",
        "supervision",
        "onboarding",
        "review points and transition arrangements",
      ],
    },
    {
      id: "people-practices",
      title: "Address the people issue that is holding the work back.",
      paragraphs: [
        "A people challenge needs a precise description. Where is the difficulty occurring? Who is affected? What is the consequence for the business? What have leaders and HR already tried?",
        "We use those questions to define a focused HR Solutions engagement. The aim is to distinguish the issue, the desired change and the work needed to support it. Where process responsibilities, manager practices or an employee experience question are involved, the relevant expertise and deliverables should be clear from the beginning.",
      ],
      bullets: [
        "The issue and affected teams",
        "current practices",
        "stakeholders",
        "intended change",
        "specialist requirements and a proportionate review approach",
      ],
    },
    {
      id: "learning-capability",
      title: "Build capability around the work people need to do.",
      paragraphs: [
        "A useful learning engagement starts with application. Identify the audience, the situations they need to handle and the skill or behaviour they need to develop.",
        "We connect the learning brief with that business context, then agree the objectives and appropriate delivery scope. The plan should also consider how participants will practise, what support managers can provide and how the learning will be reviewed in the workplace. This gives Training a clear purpose within the broader people agenda.",
      ],
      bullets: [
        "Audience",
        "existing experience",
        "work situations",
        "learning objectives",
        "format",
        "application and evaluation",
      ],
    },
    {
      id: "business-in-motion",
      title: "Put the business conversation in motion.",
      paragraphs: [
        "Bring the priorities, the questions and the decisions ahead. We will work with you to define a useful place to begin.",
      ],
    },
    {
      id: "practical-outputs",
      title: "Advice should leave you with something you can use.",
      paragraphs: [
        "An engagement should make the work more concrete. The appropriate outputs depend on the question being addressed, the information available and the scope agreed with your team.",
        "The output may take the form of a calibrated leadership brief, a hiring-priority roadmap, a recruitment responsibility map or a learning brief. The right format is the one that helps your team act on the issue in view.",
      ],
      table: {
        caption: "Advice should leave you with something you can use.",
        headings: ["Agreed output", "What it helps clarify"],
        rows: [
          [
            "A focused statement of the issue",
            "A shared account of the business priority, the people or workforce implications and the decision that needs attention.",
          ],
          [
            "A map of priorities and dependencies",
            "The roles, skills or activities to address first, alongside the assumptions and decisions that influence what follows.",
          ],
          [
            "A considered route to delivery",
            "A recommendation for the relevant service or combination of services, with the rationale for the proposed engagement.",
          ],
          [
            "Clear responsibility for the work",
            "The activities, client decisions, information needs, review points and handovers necessary to keep the engagement moving.",
          ],
          [
            "A practical way to review progress",
            "Measures and checkpoints that relate to the agreed purpose, so that activity, decisions and results can be discussed with context.",
          ],
        ],
      },
    },
    {
      id: "working-together",
      title: "From the business question to the work ahead.",
      paragraphs: [],
    },
    {
      id: "engagement-1",
      title: "Understand the context",
      paragraphs: [
        "We begin with the business priority, the part of the organisation involved and the situation you want to change. Your leaders and relevant teams help establish what is known, what remains uncertain and why the issue matters now.",
      ],
      bullets: ["What question should this engagement answer?"],
    },
    {
      id: "engagement-2",
      title: "Set the priorities",
      paragraphs: [
        "We examine the people and workforce implications, identify the choices available and agree where attention will have the greatest practical value. Relevant information may include role briefs, hiring plans, process responsibilities and capability needs.",
      ],
      bullets: [
        "What should happen first, and what will a useful response include?",
      ],
    },
    {
      id: "engagement-3",
      title: "Agree and deliver the work",
      paragraphs: [
        "We define the activities, deliverables, responsibilities and review arrangements. Where the response includes search, staffing, RPO, HR Solutions or Training, the delivery scope connects back to the original business requirement.",
      ],
      bullets: [
        "Who owns each activity and approval, and what needs to be in place?",
      ],
    },
    {
      id: "engagement-4",
      title: "Review and adjust",
      paragraphs: [
        "We review progress against the agreed purpose, discuss the decisions that need attention and revisit assumptions when the requirement changes. Completion should leave the next step clear, whether that means continuing, adapting or closing the engagement.",
      ],
      bullets: [
        "What has changed, what remains open and what should happen next?",
      ],
    },
    {
      id: "gcc-and-technology",
      title: "The business mandate comes first. The GCC team follows.",
      paragraphs: [
        "A Global Capability Centre is built around work the business needs to own. That mandate should guide the leadership, specialist skills and recruitment capacity required at each stage.",
        "We bring the people and hiring questions into that wider context. Which leadership appointments need to happen early? What experience is required to establish the team? Which specialist roles depend on earlier decisions? How will recruitment keep pace with the agreed priorities?",
        "Arnold's service portfolio connects leadership search, technology talent, recruitment support and people capability around those requirements. Relevant role families include software and product engineering, cloud, data, AI/ML, cybersecurity, DevOps and enterprise platforms, with the actual role scope agreed for each engagement.",
        "Our focus is the leadership, talent and workforce contribution to the centre's mandate. The engagement defines that contribution alongside the responsibilities retained by your business and any specialist partners.",
      ],
    },
    {
      id: "connected-capabilities",
      title: "Connect the advice with the right work.",
      paragraphs: [
        "Once the requirement is clear, the engagement can draw on the service or combination of services that fits it. Each capability has a distinct role within the wider business and people agenda.",
        "The starting point is the business requirement. The service model follows from the work, the responsibilities involved and the support your team needs.",
      ],
      table: {
        caption: "Connect the advice with the right work.",
        headings: ["Capability", "Role in the response", "Service slug"],
        rows: [
          [
            "Permanent Staffing",
            "Find specialist and management talent for continuing roles",
            "permanent-staffing",
          ],
          [
            "Executive Search",
            "Identify and engage leaders for a defined business mandate",
            "executive-search",
          ],
          [
            "Recruitment Process Outsourcing",
            "Organise recruitment support around a project, function or continuing programme",
            "recruitment-process-outsourcing",
          ],
          [
            "HR Solutions",
            "Scope a people issue and agree relevant advisory or operational support",
            "hr-solutions",
          ],
          [
            "Temporary Staffing",
            "Address time-bound workforce needs with explicit responsibilities",
            "temporary-staffing",
          ],
          [
            "Training",
            "Develop capability around a defined audience and learning purpose",
            "training",
          ],
        ],
      },
    },
    {
      id: "working-principles",
      title: "A clear view. A practical working relationship.",
      paragraphs: [],
      table: {
        caption: "A clear view. A practical working relationship.",
        headings: ["Focus", "What it means"],
        rows: [
          [
            "Keep the business context in view",
            "A role, process or learning brief should relate to the work the business needs to accomplish. Return to that purpose when priorities or assumptions change.",
          ],
          [
            "Make the choices explicit",
            "Explain the proposed response, the alternatives worth considering and the decisions needed from the client team. Clarity at the start makes delivery easier to govern.",
          ],
          [
            "Connect advice and delivery",
            "A recommendation should have a practical route forward. Where Arnold provides the relevant service, agree the activities, responsibilities and review arrangements together.",
          ],
          [
            "Give people and information proper care",
            "Use the information needed for the engagement, with agreed access and responsibilities. In recruitment, clear candidate communication belongs within the same working discipline.",
          ],
        ],
      },
    },
    {
      id: "perspectives",
      title: "Thinking that makes the next conversation more useful.",
      paragraphs: [
        "Explore practical perspectives on the decisions that connect business priorities with leadership, recruitment and workforce capability.",
      ],
    },
    {
      id: "consulting-questions",
      title: "Questions before we begin.",
      paragraphs: [],
    },
    {
      id: "question-1",
      title: "What does business consulting mean at Arnold?",
      paragraphs: [
        "Our focus is the connection between a business priority and the leadership, talent or workforce capability needed to support it. An engagement may address a critical appointment, hiring priorities, recruitment capacity, a people issue or a learning need. We agree the specific advisory and delivery scope around the requirement.",
      ],
    },
    {
      id: "question-2",
      title:
        "Can we begin with a business challenge rather than a service request?",
      paragraphs: [
        "Yes. Describe the situation, why it matters and what you would like to change. The first conversation can help establish which question needs attention and whether an Arnold engagement is the appropriate next step.",
      ],
    },
    {
      id: "question-3",
      title: "How does consulting connect with recruitment and staffing?",
      paragraphs: [
        "Consulting establishes the business context, priorities and proposed response. Search, recruitment, RPO or staffing may form part of that response when they fit the requirement. Their delivery activities and responsibilities are agreed explicitly, alongside any advisory work.",
      ],
    },
    {
      id: "question-4",
      title: "Do you work with our internal leadership and HR teams?",
      paragraphs: [
        "The engagement is scoped around the people who own the relevant business and people decisions. We agree the sponsor, working contacts, information needs, review points and approvals so that Arnold's contribution connects with your internal team.",
      ],
    },
    {
      id: "question-5",
      title: "Can Arnold support GCC and technology requirements?",
      paragraphs: [
        "GCC and technology talent are important contexts for the service portfolio. We discuss the centre's mandate, leadership needs, specialist roles and recruitment capacity, then agree the relevant support. The precise remit of any wider setup or operational requirement must be established separately.",
      ],
    },
    {
      id: "question-6",
      title: "What will we receive from a consulting engagement?",
      paragraphs: [
        "The outputs follow the agreed scope. They may include a clarified requirement, role priorities, a calibrated search brief, a recruitment responsibility map or a learning brief. Activities, deliverables and review arrangements are defined before work proceeds.",
      ],
    },
    {
      id: "question-7",
      title: "Do you provide every type of business advisory service?",
      paragraphs: [
        "The focus described here is leadership, talent, workforce and people capability. Requirements involving corporate finance, legal or tax advice, organisation redesign, compensation or full GCC operations need the appropriate specialist scope and provider; they are not included by assumption.",
      ],
    },
    {
      id: "question-8",
      title: "What should we bring to the first conversation?",
      paragraphs: [
        "Bring the business priority, the part of the organisation involved, the decisions ahead and any timing constraints. Existing role briefs, hiring plans or a short description of the people issue can help. A high-level outline is enough to begin; detailed confidential material can follow through an agreed process if needed.",
      ],
    },
    {
      id: "start-a-conversation",
      title: "What does your next business chapter need?",
      paragraphs: [
        "A critical leader. A stronger hiring plan. The capacity to support growth. A clearer response to a people or capability question.",
        "Tell us what your business is working towards. We will help define a focused place to begin.",
      ],
    },
  ],
};

export const consultingSectionIds = consultingPage.sections.map(
  (section) => section.id,
);
