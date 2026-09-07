// Builds ./dist from hand-authored page fragments in src/pages and the
// generated markdown in content/. No framework. Run with `npm run build`.
import { readFile, writeFile, mkdir, cp, readdir, rm, access } from 'node:fs/promises';
import path from 'node:path';

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
  <script>(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}})();</script>
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
      <button class="theme-toggle" type="button" hidden>Dark mode</button>
    </footer>
  </div>
  <script src="/js/theme.js"></script>
</body>
</html>
`;
}

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function writePage(meta, html) {
  const dir = path.join(OUT, meta.path);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
  console.log(`  ${meta.path}`);
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  for (const dir of ['css', 'fonts', 'js', 'assets']) {
    const from = path.join(SRC, dir);
    if (await exists(from)) await cp(from, path.join(OUT, dir), { recursive: true });
  }

  console.log('pages:');
  const pagesDir = path.join(SRC, 'pages');
  for (const file of (await readdir(pagesDir)).filter((f) => f.endsWith('.html')).sort()) {
    const page = parseFragment(await readFile(path.join(pagesDir, file), 'utf8'), file);
    await writePage(page.meta, layout(page));
  }

  console.log(`built ${path.relative(ROOT, OUT)}/`);
}

main().catch((e) => { console.error(e); process.exit(1); });
