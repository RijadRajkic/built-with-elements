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

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const ASSETS = join(ROOT, 'design', 'assets');

/** Webfonts the kit uses — injected as <link> tags in web/document renders.
 *  (Email clients ignore webfonts; the font stacks fall back to web-safe faces.) */
const FONTS = [
  {
    url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
  },
];

type Entry = { slug: string; title: string; Comp: React.FC<{ mode: Mode }> };

const TEMPLATES: Entry[] = [
  { slug: 'rate-confirmation', title: 'Rate Confirmation — Northwind Freight', Comp: RateConfirmation },
  { slug: 'event-ticket', title: "You're in — Nightshift", Comp: EventTicket },
  { slug: 'invoice-receipt', title: 'Receipt — Loomly Studio', Comp: InvoiceReceipt },
  { slug: 'order-confirmation', title: 'Order confirmed — Trailhead Goods', Comp: OrderConfirmation },
];

const MODES: { mode: Mode; file: string }[] = [
  { mode: 'email', file: 'email.html' },
  { mode: 'web', file: 'page.html' },
  { mode: 'document', file: 'document.html' },
];

function build() {
  rmSync(DIST, { recursive: true, force: true });
  for (const { slug, title, Comp } of TEMPLATES) {
    const out = join(DIST, slug);
    mkdirSync(out, { recursive: true });
    if (existsSync(ASSETS)) cpSync(ASSETS, join(out, 'assets'), { recursive: true });

    for (const { mode, file } of MODES) {
      const html = renderToHtml(<Comp mode={mode} />, { title, fonts: FONTS });
      writeFileSync(join(out, file), html);
    }
    writeFileSync(join(out, 'email.txt'), renderToPlainText(<Comp mode="email" />));
    writeFileSync(join(out, 'design.json'), JSON.stringify(renderToJson(<Comp mode="email" />), null, 2));

    console.log(`built ${slug} → email.html, page.html, document.html, email.txt, design.json`);
  }
  console.log(`\ndone → ${DIST}`);
}

build();
