// Shared helpers for the Laura Progress tools. Node 20+. Never writes plaintext inside the repo.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
export const LPCrypto = require('../lpcrypto.js');
export const Logic = require('../logic.js');

export const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const REPO = path.resolve(DIR, '..');
export const DATA_FILE = path.join(DIR, 'data.enc.json');
export const NOTES_FILE = path.join(DIR, 'notes.enc.json');

export function readEnc(file) {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : null;
}
export function writeEnc(file, obj) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + '\n');
}

/* Plaintext must never be written under the repo. */
export function assertOutsideRepo(p) {
  const real = path.resolve(p);
  const rel = path.relative(REPO, real);
  if (!rel.startsWith('..') && !path.isAbsolute(rel)) {
    throw new Error('Refusing: ' + real + ' is inside the repository. Keep plaintext outside it (for example in $TMPDIR).');
  }
}

/* Hidden prompt on a TTY. */
export function promptHidden(label) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY) return reject(new Error('No TTY: set the password in the environment instead.'));
    process.stderr.write(label);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    let buf = '';
    const onData = (ch) => {
      for (const c of ch) {
        if (c === '\r' || c === '\n') {
          process.stdin.setRawMode(false); process.stdin.pause(); process.stdin.off('data', onData);
          process.stderr.write('\n'); return resolve(buf);
        }
        if (c === '\u0003') { process.stdin.setRawMode(false); process.exit(130); }
        if (c === '\u007f') buf = buf.slice(0, -1); else buf += c;
      }
    };
    process.stdin.on('data', onData);
  });
}
export async function getPassword(envName = 'LAURA_PW', label = 'Laura Progress password: ') {
  const v = process.env[envName];
  if (v) return v;
  return promptHidden(label);
}

export function validateNotes(n) {
  const errs = [];
  if (!n || typeof n !== 'object') return ['notes must be an object'];
  for (const o of n.overrides || []) {
    if (!o || !/^[a-z0-9]{5,}$/i.test(String(o.id || ''))) errs.push('override id must be a ClickUp task id: ' + JSON.stringify(o && o.id));
    else if (o.action !== 'include' && o.action !== 'exclude') errs.push('override ' + o.id + ': action must be include or exclude');
    else if (!String(o.reason || '').trim() || /[\r\n]/.test(o.reason) || o.reason.length > 200) errs.push('override ' + o.id + ': reason must be one line, 1 to 200 characters');
  }
  for (const [k, v] of Object.entries(n.highlights || {})) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(k) || Logic.mondayOf(k) !== k) errs.push('highlight key ' + k + ' must be a Monday (YYYY-MM-DD)');
    for (const f of Object.keys(v || {})) if (!['growth', 'value', 'setbacks'].includes(f)) errs.push('highlight ' + k + ': unknown field ' + f);
  }
  for (const [k, v] of Object.entries(n.updates || {})) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(k) || Logic.mondayOf(k) !== k) errs.push('update key ' + k + ' must be a Monday (YYYY-MM-DD)');
    else if (!v || typeof v.markdown !== 'string' || !v.markdown.trim()) errs.push('update ' + k + ': markdown text is required');
    else if (v.markdown.length > 20000) errs.push('update ' + k + ': markdown is longer than 20000 characters');
    else if (v.received != null && !/^\d{4}-\d{2}-\d{2}$/.test(String(v.received))) errs.push('update ' + k + ': received must be YYYY-MM-DD');
    for (const f of Object.keys(v || {})) if (!['markdown', 'received'].includes(f)) errs.push('update ' + k + ': unknown field ' + f);
  }
  return errs;
}

/* Strip a pulled ticket down to the whitelisted fields. */
export function cleanTicket(t) {
  const arr = (a) => (Array.isArray(a) ? a.map(String) : []);
  return {
    id: String(t.id), name: String(t.name || ''), url: String(t.url || 'https://app.clickup.com/t/' + t.id),
    status: String(t.status || ''), type: String(t.type || ''), taskType: String(t.taskType || ''),
    spaceId: String(t.spaceId || ''), listId: String(t.listId || ''), listName: String(t.listName || ''),
    tags: arr(t.tags), drafter: t.drafter ? String(t.drafter) : '', creator: String(t.creator || ''),
    assignees: arr(t.assignees), assigneeIds: arr(t.assigneeIds), reviewers: arr(t.reviewers), pms: arr(t.pms),
    created: Number(t.created), updated: Number(t.updated), closed: t.closed ? Number(t.closed) : 0,
    parent: t.parent ? String(t.parent) : '',
    hasBody: typeof t.hasBody === 'boolean' ? t.hasBody : undefined
  };
}
export function validateTicket(t) {
  const miss = ['id', 'name', 'status', 'spaceId', 'listId'].filter((k) => !t[k]);
  if (!Number.isFinite(t.created) || !Number.isFinite(t.updated)) miss.push('created/updated');
  if (typeof t.hasBody !== 'boolean') miss.push('hasBody (true when the ticket has any description text)');
  return miss;
}
export { fs, os, path };
