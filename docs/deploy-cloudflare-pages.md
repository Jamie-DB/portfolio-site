# Deploying this site on Cloudflare Pages

Step by step, from a repo on GitHub to a live site that redeploys on every push to `main`. Written Sept 7, 2026 against the current Cloudflare dashboard, revised Sept 8, 2026 when the site moved to a custom domain. Production is `https://jamiebrown.engineer`. The `jamiebrown.pages.dev` URL still resolves and is what preview deploys use. Nothing here needs `wrangler` on your machine.

## What the repo already provides

- `package.json` with `npm run build`, which writes the site to `dist/` and fails if a check fails.
- `.node-version` pinned to `22`, which Cloudflare's build image honors.
- `dist/_headers`, written by the build, for font caching and two security headers.
- `dist/404.html`, which Pages serves for any missing route.
- No `wrangler.toml`. The Git integration does not need one.

## 1. Give Cloudflare access to the repo

1. Cloudflare dashboard, left sidebar: **Workers & Pages**.
2. **Create**, then the **Pages** tab, then **Connect to Git**.
3. Choose GitHub. If this is the first time, Cloudflare installs its GitHub App. When GitHub asks which repositories, pick **Only select repositories** and choose `Jamie-DB/portfolio-site`. You can add more later from GitHub's settings under Applications.
4. Back in Cloudflare, select `portfolio-site` and click **Begin setup**.

## 2. Build settings

Fill in the setup form exactly like this.

| Field | Value |
|---|---|
| Project name | `jamiebrown` (this becomes `jamiebrown.pages.dev`, so pick it deliberately; it can be renamed later but the URL changes with it) |
| Production branch | `main` |
| Framework preset | **None** |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | leave blank |

Under **Environment variables** add one for both Production and Preview:

| Variable | Value | Why |
|---|---|---|
| `SITE_URL` | `https://jamiebrown.engineer` | The build writes canonical and Open Graph URLs from this. Production must carry the custom domain, or every canonical tag points at a URL LinkedIn blocks. Change it here and redeploy whenever the domain changes |

`NODE_VERSION` is not needed because of `.node-version`, but setting it to `22` as well does no harm.

Click **Save and Deploy**. The first build takes about a minute. The log should end with the same "Checks on this build" line the footer shows.

## 3. Check the first deploy

Open the deployment URL and confirm:

- Every nav link resolves and the dark mode and palette toggles work.
- A made-up path such as `/nothing/` shows the site's own 404 page, not Cloudflare's.
- `curl -sI https://jamiebrown.engineer/fonts/commit-mono-latin-400-normal.woff2 | grep -i cache-control` shows `max-age=31536000, immutable`. That proves `_headers` was picked up.
- View source on the home page and confirm `<link rel="canonical">` points at the real URL, not a placeholder.

## 4. Settings worth checking once

All under the project's **Settings**.

- **Builds & deployments**: Production branch is `main`. **Automatic deployments** on. Under **Preview deployments**, choose **All branches** if you want a preview URL for every pushed branch (useful for reviewing a PR before merge), or **None** if you would rather nothing but `main` ever builds. Previews get URLs like `<branch>.jamiebrown.pages.dev`.
- **Build watch paths**: leave at the default (everything), since any file in the repo can affect the build.
- **Environment variables**: `SITE_URL` present for both environments.
- **Access policy** (optional): if preview deployments are on and you do not want them public, enable Cloudflare Access for previews only. Production stays open.
- **Web Analytics** (optional): the toggle adds Cloudflare's cookieless analytics script. It is the only analytics the site would have. Decide deliberately, since it changes the "no scripts but the toggle" story.

## 5. How deploys work from here

- Merge to `main`, or push to it, and Cloudflare builds and deploys. Nothing else to do.
- A failed check fails the build, and the previous deploy stays live. The build log shows which check failed and on which page.
- Rollback: **Deployments** tab, pick an older successful build, **Rollback to this deployment**.

## 6. Custom domain

Done Sept 8, 2026: production is `jamiebrown.engineer`.

Why it was not optional. LinkedIn blocks the whole `pages.dev` zone, which is shared with enough phishing to have earned it. A link to `jamiebrown.pages.dev` in a post, an article, or a message shows readers a "Malicious Website Suspected" interstitial instead of the site. Nothing about this site caused that and there is nothing to appeal. A domain we own is the only fix.

To repeat the move for a different domain: **Custom domains** tab, **Set up a custom domain**, enter the name. If the DNS zone is already on Cloudflare it wires the CNAME itself; if the registrar holds DNS, add a `CNAME` to `jamiebrown.pages.dev` there instead. Then change `SITE_URL`, redeploy, and re-run the URL swap everywhere it has been published: the CV PDF, the LinkedIn profile, posts and articles, and the hub.

## 6b. Retiring the old subdomain

Attaching a custom domain does not stop the `*.pages.dev` URL serving. It kept answering 200 on every path, which leaves two full copies of the site for a search engine to choose a canonical between, and never tells anyone holding an old link that it moved.

The fix is `functions/_middleware.js`, a Pages Function that 301s the bare production subdomain to the same path on the custom domain. Added Sept 8, 2026.

It is a Function and not a line in `_redirects` because a `_redirects` source is matched as a path and never sees the hostname. A rule written as a full URL is accepted, deployed and silently does nothing. That was tried against the live site first and it stayed 200.

The match is exact on `jamiebrown.pages.dev`, so preview deploys on `<branch>.jamiebrown.pages.dev` still serve normally and stay reviewable. Change both hostname constants at the top of that file if the domain moves again.

Check it with `curl -sI https://jamiebrown.pages.dev/cv/`, which should show a 301 and a `location` on the custom domain.

## 7. Report back to the hub

Once the production URL is live, the hub's issue that is blocked on it needs the URL. The Sept 8, 2026 domain move is the second run of that issue, since the URL propagates to the CV PDF, the LinkedIn profile, and anything already published.
