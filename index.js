(function(){
    // Constants for better maintainability
    const COOKIE_ATTRIBUTES = {
      PATH: 'path',
      DOMAIN: 'domain',
      EXPIRES: 'expires',
      MAX_AGE: 'max-age',
      SECURE: 'secure',
      SAME_SITE: 'samesite'
    };

    const SAME_SITE_VALUES = ['Strict', 'Lax', 'None'];
    const DEFAULT_PATH = '/';
    const DEFAULT_SAME_SITE = 'Lax';

    // Error messages for better debugging
    const ERROR_MESSAGES = {
      INVALID_SAME_SITE: `sameSite must be one of: ${SAME_SITE_VALUES.join(', ')}`,
      INVALID_MAX_AGE: 'maxAge must be a positive number',
      INVALID_DOMAIN: 'Invalid domain format',
      INVALID_COOKIE_NAME: 'Cookie name cannot be empty',
      INVALID_COOKIE_VALUE: 'Cookie value cannot be undefined or null'
    };

    // State management
    let parsedCookies = {};
    let previousCookie = '';

    // Utility functions
    function checkValidity() {
      return previousCookie === document.cookie;
    }
    
    function getCookie(name) {
      if (!name) {
        console.warn('getCookie called with empty name');
        return null;
      }
      const preppedCookie = `; ${document.cookie}`;
      const pieces = preppedCookie.split(`; ${name}=`);
      if (pieces.length === 2) return pieces.pop().split(';')[0] || null;
      return null;
    }

    function validateOptions(options) {
      if (options.sameSite && !SAME_SITE_VALUES.includes(options.sameSite)) {
        throw new Error(ERROR_MESSAGES.INVALID_SAME_SITE);
      }
      if (options.maxAge !== undefined && (typeof options.maxAge !== 'number' || options.maxAge < 0)) {
        throw new Error(ERROR_MESSAGES.INVALID_MAX_AGE);
      }
      if (options.domain && !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(options.domain)) {
        throw new Error(ERROR_MESSAGES.INVALID_DOMAIN);
      }
    }

    function validateCookieParams(name, value) {
      if (!name) {
        throw new Error(ERROR_MESSAGES.INVALID_COOKIE_NAME);
      }
      if (value === undefined || value === null) {
        throw new Error(ERROR_MESSAGES.INVALID_COOKIE_VALUE);
      }
    }

    // Core functions
    function setCookie(name, value, options = {}) {
      validateCookieParams(name, value);
      validateOptions(options);
      
      const encodedName = encodeURIComponent(name);
      const encodedValue = encodeURIComponent(value);
      let cookieString = `${encodedName}=${encodedValue}`;
      
      const {
        expires,
        maxAge,
        path = DEFAULT_PATH,
        domain,
        secure,
        sameSite = DEFAULT_SAME_SITE,
      } = options;
    
      if (expires) {
        let expiresDate;
        if (typeof expires === 'number') {
          const epoch = new Date().getTime() + (86400 * expires * 1000);
          expiresDate = new Date(epoch);
        } else if (expires instanceof Date) {
          expiresDate = expires;
        }
        cookieString += `; Expires=${expiresDate.toUTCString()}`;
      }

      if (maxAge !== undefined) {
        cookieString += `; Max-Age=${maxAge}`;
      }

      cookieString += `; Path=${path}`;

      if (domain) {
        cookieString += `; Domain=${domain}`;
      }

      if (secure === true) {
        cookieString += '; Secure';
      }

      cookieString += `; SameSite=${sameSite}`;
      
      document.cookie = cookieString;
    }

    function get(name) {
      if (!name) {
        console.warn('get called with empty name');
        return null;
      }
      if (!parsedCookies || !checkValidity()) {
        getAll();
      }
      return parsedCookies[name] || null;
    }

    function getInefficient(name) {
      if (!name) {
        console.warn('getInefficient called with empty name');
        return null;
      }
      return getCookie(name) || null;
    }

    function getAll() {
      parsedCookies = {};
      previousCookie = document.cookie;
      const cookies = previousCookie.split(';');
      
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        let equalSign = cookie.indexOf("=");
        if (equalSign > 0) {
          let name = cookie.substring(0, equalSign).trim();
          let value = cookie.substring(equalSign + 1).trim();
          try {
            parsedCookies[name] = decodeURIComponent(value);
          } catch (e) {
            console.warn(`Failed to decode cookie value for ${name}:`, e);
            parsedCookies[name] = value;
          }
        }
      }
      return parsedCookies;
    }

    function removeCookie(name, options = {}) {
      if (!name) {
        console.warn('removeCookie called with empty name');
        return;
      }
      const pastDate = new Date(0);
      setCookie(name, '', {
        ...options,
        expires: pastDate,
        maxAge: 0
      });
    }

    function hasCookie(name) {
      if (!name) {
        console.warn('hasCookie called with empty name');
        return false;
      }
      return get(name) !== null;
    }

    function clearAllCookies() {
      const cookies = getAll();
      Object.keys(cookies).forEach(name => {
        removeCookie(name);
      });
    }

    function getCookieSize() {
      return encodeURIComponent(document.cookie).length;
    }

    // Initialize
    getAll();

    // Module exports
    const FastCookieRead = {
      setCookie,
      get,
      getInefficient,
      getAll,
      removeCookie,
      hasCookie,
      clearAllCookies,
      getCookieSize
    };

    if (typeof module !== 'undefined' && module.exports) {
      module.exports = FastCookieRead;
    }
    if (typeof window !== 'undefined') {
      window.FastCookieRead = FastCookieRead;
    }
})();