/*
 * Laura Progress: encryption helpers (browser + Node 20+, Web Crypto only).
 * AES-256-GCM, key from PBKDF2-SHA256 (default 1,000,000 iterations) with a random 16 byte salt
 * and a fresh random 12 byte IV on every encryption. The file purpose is bound in as GCM
 * additional data, so a ciphertext cannot be swapped between files.
 * File format (JSON): { v, alg, kdf, iter, salt, iv, ct }  (base64 fields)
 */
(function (root) {
  var ITER = 1000000;
  var subtle = root.crypto && root.crypto.subtle;

  function b64(bytes) {
    var s = '', i, chunk = 0x8000;
    for (i = 0; i < bytes.length; i += chunk) s += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    return btoa(s);
  }
  function unb64(str) {
    var s = atob(str), out = new Uint8Array(s.length), i;
    for (i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
    return out;
  }
  function aad(purpose) { return new TextEncoder().encode('laura-progress:' + purpose + ':v1'); }

  function deriveKey(password, salt, iter) {
    return subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt: salt, iterations: iter }, base,
        { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
    });
  }
  function exportKey(key) { return subtle.exportKey('raw', key).then(function (b) { return b64(new Uint8Array(b)); }); }
  function importKey(b64key) {
    return subtle.importKey('raw', unb64(b64key), { name: 'AES-GCM' }, false, ['decrypt']);
  }

  function encrypt(obj, password, purpose, opts) {
    var iter = (opts && opts.iter) || ITER;
    var salt = root.crypto.getRandomValues(new Uint8Array(16));
    var iv = root.crypto.getRandomValues(new Uint8Array(12));
    var pt = new TextEncoder().encode(JSON.stringify(obj));
    return deriveKey(password, salt, iter).then(function (key) {
      return subtle.encrypt({ name: 'AES-GCM', iv: iv, additionalData: aad(purpose) }, key, pt);
    }).then(function (ct) {
      return { v: 1, alg: 'AES-256-GCM', kdf: 'PBKDF2-SHA256', iter: iter, salt: b64(salt), iv: b64(iv), ct: b64(new Uint8Array(ct)) };
    });
  }

  function decryptWithKey(file, key, purpose) {
    return subtle.decrypt({ name: 'AES-GCM', iv: unb64(file.iv), additionalData: aad(purpose) }, key, unb64(file.ct))
      .then(function (pt) { return JSON.parse(new TextDecoder().decode(pt)); });
  }
  /* Resolves { obj, keyB64 }. Rejects on a wrong password or a modified file. */
  function decrypt(file, password, purpose) {
    if (!file || file.v !== 1 || file.kdf !== 'PBKDF2-SHA256' || file.alg !== 'AES-256-GCM') return Promise.reject(new Error('unsupported format'));
    return deriveKey(password, unb64(file.salt), file.iter).then(function (key) {
      return decryptWithKey(file, key, purpose).then(function (obj) {
        return exportKey(key).then(function (k) { return { obj: obj, keyB64: k }; });
      });
    });
  }

  var api = { ITER: ITER, encrypt: encrypt, decrypt: decrypt, decryptWithKey: decryptWithKey, importKey: importKey };
  root.LPCrypto = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
