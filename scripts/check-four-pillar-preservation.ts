import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { consultingPage } from "../src/content/consulting";
import { services } from "../src/content/services";
import { pages } from "../src/content/pages";
import { articles } from "../src/content/articles";
import { talentScenes, talentSections } from "../src/content/talent-search";
import { allRoutes } from "../src/content/routes";
import type { Section } from "../src/content/types";

// Compare the final projection with the captured, pre-edit content; the
// baseline stays in ignored QA output and is never a production dependency.
async function main() {
  const baseline = JSON.parse(
    await readFile("output/four-pillar/baseline.json", "utf8"),
  );
  assert.deepEqual(consultingPage, baseline.consulting);
  const consultingFiles: Record<string, string> = {};
  for (const [path, hash] of Object.entries(baseline.hashes)) {
    consultingFiles[path] = createHash("sha256")
      .update(
        path === "src/components/Consulting.tsx"
          ? (await readFile(path, "utf8")).replace(
              "<figcaption>A priority map</figcaption>",
              "<figcaption>\n              A priority map <span>Illustrative format</span>\n            </figcaption>",
            )
          : await readFile(path),
      )
      .digest("hex");
    assert.equal(consultingFiles[path], hash, path);
  }
  const sections: Section[] = [
    ...talentSections,
    ...services.flatMap((service) => service.sections),
    ...pages.flatMap((page) => page.sections),
  ];
  const copy = [
    ...talentScenes.map((scene) => scene.copy),
    ...sections.flatMap((section) => section.paragraphs),
  ].join("\n");
  for (const theme of baseline.themes)
    assert.ok(copy.includes(theme.copy), theme.title);
  for (const id of ["cap1", "cap3"])
    assert.deepEqual(
      talentSections.find((section) => section.id === id),
      baseline.hub.find((section: Section) => section.id === id),
    );
  const comparisonRows = baseline.hub.find(
    (section: Section) => section.id === "cap2",
  ).table.rows;
  const finalRows = sections.flatMap((section) => section.table?.rows ?? []);
  for (const row of comparisonRows)
    assert.ok(
      finalRows.some((final) => JSON.stringify(final) === JSON.stringify(row)),
      row[0],
    );
  assert.deepEqual(
    services
      .find((service) => service.slug === "workforce-solutions")!
      .sections.find((section) => section.id === "workforce-models"),
    baseline.workforce[0],
  );
  assert.deepEqual(
    talentSections.find((section) => section.id === "skills-intelligence"),
    baseline.workforce[1],
  );
  for (const slug of baseline.serviceSlugs)
    assert.ok(services.some((service) => service.slug === slug));
  for (const slug of baseline.articleSlugs)
    assert.ok(articles.some((article) => article.slug === slug));
  for (const collection of [
    talentSections,
    ...services.map((service) => service.sections),
    ...pages.map((page) => page.sections),
  ])
    assert.equal(
      new Set(collection.map((section) => section.id)).size,
      collection.length,
    );
  assert.equal(new Set(allRoutes).size, allRoutes.length);
  const result = {
    consultingUnchangedApartFromApprovedCaptionRemoval: true,
    consultingFiles,
    capabilities: {
      themesPreserved: baseline.themes.length,
      comparisonRowsPreserved: comparisonRows.length,
      businessSituations: baseline.hub[0].bullets.length,
      buyerJourneys: baseline.hub[2].bullets.length,
      workforceModels: baseline.workforce[0].table.rows.length,
      skillsIntelligencePreserved: true,
    },
    oldServiceRoutesPreserved: baseline.serviceSlugs.length,
    oldArticleRoutesPreserved: baseline.articleSlugs.length,
    routes: allRoutes.length,
  };
  await writeFile(
    "output/four-pillar/preservation-result.json",
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(JSON.stringify(result));
}
void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
