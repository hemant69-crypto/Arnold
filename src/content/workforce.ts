import type { Section } from "./types";

// Five business-facing themes connect the six existing service routes.
// They are a navigation/content hierarchy, not evidence of additional practices.
export const capabilityThemes = [
  {
    title: "Leadership",
    image: "leadership-discussion.jpg",
    alt: "Illustrative discussion between business leaders",
    copy: "Build the leadership required for what comes next. Connect executive and CXO search with the mandate, succession priorities and decisions the role will own.",
    links: [
      ["Executive & CXO Search", "/capabilities/executive-search"],
      [
        "Discuss leadership priorities",
        "/consulting#leadership-critical-roles",
      ],
    ],
  },
  {
    title: "Talent",
    image: "technology-infrastructure.jpg",
    alt: "Illustrative technology infrastructure",
    copy: "Find the critical talent that moves the business forward. Specialist, technology, AI and digital talent, hired for the contribution your team needs.",
    links: [
      ["Permanent Recruitment", "/capabilities/permanent-staffing"],
      ["Technology & AI Talent", "/expertise/technology"],
    ],
  },
  {
    title: "Workforce",
    image: "team-collaboration.jpg",
    alt: "Illustrative team collaborating at a shared worktable",
    copy: "Build workforce models around changing business demand. Connect permanent, contract, contract-to-hire and recruitment capacity with the work ahead.",
    links: [
      [
        "Recruitment Process Outsourcing",
        "/capabilities/recruitment-process-outsourcing",
      ],
      ["Contract, Temporary & C2H", "/capabilities/temporary-staffing"],
    ],
  },
  {
    title: "Capability",
    image: "learning-session.jpg",
    alt: "Illustrative learning and discussion session",
    copy: "Build what you cannot simply hire. Frame learning, upskilling, reskilling, manager capability and AI readiness around what people need to do differently.",
    links: [
      ["Capability Building", "/capabilities/training"],
      ["People & Workforce Priorities", "/capabilities/hr-solutions"],
    ],
  },
  {
    title: "GCC & Enterprise Capability",
    image: "bengaluru-aerial.jpg",
    alt: "Illustrative aerial view of Bengaluru",
    copy: "Build, scale and transform global capability from India. Start with the people behind it: GCC leadership, product and engineering talent, critical skills and recruitment capacity.",
    links: [
      ["Build your GCC team", "/gcc"],
      ["Plan the hiring sequence", "/insights/planning-a-gcc-hiring-roadmap"],
    ],
  },
];

export const workforceFramework = [
  [
    "01",
    "Understand",
    "Connect business priorities with leadership, workforce requirements and critical skills.",
  ],
  [
    "02",
    "Design",
    "Agree roles, the talent strategy, workforce model, responsibilities and measures of progress.",
  ],
  [
    "03",
    "Build",
    "Put the agreed search, recruitment, workforce or capability-building engagement into practice.",
  ],
  [
    "04",
    "Scale",
    "Review outcomes, improve delivery and adapt capacity as the business requirement changes.",
  ],
];

export const homeWorkforceSections: Section[] = [
  {
    id: "workforce-models",
    title: "One workforce. Multiple engagement models.",
    paragraphs: [
      "The work determines the model. Build long-term capability, respond to a defined period of demand or strengthen recruitment capacity without treating every requirement as the same hiring problem.",
    ],
    table: {
      caption: "Choose the model around the business requirement",
      headings: ["Model", "What it supports"],
      rows: [
        ["Permanent", "Build long-term capability through continuing roles."],
        [
          "Contract & Temporary",
          "Scale capacity around a project, workload or defined business need.",
        ],
        [
          "Contract-to-Hire",
          "Evaluate the working fit before a possible long-term appointment, with conversion terms agreed in advance.",
        ],
        [
          "RPO",
          "Build recruitment capacity around a project, function or continuing hiring programme.",
        ],
        [
          "Executive Search",
          "Secure leadership for business-critical responsibilities.",
        ],
      ],
    },
  },
  {
    id: "skills-intelligence",
    title: "Know what skills your business needs next.",
    paragraphs: [
      "Skills & Workforce Intelligence starts with a practical question: what must the team become capable of doing? Connect critical skills mapping, talent-market insight and workforce planning with the choice to hire, develop or reshape capacity.",
      "Role calibration and talent mapping inform the hiring conversation. A broader skills-gap analysis, compensation study, internal-mobility plan or reskilling strategy needs an agreed brief, appropriate evidence and confirmed specialist scope.",
    ],
    bullets: [
      "Critical skills & emerging needs: Define the work, essential capability and evidence of readiness.",
      "Talent availability & market intelligence: Test the role, location and compensation assumptions against relevant market information.",
      "Build, hire or redeploy: Consider learning, internal mobility and external talent before choosing the response.",
    ],
  },
  {
    id: "arnold-advantage",
    title: "The Arnold Advantage.",
    paragraphs: [
      "Around 15 years of market experience, with roots in Bengaluru and work for clients in the USA. A connected portfolio brings leadership search, specialist recruitment, RPO, flexible workforce, HR Solutions and capability building into the same business conversation.",
      "Business consulting comes first: clarify the priority, compare the choices and agree a practical roadmap. We advise. We build. We deliver. We scale. Leadership, talent, workforce, capability building and GCC services connect that advice with execution.",
    ],
    bullets: [
      "Human expertise + technology: Keep human judgement accountable while using the agreed recruitment systems and relevant information.",
      "Critical talent + market context: Shape search around the work, specialist skills and practical hiring conditions.",
      "Workforce flexibility + GCC talent: Connect leadership, permanent, contract, C2H and recruitment capacity with business demand.",
      "Speed, quality + partnership: Work alongside your team with a calibrated brief, clear decisions and deliberate candidate care.",
    ],
  },
  {
    id: "business-outcomes",
    title: "What should change when we work together?",
    paragraphs: [
      "Start with the improvement your business needs, then agree how to assess it. Faster access to critical talent, better hiring decisions, more predictable recruitment and flexible workforce capacity each require a different measure.",
      "For a GCC, the priority may be a hiring wave ready for its business milestone. For an established team, it may be time-to-productivity, a stronger leadership pipeline or a narrower skills gap. These are engagement objectives to define and review, rather than guaranteed results.",
    ],
    bullets: [
      "Access & quality: Relevant candidates, agreed criteria and evidence that supports selection.",
      "Speed & predictability: Time in hiring stages, decision ownership and progress against approved demand.",
      "Readiness & experience: Joining and onboarding responsibilities, candidate communication and learning application.",
    ],
  },
];
