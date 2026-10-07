# Arnold Consulting — Phase 1 website

Complete local implementation: 25 routes and a real 404, six services, three original perspectives, pointer-responsive opening, Hindi hero lens, animated top navigation and selected cinematic sections. Hindi is limited to the homepage hero and its headline preview; all other content stays English. Content is a reviewable draft, not approval of company claims. Public release and account-dependent integrations remain gated.

The content enhancement adds 69 chapters across 23 inner routes, practical service FAQs, contextual reading links, verified company LinkedIn placements and a compact “Trusted by clients” homepage strip. The finished Consulting page is preserved. ATS remains pending. See [the content enhancement handoff](../docs/CONTENT_ENHANCEMENT_QA.md) for the latest combined verification and source/rights records.

## Run locally

Use Node 24 LTS. On this machine the bundled runtime is available at:

```sh
export PATH="/Users/hemant/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
cd /Users/hemant/Documents/Arnold/website
npm ci
npm run build
npm run start -- --port 3001
```

Open http://127.0.0.1:3001. Development: `npm run dev -- --port 3000`. Both bind to this computer only. Stop a foreground preview with Control-C. No environment file is needed for the default preview. Copy `.env.example` to `.env.local` only when configuring verified integrations; never commit real values.

Always use **npm run build**, not a direct framework build. The wrapper uses two build passes with one build ID: it measures the immutable HTML scripts, then bundles their exact hashes into the proxy, and refuses output if the final scripts differ. The generated `security/csp-hashes.json` stays ignored; it is imported at compile time, with no filesystem access at request time. Clean checkouts prepare a placeholder before dev, tests and typechecking. Dynamic Contact and confirmation pages retain unique Web Crypto nonces and private, uncached responses. Production browser checks use `npm run start`; `netlify build --offline` additionally verifies provider packaging. Development intentionally permits its framework tooling.

## Temporary Netlify deployment

See [Netlify setup](NETLIFY.md). The repository root is this application. `netlify.toml` sets `npm run build`, `.next`, Node 24 and the automatically updated Next.js adapter. Temporary deployment retains noindex and disabled enquiry/CMS defaults; ATS remains unavailable until its link is supplied. Netlify is the user-selected temporary host. Local adapter/browser validation is recorded separately from an actual hosted deployment.

## Edit the experience

- `src/content/services.ts`: six distinct service narratives, FAQs, responsibility tables and related services.
- `src/content/pages.ts`: GCC, expertise, Employers, Approach and About; registers the Consulting page.
- `src/content/consulting.ts`: the complete Consulting narrative, stable section IDs and six advisory/service mappings.
- `src/components/Consulting.tsx`, `ConsultingMotion.tsx`, `src/app/consulting.css`: Consulting composition and responsive reading layouts; deferred effects are in `src/lib/motion/consulting-scenes.ts`.
- `src/content/articles.ts`: three original perspective drafts; local new articles also need their route added to `src/content/routes.ts`.
- `src/content/legal.ts`: truthful preview policies; replace with reviewed entity/provider/retention/contact details before live collection.
- `src/content/enhancements/`: 69 additional chapters, stable insertion anchors, practical FAQs, contextual resources and presentation choices. The original service/editorial/article/legal collections retain their base sections and compose these additions through the existing content shapes. Reading time follows actual article content.
- `src/components/ContentChapter.tsx`, `src/app/content-enhancement.css`: original examples, mobile comparison rows, real sequences, compact utility composition and server-rendered contextual links.
- `src/content/company.ts`, `src/components/SocialLink.tsx`: one verified company LinkedIn destination and accessible external links; no social feed or tracking pixel.
- `src/components/ClientStrip.tsx`, `ClientStripMotion.tsx`, `src/content/client-logos.ts`: compact homepage proof strip, ten source-derived marks and lightweight preference-aware motion. Source/rights records are in `../assets/client-logos/`; no mark was generated. A public-release build omits this evidence until `CLIENT_LOGOS_PUBLIC_APPROVED=true` is configured after the current relationship/rights review. Local review needs no configuration.
- `src/components/Home.tsx`, `Header.tsx`, `Footer.tsx`: homepage sequence, capability families and navigation.
- `src/components/SignatureExperience.tsx`, `HeroHeadline.tsx`, `SectionVideo.tsx`: small interaction shells, hero-only Hindi and visibility-controlled video.
- `src/lib/graphics/`, `src/lib/motion/`: original GLSL/OGL field, pointer/lens lifecycle, scoped GSAP menu/scenes.
- `src/app/globals.css`, `src/app/motion.css`: shared typography/layout and signature scene/menu/video styling.
- `public/media/CREDITS.txt`: deployed asset provenance. Media is illustrative; never label stock subjects as Arnold staff or clients.

