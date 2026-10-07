export type SectionStyle = "editorial" | "example" | "sequence" | "questions";
const styles: Record<string, SectionStyle> = {};
for (const id of [
  "perm2",
  "exec1",
  "exec3",
  "rpo2",
  "hr2",
  "temp1",
  "train1",
  "train3",
  "gcc2",
  "emp2",
  "app2",
  "app3",
  "tech1",
  "func2",
  "agcc1",
  "arpo1",
  "arpo2",
  "alead1",
  "alead2",
  "cap2",
  "cap3",
  "exp2",
  "ins2",
])
  styles[id] = "example";
for (const id of [
  "perm3",
  "exec2",
  "rpo1",
  "rpo3",
  "temp3",
  "emp3",
  "about1",
  "opp2",
])
  styles[id] = "sequence";
for (const id of ["gcc3", "exp3", "opp3"]) styles[id] = "questions";
export const sectionStyle = (id: string): SectionStyle =>
  styles[id] ?? "editorial";
export const isEnhancement = (id: string) =>
  /^(cap|exp|ins|opp|perm|exec|rpo|hr|temp|train|gcc|emp|app|about|tech|func|priv|terms|agcc|arpo|alead|contact|thank)[123]$/.test(
    id,
  );

type Resource = { label: string; href: string };
const resource = (label: string, href: string): Resource => ({ label, href });
const service = (label: string, slug: string) =>
  resource(label, `/capabilities/${slug}`);
export const sectionResources: Record<string, Resource[]> = {
  cap1: [
    service("Permanent Staffing", "permanent-staffing"),
    service("Executive Search", "executive-search"),
    service("RPO", "recruitment-process-outsourcing"),
    service("Temporary Staffing", "temporary-staffing"),
    service("HR Solutions", "hr-solutions"),
    service("Training", "training"),
  ],
  cap3: [
    resource("Business consulting", "/consulting"),
    resource("GCC & Technology", "/gcc"),
    resource("Prepare a business conversation", "/employers"),
  ],
  exp2: [
    resource("Technology talent", "/expertise/technology"),
    resource("Business functions", "/expertise/business-functions"),
    resource("GCC & Technology", "/gcc"),
  ],
  exp3: [
    service("Specialist hiring", "permanent-staffing"),
    service("Leadership search", "executive-search"),
    service("Recruitment capacity", "recruitment-process-outsourcing"),
  ],
  ins1: [
    resource(
      "Plan a GCC hiring roadmap",
      "/insights/planning-a-gcc-hiring-roadmap",
    ),
    resource(
      "Choose an RPO engagement",
      "/insights/choosing-an-rpo-engagement",
    ),
    resource(
      "Calibrate a leadership mandate",
      "/insights/calibrating-a-leadership-mandate",
    ),
  ],
  ins2: [
    resource(
      "Explore the hiring-wave example",
      "/insights/planning-a-gcc-hiring-roadmap#agcc1",
    ),
    resource(
      "Explore the measure-definition guide",
      "/insights/choosing-an-rpo-engagement#arpo2",
    ),
    resource(
      "Explore the interview map",
      "/insights/calibrating-a-leadership-mandate#alead2",
    ),
  ],
  ins3: [
    resource("GCC talent support", "/gcc"),
    service("RPO", "recruitment-process-outsourcing"),
    service("Executive Search", "executive-search"),
  ],
  perm1: [
    resource("Technology hiring context", "/expertise/technology"),
    resource("Functional hiring context", "/expertise/business-functions"),
  ],
  perm3: [resource("Our approach", "/approach")],
  exec2: [
    resource(
      "Calibrate the leadership mandate",
      "/insights/calibrating-a-leadership-mandate",
    ),
  ],
  exec3: [
    resource(
      "Explore the interview map",
      "/insights/calibrating-a-leadership-mandate#alead2",
    ),
  ],
  rpo2: [
    resource(
      "Define a programme measure",
      "/insights/choosing-an-rpo-engagement#arpo2",
    ),
  ],
  rpo3: [
    resource(
      "Explore the handover guide",
      "/insights/choosing-an-rpo-engagement#arpo3",
    ),
  ],
  hr3: [
    resource("Business consulting", "/consulting"),
    service("Training", "training"),
    service("RPO", "recruitment-process-outsourcing"),
  ],
  temp3: [
    service("Permanent Staffing", "permanent-staffing"),
    resource("Plan the engagement", "/employers"),
  ],
  train3: [
    service("HR Solutions", "hr-solutions"),
    resource("Prepare a learning conversation", "/employers"),
  ],
  gcc2: [
    resource(
      "Read the worked roadmap",
      "/insights/planning-a-gcc-hiring-roadmap#agcc1",
    ),
  ],
  gcc3: [
    resource("Business consulting", "/consulting"),
    resource("Technology talent", "/expertise/technology"),
  ],
  emp1: [resource("Compare all capabilities", "/capabilities#cap2")],
  emp3: [
    resource("See how we work", "/approach"),
    resource("Start a business enquiry", "/contact"),
  ],
  app1: [
    service("Permanent Staffing", "permanent-staffing"),
    service("Executive Search", "executive-search"),
  ],
  app3: [
    resource("Candidate information", "/opportunities"),
    resource("For employers", "/employers"),
  ],
  about2: [
    resource("How we work together", "/approach"),
    resource("Business consulting", "/consulting"),
  ],
  tech3: [
    service("Permanent Staffing", "permanent-staffing"),
    service("Executive Search", "executive-search"),
    service("RPO", "recruitment-process-outsourcing"),
    resource("GCC & Technology", "/gcc"),
  ],
  func3: [
    resource("Our approach", "/approach"),
    service("RPO", "recruitment-process-outsourcing"),
  ],
  opp1: [
    resource("Technology context", "/expertise/technology"),
    resource("Business-function context", "/expertise/business-functions"),
  ],
  contact2: [
    resource("Candidate information", "/opportunities"),
    resource("Compare the six services", "/capabilities"),
  ],
  agcc3: [
    resource("GCC & Technology", "/gcc"),
    resource("For employers", "/employers"),
  ],
  arpo3: [
    service("Explore RPO", "recruitment-process-outsourcing"),
    resource("Our approach", "/approach"),
  ],
  alead3: [
    service("Executive Search", "executive-search"),
    resource("For employers", "/employers"),
  ],
};
