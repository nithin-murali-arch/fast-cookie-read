# Changelog

## 2.0.6 (2026-10-15)

- Importing the package no longer throws outside a browser (Node, Next.js and other SSR, test runners). Functions still need `document` when called.
- `sideEffects: false` removed, so bundlers keep `import 'fast-cookie-read'`, which sets `window.FastCookieRead`
- `index.d.ts` rewritten. The old file did not compile. The new one describes the exported object of 8 functions, the `FastCookieRead.CookieOptions` type, and `window.FastCookieRead`. Type-checked under `bundler` and `node16` module resolution.
- Cookie names with non-ASCII characters can be read back: `getAll()` and `get()` now decode names the same way `setCookie()` encodes them
- README rewritten: correct script tag URL, one install and usage section, API reference matching the code, FAQ, alternatives table
- `getCookieSize()` is documented as the length of the URL-encoded cookie string, an upper bound on the bytes sent, not an exact byte count
- Release workflow skips `npm publish` when the version is already on npm
- `cookie-parser` keyword removed

## 2.0.5 (2026-10-02)

- repository.url uses the plain GitHub URL form (trusted publishing requires an exact match)
- Includes everything from 2.0.4, which was tagged but never published

## 2.0.4 (2026-10-02)

- Published file list fixed (minified build renamed to index.min.js and actually shipped; phantom index.mjs entry dropped)
- CI moved to Node 22/24 with actions v4
- ESLint 9 added
- Audit clean
