# Temporary Netlify deployment

Import `hemant69-crypto/Arnold` from GitHub and choose `main`. The application is at the **repository root**, so leave the base/package directory blank. The checked-in `netlify.toml` supplies:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node | `24` |
| Next.js adapter | Automatically updated `@netlify/plugin-nextjs` |

Use the full Next.js deployment; do not select a static export or an SPA redirect. No custom start command is needed. Do not override the build command with `next build`: the wrapper bundles verified per-page CSP hashes in a second pass with the same build ID. A fresh build regenerates the ignored manifest; runtime middleware needs no file access. This retains the same strict script policy and fresh nonces on Contact/confirmation pages.

This is a temporary review site. Keep `PUBLIC_RELEASE_APPROVED=false`, `ENQUIRY_ENABLED=false` and `CMS_ENABLED=false` (already in the configuration). Leave ATS and provider credentials unset. The pages and visual experience remain reviewable; submission/application/CMS connections remain unavailable, as requested. `noindex` discourages indexing but does not protect the URL with authentication. Use Netlify access protection if a restricted preview is wanted.

After deploying, check Home, Consulting, a service page, Contact, Opportunities and an unknown route; verify menu/link navigation, images/video, mobile layout and no CSP/browser errors. Send the deployed URL back for a hosted check. The repository configuration and local adapter checks cannot verify Netlify account settings, its deployed CDN or a domain that has not yet been connected.

Local production adapter check (Node 24):

```sh
netlify build --offline
npm run start -- --port 3001
# Separate terminal:
npm run qa:browser
```

The local Netlify simulator was also attempted: its unlinked Blobs cache rerendered static HTML instead of serving the deploy-seeded output, and its response bridge mislabelled decoded bodies as gzip. Those simulator responses do not establish hosted behaviour. The generated deploy blobs preserve all 25 HTML pages and their matching CSP hashes; perform the hosted smoke check after deployment.

`.netlify/`, `.next/`, local output and real environment values stay outside Git. Final public release, business/legal/rights review, real integrations, hostname metadata and host-specific enquiry proxy trust will be configured separately.

Official references: [Next.js on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/), [build configuration](https://docs.netlify.com/build/configure-builds/file-based-configuration/).
