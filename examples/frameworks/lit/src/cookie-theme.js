import { LitElement, html } from 'lit';
import Cookies from 'fast-cookie-read';

export class CookieTheme extends LitElement {
  static properties = { theme: { state: true } };

  constructor() {
    super();
    this.theme = 'light';
  }

  firstUpdated() {
    this.theme = Cookies.get('theme') === 'dark' ? 'dark' : 'light';
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    Cookies.setCookie('theme', this.theme, { expires: 365, sameSite: 'Lax' });
  }

  render() {
    return html`<main data-theme=${this.theme}><h1>Cookie theme</h1><p>Theme: <output>${this.theme}</output></p><button @click=${this.toggle}>Toggle theme</button></main>`;
  }
}
