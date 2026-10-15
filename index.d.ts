interface CookieOptions {
  /** Number of days from now, or an absolute expiry date. Omit for a session cookie. */
  expires?: number | Date;
  /** Lifetime in seconds. Must be a non-negative number. */
  maxAge?: number;
  /** Cookie path. Defaults to "/". */
  path?: string;
  /** Cookie domain, such as "example.com". Single-label hosts such as "localhost" are rejected. */
  domain?: string;
  /** Adds the Secure attribute when true. */
  secure?: boolean;
  /** SameSite attribute. Defaults to "Lax". */
  sameSite?: 'Strict' | 'Lax' | 'None';
}

interface FastCookieRead {
  /**
   * Writes a cookie. The name and value are URL-encoded before they are written.
   * @throws {Error} If the name is empty, the value is null or undefined, `sameSite`
   * is not Strict, Lax or None, `maxAge` is negative or not a number, or `domain`
   * is not a dotted domain name.
   * @example
   * FastCookieRead.setCookie('theme', 'dark', { expires: 7 });
   */
  setCookie(name: string, value: string, options?: CookieOptions): void;

  /**
   * Returns the decoded value of a cookie. Reads from a cache that is rebuilt
   * whenever `document.cookie` changes. Returns null when the cookie does not
   * exist or its value is an empty string.
   * @example
   * const theme = FastCookieRead.get('theme');
   */
  get(name: string): string | null;

  /**
   * Reads one cookie straight from `document.cookie` without the cache. Returns
   * the raw value without URL-decoding it, or null when the cookie does not
   * exist or its value is an empty string.
   */
  getInefficient(name: string): string | null;

  /**
   * Parses `document.cookie` and returns every cookie as a name-to-value
   * object. Names and values are URL-decoded.
   */
  getAll(): Record<string, string>;

  /**
   * Deletes a cookie by writing it back with an expiry in the past. `path` and
   * `domain` must match the values used when the cookie was set.
   */
  removeCookie(name: string, options?: Omit<CookieOptions, 'expires' | 'maxAge'>): void;

  /**
   * Returns true when the cookie exists and its value is not an empty string.
   */
  hasCookie(name: string): boolean;

  /**
   * Deletes every cookie that JavaScript can read, using path "/" and no domain.
   * Cookies set with another path or domain stay in place.
   */
  clearAllCookies(): void;

  /**
   * Returns the length of the URL-encoded `document.cookie` string. This is an
   * upper bound on the bytes the browser sends, not an exact byte count.
   */
  getCookieSize(): number;
}

declare const FastCookieRead: FastCookieRead;

declare namespace FastCookieRead {
  export type { CookieOptions };
}

export = FastCookieRead;

declare global {
  interface Window {
    FastCookieRead: FastCookieRead;
  }
}
