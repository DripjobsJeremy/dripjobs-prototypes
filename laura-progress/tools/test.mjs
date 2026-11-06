#!/usr/bin/env node
// node laura-progress/tools/test.mjs   (synthetic data only, throwaway password, temp directories)
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { fs, os, path, DIR, LPCrypto, Logic as L, validateNotes } from './lib.mjs';
import { PULL, NOTES, NOW, PW } from './fixtures.mjs';

let n = 0;
const ok = (name, fn) => Promise.resolve().then(fn).then(() => { n++; console.log('  ok  ' + name); }, (e) => { console.error('FAIL ' + name + '\n', e); process.exit(1); });

await ok('crypto: round trip, wrong password, wrong purpose, tamper, fresh salt and IV', async () => {
  const a = await LPCrypto.encrypt({ x: 1 }, PW, 'data', { iter: 1000 });
  const b = await LPCrypto.encrypt({ x: 1 }, PW, 'data', { iter: 1000 });
  assert.notEqual(a.salt, b.salt); assert.notEqual(a.iv, b.iv); assert.notEqual(a.ct, b.ct);
  assert.deepEqual((await LPCrypto.decrypt(a, PW, 'data')).obj, { x: 1 });
  await assert.rejects(LPCrypto.decrypt(a, 'nope', 'data'));
  await assert.rejects(LPCrypto.decrypt(a, PW, 'notes'));
  const bad = { ...a, ct: a.ct.slice(0, -4) + (a.ct.slice(-4) === 'AAAA' ? 'BBBB' : 'AAAA') };
  await assert.rejects(LPCrypto.decrypt(bad, PW, 'data'));
  assert.equal(LPCrypto.ITER, 1000000);
  assert.equal(JSON.stringify(a).includes('"x"'), false);
});

await ok('status groups cover every real status in both spaces (and Form is Draft)', () => {
  const real = ['new','product signals dji','dji bugs review','needs pm analysis','needs design','in review','triage','kickback','postponed','on hold','no fix needed','send to dev',
    'flight delayed','flight crew pre-check','short term parking','long term parking','boarding gates closing','gate change to (v2)','cannot replicate','needs more info','trashed',
    'needs analysis','analysis complete','ready for dev','need more context','qa kickback','in progress','awaiting test site','deployed to test','testing complete','pr created','code complete','branch ready','pr rejected',
    'resolved without fix','pushed to production','Open','need context','needs more work','ready for production'];
  for (const s of real) assert.ok(L.statusGroup({ status: s, listId: '1' }), 'unmapped: ' + s);
  assert.equal(L.statusGroup({ status: 'in progress', listId: '901413487018' }), 'draft');
  assert.equal(L.statusGroup({ status: 'send to dev', listId: '1' }), 'flight');
  assert.equal(L.statusGroup({ status: 'ready for production', listId: '1' }), 'flight');
  assert.equal(L.statusGroup({ status: 'gate change to (v2)', listId: '1' }), 'triage');
  assert.equal(L.statusGroup({ status: 'cannot replicate', listId: '1' }), 'triage');
  assert.equal(L.statusGroup({ status: 'resolved without fix', listId: '1' }), 'closed');
  assert.equal(L.statusGroup({ status: 'pushed to production', listId: '1' }), 'shipped');
  assert.equal(L.statusGroup({ status: 'made up', listId: '1' }), '');
});

await ok('lane precedence', () => {
  const lane = (t) => L.laneOf({ spaceId: '90140994633', tags: [], ...t }).lane;
  assert.equal(lane({ spaceId: '90140994811', tags: ['v2 candidate'] }), 'inflight');
  assert.equal(lane({ tags: ['V2 Candidate', 'lane: exception'] }), 'v2cand');
  assert.equal(lane({ tags: ['lane: exception', 'lane: maintenance'] }), 'exception');
  assert.equal(lane({ tags: ['lane: gate'], type: 'Bug ' }), 'maintenance');
  assert.equal(lane({ taskType: 'Bug' }), 'maintenance');
  assert.equal(lane({ tags: ['lane: gate', 'lane: v2 prep'] }), 'gate');
  assert.equal(lane({ tags: ['LANE: V2 PREP'] }), 'v2prep');
  assert.equal(lane({ tags: ['v1', 'v2'] }), 'none');
  assert.equal(L.laneOf({ spaceId: '90140994633', tags: ['lane: gate', 'v2 candidate'] }).conflict.length, 2);
});

