# fast-cookie-read

[![Tests](https://github.com/nithin-murali-arch/fast-cookie-read/actions/workflows/test.yml/badge.svg)](https://github.com/nithin-murali-arch/fast-cookie-read/actions/workflows/test.yml)
[![npm version](https://img.shields.io/npm/v/fast-cookie-read)](https://www.npmjs.com/package/fast-cookie-read)
[![npm downloads](https://img.shields.io/npm/dm/fast-cookie-read)](https://www.npmjs.com/package/fast-cookie-read)
[![license](https://img.shields.io/npm/l/fast-cookie-read)](https://github.com/nithin-murali-arch/fast-cookie-read/blob/main/LICENSE)
[![types](https://img.shields.io/npm/types/fast-cookie-read)](https://www.npmjs.com/package/fast-cookie-read)
[![node](https://img.shields.io/node/v/fast-cookie-read)](https://www.npmjs.com/package/fast-cookie-read)
[![minified + gzip size](https://img.shields.io/bundlejs/size/fast-cookie-read)](https://bundlejs.com/?q=fast-cookie-read)

`fast-cookie-read` is a cookie library for browsers that reads, sets and deletes cookies through `document.cookie`. `get()` caches the parsed cookies and parses again only when `document.cookie` has changed since the last call. The package has no dependencies, ships TypeScript types, and `index.min.js` is 1,172 bytes minified and gzipped.

## Install

```bash
npm install fast-cookie-read
```

```javascript
import FastCookieRead from 'fast-cookie-read';

FastCookieRead.setCookie('theme', 'dark', { expires: 7 });
FastCookieRead.get('theme'); // 'dark'
FastCookieRead.removeCookie('theme');
FastCookieRead.get('theme'); // null
```

This runs in a browser. In Node the import works, but every call needs `document` (see [the SSR question](#can-i-use-fast-cookie-read-with-nextjs-or-server-side-rendering)).

## Usage

### ES modules and CommonJS

```javascript
import FastCookieRead from 'fast-cookie-read';
// or
const FastCookieRead = require('fast-cookie-read');
```

Loading the module in a browser also sets `window.FastCookieRead`. A bare `import 'fast-cookie-read'` is enough to get the global.

### Script tag

```html
<script src="https://cdn.jsdelivr.net/npm/fast-cookie-read@2/index.min.js"></script>
<script>
  FastCookieRead.setCookie('user', 'John');
  FastCookieRead.get('user'); // 'John'
</script>
```

The unpkg equivalent is `https://unpkg.com/fast-cookie-read@2/index.min.js`.

### TypeScript

The package includes its own type definitions. The default import and `window.FastCookieRead` are both typed. The default import needs `esModuleInterop` or `allowSyntheticDefaultImports`, which `moduleResolution` set to `bundler` or `node16` turns on.

```typescript
import FastCookieRead from 'fast-cookie-read';

const options: FastCookieRead.CookieOptions = { expires: 7, sameSite: 'Strict' };
FastCookieRead.setCookie('theme', 'dark', options);
const theme: string | null = window.FastCookieRead.get('theme');
```

## API reference

Cookie names and values are URL-encoded when written and URL-decoded when read.

### `setCookie(name, value, options?)`

Writes a cookie. Throws if the name is empty, the value is `null` or `undefined`, `sameSite` is not `'Strict'`, `'Lax'` or `'None'`, `maxAge` is negative or not a number, or `domain` is not a dotted domain name such as `example.com` (`localhost` is rejected).

| Option | Type | Default | Notes |
| --- | --- | --- | --- |
| `expires` | `number \| Date` | none | A number is days from now. Without it the cookie lasts for the session. |
| `maxAge` | `number` | none | Seconds. |
| `path` | `string` | `'/'` | |
| `domain` | `string` | none | |
| `secure` | `boolean` | not set | Adds `Secure` only when `true`. |
| `sameSite` | `'Strict' \| 'Lax' \| 'None'` | `'Lax'` | |

```javascript
FastCookieRead.setCookie('session', 'abc123', {
  expires: 7,
  secure: true,
  sameSite: 'Strict',
});
```

### `get(name)`

Returns the decoded value, or `null` if the cookie does not exist or its value is an empty string.

### `getAll()`

Parses `document.cookie` and returns an object that maps each cookie name to its decoded value.

### `getInefficient(name)`

Reads one cookie straight from `document.cookie` with no cache. Returns the raw value without URL-decoding it, or `null` if the cookie does not exist or its value is an empty string. Use `get()` unless you need the undecoded value.

### `hasCookie(name)`

Returns `true` if the cookie exists and its value is not an empty string.

### `removeCookie(name, options?)`

Deletes a cookie. `options` accepts `path`, `domain`, `secure` and `sameSite`. The `path` and `domain` must match the ones the cookie was set with. The default path is `'/'`.

### `clearAllCookies()`

Deletes every cookie that JavaScript can read, using path `'/'` and no domain. Cookies set with another path or domain stay.

### `getCookieSize()`

Returns the length of the URL-encoded `document.cookie` string. This is an upper bound on the bytes the browser sends, not an exact byte count.

## When to use it

- You read cookies often in the browser and want repeated `get()` calls to skip parsing while the cookie string is unchanged.
- You want a small dependency-free library with bundled TypeScript types.
- Do not use it to read cookies on the server. It has no way to parse a request `Cookie` header. Use `universal-cookie` for that.
- Do not use it if you need custom value encoding or default attributes for every write. `js-cookie` supports both.

## Alternatives

| | fast-cookie-read | js-cookie 3 | universal-cookie 8 | `document.cookie` / `cookieStore` |
| --- | --- | --- | --- | --- |
| Runs in the browser | Yes | Yes | Yes | Yes |
| Import is safe on the server | Yes | Yes | Yes | Not applicable |
| Calls work without a browser | No, they throw | No, they return `undefined` | Yes, with a request cookie string | No |
| Parses a request `Cookie` header | No | No | Yes | No |
| TypeScript types in the package | Yes | No, separate `@types/js-cookie` | Yes | Built into the DOM lib |
| Runtime dependencies | 0 | 0 | 1 (`cookie`) | 0 |
| Minified and gzipped | 1,172 bytes | 876 bytes | Not measured | 0 |
| Parsing on each `get()` | Skipped while `document.cookie` is unchanged | Every call | Every call, unless `doNotUpdate` is passed | Not applicable |
| Custom value converters | No | Yes | No, but JSON values are parsed by default | No |

`js-cookie` is the better choice if you want the smallest file, custom converters, or calls that return `undefined` instead of throwing outside a browser. `universal-cookie` is the better choice for server rendering that has to read request cookies, and it can notify you when a cookie changes. The native `document.cookie` string needs no library for a one-off read. `cookieStore` is asynchronous and not available in every browser, so check browser support before relying on it.

Size figures come from `gzip -c file | wc -c` on `index.min.js` here and on `dist/js.cookie.min.js` in `js-cookie@3.0.8`.

## FAQ

### How do I read a cookie by name in JavaScript?

Call `FastCookieRead.get(name)`. It returns the decoded value, or `null` if the cookie does not exist.

```javascript
const theme = FastCookieRead.get('theme');
```

### How do I set a cookie with an expiry in days?

Pass a number as `expires`. It means days from now.

```javascript
FastCookieRead.setCookie('theme', 'dark', { expires: 7 });
```

### How do I delete a cookie?

Call `FastCookieRead.removeCookie(name)`. Pass the same `path` and `domain` that you used in `setCookie`, because the browser only deletes a cookie when they match.

```javascript
FastCookieRead.removeCookie('theme', { path: '/', domain: 'example.com' });
```

### How do I check if a cookie exists?

Call `FastCookieRead.hasCookie(name)`. It returns `true` or `false`. A cookie whose value is an empty string counts as missing.

### How do I get all cookies as an object?

Call `FastCookieRead.getAll()`. It returns an object that maps each name to its decoded value.

```javascript
FastCookieRead.getAll(); // { theme: 'dark', user: 'John' }
```

### Can I use fast-cookie-read with Next.js or server-side rendering?

Importing the package is safe on the server, but every function call needs `document`, so call it only in the browser. On the server, calls throw `ReferenceError: document is not defined`. In React, call it inside `useEffect` or an event handler.

### Can it read HttpOnly cookies?

No. Browsers hide HttpOnly cookies from JavaScript, so `document.cookie`, and every library built on it, cannot see them. Read them on the server from the request headers.

### How does it compare to js-cookie?

Both are small, dependency-free browser cookie libraries. `js-cookie` is smaller (876 bytes against 1,172) and supports custom converters. `fast-cookie-read` bundles its TypeScript types and skips parsing while `document.cookie` is unchanged, where `js-cookie` parses on every `get()`. See the [alternatives table](#alternatives).

## Support

`index.js` uses ES2018 syntax and is not transpiled. The package declares `node >= 16` in `engines`. The tests run on Node 22 and 24 in CI against a mocked `document.cookie` and have not been run in real browsers.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Contributing

Contributions are welcome. Fork the repository, create a branch, run `npm test` and `npm run test:types`, and open a pull request.

## License

MIT © [Nithin Murali](https://github.com/nithin-murali-arch)

Sponsor the project on [GitHub Sponsors](https://github.com/sponsors/nithin-murali-arch).
