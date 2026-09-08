# Build log

Dated milestones, drafted from the commit history and the session transcripts. A story rather than a raw log, with the dead ends kept in on purpose. Drafted by the agent, edited by me for truth. Consolidated on Sept 8, 2026 from thirty-one same-day entries into the ten that carry the story.

## Sept 7, 2026. Read the brief, asked before building

Five bootstrap docs came across from the hub. Before writing anything the agent asked six questions: whether the containment paragraph on the audit page was confirmed, why the repo was private when the brief said public from birth, which CV to link, how deploy would work, how "render from source" could work when the source lives in a private hub, and how many issues to file. The most consequential answer changed the shape of a page: the CV would render from the master document, not from the one-page CV, because the one-pager is a lossy render of the real record.

## Sept 7, 2026. First design proposal, graded and rejected

The agent proposed a metadata margin column, IBM Plex, and monochrome with one ultramarine accent. I asked it to compare the proposal to the "designed by Claude" house style. Its own grade was a C+: the margin column was Tufte CSS, the palette was the generic default, and the whole thing was the second house style (restrained monochrome) rather than the first (cream and terracotta). One idea survived, color reserved for evidence. A dead end, and the most useful hour of the build.

## Sept 7, 2026. The diff, and then the pull request

The replacement direction: the site's argument is claim against check, so the layout is a diff. Hunk headers, context lines, added lines, review comments as marginalia. Two voices in the type, serif for judgment and mono for artifacts. I picked Commit Mono over Departure Mono after seeing both on the same page.

Then I looked at the first full build and said it was using the diff as decoration, because nothing on the site was ever removed. The reversal that followed was the biggest of the day. The site became a pull request. The masthead is the PR header with a state marker reading Open, which is both the PR state and the job status. The nav is the files-changed list with each page's real added and removed counts computed at build time. Home became the newest commit, with honest removals: the role that ended, the per-action approval that review replaced, the three repos that went from private to public. The CV became a commit log on a rail with dates in a wide gutter. Each project became a file with a diff-style header and its shortcoming pulled out as a review note. Case studies carry a resolved marker and the audit's caveat keeps an open one. And the footer became Checks: the build runs the contrast check and a forbidden-terms scan itself, prints the results on every page, and refuses to write anything if either fails.

## Sept 7, 2026. Bootstrap, prototype, and three false alarms

Repo flipped public with sign-off, since visibility is a one-way door. MIT license, a build script with no framework behind it, three fonts vendored with their licenses. The centerpiece page was prototyped first because it exercises every device in the system.

Three things looked like bugs and were not, or were mine. The first phone screenshot showed prose running off the right edge. Measured instead of guessed: the layout viewport was 485px, not 390, because headless Chrome's screenshot flag has a window floor. Switched to puppeteer-core with device emulation and the layout was fine. Then a `| head -2` on the build command killed the build mid-write with a broken pipe, so the preview server served half a site. It happened again on the very next rebuild, so the build now ignores a closed stdout and it cannot happen a third time. And one "Sep" I reported on the CV page had already been fixed. The served build was right and my browser cache was not, so the preview server now sends `no-store`, since a stale page during a design review costs more than any byte the cache saves. A class name collision along the way drew a grey blob over my name for one build, when the new state marker and the open-thread marker both answered to `.open`.

## Sept 7, 2026. Color, reversed three times

The dark mode toggle could not live at the bottom of a long page, so the display controls moved to a fixed corner. The palette went back and forth, and every call was mine. First, red and green would lead, because the tools use them and the site is about the tools, with blue and plum a toggle away. Then the text on changed lines took the hue of the line, darker on paper and lighter on black, because white text on a tinted background broke the illusion. Then a third hue for receipts: dates, counts, repo trails, and the attribution on a quoted note, always mono and never inside a tinted block, so a receipt cannot be misread as a diff line. It swaps with the palette, blue against red and green, ochre against blue and plum. Finally, after seeing both palettes side by side, the colorblind one became the default on first visit, with the standard red and green one toggle away. The contrast checker grew from 32 pairs to 48 to cover all of it, in both themes.

