# Builder guide — rebuilding a template in @unlayer/react-elements

You are rebuilding ONE approved design (a "template") as a single React component
that renders three ways: **email**, **web page**, **print PDF** — from one tree.
Match the artboard **pixel-faithfully** (palette, type, spacing, and copy verbatim).

## File to produce
`src/templates/<slug>.tsx` — default-export a component `({ mode }: { mode: Mode })`.

```tsx
import React from 'react';
import {
  Row, Column, ColumnLayouts, Heading, Paragraph, Button, Image, Divider, Table, Social,
} from '@unlayer/react-elements';
import { Root, font, type Mode } from '../lib/root.js';

export default function RateConfirmation({ mode }: { mode: Mode }) {
  return (
    <Root
      mode={mode}
      backgroundColor="#ECE6D8"        // the page/kraft behind the card
      contentWidth="600px"             // 600 for email; a template may widen for document
      previewText="Rate Confirmation NW-RC-48217 — signature required"
      fontFamily={font.body}
    >
      {/* bands as <Row>…</Row> */}
    </Root>
  );
}
```

`<Root mode>` picks `<Email>` / `<Page>` / `<Document>` — that is what sets the render
target. Everything else is identical across modes **except** the deltas the design's
PDF/print artboard shows (see your template's "mode deltas" at the bottom of this guide).

## The block model (STRICT — no raw `<div>`/`<span>`, no CSS grid)
`Root → Row → Column → item`. Items are `Heading | Paragraph | Button | Image | Divider |
Table | Social`. Items stack vertically inside a Column. A horizontal grouping = a Row
with more Columns. Nothing nests deeper than Column.

### Allowed components & the props you'll actually use
- **Row** — `layout={ColumnLayouts.X}` or `cells={[w1,w2,…]}` (proportional widths),
  `backgroundColor`, `padding` ("24px 28px"). Child `<Column>` count MUST equal the
  layout's column count.
  Layouts: `OneColumn, TwoEqual, TwoWideNarrow, TwoNarrowWide, ThreeEqual,
  ThreeNarrowWideNarrow, FourEqual, FiveEqual`. For other ratios use `cells={[2,1]}`.
- **Column** — `padding`, `backgroundColor`, `border` (per-side object, use for hairline
  rules), `borderRadius`. Hairline example:
  `border={{ borderRightWidth: '1px', borderRightColor: 'rgba(23,36,46,.13)', borderRightStyle: 'solid' }}`.
- **Heading** — `level="h1".."h6"`, `text` or children, `fontFamily`, `fontSize`,
  `fontWeight` (NUMBER: 400/500/600), `color`, `letterSpacing`, `lineHeight`, `textAlign`.
- **Paragraph** — `html="…"` (rich inline: `<strong>`, `<br/>`, `<span style>`) or `text`,
  plus `fontFamily`, `fontSize`, `color`, `lineHeight`, `letterSpacing`, `textAlign`.
  Use Paragraph for all body copy, labels, and mono figures.
- **Button** — `href`, children (label), `backgroundColor`, `color`, `fontFamily`,
  `fontSize`, `fontWeight`, `letterSpacing`, `padding` ("15px 34px"), `borderRadius`,
  `width` ("100%" to fill), `textAlign`.
- **Image** — `src="assets/<file>"` (relative — assets are copied next to the html),
  `alt`, `width` (number px or "50%"). Marks, QR codes, stamps, checks, hero, thumbnails
  are all Images — never redraw them as shapes.
- **Divider** — `borderTopWidth`, `borderTopColor`, `borderTopStyle` ('solid'|'dashed'),
  `width` ("100%").
- **Table** — shorthand `headers={string[]}` + `data={string[][]}`; for full styling use
  the `values` escape hatch (`values={{ table: { headers:[{cells:[{text}]}], rows:[…] },
  enableHeader, headerBackgroundColor, cellPadding }}`). Prefer a real Table for the rate
  breakdown / line items / order items.
- **Social** — `icons={[{ name:'LinkedIn', url:'…' }]}`, `iconType`, `iconSize`, `spacing`.

### Type & color
Use the exported `font` object — `fontFamily={font.display | font.body | font.mono}`
(fontFamily MUST be the `{label,value}` object, never a bare string). `fontWeight` is a
NUMBER. Pull every hex, size, letter-spacing, and padding straight from the artboard's
inline styles and its spec-sheet band — do not invent values. Mono figures: `font.mono`.

## Translation patterns (design → blocks)
- **Band** (full-width section) → one `<Row backgroundColor padding>`. Navy/dark bands =
  Row with that `backgroundColor`; the white "card" = Rows with white background over the
  page's kraft/dark `backgroundColor`.
- **Hairline between sections** → the next Column's top `border`, or a `<Divider>` item.
- **N-across strip** (spec strip, lane hero, parties, stop detail) → `<Row cells=[…]>` with
  N `<Column>`s; put vertical rules as Column `border`.
- **Logo + wordmark side by side** → `<Row cells={[1,5]}>`: Image in col 1, Heading/Paragraph
  stack in col 2.
- **Key/value list** (REF/PO · PHONE · APPT) → a `<Row cells={[1,2]}>` per pair, or one
  borderless `<Table>` with two columns; keep the keys mono-muted, values mono.
- **The lane hero mid-cell** (963 MI ▶ ~24hr) → a middle `<Column>` with stacked Paragraphs;
  use a `▶`/`→` glyph in a Paragraph, or a thin Divider, not absolute geometry.
- **Perforation / dashed ticket edge** → a `<Divider borderTopStyle="dashed">`.
- **Stamp / QR / check** → `<Image src="assets/…">` (already exported in design/assets).

## Escape hatch — use sparingly
If a micro-layout truly can't be expressed with Columns, an `<Html html="…">` block is
allowed, but keep it email-safe (tables + inline styles, no scripts) and reach for it only
after Columns/Table/Paragraph genuinely fail. Every Html block spent is a point lost on
"effective Elements implementation" — minimize them.

## Self-verify before you finish
1. `npx tsx scripts/one.tsx <slug>` — must succeed and write `dist/<slug>/`.
2. Open `dist/<slug>/email.html`, `page.html`, `document.html` and compare to the artboard.
   Palette, type, spacing, band order, and copy must match. Fix until faithful.
3. Report honestly what matched and any spot you had to approximate (and why).

## Assets in design/assets
northwind-mark-{ink,paper}.svg · nightshift-mark-{magenta,white}.svg ·
loomly-mark-{ink,blue}.svg · trailhead-mark-{green,cream}.svg ·
paid-stamp.svg · check.svg · qr-nightshift.png · qr-track.png · qr-return.png
