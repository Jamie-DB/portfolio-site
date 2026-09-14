// Builds ./dist from hand-authored page fragments in src/pages and the
// generated markdown in content/. No framework. Run with `npm run build`.
//
// The site is framed as a pull request. The masthead is the PR header, the
// nav is the files-changed list with real +/- counts, and the footer reports
// the checks this build ran. A failed check fails the build.
import { readFile, writeFile, mkdir, cp, readdir, rm, access, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { marked } from 'marked';
import { runContrast } from './contrast.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src');
const OUT = path.resolve(ROOT, process.env.OUT_DIR || 'dist');

// The stylesheet and the script ship under a content-hashed name, filled in by
// fingerprint() before any page renders. Without it their URLs never change,
// so Cloudflare's four-hour browser TTL holds a returning reader on the old
// CSS and the old script while the new HTML is already live: the share line
// lands as a run-on caption with no button. Hashed names make every change a
// new URL, which is what lets the files be cached for a year.
const ASSETS = { css: '/css/site.css', js: '/js/theme.js' };

const SITE = {
  name: 'Jamie Brown',
  // Production is the custom domain. Cloudflare sets SITE_URL; this default is
  // what a local build and a preview deploy fall back to.
  url: (process.env.SITE_URL || 'https://jamiebrown.engineer').replace(/\/$/, ''),
  repo: 'https://github.com/Jamie-DB/portfolio-site',
  buildlog: 'https://github.com/Jamie-DB/portfolio-site/blob/main/BUILDLOG.md',
  // Share card, rendered by scripts/share-card.mjs from the mark and the
  // masthead type. Re-run that script if the mark or the state line changes.
  ogImage: '/assets/share-card.png',
  ogImageAlt: 'The human-in-the-loop mark, a person beside a robot, next to the name Jamie Brown and the line: Senior software engineer, Orlando. Remote or hybrid preferred.',
};

// The PR state. Open to new roles means available. Flip to Merged when the
// role lands.
const STATE = {
  word: 'Open to new roles',
  line: 'Senior software engineer, Orlando. Remote or hybrid preferred.',
};

// The author line under the title, the way a PR shows who opened it. Contact
// on every page, so a reader never has to hunt for it.
const AUTHOR = [
  ['mailto:jamiedevinbrown@gmail.com', 'jamiedevinbrown@gmail.com'],
  ['https://www.linkedin.com/in/jdevbrown', 'LinkedIn'],
  ['https://github.com/Jamie-DB', 'GitHub'],
];

// The hand-drawn mark signs the colophon. Inlined so its stroke takes the
// page ink in both themes; the red light stays red.
const SIGNATURE = (await readFile(path.join(SRC, 'assets', 'hitl-signature.svg'), 'utf8'))
  .replace('<svg ', '<svg class="signature" role="img" aria-label="Human in the loop, drawn by hand" ')
  .trim();

// Preview-only switches for side-by-side builds. Never set in production.
const MONO = process.env.MONO || '';       // '' | 'departure'
const THEME = process.env.THEME || '';     // '' | 'dark' | 'light'
const PALETTE = process.env.PALETTE || ''; // '' | 'standard'

// The file list, one line. A repo keeps its prose in docs/, so the two long
// pieces sit in that directory and are reached from its index rather than
// from here. The folder row carries their counts rolled up, the way a
// collapsed directory reports the diff underneath it.
const NAV = [
  { href: '/', label: 'Home' },
  { href: '/docs/', label: 'docs/', holds: ['/docs/how-i-build/', '/docs/ai-tooling-audit/'] },
  { href: '/programmer-art/', label: 'Programmer art', cls: 'art' },
  { href: '/cv/', label: 'CV and contact' },
  { href: '/projects/', label: 'Projects' },
];

// Pages that moved when the writing was consolidated under docs/. Both URLs
// were public before the move, so the old paths keep answering.
const REDIRECTS = [
  ['/how-i-build', '/docs/how-i-build/'],
  ['/ai-tooling-audit', '/docs/ai-tooling-audit/'],
];

