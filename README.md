# fast-cookie-read

An efficient JavaScript class for reading cookies in the browser.

## Installation

```bash
npm install fast-cookie-read

Usage
import FastCookieRead from 'fast-cookie-read'; // If using a bundler like Webpack

// Make it globally available at your entry point
const fastCookieRead = new FastCookieRead();

// Get a specific cookie

const userId = fastCookieRead.get('userId');
console.log('User ID:', userId);

// Get all cookies as an object
const allCookies = fastCookieRead.getAll();
console.log('All Cookies:', allCookies);

// Get a cookie - just as fast - incase you only read the cookie once in your function

const sessionToken = fastCookieRead.getInefficient('sessionToken');
console.log('Session Token:', sessionToken);

API
FastCookieRead Class

get(name: string): string | null: Retrieves the value of the cookie with the specified name.

getAll(): { [name: string]: string }: Retrieves all cookies as an object, where the keys are the cookie names and the values are the cookie values.

getInefficient(name: string): string | null: Retrieves the value of a cookie by directly parsing document.cookie. Use when you read only one cookie in your function. Use get when you're reading multiple cookies.