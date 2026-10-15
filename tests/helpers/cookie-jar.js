// Minimal document.cookie: the getter returns `name=value` pairs, the setter
// stores the first pair and treats Max-Age=0 or a past Expires as a delete.
function createCookieJar() {
  const store = new Map();
  return {
    get cookie() {
      return Array.from(store, ([name, value]) => `${name}=${value}`).join('; ');
    },
    set cookie(line) {
      const parts = line.split(';').map((part) => part.trim());
      const eq = parts[0].indexOf('=');
      const name = parts[0].slice(0, eq);
      const value = parts[0].slice(eq + 1);
      let expired = false;
      for (const attr of parts.slice(1)) {
        const [key, val] = attr.split('=');
        const lower = key.toLowerCase();
        if (lower === 'max-age' && Number(val) <= 0) expired = true;
        if (lower === 'expires' && new Date(val).getTime() <= Date.now()) expired = true;
      }
      if (expired) store.delete(name);
      else store.set(name, value);
    },
  };
}

module.exports = { createCookieJar };
