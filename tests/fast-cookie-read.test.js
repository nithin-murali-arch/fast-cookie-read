const FastCookieRead = require("../index.js");

describe("FastCookieRead", function() {
  beforeEach(function() {
    // Reset document.cookie before each test
    global.document = {cookie: ''};
  });

  it("should be defined", function() {
    expect(FastCookieRead).toBeDefined();
  });

  describe("Basic Cookie Operations", function() {
    it("should set and get a cookie", function() {
      FastCookieRead.setCookie('test', 'value');
      expect(FastCookieRead.get('test')).toBe('value');
    });

    it("should return null for non-existent cookie", function() {
      expect(FastCookieRead.get('nonexistent')).toBeNull();
    });

    it("should get all cookies", function() {
      document.cookie = 'test1=value1; test2=value2';
      const allCookies = FastCookieRead.getAll();
      expect(allCookies).toEqual({
        test1: 'value1',
        test2: 'value2'
      });
    });

    it("should handle cookies with extra spaces", function() {
      global.document.cookie = ' test = value ';
      expect(FastCookieRead.get('test')).toBe('value');
    });
  });

  describe("Cookie Setting and Options", function() {
    it("should set cookie with expiration", function() {
      const expires = new Date(Date.now() + 86400000); // 1 day from now
      FastCookieRead.setCookie('test', 'value', { expires });
      expect(FastCookieRead.get('test')).toBe('value');
    });

    it("should set cookie with maxAge", function() {
      FastCookieRead.setCookie('test', 'value', { maxAge: 3600 });
      expect(FastCookieRead.get('test')).toBe('value');
    });

    it("should set cookie with path", function() {
      FastCookieRead.setCookie('test', 'value', { path: '/test' });
      expect(FastCookieRead.get('test')).toBe('value');
    });

    it("should set cookie with domain", function() {
      FastCookieRead.setCookie('test', 'value', { domain: 'example.com' });
      expect(FastCookieRead.get('test')).toBe('value');
    });

    it("should set secure cookie", function() {
      FastCookieRead.setCookie('test', 'value', { secure: true });
      expect(FastCookieRead.get('test')).toBe('value');
    });

    it("should set cookie with sameSite attribute", function() {
      FastCookieRead.setCookie('test', 'value', { sameSite: 'Strict' });
      expect(FastCookieRead.get('test')).toBe('value');
    });

    it("should throw error for invalid sameSite value", function() {
      expect(function() {
        FastCookieRead.setCookie('test', 'value', { sameSite: 'Invalid' });
      }).toThrow();
    });

    it("should throw error for invalid maxAge", function() {
      expect(function() {
        FastCookieRead.setCookie('test', 'value', { maxAge: -1 });
      }).toThrow();
    });
  });

  describe("Cookie Removal", function() {
    it("should remove a cookie", function() {
      FastCookieRead.setCookie('test', 'value');
      FastCookieRead.removeCookie('test');
      expect(FastCookieRead.get('test')).toBeNull();
    });

    it("should remove cookie with specific path", function() {
      FastCookieRead.setCookie('test', 'value', { path: '/test' });
      FastCookieRead.removeCookie('test', { path: '/test' });
      expect(FastCookieRead.get('test')).toBeNull();
    });

    it("should remove cookie with specific domain", function() {
      FastCookieRead.setCookie('test', 'value', { domain: 'example.com' });
      FastCookieRead.removeCookie('test', { domain: 'example.com' });
      expect(FastCookieRead.get('test')).toBeNull();
    });
  });

  describe("Utility Methods", function() {
    it("should check if cookie exists", function() {
      FastCookieRead.setCookie('test', 'value');
      expect(FastCookieRead.hasCookie('test')).toBe(true);
      expect(FastCookieRead.hasCookie('nonexistent')).toBe(false);
    });

    it("should get cookie size", function() {
      FastCookieRead.setCookie('test', 'value');
      expect(FastCookieRead.getCookieSize()).toBeGreaterThan(0);
    });
  });

  describe("Cache Management", function() {
    it("should update cache when document.cookie changes", function() {
      FastCookieRead.setCookie('test', 'value1');
      global.document.cookie = 'test=value2';
      expect(FastCookieRead.get('test')).toBe('value2');
    });

    it("should handle URL-encoded values", function() {
      const value = 'test value with spaces & special chars: !@#$%^&*()';
      FastCookieRead.setCookie('test', value);
      expect(FastCookieRead.get('test')).toBe(value);
    });
  });

  describe("Error Handling", function() {
    it("should handle empty cookie name", function() {
      expect(function() {
        FastCookieRead.setCookie('', 'value');
      }).toThrow();
      expect(function() {
        FastCookieRead.get('');
      }).not.toThrow();
      expect(FastCookieRead.get('')).toBeNull();
    });

    it("should handle null/undefined values", function() {
      expect(function() {
        FastCookieRead.setCookie('test', null);
      }).toThrow();
      expect(function() {
        FastCookieRead.setCookie('test', undefined);
      }).toThrow();
    });

    it("should handle invalid domain format", function() {
      expect(function() {
        FastCookieRead.setCookie('test', 'value', { domain: 'invalid domain' });
      }).toThrow();
    });
  });

  describe("Performance", function() {
    it("should be faster than inefficient method", function() {
      FastCookieRead.setCookie('test', 'value');
      
      const start1 = performance.now();
      for (let i = 0; i < 1000; i++) {
        FastCookieRead.get('test');
      }
      const time1 = performance.now() - start1;

      const start2 = performance.now();
      for (let i = 0; i < 1000; i++) {
        FastCookieRead.getInefficient('test');
      }
      const time2 = performance.now() - start2;

      expect(time1).toBeLessThan(time2);
    });
  });
});
