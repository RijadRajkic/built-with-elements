# Grind handoff / implementation plan — Built with Elements

**Written:** 2026-07-24 00:52 CEST · **Build armed for:** 03:33 CEST (fresh 5h window)
**Owner identity:** rijadrajkic / rijadrajkic@gmail.com · GitHub **RijadRajkic** (personal, active)

## Goal (the "full shabang")
Rebuild the 4 approved Claude Design templates in `@unlayer/react-elements` so each
renders **three ways from one component tree — email, web page, print PDF**. Ship a
**public GitHub repo** (`RijadRajkic/built-with-elements`) with a README + screenshots,
open a **PR** with the implementation, end with a **/qa-test** artifact. Target:
Unlayer "Build with Elements" challenge (#BuiltWithElements, deadline **Jul 31 2026**).

## Source of truth (already staged in this repo)
- `design/Template_Kit.dc.html` — **READ IN FULL before coding.** One board, 4 templates,
  each laid out as **Email artboard · Print PDF artboard · Spec sheet** with band-by-band
  `<!-- BAND n -->` comment dividers and per-template spec sheets (exact palette, type
  scale, spacing, blocks-used, assets). This is a faithful, buildable spec.
- `design/assets/` — 13 files: per-brand SVG marks (northwind/nightshift/loomly/trailhead,
  each 2 variants), `paid-stamp.svg`, `check.svg`, QR PNGs (`qr-nightshift`, `qr-track`,
  `qr-return`). Use these as `Image` blocks — do NOT redraw as geometry.
- `design/_ds/` — Thin Air Studios design system (Rijad's studio brand, attached to the
  project). Reference for token discipline only; the 4 templates use their OWN per-brand
  palettes below, not the TAS particle palette.
- Fonts: **Space Grotesk** (display), **Inter** (body), **JetBrains Mono** (data/labels).

## The 4 templates (line ranges in the .dc.html; brand · palette · accent)
1. **Rate Confirmation** — Northwind Freight · navy `#17242E` on kraft `#ECE6D8`, white card ·
   vermilion `#C6412A` (action only). "Signed manifest." ~L32–546.
2. **Event Ticket** — Nightshift · near-black `#0B0B10`/`#141018`, white · magenta `#FF2D78`.
   "After-dark," QR stub on a light card. ~L549–853.
3. **Invoice + Receipt** — Loomly Studio · cool white, ink `#111418` · ink-blue `#1E3A5F`.
   "Swiss ledger," paid amount is hero. ~L856–1200.
4. **Order Confirmation + Packing Slip** — Trailhead Goods · warm off-white, forest `#2F5D50` ·
   rust `#C7622B`. "Trail retail," PDF strips prices + adds pack checklist. ~L1204–end.

## Architecture
```
built-with-elements/
  package.json         react, react-dom, @unlayer/react-elements, tsx, typescript (+ puppeteer for PDF)
  tsconfig.json        jsx: react-jsx
  src/
    lib/
      root.tsx         <Root mode> → picks <Email>|<Page>|<Document> (mode sets render target)
      render.ts        renderEmail/renderPage/renderDoc = renderToHtml(root); renderText; renderJson
    templates/
      rate-confirmation.tsx   event-ticket.tsx   invoice-receipt.tsx   order-confirmation.tsx
    build.ts           loop templates × modes → dist/<name>/{email,page,document}.html, email.txt, design.json; copy assets
    pdf.ts             puppeteer: print each dist/<name>/document.html → document.pdf
  design/              (the CD bundle — source spec + assets)
  dist/                generated (gitignored)
  docs/                this handoff + screenshots
  README.md  LICENSE(MIT)
```

**Mode pattern.** Each template is one function `Template({mode})`. `<Root mode>` renders
`<Email>`(email) / `<Page>`(web) / `<Document>`(print) — the root is what sets the render
mode. Shared bands are identical across modes; branch only the deltas the design calls for:
- **email**: CTA `Button`(s), "View in browser" sub-footer, tracking/manage links.
- **document**: CTA → printed **signature + date lines** (#1) / wallet stub (#2); drop
  tracking + "view in browser"; #4 strips prices and adds an "Items packed" checklist band.
- **web**: same as email layout, reflow-friendly (derived; no separate artboard designed).

**Block mapping (strict nesting: Email/Page/Document → Row → Column → content).** Every CD
band becomes a `Row` (1–3 `Column`s via `ColumnLayouts.OneColumn/TwoEqual/TwoWideNarrow/
ThreeEqual`, or `cells={[...]}`). Freeform flex divs in the mock are re-expressed as
Row/Column. Rate breakdown / line items / order items → `Table` (columns/rows/enableHeader/
stripedRows). Hairlines → `Divider`. Footer socials → `Social`. Marks/QR/stamp/check/hero/
thumbnails → `Image` (from `design/assets`). Prop rules: flat props (`fontSize`,
`backgroundColor`); **`fontFamily` is an object** `{label,value}`; **`fontWeight` numeric**.

**Render API (confirmed, v0.1.20):** `renderToHtml(el, opts?)`, `renderToPlainText(el)`,
`renderToJson(el)`. `design.json` (renderToJson on the email root) is a bonus — it round-trips
into the Unlayer visual editor, nice for the gallery writeup.

**PDF (documented default): headless Chrome print, no API key.** `pdf.ts` uses puppeteer to
load `document.html` and print-to-PDF (US Letter). Alternative is Unlayer's export API
(`api.unlayer.com/v2/export/pdf`) but it needs `UNLAYER_API_KEY` — do NOT hardcode a secret;
only use it if Rijad supplies a key and prefers the official path. **puppeteer is a new dep**
required by the "print PDF" deliverable — house-rule flag, proceeding as the documented default.

**Assets/fonts caveats to document in README:** email clients need absolute-hosted image
URLs and largely ignore webfonts — dist uses relative `assets/` for local preview + GitHub
Pages; note the hosting step + web-safe fallback stacks for real sends.

## Per-item protocol (opus builds the templates; sonnet the plumbing)
Build → adversarial Verify (build/typecheck + criteria) → orchestrator QA:
- `pnpm build` clean; dist emitted for all 4 × 3 modes + txt + json.
- Open each `email.html` / `page.html` / `document.html` in a **real browser**
  (Claude-in-Chrome), screenshot, **compare against the .dc.html artboard** — must match
  (palette, type, spacing, content, band order). Resize page.html to confirm reflow. Confirm
  email.html is table-based. Generate + open the PDFs.
- Console-error sweep; screenshots saved to `docs/screenshots/` for README + qa artifact.
Never mark a template done without eyeballing all three renders against the design.

## Repo + PR (Rijad explicitly authorized "repo and PR")
1. `git init`, first commit on `main` (scaffold + design bundle + README stub), personal identity.
2. `gh repo create RijadRajkic/built-with-elements --public --source=. --remote=origin` (push main).
3. Branch `build/template-kit`; implement all 4; commit in bullet style (no AI attribution,
   no conventional-commit prefix); push; `gh pr create` into `main` with a body summarizing
   the kit + screenshots. That satisfies "repo and PR."
4. README: hero (one tree → email/web/PDF), the 4 templates with screenshots/GIFs, quickstart,
   asset/font notes, credits, #BuiltWithElements. LICENSE MIT (matches Elements).
5. `/qa-test` artifact — each template a checklist entry (how-to-test + expected).

## Documented defaults (proceed; surface at build, don't block)
- Repo name `built-with-elements`, **public** (challenge requires public). 
- PDF via puppeteer/headless-Chrome (no secret). 
- New deps: react, react-dom, @unlayer/react-elements, tsx, typescript, puppeteer — all
  justified by the deliverable; note tradeoffs in the PR.
- Web artboard derived from email (no separate design) — keep layouts reflow-friendly.

## ON WAKE (03:33 checklist)
1. Read `~/.claude/usage-live.json` — confirm five_hour reset (used% low). If still high, re-arm.
2. `cd ~/Work/personal-projects/built-with-elements`; read `design/Template_Kit.dc.html` IN FULL.
3. Scaffold → implement 4 templates → build → QA (browser + screenshots) → repo + PR → /qa-test.
4. Governor: gauge at every boundary; wind-down + re-arm cron if you cross ~90% before done.
5. Emit a `result:` line only when repo + PR are live and QA screenshots are attached.
