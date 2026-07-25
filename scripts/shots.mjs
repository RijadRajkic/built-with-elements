// Render screenshots of every template into docs/screenshots/.
//   email / page → system Chromium full-page capture (2× scale) + trim
//   document     → rasterised straight from the generated PDF (gs), so the
//                  README shows the exact print artifact, not a floating render.
// Usage: npm run build && npm run pdf && npm run shots
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'docs', 'screenshots');
mkdirSync(OUT, { recursive: true });

const CHROME =
  ['/usr/bin/chromium', '/usr/bin/google-chrome-stable', '/usr/bin/google-chrome', '/usr/bin/chromium-browser'].find(
    existsSync,
  ) || 'chromium';
const MAGICK = ['/usr/bin/magick', '/usr/bin/convert'].find(existsSync) || 'magick';
const GS = ['/usr/bin/gs', '/usr/bin/ghostscript'].find(existsSync);

const SLUGS = ['rate-confirmation', 'event-ticket', 'invoice-receipt', 'order-confirmation', 'cadence', 'spore', 'nocturne', 'mise'];

for (const slug of SLUGS) {
  for (const mode of ['email', 'page', 'document']) {
    const out = join(OUT, `${slug}-${mode}.png`);

    if (mode === 'document') {
      const pdf = join(ROOT, 'dist', slug, 'document.pdf');
      if (existsSync(pdf) && GS) {
        execFileSync(GS, ['-q', '-dNOPAUSE', '-dBATCH', '-sDEVICE=png16m', '-r150', '-dFirstPage=1', '-dLastPage=1', `-sOutputFile=${out}`, pdf], { stdio: 'ignore' });
        execFileSync(MAGICK, [out, '-trim', '+repage', out], { stdio: 'ignore' });
        console.log(`shot ${slug}/document → from PDF`);
        continue;
      }
    }

    const src = join(ROOT, 'dist', slug, `${mode}.html`);
    if (!existsSync(src)) { console.warn(`skip ${slug}/${mode}: build first`); continue; }
    execFileSync(
      CHROME,
      ['--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=2',
        `--window-size=${mode === 'page' ? 1024 : 680},4600`, '--virtual-time-budget=6000', `--screenshot=${out}`, `file://${src}`],
      { stdio: 'ignore' },
    );
    execFileSync(MAGICK, [out, '-trim', '+repage', out], { stdio: 'ignore' });
    console.log(`shot ${slug}/${mode} → docs/screenshots/${slug}-${mode}.png`);
  }
}
