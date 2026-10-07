import { createHmac, timingSafeEqual } from "node:crypto";
import type { Section, Service, Article } from "@/content/types";
import type { EditorialPage } from "@/content/pages";
import { allRoutes } from "@/content/routes";
import { services } from "@/content/services";
import { pages } from "@/content/pages";
import { consultingSectionIds } from "@/content/consulting";
export type ContentKind = "service" | "insight" | "editorialPage";
export type Publication = {
  _id: string;
  _type: ContentKind;
  publicationStatus: string;
  approvedAt: string;
  expiresAt?: string;
  signature: string;
  content: unknown;
};
const images = [
  "leadership-discussion.jpg",
  "learning-session.jpg",
  "team-collaboration.jpg",
  "technology-infrastructure.jpg",
  "architecture-reflection.jpg",
  "bengaluru-aerial.jpg",
];
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Invalid content");
  return value as Record<string, unknown>;
}
function text(value: unknown, max = 5000) {
  if (typeof value !== "string" || value.length > max)
    throw new Error("Invalid text");
  return value;
}
function list(value: unknown, max = 40): unknown[] {
  if (!Array.isArray(value) || value.length > max)
    throw new Error("Invalid list");
  return value;
}
function section(value: unknown): Section {
  const s = object(value);
  const result: Section = {
    id: text(s.id, 80),
    title: text(s.title, 200),
    paragraphs: list(s.paragraphs).map((v) => text(v)),
  };
  if (!/^[a-z0-9-]+$/.test(result.id)) throw new Error("Invalid section");
  if (s.bullets) result.bullets = list(s.bullets).map((v) => text(v, 1000));
  if (s.table) {
    const t = object(s.table);
    result.table = {
      caption: text(t.caption, 200),
      headings: list(t.headings, 4).map((v) => text(v, 100)),
      rows: list(t.rows, 20).map((row) =>
        list(Array.isArray(row) ? row : object(row).cells, 4).map((v) =>
          text(v, 800),
        ),
      ),
    };
  }
  return result;
}
function image(value: unknown) {
  if (value === undefined) return undefined;
  const name = text(value, 80);
  if (!images.includes(name)) throw new Error("Unapproved image");
  return name;
}
export function publicProjection(
  kind: ContentKind,
  value: unknown,
): Service | Article | EditorialPage {
  const c = object(value);
  const sections = list(c.sections).map(section);
  if (kind === "service") {
    const slug = text(c.slug, 80);
    if (!services.some((s) => s.slug === slug))
      throw new Error("Unknown service");
    return {
      slug,
      name: text(c.name, 100),
      headline: text(c.headline, 220),
      summary: text(c.summary, 1200),
      cta: text(c.cta, 100),
      sections,
      image: image(c.image),
      imageAlt: c.imageAlt ? text(c.imageAlt, 300) : undefined,
      variant: c.variant ? text(c.variant, 40) : undefined,
      faqs: list(c.faqs, 15).map((v) => {
        const f = object(v);
        return {
          question: text(f.question, 250),
          answer: text(f.answer, 1500),
        };
      }),
      related: list(c.related, 6).map((v) => {
        const s = text(v, 80);
        if (!services.some((service) => service.slug === s))
          throw new Error("Unknown service");
        return s;
      }),
    };
  }
  if (kind === "insight") {
    const slug = text(c.slug, 100);
    const related = text(c.related, 180);
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      !allRoutes.includes(related)
    )
      throw new Error("Unknown article route");
    const readMinutes = Number(c.readMinutes);
    if (!Number.isInteger(readMinutes) || readMinutes < 1 || readMinutes > 30)
      throw new Error("Invalid reading time");
    return {
      slug,
      topic: text(c.topic, 100),
      title: text(c.title, 220),
      summary: text(c.summary, 1500),
      sections,
      related,
      readMinutes,
    };
  }
  const path = text(c.path, 180);
  if (!pages.some((p) => p.path === path)) throw new Error("Unknown page");
  if (path === "/consulting") {
    const ids = new Set(sections.map((s) => s.id));
    if (
      ids.size !== sections.length ||
      consultingSectionIds.some((id) => !ids.has(id))
    )
      throw new Error("Incomplete consulting composition");
  }
  return {
    path,
    label: text(c.label, 100),
    title: text(c.title, 220),
    summary: text(c.summary, 1500),
    cta: c.cta ? text(c.cta, 100) : undefined,
    interest: c.interest ? text(c.interest, 80) : undefined,
    image: image(c.image),
    alt: c.alt ? text(c.alt, 300) : undefined,
    sections,
  };
}
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object")
    return `{${Object.entries(value)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${JSON.stringify(k)}:${canonical(v)}`)
      .join(",")}}`;
  return JSON.stringify(value);
}
export function signPublication(
  doc: Omit<Publication, "signature">,
  secret: string,
) {
  if (secret.length < 32)
    throw new Error("A strong publisher secret is required");
  const payload = {
    _id: doc._id,
    _type: doc._type,
    approvedAt: doc.approvedAt,
    expiresAt: doc.expiresAt,
    content: publicProjection(doc._type, doc.content),
  };
  return createHmac("sha256", secret).update(canonical(payload)).digest("hex");
}
export function approvedProjection(
  doc: Publication,
  secret: string,
  now = Date.now(),
) {
  if (!doc || typeof doc._id !== "string") return null;
  if (
    doc._id.startsWith("drafts.") ||
    doc._id.startsWith("versions.") ||
    doc.publicationStatus !== "published" ||
    !doc.approvedAt ||
    Date.parse(doc.approvedAt) > now ||
    !Number.isFinite(Date.parse(doc.approvedAt)) ||
    (doc.expiresAt &&
      (!Number.isFinite(Date.parse(doc.expiresAt)) ||
        Date.parse(doc.expiresAt) <= now))
  )
    return null;
  try {
    const expected = signPublication(doc, secret);
    if (
      !/^[a-f0-9]{64}$/.test(doc.signature) ||
      !timingSafeEqual(Buffer.from(expected), Buffer.from(doc.signature))
    )
      return null;
    return publicProjection(doc._type, doc.content);
  } catch {
    return null;
  }
}
