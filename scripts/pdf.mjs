// Print each template's document-mode HTML to a PDF using the system Chromium
// headless — no puppeteer dependency. US Letter is Chrome's print default.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');

const CHROME =
  ['/usr/bin/chromium', '/usr/bin/google-chrome-stable', '/usr/bin/google-chrome', '/usr/bin/chromium-browser'].find(
    existsSync,
  ) || 'chromium';

const SLUGS = ['rate-confirmation', 'event-ticket', 'invoice-receipt', 'order-confirmation'];

for (const slug of SLUGS) {
  const src = join(DIST, slug, 'document.html');
  const out = join(DIST, slug, 'document.pdf');
  if (!existsSync(src)) {
    console.warn(`skip ${slug}: ${src} not found (run npm run build first)`);
    continue;
  }
  execFileSync(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-pdf-header-footer',
      `--print-to-pdf=${out}`,
      `file://${src}`,
    ],
    { stdio: 'ignore' },
  );
  console.log(`pdf ${slug} → document.pdf`);
}
