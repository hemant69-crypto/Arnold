import type { Section } from "./types";
import { capabilityThemes } from "./workforce";

// Original Capabilities comparison rows, preserved verbatim at their destinations.
export const engagementRows = [
  [
    "Permanent Staffing",
    "An individual or group of continuing specialist roles.",
    "Define contribution and criteria; the client supplies interview capacity and owns selection.",
  ],
  [
    "Executive Search",
    "A business-critical leadership appointment.",
    "Agree the mandate and relevant market context; client stakeholders align on authority and the decision process.",
  ],
  [
    "Recruitment Process Outsourcing",
    "A defined hiring wave or ongoing recruitment demand.",
    "Agree included activity, systems and review; the client retains explicitly named hiring decisions.",
  ],
  [
    "Temporary Staffing",
    "A time-bound or changing workforce requirement.",
    "Clarify duration, supervision and responsibility; confirm the actual employment and payment arrangement.",
  ],
  [
    "HR Solutions",
    "A particular people question affecting the work.",
    "Establish the issue, scope and useful next decision; identify the sponsor and required specialist involvement.",
  ],
  [
    "Capability Building",
    "A defined audience with a specific learning need.",
    "Agree objective, available delivery scope and review; the client supplies context and application support.",
  ],
];
export const engagementHeadings = [
  "Service",
  "Starting situation",
  "Discussion and client contribution",
];
const comparison = (id: string, index: number): Section => ({
  id,
  title: "Make the starting conversation specific.",
  paragraphs: [
    "The engagement follows the requirement. Confirm the intended output and client contribution before delivery begins.",
  ],
  table: {
    caption: "Starting situation and shared responsibilities",
    headings: engagementHeadings,
    rows: [engagementRows[index]],
  },
});
export const supportingTransfers: Record<string, Section[]> = {
  "permanent-staffing": [comparison("talent-starting-point", 0)],
  "executive-search": [comparison("leadership-starting-point", 1)],
  "recruitment-process-outsourcing": [
    comparison("recruitment-starting-point", 2),
  ],
  "temporary-staffing": [comparison("workforce-starting-point", 3)],
  "hr-solutions": [comparison("people-starting-point", 4)],
  training: [
    {
      id: "connected-capability",
      title: "Build capability alongside the HR foundations.",
      paragraphs: [
        capabilityThemes[3].copy,
        "A learning or internal-mobility decision belongs in the broader people plan. Confirm the relevant subject expertise, audience, sponsor and application support; link development with a defined HR Advisory engagement where useful.",
      ],
    },
    comparison("learning-starting-point", 5),
  ],
};
