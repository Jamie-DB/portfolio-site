# Build log

Dated milestones, drafted from the commit history and the session transcript. A story rather than a raw log, with the dead ends kept in on purpose. Drafted by the agent, edited by me for truth.

## Sept 7, 2026. Read the brief, asked before building

Five bootstrap docs came across from the hub. Before writing anything the agent asked six questions: whether the containment paragraph on the audit page was confirmed, why the repo was private when the brief said public from birth, which CV to link, how deploy would work, how "render from source" could work when the source lives in a private hub, and how many issues to file. The most consequential answer changed the shape of a page: the CV would render from the master document, not from the one-page CV, because the one-pager is a lossy render of the real record.

## Sept 7, 2026. First design proposal, graded and rejected

The agent proposed a metadata margin column, IBM Plex, and monochrome with one ultramarine accent. I asked it to compare the proposal to the "designed by Claude" house style. Its own grade was a C+: the margin column was Tufte CSS, the palette was the generic default, and the whole thing was the second house style (restrained monochrome) rather than the first (cream and terracotta). One idea survived, color reserved for evidence. A dead end, and the most useful hour of the build.

## Sept 7, 2026. The diff

The replacement direction: the site's argument is claim against check, so the layout is a diff. Hunk headers, context lines, added lines, review comments as marginalia. Two voices in the type, serif for judgment and mono for artifacts. I picked Commit Mono over Departure Mono after seeing both on the same page, and approved the five-line hunk on Home (`@@ -0,0 +1,5 @@`, which is literally true), the serif body, and an "open" marker for the one unresolved question on the audit page.

## Sept 7, 2026. Bootstrap and prototype

Repo flipped public with sign-off, since visibility is a one-way door. MIT license, a build script under 200 lines, three fonts vendored with their licenses. The centerpiece page was prototyped first because it exercises every device in the system. The first phone screenshot showed prose running off the right edge. Measured instead of guessed: the layout viewport was 485px, not 390, because headless Chrome's `--screenshot` flag has a window floor. Not a CSS bug. Switched to puppeteer-core with device emulation and the layout was fine.

## Sept 7, 2026. Controls and the colorblind palette

Two corrections from me. The dark mode toggle could not live at the bottom of a long page, so it moved to a fixed corner control. And the default palette reversed: red and green are what the tools use and the site is about the tools, so they lead, with a colorblind toggle to blue and plum. Both palettes were checked against WCAG AA in both themes, 32 pairs, all passing. The markers carry the meaning on their own, so color is never the only channel.

## Sept 7, 2026. Rendering the audit from source

The audit tables must not be retyped. `scripts/sync-sources.mjs` reads the hub's audit file, strips citations and hub issue numbers, replaces the stack name with "database-backed via MCP," and writes a cleared markdown file the build renders as diff rows: unchanged for use daily, added for just adopted, removed for evaluated and skipped. The leak check fired on its first run, on the phrase "master document" in a row describing a skill that regenerates from the master document. A false positive, and the check was narrowed to citation patterns. A check that fires on run one is a check worth having.

## Sept 7, 2026. The CV from the master document

Carried across by hand with a clearance pass, since the master document is 415 lines of internal notes and no script could make the judgment calls. Left out on the rules: student quotes, compensation and revenue figures, a co-founder's name, a never-scheduled interview deck, an unverified certification, high school. Left out on the speed rule: an estimated "85% faster" claim. Generalized on the never-name-a-school rule: a bullet that described the employer's lecture mandate. One staleness finding for the hub: the master document still names Navier-Stokes inpainting as magenta_pipeline's method, and the case study on this site says it was replaced.

## Sept 7, 2026. All five pages, and what the checks found

Home, Projects, How I build software now, AI tooling audit, CV and contact. A grep over the built HTML for every forbidden term found nothing. Screenshots found one thing: removed rows on the audit page rendered as separate blocks with gaps, because the stacked-lines rule only covered added lines. Fixed the same pass.