// Never on a public surface. Scanned against every page's main content.
const FORBIDDEN = [
  [/notion/i, 'the stack name'],
  [/jdbrownfs/i, 'the retired GitHub handle'],
  [/hamstra/i, 'a private individual'],
  [/\$\s?\d/, 'a money figure'],
  [/presented to/i, '"presented" for something only prepared'],
  [/—/, 'an em dash'],
  [/\bGPA\b/, 'a GPA'],
  [/christianity-heatmap/i, 'the old repo name'],
  // Voice. Every page speaks as Jamie, to the reader. Third person is the
  // hub's analyst voice and it reads as someone else describing him, which
  // is jarring a paragraph after "I". Attribution lines say "Jamie Brown"
  // in full and are allowed.
  // Scoped to prose. Comic captions carry dialogue, and the characters in the
  // comics are not me, so a pronoun inside a figcaption is not the leak this
  // rule is looking for.
  [/\b(he|him|his|himself)\b/i, 'third-person voice on a first-person page', 'prose'],
  [/\bJamie(?:'s|\u2019s|\s+(?!Brown\b))/, 'Jamie named in the third person rather than "I"', 'prose'],
  // House style: September abbreviates to Sept, every other month to three
  // letters. Synced content is normalized in scripts/sync-sources.mjs.
  [/\bSep\b/, 'September abbreviated Sep rather than Sept'],
  // No phone number on the public site. Email, LinkedIn and GitHub only. The
  // hub's CV carries one, so a re-carry from data/master-document.md is the
  // way it would get in. Both the specific number and the general shape.
  [/\b636\D{0,3}584\D{0,3}5357\b/, 'a phone number'],
  [/\b\d{3}\D\d{3}\D\d{4}\b/, 'something shaped like a phone number'],
  // Local model hosting was investigated and never bought or set up. Nothing
  // on a public surface may imply otherwise.
  [/\b(ollama|qwen)\b/i, 'a local model stack that was never set up'],
  [/\bM1 Pro\b/i, 'hardware that was never purchased'],
  [/always-on agent/i, 'an always-on local agent that never existed'],
];

// Outbound links open in a new tab, so reading a build log or a repo never
// costs the reader the site. Off-origin links qualify, and so does the CV PDF,
// which is same-origin but still replaces the page. mailto is left alone,
// since a mail client opening is not navigation. rel="noopener" is the
// security half, and the hidden note is there because target="_blank" on its
// own is not reliably announced.
const OUTBOUND = /<a\s([^>]*href="(https?:\/\/[^"]+|[^"]*\.pdf)"[^>]*)>([\s\S]*?)<\/a>/g;
function newTab(html) {
  return html.replace(OUTBOUND, (m, attrs, href, text) => (/\btarget=/.test(attrs) ? m
    : `<a ${attrs} target="_blank" rel="noopener noreferrer">${text}<span class="sr-only"> (opens in a new tab)</span></a>`));
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function parseFragment(text, file) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing front matter`);
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  for (const k of ['title', 'path', 'description']) {
    if (!meta[k]) throw new Error(`${file}: front matter needs ${k}`);
  }
  return { meta, body: m[2].trim() };
}

// Real diff counts for the files-changed nav: one per added or removed block.
function diffstat(html) {
  const count = (cls) => (html.match(new RegExp(`class="[^"]*\\b${cls}\\b[^"]*"`, 'g')) || []).length;
  return { add: count('add'), del: count('del') };
}

function statSpan(s) {
  const parts = [s.add ? `<span class="plus">+${s.add}</span>` : '', s.del ? `<span class="minus">-${s.del}</span>` : ''].filter(Boolean);
  return parts.length ? ` <span class="stat">${parts.join(' ')}</span>` : '';
}

// One row per entry. There is no "N files changed" total above the list: it was
// accurate and it cluttered the nav, which is the one thing on the page a
// reader has to get through rather than read.
function nav(current, stats) {
  return NAV.map((n) => {
    const s = [...new Set([n.href, ...(n.holds || [])])].reduce((t, href) => {
      const x = stats[href] || { add: 0, del: 0 };
      return { add: t.add + x.add, del: t.del + x.del };
    }, { add: 0, del: 0 });
    // A page inside docs/ keeps the folder marked as the current location.
    const here = n.href === current || (n.holds || []).includes(current);
    const stat = statSpan(s);
    const cls = n.cls ? ` class="${n.cls}"` : '';
    return here
      ? `<span${cls} aria-current="page">${esc(n.label)}${stat}</span>`
      : `<a href="${n.href}"${cls}>${esc(n.label)}${stat}</a>`;
  }).join('\n      ');
}

// A split view of a hunk: old on the left, new on the right, rows aligned.
// Context lines appear on both sides, a removal followed by an addition shares
// a row, and a modified line shows the struck word on the left and the clean
// line on the right. Generated from the unified lines so the two cannot drift.
function splitView(body) {
  const m = body.match(/<section class="hunk hero">([\s\S]*?)<div class="lines">([\s\S]*?)<\/div>\s*<\/section>/);
  if (!m) return body;
  const items = [...m[2].matchAll(/<p class="(ctx|add|del|mod)">([\s\S]*?)<\/p>/g)].map((x) => ({ role: x[1], html: x[2] }));
  const rows = [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (it.role === 'ctx') rows.push(['ctx', it.html, 'ctx', it.html]);
    else if (it.role === 'mod') rows.push(['del mod', it.html, 'add', it.html.replace(/\s?<del>[\s\S]*?<\/del>/g, '')]);
    else if (it.role === 'del' && items[i + 1] && items[i + 1].role === 'add') { rows.push(['del', it.html, 'add', items[i + 1].html]); i++; }
    else if (it.role === 'del') rows.push(['del', it.html, 'empty', '']);
    else rows.push(['empty', '', 'add', it.html]);
  }
  const split = `<div class="lines split" hidden>\n` + rows.map(([lr, lh, rr, rh]) =>
    `  <div class="row"><div class="cell ${lr}">${lh}</div><div class="cell ${rr}">${rh}</div></div>`).join('\n') + `\n</div>`;
  const section = m[0].replace('<div class="lines">', '<div class="lines unified">').replace(/<\/section>$/, `${split}\n</section>`);
  return body.replace(m[0], section);
}

function layout({ meta, body }, stats, checks) {
  body = splitView(body);
  const home = meta.path === '/';
  const title = home ? `${SITE.name}, senior software engineer` : `${meta.title} - ${SITE.name}`;
  const url = SITE.url + meta.path;
  const attrs = [
    THEME ? ` data-theme="${THEME}"` : '',
    PALETTE ? ` data-palette="${PALETTE}"` : '',
    MONO ? ` data-mono="${MONO}"` : '',
  ].join('');
  const bodyClass = meta.layout ? ` class="${meta.layout}"` : '';
  return newTab(`<!doctype html>
<html lang="en"${attrs}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(meta.description)}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(meta.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE.url + (meta.image || SITE.ogImage)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(meta.imageAlt || SITE.ogImageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/assets/favicon.ico" sizes="48x48">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <script>(function(){try{var d=document.documentElement,t=localStorage.getItem('theme'),p=localStorage.getItem('palette');if(t)d.setAttribute('data-theme',t);if(p)d.setAttribute('data-palette',p)}catch(e){}})();</script>
  <link rel="stylesheet" href="${ASSETS.css}">
</head>
<body${bodyClass}>
  <div class="frame">
    <header class="pr">
      <p class="pr-title"><a class="name" href="/"><img class="mark" src="/assets/hitl-mark.svg" alt="" width="160" height="128">${SITE.name}</a> <span class="state open">${STATE.word}</span></p>
      <p class="pr-line">${STATE.line}</p>
      <p class="pr-author">${AUTHOR.map(([href, text]) => `<a href="${href}">${text}</a>`).join(' ')}</p>
      <nav class="files" aria-label="Site">
      ${nav(meta.path, stats)}
      </nav>
    </header>
    <main id="main">
${body}
    </main>
    <footer class="colophon">
      <p class="checks">${checks}</p>
      <p>Built with Claude Code and reviewed by me. <a href="${SITE.repo}">Source</a> and <a href="${SITE.buildlog}">build log</a> on GitHub.</p>
      <p>Diff colors default to blue and plum, which stay apart for colorblind readers. The standard palette switches to red and green, the way the tools do it.</p>
      ${SIGNATURE}
    </footer>
  </div>
  <div class="controls" hidden>
    <button type="button" data-control="theme" aria-pressed="false">Dark mode</button>
    <button type="button" data-control="palette" aria-pressed="false">Standard palette</button>
  </div>
  <script src="${ASSETS.js}"></script>
</body>
</html>
`);
}

// Generated content. Placeholders like {{audit-daily}} in a page fragment are
// filled from content/*.md, which scripts/sync-sources.mjs produces from the
// hub. Nothing in content/ is typed by hand.
function mdTable(md, heading) {
  const start = md.indexOf(`\n## ${heading}\n`);
  if (start < 0) throw new Error(`content: no section "${heading}"`);
  const body = md.slice(start + 1).split(/\n## /)[0];
  return body.split('\n').filter((l) => l.startsWith('|')).slice(2)
    .map((l) => l.slice(1, -1).split(' | ').map((c) => marked.parseInline(c.trim())));
}

// Each audit row renders as one diff line: context for what is in use, added
// for what was just adopted, removed for what was evaluated and skipped.
function auditRows(rows, role, withWhen) {
  return `<dl class="rows lines">\n` + rows.map((cells) => {
    const [tool, when, why] = withWhen ? cells : [cells[0], null, cells[1]];
    return `  <div class="row ${role}">\n    <dt>${tool}</dt>\n    <dd>${when ? `<span class="when">${when}</span> ` : ''}${why}</dd>\n  </div>`;
  }).join('\n') + `\n</dl>`;
}

// The CV's experience entries are commits. In content/cv.md each role is an
// h3 followed by a meta line whose <time> holds the dates. Wrap each one so
// the stylesheet can draw the rail.
const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sept: 8, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
const NOW = (() => { const d = new Date(); return d.getUTCFullYear() + d.getUTCMonth() / 12; })();
// "Jan 2020" reads as 2020.0, "Jun 2022" as 2022.4, a bare "2025" as 2025.0.
function yearOf(text) {
  const m = text.match(/(?:([A-Z][a-z]+) )?(\d{4})/);
  return m ? +m[2] + (m[1] && MONTHS[m[1]] != null ? MONTHS[m[1]] / 12 : 0) : null;
}
const slug = (t) => t.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function ruler(entries) {
  const start = Math.floor(Math.min(...entries.map((e) => e.from)));
  const end = NOW + 0.25;
  const pct = (y) => `${(((y - start) / (end - start)) * 100).toFixed(1)}%`;
  const rows = entries.map((e) => {
    const late = (e.to - start) / (end - start) > 0.85;
    return `    <li><a href="#${e.id}" title="${esc(e.title)}" class="${late ? 'late' : ''}" style="--from:${pct(e.from)};--to:${pct(e.to)}"><span>${esc(e.short)}</span></a></li>`;
  }).join('\n');
  const ticks = [];
  for (let y = Math.ceil(start / 5) * 5; y < NOW; y += 5) {
    // A tick sitting close to the "now" marker collides with it once the axis
    // is narrow enough. Mark it here and let the stylesheet drop it on a
    // phone, where the labels are the same size but the axis is half as wide.
    const tight = (NOW - y) / (end - start) < 0.12 ? ' class="tight"' : '';
    ticks.push(`    <li${tight} style="--at:${pct(y)}">${y}</li>`);
  }
  ticks.push(`    <li class="now" style="--at:${pct(NOW)}">now</li>`);
  return `<figure class="ruler" aria-label="Timeline, ${start} to now. Each bar links to its entry below.">\n  <ol class="ruler-rows">\n${rows}\n  </ol>\n  <ol class="ruler-axis" aria-hidden="true">\n${ticks.join('\n')}\n  </ol>\n</figure>\n`;
}

function commits(html) {
  const entries = [];
  const parts = html.split(/(?=<h3>)/);
  const out = parts.map((part, i) => {
    if (i === 0) return part;
    const m = part.match(/^<h3>([\s\S]*?)<\/h3>\s*<p class="meta"><time([^>]*)>(.*?)<\/time>\s*([\s\S]*?)<\/p>/);
    if (!m) return part;
    const [, title, attrs, when, org] = m;
    const id = slug(title);
    const short = (attrs.match(/data-short="([^"]*)"/) || [])[1] || title;
    const [a, bRaw = ''] = when.split(/ to /);
    const from = yearOf(a);
    const to = /present/.test(bRaw) ? NOW : (yearOf(bRaw) ?? from) + (/[A-Z][a-z]+ \d{4}/.test(bRaw) ? 1 / 12 : 1);
    if (from != null) entries.push({ id, title, short, from, to });
    const rest = part.slice(m[0].length);
    const cut = rest.search(/<h2|<\/div>/);
    const [inner, after] = cut < 0 ? [rest, ''] : [rest.slice(0, cut), rest.slice(cut)];
    return `<article class="commit" id="${id}">\n<p class="when">${when}</p>\n<h3>${title}</h3>\n<p class="meta">${org}</p>${inner}</article>\n${after}`;
  }).join('');
  return entries.length ? out.replace('<div class="commits">', ruler(entries) + '<div class="commits">') : out;
}

// Comics. Each figure on the programmer-art page also gets a page of its own
// at /programmer-art/<id>/, whose share card is the drawing rather than the
// masthead. That page is the share link: paste it anywhere that unfurls a
// URL and the comic is what shows. The figure on the index and the one on
// its own page carry the same share line: the date it went up, a permalink,
// and a button the script wires to the share sheet. A page whose front
// matter names a cover takes that comic's card as its own.
//
// The figures are authored newest first, which is the order the index reads
// in, so the nav row lands on the newest comic and the index is the "all"
// view behind it. Previous is the older comic and Next the newer one, which
// leaves the newest with Previous and All, the way an archive's front page
// only goes backwards.
//
// The card is the drawing letterboxed to 1200 by 630, rendered once by
// scripts/comic-cards.mjs. The build refuses a comic without one.
const FIGURE = /<figure class="artifact" id="([a-z0-9-]+)" data-date="(\d{4}-\d{2}-\d{2})" data-title="([^"]*)">\s*<img ([^>]*)>\s*<figcaption>([\s\S]*?)<\/figcaption>\s*<\/figure>/g;
const card = (src) => src.replace(/\/comic-/, '/og-comic-');
// Month, day, year, hyphenated, the way a filename dates a drawing.
const mdy = (iso) => { const [y, m, d] = iso.split('-'); return `${m}-${d}-${y}`; };
function comics(page) {
  const attr = (attrs, name) => (attrs.match(new RegExp(`\\b${name}="([^"]*)"`)) || [])[1] || '';
  const list = [...page.body.matchAll(FIGURE)].map(([html, id, date, title, img, caption]) => ({
    html, id, date, title, img, caption, path: `${page.meta.path}${id}/`, src: attr(img, 'src'), alt: attr(img, 'alt'),
  }));
  if (!list.length) return [];
  const figure = (c, eager) => `<figure class="artifact" id="${c.id}">\n  <img ${eager ? c.img.replace(/\s*loading="lazy"/, '') : c.img}>\n  <figcaption>${c.caption}<span class="share" data-title="${esc(c.title)}"><time datetime="${c.date}">${mdy(c.date)}</time><a href="${c.path}">${c.path}</a> <button type="button" hidden>Share</button></span></figcaption>\n</figure>`;
  for (const c of list) page.body = page.body.replace(c.html, figure(c));
  if (page.meta.cover) {
    const cover = list.find((c) => c.id === page.meta.cover);
    if (!cover) throw new Error(`${page.meta.path}: no figure with id ${page.meta.cover}`);
    Object.assign(page.meta, { image: card(cover.src), imageAlt: cover.alt });
  }
  return list.map((c, i) => {
    const prev = list[i + 1];
    const next = list[i - 1];
    const nav = [
      prev ? `<a href="${prev.path}">Previous</a>` : '',
      next ? `<a href="${next.path}">Next</a>` : '',
      `<a href="${page.meta.path}">All</a>`,
    ].filter(Boolean).join(' ');
    return {
      meta: { title: `${page.meta.title}: ${c.title}`, path: c.path, description: c.caption.replace(/^\/\/\s*/, ''), image: card(c.src), imageAlt: c.alt },
      body: `<h1>${esc(page.meta.title)}</h1>\n\n${figure(c, true)}\n\n<p class="share-nav">${nav}</p>`,
    };
  });
}

// A fold is a <details class="fold"> block. The build appends a line count to
// its summary so the collapsed state reads like an editor's fold marker.
function folds(html) {
  return html.replace(/<details class="fold"([^>]*)>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g, (m, attrs, summary, inner) => {
    const n = (inner.match(/<li\b|<tr\b|<p\b|<dt\b/g) || []).length;
    return `<details class="fold"${attrs}><summary>${summary}<span class="fold-n">${n} lines</span></summary>${inner}</details>`;
  });
}

async function generated() {
  const audit = await readFile(path.join(ROOT, 'content', 'ai-tooling-audit.md'), 'utf8');
  const cv = await readFile(path.join(ROOT, 'content', 'cv.md'), 'utf8').catch(() => '');
  const daily = mdTable(audit, 'Use daily');
  const adopted = mdTable(audit, 'Just adopted');
  const skipped = mdTable(audit, 'Evaluated and skipped');
  return {
    'audit-date': audit.match(/^Last audited: (.+)$/m)[1],
    'audit-daily': auditRows(daily, 'ctx', false),
    'audit-adopted': auditRows(adopted, 'add', true),
    'audit-skipped': auditRows(skipped, 'del', true),
    // Counts for the docs index, so its receipts cannot drift from the audit.
    'audit-n-daily': String(daily.length),
    'audit-n-adopted': String(adopted.length),
    'audit-n-skipped': String(skipped.length),
    'cv': cv ? folds(commits(marked.parse(cv))) : '',
  };
}

function fill(body, values) {
  return body.replace(/\{\{([a-z-]+)\}\}/g, (m, key) => {
    if (!(key in values)) throw new Error(`unknown placeholder ${m}`);
    return values[key];
  });
}

// Checks. The forbidden-terms scan runs on page content, not the chrome, so
// the footer that reports it cannot trip it.
function scan(pages) {
  const hits = [];
  let semicolons = 0;
  for (const p of pages) {
    const text = p.body.replace(/<!--[\s\S]*?-->/g, '');
    const prose = text.replace(/<figcaption>[\s\S]*?<\/figcaption>/g, '');
    for (const [re, why, scope] of FORBIDDEN) {
      if (re.test(scope === 'prose' ? prose : text)) hits.push(`${p.meta.path}: ${why} (${re})`);
    }
    for (const para of text.match(/<p[^>]*>[\s\S]*?<\/p>/g) || []) {
      if (/;/.test(para.replace(/&[a-z#0-9]+;/g, ''))) { semicolons++; hits.push(`${p.meta.path}: semicolon in prose`); }
    }
  }
  return { hits, semicolons };
}

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function writePage(meta, html) {
  // "/404.html" is a file Cloudflare Pages serves for missing routes; every
  // other path is a directory with an index.
  const file = meta.path.endsWith('.html') ? path.join(OUT, meta.path) : path.join(OUT, meta.path, 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
  console.log(`  ${meta.path}${meta.stats.add || meta.stats.del ? `  +${meta.stats.add} -${meta.stats.del}` : ''}`);
}

// Rename the stylesheet and the script in the output to include a hash of
// their contents, and point ASSETS at the new URLs. Must run after the copy
// and before the first page renders.
async function fingerprint() {
  for (const [key, dir, file, ext] of [['css', 'css', 'site', 'css'], ['js', 'js', 'theme', 'js']]) {
    const from = path.join(OUT, dir, `${file}.${ext}`);
    const hash = createHash('sha256').update(await readFile(from)).digest('hex').slice(0, 8);
    const name = `${file}.${hash}.${ext}`;
    await rename(from, path.join(OUT, dir, name));
    ASSETS[key] = `/${dir}/${name}`;
  }
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  for (const dir of ['css', 'fonts', 'js', 'assets']) {
    const from = path.join(SRC, dir);
    if (await exists(from)) await cp(from, path.join(OUT, dir), { recursive: true });
  }
  await fingerprint();

  // Cloudflare Pages reads _headers from the output directory. Everything with
  // a hashed or otherwise stable name is cached for a year. Everything whose
  // URL can be reused for new bytes must revalidate, or a change to it stays
  // invisible for four hours: /assets holds the comics and the share cards,
  // which get replaced in place.
  await writeFile(path.join(OUT, '_headers'), [
    '/fonts/*',
    '  Cache-Control: public, max-age=31536000, immutable',
    '/css/*',
    '  Cache-Control: public, max-age=31536000, immutable',
    '/js/*',
    '  Cache-Control: public, max-age=31536000, immutable',
    '/assets/*',
    '  Cache-Control: public, max-age=0, must-revalidate',
    '/*',
    '  X-Content-Type-Options: nosniff',
    '  Referrer-Policy: strict-origin-when-cross-origin',
    '',
  ].join('\n'));
  await writeFile(path.join(OUT, '_redirects'),
    REDIRECTS.flatMap(([from, to]) => [`${from} ${to} 301`, `${from}/ ${to} 301`]).join('\n') + '\n');

  // Pass one: render every page body so the nav can carry real counts.
  const values = await generated();
  const pagesDir = path.join(SRC, 'pages');
  const pages = [];
  for (const file of (await readdir(pagesDir)).filter((f) => f.endsWith('.html')).sort()) {
    const page = parseFragment(await readFile(path.join(pagesDir, file), 'utf8'), file);
    page.body = fill(page.body, values);
    pages.push(page);
  }
  for (const page of [...pages]) {
    const own = comics(page);
    if (!own.length) continue;
    for (const p of own) {
      if (!(await exists(path.join(SRC, p.meta.image)))) throw new Error(`${p.meta.path}: no share card at src${p.meta.image}, run scripts/comic-cards.mjs`);
    }
    // The nav row lands on the newest comic rather than the index, and keeps
    // the current marker on the index and every comic behind it.
    const row = NAV.find((n) => n.href === page.meta.path);
    if (row) {
      row.holds = [page.meta.path, ...own.map((p) => p.meta.path)];
      row.href = own[0].meta.path;
    }
    pages.push(...own);
  }
  for (const page of pages) page.meta.stats = diffstat(page.body);
  const stats = Object.fromEntries(pages.map((p) => [p.meta.path, p.meta.stats]));

  // Checks, before anything is written.
  const contrast = runContrast();
  const { hits, semicolons } = scan(pages);
  const built = new Date().toISOString().slice(0, 10);
  // Semicolons in prose still fail the build, they just do not get a line in
  // the footer, since nobody reading the site needs that level of detail.
  const checks = `Checks on this build: contrast ${contrast.passed} of ${contrast.total} pass. Forbidden terms ${hits.length - semicolons}. Pages ${pages.length}. Built ${built}.`;
  console.log(checks);
  if (contrast.passed !== contrast.total || hits.length) {
    for (const h of hits) console.error(`  FAIL ${h}`);
    for (const r of contrast.results.filter((r) => !r.ok)) console.error(`  FAIL contrast ${r.theme} ${r.label} ${r.ratio.toFixed(2)}:1`);
    throw new Error('checks failed, nothing written');
  }

  // Pass two: write.
  console.log('pages:');
  for (const page of pages) await writePage(page.meta, layout(page, stats, checks));
  console.log(`built ${path.relative(ROOT, OUT)}/`);
}

// A closed stdout (for example `npm run build | head`) must not kill a build
// halfway through writing dist/.
process.stdout.on('error', (e) => { if (e.code !== 'EPIPE') throw e; });

main().catch((e) => { console.error(e.message || e); process.exit(1); });
