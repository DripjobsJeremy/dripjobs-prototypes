#!/usr/bin/env node
// Re-encrypt data.enc.json and notes.enc.json under a new password (new random salts and IVs).
//   LAURA_PW_OLD=... LAURA_PW_NEW=... node laura-progress/tools/rotate.mjs
import { LPCrypto, DATA_FILE, NOTES_FILE, readEnc, writeEnc, getPassword } from './lib.mjs';

const oldPw = await getPassword('LAURA_PW_OLD', 'OLD password: ');
const newPw = await getPassword('LAURA_PW_NEW', 'NEW password: ');
if (newPw === oldPw) { console.error('New password is the same as the old one.'); process.exit(1); }
if (newPw.length < 20) { console.error('New password is too short for a public repo. Use a passphrase of 5+ random words (20+ characters).'); process.exit(1); }

const jobs = [[DATA_FILE, 'data'], [NOTES_FILE, 'notes']];
const out = [];
for (const [file, purpose] of jobs) {
  const enc = readEnc(file);
  if (!enc) continue;
  const { obj } = await LPCrypto.decrypt(enc, oldPw, purpose);
  const next = await LPCrypto.encrypt(obj, newPw, purpose);
  await LPCrypto.decrypt(next, newPw, purpose);
  out.push([file, next]);
}
if (!out.length) { console.error('Nothing to rotate.'); process.exit(1); }
for (const [file, next] of out) writeEnc(file, next);
console.log('Re-encrypted ' + out.length + ' file(s). Now update the LAURA_PW secret to the new value. Old commits still decrypt with the OLD password.');
