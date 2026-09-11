/*
 * DripJobs Prototype Hub — password gate.
 * Shared by index.html and every prototype page. Not real security (this file
 * and the hash below are visible to anyone who views source) — it's a
 * deterrent to stop the hub from being casually browsed or indexed by people
 * outside the team. For real access control, put the site behind something
 * like Cloudflare Access instead.
 *
 * To change the password: compute a new SHA-256 hex digest of it and swap
 * HASH_HEX below, e.g. in a browser console:
 *   crypto.subtle.digest('SHA-256', new TextEncoder().encode('new-password'))
 *     .then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2,'0')).join('')))
 */
(function () {
  var STORAGE_KEY = 'djProtoGateUnlocked';
  var HASH_HEX = '7829e4c90967decdb0c6abb32aac90342ee631dd85d36f586931707e89379730';

  function isUnlocked() {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { return false; }
  }

  if (isUnlocked()) return;

  document.documentElement.style.visibility = 'hidden';

  function sha256Hex(text) {
    var data = new TextEncoder().encode(text);
    return crypto.subtle.digest('SHA-256', data).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return b.toString(16).padStart(2, '0');
      }).join('');
    });
  }

  function buildGate() {
    var style = document.createElement('style');
    style.textContent =
      '#dj-proto-gate{position:fixed;inset:0;z-index:2147483647;background:#F3F1FC;' +
      'display:flex;align-items:center;justify-content:center;padding:24px;' +
      'font-family:"DM Sans",sans-serif;}' +
      '#dj-proto-gate .dj-gate-card{width:100%;max-width:360px;background:#FFFFFF;' +
      'border:1px solid #DAD8E3;border-radius:14px;padding:32px 28px;text-align:center;' +
      'box-shadow:0 8px 28px rgba(50,65,91,0.10);}' +
      '#dj-proto-gate .dj-gate-mark{width:40px;height:40px;margin:0 auto 16px;border-radius:10px;' +
      'background:#8B85EA;color:#fff;font-size:14px;font-weight:700;letter-spacing:0.3px;' +
      'display:flex;align-items:center;justify-content:center;}' +
      '#dj-proto-gate h1{font-size:16px;font-weight:700;color:#32415B;margin-bottom:8px;}' +
      '#dj-proto-gate p{font-size:12px;color:#80879A;line-height:1.6;margin-bottom:20px;}' +
      '#dj-proto-gate form{display:flex;flex-direction:column;gap:10px;}' +
      '#dj-proto-gate input{height:42px;padding:0 14px;border:1px solid #DAD8E3;border-radius:8px;' +
      'font-size:14px;font-family:"DM Sans",sans-serif;color:#32415B;background:#fff;}' +
      '#dj-proto-gate input:focus{outline:none;border-color:#8B85EA;}' +
      '#dj-proto-gate button{height:42px;border:none;border-radius:8px;background:#8B85EA;' +
      'color:#fff;font-size:13px;font-weight:600;font-family:"DM Sans",sans-serif;cursor:pointer;' +
      'transition:background 0.15s;}' +
      '#dj-proto-gate button:hover{background:#736BE3;}' +
      '#dj-proto-gate .dj-gate-error{display:none;margin-top:12px;font-size:12px;color:#991B1B;}' +
      '#dj-proto-gate .dj-gate-error.is-visible{display:block;}';
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.id = 'dj-proto-gate';
    overlay.innerHTML =
      '<div class="dj-gate-card">' +
        '<div class="dj-gate-mark">DJ</div>' +
        '<h1>DripJobs Prototype Hub</h1>' +
        '<p>Internal, work in progress. Enter the team password to continue.</p>' +
        '<form id="dj-gate-form" autocomplete="off">' +
          '<input type="password" id="dj-gate-input" placeholder="Password" autocomplete="off" />' +
          '<button type="submit">Enter</button>' +
        '</form>' +
        '<div class="dj-gate-error" id="dj-gate-error">Incorrect password, try again.</div>' +
      '</div>';
    document.body.appendChild(overlay);
    document.documentElement.style.visibility = 'visible';

    var form = document.getElementById('dj-gate-form');
    var input = document.getElementById('dj-gate-input');
    var error = document.getElementById('dj-gate-error');
    input.focus();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      sha256Hex(input.value).then(function (hash) {
        if (hash === HASH_HEX) {
          try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
          overlay.parentNode.removeChild(overlay);
        } else {
          error.className = 'dj-gate-error is-visible';
          input.value = '';
          input.focus();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildGate);
  } else {
    buildGate();
  }
})();
