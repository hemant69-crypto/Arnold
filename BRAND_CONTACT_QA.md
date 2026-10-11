# Supplied Arnold identity and contact update
11 October 2026

The user supplied the original logo and an Arnold business card for website use, then required enhanced clarity, original colours and no backdrop. The same logo in the supplied company profile provides a cleaner 560 × 184 source. Native SVG embeds that original JPEG unchanged and composites it through a separate alpha-only paper-removal mask. Header, footer and Contact use one transparent logo in the original navy/light-blue/grey colours, without recolouring, a background plate or an added outline/shadow. Two generated attempts changed fine details and were rejected. Header/home links keep accessible names and stable image proportions. Browser/Apple icons use the supplied bird; social artwork carries the supplied logo.

`src/content/company.ts` is the single record for **Arnold Consulting Private Limited**, Cyril Nandan Nazareth (Managing Director), **cyril.nazareth@arnoldconsultants.com**, **+91 90084 66881** and **No. 10, 1st Floor, Synerge Workspace, 14th Main, Sector 5, HSR Layout, Bangalore – 560 102, India**. Contact and every footer expose direct email/phone and a Google Maps address search. No coordinates or office hours are invented. The original business-card photograph is outside this repository/public build.

Privacy/Terms replace entity/contact-pending statements with the supplied details, retaining the existing review/provider boundaries. The Organization schema now includes legal name, logo, email, telephone and PostalAddress within the existing public-release gate. The supplied domain does not change the configured hosting/canonical origin. Website enquiry delivery, ATS, CMS, analytics and review indexing are unchanged. Direct contact links do not establish tested inbox/phone availability or enable the enquiry backend.

## Verification

Final enhanced/transparent production build: **636edba0-fb3e-4e59-964e-aef12682b442**. Verified in an isolated copy on port 3004 to preserve the concurrent email-signature work and shared build output. The normal two-pass wrapper verifies exact CSP for all 33 immutable HTML routes. Typecheck, lint and all ten backend/publication checks pass. The temporary copy uses cloned dependencies because Turbopack rejects an external node_modules symlink; application source/configuration is unchanged.

All **20** existing production browser scenarios in `navigation`, `site`, `csp` and `interaction` pass in 2.5 minutes. These cover all 33 page layouts/links/images plus the 404, desktop/mobile automated WCAG 2.2 AA, keyboard/menu focus and navigation, enlargement/reflow, no-JavaScript/reduced-motion behavior, media/graphics fallbacks, unavailable enquiry/ATS, exact CSP and fresh private-page nonces.

Five additional visual/link checks at **320, 390, 768, 1024 and 1440 pixels** verify logo separation from Opportunities/menu, no horizontal overflow, exact direct-link targets, supplied address, legal text and no-JavaScript access. Desktop/mobile header, footer and Contact captures were inspected; the corrected Contact block is open in Codex. Captures and JSON remain ignored under `output/playwright/brand-contact/enhanced-local/` in the working package.

The public/client/static HTML/private-trace scan inspects **124 files** with no findings; all five private-path HTTP probes return 404. The single logo SVG is **20,660 bytes**, browser icon 20,696 bytes and Apple icon 13,387 bytes. The embedded extracted JPEG matches its source byte for byte; background alpha is zero. The original RGB artwork is composited through a separate alpha mask, with no RGB remapping. Opaque-ink comparison confirms normal JPEG-decoder rounding only (mean difference 0.60/255, maximum 4/255). Exports are inspected on light/dark surfaces. No dependency, tracking embed or new client interaction is introduced.

Homepage mobile Lighthouse runs: **95 / 96 / 96**, median **96**, LCP **2.77s**, CLS **0**, TBT **4.5ms**. Accessibility and best practices are **100**. These are local laboratory results; SEO 66 reflects intentional review-site noindex. Performance output remains ignored in `output/performance-home.json` and `output/lighthouse/`.

## Deployment and maintenance

The established target is Arnold's GitHub repository `hemant69-crypto/Arnold`, main, and Netlify project **armold**, https://armold.netlify.app/. Only the scoped application delta and this handoff are uploaded; private supplied photographs, rejected candidates, outputs and the concurrent signature generator are excluded. Source/deploy identifiers and post-publication hosted results are recorded in the parent project package's `docs/BRAND_CONTACT_RECORD.md` and `docs/activity/2026-10-11_brand-contact-refresh.md`.

Edit contact data in `src/content/company.ts`, not duplicated display strings. Installed logo SVGs contain the unchanged supplied raster. Native source/provenance/export instructions are in the parent package's `assets/brand/`. Rebuild with `npm run build` after changes so the immutable CSP stays synchronized; use `npm run start -- --port 3001` for verification.
