// Renders the share card (og:image) from the mark and the masthead type.
// Usage: node scripts/share-card.mjs   ->  src/assets/share-card.png
// Needs a local Chrome; override with CHROME=/path/to/chrome.
import puppeteer from 'puppeteer-core';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const A = path.join(ROOT, 'src', 'assets');
const F = path.join(ROOT, 'src', 'fonts');
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const font = async (file) => `url(data:font/woff2;base64,${(await readFile(path.join(F, file))).toString('base64')}) format('woff2')`;
const mark = (await readFile(path.join(A, 'hitl-mark.svg'), 'utf8')).trim();

const html = `<!doctype html><meta charset="utf-8"><style>
@font-face { font-family: 'Commit Mono'; font-weight: 400; src: ${await font('commit-mono-latin-400-normal.woff2')}; }
@font-face { font-family: 'Commit Mono'; font-weight: 600; src: ${await font('commit-mono-latin-600-normal.woff2')}; }
html, body { margin: 0; }
body { width: 1200px; height: 630px; background: #fff; color: #000; font-family: 'Commit Mono', monospace; display: flex; align-items: center; gap: 72px; padding: 0 96px; box-sizing: border-box; }
svg { width: 360px; height: auto; flex: none; }
.t { display: flex; flex-direction: column; gap: 18px; }
.name { font-size: 64px; font-weight: 600; line-height: 1.1; }
.state { font-size: 28px; font-weight: 600; color: #1b4bd1; display: flex; align-items: center; gap: 14px; }
.state::before { content: ''; width: 18px; height: 18px; border-radius: 50%; background: currentColor; }
.line { font-size: 28px; color: #6b6b6b; line-height: 1.4; }
</style><body>${mark}<div class="t"><div class="name">Jamie Brown</div><div class="state">Open to new roles</div><div class="line">Senior software engineer, Orlando.<br>Remote or hybrid preferred.</div></div></body>`;

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const out = path.join(A, 'share-card.png');
await page.screenshot({ path: out });
await browser.close();
console.log(out);