await ok('weeks run Monday to Sunday in the ClickUp timezone, ramp months match the brief', () => {
  assert.equal(L.mondayOf('2026-11-08'), '2026-11-02'); assert.equal(L.mondayOf('2026-11-09'), '2026-11-09');
  const w = L.weekOf(NOW); assert.equal(w.key, '2026-11-02'); assert.equal(w.sunday, '2026-11-08');
  assert.equal(L.localDate(Date.parse('2026-11-09T04:59:59Z')), '2026-11-08'); assert.equal(L.localDate(Date.parse('2026-11-09T05:00:00Z')), '2026-11-09');
  assert.equal(L.rampOf(Date.parse('2026-11-02T12:00:00Z')), 'm1'); assert.equal(L.rampOf(Date.parse('2026-11-29T23:00:00-05:00')), 'm1');
  assert.equal(L.rampOf(Date.parse('2026-11-30T09:00:00-05:00')), 'm2'); assert.equal(L.rampOf(Date.parse('2026-12-28T09:00:00-05:00')), 'm3');
  assert.equal(L.rampOf(Date.parse('2027-01-31T20:00:00-05:00')), 'm3'); assert.equal(L.rampOf(Date.parse('2027-02-01T09:00:00-05:00')), '');
  assert.equal(L.localDate(L.startMs('2026-03-08')), '2026-03-08'); // DST day is stable
});

const model = L.buildModel(PULL, NOTES, NOW);
const byName = (name) => model.items.find((i) => i.t.name === name);

await ok('inclusion: drafter, creator fallback, assigned, baseline, excluded lists, overrides', () => {
  const names = model.items.map((i) => i.t.name);
  assert.ok(names.includes('SYNTH dev ticket in flight') && names.includes('SYNTH triage bug'));
  assert.equal(byName('SYNTH creator fallback').inc, 'fallback');
  assert.ok(byName('SYNTH creator fallback').flags.some((f) => f.text === 'Product Drafter missing'));
  assert.equal(byName('SYNTH assigned only').inc, 'assigned');
  assert.ok(!names.includes('SYNTH before baseline'), 'baseline');
  assert.ok(!names.includes('SYNTH v2 list never read'), 'excluded list');
  assert.ok(!names.includes('SYNTH not laura') === false, 'include override brings it in');
  assert.ok(byName('SYNTH not laura').flags.some((f) => f.text.startsWith('Included by override: Laura drafted')));
  assert.ok(!names.includes('SYNTH closed no fix'), 'exclude override hides it');
  assert.equal(model.excluded.length, 1); assert.equal(model.excluded[0].reason, 'Duplicate of another ticket');
  assert.equal(byName('SYNTH form draft').group, 'draft');
  assert.equal(byName('SYNTH lane conflict').flags.some((f) => f.text === 'Lane conflict'), true);
  assert.equal(byName('SYNTH weird status').group, '');
  assert.equal(L.classify({ ...PULL.tickets[0], listId: '901421393122' }), '', 'V2 Web Development list is never included');
});

await ok('tiles are counts for the current week only', () => {
  const t = L.tiles(model);
  // worked: a1(Nov5) a2(Nov4) a3(Nov5) a5 assigned(Nov4) a6 a8(Nov3) a9 b2(include override) b3 = 9 ; closed b1 excluded
  assert.equal(t.counts.worked, 9); assert.equal(t.counts.added, 8);
  assert.equal(t.counts.shipped, 1); assert.equal(t.counts.flight, 1);
});