Strikethrough was held from the first round and landed later with a rule: the strike goes on the thing that was removed, not on the reasoning for removing it. On Home that is the whole removed line. On the audit page it is the tool name only, so the paragraph explaining the call stays readable. One line needed a state the site did not have, "Agentic pair programming and auditing only," where only the word "only" goes. It carries a `~` marker, no tint, and a real `<del>` on the word, which is what a word diff shows.

## Sept 7, 2026. Rendering the audit from source, and the voice that leaked

The audit tables must not be retyped. A sync script reads the hub's audit file, strips citations and hub issue numbers, replaces the stack name with "database-backed via MCP," normalizes "Sep" to "Sept," and writes a cleared markdown file the build renders as diff rows: unchanged for use daily, added for just adopted, removed for evaluated and skipped. The leak check fired on its first run, on the phrase "master document" in a row describing a skill that regenerates from the master document. A false positive, and the check was narrowed. A check that fires on run one is a check worth having.

Then the hub's analyst voice leaked through: three synced rows described me in the third person a paragraph after copy written as me. Fixed at the source, since a hand edit would be overwritten by the next sync, and two rules went into the forbidden-terms scan so it cannot ship again. Two audit rows also got corrected dates, the Cursor decision to the summer and fall of 2025 and the animation evaluations to spring 2026, applied through the sync script so a re-sync cannot undo them and flagged for backfill in the hub. And a local model setup that was investigated but never bought or built came off five surfaces, with three scan rules behind it, because a fabricated capability claim is the worst class of error this site can ship.

## Sept 7, 2026. The CV from the master document, cut hard

Carried across by hand with a clearance pass, since the master document is 415 lines of internal notes and no script could make the judgment calls. Left out on the rules: student quotes, compensation and revenue figures, a co-founder's name, a never-scheduled interview deck, an unverified certification, high school. Left out on the speed rule: an estimated "85% faster" claim. One staleness finding for the hub: the master document still named Navier-Stokes inpainting as magenta_pipeline's method, and the case study says it was replaced.

Two rounds of cutting followed. "Running a 7-person team" overclaimed, and became Tech Lead on that team, corrected here and in the master document so the next re-carry would not bring it back. Then the wall of text came down: personal projects moved to the top and were labeled as such, the last teaching role was squashed to three bullets that carry the strongest numbers, and everything else went behind editor-style folds that print open. Skills became tags grouped by tier. The phone number came off the page. The end date became Sept 2026, since the last day was the first of the month.

## Sept 7, 2026. Projects as documentation

The projects page should look like the documentation you would find inside each repo. Each project carries a data-flow diagram built from the same facts as the copy, a receipts strip, a verification line where there is one to state, and its shortcoming as a self-review note. The diagrams are mono boxes and arrow glyphs, so they print, work in both themes, and stack on a phone.

Three copy calls on the same page. "248 tests" read as a badge and invited the question of who wrote them, so it now says they were agent-generated on purpose, because coverage had just gotten cheap enough to spend freely on. The heat map named its dataset last, after the gaussian heat fields, which is the wrong order for a subject a reader can take the wrong way, so the entry now leads with the question it came from and then, in my own words, with what it taught me about generating almost anything to help me reason. And the chordsheet diagram starts at "Lyrics pasted by user," which is the copyright point stated in three words.

## Sept 7, 2026. The prose got flat, then got a scan rail

Reading the built pages, every case study opened the same way and the best facts on the site were buried mid-sentence in body serif. Three devices, all inside the existing system: the receipt hue for figures, role labels in the machine voice above each block (`// situation`, `// what I said`, `// result`), and one bolded key clause per paragraph at most. The working model itself had moved since it was written, so it now carries inline removals and additions, which is the honest way to show that: "in my head" struck, architecture calls moving off the never-delegate list, a line about wearing different hats, and the standard revised to say the tools reduced the cost of verifying and what is left in the gap is taste, expertise, and judgment about context.

