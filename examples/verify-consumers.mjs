import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const require = createRequire(new URL('./consent-banner/package.json', import.meta.url));
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const [index, folder] of ['js-cookie-migration', 'frameworks/solid', 'frameworks/lit', 'frameworks/astro', 'frameworks/qwik'].entries()) {
    const port = 4200 + index;
    const server = spawn('npm', ['run', folder === 'js-cookie-migration' ? 'dev' : 'preview', '--', '--port', String(port)], { cwd: fileURLToPath(new URL(`./${folder}/`, import.meta.url)), stdio: ['ignore', 'pipe', 'inherit'], detached: true });
    await new Promise((resolve, reject) => { server.stdout.on('data', (chunk) => { if (/Local|localhost/.test(chunk.toString())) resolve(); }); server.on('exit', () => reject(new Error(`${folder} server exited`))); });
    const context = await browser.newContext();
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    try {
      await page.goto(`http://localhost:${port}`);
      const output = page.locator('output');
      await output.waitFor();
      assert.equal(await output.textContent(), 'light');
      await page.locator('button').first().click();
      await page.waitForFunction(() => window.FastCookieRead?.get('theme') === 'dark');
      assert.equal(await output.textContent(), 'dark');
      await page.reload();
      await page.waitForFunction(() => window.FastCookieRead?.get('theme') === 'dark');
      await output.filter({ hasText: 'dark' }).waitFor();
      if (folder === 'js-cookie-migration') {
        await page.click('#remove');
        assert.equal(await output.textContent(), 'light');
        assert.equal(await page.evaluate(() => window.FastCookieRead.get('theme')), null);
      }
      assert.deepEqual(errors, []);
      console.log(`${folder}: built consumer renders light; writes dark; reload reads dark; no browser errors`);
    } finally { await context.close(); process.kill(-server.pid, 'SIGTERM'); }
  }
} finally { await browser.close(); }
