import type { Article } from "./types";

export const futureWorkArticles: Article[] = [
  {
    slug: "building-human-capability-for-ai-enabled-work",
    topic: "AI & Work",
    title: "An AI-ready workforce starts with the work, not the tool.",
    summary:
      "AI changes tasks, judgement and team responsibilities. A practical workforce response connects leadership, critical talent, learning and the decisions people still need to own.",
    related: "/capabilities/training",
    readMinutes: 4,
    sections: [
      {
        id: "work",
        title: "Describe the task that is changing.",
        paragraphs: [
          "An AI initiative is often introduced through the technology being adopted. The workforce question begins elsewhere: which work will change, who does it today and what must a capable person do differently afterwards? A tool name alone does not answer those questions.",
          "Take one real workflow. Identify the inputs, the decisions, the output and the people who depend on it. Separate tasks that may be assisted by AI from decisions that need human judgement or formal approval. A draft produced faster still needs an accountable person to check whether it is useful and appropriate.",
          "Keep the discussion specific to the organisation’s approved tools and information rules. The purpose is to understand the people implications of a proposed change, rather than assume every role should be automated or every team should hire an AI specialist.",
        ],
      },
      {
        id: "leadership",
        title: "Give leaders a clear responsibility.",
        paragraphs: [
          "AI-era leadership includes setting expectations about quality, accountability and the use of information. Managers need to explain what people may use, what they must check and when an issue needs another decision maker. Unclear ownership can undermine an otherwise promising workflow.",
          "A leadership brief should reflect that responsibility. For an existing team, the need may be manager capability or a clearer working practice. For a new team, a critical appointment may establish direction before specialist hiring begins. Define the requirement before choosing search or development.",
        ],
      },
      {
        id: "skills",
        title: "Connect future skills with practical application.",
        paragraphs: [
          "Skills can include understanding a task, evaluating an output, recognising uncertainty and communicating the basis for a decision. Technical depth will differ by role. A person designing a data pipeline needs a different learning path from a manager reviewing an AI-assisted document.",
          "Begin with current experience and the contribution needed next. Upskilling may deepen an existing role; reskilling may prepare a person for a different contribution. Agree a relevant learning objective, appropriate expertise and an opportunity to practise with the organisation’s approved tools.",
        ],
        bullets: [
          "What work will the person need to handle differently?",
          "Which output must they be able to evaluate?",
          "Which decisions and information require human approval?",
          "What support will help them apply the learning?",
        ],
      },
      {
        id: "build-or-hire",
        title: "Decide what to develop and what to hire.",
        paragraphs: [
          "A skills gap does not automatically require an additional role. Existing people may hold business context that is difficult to replace. Development, an internal move, specialist recruitment or flexible capacity may each be appropriate for a different part of the requirement.",
          "For technology and AI hiring, describe the actual environment and ownership: data engineering, model development, product engineering, integration or a leadership responsibility. A broad request for AI talent can conceal several distinct needs. Hiring for those capabilities is separate from buying technology implementation services.",
        ],
      },
      {
        id: "review",
        title: "Review capability in use.",
        paragraphs: [
          "Choose evidence that relates to the work: the quality of a reviewed output, the handling of an exception, the clarity of a decision or the application of a new skill. Tool usage and course attendance describe activity; they do not independently establish better performance.",
          "This is an original planning perspective, not a completed Arnold case study or a promise of an AI implementation programme. A useful first conversation brings the changing workflow, the people involved and the capability question that needs an answer.",
        ],
      },
    ],
  },
  {
    slug: "mapping-critical-skills-before-you-hire",
    topic: "Talent & Skills",
    title: "Before you hire, map the capability your business needs.",
    summary:
      "Skills intelligence connects business priorities with evidence about work, people and the talent market. Use it to make a clearer choice between hiring, development and internal mobility.",
    related: "/capabilities/hr-solutions",
    readMinutes: 4,
    sections: [
      {
        id: "priority",
        title: "Start with a business priority.",
        paragraphs: [
          "A skills inventory becomes useful when it helps someone make a decision. Begin with the work your business needs to do: establish a GCC team, strengthen a product function, replace a critical capability or prepare a team for changing responsibilities.",
          "Describe the outputs and decisions involved, then identify the capabilities needed to produce them. A job title can help organise the discussion, but two people with the same title may have very different experience. Critical skills mapping should explain what makes a capability important to this requirement.",
        ],
      },
      {
        id: "evidence",
        title: "Distinguish evidence from an assumption.",
        paragraphs: [
          "A skills-gap analysis compares the contribution needed with the capability currently available. Use appropriate evidence, agreed with the people responsible for the work. Distinguish demonstrated experience, a learning need and a capability that has not yet been evaluated.",
          "Emerging skills can be considered alongside the next business milestone, rather than added because they appear in a trend report. Record where requirements remain uncertain and who can resolve them. A formal assessment needs an appropriate method and confirmed specialist scope.",
        ],
      },
      {
        id: "market",
        title: "Put talent-market information in context.",
        paragraphs: [
          "Talent mapping, market intelligence and talent availability inform a search when they relate to the actual role, location and working conditions. A market view should identify its source, date and limitations. A broad number from another sector may say little about the pool relevant to your brief.",
          "Compensation intelligence needs the same discipline. Compare responsibilities, geography, seniority and the elements of pay included. A handful of candidate conversations should not be presented as a representative salary survey. Any commissioned compensation study requires a defined brief and reliable evidence.",
        ],
      },
      {
        id: "choice",
        title: "Choose between building, moving and hiring.",
        paragraphs: [
          "Workforce planning connects the capability requirement with timing, resources and business dependencies. Internal mobility may put existing experience to better use. Upskilling or a reskilling strategy may prepare a team for different work. External hiring may address a capability needed sooner than it can be developed internally.",
          "These responses can work together. An illustrative product-team plan might combine a specialist appointment, development for existing colleagues and a later hiring wave once leadership has clarified the next scope. That is a planning example, not an Arnold client result.",
        ],
        table: {
          caption: "A practical capability decision",
          headings: ["Question", "Response to consider"],
          rows: [
            [
              "Does the capability already exist elsewhere in the organisation?",
              "Explore internal mobility with the relevant leaders.",
            ],
            [
              "Can people develop it within the required period?",
              "Scope learning, upskilling or reskilling.",
            ],
            [
              "Is specialist experience needed on arrival?",
              "Calibrate a permanent, leadership or contract requirement.",
            ],
            [
              "Does the constraint sit in recruitment capacity?",
              "Examine project, modular or continuing RPO.",
            ],
          ],
        },
      },
      {
        id: "review",
        title: "Keep the map connected with a decision.",
        paragraphs: [
          "Review whether the chosen response is making the work possible. A completed map or filled role is one event; the capability the business can now use is a different question. Agree the owner, relevant evidence and timing of that review.",
          "Arnold’s role calibration and talent mapping provide a starting point for hiring discussions. Broader skills diagnostics, internal-mobility programmes and workforce studies need separately agreed expertise and deliverables. This original perspective provides a discussion guide rather than a claim that every activity is a standard Arnold product.",
        ],
      },
    ],
  },
];
