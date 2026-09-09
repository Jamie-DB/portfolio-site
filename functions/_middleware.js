// UNDER REVIEW as of Sept 8, 2026. Live, not settled. This file is the only
// runtime code the site has, and the alternative under consideration is to
// drop it and accept two live domains. See docs/deploy-cloudflare-pages.md
// section 6b before building anything else on top of it.
//
// The site moved to jamiebrown.engineer. Its old Cloudflare Pages subdomain
// still answers on every path, so send it on rather than leaving two live
// copies for a search engine to choose between.
//
// This is a Pages Function and not a _redirects rule because a _redirects
// source is matched as a path only. It cannot see the hostname, so the whole
// class of "same project, different domain" redirects has to run as code.
//
// The match is the bare production subdomain, exact. Preview deploys land on
// <branch>.jamiebrown.pages.dev and are left alone so they stay reviewable.

const OLD_HOST = 'jamiebrown.pages.dev';
const NEW_HOST = 'jamiebrown.engineer';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname !== OLD_HOST) return context.next();
  url.hostname = NEW_HOST;
  url.protocol = 'https:';
  url.port = '';
  return Response.redirect(url.toString(), 301);
}
