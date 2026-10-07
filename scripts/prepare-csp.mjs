import { existsSync, mkdirSync, writeFileSync } from "node:fs";

// Clean checkouts need this generated module before dev, tests or typechecking.
// The production wrapper always replaces it and verifies the final HTML.
if (!existsSync("security/csp-hashes.json")) {
  mkdirSync("security", { recursive: true });
  writeFileSync(
    "security/csp-hashes.json",
    JSON.stringify({ buildId: "development", routes: {} }) + "\n",
  );
}