await ok('touch ledger keeps earlier weeks stable', () => {
  const data = { ...PULL, touches: { tst000a1: [Date.parse('2026-11-10T15:00:00-05:00')] } };
  const m = L.buildModel(data, null, Date.parse('2026-11-12T12:00:00-05:00'));
  const ws = L.weeks(m, { range: { from: -Infinity, to: Infinity } });
  assert.equal(ws.length, 2); assert.equal(ws[0].week.key, '2026-11-09');
  assert.deepEqual(ws[0].worked.map((i) => i.t.id), ['tst000a1']);
  assert.ok(ws[1].worked.some((i) => i.t.id === 'tst000a1'));
});

await ok('filters and weekly view', () => {
  const f = (o) => ({ range: L.presetRange('since-start', NOW), ...o });
  assert.equal(L.filterItems(model, f({ group: 'shipped' })).length, 1);
  assert.equal(L.filterItems(model, f({ lane: 'maintenance' })).length, 1);
  assert.equal(L.filterItems(model, f({ type: 'bug' })).length, 1);
  assert.equal(L.filterItems(model, f({ focus: true })).length, 1);
  assert.equal(L.filterItems(model, f({ ramp: 'm2' })).length, 0);
  assert.equal(L.filterItems(model, { range: L.presetRange('last-week', NOW) }).length, 0);
  assert.equal(L.filterItems(model, { range: L.presetRange('custom', NOW, { from: '2026-11-04', to: '2026-11-04' }) }).length >= 3, true);
  const ws = L.weeks(model, f({}));
  assert.equal(ws.length, 1); assert.ok(ws[0].highlights && ws[0].highlights.growth === 'SYNTH growth text');
  const withEmptyHl = L.buildModel(PULL, { highlights: { '2026-11-02': { growth: ' ', value: '', setbacks: '' } } }, NOW);
  assert.equal(L.weeks(withEmptyHl, f({}))[0].highlights, null);
});

await ok('freshness turns amber only after 7 days', () => {
  assert.equal(L.freshness({ pulledAt: NOW }, NOW + 7 * 86400000).stale, false);
  assert.equal(L.freshness({ pulledAt: NOW }, NOW + 7 * 86400000 + 1).stale, true);
  assert.equal(L.freshness({ pulledAt: 0 }, NOW).stale, false);
});

await ok('notes validation', () => {
  assert.deepEqual(validateNotes(NOTES), []);
  assert.ok(validateNotes({ overrides: [{ id: 'x', action: 'include', reason: 'r' }] }).length);
  assert.ok(validateNotes({ overrides: [{ id: 'abcdef1', action: 'maybe', reason: 'r' }] }).length);
  assert.ok(validateNotes({ overrides: [{ id: 'abcdef1', action: 'include', reason: '' }] }).length);
  assert.ok(validateNotes({ highlights: { '2026-11-03': {} } }).length, 'not a Monday');
});

// ---- tool flow in a throwaway repo copy ----
const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), 'lp-test-'));
const repo = path.join(sandbox, 'repo'); fs.mkdirSync(repo);
fs.cpSync(DIR, path.join(repo, 'laura-progress'), { recursive: true, filter: (s) => !/data\.enc\.json$|notes\.enc\.json$|fixtures\.mjs$|test\.mjs$|e2e\.mjs$/.test(s) });
const run = (script, args, env, input) => spawnSync('node', [path.join(repo, 'laura-progress/tools', script), ...args], { env: { ...process.env, ...env }, encoding: 'utf8', input });
execFileSync('git', ['init', '-q'], { cwd: repo }); execFileSync('git', ['-c', 'user.email=t@t', '-c', 'user.name=t', 'commit', '-q', '--allow-empty', '-m', 'init'], { cwd: repo });
const pullFile = path.join(sandbox, 'pull.json'); fs.writeFileSync(pullFile, JSON.stringify(PULL));
const env = { LAURA_PW: PW };

