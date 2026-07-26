// Build a SINGLE template in isolation — lets each template be developed and
// verified before its siblings exist. Usage: npx tsx scripts/one.tsx <slug>
import React from 'react';
import { mkdirSync, writeFileSync, cpSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToHtml, renderToPlainText, renderToJson } from '@unlayer/react-elements';
import type { Mode } from '../src/lib/root.js';

const slug = process.argv[2];
if (!slug) {
  console.error('usage: npx tsx scripts/one.tsx <slug>');
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ASSETS = join(ROOT, 'design', 'assets');
const FONTS = [
  {
    url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Fraunces:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap',
  },
];

const mod = await import(`../src/templates/${slug}.js`);
const Comp = mod.default as React.FC<{ mode: Mode }>;

const out = join(ROOT, 'dist', slug);
mkdirSync(out, { recursive: true });
if (existsSync(ASSETS)) cpSync(ASSETS, join(out, 'assets'), { recursive: true });

for (const [mode, file] of [
  ['email', 'email.html'],
  ['web', 'page.html'],
  ['document', 'document.html'],
] as [Mode, string][]) {
  writeFileSync(join(out, file), renderToHtml(<Comp mode={mode} />, { title: slug, fonts: FONTS }));
}
writeFileSync(join(out, 'email.txt'), renderToPlainText(<Comp mode="email" />));
writeFileSync(join(out, 'design.json'), JSON.stringify(renderToJson(<Comp mode="email" />), null, 2));
console.log(`built ${slug} → dist/${slug}/`);
