import assert from 'node:assert/strict';
import { build } from 'vite';
import { renderToString } from 'solid-js/web';

await build({ build: { ssr: 'src/ThemeToggle.jsx', outDir: '.ssr-smoke' } });
const { default: ThemeToggle } = await import('./.ssr-smoke/ThemeToggle.js');
assert.match(renderToString(ThemeToggle), /<output[^>]*>light<\/output>/);
console.log('Solid rendered the light theme without document.');
