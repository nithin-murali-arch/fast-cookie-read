import FastCookieRead from 'fast-cookie-read';

// Previously: Cookies.get('theme') with an undefined fallback.
function render() {
  document.querySelector('#theme').textContent = FastCookieRead.get('theme') ?? 'light';
}
document.querySelector('#save').addEventListener('click', () => {
  // Previously: Cookies.set('theme', 'dark', { expires: 30, sameSite: 'lax' }).
  FastCookieRead.setCookie('theme', 'dark', { expires: 30, sameSite: 'Lax' });
  render();
});
document.querySelector('#remove').addEventListener('click', () => {
  FastCookieRead.removeCookie('theme');
  render();
});
render();