## Sept 7, 2026. "Let's really really lean into it"

I looked at the first full build and said it was using the diff as decoration: nothing on the site was ever removed. The reversal that followed is the biggest of the day. The site is now framed as a pull request. The masthead is the PR header with a state marker reading Open, which is both the PR state and the job status, and the nav is the files-changed list with each page's real added and removed counts computed at build time. Home became the newest commit, with three honest removals: the role that ended, the per-action approval that review replaced, and the three repos that went from private to public. The CV became a commit log on a rail, dates in a wider gutter. Each project became a file with a diff-style header and its shortcoming pulled out as a review note. Case studies carry a resolved marker, the audit caveat keeps its open one. And the footer became Checks: the build now runs the contrast check and the forbidden-terms scan itself, prints the results on every page, and refuses to write anything if either fails.

Two things the screenshots caught on the way. The new state marker's class collided with the "open" thread marker, which drew a grey blob over my name. And a `| head -2` on the build command killed the build mid-write with a broken pipe, so for a few minutes the preview server was serving half a site. Both fixed, the second by not doing that, and then, after doing it a second time on the very next rebuild, by making the build ignore a closed stdout so it cannot happen a third.

## Sept 7, 2026. Tinted text, and projects as documentation

Two more corrections from me after looking at the pull-request build. First, a diff tints the text, not only the background, and white text on red and green broke the illusion. Changed lines now take a darker shade of their hue on paper and a lighter one on black, in both palettes, with the contrast checker extended to cover the new pairs. Strikethrough held for a later round. Second, the projects page should look like the documentation you would find inside each repo. Each project now carries a data-flow diagram built from the same facts as the copy, a verification line where there is one to state, and its shortcoming as a review note. The diagrams are mono boxes and arrow glyphs, so they print, work in both themes, and stack on a phone.

## Sept 7, 2026. The review round

A long list of corrections after reading the whole site, most of them copy, three of them structural. The colorblind palette became the default, with the standard red and green a toggle away, on the argument that the site should be legible to everyone on first visit and the tools' colors are a preference. The nav reordered so the working model comes right after Home and Projects closes the set. The CV was cut hard: personal projects moved to the top and labeled as such, the last teaching role squashed to three bullets that carry the strongest numbers, and everything else went behind editor-style folds that print open. Skills became tags grouped by tier instead of paragraphs. The working model on How I build now carries inline removals and additions, since the model itself has moved since it was written and a diff is the honest way to show that. The phone number came off the CV page. Two audit rows got corrected dates, applied through the sync script so a re-sync cannot undo them, and flagged for backfill in the hub.

## Sept 7, 2026. Hand-off

README to the standard, this log, one tracking issue, a pull request updated after the pull-request reframe. Not done yet: the Cloudflare connection and the live URL, which happen from the dashboard. Open for the hub: three third-person rows in the audit source on a first-person page, a "four rejections" count in the content pack that is five in the source, and the LinkedIn article link.

## Sept 7, 2026. Three colors, and the wall of serif

Reading the built pages, the prose was flat and uniform: every case study opened the same way, ran three identical paragraphs, and ended in the one green block. The best facts on the site, 27 issues and 17 review findings and 248 tests, were buried mid-sentence in body serif. Color appeared only on lines that were added or removed, which meant most of the page had none.

Three devices, all inside the existing system rather than beside it. A receipt hue for figures: dates, counts, repo trails, and the attribution on a quoted note. It is always mono and never inside a tinted block, so a receipt cannot be misread as a diff line, and it swaps with the palette so it stays separable from added and removed either way. Blue against red and green, ochre against blue and plum. Role labels in the machine voice, `// situation`, `// what I said`, `// result`, which replace the bold run-ins that made every block open identically and give the page a scan rail. And one bolded key clause a paragraph at most, so a reader skimming still lands on the sentence carrying the argument.