Self-hosted Manrope and the 12KB Noto Sans Devanagari headline subset retain their OFL notices. Public photos use responsive AVIF/WebP optimisation; small portrait WebP posters keep mobile delivery light. The lower-homepage video is 9.4 seconds/717,820 bytes; selected inner-page loops are 8.4 seconds/440–716KB. All are muted and have a 0.6-second loop crossfade; masters remain outside the application. Mobile/reduced-motion/save-data visitors receive a still with manual play. Section videos start only in view and pause behind the menu/offscreen/hidden; explicit pause intent survives navigation.

Original WebGL graphics use a bounded render surface and unsigned-byte feedback, a matching still, visit pause controls and offscreen/hidden/menu suspension. Small/coarse screens, reduced motion, save-data and graphics failure use the still. The heading stays correctly shaped HTML with an aligned decorative Hindi mask and a clearly labelled keyboard/touch preview. Essential content stays HTML; scrolling is native. See `../docs/MOTION_QA_REPORT.md` for validation and the pinned OGL compatibility note.

The client strip uses a slow CSS transform, an assistive-technology-hidden duplicate and a persistent local pause. Hover/focus, global motion pause, menu state and page/section visibility suspend it. CSS paints the reduced-motion layout before hydration; the no-JavaScript fallback shows a static grid. Save-data uses a stationary, keyboard-scrollable single row. Keep its initial layout stable: a pre-hydration wrapped grid changing to one row displaced native homepage anchors in regression testing. All new explanation remains server-rendered and readable without animation.

## CMS and publication

`cms/schemas.ts` contains importable Sanity definitions; this application does not include or expose an unsecured editing Studio. `src/lib/content.ts` defaults to typed local content. A real private dataset, separately secured Studio, account roles and controlled publisher must be configured and tested before `CMS_ENABLED=true` and `CMS_ACCESS_REVIEWED=true`.

Consulting uses the existing editorial schema with 31 required composition IDs. Keep those IDs stable when changing its paragraphs, bullets and tables; a missing or duplicate ID rejects the signed projection before rendering. The current page does not introduce unverified evidence or new delivery-service names.

Only signed, published, unexpired public projections can reach the CMS-backed renderer. An editor changing a status field cannot sign new content. Draft/version IDs, unsupported routes, arbitrary HTML and private evidence fields are excluded. Fetch queries request explicit public fields. Stable service/page slugs preserve routing; new valid insight slugs are supported without a new page template. Service and insight indexes, service navigation/related links, metadata and sitemap are rebuilt from current approved content.

A controlled publisher can prepare reviewed records locally:

```sh
node --import tsx scripts/sign-publication.ts /private/path/reviewed.json /private/path/signed.ndjson
```

Set `CMS_CONTENT_SIGNING_SECRET` securely in that publisher's environment; do not put it into shell history. Input records require `publicationStatus: "approved"`, approval time and the public content schema. The script removes private fields, normalises table rows, signs the public projection and writes a private-permission import file. It does **not** upload or publish anything. Review/import through the separately authorised publisher account. Editors must not have access to the signing secret.

Webhook endpoint `/api/cms/webhook` verifies the official raw-body signature and a five-minute freshness window, excludes draft events, deduplicates and requests a build of current state. The configured deployment hook is server-controlled. HTTP 202 means a rebuild was requested; it does not mean publication completed. No public arbitrary-path revalidation or draft-preview activation endpoint exists.

**Immutable publication contract:** every edit, new article, withdrawal, deletion or expiry needs a successful full build/deploy, including new CSP hashes. Before an expiry, the publisher must schedule a reviewed rebuild and verify removal. Monitor build failures; if a withdrawn claim remains in the previous deployment, take that page/site out of public service until removal succeeds. A webhook failure needs reconciliation, not an assumed success. Before activation test real edit/new-article/withdrawal/expiry, menus/related modules/sitemap and duplicate/out-of-order events. Verify the private dataset rejects anonymous access and test CMS export/restore separately. Local code tests do not establish those provider controls.

## Enquiries, ATS and measurement

Default enquiries return unavailable (503), the preview submit button is disabled, and direct confirmation visits are neutral. No fake inbox success, CV uploads, candidate accounts or custom ATS are present.

Activation requires approved sender/recipient, follow-up owner, privacy/retention policy, Resend and durable Upstash configuration, exact HTTPS `APP_ORIGIN`, a strong receipt secret and live verification. The handler validates allowlisted fields/body size/origin, uses a honeypot and durable idempotency/rate limits, fails closed on limiter failure, handles unknown acceptance honestly and sets a short-lived signed HttpOnly confirmation cookie only after provider acceptance. Acceptance does not prove inbox delivery or a human response. Retry the same form/request ID after a timeout; do not generate a new ID to bypass an unknown outcome.

