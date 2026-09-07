# Build log

Dated milestones, drafted from the commit history and the session transcript. A story rather than a raw log, with the dead ends kept in on purpose. Drafted by the agent, edited by me for truth.

## Sep 7, 2026. Read the brief, asked before building

Five bootstrap docs came across from the hub. Before writing anything the agent asked six questions: whether the containment paragraph on the audit page was confirmed, why the repo was private when the brief said public from birth, which CV to link, how deploy would work, how "render from source" could work when the source lives in a private hub, and how many issues to file. The most consequential answer changed the shape of a page: the CV would render from the master document, not from the one-page CV, because the one-pager is a lossy render of the real record.

## Sep 7, 2026. First design proposal, graded and rejected

The agent proposed a metadata margin column, IBM Plex, and monochrome with one ultramarine accent. I asked it to compare the proposal to the "designed by Claude" house style. Its own grade was a C+: the margin column was Tufte CSS, the palette was the generic default, and the whole thing was the second house style (restrained monochrome) rather than the first (cream and terracotta). One idea survived, color reserved for evidence. A dead end, and the most useful hour of the build.

## Sep 7, 2026. The diff

The replacement direction: the site's argument is claim against check, so the layout is a diff. Hunk headers, context lines, added lines, review comments as marginalia. Two voices in the type, serif for judgment and mono for artifacts. I picked Commit Mono over Departure Mono after seeing both on the same page, and approved the five-line hunk on Home (`@@ -0,0 +1,5 @@`, which is literally true), the serif body, and an "open" marker for the one unresolved question on the audit page.

## Sep 7, 2026. Bootstrap and prototype

Repo flipped public with sign-off, since visibility is a one-way door. MIT license, a build script under 200 lines, three fonts vendored with their licenses. The centerpiece page was prototyped first because it exercises every device in the system. The first phone screenshot showed prose running off the right edge. Measured instead of guessed: the layout viewport was 485px, not 390, because headless Chrome's `--screenshot` flag has a window floor. Not a CSS bug. Switched to puppeteer-core with device emulation and the layout was fine.

## Sep 7, 2026. Controls and the colorblind palette

Two corrections from me. The dark mode toggle could not live at the bottom of a long page, so it moved to a fixed corner control. And the default palette reversed: red and green are what the tools use and the site is about the tools, so they lead, with a colorblind toggle to blue and plum. Both palettes were checked against WCAG AA in both themes, 32 pairs, all passing. The markers carry the meaning on their own, so color is never the only channel.

## Sep 7, 2026. Rendering the audit from source

The audit tables must not be retyped. `scripts/sync-sources.mjs` reads the hub's audit file, strips citations and hub issue numbers, replaces the stack name with "database-backed via MCP," and writes a cleared markdown file the build renders as diff rows: unchanged for use daily, added for just adopted, removed for evaluated and skipped. The leak check fired on its first run, on the phrase "master document" in a row describing a skill that regenerates from the master document. A false positive, and the check was narrowed to citation patterns. A check that fires on run one is a check worth having.

## Sep 7, 2026. The CV from the master document

Carried across by hand with a clearance pass, since the master document is 415 lines of internal notes and no script could make the judgment calls. Left out on the rules: student quotes, compensation and revenue figures, a co-founder's name, a never-scheduled interview deck, an unverified certification, high school. Left out on the speed rule: an estimated "85% faster" claim. Generalized on the never-name-a-school rule: a bullet that described the employer's lecture mandate. One staleness finding for the hub: the master document still names Navier-Stokes inpainting as magenta_pipeline's method, and the case study on this site says it was replaced.

## Sep 7, 2026. All five pages, and what the checks found

Home, Projects, How I build software now, AI tooling audit, CV and contact. A grep over the built HTML for every forbidden term found nothing. Screenshots found one thing: removed rows on the audit page rendered as separate blocks with gaps, because the stacked-lines rule only covered added lines. Fixed the same pass.

## Sep 7, 2026. Hand-off

README to the standard, this log, one tracking issue, a pull request. Not done yet: the Cloudflare connection and the live URL, which happen from the dashboard. Open for the hub: three third-person rows in the audit source on a first-person page, a "four rejections" count in the content pack that is five in the source, and the LinkedIn article link.
