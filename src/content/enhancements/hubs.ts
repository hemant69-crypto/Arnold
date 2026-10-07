import type { Section } from "../types";

export const hubEnhancements: Record<string, Section[]> = {
  "/capabilities": [
    {
      id: "cap1",
      title: "Start with the business situation.",
      paragraphs: [
        "Business consulting connects the objective with the decisions behind it. Start with growth, a new mandate or a capability gap, then identify the leadership, skills and workforce model that can support the next stage.",
        "You do not need a finished service brief to recognise the situation. Use the routes below to explore what should be clarified and bring the business context to the first conversation.",
      ],
      bullets: [
        "A business direction to clarify — Define the growth priority, people implications and practical roadmap through business consulting.",
        "A critical leader — Clarify the decisions, authority and contribution behind an Executive Search mandate.",
        "A scarce specialist — Define the role and relevant experience for a Permanent Staffing discussion.",
        "Sustained recruitment demand — Examine approved requirements, internal capacity and ownership before choosing RPO.",
        "Defined-duration capacity — Establish the work, period and responsibilities for Temporary Staffing.",
        "A specific people issue — Frame the question and intended next decision for a scoped HR Solutions discussion.",
        "A learning need — Describe the audience, work situation and observable objective before shaping capability building.",
      ],
    },
    {
      id: "cap2",
      title: "What each engagement is designed to address.",
      paragraphs: [
        "The services connect, but they answer different requirements. The comparison below helps distinguish the starting discussion and the decisions that remain with the client. Actual activities and outputs follow the agreed scope.",
      ],
      table: {
        caption: "Six services, six useful starting conversations",
        headings: [
          "Service",
          "Starting situation",
          "Discussion and client contribution",
        ],
        rows: [
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
        ],
      },
    },
    {
      id: "cap3",
      title: "Three business priorities. Connected responses.",
      paragraphs: [
        "Start with consulting to clarify the decision, then connect the delivery around it. These illustrative situations show how the capabilities work together; they are discussion examples, not claims about completed client results.",
      ],
      bullets: [
        "Scale a GCC team — Clarify the centre's business mandate, leadership responsibilities and critical skills. Build a hiring-wave roadmap, then connect Executive Search, specialist Permanent Staffing and RPO with the next milestone.",
        "Appoint a critical leader — Align the business priorities, authority and expected contribution. Translate that decision into a calibrated leadership mandate and an Executive Search, with clear stakeholder responsibilities.",
        "Build recruitment capacity for growth — Map approved demand, internal capacity and decision bottlenecks. Choose project, modular or enterprise RPO, then review pipeline progress and candidate experience against agreed measures.",
      ],
    },
  ],
  "/expertise": [
    {
      id: "exp1",
      title: "Expertise begins with the work.",
      paragraphs: [
        "A title names the role. The business context explains what the person needs to contribute. Technical environment, stakeholders, responsibility and practical conditions all change what relevant experience looks like.",
        "A technology specialist extending an established platform faces different decisions from one helping create a new capability. An account-focused sales role differs from service coordination even when both depend on customer relationships. A useful search explains those differences before comparing profiles.",
      ],
      bullets: [
        "Understand the environment in which the person will work.",
        "Describe the decisions and responsibilities they will own.",
        "Connect essential criteria with evidence the hiring team can explore.",
      ],
    },
    {
      id: "exp2",
      title: "Different contexts. Different hiring questions.",
      paragraphs: [
        "Context makes the search more precise and the interview more useful. The following questions connect three hiring settings with their distinctive contribution. Hiring for a capability is separate from outsourcing the function or the technology work itself.",
      ],
      table: {
        caption: "Context-to-criteria discussion guide",
        headings: ["Hiring context", "Question to clarify", "What it changes"],
        rows: [
          [
            "Technology specialists",
            "What work, technical environment and ownership does this role involve?",
            "Relevant experience, sourcing context and specialist interview questions.",
          ],
          [
            "GCC leadership and teams",
            "Which business milestone, decision rights and dependencies shape the team?",
            "Leadership sequence, hiring waves and recruitment-capacity discussion.",
          ],
          [
            "Business functions",
            "Which customer, process and stakeholder responsibilities does the role hold?",
            "Functional brief, practical criteria and the evidence to explore.",
          ],
        ],
      },
    },
    {
      id: "exp3",
      title: "Bring the context into the brief.",
      paragraphs: [
        "A short brief can be useful if it explains the right things. These five questions help distinguish an individual specialist appointment, a leadership mandate and a recruitment programme. They are a preparation guide, not a form or an assessment.",
      ],
      bullets: [
        "What work should this person or team make possible?",
        "Which technical or functional setting will shape the contribution?",
        "What will the role own, and where does it depend on others?",
        "Which experience is essential, and why does it matter?",
        "Who can evaluate candidates, make decisions and resolve changes?",
      ],
    },
  ],
  "/insights": [
    {
      id: "ins1",
      title: "Five perspectives on workforce capability.",
      paragraphs: [
        "Arnold Insights connects forward-looking questions with practical decisions. Explore original perspectives across five editorial pillars, with skills running through the whole workforce agenda. Articles are available to read without a subscription.",
      ],
      bullets: [
        "Leadership — Executive and AI-era leadership, CEO and CHRO priorities, succession, transitions and the mandate behind a critical appointment.",
        "Workforce — Workforce transformation, productivity, skills, workforce planning, internal mobility and the organisation of work.",
        "AI & Work — Changing jobs, human-AI collaboration, AI readiness, future skills and the people implications of AI in recruitment.",
        "GCC — India capability, GCC leadership, scaling, technology and AI talent, and the workforce behind an evolving centre.",
        "Talent & Skills — Critical skills, talent intelligence, executive hiring, build-versus-buy decisions, salary context and candidate behaviour.",
      ],
    },
    {
      id: "ins2",
      title: "Put the thinking to work.",
      paragraphs: [
        "A useful article should leave you with more than a broad principle. These perspectives include practical discussion formats that make the next question more specific. They are available to read directly, without a download or subscription.",
      ],
      table: {
        caption: "Practical examples inside the perspectives",
        headings: ["Working aid", "How to use it"],
        rows: [
          [
            "Hiring-wave roadmap",
            "Discuss purpose, prerequisites and the owner of each readiness decision.",
          ],
          [
            "RPO scope and measurement example",
            "Compare engagement briefs, define a measure and check what action its review can prompt.",
          ],
          [
            "Leadership mandate and interview map",
            "Give each criterion a reason and each interviewer a useful evidence question.",
          ],
          [
            "AI-workforce questions",
            "Connect changing tasks with leadership accountability, relevant skills and learning application.",
          ],
          [
            "Critical-skills decision guide",
            "Compare internal mobility, development, specialist hiring and recruitment capacity against the work required.",
          ],
        ],
      },
    },
    {
      id: "ins3",
      title: "From a useful question to the right conversation.",
      paragraphs: [
        "If the question concerns a centre’s hiring sequence, explore GCC & Enterprise Capability. If it concerns the recruitment operating model, start with RPO. For a business-critical appointment, use the Executive Search mandate as the reference.",
        "These are original general perspectives and illustrative planning aids, rather than client case studies or advice tailored to a particular organisation. Bring your actual context to a scoped business conversation. Arnold’s LinkedIn company page provides a separate route to professional updates.",
      ],
    },
  ],
  "/opportunities": [
    {
      id: "opp1",
      title: "Find your next opportunity. Understand the work behind it.",
      paragraphs: [
        "Look beyond the job title to the work, responsibility and environment the opportunity involves. Arnold’s hiring contexts include technology talent, leadership and selected business functions. Those areas help explain a requirement; they are not a list of currently open vacancies.",
        "Use the actual vacancy to check location, working arrangements, essential experience and the application route. The verified portal, when connected, supplies the current role information and its instructions.",
      ],
      bullets: [
        "Technology & AI — Consider the technical environment, the contribution expected and the skills you can demonstrate, alongside the tools mentioned.",
        "Leadership — Understand the mandate, authority and stakeholders behind the title.",
        "Business functions — Review the customer, process or operational responsibility the role will hold.",
        "AI & Future Skills — Look at the tasks changing in your field. Build relevant skills, practise evaluating outputs and explain how your judgement adds value.",
      ],
    },
    {
      id: "opp2",
      title: "Career advice and interview preparation.",
      paragraphs: [
        "The process depends on the vacancy and the hiring organisation. The sequence below describes common discussion points so you can prepare; it does not guarantee progression, a response to every application or a particular timescale.",
      ],
      bullets: [
        "Review the role — Check the actual requirement and practical conditions before deciding to apply.",
        "Use the verified channel — Follow the vacancy and portal instructions. Keep your information accurate and relevant.",
        "Discuss relevant experience — A recruiter conversation, where applicable, can clarify contribution, expectations and practical alignment.",
        "Take part in client selection — The hiring organisation determines its interviews and selection decisions. Follow the instructions for that process.",
        "Clarify an offer and joining — If selected, review the employer’s actual terms and joining information through the authorised contacts.",
        "Prepare your CV — Connect your experience with the work, explain your contribution accurately and use relevant examples. Submit it only through the verified application route when available.",
        "Prepare for interviews — Choose examples that show the problem, your actions and the result. Be clear about your own contribution and the decisions you would approach differently.",
        "Research the employer — Understand the business, the team’s responsibilities and the questions you need answered about the role. Client logos are not a list of current vacancies.",
      ],
    },
    {
      id: "opp3",
      title: "Practical questions before you apply.",
      paragraphs: [
        "If no portal is connected, applications cannot be submitted on this website. The business enquiry form is for employer requirements and does not accept CVs. Company updates offer useful context, but visiting LinkedIn is not an application.",
      ],
      bullets: [
        "Where does my CV belong? — Use the verified application route specified for the role once available; this website has no CV-upload facility.",
        "How do I check fit? — Read the current role’s work, location and essential requirements before applying.",
        "Is a LinkedIn post still current? — Check its date and current application instructions. A visible post does not establish that the role remains open.",
        "What confirms an application? — Follow the portal’s process and check its actual confirmation. Opening a page or submitting an employer enquiry does not apply for a job.",
        "How should I discuss salary? — Compare responsibilities, location, experience and the full package. Use dated, relevant evidence and clarify the employer’s actual range; no verified salary benchmark is published here.",
      ],
    },
  ],
  "/contact": [
    {
      id: "contact1",
      title: "What to expect from the first conversation.",
      paragraphs: [
        "A short outline gives a useful starting point. The first conversation should clarify the requirement and the support that fits it: the business objective, relevant roles or capabilities, practical timing and the people who can make decisions.",
        "From there, the next step is to establish fit and any information needed to agree a scope. Sending an enquiry does not automatically book an appointment or start an engagement. The form above shows whether sending is currently available.",
      ],
      bullets: [
        "Bring the objective — Explain what the business needs to make possible.",
        "Describe the requirement — Give enough role, function or programme context to frame the discussion.",
        "Identify the owners — Name who can clarify priorities and approve the next step; start sensitive requirements at a high level.",
      ],
    },
    {
      id: "contact2",
      title: "Choose the right route.",
      paragraphs: [
        "A business enquiry, a job application and a professional update need different routes. Choosing the right one keeps the information with the relevant process and avoids treating a social-profile visit as a submitted request.",
      ],
      bullets: [
        "For employers — Use the business enquiry form when sending is enabled. Keep the opening description concise and leave confidential records out.",
        "For candidates — Check Opportunities for the verified ATS and its current availability. The employer form is not an application channel.",
        "For professional updates — Visit Arnold’s company LinkedIn page. It is a supplementary information route, not a substitute for an unavailable website form.",
      ],
    },
    {
      id: "contact3",
      title: "Connect with Arnold.",
      paragraphs: [
        "Arnold Consulting is based in India and serves clients in the USA. The company’s Bengaluru roots inform its technology and GCC talent context. This describes the business footprint without implying a USA office.",
        "The verified company LinkedIn page is available below for professional updates. Direct enquiry delivery is not connected in this preview. A monitored business email, phone and any detailed address will be added once the current Arnold contact record is confirmed.",
      ],
    },
  ],
  "/thank-you": [
    {
      id: "thank1",
      title: "Your next step.",
      paragraphs: [
        "No enquiry is confirmed for this visit. Return to Contact to check whether sending is available. Opening this page does not submit a message or create a request for follow-up.",
      ],
    },
    {
      id: "thank2",
      title: "What to have ready.",
      paragraphs: [
        "For a possible business conversation, keep the objective and the people requirement clear. You do not need to add confidential records or candidate information to prepare.",
      ],
      bullets: [
        "The business objective and the work it should enable.",
        "The relevant role, function, hiring programme or learning need.",
        "The practical timing and the person who can approve decisions.",
      ],
    },
    {
      id: "thank3",
      title: "Useful routes while you prepare.",
      paragraphs: [
        "Contact shows the current enquiry state. Capabilities explains the six services, and Approach describes how responsibilities and decisions can be coordinated. If you are looking for a role, use Opportunities for the application route.",
      ],
    },
  ],
};
