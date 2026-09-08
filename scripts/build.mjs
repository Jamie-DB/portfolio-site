// Builds ./dist from hand-authored page fragments in src/pages and the
// generated markdown in content/. No framework. Run with `npm run build`.
//
// The site is framed as a pull request. The masthead is the PR header, the
// nav is the files-changed list with real +/- counts, and the footer reports
// the checks this build ran. A failed check fails the build.
import { readFile, writeFile, mkdir, cp, readdir, rm, access } from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';
import { runContrast } from './contrast.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src');
const OUT = path.resolve(ROOT, process.env.OUT_DIR || 'dist');

const SITE = {
  name: 'Jamie Brown',
  // The pages.dev URL is a placeholder until Cloudflare assigns the real one.
  url: (process.env.SITE_URL || 'https://jamiebrown.pages.dev').replace(/\/$/, ''),
  repo: 'https://github.com/Jamie-DB/portfolio-site',
  buildlog: 'https://github.com/Jamie-DB/portfolio-site/blob/main/BUILDLOG.md',
};

// The PR state. Open means available. Flip to Merged when the role lands.
const STATE = {
  word: 'Open',
  line: 'Senior software engineer, Orlando. Remote or hybrid preferred.',
};

// Preview-only switches for side-by-side builds. Never set in production.
const MONO = process.env.MONO || '';       // '' | 'departure'
const THEME = process.env.THEME || '';     // '' | 'dark' | 'light'
const PALETTE = process.env.PALETTE || ''; // '' | 'colorblind'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/projects/', label: 'Projects' },
  { href: '/how-i-build/', label: 'How I build software now' },
  { href: '/ai-tooling-audit/', label: 'AI tooling audit' },
  { href: '/cv/', label: 'CV and contact' },
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
  [/\b(he|him|his|himself)\b/i, 'third-person voice on a first-person page'],
  [/\bJamie(?:'s|\u2019s|\s+(?!Brown\b))/, 'Jamie named in the third person rather than "I"'],
  // House style: September abbreviates to Sept, every other month to three
  // letters. Synced content is normalized in scripts/sync-sources.mjs.
  [/\bSep\b/, 'September abbreviated Sep rather than Sept'],
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

function nav(current, stats) {
  return NAV.map((n) => {
    const s = stats[n.href] || { add: 0, del: 0 };
    const parts = [s.add ? `<span class="plus">+${s.add}</span>` : '', s.del ? `<span class="minus">-${s.del}</span>` : ''].filter(Boolean);
    const stat = parts.length ? ` <span class="stat">${parts.join(' ')}</span>` : '';
    return n.href === current
      ? `<span aria-current="page">${esc(n.label)}${stat}</span>`
      : `<a href="${n.href}">${esc(n.label)}${stat}</a>`;
  }).join('\n      ');
}

function layout({ meta, body }, stats, checks) {
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
  <script>(function(){try{var d=document.documentElement,t=localStorage.getItem('theme'),p=localStorage.getItem('palette');if(t)d.setAttribute('data-theme',t);if(p)d.setAttribute('data-palette',p)}catch(e){}})();</script>
  <link rel="stylesheet" href="/css/site.css">
</head>
<body${bodyClass}>
  <div class="frame">
    <header class="pr">
      <p class="pr-title"><a class="name" href="/">${SITE.name}</a> <span class="state open">${STATE.word}</span></p>
      <p class="pr-line">${STATE.line}</p>
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
      <p>Diff colors default to red and green, the way the tools do it. The colorblind palette switches to blue and plum.</p>
    </footer>
  </div>
  <div class="controls" hidden>
    <button type="button" data-control="theme" aria-pressed="false">Dark mode</button>
    <button type="button" data-control="palette" aria-pressed="false">Colorblind palette</button>
  </div>
  <script src="/js/theme.js"></script>
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
function commits(html) {
  const parts = html.split(/(?=<h3>)/);
  return parts.map((part, i) => {
    if (i === 0) return part;
    const m = part.match(/^<h3>([\s\S]*?)<\/h3>\s*<p class="meta"><time>(.*?)<\/time>\s*([\s\S]*?)<\/p>/);
    if (!m) return part;
    const rest = part.slice(m[0].length);
    const cut = rest.search(/<h2|<\/div>/);
    const [inner, after] = cut < 0 ? [rest, ''] : [rest.slice(0, cut), rest.slice(cut)];
    return `<article class="commit">\n<p class="when">${m[2]}</p>\n<h3>${m[1]}</h3>\n<p class="meta">${m[3]}</p>${inner}</article>\n${after}`;
  }).join('');
}

async function generated() {
  const audit = await readFile(path.join(ROOT, 'content', 'ai-tooling-audit.md'), 'utf8');
  const cv = await readFile(path.join(ROOT, 'content', 'cv.md'), 'utf8').catch(() => '');
  return {
    'audit-date': audit.match(/^Last audited: (.+)$/m)[1],
    'audit-daily': auditRows(mdTable(audit, 'Use daily'), 'ctx', false),
    'audit-adopted': auditRows(mdTable(audit, 'Just adopted'), 'add', true),
    'audit-skipped': auditRows(mdTable(audit, 'Evaluated and skipped'), 'del', true),
    'cv': cv ? commits(marked.parse(cv)) : '',
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
    for (const [re, why] of FORBIDDEN) {
      if (re.test(text)) hits.push(`${p.meta.path}: ${why} (${re})`);
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

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  for (const dir of ['css', 'fonts', 'js', 'assets']) {
    const from = path.join(SRC, dir);
    if (await exists(from)) await cp(from, path.join(OUT, dir), { recursive: true });
  }
  // Cloudflare Pages reads _headers from the output directory.
  await writeFile(path.join(OUT, '_headers'), [
    '/fonts/*',
    '  Cache-Control: public, max-age=31536000, immutable',
    '/*',
    '  X-Content-Type-Options: nosniff',
    '  Referrer-Policy: strict-origin-when-cross-origin',
    '',
  ].join('\n'));

  // Pass one: render every page body so the nav can carry real counts.
  const values = await generated();
  const pagesDir = path.join(SRC, 'pages');
  const pages = [];
  for (const file of (await readdir(pagesDir)).filter((f) => f.endsWith('.html')).sort()) {
    const page = parseFragment(await readFile(path.join(pagesDir, file), 'utf8'), file);
    page.body = fill(page.body, values);
    page.meta.stats = diffstat(page.body);
    pages.push(page);
  }
  const stats = Object.fromEntries(pages.map((p) => [p.meta.path, p.meta.stats]));

  // Checks, before anything is written.
  const contrast = runContrast();
  const { hits, semicolons } = scan(pages);
  const built = new Date().toISOString().slice(0, 10);
  const checks = `Checks on this build: contrast ${contrast.passed} of ${contrast.total} pass. Forbidden terms ${hits.length - semicolons}. Semicolons in prose ${semicolons}. Pages ${pages.length}. Built ${built}.`;
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
