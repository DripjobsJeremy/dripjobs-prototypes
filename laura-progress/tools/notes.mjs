#!/usr/bin/env node
// Edit the encrypted overrides and highlights.
//   node laura-progress/tools/notes.mjs edit     decrypt to a private temp file, open $EDITOR, re-encrypt
//   node laura-progress/tools/notes.mjs show     print the decrypted notes to the terminal
//   node laura-progress/tools/notes.mjs init     create an empty notes file
// Password comes from LAURA_PW or a hidden prompt.
import { LPCrypto, NOTES_FILE, readEnc, writeEnc, getPassword, validateNotes, fs, os, path } from './lib.mjs';
import { spawnSync } from 'node:child_process';

const cmd = process.argv[2];
const TEMPLATE = {
  _help: 'overrides: [{"id":"<ClickUp task id>","action":"include|exclude","reason":"one line"}]. highlights: keyed by the Monday of the week (YYYY-MM-DD) with growth, value, setbacks. Delete this line if you like.',
  overrides: [],
  highlights: {}
};
if (!['edit', 'show', 'init'].includes(cmd)) { console.error('usage: notes.mjs edit|show|init'); process.exit(2); }

const pw = await getPassword();
const file = readEnc(NOTES_FILE);
const current = file ? (await LPCrypto.decrypt(file, pw, 'notes')).obj : TEMPLATE;

if (cmd === 'show') { console.log(JSON.stringify(current, null, 2)); process.exit(0); }
if (cmd === 'init') {
  if (file) { console.error('notes.enc.json already exists.'); process.exit(1); }
  writeEnc(NOTES_FILE, await LPCrypto.encrypt({ overrides: [], highlights: {} }, pw, 'notes'));
  console.log('Created laura-progress/notes.enc.json'); process.exit(0);
}

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lp-notes-'));
fs.chmodSync(dir, 0o700);
const tmp = path.join(dir, 'notes.json');
fs.writeFileSync(tmp, JSON.stringify(current, null, 2) + '\n', { mode: 0o600 });
try {
  for (;;) {
    const r = spawnSync(process.env.EDITOR || process.env.VISUAL || 'vi', [tmp], { stdio: 'inherit' });
    if (r.status !== 0) { console.error('Editor exited with an error; nothing saved.'); process.exitCode = 1; break; }
    let parsed, errs;
    try { parsed = JSON.parse(fs.readFileSync(tmp, 'utf8')); errs = validateNotes(parsed); } catch (e) { errs = ['not valid JSON: ' + e.message]; }
    if (errs.length) { console.error('\nProblems:\n - ' + errs.join('\n - ') + '\nFix them and the editor will reopen (Ctrl+C to abort).'); await new Promise((r2) => setTimeout(r2, 1500)); continue; }
    delete parsed._help;
    writeEnc(NOTES_FILE, await LPCrypto.encrypt(parsed, pw, 'notes'));
    console.log('Saved laura-progress/notes.enc.json (ciphertext). Commit that file only.');
    break;
  }
} finally {
  try { fs.writeFileSync(tmp, '\0'.repeat(fs.statSync(tmp).size)); } catch (e) {}
  fs.rmSync(dir, { recursive: true, force: true });
}
