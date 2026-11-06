#!/usr/bin/env node
// Fails (exit 1) if anything from the plaintext pull appears in the working tree changes,
// staged changes, untracked files, or an optional text file such as the PR body.
//   node laura-progress/tools/guard.mjs "$TMPDIR/laura-pull.json" [--text pr-body.md] [--also laura-update.md]
// --also names another plaintext file kept outside the repo (such as Laura's weekly update);
// every line of 15 or more characters in it is checked the same way.
import { fs, REPO } from './lib.mjs';
import { execFileSync } from 'node:child_process';

const [inFile, ...rest] = process.argv.slice(2);
if (!inFile) { console.error('usage: guard.mjs <pull.json> [--text file]'); process.exit(2); }
const pull = JSON.parse(fs.readFileSync(inFile, 'utf8'));
const needles = new Set();
for (const t of pull.tickets || []) {
  if (t.name && t.name.length >= 6) needles.add(t.name);
  if (t.id && String(t.id).length >= 6) needles.add(String(t.id));
}
const git = (a) => execFileSync('git', a, { cwd: REPO, encoding: 'utf8', maxBuffer: 1 << 28 });
let hay = git(['diff', 'HEAD']) + '\n' + git(['diff', '--cached']);
for (const f of git(['ls-files', '--others', '--exclude-standard']).split('\n').filter(Boolean)) {
  try { hay += '\n' + fs.readFileSync(REPO + '/' + f, 'utf8'); } catch (e) { /* binary or unreadable */ }
}
const ai = rest.indexOf('--also');
if (ai !== -1) for (const line of fs.readFileSync(rest[ai + 1], 'utf8').split('\n')) { const l = line.trim().replace(/^[#*\-\u2022>\s]+/, ''); if (l.length >= 15) needles.add(l); }
const ti = rest.indexOf('--text');
if (ti !== -1) hay += '\n' + fs.readFileSync(rest[ti + 1], 'utf8');
const hits = [...needles].filter((n) => hay.includes(n));
if (hits.length) { console.error('GUARD FAILED: ' + hits.length + ' plaintext value(s) found in the diff or text. Do not push.'); process.exit(1); }
console.log('Guard passed: no plaintext from the pull (' + needles.size + ' values checked) found.');
