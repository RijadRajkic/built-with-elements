# Built with Elements — four worlds, one system

Four production-grade transactional templates built with
[**@unlayer/react-elements**](https://github.com/unlayer/elements). Each is one
React component tree that renders **three ways** — a table-based **email**, a
responsive **web page**, and a print-ready **PDF** — from the same source. One
shared discipline of type, grid, and restraint; four unmistakably different worlds.

> Submission for Unlayer's **#BuiltWithElements** challenge.

| | Freight | Events | Payments | Retail |
|---|---|---|---|---|
| **Template** | Rate Confirmation | Event Ticket | Invoice + Receipt | Order + Packing Slip |
| **Brand** | Northwind Freight | Nightshift | Loomly Studio | Trailhead Goods |
| **Accent** | 🟥 vermilion | 🟪 magenta | 🟦 ink-blue | 🟧 rust |
| **Renders** | email · web · PDF | email · web · PDF | email · web · PDF | email · web · PDF |

---

## The templates

Each template ships in three render modes plus a plain-text part and Unlayer
design JSON. Screenshots below are the **email** and **print PDF** renders
side by side.

### 01 · Rate Confirmation — *"signed manifest"*
A freight rate confirmation a broker emails a carrier, and the signable PDF of the
same document. Austere, ruled, every figure tabular; one vermilion accent used for
action only. The PDF swaps the "Review & Accept" button for printed signature lines.

| Email | Print PDF |
|---|---|
| <img src="docs/screenshots/rate-confirmation-email.png" width="360"> | <img src="docs/screenshots/rate-confirmation-document.png" width="360"> |

### 02 · Event Ticket — *"after-dark"*
A post-purchase confirmation email and a print/wallet ticket with a scannable QR
stub. Near-black, oversized display, one electric-magenta accent. The PDF is a
compact wallet ticket with an "ADMIT ONE" pill and a dashed perforation.

| Email | Print PDF |
|---|---|
| <img src="docs/screenshots/event-ticket-email.png" width="360"> | <img src="docs/screenshots/event-ticket-document.png" width="360"> |

### 03 · Invoice + Receipt — *"Swiss ledger"*
An email receipt sent on payment and a downloadable PDF invoice. Crisp Swiss /
International — cool white, hairline rules, strictly tabular numbers, the paid
amount as hero. The PDF adds numbered billing sections and a PAID-in-full band.

| Email | Print PDF |
|---|---|
| <img src="docs/screenshots/invoice-receipt-email.png" width="360"> | <img src="docs/screenshots/invoice-receipt-document.png" width="360"> |

### 04 · Order Confirmation + Packing Slip — *"trail retail"*
An order-confirmation email and a print packing slip for the box. Warm, tactile,
outdoors — forest green and rust. The PDF strips prices and becomes a pack
checklist with checkboxes and a "3 items · 4 units" tally.

| Email | Print PDF |
|---|---|
| <img src="docs/screenshots/order-confirmation-email.png" width="360"> | <img src="docs/screenshots/order-confirmation-document.png" width="360"> |

---

## How it works

One component tree, three render targets. `<Root mode>` swaps the wrapper that
sets Unlayer's render mode — `<Email>` (table-based, Outlook/Gmail-safe),
`<Page>` (responsive flexbox), or `<Document>` (print/PDF). The bands are
identical across modes; a template branches on `mode` only for the deltas the
design calls for (button → signature block, dropping tracking links, a packing
checklist instead of prices).

```tsx
export default function RateConfirmation({ mode }: { mode: Mode }) {
  return (
    <Root mode={mode} backgroundColor="#ECE6D8" contentWidth="600px" fontFamily={font.body}>
      <Row backgroundColor="#17242E" cells={[1, 4, 4]} padding="24px 28px 0">
        <Column verticalAlign="middle">
          <Image src="assets/northwind-mark-paper.svg" alt="Northwind" width={36} />
        </Column>
        {/* … bands … */}
      </Row>
      {mode === 'document' ? <SignatureLines /> : <ReviewAndAcceptButton />}
    </Root>
  );
}
```

Everything is composed from Elements' fixed block set — `Row` / `Column`,
`Heading`, `Paragraph`, `Button`, `Image`, `Divider`, `Table`, `Social` — under
the strict `Body → Row → Column → item` nesting. No raw HTML layout: horizontal
groupings are narrow/wide column rows, hairlines are per-side column borders,
data is a real `<Table>`. Type is Space Grotesk (display) / Inter (body) /
JetBrains Mono (figures & labels).

## Quick start

```bash
npm install
npm run build      # → dist/<template>/{email,page,document}.html + email.txt + design.json
npm run pdf        # → dist/<template>/document.pdf   (headless Chromium, no API key)
npm run shots      # → docs/screenshots/*.png         (optional, needs ImageMagick)
npm run typecheck
```

Each `dist/<template>/` is self-contained (HTML + `assets/`), so you can open
`email.html`, `page.html`, or `document.html` straight in a browser, or drop
`design.json` into the Unlayer visual editor to keep editing.

## Project structure

```
src/
  lib/root.tsx            <Root mode> → Email | Page | Document; shared font stacks
  templates/*.tsx         one component per template (the four above)
  build.tsx               renders every template × every mode → dist/
scripts/
  one.tsx                 build a single template in isolation (dev loop)
  pdf.mjs                 print document.html → PDF via headless Chromium
  shots.mjs               full-page screenshots for the README
design/                   the source Claude Design bundle + brand assets
docs/                     builder guide, screenshots
dist/                     rendered output (email/web/pdf per template)
```

## Notes

- **Fonts:** the web/PDF renders load the three webfonts from Google Fonts;
  email clients ignore webfonts and fall back to the web-safe stacks (Helvetica
  Neue / Arial / Courier), which is expected and handled.
- **Images in real email:** `dist` references assets by relative path for local
  preview. For an actual send, host the `assets/` on a CDN and point the image
  `src` at absolute URLs (email clients don't load relative or local images).
- **Placeholders:** the Event and Order heroes keep the design's "photo goes
  here" blocks — swap in real photography before shipping to production.

## Credits

- Built with [Unlayer Elements](https://github.com/unlayer/elements) (`@unlayer/react-elements`), MIT.
- Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Inter](https://fonts.google.com/specimen/Inter), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (OFL).
- All brands, names, and figures are fictional, for demonstration only.

## License

MIT — see [LICENSE](LICENSE). **#BuiltWithElements**