Applied to the three pages that needed it. Each case study now leads with its receipts as a diffstat under the hunk header. Each project carries the same strip and a labelled verification line. Home's catalog paragraph became a receipt list with the figures lit. The contrast checker grew to 44 pairs, covering the receipt hue on paper and the role label on both tinted backgrounds in both themes and both palettes.

One fix on the way: the data-flow arrows led wrapped rows instead of trailing them, so a wrapped line opened on an arrow pointing at nothing. They now trail their box, and boxes in a row share a height.

## Sept 7, 2026. The voice slipped, and now a check catches it

I read the audit page and hit "the same month he first let an agent write code at all." Third person, a few paragraphs after copy written as me to the reader. Jarring, and it was the hub's analyst voice leaking through the synced tables: three rows in the "evaluated and skipped" section described me rather than spoke as me.

Fixed at the source, since the site file is generated and a hand-edit would be overwritten by the next sync. The hub's audit source now reads first person in those three rows, and `npm run sync` carried it across. Then two rules went into the forbidden-terms scan so it cannot ship again: any third-person masculine pronoun in page content, and "Jamie" in prose rather than "I". The second needed scoping on the first run, because it fired on the repo paths and the CV filename. It now matches only the possessive and "Jamie" followed by a word that is not "Brown," so attribution lines like "Jamie Brown, in session" still pass, which is correct, since an attribution is third person by nature.

Still third person and left alone: the hub's own commentary about the rows. That is analysis, not site copy, and it never reaches a page.

## Sept 7, 2026. Remote, softened

"Remote." on its own read as a hard filter that screens out anything hybrid. Now "Remote or hybrid preferred" in all five places a reader meets it: the pull-request line under my name on every page, the Home added line, the CV contact line, the CV head commit, and the two page descriptions. The master document's private note says remote is near non-negotiable rather than absolute, so the softer line is also the more accurate one.

## Sept 7, 2026. The verdict was too broad

The audit opener said "I tested them and none were worth what it cost me to check their work," which reads as a blanket dismissal of LLMs before Nov 2025. That was never my position. They were already very good at the things around the code: learning something new, documentation, discovery, and getting close enough to the right answer that a good programmer could tap it in from there. The verdict was specifically about letting one write code on its own, which is what the heading above it actually claims. Narrowed to say that, and the value stated rather than implied.

New copy entering at the site again, so it goes on the list for hub backfill along with the containment paragraph.

## Sept 7, 2026. Backing off "the direction is never delegated"

Too absolute, and not what I actually believe. Given the right context, prompting and pushback, the start, the middle or the end of a genuinely good idea does come from the agent. What is mine is holding the direction and deciding which ideas survive, which is a claim about judgment rather than origination. Item 1 of the working model now says that, and the bolded key clause moved to the part that is still true. Items 2 and 3 already drew the line correctly and did not change.

## Sept 7, 2026. Evaluated, not checked

"Ready means checked, not generated" became "Ready means evaluated, not generated." Checked is a pass or fail against something already known. Evaluated is the judgment call that the standard is actually about, and it is the word that matches items 1 and 3 of the working model rather than sitting a notch below them.

## Sept 7, 2026. Strikethrough, held from an earlier round

Removed lines are now struck, which was deferred when the diff colors first landed. The rule that keeps it readable: the strike lands on the thing that was removed, not on the reasoning for removing it. On Home that means the whole removed line, since each one is a single statement. On the audit page it means the tool name only, so the date and the paragraph explaining the call stay legible, which matters because that reasoning is the most valuable content on the page. Struck prose in a serif body column at full paragraph length would have been unreadable, and the audit's removed rows carry five of them.

## Sept 7, 2026. Not running the team

"Running a 7-person team of senior and staff engineers" overclaims. There was a Staff Engineer team lead, and Tech Lead for visualization and control is the accurate role. Corrected in three places on the site: Home now says part of a 7-person team, the CV's Luminar bullet leads with Tech Lead on that team rather than led it, and the skills line separates the two, since the 8 to 10 person instructor team at Full Sail is a real leadership claim and stays. One more on the same job went with it: "Led a distributed team of engineers and contractors through sprint planning, code review, and delivery" now says ran sprint planning, code review, and delivery with that group, which is a process claim rather than a people claim and is the part that is true.

