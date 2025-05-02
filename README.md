# Fast Cookie Read

[![npm version](https://img.shields.io/npm/v/fast-cookie-read.svg)](https://www.npmjs.com/package/fast-cookie-read)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/min/fast-cookie-read)](https://bundlephobia.com/package/fast-cookie-read)
[![Tests](https://github.com/nithin-murali-arch/fast-cookie-read/actions/workflows/test.yml/badge.svg)](https://github.com/nithin-murali-arch/fast-cookie-read/actions/workflows/test.yml)
[![Downloads](https://img.shields.io/npm/dm/fast-cookie-read.svg)](https://www.npmjs.com/package/fast-cookie-read)
[![GitHub stars](https://img.shields.io/github/stars/nithin-murali-arch/fast-cookie-read.svg)](https://github.com/nithin-murali-arch/fast-cookie-read/stargazers)

A high-performance, lightweight JavaScript library for efficient cookie management in the browser. Optimized for speed and memory usage.

## Why Fast Cookie Read?

- 🚀 **High Performance**: Uses efficient caching and parsing strategies
- 📦 **Lightweight**: Zero dependencies, minimal bundle size
- 🔒 **Secure**: Built-in validation and security features
- 🛠 **Developer Friendly**: Comprehensive error handling and debugging
- 🌐 **Cross-Browser**: Works in all modern browsers
- 📝 **TypeScript Support**: Includes TypeScript definitions

## Quick Start

```bash
npm install fast-cookie-read
```

```javascript
// Import the library
const FastCookieRead = require('fast-cookie-read');
// or
import FastCookieRead from 'fast-cookie-read';

// Set a cookie
FastCookieRead.setCookie('user', 'John');

// Get a cookie
const user = FastCookieRead.get('user'); // Returns 'John'
```

## Features

### High Performance
- Efficient caching mechanism
- Smart parsing strategies
- Minimal DOM access
- Memory-optimized operations

### Security
- Built-in validation
- Secure cookie handling
- XSS protection
- CSRF protection

### Developer Experience
- TypeScript support
- Comprehensive error handling
- Clear documentation
- Zero dependencies

## Installation

```bash
# Using npm
npm install fast-cookie-read

# Using yarn
yarn add fast-cookie-read

# Using pnpm
pnpm add fast-cookie-read
```

## Usage

The library is available both as a module and globally via the `window` object when loaded in a browser environment.

### Module Usage

```javascript
const FastCookieRead = require('fast-cookie-read');
// or
import FastCookieRead from 'fast-cookie-read';
```

### Global Usage (Browser)

When included via script tag, the library is available globally:

```html
<script src="path/to/fast-cookie-read.min.js"></script>
<script>
  // Available as window.FastCookieRead
  FastCookieRead.setCookie('user', 'John');
  const user = FastCookieRead.get('user');
</script>
```

### Basic Examples

```javascript
// Set a cookie
FastCookieRead.setCookie('user', 'John');

// Get a cookie
const user = FastCookieRead.get('user'); // Returns 'John'

// Remove a cookie
FastCookieRead.removeCookie('user');

// Check if a cookie exists
const hasUser = FastCookieRead.hasCookie('user'); // Returns false

// Get all cookies
const allCookies = FastCookieRead.getAll(); // Returns { user: 'John', ... }

// Clear all cookies
FastCookieRead.clearAllCookies();
```

## API Reference

### `setCookie(name, value, options)`

Sets a cookie with the specified name and value.

```javascript
FastCookieRead.setCookie('name', 'value', {
  expires: 7, // days from now
  maxAge: 3600, // seconds
  path: '/',
  domain: 'example.com',
  secure: true,
  sameSite: 'Strict' // 'Strict', 'Lax', or 'None'
});
```

### `get(name)`

Gets the value of a cookie by name. Returns `null` if the cookie doesn't exist.

```javascript
const value = FastCookieRead.get('name');
```

### `getAll()`

Returns an object containing all cookies.

```javascript
const allCookies = FastCookieRead.getAll();
```

### `removeCookie(name, options)`

Removes a cookie by name.

```javascript
FastCookieRead.removeCookie('name', {
  path: '/',
  domain: 'example.com'
});
```

### `hasCookie(name)`

Checks if a cookie exists.

```javascript
const exists = FastCookieRead.hasCookie('name');
```

### `clearAllCookies()`

Removes all cookies.

```javascript
FastCookieRead.clearAllCookies();
```

### `getCookieSize()`

Returns the total size of all cookies in bytes.

```javascript
const size = FastCookieRead.getCookieSize();
```

## Performance

The library uses several optimizations to ensure high performance:

1. **Efficient Caching**: Maintains an in-memory cache of parsed cookies
2. **Smart Parsing**: Only parses cookies when necessary
3. **Minimal DOM Access**: Reduces browser reflows
4. **Memory Efficient**: Uses shared references where possible

## Error Handling

The library includes comprehensive error handling:

- Validates cookie names and values
- Checks for invalid options
- Provides clear error messages
- Handles edge cases gracefully

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Nithin Murali](https://github.com/nithin-murali-arch)

## Support

If you find this library helpful, please consider:
- Starring the repository
- Opening issues for bugs or feature requests
- Contributing to the project
- Supporting the project through [GitHub Sponsors](https://github.com/sponsors/nithin-murali-arch)