import React from 'react';
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToHtml, renderToPlainText, renderToJson } from '@unlayer/react-elements';
import type { Mode } from './lib/root.js';

import RateConfirmation from './templates/rate-confirmation.js';
import EventTicket from './templates/event-ticket.js';
import InvoiceReceipt from './templates/invoice-receipt.js';
import OrderConfirmation from './templates/order-confirmation.js';
import Cadence from './templates/cadence.js';
import Spore from './templates/spore.js';
import Nocturne from './templates/nocturne.js';
import Mise from './templates/mise.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const ASSETS = join(ROOT, 'design', 'assets');

/** Webfonts the kit uses — injected as <link> tags in web/document renders.
 *  (Email clients ignore webfonts; the font stacks fall back to web-safe faces.) */
const FONTS = [
  {
    url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Fraunces:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap',
  },
];

type Entry = { slug: string; title: string; Comp: React.FC<{ mode: Mode }> };

const TEMPLATES: Entry[] = [
  { slug: 'rate-confirmation', title: 'Rate Confirmation — Northwind Freight', Comp: RateConfirmation },
  { slug: 'event-ticket', title: "You're in — Nightshift", Comp: EventTicket },
  { slug: 'invoice-receipt', title: 'Receipt — Loomly Studio', Comp: InvoiceReceipt },
  { slug: 'order-confirmation', title: 'Order confirmed — Trailhead Goods', Comp: OrderConfirmation },
  // Showcase set — original, tri-modal concepts
  { slug: 'cadence', title: 'Your 2026 in Motion — Cadence', Comp: Cadence },
  { slug: 'spore', title: 'SPORE — Field Guide Deck', Comp: Spore },
  { slug: 'nocturne', title: 'Nocturne — Elias Vaughn', Comp: Nocturne },
  { slug: 'mise', title: 'Cast-Iron Rosemary Focaccia — Mise', Comp: Mise },
];

const MODES: { mode: Mode; file: string }[] = [
  { mode: 'email', file: 'email.html' },
  { mode: 'web', file: 'page.html' },
  { mode: 'document', file: 'document.html' },
];

// The PNG twins are committed, so a plain `npm run build` needs no rasteriser.
// If an SVG is added without running `npm run raster`, fail loudly rather than
// shipping an email with an image no client can display.
function assertRasterised(slug: string, emailHtml: string) {
  const missing = [...emailHtml.matchAll(/src="[^"]*assets\/([^"]+\.png)"/g)]
    .map((m) => m[1])
    .filter((name, i, all) => all.indexOf(name) === i)
    .filter((name) => !existsSync(join(ASSETS, name)));
  if (missing.length) {
    throw new Error(
      `${slug}: email references ${missing.join(', ')} but no such file in design/assets. ` +
        `Run \`npm run raster\` to regenerate the PNG twins.`,
    );
  }
}

function build() {
  rmSync(DIST, { recursive: true, force: true });
  for (const { slug, title, Comp } of TEMPLATES) {
    const out = join(DIST, slug);
    mkdirSync(out, { recursive: true });
    if (existsSync(ASSETS)) cpSync(ASSETS, join(out, 'assets'), { recursive: true });

    for (const { mode, file } of MODES) {
      let html = renderToHtml(<Comp mode={mode} />, { title, fonts: FONTS });
      // Email clients (Gmail, Outlook, Yahoo) don't render <img src="*.svg">, so the
      // email surface uses the PNG twins from scripts/rasterize.mjs. Web and print
      // keep the vectors.
      if (mode === 'email') {
        html = html.replace(/(src="[^"]*assets\/[^"]+)\.svg"/g, '$1.png"');
        assertRasterised(slug, html);
      }
      writeFileSync(join(out, file), html);
    }
    writeFileSync(join(out, 'email.txt'), renderToPlainText(<Comp mode="email" />));
    writeFileSync(join(out, 'design.json'), JSON.stringify(renderToJson(<Comp mode="email" />), null, 2));

    console.log(`built ${slug} → email.html, page.html, document.html, email.txt, design.json`);
  }
  console.log(`\ndone → ${DIST}`);
}

build();
