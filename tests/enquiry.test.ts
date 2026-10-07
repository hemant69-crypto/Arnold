import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import {
  processEnquiry,
  validateEnquiry,
  validReceipt,
  createReceipt,
  readLimitedBody,
  type EnquiryStore,
  type Reservation,
} from "../src/lib/enquiry";
const secret = "local-test-secret-that-is-long-enough-12345";
const enquiry = () => ({
  requestId: randomUUID(),
  name: "Test Person",
  email: "person@gmail.com",
  company: "Test Organisation",
  phone: "",
  interest: "executive-search",
  message: "A fictional leadership requirement for local testing.",
  website: "",
});
class Store implements EnquiryStore {
  state = new Map<string, { digest: string; accepted: boolean }>();
  blocked = false;
  async reserve(id: string, digest: string): Promise<Reservation> {
    if (this.blocked) return "blocked";
    const prior = this.state.get(id);
    if (prior)
      return prior.digest !== digest
        ? "conflict"
        : prior.accepted
          ? "accepted"
          : "pending";
    this.state.set(id, { digest, accepted: false });
    return "reserved";
  }
  async accept(id: string, digest: string) {
    this.state.set(id, { digest, accepted: true });
  }
}
test("personal-domain buyer accepted; invalid fields, header injection and unsupported interests rejected", () => {
  assert.ok(validateEnquiry(enquiry()).data);
  assert.equal(
    validateEnquiry({ ...enquiry(), interest: "consulting" }).data?.interest,
    "consulting",
  );
  for (const change of [
    { name: "Name\r\nBcc: other@example.com" },
    { email: "a@example.com\r\nBcc:b@example.com" },
    { interest: "arbitrary" },
    { message: "x".repeat(3001) },
    { website: "bot" },
    { to: "attacker@example.com" },
  ])
    assert.equal(validateEnquiry({ ...enquiry(), ...change }).data, undefined);
});
test("concurrent duplicate and retry deliver once; receipt only follows provider acceptance", async () => {
  let sends = 0;
  const store = new Store();
  const data = enquiry();
  const deps = {
    store,
    secret,
    origin: "https://example.com",
    provider: {
      send: async () => {
        sends++;
        await new Promise((resolve) => setTimeout(resolve, 15));
        return "accepted" as const;
      },
    },
  };
  const results = await Promise.all([
    processEnquiry(data, deps.origin, "ip", deps),
    processEnquiry(data, deps.origin, "ip", deps),
  ]);
  assert.equal(sends, 1);
  assert.ok(results.some((r) => r.status === 200));
  assert.ok(results.some((r) => r.status === 409));
  const retry = await processEnquiry(data, deps.origin, "ip", deps);
  assert.equal(sends, 1);
  assert.equal(retry.accepted, true);
  assert.ok(validReceipt(retry.receipt, secret));
  assert.equal(
    (
      await processEnquiry(
        { ...data, message: "Changed" },
        deps.origin,
        "ip",
        deps,
      )
    ).status,
    409,
  );
});
test("cross-origin requests, rate limit, limiter outage and unknown delivery never report acceptance", async () => {
  for (const condition of [
    "origin",
    "blocked",
    "outage",
    "unknown",
    "rejected",
  ]) {
    const store = new Store();
    store.blocked = condition === "blocked";
    if (condition === "outage")
      store.reserve = async () => {
        throw new Error("offline");
      };
    let calls = 0;
    const result = await processEnquiry(
      enquiry(),
      condition === "origin" ? "https://bad.example" : "https://example.com",
      "ip",
      {
        store,
        secret,
        origin: "https://example.com",
        provider: {
          send: async () => {
            calls++;
            return condition === "rejected" ? "rejected" : "unknown";
          },
        },
      },
    );
    assert.notEqual(result.accepted, true);
    assert.equal(result.receipt, undefined);
    if (["origin", "blocked", "outage"].includes(condition))
      assert.equal(calls, 0);
  }
});
test("receipts reject missing, forged, expired and future tokens", () => {
  const id = randomUUID();
  const now = Date.now();
  const receipt = createReceipt(id, secret, now);
  assert.ok(validReceipt(receipt, secret, now));
  assert.equal(validReceipt(undefined, secret, now), false);
  assert.equal(validReceipt(receipt + "x", secret, now), false);
  assert.equal(validReceipt(receipt, secret, now + 901000), false);
  assert.equal(
    validReceipt(createReceipt(id, secret, now + 100000), secret, now),
    false,
  );
});
test("streamed bodies are bounded even without a content-length header", async () => {
  const body = "x".repeat(25000);
  const request = new Request("https://example.com", { method: "POST", body });
  await assert.rejects(() => readLimitedBody(request));
});
