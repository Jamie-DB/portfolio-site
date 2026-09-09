# LinkedIn recovery runbook, Sept 8, 2026

The launch post went out against `jamiebrown.pages.dev` and LinkedIn blocked it. This is the sequence for getting every LinkedIn surface onto `jamiebrown.engineer`, in order, with the checks that tell you it worked and what to do if it does not.

## What is actually broken

Only LinkedIn. `jamiebrown.pages.dev` returned 200 through the whole incident and still does. LinkedIn's URL filter blocks the entire `pages.dev` zone, which is a shared Cloudflare subdomain hosting enough phishing to have earned it. Nothing about this site was flagged, which is also why there was nothing to appeal.

So: links already emailed, printed on a CV, or sent outside LinkedIn still work. Do not treat those as urgent. Everything in this file is a LinkedIn surface.

## Before you touch anything on LinkedIn

Do not start until all four are true. Publishing against a domain that is not serving yet is the one way to make this worse, because a second bad link teaches the filter something about the new domain.

1. **DNS resolves.** `dig +short A jamiebrown.engineer` returns two Cloudflare addresses. If your machine says NXDOMAIN but `dig +short @1.1.1.1 A jamiebrown.engineer` answers, that is local negative caching and it will clear.
2. **The certificate has issued.** `curl -sI https://jamiebrown.engineer/` returns `HTTP/2 200`. A TLS handshake failure means Pages is still issuing; wait, do not proceed. This is normally minutes, not hours.
3. **`SITE_URL` took effect.** `curl -s https://jamiebrown.engineer/ | grep canonical` shows the custom domain. If it still says `pages.dev`, the Pages variable was set but the site was not rebuilt after it. Redeploy.
4. **The branch is merged.** `jamiebrown-engineer-domain-swap` into `main`, so the repo's fallback and docs match what is live.

## Order of operations, and why

Refresh LinkedIn's cache first, fix the highest-traffic surface next, then the durable ones. LinkedIn caches what it scrapes, so a repost before the cache is warm can attach an empty or stale card that you then cannot fix without deleting the post again.

### 1. Warm LinkedIn's cache

Open [Post Inspector](https://www.linkedin.com/post-inspector/), paste `https://jamiebrown.engineer`, inspect. Do this for the home page first, then for `/how-i-build/` and `/ai-tooling-audit/` if you plan to link them directly.

You should see the title "Jamie Brown, senior software engineer", the description from the page, and the share card image: the context-window illustration, 1200 by 675. The image is a share card only and does not appear on any page of the site, which still has no pictures in its own layout.

If the card renders text-only, the image did not fetch. Check `curl -sI https://jamiebrown.engineer/assets/og-context-window.png` returns 200 before re-inspecting.

If Post Inspector shows an error or the old content, stop and recheck the four preconditions. Do not post.

### 2. The live launch post

**Recommendation: delete and repost.** Reasons, so you can overrule it knowingly:

- Editing post text does not reliably regenerate an attached link preview card. You would be editing a post whose card is either absent or points at a blocked URL.
- An edit does not put the post back into feeds. A post that spent its first hours showing a malware warning has already spent its distribution.
- The engagement you would preserve by editing is engagement on a post nobody could click through.

**What you lose by deleting:** reactions and comments, permanently, with no undo. If someone left a comment worth keeping, screenshot it or reply to that person directly before deleting.

**To delete:** the post's `⋯` menu → Delete post → confirm.

**To repost:** paste the new text from `artifacts/linkedin/post-01-adoption-curve-announce.md` with the URL at line 56 swapped to `jamiebrown.engineer`. Paste the URL, wait for the card to attach, then remove the raw URL from the text if you prefer the card alone. Post.

**If you edit instead:** `⋯` → Edit post, remove the URL entirely, save, reopen, re-add the new URL, wait for the card, save again. Verify the card points at the new domain before you walk away.

### 3. The article

The published article needs the URL in two places. Your source is `artifacts/linkedin/article-01-adoption-curve.md`, lines 30 and 98.

Open the article → Edit → change both → Publish. The article keeps its existing URL, so any link to the article itself stays good. Editing does not re-notify followers, so this is safe to do at any hour and is not a second announcement.

### 4. Profile surfaces

From `artifacts/linkedin/linkedin-rewrite.md`:

- **Featured** (line 183): remove the old link, add `https://jamiebrown.engineer`. Featured items scrape their own preview, so check it renders before moving on.
- **Projects entry** (line 181): the entry's *name* is the literal text `jamiebrown.pages.dev`. That is a rename, not just a link swap. Use `jamiebrown.engineer` for both the name and the link.
- **Contact info → Website**: if the old URL is there, swap it. This one is easy to forget because it is behind a modal.
- **About section**: check for the URL as plain text.

### 5. Anything you sent by hand

Search your own sent messages for `pages.dev`. Those links still work, so this is courtesy rather than repair. A short "the site moved to its own domain, here it is" is enough, and only to people you are actually in conversation with.

## How to know it worked

- From a logged-out browser or a private window, open the new post and click the link. A logged-out view is the closest thing to what a stranger sees, and the filter behaves the same.
- On a phone, in the LinkedIn app, click through. The app and the web filter can differ.
- Ask one person outside your network to click it and say what they saw. You are inside your own reputation graph and LinkedIn sometimes treats that differently.

If all three land on the site with no interstitial, you are done.

## If the new domain is also blocked

Different problem, different fix, and this one is worth appealing.

`jamiebrown.engineer` is registered to you, so a block on it is a judgment about *your* domain, not about a shared zone you happen to sit in. Newly registered domains do sometimes trip reputation filters for no reason beyond being new.

1. Confirm it is a block and not a typo. Post Inspector will fetch the page fine even when the share filter refuses it, so test by putting the link in a draft post or a message to yourself.
2. Do **not** repost repeatedly to test. Repetition of a flagged link is itself a spam signal.
3. Do **not** route around it with a link shortener. Shorteners have worse filter reputation than raw domains, and hiding a destination is exactly the pattern the filter looks for.
4. Appeal through LinkedIn Help, naming the domain, stating it is your personal portfolio, registered on Sept 8, 2026, and that you are the registrant. Expect days, not hours.
5. While waiting, link the GitHub repo `github.com/Jamie-DB/portfolio-site` instead. It carries the README, the build log, and the whole argument, and `github.com` is not going to be filtered.

## What not to do, in any case

- Do not post the URL as bare text hoping to dodge the filter. LinkedIn scans post text, not just attached cards.
- Do not delete and repost more than once. Each cycle costs distribution and looks like churn.
- Do not take the `pages.dev` URL down. It costs nothing, it still works, and links to it exist in the wild.
  - Sept 8, 2026, later the same day: it now answers with a 301 to the matching path on `jamiebrown.engineer`, set in `scripts/build.mjs` as a `_redirects` rule. That is not taking it down. Every old link still arrives, and it stops the two copies competing for the canonical.
