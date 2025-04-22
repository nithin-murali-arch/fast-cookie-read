(function(){
    function _checkValidity(previous){
      return previous === document.cookie;
    }
    
    function getCookie (name) {
      const preppedCookie = `; ${document.cookie}`;
      const pieces = preppedCookie.split(`; ${name}=`);
      if (pieces.length === 2) return pieces.pop().split(';')[0] || null;
    }
  
    class FastCookieRead{
      constructor(){
        this.getAll();
      }
    
      get(name){
        if(!this.parsedCookies || !_checkValidity(this.previous)){
          this.getAll();
        }
        return this.parsedCookies[name] || null;
      }
  
      getInefficient(name){
        return getCookie(name) || null;
      }
    
      getAll(){
        this.parsedCookies = {};
        this.previous = document.cookie;
        const cookies = this.previous.split(';');
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          let equalSign = cookie.indexOf("=");
          if (equalSign > 0) {
            let name = cookie.substring(0, equalSign).trim();
            let value = cookie.substring(equalSign + 1).trim();
            this.parsedCookies[name] = value;
          }
        }
        return this.parsedCookies;
      }
    }
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = FastCookieRead;
    } else if (typeof window !== 'undefined') {
      window.FastCookieRead = FastCookieRead;
    }
  })();