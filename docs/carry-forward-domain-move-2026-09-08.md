# Carry-forward to the hub: the domain move, Sept 8, 2026

For a session working in `~/Dev/project_job`. The portfolio site moved off `jamiebrown.pages.dev` to `jamiebrown.engineer` on the afternoon of Sept 8, 2026, hours after launch. This lists every hub change that move forces, with file and line, so the hub session does not have to rediscover them.

Copy flows one direction, hub to site, so nothing in this file was written into the hub from the site session. That is why it is a carry-forward and not a commit.

## What happened

The site launched in the morning on `jamiebrown.pages.dev` and the launch post went out against that URL. LinkedIn refused the link and showed readers a "Malicious Website Suspected" interstitial. The site was healthy the whole time and returned 200. `pages.dev` is a shared Cloudflare subdomain with enough phishing on it to have earned a blanket block from LinkedIn's URL filter, and the filter cannot tell one tenant from another. Nothing was flagged, so there was nothing to appeal.

`jamiebrown.engineer` was registered through Cloudflare Registrar the same afternoon and attached to the Pages project. The exact-name `.dev` and `.com` were both taken. The obscure suffixes were rejected on purpose: the entire failure was a URL-reputation filter, and there was no sense trading one low-trust suffix for another.

**The block is LinkedIn's, not the world's.** `jamiebrown.pages.dev` still resolves and still serves the site, and it will keep doing so. Any link already emailed, printed, or sent outside LinkedIn still works. This is why nothing below is an emergency except the LinkedIn surfaces, which have their own runbook at `docs/linkedin-recovery-2026-09-08.md` in the site repo.

## What already changed on the site side

Committed on branch `jamiebrown-engineer-domain-swap` in `Jamie-DB/portfolio-site`:

- `scripts/build.mjs`: the `SITE_URL` fallback is now the custom domain. Production reads the real value from the Pages environment variable, so this default only covers local and preview builds.
- `docs/deploy-cloudflare-pages.md`: records the move, why it was forced, and how to repeat it for a different domain.
- `README.md`: states the live URL, and flags the published CV PDF as still carrying the old one.
- `BUILDLOG.md`: an entry for the launch-day block.

Cloudflare state as of writing: domain registered, zone live on Cloudflare's nameservers, custom domain attached to the Pages project, `SITE_URL` set for Production and Preview. DNS delegation has propagated. The TLS certificate was still issuing, which is the last automatic step.

## Hub changes this forces

Fourteen files carry the old URL. They are not equally urgent.

### Tier 1, the URL is published and readers will hit it

- `artifacts/linkedin/article-01-adoption-curve.md:30` and `:98`. The source of a LinkedIn article that is already live. The published article has to be edited on LinkedIn as well as here, and the runbook covers that half.
- `artifacts/linkedin/post-01-adoption-curve-announce.md:56`. Source of the launch post, which is live and blocked.
- `artifacts/linkedin/linkedin-rewrite.md:92, 174, 181, 183`. Line 181 is the Projects entry **name**, which reads `jamiebrown.pages.dev` as literal text, so it is a rename and not just a link swap. Line 183 is the Featured link.
- `artifacts/cv/Jamie_Brown_CV_general.md:47`, `Jamie_Brown_CV_simulation.md:48`, `Jamie_Brown_CV_unity.md:50`, plus the matching `artifacts/cv/render/cv.html:57`, `cv-simulation.html:58`, `cv-unity.html:60`. Re-render the three PDFs after editing, and republish `Jamie_Brown_CV.pdf` into the site repo at `src/assets/`.

### Tier 2, working state that will mislead the next session

- `NOW.md:5` and `:18`. Both assert the live URL. Line 18 also records issue #13 as mostly landed, which is no longer true, because the domain move re-runs its CV half.
- `artifacts/portfolio/portfolio-content.md:5, 210, 214`. Line 5 is the header assertion of the live URL, line 210 is the CV PDF path, and line 214 is the resolved-note quoting the CV's projects line, which itself contains the URL. This file is the content pack the site reads, so a stale URL here can flow back down into the site.

### Tier 3, history, safe to trail

- `docs/battle-plan.md`, `docs/conductor-playbook.md:25`, `projects/README.md:5`, `docs/site-bootstrap/README.md`, `docs/site-bootstrap/02-repo-setup.md`.

These record what was true on a date. Prefer a dated correction over a silent rewrite: `02-repo-setup.md:43` already carries the Sept 7 decision to ship on `*.pages.dev` and not hold the launch for a custom domain, plus the warning that adding one later means re-running issue #13. That warning came true within a day and the file is more useful with the outcome appended than with the history edited away.

### Not affected

- The three tailored CVs under `artifacts/cv/tailored/`. None carries the URL, and `log.md` shows all three still at `built`, none `sent`. Only `cesi-.../trace.md:50` mentions it, in a note explaining that the URL line was dropped for space on that run.

## Issue #13, second run

`docs/site-bootstrap/02-repo-setup.md` predicted this exactly: a custom domain means issue #13 runs again, because the URL propagates to the CV and to LinkedIn. This is that run. Its scope is the tier 1 list above, not the whole issue. The LinkedIn profile half of #13 that was already open for Jamie is unchanged in substance, but the URL in it has moved.

## Open question for Jamie

`NOW.md:5` lists four warm-lead emails as part of the launch. If those went out with the `pages.dev` link, the link still works, so nothing is broken. It is a judgment call whether a follow-up with the real domain is worth the second touch.

## Verification

Once the certificate issues, `curl -sI https://jamiebrown.engineer/` returns 200 and view-source on any page shows `<link rel="canonical">` on the custom domain. The site build enforces nothing about the hub, so the hub changes above are verified by grep: `grep -rn "pages\.dev" ~/Dev/project_job --include="*.md"` should return only the tier 3 historical files and the CESI trace note.