IP-based limiting trusts Vercel's forwarding header only on Vercel. Another host needs an independently reviewed trusted proxy configuration; otherwise the shared fail-bounded bucket applies. Provider recipients, keys and endpoint choices remain server-side. Do not log form bodies. Agree deletion periods for provider records and limiter metadata before enabling collection.

Set `ATS_URL` only to the verified HTTPS hosted portal. This release uses a hosted link, with applications kept by the ATS. An iframe needs a separate origin/privacy/accessibility review when the actual embed arrives. An absent portal remains explicitly unavailable. Analytics hooks are disabled by default, require enabled/consent choices and allowlisted event/service context, and send no form values. No analytics provider is installed or claimed live.

## Verify and release

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run start -- --port 3001
# Separate terminal, with the same Node runtime:
npm run qa:browser
node scripts/performance.mjs
npm audit
```

Browser checks use installed Google Chrome. Install a supported Playwright browser through the official package if Chrome is unavailable; recordings also require the official `npx playwright install ffmpeg` helper. Local captures/reports live in ignored `output/`; [content enhancement QA](../docs/CONTENT_ENHANCEMENT_QA.md) is the latest combined handoff for the 44-scenario suite. It follows [Consulting QA](../docs/CONSULTING_PAGE_BUILD_QA.md), [GCC QA](../docs/HOME_GCC_SECTION_QA.md), [navigation QA](../docs/NAVIGATION_QA_REPORT.md), [signature-motion QA](../docs/MOTION_QA_REPORT.md) and the original baseline. `scripts/performance.mjs` measures seven routes three times each. Set `QA_PERFORMANCE_ROUTE=consulting` for the three-pass Consulting measurement without overwriting the previous full-site summary. Performance is laboratory evidence, not field Core Web Vitals or proof of real inbox/CMS behaviour.

For navigation changes, retain HTML's `data-scroll-behavior="smooth"` and use `src/components/SiteLink.tsx` for ordinary links. The wrapper handles explicit selection of the current page; Next manages cross-page positions and anchors. Avoid a global route-render scroll reset, which would override history and hash intent. Keep the menu's fixed `.menu-dialog` wrapper around both its native `.menu` disclosure and panel. Its strong open-state CSS selector should only override animation, so responsive grid rules continue to apply. `tests/browser/navigation.spec.ts` covers actual links, scroll stability, history/anchors, all-page layout and short-screen menu focus/reopening.

Keep `.signature-zone` paint clipped at its boundary so the sticky negative-margin artwork cannot cover the following GCC content. Use `overflow: clip` to preserve native sticky scrolling, and keep the photograph's parallax inside `.gcc-image`. `tests/browser/gcc-feature.spec.ts` checks the actual painted surface as well as responsive content, accessibility, service destinations, the section anchor and no-JavaScript reading.

Before public launch: approve content/HR Solutions/Training scope, current company/legal details and rights; supply and verify account access, domain/DNS, enquiry owner, ATS, CMS and any analytics; enable MFA/least privilege and protected previews; agree monitoring, patching, costs and recovery ownership. `noindex` is indexing control, **not authentication**. Hosting preview access protection requires the real host account.

Only after these gates pass, set the verified root HTTPS `PRODUCTION_ORIGIN` and `PUBLIC_RELEASE_APPROVED=true`, rebuild, and verify live canonical/OG/schema/sitemap, HTTPS/HSTS, actual CSP/function bundling, errors/delivery and mobile performance. Never copy the legacy hacked site or redirect spam URLs indiscriminately to the homepage. Preserve needed incident evidence and review domain/hosting/source/CMS access before migration. The original compromise mechanism has not been established.

## Back up and recover

Commit source, lockfile and licensed delivery assets together. The local checkpoint can be archived with `git archive HEAD --output=output/code-backup.tar` or bundled with `git bundle create output/code-backup.bundle --all`. Store a separate copy under the owner's chosen protected backup process; ignored environment files and CMS data are intentionally absent.

Restore the selected source snapshot, install from its lockfile and run `npm run build` to regenerate matching HTML/CSP. Run the relevant checks, then release only with authorisation. On a real hosting incident, restrict access/disable enquiry delivery as needed, revoke affected credentials through the account owner, preserve evidence, investigate and redeploy a verified build. Restore CMS data through its separate reviewed export process. A local file-restore demonstration is not a tested hosting rollback or account recovery.
