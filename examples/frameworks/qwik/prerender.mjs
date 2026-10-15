import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { render } from './server/entry.ssr.js';

const { html } = await render();
assert.match(html.replace(/<!--[\s\S]*?-->/g, ''), /<output[^>]*>light<\/output>/);
await writeFile('dist/index.html', html);
console.log('Qwik rendered the light theme without document.');
