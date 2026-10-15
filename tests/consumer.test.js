const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { createCookieJar } = require('./helpers/cookie-jar');

const root = path.join(__dirname, '..');
const API = [
  'clearAllCookies',
  'get',
  'getAll',
  'getCookieSize',
  'getInefficient',
  'hasCookie',
  'removeCookie',
  'setCookie',
];

function loadFresh(jar) {
  global.document = jar;
  let lib;
  jest.isolateModules(() => {
    lib = require('../index.js');
  });
  return lib;
}

describe('import without a browser', () => {
  it('require() in Node without a document global exposes the 8 functions', () => {
    const out = execFileSync(
      process.execPath,
      ['-e', "console.log(JSON.stringify(Object.keys(require('./index.js')).sort()))"],
      { cwd: root, encoding: 'utf8' }
    );
    expect(JSON.parse(out)).toEqual(API);
  });
});

describe('first read after load', () => {
  it('returns null from an empty cookie string', () => {
    const lib = loadFresh(createCookieJar());
    expect(lib.get('a')).toBeNull();
    expect(lib.getAll()).toEqual({});
  });

  it('reads cookies that existed before the module loaded', () => {
    const jar = createCookieJar();
    jar.cookie = 'a=1';
    jar.cookie = 'b=two%20words';
    const lib = loadFresh(jar);
    expect(lib.get('a')).toBe('1');
    expect(lib.get('b')).toBe('two words');
  });
});

describe('cookie names with non-ASCII characters', () => {
  it('round-trips setCookie and get', () => {
    const lib = loadFresh(createCookieJar());
    lib.setCookie('café', 'ok');
    expect(lib.get('café')).toBe('ok');
    expect(lib.getAll()).toEqual({ 'café': 'ok' });
  });

  it('keeps an undecodable name as written', () => {
    const jar = createCookieJar();
    jar.cookie = '%E0%A4%A=x';
    const lib = loadFresh(jar);
    expect(lib.getAll()).toEqual({ '%E0%A4%A': 'x' });
  });
});

describe('cookie jar round trip', () => {
  it('sets, reads, checks and removes a cookie', () => {
    const lib = loadFresh(createCookieJar());
    lib.setCookie('user', 'John Doe', { expires: 7 });
    expect(lib.get('user')).toBe('John Doe');
    expect(lib.hasCookie('user')).toBe(true);
    lib.removeCookie('user');
    expect(lib.hasCookie('user')).toBe(false);
    expect(lib.getAll()).toEqual({});
  });
});

describe('index.min.js loaded as a script tag would', () => {
  it('sets window.FastCookieRead and round-trips a cookie', () => {
    const sandbox = { document: createCookieJar(), console };
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(path.join(root, 'index.min.js'), 'utf8'), sandbox);
    expect(Object.keys(sandbox.window.FastCookieRead).sort()).toEqual(API);
    sandbox.window.FastCookieRead.setCookie('user', 'John');
    expect(sandbox.window.FastCookieRead.get('user')).toBe('John');
  });
});
