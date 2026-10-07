import type { FAQ, Section } from "../types";
import { serviceEnhancements } from "./services";
import { pageEnhancements } from "./pages";
import { articleEnhancements } from "./articles";
import { legalEnhancements } from "./legal";
import { hubEnhancements } from "./hubs";

export const enhancementSections = {
  ...serviceEnhancements,
  ...pageEnhancements,
  ...articleEnhancements,
  ...legalEnhancements,
  ...hubEnhancements,
};

const anchors: Record<string, { before?: string; after?: string }> = {
  perm1: { after: "priorities" },
  perm2: { after: "hiring" },
  perm3: { before: "brief" },
  exec1: { after: "mandate" },
  exec2: { after: "alignment" },
  exec3: { after: "decisions" },
  rpo1: { after: "ownership" },
  rpo2: { after: "rhythm" },
  rpo3: { after: "systems" },
  hr1: { after: "issue" },
  hr2: { after: "scope" },
  hr3: { after: "review" },
  temp1: { after: "need" },
  temp2: { after: "deployment" },
  temp3: { after: "review" },
  train1: { after: "gap" },
  train2: { after: "objectives" },
  train3: { after: "evaluation" },
  gcc1: { after: "mandate" },
  gcc2: { after: "sequence" },
  gcc3: { after: "governance" },
  emp1: { after: "starting-point" },
  emp2: { after: "engagement" },
  emp3: { before: "candidates" },
  app1: { after: "understand" },
  app2: { after: "agree" },
  app3: { after: "coordinate" },
  about1: { after: "perspective" },
  about2: { after: "focus" },
  about3: { after: "principles" },
  tech1: { before: "engineering" },
  tech2: { after: "enterprise" },
  tech3: { after: "tech2" },
  func1: { before: "commercial" },
  func2: { after: "support" },
  func3: { after: "model" },
  priv1: { after: "technical" },
  priv2: { after: "priv1" },
  priv3: { after: "analytics" },
  terms1: { after: "information" },
  terms2: { after: "material" },
  terms3: { before: "review" },
  agcc1: { after: "sequence" },
  agcc2: { after: "review" },
  agcc3: { after: "brief" },
  arpo1: { after: "engagement" },
  arpo2: { after: "measures" },
  arpo3: { after: "exit" },
  alead1: { after: "outcomes" },
  alead2: { after: "stakeholders" },
  alead3: { after: "working-brief" },
};

// Stable source IDs keep the additional chapters attached to their intended context.
export function expandSections(route: string, original: Section[]): Section[] {
  const additions = enhancementSections[route];
  if (!additions) return original;
  const sections = [...original];
  for (const addition of additions) {
    const anchor = anchors[addition.id];
    if (!anchor) throw new Error(`Missing composition anchor: ${addition.id}`);
    const index = sections.findIndex(
      (s) => s.id === (anchor.before ?? anchor.after),
    );
    if (index < 0 || sections.some((s) => s.id === addition.id))
      throw new Error(`Invalid composition anchor: ${route}/${addition.id}`);
    sections.splice(index + (anchor.after ? 1 : 0), 0, addition);
  }
  return sections;
}

export function readingMinutes(summary: string, sections: Section[]) {
  const text = [
    summary,
    ...sections.flatMap((s) => [
      s.title,
      ...s.paragraphs,
      ...(s.bullets ?? []),
      ...(s.table?.rows.flat() ?? []),
    ]),
  ].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 220));
}

export const additionalServiceFAQs: Record<string, FAQ[]> = {
  "permanent-staffing": [
    {
      question: "What if our requirement changes during the search?",
      answer:
        "Review the change with the authorised brief owner. Establish whether the contribution, essential experience or practical conditions have changed, then use one updated brief for sourcing and interviews.",
    },
    {
      question: "What feedback is useful after an interview?",
      answer:
        "Connect feedback with the agreed role. Identify relevant evidence, an unresolved question and the next decision. A specific explanation is more useful than an unsupported overall impression.",
    },
    {
      question: "Who owns the offer and joining arrangements?",
      answer:
        "The employer owns its employment decision and terms. Candidate communication, documentation coordination and any further joining support follow the agreed engagement and named responsibilities.",
    },
  ],
  "executive-search": [
    {
      question: "Can market feedback change the mandate?",
      answer:
        "It can prompt a review. Keep the business purpose and required authority visible, distinguish essential capability from a flexible preference, and ask the authorised stakeholders to approve any material change.",
    },
    {
      question: "Who should be involved in selection?",
      answer:
        "Name the business sponsor, relevant functional stakeholders and final decision owner. Give interviewers complementary questions so the evidence covers the mandate rather than repeating the same general conversation.",
    },
  ],
  "recruitment-process-outsourcing": [
    {
      question: "What needs to be ready before mobilisation?",
      answer:
        "Approved demand, usable role briefs, named owners, permitted systems access and a workable interview and candidate-communication process. Record unresolved dependencies before increasing activity.",
    },
    {
      question: "How is programme reporting agreed?",
      answer:
        "Start with the decisions reporting should support. Agree definitions, source records, access, review owners and actions for relevant measures. A generic activity dashboard is not automatically part of the engagement.",
    },
  ],
  "hr-solutions": [
    {
      question: "What should we bring to the scoping discussion?",
      answer:
        "Explain the situation, the work affected, the people involved and the decision that is difficult to make. Keep the initial description at a high level and agree an appropriate channel for sensitive information.",
    },
    {
      question: "How do we know what output to expect?",
      answer:
        "The scope should name the intended output, its user, the accountable owner and how its usefulness will be reviewed. Possible discussion formats are not automatically standard products or included deliverables.",
    },
  ],
  "temporary-staffing": [
    {
      question: "Who prepares workplace access and supervision?",
      answer:
        "Identify the accountable parties in the actual arrangement. Confirm the supervisor, tools, authorised access and start instructions before deployment rather than assuming they all sit with one provider.",
    },
    {
      question: "What happens when an assignment closes?",
      answer:
        "Agree the handover of open work and records, communication ownership and appropriate access removal. Any extension or different continuing arrangement needs explicit review and agreement.",
    },
  ],
  training: [
    {
      question:
        "Can we begin with a workplace problem rather than a course title?",
      answer:
        "Yes. Describe the situation people need to handle, the intended audience and the difference you want to observe. Confirm subject expertise and available delivery scope before treating that need as a programme.",
    },
    {
      question: "What support helps after a session?",
      answer:
        "Discuss a realistic opportunity to practise, relevant manager feedback and proportionate review evidence. Attendance, understanding and application are different, and the engagement should define what will be reviewed.",
    },
  ],
};
