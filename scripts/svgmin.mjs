// Shrink the Recraft plate exports. They are genuine vector (thousands of paths)
// but carry 3 decimal places per coordinate, which is far below a pixel at any
// size we render. Rounding to 1 decimal and collapsing whitespace cuts the file
// substantially without touching the geometry.
// Usage: node scripts/svgmin.mjs design/assets/spore-0*.svg
import { readFileSync, writeFileSync, statSync } from 'node:fs';

const files = process.argv.slice(2);
if (!files.length) { console.error('usage: node scripts/svgmin.mjs <files...>'); process.exit(1); }

let before = 0, after = 0;
for (const file of files) {
  const original = readFileSync(file, 'utf8');
  before += statSync(file).size;
  let out = original
    .replace(/(\d+\.\d{2,})/g, (n) => String(Math.round(parseFloat(n) * 10) / 10))
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ');
  writeFileSync(file, out);
  after += statSync(file).size;
  console.log(`${file.split('/').pop().padEnd(26)} ${(original.length/1024).toFixed(0).padStart(5)}kB → ${(out.length/1024).toFixed(0).padStart(5)}kB`);
}
console.log(`\ntotal ${(before/1024/1024).toFixed(2)}MB → ${(after/1024/1024).toFixed(2)}MB (${Math.round((1-after/before)*100)}% smaller)`);
