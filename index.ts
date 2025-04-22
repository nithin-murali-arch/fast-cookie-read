class FastCookieRead {
    private parsedCookies: { [name: string]: string } | null = null;
    private previous: string = "";
  
    constructor() {
      this.getAll();
    }
  
    get(name: string): string | null {
      if (!this.parsedCookies || !this.checkValidity(this.previous)) {
        this.getAll();
      }
      return this.parsedCookies ? this.parsedCookies[name] || null : null;
    }
  
    getInefficient(name: string): string | null {
      const preppedCookie: string = `; ${document.cookie}`;
      const pieces:String[] = preppedCookie.split(`; ${name}=`);
      if (pieces.length === 2) return pieces.pop().split(';')[0] || null;
    }
  
    getAll(): { [key: string]: string } {
      this.parsedCookies = {};
      this.previous = document.cookie;
      const cookies = this.previous.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        const equalSign = cookie.indexOf("=");
        if (equalSign > 0) {
          const name: string = cookie.substring(0, equalSign).trim();
          const value: string = cookie.substring(equalSign + 1).trim();
          this.parsedCookies[name] = value;
        }
      }
      return this.parsedCookies;
    }
  
    private checkValidity(previous: string): boolean {
      return previous === document.cookie;
    }
  }
  
  export default FastCookieRead;  