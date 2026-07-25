// Print each template's document-mode HTML to a single full-bleed PDF whose page
// is sized exactly to the design — so the PDF matches the on-screen look instead
// of floating on a US-Letter sheet with gray margins.
//
// The documents use full-bleed background bands with the content centered at a
// narrower `contentWidth`. Rendering at a wide viewport leaves the design adrift
// in a huge padded field, so we render each doc AT its own contentWidth (read
// from the HTML), force the body to that width, take the full rendered height,
// and print one content-sized page. Zero deps (no puppeteer): system Chromium +
// ImageMagick.
import { execFileSync } from 'node:child_process';
import { HEADLESS_ARGS, HEADLESS_ENV } from './chrome-env.mjs';
import { renameSync } from 'node:fs';
import { existsSync, readFileSync, writeFileSync, rmSync, mkdtempSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');

const CHROME =
  ['/usr/bin/chromium', '/usr/bin/google-chrome-stable', '/usr/bin/google-chrome', '/usr/bin/chromium-browser'].find(
    existsSync,
  ) || 'chromium';
const MAGICK = ['/usr/bin/magick', '/usr/bin/convert'].find(existsSync) || 'magick';

const ALL_SLUGS = ['rate-confirmation', 'event-ticket', 'invoice-receipt', 'order-confirmation', 'cadence', 'spore', 'nocturne', 'mise'];
// `node scripts/pdf.mjs spore nocturne` re-renders just those; no args = all.
const picked = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const SLUGS = picked.length ? ALL_SLUGS.filter((s) => picked.includes(s)) : ALL_SLUGS;

// A fresh profile per launch: sharing one --user-data-dir across sequential
// headless runs trips a GLib-GIO thread-pool assertion when a desktop Chromium
// is already running, which kills the whole pdf pass.
const PROFILES = [];
const chrome = (extra) => {
  const profile = mkdtempSync(join(tmpdir(), 'bwe-pdf-'));
  PROFILES.push(profile);
  return execFileSync(
    CHROME,
    ['--headless=new', ...HEADLESS_ARGS, '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
      `--user-data-dir=${profile}`, ...extra],
    { stdio: ['ignore', 'pipe', 'ignore'], env: HEADLESS_ENV },
  );
};
const magick = (args) => execFileSync(MAGICK, args, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();

// the design's content width = the most frequent max-width in the document HTML
function contentWidth(html) {
  const tally = new Map();
  for (const m of html.matchAll(/max-width:\s?(\d+)px/g)) {
    const w = +m[1];
    tally.set(w, (tally.get(w) || 0) + 1);
  }
  let bestW = 800, bestN = -1;
  for (const [w, n] of tally) if (n > bestN || (n === bestN && w > bestW)) { bestW = w; bestN = n; }
  return bestW;
}

for (const slug of SLUGS) {
  const dir = join(DIST, slug);
  const src = join(dir, 'document.html');
  const out = join(dir, 'document.pdf');
  if (!existsSync(src)) {
    console.warn(`skip ${slug}: ${src} not found (run npm run build first)`);
    continue;
  }
  const shot = join(dir, '_measure.png');
  const tmp = join(dir, '_print.html');
  const html = readFileSync(src, 'utf8');
  const W = contentWidth(html);
  try {
    // 1) force the body to contentWidth, render, take the FULL page height + top-left colour
    const base = `<style id="pdf-fit">html,body{margin:0!important;padding:0!important;width:${W}px!important}` +
      `*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}</style>`;
    writeFileSync(tmp, html.replace('</head>', `${base}</head>`));
    chrome(['--force-device-scale-factor=1', `--window-size=${W},14000`, '--virtual-time-budget=6000', `--screenshot=${shot}`, `file://${tmp}`]);
    const info = magick([shot, '-format', '%h %[pixel:p{3,3}]', 'info:']); // full height, no vertical trim (keeps design padding)
    const m = info.match(/^(\d+)\s+s?rgba?\((\d+),(\d+),(\d+)/);
    if (!m) { console.warn(`skip ${slug}: measure failed (${info})`); continue; }
    let H = +m[1] + 120; // bg-matched buffer absorbs print sub-pixel rounding (else a 1px overflow = whole blank page)
    const bg = `rgb(${m[2]},${m[3]},${m[4]})`;
    // guard: if capture was viewport-capped, fall back to trimmed content height + breathing room
    if (H >= 13990) {
      const th = magick([shot, '-fuzz', '2%', '-trim', '+repage', '-format', '%h', 'info:']);
      H = (+th || 1400) + 96;
    }

    // 2) inject the content-sized @page and print a single full-bleed page
    const sheet = `<style id="pdf-fit">@page{size:${W}px ${H}px;margin:0}` +
      `html,body{margin:0!important;padding:0!important;width:${W}px!important;background:${bg}!important}` +
      `*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}</style>`;
    writeFileSync(tmp, html.replace('</head>', `${sheet}</head>`));
    chrome(['--no-pdf-header-footer', '--virtual-time-budget=6000', '--virtual-time-budget=6000', `--print-to-pdf=${out}`, `file://${tmp}`]);
    // Chrome can emit a trailing blank overflow page; every template is one
    // continuous document, so flatten to the single content page.
    const GS = ['/usr/bin/gs', '/usr/bin/ghostscript'].find(existsSync);
    if (GS) {
      const one = `${out}.1`;
      execFileSync(GS, ['-q', '-dNOPAUSE', '-dBATCH', '-sDEVICE=pdfwrite', '-dFirstPage=1', '-dLastPage=1', `-sOutputFile=${one}`, out], { stdio: ['ignore', 'pipe', 'ignore'] });
      renameSync(one, out);
    }
    console.log(`pdf ${slug} → document.pdf  (${W}×${H}px full-bleed)`);
  } finally {
    rmSync(shot, { force: true });
    rmSync(tmp, { force: true });
  }
}
for (const profile of PROFILES) rmSync(profile, { recursive: true, force: true });
