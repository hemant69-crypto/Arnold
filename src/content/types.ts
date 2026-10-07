export type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  table?: { caption: string; headings: string[]; rows: string[][] };
};
export type FAQ = { question: string; answer: string };
export type Service = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  cta: string;
  image?: string;
  imageAlt?: string;
  variant?: string;
  sections: Section[];
  faqs: FAQ[];
  related: string[];
};
export type Article = {
  slug: string;
  topic: string;
  title: string;
  summary: string;
  sections: Section[];
  related: string;
  readMinutes: number;
};