await ok('tools: empty bundle, notes, build, ledger merge, guard, rotate', async () => {
  let r = run('build.mjs', ['--empty'], env); assert.equal(r.status, 0, r.stderr);
  r = run('notes.mjs', ['init'], env); assert.equal(r.status, 0, r.stderr);
  // replace notes with fixtures through the same crypto the tool uses
  const nf = path.join(repo, 'laura-progress/notes.enc.json');
  fs.writeFileSync(nf, JSON.stringify(await LPCrypto.encrypt(NOTES, PW, 'notes')));
  r = run('build.mjs', ['--in', path.join(repo, 'inside.json')], env); assert.notEqual(r.status, 0);
  fs.writeFileSync(path.join(repo, 'inside.json'), JSON.stringify(PULL));
  r = run('build.mjs', ['--in', path.join(repo, 'inside.json')], env); assert.notEqual(r.status, 0); assert.match(r.stderr, /inside the repository/);
  fs.rmSync(path.join(repo, 'inside.json'));
  r = run('build.mjs', ['--in', pullFile], env); assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /UNMAPPED STATUSES.*brand new status/);
  const file = JSON.parse(fs.readFileSync(path.join(repo, 'laura-progress/data.enc.json'), 'utf8'));
  const raw = fs.readFileSync(path.join(repo, 'laura-progress/data.enc.json'), 'utf8');
  for (const needle of ['SYNTH', 'tst000a1', 'Laura', 'clickup']) assert.equal(raw.includes(needle), false, 'plaintext leaked: ' + needle);
  const data = (await LPCrypto.decrypt(file, PW, 'data')).obj;
  assert.equal(data.tickets.length, 10); // 12 minus before-baseline minus v2 list... plus override include
  assert.equal(data.tickets.some((t) => t.name === 'SYNTH v2 list never read'), false);
  // second pull with a newer update appends to the ledger
  const pull2 = JSON.parse(JSON.stringify(PULL)); pull2.pulledAt += 7 * 86400000; pull2.tickets[0].updated += 7 * 86400000;
  fs.writeFileSync(pullFile, JSON.stringify(pull2));
  r = run('build.mjs', ['--in', pullFile], env); assert.equal(r.status, 0, r.stderr);
  const d2 = (await LPCrypto.decrypt(JSON.parse(fs.readFileSync(path.join(repo, 'laura-progress/data.enc.json'), 'utf8')), PW, 'data')).obj;
  assert.equal(d2.touches.tst000a1.length, 2);
  // partial pull guard
  fs.writeFileSync(pullFile, JSON.stringify({ pulledAt: pull2.pulledAt, tickets: pull2.tickets.slice(0, 2) }));
  r = run('build.mjs', ['--in', pullFile], env); assert.notEqual(r.status, 0); assert.match(r.stderr, /partial pull/);
  // guard: ciphertext-only tree passes, plaintext leak is caught
  fs.writeFileSync(pullFile, JSON.stringify(pull2));
  r = run('guard.mjs', [pullFile], env); assert.equal(r.status, 0, r.stderr);
  fs.writeFileSync(path.join(repo, 'leak.md'), 'oops SYNTH dev ticket in flight');
  r = run('guard.mjs', [pullFile], env); assert.notEqual(r.status, 0);
  fs.rmSync(path.join(repo, 'leak.md'));
  // rotate
  const NEW = 'a different long throwaway passphrase 2';
  r = run('rotate.mjs', [], { LAURA_PW_OLD: PW, LAURA_PW_NEW: NEW }); assert.equal(r.status, 0, r.stderr);
  const rot = JSON.parse(fs.readFileSync(path.join(repo, 'laura-progress/data.enc.json'), 'utf8'));
  await assert.rejects(LPCrypto.decrypt(rot, PW, 'data'));
  assert.equal((await LPCrypto.decrypt(rot, NEW, 'data')).obj.tickets.length, 10);
  const rotN = JSON.parse(fs.readFileSync(nf, 'utf8'));
  assert.equal((await LPCrypto.decrypt(rotN, NEW, 'notes')).obj.overrides.length, 2);
  r = run('rotate.mjs', [], { LAURA_PW_OLD: NEW, LAURA_PW_NEW: 'short' }); assert.notEqual(r.status, 0);
});
fs.rmSync(sandbox, { recursive: true, force: true });
console.log('\n' + n + ' checks passed');
