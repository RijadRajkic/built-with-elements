// Rasterise design SVGs to PNG for the email surface.
// Email clients (Gmail, Outlook, Yahoo) do not render <img src="*.svg">, so the
// email build swaps every .svg reference for a .png twin generated here.
// Web and print surfaces keep the vectors.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ASSETS = join(dirname(fileURLToPath(import.meta.url)), '..', 'design', 'assets');

// 3x the vector's intrinsic width covers every display size we use (largest is
// mise-focaccia at 548px) and keeps marks crisp on HiDPI.
const SCALE = 3;
const MIN_W = 240;
const MAX_W = 1200;

function intrinsic(svg) {
  const vb = svg.match(/viewBox="\s*([-\d.]+)[,\s]+([-\d.]+)[,\s]+([-\d.]+)[,\s]+([-\d.]+)\s*"/);
  if (vb) return { w: parseFloat(vb[3]), h: parseFloat(vb[4]) };
  const w = svg.match(/<svg[^>]*\swidth="([\d.]+)(?:px)?"/);
  const h = svg.match(/<svg[^>]*\sheight="([\d.]+)(?:px)?"/);
  if (w && h) return { w: parseFloat(w[1]), h: parseFloat(h[1]) };
  return null;
}

let done = 0, bytes = 0;
for (const file of readdirSync(ASSETS).filter((f) => f.endsWith('.svg')).sort()) {
  const src = join(ASSETS, file);
  const dst = src.replace(/\.svg$/, '.png');
  const svg = readFileSync(src, 'utf8');
  const box = intrinsic(svg);
  if (!box || !box.w || !box.h) {
    console.error(`skip ${file} — no viewBox or width/height to size from`);
    continue;
  }
  const w = Math.min(MAX_W, Math.max(MIN_W, Math.round(box.w * SCALE)));
  const h = Math.round((w / box.w) * box.h);
  execFileSync('rsvg-convert', ['-w', String(w), '-h', String(h), '-o', dst, src]);
  const size = statSync(dst).size;
  bytes += size;
  done++;
  console.log(`${file.padEnd(30)} → ${String(w).padStart(4)}x${String(h).padEnd(4)} ${(size / 1024).toFixed(1)}kB`);
}
console.log(`\nrasterised ${done} svg → png (${(bytes / 1024).toFixed(0)}kB total)`);
