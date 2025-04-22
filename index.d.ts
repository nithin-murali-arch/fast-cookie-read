declare class FastCookieRead {
    /**
     * Initializes the FastCookieRead instance and parses the current document.cookie.
     */
    constructor();
  
    /**
     * Retrieves the value of the cookie with the specified name.
     * @param name The name of the cookie to retrieve.
     * @returns The value of the cookie, or null if not found.
     */
    get(name: string): string | null;
  
    /**
     * Retrieves all cookies as an object.
     * @returns An object where keys are cookie names and values are cookie values.
     */
    getAll(): { [name: string]: string };
  
    /**
     * Retrieves the value of a cookie by directly parsing document.cookie (less efficient).
     * @param name The name of the cookie to retrieve.
     * @returns The value of the cookie, or null if not found.
     */
    getInefficient(name: string): string | null;
  }
  
  export default FastCookieRead;
  
  //For UMD
  declare global {
    interface Window {
      FastCookieRead: typeof FastCookieRead;
    }
  }
  