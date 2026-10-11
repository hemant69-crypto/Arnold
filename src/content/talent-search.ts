import type { Section } from "./types";
import { capabilityThemes, homeWorkforceSections } from "./workforce";
import { hubEnhancements } from "./enhancements/hubs";

export const talentScenes = [
  {
    title: "Permanent & Specialist Recruitment",
    image: "technology-infrastructure.jpg",
    alt: "Illustrative technology infrastructure",
    copy: capabilityThemes[1].copy,
    links: [
      ["Permanent recruitment", "/capabilities/permanent-staffing"],
      ["Technology & AI talent", "/expertise/technology"],
      ["Business-function talent", "/expertise/business-functions"],
    ],
  },
  {
    title: "Leadership & CXO Search",
    image: "leadership-discussion.jpg",
    alt: "Illustrative discussion between business leaders",
    copy: capabilityThemes[0].copy,
    links: [
      ["Executive search", "/capabilities/executive-search"],
      [
        "Discuss leadership priorities",
        "/consulting#leadership-critical-roles",
      ],
    ],
  },
  {
    title: "Recruitment Process Outsourcing",
    image: "team-collaboration.jpg",
    alt: "Illustrative team collaboration",
    copy: "Connect approved hiring demand with the recruitment capacity to deliver it. Project, modular or continuing RPO, with defined activity, systems access, reporting and client decision ownership.",
    links: [
      ["Explore RPO", "/capabilities/recruitment-process-outsourcing"],
      ["Hiring scope and measures", "/insights/choosing-an-rpo-engagement"],
    ],
  },
];

export const talentSections: Section[] = [
  hubEnhancements["/capabilities"][0],
  {
    id: "talent-scope",
    title: "The people behind your next business milestone.",
    paragraphs: [
      "For CHROs, talent acquisition leaders, business heads, founders and GCC leaders, a useful hiring conversation connects the role with the work it must make possible. Arnold brings permanent recruitment, specialist hiring, leadership and CXO search, and RPO into that business context.",
      "Technology and non-technology requirements need their own calibration. Product and engineering, data, cloud, AI and enterprise-platform roles depend on the actual environment. Sales, operations, finance and other business-function appointments depend on responsibility, customers and decision ownership. Separate essential experience from preferences before going to market.",
    ],
    bullets: [
      "Permanent recruitment — Continuing roles, specialist capability and clear client selection ownership.",
      "Executive and CXO search — Business-critical leadership, aligned authority and stakeholder decisions.",
      "RPO — Recruitment capacity for a hiring wave, function or continuing programme.",
    ],
  },
  hubEnhancements["/capabilities"][1],
  homeWorkforceSections[1],
  hubEnhancements["/capabilities"][2],
  {
    id: "workforce-models",
    title: "Choose hiring and workforce support around the work.",
    paragraphs: [
      "A continuing appointment, a contract assignment and recruitment capacity solve different requirements. Compare Permanent, Contract & Temporary, Contract-to-Hire, RPO and Executive Search against the work you need to support. Workforce Solutions explains the models alongside payroll and responsibility guidance.",
      "Role calibration and talent-market context belong in the hiring conversation. Workforce planning, learning and internal mobility can connect with Workforce Solutions, HR Advisory and Capability Building through an agreed scope.",
    ],
  },
];
