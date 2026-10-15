import FastCookieRead from 'fast-cookie-read';
import { acceptAnalytics, loadAnalytics, captureAttribution, readAttribution, showCookiePanel } from './recipes.js';

loadAnalytics();
captureAttribution();
document.querySelector('#accept').addEventListener('click', acceptAnalytics);
document.querySelector('#decline').addEventListener('click', () => {
  FastCookieRead.setCookie('consent', 'necessary', { expires: 180 });
  location.reload();
});
document.querySelector('#attribution').textContent = JSON.stringify(readAttribution());
document.querySelector('#signup').addEventListener('click', () => {
  document.querySelector('#result').textContent = `Signup attribution: ${JSON.stringify(readAttribution())}`;
  FastCookieRead.removeCookie('attribution');
});
showCookiePanel();
