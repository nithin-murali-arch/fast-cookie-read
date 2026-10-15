import { createSignal, onMount } from 'solid-js';
import Cookies from 'fast-cookie-read';

export default function ThemeToggle() {
  const [theme, setTheme] = createSignal('light');
  onMount(() => setTheme(Cookies.get('theme') === 'dark' ? 'dark' : 'light'));

  function toggle() {
    const next = theme() === 'light' ? 'dark' : 'light';
    Cookies.setCookie('theme', next, { expires: 365, sameSite: 'Lax' });
    setTheme(next);
  }

  return <main data-theme={theme()}><h1>Cookie theme</h1><p>Theme: <output>{theme()}</output></p><button onClick={toggle}>Toggle theme</button></main>;
}
