import { chmodSync, readFileSync, writeFileSync } from "node:fs";
import {
  publicProjection,
  signPublication,
  type Publication,
} from "../src/lib/publication";
const [input, output] = process.argv.slice(2);
if (!input || !output || !process.env.CMS_CONTENT_SIGNING_SECRET)
  throw new Error(
    "Provide reviewed input, output and the private publisher secret.",
  );
const documents = JSON.parse(readFileSync(input, "utf8")) as Publication[];
const records = documents.map((doc) => {
  if (doc.publicationStatus !== "approved")
    throw new Error(
      "Every document needs the controlled factual/rights approval handoff.",
    );
  const projection = publicProjection(doc._type, doc.content);
  const record = {
    _id: doc._id,
    _type: doc._type,
    publicationStatus: "published",
    approvedAt: doc.approvedAt,
    expiresAt: doc.expiresAt,
    content: projection,
  };
  const signature = signPublication(
    record,
    process.env.CMS_CONTENT_SIGNING_SECRET!,
  );
  const content = {
    ...projection,
    sections: projection.sections.map((section) => ({
      ...section,
      ...(section.table
        ? {
            table: {
              ...section.table,
              rows: section.table.rows.map((cells) => ({ cells })),
            },
          }
        : {}),
    })),
  };
  return { ...record, content, signature };
});
writeFileSync(
  output,
  records.map((doc) => JSON.stringify(doc)).join("\n") + "\n",
  { mode: 0o600 },
);
chmodSync(output, 0o600);
console.log(
  `Prepared ${documents.length} signed records. Nothing was uploaded or published.`,
);
