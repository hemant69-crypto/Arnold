import type { Section } from "../types";

export const serviceEnhancements: Record<string, Section[]> = {
  "/capabilities/permanent-staffing": [
    {
      id: "perm1",
      title: "Where a targeted search makes the difference.",
      paragraphs: [
        "A specialist requirement is rarely solved by a longer list of profiles. The search needs a clear view of the work and of the experience that is relevant to it. The reason for hiring changes where to look, which questions to ask and what the shortlist needs to explain.",
        "Consider these illustrative situations. The job title may look familiar in each, but the contribution, market and selection conversation are different. Agree those differences before asking candidates to invest their time.",
      ],
      bullets: [
        "A scarce technology skill — Name the technical environment, the problem to solve and the experience that is essential. Separate an unfamiliar tool from a genuinely different capability.",
        "A new specialist role — Explain what the person will own, where support will come from and how the role connects with an existing leader or team. A new title needs a credible working context.",
        "A replacement in an established function — Clarify what should continue and what should change. Reusing an old description can preserve expectations that no longer fit the business.",
      ],
    },
    {
      id: "perm2",
      title: "What a useful shortlist should explain.",
      paragraphs: [
        "A CV records experience. A useful shortlist connects that experience with the agreed requirement and makes the next interview more purposeful. It should show why a candidate is relevant, what practical context matters and which questions remain open.",
        "The discussion format below is illustrative, with no real candidate information or scores. Screening informs the employer’s evaluation; it does not replace specialist interviews, the selection decision or checks explicitly agreed for the engagement.",
      ],
      table: {
        caption: "Illustrative shortlist discussion format",
        headings: [
          "Brief criterion",
          "Relevant information",
          "Question to explore",
        ],
        rows: [
          [
            "Contribution",
            "Experience connected with the work the role will own.",
            "What did the candidate personally decide or deliver?",
          ],
          [
            "Working context",
            "Technical or functional environment, stakeholders and level of responsibility.",
            "How comparable is that context with this requirement?",
          ],
          [
            "Practical alignment",
            "Role expectations, location and availability discussed through the agreed process.",
            "What needs clarification before the next stage?",
          ],
          [
            "Evidence still needed",
            "An unresolved point, kept separate from an assumption.",
            "Which interviewer or agreed check should address it?",
          ],
        ],
      },
    },
    {
      id: "perm3",
      title: "Keep the path from offer to joining clear.",
      paragraphs: [
        "Selection is an important decision, but it is not the end of the coordination. Keep the role, reporting relationship and practical expectations consistent as the conversation moves towards an offer and a possible start.",
        "Agree who communicates an offer, who answers employment questions and who follows up on outstanding information. The employer owns its employment decision and terms. Arnold’s coordination and any additional support follow the agreed engagement.",
      ],
      bullets: [
        "Confirm expectations — Resolve material questions about the role, location, working arrangements and likely start before they become conflicting assumptions.",
        "Keep communication owned — Identify the contact for candidate updates and the employer’s authorised decision maker. Share changes through that route.",
        "Prepare the handover — Confirm the employer’s documentation and joining instructions, then record the next checkpoint. Discuss any further support separately.",
      ],
    },
  ],
  "/capabilities/executive-search": [
    {
      id: "exec1",
      title: "Three mandates. Three different searches.",
      paragraphs: [
        "The search changes when the leadership task changes. A title alone cannot tell the market what the organisation needs. Describe the decisions the person must own, the conditions they will inherit and the stakeholders who need to work with them.",
        "These illustrative mandates show why context belongs at the centre of a leadership brief. They are discussion examples, rather than completed Arnold assignments.",
      ],
      table: {
        caption: "Different leadership tasks change the search",
        headings: ["Situation", "Mandate to clarify", "Evidence to explore"],
        rows: [
          [
            "Establishing a function",
            "What must be built, what authority exists and which foundations are already in place?",
            "Experience creating a workable function with the available support.",
          ],
          [
            "A critical established role",
            "What needs continuity, what needs change and who must align around the appointment?",
            "Judgement in a comparable operating environment and stakeholder setting.",
          ],
          [
            "A GCC leadership appointment",
            "Which decisions sit with the centre and how does the role work with global stakeholders?",
            "Experience connecting local capability with the wider business mandate.",
          ],
        ],
      },
    },
    {
      id: "exec2",
      title: "Use the market map to test the brief.",
      paragraphs: [
        "A market map gives the search a direction. It considers the kinds of organisations, operating situations and leadership experience that could be relevant to the mandate. A familiar employer name is one clue; the work a person has actually owned is more useful.",
        "Candidate conversations can reveal where the brief needs attention: an unusual combination of responsibilities, unclear authority or a practical constraint that limits interest. Review that feedback against the business objective before changing the search. More activity around the same unresolved assumption may not help.",
      ],
      bullets: [
        "Mandate — Anchor the search in the business contribution and essential leadership responsibilities.",
        "Relevant context — Identify environments where that experience is likely to have developed, without treating company names as proof of fit.",
        "Conversations — Explore responsibility, motivation and practical alignment through the agreed confidential process.",
        "Recalibration — Take an evidenced question back to the authorised stakeholders and communicate any agreed change consistently.",
      ],
    },
    {
      id: "exec3",
      title: "Compare evidence against the same mandate.",
      paragraphs: [
        "Leadership candidates bring different experiences and ways of explaining them. A shared decision framework helps interviewers compare what matters while retaining room for judgement. Keep observed evidence, interpretation and unanswered questions distinct.",
        "The example below is a client discussion framework, not a scoring tool or a proprietary assessment. Agree interview responsibilities and any additional assessment or reference work before those activities begin.",
      ],
      table: {
        caption: "Illustrative leadership decision framework",
        headings: [
          "Expected contribution",
          "Evidence to explore",
          "Decision owner",
        ],
        rows: [
          [
            "Give the function direction",
            "A comparable decision, the alternatives considered and the candidate’s own responsibility.",
            "Business sponsor: is the experience relevant to the mandate?",
          ],
          [
            "Work across stakeholders",
            "How the candidate handled a real disagreement or dependency.",
            "Collaborating leader: what needs further exploration?",
          ],
          [
            "Build the required capability",
            "The team, operating constraints and choices behind the candidate’s example.",
            "Functional stakeholder: which capability is demonstrated?",
          ],
        ],
      },
    },
  ],
  "/capabilities/recruitment-process-outsourcing": [
    {
      id: "rpo1",
      title: "Mobilise before the hiring wave.",
      paragraphs: [
        "Additional recruitment capacity becomes useful when the programme is ready to use it. Mobilisation connects the agreed scope with the people, systems and decisions needed to deliver. A signed requirement still needs a workable route from demand to selection.",
        "Start with approved demand and the activities included in the engagement. Then check whether role briefs, access, interview ownership and candidate communications are ready. Record unresolved dependencies so activity does not begin around conflicting assumptions.",
      ],
      bullets: [
        "Validate demand — Separate approved roles from possible future requirements; identify priorities and the person who can authorise a change.",
        "Calibrate the work — Agree role criteria, screening expectations and the information needed for a useful shortlist.",
        "Connect the owners — Name the client sponsor, hiring managers, internal TA/HR contacts and Arnold’s agreed delivery contact.",
        "Establish the operating route — Confirm permitted ATS access, interview coordination, candidate-update ownership and the review/escalation process.",
      ],
    },
    {
      id: "rpo2",
      title: "Turn a pipeline review into the next decision.",
      paragraphs: [
        "Activity totals can describe effort without explaining what the programme needs next. A useful review connects the current stage with the constraint, the owner who can resolve it and the agreed action. Review the quality of the brief and the decision process as well as sourcing activity.",
        "This illustrative review contains no real candidates, performance figures or delivery promises. The reporting format, data availability and review rhythm are agreed for the actual programme.",
      ],
      table: {
        caption: "Illustrative recruitment decision review",
        headings: ["Role group / stage", "Constraint", "Owner and next action"],
        rows: [
          [
            "Specialist roles / interviews",
            "Candidates are ready for a conversation, but interview availability is unresolved.",
            "Hiring manager: confirm a workable interview plan before increasing the same queue.",
          ],
          [
            "New function / calibration",
            "The scope has changed since sourcing began.",
            "Business sponsor: approve the revised contribution and circulate one current brief.",
          ],
          [
            "Continuing demand / planning",
            "Potential roles are being treated as approved requirements.",
            "TA/HR and sponsor: distinguish authorised demand from the planning backlog.",
          ],
        ],
      },
    },
    {
      id: "rpo3",
      title: "Agree change and handover while the programme is healthy.",
      paragraphs: [
        "A recruitment programme may expand, reduce, change direction or reach its agreed end. Decide how those changes will be reviewed before they arrive. A new role family or responsibility may need a different scope, rather than simply more activity under the old one.",
        "Continuity matters for the employer and for candidates already in process. Agree who takes over each open decision, where the relevant records belong and how communications continue. Access should follow the responsibilities that remain.",
      ],
      bullets: [
        "Review the trigger — Identify what has changed in demand, included activity or decision ownership, and who can approve the response.",
        "Account for open work — Record outstanding interviews, offers and candidate updates with the receiving owner.",
        "Complete the transfer — Confirm record ownership, permitted retention, access closure and the point at which the new arrangement takes effect.",
        "Check continuity — Make sure the people involved understand the next contact and action, including candidates in an active process.",
      ],
    },
  ],
  "/capabilities/hr-solutions": [
    {
      id: "hr1",
      title: "Which kind of people question are you bringing?",
      paragraphs: [
        "Sometimes the immediate request is a hire or a training topic, while the underlying question concerns the work itself. Begin by describing the situation, who it affects and the decision that is difficult to make. That gives a scoping conversation something concrete to investigate.",
        "These examples illustrate starting questions. The appropriate work, specialist involvement and intended output are established through an agreed scope.",
      ],
      bullets: [
        "The requirement keeps changing — Is the contribution unclear, are stakeholders expecting different things, or has the business priority moved? Clarify the role before choosing a hiring response.",
        "Recruitment decisions are slowing down — Which feedback or approval has no clear owner? Examine the decision route before assuming that additional sourcing is the answer.",
        "A team needs a particular capability — What work is difficult today, and what should people be able to do differently? Establish whether the response concerns learning, role clarity or a new appointment.",
      ],
    },
    {
      id: "hr2",
      title: "Define a useful output before the work begins.",
      paragraphs: [
        "A useful engagement should leave the team able to make a clearer decision or carry out an agreed next step. The scope needs to explain what that means in the particular situation, who will use the output and how its usefulness will be reviewed.",
        "An issue brief, a responsibility map or prioritised action requirements can be useful ways to frame that discussion. They are possibilities to agree, rather than standard products automatically included with every HR Solutions enquiry.",
      ],
      table: {
        caption: "Questions for an agreed scope",
        headings: [
          "Possible output",
          "What it should clarify",
          "Question before starting",
        ],
        rows: [
          [
            "Issue brief",
            "The situation, affected work and decision to resolve.",
            "Does the sponsor recognise the same problem?",
          ],
          [
            "Responsibility map",
            "Who contributes, approves and carries out the next action.",
            "Can those owners participate in the work?",
          ],
          [
            "Action or learning requirements",
            "The priority, intended change and review evidence.",
            "What practical next step will the team be able to take?",
          ],
        ],
      },
    },
    {
      id: "hr3",
      title: "Connect the issue with the right next step.",
      paragraphs: [
        "Clarifying a people issue should make the next decision easier. The response may connect with a named Arnold service, or it may require a qualified specialist outside the engagement. Make that choice from the issue and the agreed remit.",
        "A missing specialist contribution can lead to a Permanent Staffing brief. A business-critical leadership responsibility can lead to Executive Search. Continuing recruitment demand may justify an RPO discussion, while a defined learning need can inform a Training scope. Each route needs its own priorities and responsibilities.",
      ],
      bullets: [
        "Describe the issue — Identify the work affected and the information still needed.",
        "Name the next decision — Decide whether the requirement concerns capability, capacity, role clarity or another specialist matter.",
        "Agree the route — Confirm fit, accountable people and the scope before starting delivery.",
      ],
    },
  ],
  "/capabilities/temporary-staffing": [
    {
      id: "temp1",
      title: "Match the model to the duration and decision.",
      paragraphs: [
        "The right arrangement depends on how long the work lasts, who directs it and what should happen when the requirement changes. Describe those conditions before treating every temporary need as the same staffing model.",
        "A time-bound requirement, a changing workload and a possible extension create different review questions. The employing entity, terms, availability and responsibility split must be confirmed for the actual arrangement.",
      ],
      table: {
        caption: "Different capacity needs, different questions",
        headings: ["Requirement", "What to establish", "Review decision"],
        rows: [
          [
            "Defined-duration work",
            "The task, expected window, supervisor and conditions for a useful start.",
            "What marks the end of the requirement and who owns the handover?",
          ],
          [
            "Changing workload",
            "Which work varies, which capabilities remain essential and how changes are authorised.",
            "Does the agreed scope still match the work being directed?",
          ],
          [
            "Possible extension",
            "Whether a further period is needed and which terms require review.",
            "Who approves the next arrangement before the current one ends?",
          ],
        ],
      },
    },
    {
      id: "temp2",
      title: "Make the first day ready.",
      paragraphs: [
        "A person can be available while the assignment is not ready to begin. The role needs a supervisor, practical instructions and the access required for the work. Check those conditions alongside the agreed staffing responsibilities.",
        "Use the following as a readiness discussion. It does not assign every activity to Arnold; identify the accountable party for each item in the engagement and the workplace’s own processes.",
      ],
      bullets: [
        "Work and supervision — Confirm the task, reporting contact, workplace and instructions for the start.",
        "Equipment and access — Establish who provides tools, authorises systems access and explains relevant workplace procedures.",
        "Time and escalation — Explain the attendance or work-record process and where a practical issue should be raised.",
        "Responsibility owners — Make the approved employment, payment, documentation and assignment contacts clear before deployment.",
      ],
    },
    {
      id: "temp3",
      title: "Review the assignment through its lifecycle.",
      paragraphs: [
        "An assignment should remain connected with the requirement that was agreed. Review a material change in task, duration, location or supervision with the responsible people. Avoid allowing a sequence of informal changes to become an unreviewed engagement.",
        "An extension or transition is a decision to agree, not an automatic outcome. When the assignment closes, plan the work handover, final records and appropriate access removal through the relevant owners.",
      ],
      bullets: [
        "Start — Confirm readiness and make the supervisor and support routes clear.",
        "Review — Compare the actual work and upcoming demand with the agreed scope.",
        "Extend or transition — Review the continuing need and authorise the next arrangement explicitly.",
        "Close — Hand over work, complete the relevant records and confirm who closes access and outstanding matters.",
      ],
    },
  ],
  "/capabilities/training": [
    {
      id: "train1",
      title: "A learning brief starts with a real situation.",
      paragraphs: [
        "A topic is only the beginning. Describe the situation people need to handle and the difference you want to observe in their work. That makes it easier to discuss the audience, learning objective and support required afterwards.",
        "For example, a team might want to explain a project handover more clearly. The useful brief would identify who receives the handover, which information is being missed and what a clearer conversation should enable. This is an illustrative learning request, not a named course or a claim about a client programme.",
      ],
      table: {
        caption: "Illustrative learning-brief questions",
        headings: ["Brief field", "Question to answer"],
        rows: [
          [
            "Audience",
            "Who faces the situation, and what experience do they bring?",
          ],
          [
            "Current challenge",
            "What happens today that makes the work difficult?",
          ],
          [
            "Observable objective",
            "What should participants be able to explain, decide or do differently?",
          ],
          [
            "Working conditions",
            "Which time, access, language or manager-support needs affect the design?",
          ],
        ],
      },
    },
    {
      id: "train2",
      title: "Choose the format around the learning need.",
      paragraphs: [
        "The format should give the intended audience a useful way to work towards the objective. Discuss preparation, participant numbers, opportunities to practise and the conditions under which people can take part.",
        "Facilitated discussion, practical exercises or follow-through may be relevant possibilities. Confirm the available subject expertise, delivery approach and scope with Arnold rather than assuming every format or topic is offered.",
      ],
      bullets: [
        "Preparation — What should participants know or bring before the session, without exposing confidential workplace information?",
        "Participation — Does the objective need discussion, individual reflection, a practical task or a combination to be agreed?",
        "Access — What delivery setting, accessibility needs and working constraints should shape the format?",
        "Manager involvement — Who can create a realistic opportunity to use the learning afterwards?",
      ],
    },
    {
      id: "train3",
      title: "Plan how learning will be used afterwards.",
      paragraphs: [
        "Attendance, understanding and application answer different questions. A participant can attend a session without yet having a chance to use the learning. A useful application plan connects the objective with a real situation and appropriate support.",
        "Agree proportionate review evidence before the engagement. A later discussion can identify what was useful, what remained difficult and whether reinforcement or another response would help. Keep that review connected with the learning objective rather than assuming a guaranteed business result.",
      ],
      table: {
        caption: "A practical application discussion",
        headings: ["Plan element", "What to establish"],
        rows: [
          [
            "Situation",
            "Where will the participant have an opportunity to use the learning?",
          ],
          [
            "Practice",
            "What manageable action could they try in that setting?",
          ],
          [
            "Support",
            "What feedback, resources or manager involvement will be available?",
          ],
          [
            "Review",
            "What evidence would show progress towards the agreed objective?",
          ],
        ],
      },
    },
  ],
};
