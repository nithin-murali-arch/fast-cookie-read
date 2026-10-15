import FastCookieRead from 'fast-cookie-read';

export function loadAnalytics() {
  const categories = (FastCookieRead.get('consent') ?? '').split(',');
  if (!categories.includes('analytics') || document.getElementById('analytics-script')) return;
  const script = document.createElement('script');
  script.id = 'analytics-script';
  script.src = '/analytics.js'; // Replace with your analytics provider URL.
  document.head.append(script);
}

export function acceptAnalytics() {
  FastCookieRead.setCookie('consent', 'analytics,marketing', { expires: 180 });
  loadAnalytics();
}

export function checkoutVariant() {
  const saved = FastCookieRead.get('ab_checkout');
  if (saved === 'A' || saved === 'B') return saved;
  const variant = Math.random() < 0.5 ? 'A' : 'B';
  FastCookieRead.setCookie('ab_checkout', variant, { expires: 30 });
  return variant;
}

export function captureAttribution() {
  if (FastCookieRead.get('attribution')) return;
  const search = new URLSearchParams(location.search);
  const attribution = Object.fromEntries(
    ['utm_source', 'utm_medium', 'utm_campaign']
      .filter((key) => search.has(key))
      .map((key) => [key, search.get(key)]),
  );
  if (Object.keys(attribution).length) {
    FastCookieRead.setCookie('attribution', JSON.stringify(attribution), { expires: 30 });
  }
}

export function readAttribution() {
  try {
    return JSON.parse(FastCookieRead.get('attribution') ?? 'null');
  } catch {
    return null; // Ignore a stale value written by an older app version.
  }
}

export function showCookiePanel() {
  if (!import.meta.env.DEV) return;
  const panel = document.createElement('pre');
  panel.id = 'cookie-panel';
  document.body.append(panel);
  function refresh() {
    const size = FastCookieRead.getCookieSize();
    panel.textContent = JSON.stringify(FastCookieRead.getAll(), null, 2)
      + `\nEncoded cookie length: ${size}\n`
      + (size > 3500 ? 'Warning: encoded cookie length exceeds 3,500.' : 'Below 3,500.');
  }
  refresh();
  const timer = setInterval(refresh, 1000);
  return () => { clearInterval(timer); panel.remove(); };
}
