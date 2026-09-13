// Renders a share card (og:image) for each comic. A feed crops a link image
// to about 1.91:1, and the comics are 16:9 with the signature in the bottom
// corner, so a raw comic loses its edges on LinkedIn and the rest. Each card
// is the drawing letterboxed to 1200 by 630, with the bars filled by
// stretching the drawing's own edge columns, so a wall stays a wall and a
// floor stays a floor and the card reads as a slightly wider frame.
// Usage: node scripts/comic-cards.mjs   ->  src/assets/og-comic-<name>.png
// Re-run when a comic is added or replaced. Needs a local Chrome; override
// with CHROME=/path/to/chrome.
import puppeteer from 'puppeteer-core';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const A = path.join(ROOT, 'src', 'assets');
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

for (const file of (await readdir(A)).filter((f) => /^comic-.*\.png$/.test(f)).sort()) {
  const data = `data:image/png;base64,${(await readFile(path.join(A, file))).toString('base64')}`;
  await page.setContent(`<!doctype html><meta charset="utf-8"><style>
html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
canvas { display: block; }
</style><body><canvas width="1200" height="630"></canvas><img src="${data}" hidden></body>`);
  await page.evaluate(() => new Promise((done) => {
    const img = document.querySelector('img');
    const paint = () => {
      const ctx = document.querySelector('canvas').getContext('2d');
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const inner = Math.round((630 * w) / h);
      const bar = Math.round((1200 - inner) / 2);
      ctx.drawImage(img, 0, 0, w, h, bar, 0, inner, 630);
      ctx.drawImage(img, 0, 0, 1, h, 0, 0, bar, 630);
      ctx.drawImage(img, w - 1, 0, 1, h, bar + inner, 0, 1200 - bar - inner, 630);
      done();
    };
    if (img.complete) paint(); else img.onload = paint;
  }));
  const out = path.join(A, `og-${file}`);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log(path.relative(ROOT, out));
}
await browser.close();
