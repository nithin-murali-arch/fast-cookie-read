import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import Cookies from 'fast-cookie-read';

type Theme = 'light' | 'dark';

export const ThemeToggle = component$(() => {
  const theme = useSignal<Theme>('light');
  useVisibleTask$(() => {
    theme.value = Cookies.get('theme') === 'dark' ? 'dark' : 'light';
  });

  return <main data-theme={theme.value}><h1>Cookie theme</h1><p>Theme: <output>{theme.value}</output></p><button onClick$={() => {
    const next = theme.value === 'light' ? 'dark' : 'light';
    Cookies.setCookie('theme', next, { expires: 365, sameSite: 'Lax' });
    theme.value = next;
  }}>Toggle theme</button></main>;
});
