import { expandSections, readingMinutes } from "./enhancements";
import type { Article } from "./types";
import { futureWorkArticles } from "./future-work-articles";
const baseArticles: Article[] = [
  {
    slug: "planning-a-gcc-hiring-roadmap",
    topic: "GCC",
    title: "A hiring roadmap starts with the business mandate.",
    readMinutes: 7,
    summary:
      "A useful GCC hiring plan explains how the team will become capable of doing the work. Headcount is part of the answer; leadership, sequencing and recruitment capacity give it meaning.",
    related: "/gcc",
    sections: [
      {
        id: "mandate",
        title: "Describe the work the centre is expected to own.",
        paragraphs: [
          "A list of roles is an incomplete starting point for a GCC hiring plan. It tells a recruitment team what to search for, but may not explain why those positions are needed, which decisions they will own or how they connect with the wider business.",
          "Begin with the mandate. What work is the centre expected to take responsibility for? Which functions are involved? What needs to be in place before the next stage can begin? Distinguish the work that is already approved from possibilities that depend on a later business decision.",
          "This is a talent planning exercise within the business mandate. It does not replace the organisation’s decisions about entity establishment, infrastructure, technology delivery, legal obligations or the operating model. Those dependencies should be visible because they can affect hiring readiness.",
        ],
      },
      {
        id: "leadership",
        title: "Identify the leadership dependencies.",
        paragraphs: [
          "Some appointments influence many others. A functional leader may need to shape the roles below them, make selection decisions and establish working relationships with global stakeholders. Hiring a large specialist team before those decisions are clear can create a mismatch between the roles recruited and the work that emerges.",
          "Ask which leaders need to participate in role calibration, interviews and onboarding. Identify decisions that can be made now and those that should wait for an incoming leader. This does not mean every senior appointment must precede every specialist hire. It means the sequence should reflect actual decision dependencies.",
          "For each leadership role, document the business outcomes, authority, reporting relationships and stakeholder expectations. A title copied from another organisation may describe a very different remit. Agree the mandate before using the title to guide a search.",
        ],
      },
      {
        id: "sequence",
        title: "Sequence roles by readiness and contribution.",
        paragraphs: [
          "A roadmap needs more than a single start date for all positions. Group roles by the work they enable and the conditions required for them to be effective. Some specialists may establish a foundation; others may need a functioning team, a defined process or access to systems that are not yet ready.",
          "For each hiring wave, identify its purpose, the roles involved and the assumptions behind the timing. A useful question is: what will this group be able to do when it starts? If the answer depends on a decision or resource that is still uncertain, record that dependency rather than burying it in a headcount schedule.",
          "Separate priority from urgency. A role can be important without needing to start immediately, while a less senior role may be necessary to unblock an imminent milestone. The roadmap should explain those distinctions to the people approving and delivering recruitment.",
        ],
        bullets: [
          "The work each hiring wave enables.",
          "The roles and capabilities required to begin that work.",
          "Dependencies on leaders, systems, processes and approvals.",
          "The owner who can confirm that each wave is ready.",
        ],
      },
      {
        id: "capacity",
        title: "Plan the selection capacity as well as sourcing.",
        paragraphs: [
          "Recruitment capacity includes more than the number of people sourcing candidates. Hiring managers need time to calibrate roles, conduct interviews and provide useful feedback. Approvers need to be available. Candidates need a coherent process and timely communication.",
          "Map the expected hiring demand against the capacity of the internal recruitment team and the stakeholders making decisions. Identify where additional recruitment support may be useful and which activities it would own. If RPO is being considered, agree the responsibility split, systems access and review rhythm around the actual programme.",
          "Be clear about the client’s ATS and the source of truth for candidate information. Duplicate records and unclear ownership can complicate coordination. Access should be limited to what the engagement requires, with responsibilities for updating and retaining information agreed before delivery.",
        ],
      },
      {
        id: "review",
        title: "Keep uncertainty in the plan.",
        paragraphs: [
          "A roadmap is a working view of the requirement, not a promise that the original assumptions will remain true. Business priorities, role scope, availability of interviewers and readiness of the work can change. Establish review points that allow the team to discuss those changes explicitly.",
          "At each review, consider approved demand, role readiness, candidate progression and decisions waiting for an owner. A large pipeline does not establish that the programme is on course. The relevant question is whether the next business milestone has the capability and decision support it needs.",
          "Where a change affects scope, timing or recruitment capacity, revise the roadmap and explain the consequences. Continuing against a familiar plan can feel efficient while creating avoidable work for the next stage.",
        ],
      },
      {
        id: "brief",
        title: "A practical briefing checklist.",
        paragraphs: [
          "Before discussing talent support, bring the business mandate, the functions involved and a distinction between approved and potential hiring. Include the leadership roles, specialist priorities, expected waves and the decision owners available to support selection.",
          "Add the current recruitment model, ATS, interview process and known constraints. Identify the questions still open. The aim of the first conversation is a shared view of the work and its dependencies, from which leadership search, specialist hiring or recruitment capacity can be scoped.",
        ],
        bullets: [
          "What work must the centre become capable of doing?",
          "Which appointments influence the definition or selection of other roles?",
          "What makes each hiring wave ready to begin?",
          "Who owns the next decision at each stage?",
          "Which recruitment activities need additional support?",
        ],
      },
    ],
  },
  {
    slug: "choosing-an-rpo-engagement",
    topic: "Workforce",
    title: "What should an RPO engagement actually own?",
    readMinutes: 7,
    summary:
      "The right recruitment model begins with demand and responsibility. Before discussing scale, make the work, decisions and boundaries of the engagement explicit.",
    related: "/capabilities/recruitment-process-outsourcing",
    sections: [
      {
        id: "problem",
        title: "Define the problem before choosing the model.",
        paragraphs: [
          "A business can experience hiring pressure for several reasons. Approved demand may exceed the recruitment team’s capacity. Role requirements may keep changing. Interviews may be difficult to schedule. Feedback or offer approvals may arrive too slowly. These problems can appear together, but they do not have the same solution.",
          "Before choosing RPO, describe where recruitment is struggling and why the business needs a different working model. Separate the activities that need more capacity from the decisions that need clearer ownership. An external team cannot independently resolve every constraint in a client’s hiring process.",
          "Prepare an honest view of demand: confirmed roles, likely future roles and assumptions that could change. Include functions, locations, expected hiring waves and the capabilities involved. This provides a more useful basis for scoping than a headline volume alone.",
        ],
      },
      {
        id: "engagement",
        title: "Distinguish a project from a continuing programme.",
        paragraphs: [
          "A defined project may support a team build or a particular hiring wave. It needs a clear objective, scope, review process and handover. An ongoing programme must be able to respond to changes in priorities while maintaining coordination with the internal talent acquisition team.",
          "The distinction affects the capacity discussion, the reporting rhythm and the transition arrangements. It also affects how both sides will recognise that the original engagement has changed. Neither model is inherently better; the choice follows the shape and stability of the requirement.",
          "For a few independent specialist roles, Permanent Staffing may provide a more direct route. A business-critical senior appointment may be better considered as an Executive Search mandate. RPO is most useful to discuss when recruitment capacity and programme coordination are themselves part of the business problem.",
        ],
      },
      {
        id: "map",
        title: "Make the responsibility map concrete.",
        paragraphs: [
          "Write down who owns each meaningful activity and decision. The map should cover demand approval, role calibration, sourcing, screening, interview coordination, feedback, selection, offer approval, candidate communication and records. An activity can involve several people, but the owner of the next decision should be identifiable.",
          "Avoid broad phrases such as end-to-end unless they are supported by a precise scope. Does the partner coordinate interviews or control interviewer availability? Can it discuss compensation within an approved framework, or must every change return to the client? Who updates the ATS after a decision? These details shape the actual operating model.",
        ],
        table: {
          caption: "Questions for the responsibility discussion",
          headings: ["Area", "Question"],
          rows: [
            [
              "Priorities",
              "Who can approve new demand or change the order of roles?",
            ],
            [
              "Assessment",
              "Who defines the criteria and evaluates the evidence?",
            ],
            ["Decisions", "Who selects the candidate and approves the offer?"],
            ["Communication", "Who tells candidates what happens next?"],
            ["Records", "Which system is authoritative, and who updates it?"],
          ],
        },
      },
      {
        id: "measures",
        title: "Choose measures that lead to action.",
        paragraphs: [
          "Reporting should help the team make decisions. A count of profiles sourced describes activity. Time spent in an interview stage may identify a process constraint. Appointment outcomes describe a different part of the programme. No single measure tells the whole story.",
          "For each measure, agree its definition, the source of data, the review frequency and the person who acts on it. If the team tracks an ageing stage, it should know what starts the clock and what happens when a decision stalls. Otherwise a dashboard can become an elaborate way to observe a problem.",
          "Service levels and delivery commitments need to reflect the engagement, the market and the client’s responsibilities. Discuss what a partner controls and what depends on other decisions. Do not turn an aspiration into a guarantee without an agreed basis.",
        ],
      },
      {
        id: "systems",
        title: "Agree systems and access before delivery.",
        paragraphs: [
          "Identify the client’s ATS and the records required to support the work. Establish what access the delivery team needs, how candidate information will be handled and who is responsible for record quality. A new recruitment model should not automatically produce a new candidate database.",
          "Access also needs a lifecycle. Confirm who authorises it, how changes are made and how it is removed when the engagement or a person’s role ends. These practical arrangements belong in mobilisation, alongside communication and escalation routes.",
          "If a system or process cannot support the proposed model, resolve the limitation during scoping. Workarounds that depend on informal sharing can create privacy and coordination problems later.",
        ],
      },
      {
        id: "exit",
        title: "Plan the review and the transition.",
        paragraphs: [
          "A defined project needs closure criteria and a handover. A continuing programme needs review points and an agreed way to change or end the engagement. Discuss outstanding candidates, records, access and responsibilities before those questions become urgent.",
          "The strongest starting brief may be a short document: the demand, the activities you want support with, the responsibilities you will retain, the systems involved and the decisions still open. That is enough to begin a useful conversation about the appropriate model.",
        ],
        bullets: [
          "Which problem is additional recruitment capacity intended to address?",
          "What is confirmed demand, and what remains an assumption?",
          "Which activities and decisions will each party own?",
          "Which measures will prompt a specific action?",
          "What changes would require the scope to be reviewed?",
        ],
      },
    ],
  },
  {
    slug: "calibrating-a-leadership-mandate",
    topic: "Leadership",
    title: "Before the search, align the mandate.",
    readMinutes: 7,
    summary:
      "A senior role specification should explain the work of leadership in a particular business. Aligning that mandate gives the search and the selection process a more useful foundation.",
    related: "/capabilities/executive-search",
    sections: [
      {
        id: "context",
        title: "Explain why the appointment matters now.",
        paragraphs: [
          "A senior appointment may carry the same title as its predecessor while facing a different business situation. The function may be growing, responsibilities may be changing or the organisation may need a capability it has not previously held. A specification built only from familiar tasks can miss that change.",
          "Begin with the business context. Why is the appointment being made? What does the organisation need the leader to make possible? Which problems must be understood, and which decisions will the leader be expected to own? Keep these questions distinct from a description of the ideal person.",
          "A clear account of the situation helps stakeholders recognise when they are asking for different things. One may prioritise building a team, another continuity and another a new direction. Those expectations need to be reconciled before they guide the market approach.",
        ],
      },
      {
        id: "outcomes",
        title: "Describe outcomes and the conditions around them.",
        paragraphs: [
          "Define the contribution expected from the role in terms that can be discussed with candidates. Avoid a list of ambitious outcomes without explaining the authority, team and resources available. Responsibility and decision rights should be considered together.",
          "The mandate should clarify reporting relationships, key stakeholders and the working environment. A role in a GCC may require close alignment with a global function while building a local team. A similar title elsewhere may hold different authority or a different stage of responsibility.",
          "Separate immediate priorities from longer-term expectations. Candidates need to understand what is settled, what they can shape and which constraints they will inherit. That information can reveal relevant experience more effectively than a broad request for strategic leadership.",
        ],
      },
      {
        id: "criteria",
        title: "Give each essential criterion a reason.",
        paragraphs: [
          "Experience requirements should connect with the work. If a particular industry background is essential, explain the decision or context that makes it necessary. If a capability can be developed with support, distinguish it from what the incoming leader must bring on arrival.",
          "A long list of preferences can make a brief appear precise while obscuring its priorities. Ask stakeholders to identify the few capabilities that would materially change the person’s ability to succeed. Discuss the trade-offs they are prepared to consider.",
          "Practical terms also belong in calibration: location, working arrangements, the compensation framework and any limitations on the opportunity. Deferring these details can result in a market approach built around assumptions that the client cannot support.",
        ],
        bullets: [
          "What must the leader have demonstrated in relevant work?",
          "Why does each essential requirement matter to this mandate?",
          "Which preferences can flex without weakening the appointment?",
          "What support will be available for development after arrival?",
        ],
      },
      {
        id: "stakeholders",
        title: "Design the decision process before meeting candidates.",
        paragraphs: [
          "Identify the stakeholders who will take part, the questions each should explore and the person accountable for the final decision. Interviews that repeat the same broad discussion may create more impressions without adding useful evidence.",
          "Agree how feedback will be recorded and considered against the mandate. Ask interviewers to distinguish evidence, interpretation and unanswered questions. A consistent framework supports discussion when candidates bring different strengths rather than a simple ranking by personal preference.",
          "Review the appointment process for practical delays. Availability, approvals and changes in the role can affect the candidate experience. A clear next step and an owner for each decision help the process remain coherent.",
        ],
      },
      {
        id: "sensitive",
        title: "Treat confidentiality as a working arrangement.",
        paragraphs: [
          "A confidential search needs more than the word confidential on a document. Agree what can be disclosed, to whom and at which stage. Consider the sensitivity of the business situation, the identity of an incumbent and the information candidates need to assess the opportunity.",
          "The agreed engagement should also specify any assessment, references, checks and support. These activities should be explicit rather than inferred from the seniority of the role. The client retains responsibility for the appointment decision.",
          "Use the initial enquiry to describe the requirement at a high level. Sensitive personal information or commercially confidential plans should be discussed through an agreed appropriate channel.",
        ],
      },
      {
        id: "working-brief",
        title: "Keep the mandate a working brief.",
        paragraphs: [
          "Market conversations can raise useful questions about the role. If the requirement changes, revise the brief and align the stakeholders again. Quietly moving the criteria can make selection inconsistent and leave candidates responding to different versions of the opportunity.",
          "A good initial mandate does not need to be lengthy. It needs a clear business context, intended outcomes, essential criteria, practical terms and decision process. Those elements provide a foundation for a considered search and a more useful conversation with potential leaders.",
        ],
        bullets: [
          "Why is the appointment needed now?",
          "What outcomes and authority belong to the role?",
          "Which criteria are essential, with a reason for each?",
          "Who assesses, who advises and who decides?",
          "What information requires deliberate confidentiality controls?",
        ],
      },
    ],
  },
];

export const articles: Article[] = [...baseArticles, ...futureWorkArticles].map(
  (article) => {
    const sections = expandSections(
      `/insights/${article.slug}`,
      article.sections,
    );
    return {
      ...article,
      sections,
      readMinutes: readingMinutes(article.summary, sections),
    };
  },
);
