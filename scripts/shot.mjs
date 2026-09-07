// Screenshot a built page with real device emulation, for design review.
// Usage: node scripts/shot.mjs <url> <out.png> [width] [dark] [fullpage]
// Needs a local Chrome; override with CHROME=/path/to/chrome.
import puppeteer from 'puppeteer-core';

const [url, out, width = '1280', dark = '', full = 'full'] = process.argv.slice(2);
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: Number(width), height: 900, deviceScaleFactor: 2, isMobile: Number(width) < 600, hasTouch: Number(width) < 600 });
if (dark === 'dark') await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
await page.goto(url, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out, fullPage: full === 'full' });
await browser.close();
console.log(out);
