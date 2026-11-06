#!/usr/bin/env node
// Build laura-progress/data.enc.json from a plaintext pull kept OUTSIDE the repo.
//   LAURA_PW=... node laura-progress/tools/build.mjs --in "$TMPDIR/laura-pull.json"
//   LAURA_PW=... node laura-progress/tools/build.mjs --empty        (first run: empty bundle)
// Pull file: { "pulledAt": <ms>, "tickets": [ ... see ROUTINE.md ... ] }
import { LPCrypto, Logic, DATA_FILE, NOTES_FILE, readEnc, writeEnc, assertOutsideRepo, getPassword, cleanTicket, validateTicket, validateNotes, fs } from './lib.mjs';

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const val = (n) => { const i = args.indexOf(n); return i === -1 ? null : args[i + 1]; };

const pw = await getPassword();
const prior = readEnc(DATA_FILE) ? (await LPCrypto.decrypt(readEnc(DATA_FILE), pw, 'data')).obj : null;
const notesFile = readEnc(NOTES_FILE);
const notes = notesFile ? (await LPCrypto.decrypt(notesFile, pw, 'notes')).obj : {};
const nerr = validateNotes(notes);
if (nerr.length) { console.error('notes file invalid:\n' + nerr.join('\n')); process.exit(1); }

let out;
if (flag('--empty')) {
  if (prior && !flag('--force')) { console.error('data.enc.json already exists; use --force to replace it.'); process.exit(1); }
  out = { schema: 1, pulledAt: 0, tickets: [], touches: {}, unmapped: [] };
} else {
  const inFile = val('--in');
  if (!inFile) { console.error('--in <pull.json> is required'); process.exit(1); }
  assertOutsideRepo(inFile);
  const pull = JSON.parse(fs.readFileSync(inFile, 'utf8'));
  if (!Number.isFinite(pull.pulledAt) || !Array.isArray(pull.tickets)) { console.error('pull file needs pulledAt (ms) and tickets[]'); process.exit(1); }
  const includeIds = new Set((notes.overrides || []).filter((o) => o.action === 'include').map((o) => String(o.id)));
  const seen = new Set(), kept = [], dropped = { notLaura: 0, excludedList: 0, noBody: 0, invalid: 0 };
  for (const raw of pull.tickets) {
    const t = cleanTicket(raw);
    if (validateTicket(t).length) { dropped.invalid++; continue; }
    if (Logic.CFG.EXCLUDED_LIST_IDS.includes(t.listId)) { dropped.excludedList++; continue; }
    if (seen.has(t.id)) continue;
    if (t.hasBody === false && !includeIds.has(t.id)) { dropped.noBody++; continue; }
    if (!Logic.classify(t) && !includeIds.has(t.id)) { dropped.notLaura++; continue; }
    seen.add(t.id); kept.push(t);
  }
  const priorCount = prior ? prior.tickets.length : 0;
  if (priorCount >= 4 && kept.length < priorCount * 0.5 && !flag('--force')) {
    console.error('Refusing: the new pull has ' + kept.length + ' tickets vs ' + priorCount + ' before (looks like a partial pull). Re-run, or pass --force.');
    process.exit(1);
  }
  const touches = {};
  for (const t of kept) {
    const set = new Set(((prior && prior.touches && prior.touches[t.id]) || []).map(Number));
    set.add(t.updated);
    touches[t.id] = [...set].sort((a, b) => a - b);
  }
  const unmapped = [...new Set(kept.filter((t) => !Logic.statusGroup(t)).map((t) => t.status))];
  out = { schema: 1, pulledAt: pull.pulledAt, tickets: kept, touches, unmapped };
  console.log('Tickets kept: ' + kept.length + ' | dropped: ' + JSON.stringify(dropped));
  if (unmapped.length) console.log('UNMAPPED STATUSES (add to logic.js STATUS_MAP and confirm with Jeremy): ' + unmapped.join(', '));
}

const enc = await LPCrypto.encrypt(out, pw, 'data');
await LPCrypto.decrypt(enc, pw, 'data'); // round trip check before writing
writeEnc(DATA_FILE, enc);
console.log('Wrote laura-progress/data.enc.json (ciphertext only).');
