#!/usr/bin/env node
// Browser test through the real Hub page, with synthetic ciphertext in a temp site dir.
//   node laura-progress/tools/e2e.mjs [screenshotDir]
import http from 'node:http';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { fs, os, path, REPO, DIR, LPCrypto } from './lib.mjs';
import { PULL, NOTES, NOW, PW } from './fixtures.mjs';
const { chromium } = createRequire(import.meta.url)('playwright');

const site = fs.mkdtempSync(path.join(os.tmpdir(), 'lp-site-'));
for (const f of ['index.html', 'gate.js']) fs.copyFileSync(path.join(REPO, f), path.join(site, f));
fs.mkdirSync(path.join(site, 'laura-progress'));
for (const f of ['index.html', 'app.js', 'logic.js', 'lpcrypto.js']) fs.copyFileSync(path.join(DIR, f), path.join(site, 'laura-progress', f));
const data = { schema: 1, pulledAt: NOW, tickets: PULL.tickets, touches: {}, unmapped: [] };
fs.writeFileSync(path.join(site, 'laura-progress/data.enc.json'), JSON.stringify(await LPCrypto.encrypt(data, PW, 'data')));
fs.writeFileSync(path.join(site, 'laura-progress/notes.enc.json'), JSON.stringify(await LPCrypto.encrypt(NOTES, PW, 'notes')));

