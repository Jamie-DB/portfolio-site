// Checks every ink-on-paper pairing the stylesheet uses, in both themes and
// both palettes, against WCAG AA. Run directly, or imported by the build so
// the result lands in every page's footer and a failure stops the build.
const themes = {
  light: { paper: '#ffffff', ink: '#000000', ink2: '#6b6b6b',
    rg: { add: '#177a38', addBg: '#eaf6ee', del: '#b3261e', delBg: '#fdeeed' },
    cb: { add: '#1b4bd1', addBg: '#eef3ff', del: '#8e2c5a', delBg: '#fbeff5' } },
  dark: { paper: '#000000', ink: '#f2f2f2', ink2: '#9a9a9a',
    rg: { add: '#6fd18a', addBg: '#0d2616', del: '#f28b82', delBg: '#2c1210' },
    cb: { add: '#8aa6ff', addBg: '#0b1533', del: '#e393bf', delBg: '#2a0f1d' } },
};
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

export function runContrast() {
  const results = [];
  for (const [name, t] of Object.entries(themes)) {
    const checks = [
      ['body text on paper', t.ink, t.paper, 4.5],
      ['meta text on paper', t.ink2, t.paper, 4.5],
    ];
    for (const [pal, c] of [['red/green', t.rg], ['colorblind', t.cb]]) {
      checks.push([`${pal} + marker on add bg`, c.add, c.addBg, 3],
        [`${pal} - marker on del bg`, c.del, c.delBg, 3],
        [`${pal} body text on add bg`, t.ink, c.addBg, 4.5],
        [`${pal} body text on del bg`, t.ink, c.delBg, 4.5],
        [`${pal} meta text on add bg`, t.ink2, c.addBg, 4.5],
        [`${pal} + marker on paper`, c.add, t.paper, 3],
        [`${pal} - marker on paper`, c.del, t.paper, 3]);
    }
    for (const [label, fg, bg, min] of checks) {
      const r = ratio(fg, bg);
      results.push({ theme: name, label, ratio: r, min, ok: r >= min });
    }
  }
  return { results, passed: results.filter((r) => r.ok).length, total: results.length };
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())) {
  const { results, passed, total } = runContrast();
  for (const r of results) console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.theme.padEnd(5)} ${r.label.padEnd(36)} ${r.ratio.toFixed(2)}:1 (min ${r.min})`);
  console.log(`${passed}/${total} pass`);
  process.exit(passed === total ? 0 : 1);
}
