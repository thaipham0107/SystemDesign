// After mirroring: keep the deployed copy out of search engines.
import { writeFile } from 'node:fs/promises';
const dir = new URL('../site/', import.meta.url).pathname;
await writeFile(dir + 'robots.txt', 'User-agent: *\nDisallow: /\n');
console.log('Wrote site/robots.txt');
