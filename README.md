# Fast Cookie Read

[![npm version](https://img.shields.io/npm/v/fast-cookie-read.svg)](https://www.npmjs.com/package/fast-cookie-read)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/min/fast-cookie-read)](https://bundlephobia.com/package/fast-cookie-read)
[![Tests](https://github.com/nithin-murali-arch/fast-cookie-read/actions/workflows/test.yml/badge.svg)](https://github.com/nithin-murali-arch/fast-cookie-read/actions/workflows/test.yml)

A high-performance, lightweight JavaScript library for efficient cookie management in the browser. Optimized for speed and memory usage.

## Features

- 🚀 **High Performance**: Uses efficient caching and parsing strategies
- 📦 **Lightweight**: Zero dependencies, minimal bundle size
- 🔒 **Secure**: Built-in validation and security features
- 🛠 **Developer Friendly**: Comprehensive error handling and debugging
- 🌐 **Cross-Browser**: Works in all modern browsers
- 📝 **TypeScript Support**: Includes TypeScript definitions

## Installation

```bash
npm install fast-cookie-read
```

## Usage

```javascript
// Import the library
import FastCookieRead from 'fast-cookie-read';

// Set a cookie
FastCookieRead.setCookie('name', 'value', {
  expires: 7, // days
  path: '/',
  domain: 'example.com',
  secure: true,
  sameSite: 'Strict'
});

// Get a cookie
const value = FastCookieRead.get('name');

// Get all cookies
const allCookies = FastCookieRead.getAll();

// Remove a cookie
FastCookieRead.removeCookie('name');

// Check if a cookie exists
const exists = FastCookieRead.hasCookie('name');

// Clear all cookies
FastCookieRead.clearAllCookies();

// Get total cookie size
const size = FastCookieRead.getCookieSize();
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

## License

MIT © [Nithin Murali](https://github.com/nithin-murali-arch)