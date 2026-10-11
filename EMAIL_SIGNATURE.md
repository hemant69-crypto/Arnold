# Arnold employee email signature generator

Direct route: `/email-signature`. The route is deliberately absent from the public content registry, header/menu, footer and sitemap. Route metadata always requests `noindex, nofollow`, including when the main website is approved for indexing. This is an unlisted utility, not an authenticated intranet.

Employees enter their name, designation and work email; phone and personal LinkedIn are optional. The company logo/name/current office address and website are fixed. Choose **Classic** (stacked logo and divider), **Executive** (logo beside name/role), or **Studio** (navy name panel and framed contact details). Fields persist while switching designs. Copy exports the selected signature as HTML plus plain text; Download exports it as a script-free `.html` document. Instructions on the page explain Gmail installation. The generator does not modify Gmail or centrally update installed signatures.

Employee entries stay in React state in the browser tab. No submission endpoint, database, persistence, tracking event, sign-in or employee directory is added. Fields/copy/download are disabled until JavaScript hydrates, so the form cannot accidentally submit employee details as URL parameters without scripts. HTML escapes employee values; the optional profile accepts only HTTPS personal LinkedIn URLs and strips query/fragment tracking. Required fields, input lengths and phone syntax are validated before export.

Company facts come from `src/content/company.ts`. The website link is the user-supplied `https://www.arnoldconsultants.com`. `public/media/email-signature/arnold-logo.png` uses the clearer original logo from the supplied company profile, in its original colours with transparent paper removal and no added backdrop. It is the native website logo export resized proportionally to a 364 × 128 transparent canvas, with no AI redrawing or tracking pixel. The PNG is used because email-client support for SVG is inconsistent. The private original and derivation record stay outside this public repository.

The page previews the logo locally. Clipboard, manual-copy and download output use an absolute HTTPS logo URL: configured `PRODUCTION_ORIGIN`, or the existing `https://armold.netlify.app` review host. Keep that stable public asset available for recipients. When moving Arnold to a different canonical domain, set its root `PRODUCTION_ORIGIN`, rebuild/deploy, then ask employees to regenerate/reinstall. Do not distribute signatures generated before the asset is deployed. Hosted signatures and HTML downloads require internet access for the logo.

The primary clipboard API writes both `text/html` and `text/plain`. A copy-event fallback handles unsupported/blocked clipboard APIs; if the browser refuses that too, a visible Select signature button provides native manual copying. Downloading an HTML file does not install it in Gmail. No live email was sent or account settings changed during implementation.

## Source and focused validation

- `src/app/email-signature/page.tsx` and `signature.css`: unlisted route, metadata, scoped tool styles.
- `src/components/EmailSignatureGenerator.tsx`: employee form, three accessible radio choices, preview and export/install flow.
- `src/lib/email-signature.ts`: validation, safe URLs, three table/inline-style templates and HTML download.
- `tests/email-signature.test.ts`: real input/URL security and export boundaries.
- `tests/browser/email-signature.spec.ts`: clipboard transport and rich-editor paste, manual fallback, style/download match, no persistence/network submission, responsive WCAG, keyboard and no-script behavior.

Run `npm test`, the required two-pass `npm run build`, then start production. Use `QA_ORIGIN=http://127.0.0.1:<port> npx playwright test tests/browser/email-signature.spec.ts`. Optional focused mobile lab check: `QA_ORIGIN=http://127.0.0.1:<port> node scripts/email-signature-performance.mjs`. Browser clipboard/paste checks do not prove a sent Gmail message's appearance; test one real received message before employee rollout. Forwarded messages, recipient image blocking and dark mode can alter appearance.

Canonical implementation/QA/deployment status is recorded privately in `../docs/EMAIL_SIGNATURE_GENERATOR.md`.
