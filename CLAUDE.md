# portfolio-site

Project rules. The design system, its reasoning, and the hub source-of-truth
rules live in this session's memory, not here. Keep this file to decisions that
would otherwise get re-litigated.

1. [UX] Never put a "N files changed +N -M" summary line above the site nav, because it was accurate and still read as clutter on the one element a reader has to get through rather than read (Jamie, Sept 12, 2026).
2. [UX] No icons or glyphs in the nav for now. A geometric Unicode set was costed out and declined: "No images for now." If it comes back, the viable marks are the ones Commit Mono actually carries, which is the whole masthead's face: `⌂ ▤ ▩ ◉ ▣ ◆ □ ▪ ●` yes, `☰ ▸ ▾ ※ ⁂ ⊞ ◦ ✉ ✎` no (Jamie, Sept 12, 2026).
3. [STYLE] An index or section page opens on its contents, not on a lead paragraph explaining what the section is for. The first draft of `/docs/` had two, and they read as AI-voiced padding restating what the file entries already say (Jamie, Sept 12, 2026).
4. [UX] The site nav is one line and lists sections only. The two long pieces are reached from the `/docs/` index, not from the nav, and the `docs/` row carries their counts rolled up the way a collapsed directory reports the diff underneath it (Jamie, Sept 12, 2026).
5. [CODE] Page chrome geometry is a site-wide invariant: masthead, main, and footer occupy the same pixels on every page at every width. A page may widen `--gutter` to reserve space beside its content, but that must never widen the reading measure or the masthead, and the wide gutter only applies above the width where the frame can still centre with it. Below that the frame stops centring and insets the content, which is what made the CV the one page that did not line up (Jamie, Sept 12, 2026).
6. [STYLE] Answer in brief. Use bullets when sensical. Only what Jamie needs to know or act on: decisions, problems, and things he must choose.
