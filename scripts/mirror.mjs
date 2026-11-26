// Downloads a personal, offline copy of the original site into ./site (git-ignored).
// It follows index.html, every script/stylesheet, the lazily loaded lesson and
// language chunks (import(`./x.js`)), fonts and icons, so the copy runs exactly
// like the original. Nothing downloaded here is committed to the repository.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, posix } from 'node:path';

const ORIGIN = process.env.MIRROR_ORIGIN || 'https://designed-to-scale.vercel.app';
const OUT = new URL('../site/', import.meta.url).pathname;

const queue = ['/', '/favicon.svg', '/apple-touch-icon.png', '/site.webmanifest', '/og.jpg'];
const seen = new Set();
let bytes = 0;

const TEXT = /\.(html|js|mjs|css|json|webmanifest|svg)$|\/$/;

function refsIn(path, text) {
  const base = path.endsWith('/') ? path : posix.dirname(path) + '/';
  const out = new Set();
  const add = (u) => {
    if (!u || u.startsWith('data:') || u.startsWith('#') || /^[a-z]+:/i.test(u)) return;
    out.add(u.startsWith('/') ? u : posix.normalize(base + u));
  };
  // html attributes
  for (const m of text.matchAll(/(?:src|href)="([^"]+)"/g)) add(m[1]);
  // css url(...)
  for (const m of text.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) add(m[1]);
  // static and dynamic imports, vite preload lists, plain asset strings
  for (const m of text.matchAll(/["'`](\.{0,2}\/[\w./@-]+\.(?:js|mjs|css|woff2?|ttf|svg|png|jpe?g|webp|gif|json|ico|mp3|wav))["'`]/g)) add(m[1]);
  for (const m of text.matchAll(/["'`](assets\/[\w./@-]+\.(?:js|css|woff2?|svg|png|jpe?g|webp|json))["'`]/g)) add('/' + m[1]);
  // web manifest icons
  for (const m of text.matchAll(/"src"\s*:\s*"([^"]+)"/g)) add(m[1]);
  return out;
}

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const res = await fetch(ORIGIN + path);
  if (!res.ok) {
    console.warn(`skip ${path} (${res.status})`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  bytes += buf.length;
  const file = join(OUT, path.endsWith('/') ? path + 'index.html' : path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, buf);
  if (TEXT.test(path)) for (const ref of refsIn(path, buf.toString('utf8'))) if (!seen.has(ref)) queue.push(ref);
  process.stdout.write(`\r${seen.size} files, ${(bytes / 1e6).toFixed(1)} MB`);
}
console.log(`\nDone. Copy saved in ./site — run "npm start" and open http://localhost:4173`);
