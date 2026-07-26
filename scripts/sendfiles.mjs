// Produce paste-ready copies of each email with images pointing at a public CDN,
// plus a small harness page with a "Copy email" button per template.
//
// A real inbox can't load file:// or localhost images, so every relative asset is
// rewritten to jsDelivr, pinned to a commit that is already pushed. Serving from
// jsDelivr (not raw.githubusercontent) matters: raw serves images as text/plain.
//
// The harness copies the email markup to the clipboard as a text/html flavour,
// which is what Gmail reads on paste — so the tables arrive intact rather than as
// Chrome's re-serialisation of a rendered selection. The button lives on the
// harness page, never inside the copied payload.
//
// Output is local-only test material and is intentionally not committed.
// Usage: npm run sendfiles          (after committing + pushing the assets)
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = 'RijadRajkic/built-with-elements';

const TEMPLATES = [
  { slug: 'cadence', name: 'Cadence', note: 'Year in Motion recap', accent: '#FF5A1F' },
  { slug: 'spore', name: 'SPORE', note: 'fungi field-guide deck', accent: '#B4623A' },
  { slug: 'nocturne', name: 'Nocturne', note: 'exhibition invite', accent: '#A8894F' },
  { slug: 'mise', name: 'Mise', note: 'recipe of the week', accent: '#B95E2E' },
  { slug: 'rate-confirmation', name: 'Rate Confirmation', note: 'Northwind Freight', accent: '#3E5C6B' },
  { slug: 'event-ticket', name: 'Event Ticket', note: 'Nightshift', accent: '#FF2D78' },
  { slug: 'invoice-receipt', name: 'Invoice + Receipt', note: 'Loomly Studio', accent: '#2F5DA8' },
  { slug: 'order-confirmation', name: 'Order + Packing', note: 'Trailhead Goods', accent: '#2F6B4F' },
];

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
const built = [];
for (const t of TEMPLATES) {
  const src = join(ROOT, 'dist', t.slug, 'email.html');
  if (!existsSync(src)) { console.warn(`skip ${t.slug}: build first`); continue; }
  const html = readFileSync(src, 'utf8').replaceAll('src="assets/', `src="${CDN}`);
  writeFileSync(join(ROOT, 'dist', t.slug, 'email-send.html'), html);
  const n = (html.split(CDN).length - 1);
  built.push({ ...t, images: n });
  console.log(`${t.slug.padEnd(20)} ${String(n).padStart(2)} image(s) → CDN`);
}

const cards = built.map((t) => `      <article class="card" style="--accent:${t.accent}">
        <div class="meta">
          <h2>${t.name}</h2>
          <p>${t.note} · ${t.images} image${t.images === 1 ? '' : 's'} on CDN</p>
        </div>
        <div class="actions">
          <button type="button" data-slug="${t.slug}">Copy email</button>
          <a href="dist/${t.slug}/email-send.html" target="_blank" rel="noreferrer">preview</a>
        </div>
      </article>`).join('\n');

writeFileSync(join(ROOT, 'copy-emails.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Copy email → Gmail</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 40px 24px 64px; background: #131313; color: #ECE7DF;
         font: 16px/1.55 ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  main { max-width: 720px; margin: 0 auto; }
  h1 { margin: 0 0 6px; font-size: 26px; letter-spacing: -0.01em; }
  .lede { margin: 0 0 4px; color: #A8A29B; }
  .pin { margin: 0 0 32px; color: #6F6A64; font-size: 14px; font-family: ui-monospace, monospace; }
  .card { display: flex; align-items: center; gap: 20px; padding: 18px 20px; margin-bottom: 12px;
          background: #1B1B1B; border: 1px solid #2A2A2A; border-left: 3px solid var(--accent);
          border-radius: 8px; }
  .meta { flex: 1; min-width: 0; }
  .meta h2 { margin: 0; font-size: 17px; font-weight: 600; }
  .meta p { margin: 2px 0 0; color: #8E8880; font-size: 14px; }
  .actions { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
  button { padding: 9px 18px; font: inherit; font-size: 15px; font-weight: 600; color: #14100C;
           background: var(--accent); border: 0; border-radius: 6px; cursor: pointer; min-width: 124px; }
  button:hover { filter: brightness(1.08); }
  button.done { background: #4E9A61; color: #08140C; }
  button.fail { background: #B3453C; color: #fff; }
  .actions a { color: #7E7873; font-size: 14px; text-decoration: none; border-bottom: 1px solid #3A3A3A; }
  .actions a:hover { color: #ECE7DF; }
  ol { margin: 34px 0 0; padding-left: 22px; color: #8E8880; font-size: 14.5px; }
  ol li { margin-bottom: 5px; }
  kbd { padding: 1px 6px; background: #262626; border: 1px solid #363636; border-radius: 4px;
        font: 13px ui-monospace, monospace; color: #C9C4BD; }
</style>
</head>
<body>
  <main>
    <h1>Copy email → Gmail</h1>
    <p class="lede">Copies the real email markup to your clipboard as rich HTML. Paste straight into a Gmail compose window.</p>
    <p class="pin">images pinned to ${sha.slice(0, 7)}</p>
${cards}
    <ol>
      <li>Click <strong>Copy email</strong>.</li>
      <li>Open a Gmail compose window and click into the message body.</li>
      <li>Paste with <kbd>Ctrl</kbd>+<kbd>V</kbd>, then send it to yourself.</li>
      <li>Open what arrives on desktop <em>and</em> phone — that is the real test.</li>
    </ol>
  </main>
<script>
  document.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-slug]');
    if (!button) return;
    const label = button.dataset.label || (button.dataset.label = button.textContent);
    try {
      const html = await fetch('dist/' + button.dataset.slug + '/email-send.html').then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      });
      // Copy the body only. Pasting a whole document makes Gmail render the
      // <head> title as a line of body text above the email.
      const body = new DOMParser().parseFromString(html, 'text/html').body.innerHTML;
      // text/html is the flavour Gmail reads on paste; text/plain keeps a sane
      // fallback for anything that only accepts plain text.
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([body], { type: 'text/html' }),
          'text/plain': new Blob([body], { type: 'text/plain' }),
        }),
      ]);
      button.textContent = 'Copied \\u2713';
      button.className = 'done';
    } catch (error) {
      button.textContent = 'Failed';
      button.className = 'fail';
      console.error('copy failed', error);
    }
    setTimeout(() => { button.textContent = label; button.className = ''; }, 2200);
  });
</script>
</body>
</html>
`);
console.log(`\npinned to ${sha.slice(0, 7)}`);
console.log('open http://localhost:8794/copy-emails.html → Copy email → paste into Gmail');
