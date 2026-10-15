import FastCookieRead from '../..';

const options: FastCookieRead.CookieOptions = {
  expires: 7,
  maxAge: 3600,
  path: '/',
  domain: 'example.com',
  secure: true,
  sameSite: 'Strict',
};

FastCookieRead.setCookie('theme', 'dark', options);
FastCookieRead.setCookie('session', 'abc', { expires: new Date(), sameSite: 'None' });

const theme: string | null = FastCookieRead.get('theme');
const raw: string | null = FastCookieRead.getInefficient('theme');
const all: Record<string, string> = FastCookieRead.getAll();
const exists: boolean = FastCookieRead.hasCookie('theme');
const size: number = FastCookieRead.getCookieSize();
FastCookieRead.removeCookie('theme', { path: '/', domain: 'example.com' });
FastCookieRead.clearAllCookies();

const viaWindow: string | null = window.FastCookieRead.get('theme');

// @ts-expect-error sameSite only accepts Strict, Lax or None
FastCookieRead.setCookie('a', 'b', { sameSite: 'strict' });
// @ts-expect-error value must be a string
FastCookieRead.setCookie('a', 1);
// @ts-expect-error expires is not accepted when removing
FastCookieRead.removeCookie('a', { expires: 1 });

export { theme, raw, all, exists, size, viaWindow };