Carried up to the master document too, since the CV here is hand-carried from it and the next re-carry would have brought the old wording back. Four rows fixed there and a dated correction note added at the Luminar section so it does not get reverted.

Two places left alone on purpose, both flagged to Jamie rather than edited. The LinkedIn full text quoted in the master document is a record of what is currently published, not a claim the document makes, so changing it would corrupt the record. Fixing what LinkedIn actually says is an outward-facing edit and Jamie's call. The story-bank entry in section 8 carries "left as Tech Lead of 7 senior/staff engineers," and that is interview preparation in his voice, not site copy.

Also unchecked: the CV PDF renders from the master document and still carries the old phrasing wherever it appears.

## Sept 7, 2026. "The next page" was the wrong page

Home closed by pointing at "the next page," but the nav runs Home, Projects, How I build software now, so the next page is Projects. The line now names the page and links to it, which also fixes the fact that the hero had no way out of it. Position-dependent copy on a site whose nav order can change was a defect waiting to happen either way.

## Sept 7, 2026. The 248 tests were the experiment, not the badge

"Written in TypeScript with 248 tests" read as a quality boast, and a slightly suspect one, because 248 tests on a small web app invites the question of who wrote them and why there are so many. The real answer is more interesting and it belongs on the page: they are agent-generated on purpose. Generating coverage had just gotten cheap enough to spend freely on, so the tests became a development process rather than a chore, and working out what the new tooling was actually good for as it came online was half the point of building the thing at all.

The count moved out of the opening sentence and into its own claim with the reasoning attached, the receipts strip and the CV catalog now both say agent-generated, and the key clause is the part that generalizes rather than the number.

## Sept 7, 2026. Saying why the dataset is what it is

history-heatmap named its Christianity and Islam dataset in the last sentence of a paragraph that opened with gaussian heat fields, which is exactly the wrong order. A reader who takes the subject the wrong way has already decided before the context arrives.

The entry now leads with where it came from: a question about how ideas spread and which ones last, the one running under internet culture, stock moves, prediction markets and memes. Followed back far enough that lands on the most durable ideas people have held, which is why those two are the first dataset and not the subject. Then the engineering, in its own paragraph. The CV catalog entry got the same reordering in one sentence.

Nothing was softened or hedged. The claim is the same one the README makes, it just arrives before the thing it explains rather than after.

## Sept 7, 2026. A modified line, and the adoption curve on Home

Two lines added to the Home hunk, above the manual-approval pair. One is a straight removal, "Wrote every line of code by hand." The other needed a state the site did not have: "Agentic pair programming and auditing only," where only the word "only" goes. The practice stayed, the restriction on it did not, and rendering that as a whole removed line would have said something false.

So there is now a third line state. A modified line carries a `~` marker and no background tint, because the line is retained, and the strike lands on the removed word alone using a real `<del>` element, which also means a screen reader announces it as a deletion. That is what `git diff --word-diff` shows, which keeps the device inside the vernacular rather than inventing one.

The four lines now read as the adoption curve the audit page argues: wrote it all by hand, then agent as pair programmer and auditor only, then agent writes with every action approved, then review the outcome. The nav count moved from +3 -3 to +3 -4, since a modified line is neither an addition nor a removal and is not counted as either. Contrast checker up to 48 pairs, covering a struck word on paper in both themes and both palettes.

One wording call worth naming: Jamie wrote "writing every line of code by hand," and it shipped as "Wrote," to stay parallel with "Approved every agent action by hand" directly below it.

Cut on the same pass: "and staying hands-on the whole time" on the Home Luminar line. It was there to offset "running a 7-person team," and once that claim came out the clause had nothing left to push against. The CV keeps its own version of the point, where a bullet has room for it.

## Sept 7, 2026. Sept, not Sep

