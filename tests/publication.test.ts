import { test } from "node:test";
import assert from "node:assert/strict";
import { encodeSignatureHeader } from "@sanity/webhook";
import { articles } from "../src/content/articles";
import { services } from "../src/content/services";
import { consultingPage } from "../src/content/consulting";
import {
  approvedProjection,
  signPublication,
  type Publication,
} from "../src/lib/publication";
import { handleCmsWebhook } from "../src/lib/cms-webhook";
import { emitMeasurement } from "../src/lib/measurement";
const secret = "publisher-local-test-secret-long-enough-123456";
const now = Date.now();
function doc(): Publication {
  const d = {
    _id: "insight-roadmap",
    _type: "insight" as const,
    publicationStatus: "published",
    approvedAt: new Date(now - 1000).toISOString(),
    expiresAt: new Date(now + 1000000).toISOString(),
    signature: "",
    content: { ...articles[0], privateEvidence: "MUST NOT LEAK" },
  };
  d.signature = signPublication(d, secret);
  return d;
}
test("publication requires a valid controlled-publisher signature; public projection omits private fields", () => {
  const value = doc();
  const result = approvedProjection(value, secret, now);
  assert.ok(result);
  assert.equal(JSON.stringify(result).includes("MUST NOT LEAK"), false);
  for (const change of [
    { publicationStatus: "withdrawn" },
    { _id: "drafts.insight-roadmap" },
    { signature: "0".repeat(64) },
    { expiresAt: new Date(now - 1).toISOString() },
    { content: { ...articles[0], title: "Altered after approval" } },
  ])
    assert.equal(
      approvedProjection({ ...value, ...change }, secret, now),
      null,
    );
});
test("new editorial articles and CMS table rows retain only the public schema", () => {
  const newArticle = { ...articles[0], slug: "a-new-reviewed-perspective" };
  const value = { ...doc(), content: newArticle };
  value.signature = signPublication(value, secret);
  assert.ok(approvedProjection(value, secret, now));
  const service = services.find((s) =>
    s.sections.some((section) => section.table),
  )!;
  const content = {
    ...service,
    sections: service.sections.map((s) => ({
      ...s,
      ...(s.table
        ? {
            table: {
              ...s.table,
              rows: s.table.rows.map((cells) => ({
                cells,
                privateNote: "MUST NOT LEAK",
              })),
            },
          }
        : {}),
    })),
  };
  const serviceDoc = { ...doc(), _type: "service" as const, content };
  serviceDoc.signature = signPublication(serviceDoc, secret);
  assert.equal(
    JSON.stringify(approvedProjection(serviceDoc, secret, now)).includes(
      "MUST NOT LEAK",
    ),
    false,
  );
  assert.equal(approvedProjection({} as Publication, secret, now), null);
});
test("consulting publication retains its complete composition and excludes private notes", () => {
  const value: Publication = {
    ...doc(),
    _id: "editorial-consulting",
    _type: "editorialPage",
    content: { ...consultingPage, privateNote: "CONSULTING PRIVATE CANARY" },
  };
  value.signature = signPublication(value, secret);
  const result = approvedProjection(value, secret, now);
  assert.ok(result);
  assert.equal(result.sections.length, 31);
  assert.equal(
    JSON.stringify(result).includes("CONSULTING PRIVATE CANARY"),
    false,
  );
  for (const sections of [
    consultingPage.sections.slice(1),
    [...consultingPage.sections, consultingPage.sections[0]],
  ]) {
    assert.equal(
      approvedProjection(
        { ...value, content: { ...consultingPage, sections } },
        secret,
        now,
      ),
      null,
    );
  }
  assert.equal(
    approvedProjection(
      {
        ...value,
        content: { ...consultingPage, title: "Changed after approval" },
      },
      secret,
      now,
    ),
    null,
  );
});
test("fresh signed webhook requests current rebuild once; old, forged, unsupported and raw-payload mutations rejected", async () => {
  let builds = 0;
  const seen = new Set<string>();
  const queue = {
    reserve: async (key: string) => {
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    },
    requestCurrentBuild: async () => {
      builds++;
    },
    complete: async () => {},
  };
  const raw = JSON.stringify({
    _id: "insight-roadmap",
    _type: "insight",
    operation: "update",
  });
  const signature = await encodeSignatureHeader(raw, now, secret);
  assert.equal(
    (await handleCmsWebhook(raw, signature, secret, queue, now)).status,
    202,
  );
  assert.equal(
    (await handleCmsWebhook(raw, signature, secret, queue, now)).result,
    "already-requested",
  );
  assert.equal(builds, 1);
  assert.equal(
    (await handleCmsWebhook(raw + " ", signature, secret, queue, now)).status,
    401,
  );
  assert.equal(
    (
      await handleCmsWebhook(
        raw,
        await encodeSignatureHeader(raw, now - 400000, secret),
        secret,
        queue,
        now,
      )
    ).status,
    401,
  );
  const bad = JSON.stringify({
    _id: "drafts.private",
    _type: "insight",
    operation: "update",
  });
  assert.equal(
    (
      await handleCmsWebhook(
        bad,
        await encodeSignatureHeader(bad, now, secret),
        secret,
        queue,
        now,
      )
    ).status,
    400,
  );
});
test("analytics remains disabled without consent and never forwards arbitrary context fields", () => {
  const sent: unknown[] = [];
  const send = (event: unknown, data: unknown) => sent.push({ event, data });
  emitMeasurement(
    "consultation_start",
    { service: "executive-search" },
    { enabled: false, consent: true, send },
  );
  assert.equal(sent.length, 0);
  emitMeasurement(
    "consultation_start",
    { service: "email@example.com" },
    { enabled: true, consent: true, send },
  );
  assert.deepEqual(sent, [
    { event: "consultation_start", data: { service: undefined } },
  ]);
});
