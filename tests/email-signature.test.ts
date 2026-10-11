import { test } from "node:test";
import assert from "node:assert/strict";
import { company } from "../src/content/company";
import {
  linkedinUrl,
  signatureDesigns,
  signatureDownload,
  signatureHtml,
  signatureText,
  validateSignature,
  type SignatureDetails,
} from "../src/lib/email-signature";

const employee: SignatureDetails = {
  name: "Example Employee",
  designation: "Senior Consultant",
  email: "example.employee@arnoldconsultants.com",
  phone: "+91 98765 43210",
  linkedin: "https://www.linkedin.com/in/example-employee?trk=profile",
};

test("employee HTML escapes markup and uses the current shared company address", () => {
  const html = signatureHtml(
    {
      ...employee,
      name: '<img src=x onerror="alert(1)">',
      designation: "R&D <Leader>",
    },
    "https://armold.netlify.app/media/email-signature/arnold-logo.png",
  );
  assert.ok(html.includes("&lt;img"));
  assert.ok(html.includes("R&amp;D &lt;Leader&gt;"));
  assert.ok(!html.includes("<img src=x"));
  assert.ok(!html.includes("<script"));
  for (const line of company.address.lines) assert.ok(html.includes(line));
  assert.ok(!html.includes("12th A Main"));
  assert.ok(html.length < 10000);
});

test("LinkedIn accepts only safe personal HTTPS profiles and removes tracking", () => {
  assert.equal(
    linkedinUrl(employee.linkedin),
    "https://www.linkedin.com/in/example-employee",
  );
  assert.equal(
    linkedinUrl("linkedin.com/in/example"),
    "https://linkedin.com/in/example",
  );
  for (const url of [
    "javascript:alert(1)",
    "https://linkedin.com.evil.example/in/person",
    "https://evil.example/in/person",
    "http://linkedin.com/in/person",
    "https://user:pass@linkedin.com/in/person",
    "https://linkedin.com:9999/in/person",
    "https://linkedin.com/company/example",
    "https://linkedin.com/in/",
  ])
    assert.equal(linkedinUrl(url), null, url);
});

test("validation blocks empty identities and invalid phone/email/profile values", () => {
  assert.deepEqual(validateSignature(employee), {});
  const errors = validateSignature({
    name: " ",
    designation: "",
    email: "bad-email",
    phone: "+91 call me",
    linkedin: "https://evil.example",
  });
  assert.deepEqual(Object.keys(errors), [
    "name",
    "designation",
    "email",
    "phone",
    "linkedin",
  ]);
  assert.ok(validateSignature({ ...employee, phone: "123" }).phone);
  assert.ok(
    validateSignature({ ...employee, phone: "1234567890123456" }).phone,
  );
});

test("optional fields are omitted, safe links remain and plain text has no HTML", () => {
  const details = { ...employee, phone: "", linkedin: "" };
  const html = signatureHtml(
    details,
    "https://armold.netlify.app/media/email-signature/arnold-logo.png",
  );
  assert.ok(!html.includes("tel:"));
  assert.ok(html.includes(company.linkedin));
  assert.ok(html.includes("mailto:example.employee@arnoldconsultants.com"));
  const plain = signatureText(details);
  assert.ok(plain.includes(company.legalName));
  assert.ok(!plain.includes("<table"));
  assert.ok(!plain.includes("Best regards"));
});

test("all three designs escape input and download the selected safe HTML", () => {
  const logo =
    "https://armold.netlify.app/media/email-signature/arnold-logo.png";
  const outputs = signatureDesigns.map(({ id }) => {
    const details = { ...employee, name: '<script>alert("x")</script>' };
    const html = signatureHtml(details, logo, id);
    assert.ok(html.includes(`data-signature-design="${id}"`));
    assert.ok(html.includes("&lt;script&gt;"));
    assert.ok(!html.includes("<script"));
    assert.ok(html.includes(logo));
    const file = signatureDownload(details, logo, id);
    assert.ok(file.filename.endsWith(`-${id}.html`));
    assert.ok(!file.filename.includes("/"));
    assert.ok(file.html.startsWith("<!doctype html>"));
    assert.ok(file.html.includes(html));
    assert.ok(!file.html.includes("<script"));
    assert.ok(html.length < 10000);
    return html;
  });
  assert.equal(new Set(outputs).size, 3);
});
