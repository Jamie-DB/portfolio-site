# portfolio-site

Jamie Brown's portfolio site. Five pages that make one argument. Static, built with Claude Code and reviewed by hand.

## What it does and why I built it

This is portfolio evidence for a job hunt, not a product. It exists so a hiring manager doing ten minutes of homework can see two things: that I build continuously, and that I build with AI agents and my own judgment in the loop. The site was built with the workflow it describes, so this repo is part of the exhibit. The design is built around a diff, because the site's thesis is that generation got cheap and verification did not.

## How it was built: the workflow

The build ran in one Claude Code session on Sep 7, 2026, inside a Conductor workspace, with me reviewing at each milestone rather than approving each action. The full story with dead ends is in [BUILDLOG.md](BUILDLOG.md).

What I decided or corrected:

- The brief, the copy, and the binding rules came from my private hub and were written before this repo existed. Copy flows one direction, hub to site. The agent read the hub and was not allowed to write to it.
- I rejected the agent's first design proposal after asking it to grade its own work against the recognizable AI house styles. It gave itself a C+ and said why: a Tufte-style margin column, a default palette, and the "restrained monochrome" look that is its own template. The diff form replaced it.
- The two-voices type system, serif for anything written as judgment and mono for anything that is an artifact or data, was the agent's idea. I approved it as the most important design decision on the site.
- Red and green as the default diff colors, with a toggle to a colorblind palette, was my call and reversed the agent's colorblind-first default. The tools use red and green, and the site is about the tools.
- I moved the display controls out of the footer into a fixed corner after the prototype buried them at the bottom of a long page.
- The CV page renders from my master document rather than from the one-page CV, at my direction. I ruled out the non-engineering roles.
- I confirmed the containment paragraph on the audit page as my actual reasoning and added a paragraph about why a tool that makes branch-per-agent the normal path is worth more than its components.

What was delegated:

- All of the code: the build script, the stylesheet, the page fragments, the sync script, the contrast checker, the screenshot tool.
- Carrying the copy across from the content pack verbatim, and a clearance pass on the CV against the binding rules, with every judgment call listed for my review.
- Self-review by screenshot at desktop and phone widths, in both themes and both palettes, and a grep of the built HTML for every term the rules forbid.

## Current shortcomings

- The audit tables are written in the third person in the hub's source file and the page around them is first person. Three rows show it. The fix belongs in the hub, not here.
- The CV page is a hand-carried derivative of the master document with a clearance pass, not a generated one. When the master document changes, the carry has to be redone by hand, and nothing detects drift.
- No automated tests beyond the contrast check and the sync script's leak check. The build script itself is untested.
- The screen recording slot and the meta case study slot on the "How I build software now" page are empty HTML comments.
- The audit page is meant to link to a LinkedIn article for the full adoption-curve argument. The article is not published yet, so there is no link.
- The fixed display controls overlap body text on a phone.
- The one-page CV PDF still carries the line "case studies available on request." Re-rendering it with this site's URL happens after the URL exists.
- Fonts are subset to Latin only. Departure Mono is vendored and unused, kept for a future type comparison.
- The "Last built" date in the footer is the build machine's UTC date.
- One stylesheet with hand-managed specificity. Fine at this size, and it will not stay fine if the site grows.

## What's next

- Connect the repo to Cloudflare Pages and report the URL back.
- Record and embed the two-minute screen recording.
- Fill the meta case study slot when the job hunt's numbers are worth showing.
- Link the LinkedIn adoption-curve article when it publishes.
- Held idea: a one-page variant styled after GitKraken's neon-on-midnight diff view.

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