The Home hunk header read "@@ Sep 2026 @@" and should be Sept. Standard abbreviation puts September at four letters while the rest sit at three, so Sept beside Aug and Jul is correct rather than inconsistent, which is the thing worth saying out loud since they appear two lines apart.

Six places carried it, across all three kinds of file the site has, so it got fixed at each layer rather than by hand six times. The two hand-authored ones were edited directly. The synced audit tables are normalized inside the clearance pass in `scripts/sync-sources.mjs`, alongside the existing rules, so the hub can keep writing "Sep" and the public page will not. The "Last audited" date needed the same treatment, since it is pulled out of the source separately and was skipping the clearance function entirely. Then a rule went into the forbidden-terms scan, which is what proves the normalization actually runs.

This log keeps writing its own dated headings as "Sep 7, 2026," which is deliberate. It is a build record, not a public page, and the scan does not read it.

## Sept 7, 2026. Outbound links open in a new tab

Every link off the site now opens in a new tab, so following a build log or a repo does not cost the reader the page they were on. Done as a build-time pass rather than by hand across thirteen anchors, because the next link someone adds would not have remembered the rule and this way it cannot be forgotten.

Three judgment calls in what counts as outbound. The CV PDF is same-origin and still qualifies, since opening it replaces the page just as thoroughly as leaving the domain does. The mailto link does not, because a mail client opening is not navigation and forcing a blank tab there leaves an empty window behind. Internal nav is untouched.

Each outbound link also carries `rel="noopener noreferrer"` and a visually hidden "(opens in a new tab)". The rel is the security half. The hidden note is there because `target="_blank"` on its own is not reliably announced, and a link that moves someone to a new tab without warning is a worse experience for a screen reader user than for anyone else.

## Sept 7, 2026. The animation verdict has a date on it

"Where AI assistance stops" opened with a flat finding and read as a standing verdict on AI animation tools, which is not what Jamie thinks. Split across two placements rather than one paragraph, because the thought has two halves that belong in different places.

The dated half went directly under the finding, where a reader forms the impression: that is where the tools were when I looked, not where they will stay, the space moves fast, my radar is up, and the evaluation gets run again. Putting it second means nobody reads three paragraphs of reasoning under the belief that the door is shut.

The curious half went into the open thread at the bottom, which already carries the `open` marker and is the structural home for a question the record has not closed. It replaces "Time will tell," which was doing the same job in a flatter way: which lands first, shipping hand-made animations or AI catching up to this use case. Two versions of the same beat would have been one too many, so the weaker one went.

Worth noting what did not change. The argument in between is about output rather than category, so a better tool next year does not touch it. The dated framing makes that clearer instead of hedging it.

## Sept 7, 2026. Turning the argument on the site itself

The audio-manager paragraph makes the point in the abstract, and the strongest available example was sitting under the reader's cursor. Two paragraphs added after it: nobody cares that this site was stood up with Claude Code, and the colophon on every page says so, what would feel off is stopping there. Then what stopping there would have skipped, named plainly. Pushing past the first good idea, guarding the design against Claude-ness, which is the house look an AI reaches for when nobody pushes back, and taking a polish cloth to every section over several passes.

Naming Claude-ness on the page was the call worth thinking about. It reads as insider language, so it carries its own gloss in the same sentence, which means the reader who does not know the term gets it and the reader who does gets the wink. A site whose entire design brief was avoiding that look should be willing to say the word.

The paragraph originally opened with "So" and sat directly above another paragraph opening with "So." Dropped, since the sentence is stronger starting on the verb anyway.

## Sept 7, 2026. Colophon is not a word people use

One reader-facing instance, now "the footer on every page says so." The class name in the stylesheet stays `.colophon`, since that is code and the word is precise for whoever maintains it. The page itself should not make anyone look something up to follow a sentence about how the site was built.

## Sept 7, 2026. A stale preview, and the reason it happened twice

