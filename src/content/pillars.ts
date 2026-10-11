// One shared naming and destination register for navigation and pillar scenes.
export const pillars = [
  {
    name: "Talent Acquisition & Executive Search",
    shortName: "Talent & Search",
    href: "/capabilities",
    interest: "talent-search",
    image: "leadership-discussion.jpg",
    alt: "Illustrative discussion between business leaders",
    copy: "Find the people who move your business forward. Permanent recruitment, technology and non-technology hiring, specialist roles, leadership and CXO search, and recruitment process outsourcing.",
  },
  {
    name: "Workforce Solutions",
    shortName: "Workforce Solutions",
    href: "/capabilities/workforce-solutions",
    interest: "workforce-solutions",
    image: "team-collaboration.jpg",
    alt: "Illustrative team collaborating at a shared worktable",
    copy: "Build workforce capacity around the work ahead. Contract and temporary staffing, contract-to-hire, payroll management and workforce support tailored to your requirements.",
  },
  {
    name: "Background Verification",
    shortName: "Background Verification",
    href: "/capabilities/background-verification",
    interest: "background-verification",
    image: "architecture-reflection.jpg",
    alt: "Illustrative architectural reflection",
    copy: "Give hiring decisions a clearer factual basis. Employment, education and reference checks within an agreed scope, with appropriate consent and care for candidate information.",
  },
  {
    name: "HR Advisory & Fractional HR Leadership",
    shortName: "HR Advisory",
    href: "/capabilities/hr-advisory",
    interest: "hr-advisory",
    image: "learning-session.jpg",
    alt: "Illustrative learning and discussion session",
    copy: "Put the HR foundations and leadership your next stage needs in place. HR setup, policies, organisation design, performance management and experienced leadership on a part-time or defined-engagement basis.",
  },
] as const;

export const headerGroups = [
  [
    ["Home", "/"],
    ["Consulting", "/consulting"],
    [pillars[0].shortName, pillars[0].href],
  ],
  pillars.slice(1).map((p) => [p.shortName, p.href]),
  [
    ["GCC", "/gcc"],
    ["Approach", "/approach"],
    ["About", "/about"],
  ],
  [
    ["Insights", "/insights"],
    ["Contact", "/contact"],
    ["Opportunities", "/opportunities"],
  ],
];

export const talentServices = [
  ["Permanent Recruitment", "permanent-staffing"],
  ["Executive Search", "executive-search"],
  ["Recruitment Process Outsourcing", "recruitment-process-outsourcing"],
] as const;

export const pillarScenes = pillars.map((p) => ({
  title: p.name,
  image: p.image,
  alt: p.alt,
  copy: p.copy,
  links: [[`Explore ${p.shortName}`, p.href]],
}));