Smaller corrections in the same spirit: the adoption verdict narrowed from a blanket dismissal to the specific claim about letting an agent write code on its own, "the next page" replaced by a named link when the nav order changed, outbound links opening in a new tab with the security half and the screen reader half both handled, "colophon" replaced by "footer" on the one page a reader sees it, and two paragraphs turning the animation argument on the site itself, naming Claude-ness as the house look an AI reaches for when nobody pushes back.

## Sept 8, 2026. The audit, and what it changed

An audit of the whole body of work as a recruiter, a hiring manager, and a senior peer. Every external link resolved, with one expected exception: this repo's own build-log link 404s until the pull request merges. The findings that survived: no contact anywhere but the CV page, the inline revisions on the working model read as typos without a date, the build log had become a changelog, and nothing on the site was a picture.

Approved and built the same day: an author line under the PR title on every page, a "5 files changed" summary above the file list, a `@@ revised Sept 7, 2026 @@` hunk header on the working model with a blame gutter beside the items that changed, a year ruler above the CV commit log with one bar per commit linking to its entry, and a unified-or-split toggle on the Home hunk that shows before and after side by side. This log was consolidated from thirty-one entries to ten. Declined: continuous integration as a merge gate, because the checks are a review stance, not a hard gate. Held for me to do: one screenshot per project and the two-minute recording, with slots left in the page for both.

## Sept 8, 2026. LinkedIn blocked the launch

The site went live in the morning on `jamiebrown.pages.dev`, and the launch post went out against that URL. LinkedIn refused it: readers who clicked got a "Malicious Website Suspected" interstitial instead of the site. Nothing was wrong with the site, which returned 200 and served normally the whole time. `pages.dev` is a shared Cloudflare subdomain, it is used for enough phishing to have earned a blanket block, and a filter cannot tell my portfolio from the rest of the zone. There was nothing to appeal, because nothing had been flagged.

The decision from Sept 7 to ship on the `*.pages.dev` URL and not hold the launch for a custom domain was the right call on the information available, and it cost a morning. The fix was a domain we own: `jamiebrown.engineer`, chosen over the shorter options because the exact-name `.dev` and `.com` were both taken, and over the obscure alternatives because the whole problem was a URL-reputation filter and there was no sense in trading one low-trust suffix for another.

`SITE_URL` carried the change into every canonical and Open Graph tag, which is why the domain move was a one-line default and a dashboard variable rather than a search and replace. The published surfaces were the expensive part: the CV PDF was rendered against the old URL, and so were the post and the article that were already live.

## Sept 8, 2026. Programmer art, and a page to put it on

The share card needed an image and the site had none, by a rule I had kept on purpose. What I had instead were two comics from the same afternoon: a robot delivering a stack of approved pull requests by 9:03 in the morning, and a person pulling the context window shut. They are cream and orange cartoons and they look nothing like the rest of the site.

So they got their own page rather than a quiet corner of an existing one. The joke it is built around is that programmer art, the placeholder a developer draws when nobody else will, has a successor about eighteen months old. I did not draw these either, and I did not pick them off a contact sheet. The idea generation was the model's, then the baton went back and forth for as many rounds as it took, neither of us finishing where the other left off. What the model could not supply was the stopping condition, which was that one of them made me smile. The drawing got cheap and knowing when it was done did not, which is the site's whole argument arriving in the most literal form available.

The page breaks the site's no-pictures rule without explaining itself, which is the right amount of explaining. It ends on the last comic. A third comic arrived while the page was being built, of the robot in a beret painting the human at an easel captioned AI-assisted programmer art, and the human asking what it had been told about recursion. The page had predicted a different third comic. The one that turned up was better, which is the paragraph above happening again in public.
