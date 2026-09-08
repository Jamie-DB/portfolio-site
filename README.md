# portfolio-site

Jamie Brown's portfolio site. Five pages that make one argument, framed as a pull request, and a sixth for the comics. Static, built with Claude Code and reviewed by hand.

## What it does and why I built it

This is portfolio evidence for a job hunt, not a product. It exists so a hiring manager doing ten minutes of homework can see two things: that I build continuously, and that I build with AI agents and my own judgment in the loop. The site was built with the workflow it describes, so this repo is part of the exhibit. The site is framed as a pull request, because its thesis is that generation got cheap and verification did not, and a pull request is where verification happens.

## How it was built: the workflow

The build ran in one Claude Code session on Sept 7, 2026, inside a Conductor workspace, with me reviewing at each milestone rather than approving each action. The full story with dead ends is in [BUILDLOG.md](BUILDLOG.md).

What I decided or corrected:

- The brief, the copy, and the binding rules came from my private hub and were written before this repo existed. Copy flows one direction, hub to site. The agent read the hub and was not allowed to write to it.
- I rejected the agent's first design proposal after asking it to grade its own work against the recognizable AI house styles. It gave itself a C+ and said why: a Tufte-style margin column, a default palette, and the "restrained monochrome" look that is its own template. The diff form replaced it.
- The two-voices type system, serif for anything written as judgment and mono for anything that is an artifact or data, was the agent's idea. I approved it as the most important design decision on the site.
- The palette went back and forth, and both calls were mine. I first reversed the agent's colorblind-first default so red and green would lead, because the tools use them. After seeing both palettes side by side I reversed again: the colorblind palette of blue and plum is the default on first visit, with the standard red and green one toggle away.
- I moved the display controls out of the footer into a fixed corner after the prototype buried them at the bottom of a long page.
- The CV page renders from my master document rather than from the one-page CV, at my direction. I ruled out the non-engineering roles.
- I confirmed the containment paragraph on the audit page as my actual reasoning and added a paragraph about why a tool that makes branch-per-agent the normal path is worth more than its components.
- After the first full build I said the diff was decoration, since nothing was ever removed, and asked for the site to lean all the way in. That produced the pull-request frame: the state marker, the files-changed nav with real counts, Home as the newest commit with honest removals, the CV as a commit log, and a footer of checks the build actually runs.
- I asked for changed lines to tint their text the way a diff does, in both palettes, and for the projects page to read as the documentation inside each repo, which produced the data-flow diagrams.
- After the audit I approved the author line in the header, the files-changed summary, the revised-model hunk header with its blame gutter, the CV year ruler, and the split view on Home, and declined continuous integration as a merge gate, because the checks are a review stance rather than a hard gate.

What was delegated:

- All of the code: the build script, the stylesheet, the page fragments, the sync script, the contrast checker, the screenshot tool.
- Carrying the copy across from the content pack verbatim, and a clearance pass on the CV against the binding rules, with every judgment call listed for my review.
- Self-review by screenshot at desktop and phone widths, in both themes and both palettes, and a grep of the built HTML for every term the rules forbid.

## Current shortcomings

- The CV page is a hand-carried derivative of the master document with a clearance pass, not a generated one. When the master document changes, the carry has to be redone by hand, and nothing detects drift.
- No automated tests beyond the contrast check and the sync script's leak check. The build script itself is untested.
- The screen recording slot and the meta case study slot on the "How I build software now" page are empty HTML comments.
- The audit page is meant to link to a LinkedIn article for the full adoption-curve argument. The article is not published yet, so there is no link.
- The fixed display controls overlap body text on a phone.
- The one-page CV PDF served at `/assets/Jamie_Brown_CV.pdf` was rendered against the old `pages.dev` URL. It has to be re-rendered at the hub with `jamiebrown.engineer` and republished here. Until that lands, the PDF points readers at a URL LinkedIn blocks.
- Fonts are subset to Latin only. Departure Mono is vendored and unused, kept for a future type comparison.
- The "Last built" date in the footer is the build machine's UTC date.
- One stylesheet with hand-managed specificity. Fine at this size, and it will not stay fine if the site grows.
- The three `-`/`+` pairs on Home and the state line in the header are copy written during the build rather than carried from the content pack. Every fact in them traces to the hub, but the wording has not been through the hub's clearance pass.
- The data-flow diagrams on the projects page are hand-authored from facts in the content pack and the master document. They are not generated from the repos, so a change in a repo's architecture will not update them.
- Two audit rows carry dates corrected on the site before the hub's source file was updated. The sync script re-applies those corrections, but the hub is the record and needs the backfill.
- The CV's folds need JavaScript to print open. Without it, a printed CV shows only the summary lines of folded sections.
- The split view on Home and the blame gutter on the working model are desktop-only. On narrow screens the hunk stays unified and the blame note drops onto its own line.
- The screenshot slots on the projects page and the recording slot on the working model are still empty comments.
- The comics on the programmer-art page are numbered 3 and 4 in their source files. Numbers 1 and 2 were never exported, so the set has a gap nobody but me can see.
- The page claims the comics were arrived at by iteration rather than selection, which is true, but the rounds themselves are in the session logs and have never been pulled out. Every other claim on this site has a receipt behind it and this one does not yet.

## What's next

- Re-render and republish the one-page CV PDF against `jamiebrown.engineer`.
- Draw the third comic, the one about AI-assisted programmer art drawing itself correctly on the first try.
- Record and embed the two-minute screen recording.
- Fill the meta case study slot when the job hunt's numbers are worth showing.
- Link the LinkedIn adoption-curve article when it publishes.
- Held idea: a one-page variant styled after GitKraken's neon-on-midnight diff view.

## Deploying

Live at [jamiebrown.engineer](https://jamiebrown.engineer), on Cloudflare Pages with the Git integration. The step-by-step guide, including the settings to check, is in [docs/deploy-cloudflare-pages.md](docs/deploy-cloudflare-pages.md).

The site launched on `jamiebrown.pages.dev` and moved to the custom domain on Sept 8, 2026, because LinkedIn blocks the entire `pages.dev` zone and showed readers a malicious-site warning instead of the site. The `pages.dev` URL still resolves; canonical and Open Graph tags point at the custom domain.

The move has two hand-off docs: [docs/linkedin-recovery-2026-09-08.md](docs/linkedin-recovery-2026-09-08.md) for getting the LinkedIn surfaces onto the new URL, and [docs/carry-forward-domain-move-2026-09-08.md](docs/carry-forward-domain-move-2026-09-08.md) for the hub changes it forces.

## Build and run

Requires Node 22 or newer.

```
git clone https://github.com/Jamie-DB/portfolio-site.git
cd portfolio-site
npm install
npm run build      # writes dist/
npm run serve      # serves dist/ on http://localhost:8787
```

`npm run sync` regenerates `content/ai-tooling-audit.md` from the hub's source file. It only works on a machine with the hub checked out (set `HUB_DIR` if it is not at the default path). The committed copy is what the build uses, so a fresh clone builds without it.

`node scripts/contrast.mjs` checks every color pairing in both themes and both palettes against WCAG AA. `node scripts/shot.mjs <url> <out.png> [width] [dark|light] [full|view]` screenshots a page with device emulation using a local Chrome.

Deploy: Cloudflare Pages with the Git integration. Build command `npm run build`, output directory `dist`. The Node version is pinned by `.node-version`. Pushing to `main` deploys.

## License

MIT. Fonts are under the SIL Open Font License, with license files alongside them in `src/fonts/`.
