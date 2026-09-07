// Builds ./dist from hand-authored page fragments in src/pages and the
// generated markdown in content/. No framework. Run with `npm run build`.
import { readFile, writeFile, mkdir, cp, readdir, rm, access } from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';

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

// Preview-only switches for side-by-side builds. Never set in production.
const MONO = process.env.MONO || '';   // '' | 'departure'
const THEME = process.env.THEME || ''; // '' | 'dark' | 'light'
const PALETTE = process.env.PALETTE || ''; // '' | 'colorblind'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/projects/', label: 'Projects' },
  { href: '/how-i-build/', label: 'How I build software now' },
  { href: '/ai-tooling-audit/', label: 'AI tooling audit' },
  { href: '/cv/', label: 'CV and contact' },
];

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
  return { meta, body: m[2] };
}

function nav(current) {
  return NAV.map((n) =>
    n.href === current
      ? `<span aria-current="page">${esc(n.label)}</span>`
      : `<a href="${n.href}">${esc(n.label)}</a>`,
  ).join('\n      ');
}

function layout({ meta, body }) {
  const home = meta.path === '/';
  const title = home ? `${SITE.name}, senior software engineer` : `${meta.title} - ${SITE.name}`;
  const url = SITE.url + meta.path;
  const built = new Date().toISOString().slice(0, 10);
  const attrs = [
    THEME ? ` data-theme="${THEME}"` : '',
    PALETTE ? ` data-palette="${PALETTE}"` : '',
    MONO ? ` data-mono="${MONO}"` : '',
  ].join('');
  return `<!doctype html>
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
<body>
  <div class="frame">
    <header class="masthead">
      <a class="name" href="/">${SITE.name}</a>
      <nav class="site-nav" aria-label="Site">
      ${nav(meta.path)}
      </nav>
    </header>
    <main id="main">
${body.trim()}
    </main>
    <footer class="colophon">
      <p>Built with Claude Code and reviewed by me. <a href="${SITE.repo}">Source</a> and <a href="${SITE.buildlog}">build log</a> on GitHub. Last built ${built}.</p>
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
`;
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

async function generated() {
  const audit = await readFile(path.join(ROOT, 'content', 'ai-tooling-audit.md'), 'utf8');
  const cv = await readFile(path.join(ROOT, 'content', 'cv.md'), 'utf8').catch(() => '');
  return {
    'audit-date': audit.match(/^Last audited: (.+)$/m)[1],
    'audit-daily': auditRows(mdTable(audit, 'Use daily'), 'ctx', false),
    'audit-adopted': auditRows(mdTable(audit, 'Just adopted'), 'add', true),
    'audit-skipped': auditRows(mdTable(audit, 'Evaluated and skipped'), 'del', true),
    'cv': cv ? marked.parse(cv) : '',
  };
}

function fill(body, values) {
  return body.replace(/\{\{([a-z-]+)\}\}/g, (m, key) => {
    if (!(key in values)) throw new Error(`unknown placeholder ${m}`);
    return values[key];
  });
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
  console.log(`  ${meta.path}`);
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

  console.log('pages:');
  const values = await generated();
  const pagesDir = path.join(SRC, 'pages');
  for (const file of (await readdir(pagesDir)).filter((f) => f.endsWith('.html')).sort()) {
    const page = parseFragment(await readFile(path.join(pagesDir, file), 'utf8'), file);
    page.body = fill(page.body, values);
    await writePage(page.meta, layout(page));
  }

  console.log(`built ${path.relative(ROOT, OUT)}/`);
}

main().catch((e) => { console.error(e); process.exit(1); });
