import type { Section } from "../types";

export const articleEnhancements: Record<string, Section[]> = {
  "/insights/planning-a-gcc-hiring-roadmap": [
    {
      id: "agcc1",
      title: "Read an illustrative hiring-wave roadmap.",
      paragraphs: [
        "A roadmap becomes more useful when each wave has a purpose and a readiness question. The illustrative example below distinguishes leadership, foundational specialists and a subsequent capability. It contains no client headcounts, dates or claimed results.",
        "The sequence is not a rule that every leader must arrive before any specialist. A well-defined foundational role might proceed while a leadership search continues. A specialist role whose contribution depends on the new leader’s decisions may need further calibration first. Name the actual dependency instead of assuming one from the role’s seniority.",
      ],
      table: {
        caption: "Illustrative hiring-wave roadmap",
        headings: [
          "Business purpose / roles",
          "Prerequisite",
          "Owner / readiness question",
        ],
        rows: [
          [
            "Give the function direction / leadership",
            "An approved mandate and a shared understanding of authority.",
            "Business sponsor: which decisions will the leader own?",
          ],
          [
            "Make the foundation usable / defined specialists",
            "Clear work, supervision and the systems or processes needed to contribute.",
            "Functional owner: can this role be calibrated independently now?",
          ],
          [
            "Extend the capability / next specialist group",
            "The earlier business choices and enabling conditions relevant to these roles.",
            "Sponsor and TA/HR: what must be true before this wave is authorised?",
          ],
        ],
      },
    },
    {
      id: "agcc2",
      title: "Recognise when the roadmap needs a decision.",
      paragraphs: [
        "A constraint in the roadmap needs an owner, not just a new forecast. Ask whether the obstacle concerns the brief, the client’s decision capacity or a business dependency outside recruitment. Those questions lead to different actions.",
        "For illustration, consider a role whose responsibilities expand during sourcing. The sponsor needs to approve the new contribution. If interviewers are unavailable, the hiring manager needs to establish selection capacity. If a platform decision is unresolved, the relevant business or technical owner needs to clarify what work a new hire could begin.",
      ],
      bullets: [
        "Changed scope — Which part of the contribution changed, and who can approve a current brief?",
        "Unavailable decision makers — Which stage cannot progress, and who can commit the necessary time or authority?",
        "Unresolved enabling condition — Can the role contribute meaningfully before the dependency is resolved, or should its timing be reviewed?",
      ],
    },
    {
      id: "agcc3",
      title: "Use a focused sponsor discussion.",
      paragraphs: [
        "A focused meeting can turn a list of roles into a clearer set of decisions. Bring the people who own the business mandate, the functional contribution and recruitment coordination. Keep approved demand distinct from a possible future wave.",
        "The useful output is a shared next-step record: the decision made, the remaining question, its owner and the relevant checkpoint. The agenda below is a general planning aid, not a promise of a free diagnostic or a substitute for an agreed engagement.",
      ],
      bullets: [
        "Restate the centre’s mandate and the next capability the business needs.",
        "Separate approved roles from potential demand and identify genuine leadership dependencies.",
        "Check specialist interview, approval and recruitment capacity together.",
        "Confirm what internal TA owns and where additional support may fit.",
        "Record the next decision, the accountable person and what they need to resolve it.",
      ],
    },
  ],
  "/insights/choosing-an-rpo-engagement": [
    {
      id: "arpo1",
      title: "Compare two illustrative engagement briefs.",
      paragraphs: [
        "A bounded recruitment wave and a continuing programme need different definitions of readiness, review and handover. The model is useful only when it reflects the underlying demand and the client’s ability to make decisions.",
        "These illustrative briefs contain no fabricated client, hiring target or delivery date. Either model can be a poor fit if role requirements keep changing or the people who must interview and approve are unavailable.",
      ],
      table: {
        caption: "Illustrative RPO brief comparison",
        headings: [
          "Scope question",
          "Bounded recruitment wave",
          "Continuing programme",
        ],
        rows: [
          [
            "Objective",
            "Support an approved group of requirements with a defined completion or review point.",
            "Support an agreed pattern of ongoing recruitment demand.",
          ],
          [
            "Included activity",
            "Specify sourcing, screening, coordination and any other included tasks for that wave.",
            "Specify recurring activity and the process for reviewing changing demand.",
          ],
          [
            "Retained decisions",
            "Name client brief, interview, selection and offer owners.",
            "Keep those decisions explicit as managers and role families change.",
          ],
          [
            "Review question",
            "What is preventing this wave from reaching the next decision?",
            "Does the current capacity and scope still fit authorised demand?",
          ],
          [
            "Handover",
            "Agree outstanding candidates, records and the receiving owner at closure.",
            "Agree transition triggers, record ownership and continuity before a change.",
          ],
        ],
      },
    },
    {
      id: "arpo2",
      title: "Define one measure completely.",
      paragraphs: [
        "A label such as stage ageing can sound precise while hiding different interpretations. Before reporting it, agree which stage is being considered, when its clock starts and ends, and what the data can reliably show.",
        "For example, an interview-stage measure could begin when a candidate enters the agreed interview-ready state and end when the next decision is recorded. A pause, changed role or missing timestamp needs an explicit treatment. The definition belongs to the programme; this example is not a benchmark or an Arnold performance claim.",
      ],
      table: {
        caption: "Illustrative stage-ageing definition template",
        headings: ["Definition field", "Agreement to record"],
        rows: [
          [
            "Start and stop",
            "Name the precise events and the relevant stage, rather than an ambiguous activity label.",
          ],
          [
            "Source and completeness",
            "Identify permitted ATS records, required timestamps and how missing information is handled.",
          ],
          [
            "Exceptions",
            "Decide how pauses, withdrawn roles and changes in scope are identified.",
          ],
          [
            "Owner and review",
            "Name who checks the measure and who can resolve the underlying constraint.",
          ],
          [
            "Decision",
            "State the action the review can prompt, such as confirming interview capacity or recalibrating a brief.",
          ],
        ],
      },
    },
    {
      id: "arpo3",
      title: "Rehearse the handover before it becomes urgent.",
      paragraphs: [
        "Imagine a project reaching its end while several candidates remain in interviews. If the handover covers only a final activity report, the employer may inherit a queue without clear decisions or communication ownership. Plan the transfer around the work still open.",
        "This hypothetical exercise helps test a transition arrangement. It does not prescribe a retention period or transfer candidate information outside the permissions and terms that apply.",
      ],
      bullets: [
        "Open candidates — Which interview, selection or offer decision remains, and who receives it?",
        "Communications — Who provides the next appropriate update and answers a candidate’s practical question?",
        "Records — Where do authorised records belong, and which owner controls access and retention?",
        "Access — What remains necessary during transition, and who closes access when responsibilities end?",
        "Continuity — Can the receiving team identify the next action without reconstructing the entire engagement?",
      ],
    },
  ],
  "/insights/calibrating-a-leadership-mandate": [
    {
      id: "alead1",
      title: "See the difference between a title and a mandate.",
      paragraphs: [
        "Consider an illustrative Head of Data requirement. “An experienced leader with a strong data background” leaves important questions unanswered. It says little about authority, business contribution or the conditions the leader will inherit.",
        "A more useful brief might explain that the person will give an existing data team direction, agree priorities with business stakeholders and establish which decisions sit within the function. It would also identify the sponsor, existing platform context and dependencies on other teams. Those details help the search explore relevant experience without inventing a numerical outcome.",
      ],
      table: {
        caption: "Illustrative brief: from title to contribution",
        headings: ["Brief dimension", "Question the mandate should answer"],
        rows: [
          [
            "Business purpose",
            "Why does this appointment matter now, and what work should become possible?",
          ],
          [
            "Authority",
            "Which decisions can the leader make and which need another owner?",
          ],
          [
            "Contribution",
            "What should they establish, continue or change in the function?",
          ],
          [
            "Stakeholders and conditions",
            "With whom must they align, and what support or constraints will they inherit?",
          ],
        ],
      },
    },
    {
      id: "alead2",
      title: "Give interviewers different questions to answer.",
      paragraphs: [
        "A panel is more useful when its members explore complementary evidence. Asking every interviewer for a general impression can produce repetition while leaving an essential responsibility unexplored.",
        "The illustrative map below distinguishes the business sponsor, a functional stakeholder and a collaborating leader. After each conversation, separate what the candidate described, how the interviewer interprets it and what remains unanswered. This is a suggested discussion format, not a proprietary assessment system.",
      ],
      table: {
        caption: "Illustrative interview responsibility map",
        headings: ["Interviewer", "Evidence to explore", "Useful feedback"],
        rows: [
          [
            "Business sponsor",
            "Comparable business decisions, authority and judgement under constraints.",
            "Evidence described / relevance to the mandate / remaining question.",
          ],
          [
            "Functional stakeholder",
            "The candidate’s own responsibility for the specialist work and capability required.",
            "Contribution demonstrated / context difference / further evidence needed.",
          ],
          [
            "Collaborating leader",
            "How the candidate handled dependencies, differing priorities and shared decisions.",
            "Example observed / implications for this setting / issue to clarify.",
          ],
        ],
      },
    },
    {
      id: "alead3",
      title: "Recalibrate the brief deliberately.",
      paragraphs: [
        "Market feedback may expose a preference that has been treated as essential. In a hypothetical leadership search, the brief might require experience from a narrow company category even though the real need is to lead comparable work across stakeholders.",
        "Review the reason for the criterion. The business sponsor may decide that the capability remains essential while the company-category preference can change. Record the decision, its rationale and the current brief; make sure every interviewer and search participant works from the same version.",
        "Recalibration should sharpen the mandate rather than dissolve it. Keep the business purpose, authority and required contribution visible while reviewing how relevant experience can be demonstrated.",
      ],
    },
  ],
};