Jamie flagged "Sep" on the CV page after it had already been fixed. The served build was correct, his browser was not. A stale page during a design review costs more than every byte the cache saves, so the preview server now sends `no-store`. Production caching is unaffected, since that is set in `_headers` at build time and the long-lived font rule there is worth keeping.

Worth recording that the check did its job. A grep across the built site found no bare "Sep" anywhere, and the forbidden-terms rule added earlier would have failed the build before writing a page if one had survived. The report was real and the site was already right, which is a better failure than the reverse.

## Sept 7, 2026. Softening the AI-augmented development line

"No agent wrote code, because none had earned it. Opus 4.5 was the first allowed to" reads as gatekeeping, and on a CV skills line there is no room for the reasoning that makes it fair. It now says LLMs were in daily use for the work around the code well before one was let near writing it, and that Opus 4.5 was the first handed the keyboard, even then on manual mode.

Same facts, and it now matches the audit page, which was narrowed earlier today for the same reason: the verdict was never that the tools were useless, only that none were yet worth the cost of checking code they had written on their own. Site-authored copy, so nothing to carry up to the master document.

## Sept 7, 2026. Removing a setup that never existed

Local model hosting was an investigation, not a thing that was bought or built. Nothing was purchased and nothing was configured, so every claim implying otherwise came off. Five places on the public surface: an entire "use daily" row in the audit, an AI workflow infrastructure bullet on the CV, and the local and hybrid clause on the CV skills line. The audit's daily count went from ten to nine.

Fixed at the source in all three hub files that carried it, since two of the five were synced or hand-carried and would have come straight back. One of those was a summary lane, which is the copy that feeds the PDF and LinkedIn, so the claim had further to travel than the site.

What survives, because it is independently true and never depended on the local half: cost-tiered routing at roughly 60/30/10, and a frontier model orchestrating cheaper models for mechanical work. The audit's tiered model routing row says exactly that and makes no hardware claim, so it stands as written.

Three rules went into the forbidden-terms scan. Ollama and Qwen by name, the specific hardware, and the phrase "always-on agent." A fabricated capability claim on a CV is the worst class of error this site can ship, so it gets a check rather than a memory of having fixed it once.

Still to do outside this repo: the CV PDF renders from the master document and was rendered before this correction.

## Sept 7, 2026. Carry-forward to the hub

Two of today's corrections invalidate artifacts outside this repo, so the reach got traced rather than guessed at. The leadership claim appears in eleven files and the local-model claim in seven, and the overlap is the part that matters: three tailored CVs that NOW.md lists as awaiting Jamie's send this week carry both. Those are the near-term risk, not the PDFs.

Written to `docs/carry-forward-site-corrections-2026-09-07.md` in the hub, outside this workspace, since a workspace gets deleted and takes its `.context` with it. It names what is already fixed so the hub session does not redo it, gives file and line for what is not, separates the two decisions that are Jamie's rather than scriptable, and recommends one issue with a checklist ordered by urgency rather than by file.

Two things worth repeating here. "Tech Lead of a distributed 7-person team" is the same overclaim as "led a 7-person team" and appears in every tailored CV, so a search for "led" alone would have missed all of them. And the narrowed adoption-curve verdict is the argument the drafted LinkedIn article is built on, so the article needs the correction before it publishes, not after.

## Sept 7, 2026. Three repos is a number, not a claim

"Three public repos" sat in the Home receipts next to 8M downloads and a 5.0 satisfaction score, and read as the weakest thing on the list. Jamie's word for it was underwhelming, the "that's it?" reaction, and he is right that the count is not the point. Three is not a quantity of output, it is a sequence of checkpoints.

Now: "Three recent public repos, a timeline of how building software changes as the agentic tools progress." The word doing the work is timeline, because it reframes three from a small total into a deliberate progression, and it is true, since the three were built months apart across the window where the tooling turned its corners.

Left alone: the Projects page description still says three public repos with build logs anyone can read. That is a search-result summary where a plain count is the right register, and it is not competing with an 8M figure two lines up.
