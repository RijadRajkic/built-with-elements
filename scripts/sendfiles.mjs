// Produce paste-ready copies of each email with images pointing at a public CDN.
// A real inbox can't load file:// or localhost images, so every relative asset is
// rewritten to jsDelivr, pinned to a commit that is already pushed. Serving from
// jsDelivr (not raw.githubusercontent) matters: raw serves images as text/plain.
// Output is local-only test material and is intentionally not committed.
// Usage: npm run sendfiles          (after committing + pushing the assets)
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = 'RijadRajkic/built-with-elements';
const SLUGS = ['rate-confirmation', 'event-ticket', 'invoice-receipt', 'order-confirmation', 'cadence', 'spore', 'nocturne', 'mise'];

const sha = process.argv[2] || execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT }).toString().trim();

// Refuse to pin to a commit the CDN can't see yet — that would silently produce
// files whose images 404 in the inbox.
try {
  execFileSync('git', ['merge-base', '--is-ancestor', sha, '@{upstream}'], { cwd: ROOT, stdio: 'ignore' });
} catch {
  console.error(`refusing to pin to ${sha.slice(0, 7)} — it isn't on the remote yet. Push first.`);
  process.exit(1);
}

const CDN = `https://cdn.jsdelivr.net/gh/${REPO}@${sha}/design/assets/`;
for (const slug of SLUGS) {
  const src = join(ROOT, 'dist', slug, 'email.html');
  if (!existsSync(src)) { console.warn(`skip ${slug}: build first`); continue; }
  const html = readFileSync(src, 'utf8').replaceAll('src="assets/', `src="${CDN}`);
  const out = join(ROOT, 'dist', slug, 'email-send.html');
  writeFileSync(out, html);
  const n = (html.match(new RegExp(CDN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  console.log(`${slug.padEnd(20)} ${String(n).padStart(2)} image(s) → CDN`);
}
console.log(`\npinned to ${sha.slice(0, 7)}`);
console.log('open http://localhost:8794/dist/<slug>/email-send.html → Ctrl+A, Ctrl+C → paste into Gmail');