const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const p = path.join(site, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  if (!p.startsWith(site) || !fs.existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(p)] || 'text/plain' }); res.end(fs.readFileSync(p));
}).listen(0);
const base = 'http://127.0.0.1:' + server.address().port;
const shots = process.argv[2];

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  await ctx.addInitScript(() => { try { if (location.hostname === '127.0.0.1') localStorage.setItem('djProtoGateUnlocked', '1'); } catch (e) {} });
  const page = await ctx.newPage();
  await page.clock.setFixedTime(new Date(NOW));
  await page.goto(base + '/index.html#laura-progress');
  const frame = page.frameLocator('#lpFrame');

  // Locked: nothing from the data on screen or in the hub page source
  await frame.locator('#lpPw').waitFor();
  assert.equal(await frame.locator('#lpApp').isHidden(), true);
  const hubHtml = fs.readFileSync(path.join(site, 'index.html'), 'utf8');
  assert.equal(/SYNTH|Laura Cuadros/.test(hubHtml.replace(/Jr Prod Mgr \| Weekly Progress Report/g, '')), false);
  assert.match(await page.locator('.hub-tab.active').innerText(), /Jr Prod Mgr \| Weekly Progress Report/);
  assert.equal(await frame.locator('.lp-title').count(), 0, 'heading appears only after unlock');

  // Wrong password
  await frame.locator('#lpPw').fill('wrong password');
  await frame.locator('#lpUnlock').click();
  await frame.locator('#lpErr:has-text("did not work")').waitFor();
  assert.equal(await frame.locator('#lpApp').isHidden(), true);

  // Right password
  await frame.locator('#lpPw').fill(PW);
  await frame.locator('#lpUnlock').click();
  await frame.locator('.lp-tile').first().waitFor({ timeout: 20000 });
  const tiles = await frame.locator('.lp-tile-value').allInnerTexts();
  assert.deepEqual(tiles, ['9', '8', '1', '1']);
  assert.match(await frame.locator('.lp-sync').innerText(), /Nov 6, 2026/);
  assert.equal(await frame.locator('.lp-sync.fresh').count(), 1);
  assert.match(await frame.locator('.lp-hl').first().innerText(), /SYNTH growth text/);
  assert.equal(await frame.locator('.lp-hl h4:has-text("Setbacks")').count(), 0, 'empty highlight field is not shown');
  assert.equal(await frame.locator('text=Excluded by override (1)').count(), 1);
  // Leadership view: highlights at the top, status bar with counts, shipped list
  assert.match(await frame.locator('.lp-top-hl').innerText(), /SYNTH growth text/);
  assert.equal(await frame.locator('.lp-week .lp-hl').count(), 0, 'featured week highlights are not repeated');
  assert.match(await frame.locator('.lp-mix-bar').getAttribute('aria-label'), /In Flight \d/);
  assert.ok((await frame.locator('.lp-mix-legend li').count()) >= 3);
  assert.doesNotMatch(await frame.locator('.lp-mix').innerText(), /%/, 'no percentages');
  assert.equal(await frame.locator('.lp-ship-row').count(), 1);
  assert.match(await frame.locator('.lp-ship-row').innerText(), /SYNTH shipped exception[\s\S]*Updated Nov 3, 2026/);
  assert.equal(await frame.locator('.lp-ship-row a').getAttribute('rel'), 'noopener noreferrer');
  // Laura's update: rendered as safe markdown, never as HTML
  assert.match(await frame.locator('.lp-upd').first().innerText(), /Sent to Jeremy on Nov 6, 2026/);
  assert.equal(await frame.locator('.lp-upd h4 a[href="https://example.com/section"]').count(), 1);
  assert.equal(await frame.locator('.lp-upd li strong:has-text("bold")').count(), 1);
  assert.equal(await frame.locator('.lp-upd a[href^="javascript"]').count(), 0, 'javascript: links are not links');
  assert.match(await frame.locator('.lp-upd').first().innerText(), /<script>window\.__xss=1<\/script>/, 'HTML stays as text');
  assert.equal(await frame.owner().evaluate((el) => el.contentWindow.__xss), undefined);
  assert.equal(await frame.locator('.lp-upd a[href="https://example.com/bare"]').count(), 1);
  assert.equal(await frame.locator('.lp-flag:has-text("Product Drafter missing")').count() >= 1, true);
  assert.equal(await frame.locator('.lp-flag:has-text("Included by override: Laura drafted it offline")').count() >= 1, true);
  assert.equal(await frame.locator('.lp-card-title a').first().getAttribute('rel'), 'noopener noreferrer');
  if (shots) await page.screenshot({ path: path.join(shots, 'desktop-weekly.png'), fullPage: true });

  // Filters, All tickets view
  await frame.locator('button:has-text("All tickets")').click();
  await frame.locator('#lpGroup').selectOption('shipped');
  assert.equal(await frame.locator('.lp-card:not(.lp-ovr .lp-card)').count(), 1);
  await frame.locator('#lpGroup').selectOption('all'); await frame.locator('#lpType').selectOption('bug');
  assert.equal(await frame.locator('.lp-card:not(.lp-ovr .lp-card)').count(), 1);
  await frame.locator('button:has-text("Clear filters")').click();
  await frame.locator('#lpPreset').selectOption('last-week');
  await frame.locator('text=No tickets match these filters.').waitFor();
  await frame.locator('button:has-text("Clear filters")').click();
  if (shots) await page.screenshot({ path: path.join(shots, 'desktop-all.png'), fullPage: true });

  // Session persists across reload, Lock clears it
  await page.reload();
  await frame.locator('.lp-tile').first().waitFor({ timeout: 20000 });
  assert.equal(await frame.locator('#lpLock').isHidden(), true);
  await frame.locator('button:text-is("Lock")').click();
  await frame.locator('#lpPw').waitFor();
  const stored = await frame.owner().evaluate((el) => el.contentWindow.sessionStorage.getItem('lpKeys'));
  assert.equal(stored, null);
  assert.equal(await frame.locator('.lp-card:not(.lp-ovr .lp-card)').count(), 0);
  await page.reload();
  await frame.locator('#lpPw').waitFor();
  assert.equal(await frame.locator('.lp-tile').count(), 0, 'stays locked after Lock + reload');

  // Stale banner after 7 days, no horizontal scroll on a phone
  const m = await browser.newContext({ viewport: { width: 375, height: 800 }, deviceScaleFactor: 1 });
  await m.addInitScript(() => { try { if (location.hostname === '127.0.0.1') localStorage.setItem('djProtoGateUnlocked', '1'); } catch (e) {} });
  const mp = await m.newPage();
  await mp.clock.setFixedTime(new Date(NOW + 8 * 86400000));
  await mp.goto(base + '/laura-progress/index.html');
  await mp.locator('#lpPw').fill(PW); await mp.locator('#lpUnlock').click();
  await mp.locator('.lp-tile').first().waitFor({ timeout: 20000 });
  assert.equal(await mp.locator('.lp-sync.stale').count(), 1);
  assert.equal(await mp.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, 'no horizontal scroll at 375px');
  assert.equal(await mp.locator('meta[name=robots]').getAttribute('content').then((c) => /noindex/.test(c)), true);
  if (shots) await mp.screenshot({ path: path.join(shots, 'mobile-stale.png'), fullPage: false });
  console.log('e2e passed');
} finally {
  await browser.close(); server.close(); fs.rmSync(site, { recursive: true, force: true });
}
