/**
 * FastCookieRead - A high-performance cookie reading library for browsers
 * @class
 */
declare class FastCookieRead {
    private cookies: { [key: string]: string };
    private initialized: boolean;

    /**
     * Creates a new instance of FastCookieRead and parses the current document.cookie.
     * The parsing is done only once and cached for subsequent reads.
     * 
     * @example
     * const cookieReader = new FastCookieRead();
     */
    constructor();
  
    /**
     * Retrieves the value of the cookie with the specified name.
     * Uses cached cookie values for optimal performance.
     * 
     * @param name - The name of the cookie to retrieve
     * @returns The value of the cookie, or null if not found
     * 
     * @example
     * const userId = cookieReader.get('userId');
     */
    get(name: string): string | null;
  
    /**
     * Retrieves all cookies as an object.
     * Returns a copy of the cached cookie object.
     * 
     * @returns An object where keys are cookie names and values are cookie values
     * 
     * @example
     * const allCookies = cookieReader.getAll();
     * // Returns: { sessionId: 'abc123', userId: 'user1' }
     */
    getAll(): { [name: string]: string };
  
    /**
     * Retrieves the value of a cookie by directly parsing document.cookie.
     * This method is less efficient than get() but useful when you only need to read
     * a single cookie and don't want to parse all cookies.
     * 
     * @param name - The name of the cookie to retrieve
     * @returns The value of the cookie, or null if not found
     * 
     * @example
     * const sessionId = cookieReader.getInefficient('sessionId');
     */
    getInefficient(name: string): string | null;

    /**
     * Sets a cookie with the specified name and value.
     * Optionally accepts cookie attributes like expiration, path, domain, etc.
     * 
     * @param name - The name of the cookie to set
     * @param value - The value to set for the cookie
     * @param options - Optional cookie attributes
     * @param options.expires - Expiration date of the cookie
     * @param options.maxAge - Maximum age of the cookie in seconds
     * @param options.domain - Domain for the cookie
     * @param options.path - Path for the cookie
     * @param options.secure - Whether the cookie should only be transmitted over HTTPS
     * @param options.sameSite - SameSite attribute of the cookie ('Strict', 'Lax', or 'None')
     * 
     * @example
     * // Set a simple cookie
     * cookieReader.setCookie('userId', '123');
     * 
     * // Set a cookie with options
     * cookieReader.setCookie('sessionId', 'abc123', {
     *   expires: new Date('2024-12-31'),
     *   path: '/',
     *   secure: true,
     *   sameSite: 'Strict'
     * });
     */
    setCookie(
        name: string,
        value: string,
        options?: {
            expires?: Date | number;
            maxAge?: number;
            domain?: string;
            path?: string;
            secure?: boolean;
            sameSite?: 'Strict' | 'Lax' | 'None';
        }
    ): void;

    /**
     * Removes a cookie by setting its expiration date to the past.
     * Optionally accepts path and domain to ensure the cookie is removed correctly.
     * 
     * @param name - The name of the cookie to remove
     * @param options - Optional cookie attributes needed for removal
     * @param options.path - Path of the cookie to remove (must match the path used when setting)
     * @param options.domain - Domain of the cookie to remove (must match the domain used when setting)
     * 
     * @example
     * // Remove a cookie
     * cookieReader.removeCookie('userId');
     * 
     * // Remove a cookie with specific path and domain
     * cookieReader.removeCookie('sessionId', {
     *   path: '/',
     *   domain: 'example.com'
     * });
     */
    removeCookie(
        name: string,
        options?: {
            path?: string;
            domain?: string;
        }
    ): void;

    /**
     * Checks if a cookie exists.
     * 
     * @param name - The name of the cookie to check
     * @returns true if the cookie exists, false otherwise
     * 
     * @example
     * if (cookieReader.hasCookie('userId')) {
     *   // Cookie exists
     * }
     */
    hasCookie(name: string): boolean;

    /**
     * Removes all cookies.
     * 
     * @example
     * cookieReader.clearAllCookies();
     */
    clearAllCookies(): void;

    /**
     * Gets the total size of all cookies in bytes.
     * 
     * @returns The size of all cookies in bytes
     * 
     * @example
     * const size = cookieReader.getCookieSize();
     * console.log(`Total cookie size: ${size} bytes`);
     */
    getCookieSize(): number;
}
  
export default FastCookieRead;
  
// For UMD/global usage
declare global {
    interface Window {
        FastCookieRead: typeof FastCookieRead;
    }
}
  
declare interface CookieOptions {
  expires?: Date | number;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

declare interface FastCookieRead {
  /**
   * Sets a cookie with the specified name and value
   * @param name - The name of the cookie
   * @param value - The value of the cookie
   * @param options - Optional cookie settings
   * @throws {Error} If cookie name is empty or value is null/undefined
   */
  setCookie(name: string, value: string, options?: CookieOptions): void;

  /**
   * Gets the value of a cookie by name
   * @param name - The name of the cookie to get
   * @returns The cookie value or null if not found
   */
  get(name: string): string | null;

  /**
   * Gets a cookie value directly from document.cookie (less efficient)
   * @param name - The name of the cookie to get
   * @returns The cookie value or null if not found
   */
  getInefficient(name: string): string | null;

  /**
   * Gets all cookies as an object
   * @returns Object containing all cookies
   */
  getAll(): Record<string, string>;

  /**
   * Removes a cookie by name
   * @param name - The name of the cookie to remove
   * @param options - Optional cookie settings used when setting the cookie
   */
  removeCookie(name: string, options?: CookieOptions): void;

  /**
   * Checks if a cookie exists
   * @param name - The name of the cookie to check
   * @returns True if the cookie exists, false otherwise
   */
  hasCookie(name: string): boolean;

  /**
   * Removes all cookies
   */
  clearAllCookies(): void;

  /**
   * Gets the total size of all cookies in bytes
   * @returns The total size in bytes
   */
  getCookieSize(): number;
}

declare const FastCookieRead: FastCookieRead;

export = FastCookieRead;
  