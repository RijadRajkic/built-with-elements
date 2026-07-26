// Render each email the way a stripping client (Gmail) would show it.
// Gmail drops the <head>/<style> block entirely and removes the CSS properties
// below from inline styles, so anything that depends on them collapses. Running
// the built emails through this is how we catch a layout that only holds because
// of CSS no mail client honours.
// Usage: npm run build && npm run emailsim
import { execFileSync } from 'node:child_process';
import { HEADLESS_ARGS, HEADLESS_ENV } from './chrome-env.mjs';
import { existsSync, mkdirSync, readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'qa', 'gmail-sim');
mkdirSync(OUT, { recursive: true });

const CHROME = ['/usr/bin/chromium', '/usr/bin/google-chrome-stable', '/usr/bin/chromium-browser'].find(existsSync) || 'chromium';
const MAGICK = ['/usr/bin/magick', '/usr/bin/convert'].find(existsSync) || 'magick';

const SLUGS = ['rate-confirmation', 'event-ticket', 'invoice-receipt', 'order-confirmation', 'cadence', 'spore', 'nocturne', 'mise'];

// Properties Gmail removes from inline style attributes.
const STRIPPED = /(?:^|;)\s*(?:display\s*:\s*(?:grid|inline-grid|flex|inline-flex)|(?:grid|place|align|justify)-[a-z-]*\s*:[^;]*|gap\s*:[^;]*|column-gap\s*:[^;]*|row-gap\s*:[^;]*|position\s*:\s*(?:absolute|fixed|sticky)|transform\s*:(?!\s*uppercase|\s*lowercase|\s*capitalize)[^;]*|animation[a-z-]*\s*:[^;]*)/gi;

function gmailify(html) {
  html = html.replace(/<!--.*?-->/gs, '');                    // Outlook conditionals never reach Gmail
  html = html.replace(/<style[^>]*>.*?<\/style>/gs, '');      // <style> block dropped
  html = html.replace(/<link[^>]*>/gi, '');                   // webfonts dropped
  html = html.replace(/style="([^"]*)"/gi, (m, decls) => {
    const kept = decls.replace(STRIPPED, '').replace(/^;+/, '').trim();
    return kept ? `style="${kept}"` : '';
  });
  return html;
}

let stripCount = 0;
for (const slug of SLUGS) {
  const src = join(ROOT, 'dist', slug, 'email.html');
  if (!existsSync(src)) { console.warn(`skip ${slug}: build first`); continue; }
  const original = readFileSync(src, 'utf8');
  const before = (original.match(STRIPPED) || []).length;
  stripCount += before;
  const sim = join(ROOT, 'dist', slug, 'email-gmail.html');
  writeFileSync(sim, gmailify(original));

  // Two widths: 680 is a phone/narrow pane, 1400 is a desktop reading pane where
  // a band that bleeds past the card width becomes obvious.
  for (const [suffix, width] of [['', 680], ['-wide', 1400]]) {
  const png = join(OUT, `${slug}${suffix}.png`);
  execFileSync(CHROME, ['--headless=new', ...HEADLESS_ARGS, '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'emailsim-'))}`,
    '--force-device-scale-factor=1', `--window-size=${width},6000`, '--virtual-time-budget=8000',
    `--screenshot=${png}`, `file://${sim}`], { stdio: 'ignore', env: HEADLESS_ENV });
  execFileSync(MAGICK, [png, '-trim', '+repage', png], { stdio: 'ignore' });
  const dims = execFileSync(MAGICK, ['identify', '-format', '%wx%h', png]).toString();
  console.log(`${(slug + suffix).padEnd(26)} ${String(before).padStart(3)} declaration(s) stripped → ${dims}`);
  }
}
console.log(`\n${stripCount} total stripped declarations across 8 emails`);
console.log(`sims → dist/*/email-gmail.html   shots → qa/gmail-sim/`);
