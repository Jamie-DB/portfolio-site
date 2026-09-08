# Carry-forward for the next session, Sept 8, 2026

Where the portfolio site stands, what was decided, what is still open, and the traps a fresh session will fall into if nobody says them out loud. Written at the end of the build session so the next chat can start cold.

## Where things stand

- Repo: `Jamie-DB/portfolio-site`, public. Branch `ingest-bootstrap-docs`, pushed. PR #2 is open against `main` and has never been merged. Issue #1 is the single tracking issue, with build evidence in a comment.
- Not deployed. Cloudflare Pages has not been connected. The step-by-step is in `docs/deploy-cloudflare-pages.md`. After the first deploy, set `SITE_URL` in the Pages project to the real URL, since `scripts/build.mjs` uses a placeholder for canonical and Open Graph URLs.
- The build passes its own checks: contrast 48 of 48, forbidden terms 0. It fails on purpose if a check fails, so a rule violation cannot deploy.
- Local preview: `npm run build`, then `PORT=8787 node scripts/serve.mjs`. Never pipe the build into `head`. That killed it mid-write twice before a guard went in.
- Screenshots for review: `node scripts/shot.mjs <url> <out.png> [width] [dark|light] [full|view]`. `PRESET="view=split,palette=standard"` seeds localStorage before load.

## What shipped on Sept 7 and 8

The pull-request frame, the diff form with honest removals, two voices in the type, three palettes' worth of reversals ending with colorblind as the default, tinted text on changed lines, the CV as a commit log with folds and a year ruler, projects as documentation with data-flow diagrams, a receipts hue, role labels, first-person voice enforced by the build, inline revisions on the working model with a blame gutter, an author line and files-changed summary in the header, and a split view on Home. `BUILDLOG.md` has the story in ten entries and `README.md` has the workflow, shortcomings, and what's next.

## Decisions Jamie made that a new session must not relitigate

- The site is a pull request. The state marker reads Open. No Merged ceremony until it happens.
- Colorblind palette (blue and plum) is the default. Standard red and green is a toggle.
- First person everywhere on the site. The scan enforces it.
- "Sept," never "Sep." The scan enforces it on pages. The build log follows it by hand.
- No phone number on the site. Email, LinkedIn, GitHub only.
- Nav order: Home, How I build software now, AI tooling audit, CV and contact, Projects.
- No CI gate. The checks are a review stance, not a hard gate.
- The Home `-`/`+` lines and the header line are site-authored copy, approved by Jamie, and flagged for hub backfill.
- The GitKraken neon-on-midnight one-page variant is a held idea, not a task.

## Open items, approved, waiting on Jamie

- One screenshot per public project and the two-minute recording. Slots are marked as HTML comments in `src/pages/projects.html` and `src/pages/how-i-build.html`, with the markup and the `.artifact` style already in place. Drop the images into `src/assets/` and uncomment.

## Open items, not yet decided

Easy wins from the audit that were not answered either way:

- Trim the Home `+` availability line to the availability sentence and let the CV head carry the "open across languages and domains" clause.
- Drop the "wrote every line by hand" pair and the `~` line from Home, since the approve-to-review pair already carries the arc.
- Un-color the CV head commit title, which reads as a link in the blue palette.
- On phones, move the controls into the header and hide the nav counts.
- Generate `robots.txt` and a sitemap in the build, and add an Open Graph image, for search and link previews.
- Preload the two primary font files.
- A handful of `node:test` cases for `diffstat`, `commits`, `scan`, and the fold counter.

Shortcomings as open threads on Projects. Jamie's direction: do not flag them in a way that pulls the reader's attention, but consider tying each shortcoming to the issue that tracks it, opening one where none exists, so the site links to a real thread. Proposal: keep the self-review note exactly as it is and add one quiet mono suffix in the attribution line, "tracked in #N," linking to the issue. Candidates today: yt_transcript_mcp has open issues, including #16 (auto-generated versus manual transcript preference) and #38 (CI for the offline suites), but none for hosting it online, so that would be a new issue. chordsheet has #42 (ChordPro import and export) and nothing for the mobile layout or undo, so those would be new. history-heatmap has no open issues, so "audit the dataset's sources" would be a new one. Opening issues in other repos is an outward action and needs Jamie's go.

## Hub backfill

Facts and copy that entered at the site and need to flow back to the hub's master document and content pack:

- The containment paragraph and its follow-on ("None of that is new technology... hit a tipping point") on the audit page.
- The narrowed adoption verdict in the audit opener, including "especially if you were disciplined about working in small hunks."
- The working model revisions: "in my head" struck, architecture calls moving, the hats line, the revised standard.
- Home's `-`/`+` pairs and the header line "Senior software engineer, Orlando. Remote or hybrid preferred."
- The audit row dates: Cursor rejected in the summer and fall of 2025 (hooks shipped mid-2025, so "fall" is date-safe and "summer" is borderline), animation evaluations in spring 2026. The line "Finished rig work did not buy the approach a stay" is cut on the site.
- The end date of the last role: Sept 2026, last day Sept 1.
- The contact block no longer carries the phone number on the public site.
- The heat map paragraph in Jamie's own words, and the revised shortcoming note ("The engineering I will defend, somewhat...").
- The content pack's "four rejections" framing note counts five rows in the source.
- The CV PDF predates several corrections (team lead wording, local-model claim, end date) and needs a re-render after the site URL exists.

## Traps

- Two sessions edited this worktree on Sept 7. Check `git status` before assuming the tree is yours, and commit only what you mean to.
- `content/ai-tooling-audit.md` is generated. Edit the hub or the corrections list in `scripts/sync-sources.mjs`, then `npm run sync`. `content/cv.md` is hand-carried and edited directly.
- The forbidden-terms scan will fail the build on: the stack name, the retired GitHub handle, a private individual's name, money figures, "presented to," em dashes, GPA, the old repo name, third-person pronouns, "Jamie" in prose, "Sep," and the local-model terms. Read `FORBIDDEN` in `scripts/build.mjs` before writing copy.
- The split view is built and works, but Jamie held it on Sept 8: the toggle is commented out in `src/pages/index.html`. Restore the `.view-toggle` span to enable it. It is generated at layout time from the unified lines, so edit the unified lines only.
- The ruler's bars come from the `<time data-short="...">` tags in `content/cv.md`. A new role needs both the dates and a short label.
- The CV folds print open only with JavaScript.
