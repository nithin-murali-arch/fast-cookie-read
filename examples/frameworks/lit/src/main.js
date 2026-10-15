import { CookieTheme } from './cookie-theme';

customElements.define('cookie-theme', CookieTheme);
document.getElementById('app').append(document.createElement('cookie-theme'));
