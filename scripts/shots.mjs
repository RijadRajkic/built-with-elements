// Render full-page screenshots of every template's email + document into
// docs/screenshots/ using system Chromium (2× scale) + ImageMagick trim.
// Usage: npm run shots   (run `npm run build` first)
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

const SLUGS = ['rate-confirmation', 'event-ticket', 'invoice-receipt', 'order-confirmation', 'cadence', 'spore', 'nocturne', 'mise'];

for (const slug of SLUGS) {
  for (const mode of ['email', 'page', 'document']) {
    const src = join(ROOT, 'dist', slug, `${mode}.html`);
    if (!existsSync(src)) {
      console.warn(`skip ${slug}/${mode}: build first`);
      continue;
    }
    const out = join(OUT, `${slug}-${mode}.png`);
    execFileSync(
      CHROME,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--hide-scrollbars',
        '--force-device-scale-factor=2',
        '--window-size=680,4600',
        `--screenshot=${out}`,
        `file://${src}`,
      ],
      { stdio: 'ignore' },
    );
    execFileSync(MAGICK, [out, '-trim', '+repage', out], { stdio: 'ignore' });
    console.log(`shot ${slug}/${mode} → docs/screenshots/${slug}-${mode}.png`);
  }
}
