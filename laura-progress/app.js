/*
 * Laura Progress page. Decrypts data.enc.json and notes.enc.json in the browser (Web Crypto).
 * Nothing readable is stored anywhere: after unlock the derived keys (not the password) are kept
 * in sessionStorage, which the browser clears when the tab closes. Lock clears them.
 * All ticket text is inserted with textContent, never as HTML.
 */
(function () {
  var L = window.LPLogic, C = window.LPCrypto;
  var SS_KEY = 'lpKeys';
  var embedded = window.self !== window.top;
  if (embedded) document.body.classList.add('embedded');

  var $lock = document.getElementById('lpLock'), $app = document.getElementById('lpApp');
  var $form = document.getElementById('lpForm'), $pw = document.getElementById('lpPw');
  var $err = document.getElementById('lpErr'), $btn = document.getElementById('lpUnlock');
  var $msg = document.getElementById('lpLockMsg');

  var S = { model: null, view: 'weekly', f: { preset: 'since-start', custom: { from: '', to: '' }, group: 'all', lane: 'all', type: 'all', focus: false, ramp: 'all' } };

  /* ---------- tiny DOM helper ---------- */
  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== false && attrs[k] != null) e.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c != null) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }
  function badge(cls, text) { return h('span', { class: 'lp-badge ' + cls, text: text }); }

  /* ---------- height for the Hub iframe ---------- */
  function postHeight() {
    if (!embedded) return;
    try { parent.postMessage({ lpHeight: document.documentElement.scrollHeight }, location.origin); } catch (e) {}
  }
  if (embedded && window.ResizeObserver) new ResizeObserver(postHeight).observe(document.body);

  /* ---------- fetching ---------- */
  function getJson(url) {
    return fetch(url, { cache: 'no-store' }).then(function (r) {
      if (r.status === 404) return null;
      if (!r.ok) throw new Error('fetch ' + r.status);
      return r.json();
    });
  }
  function loadFiles() { return Promise.all([getJson('./data.enc.json'), getJson('./notes.enc.json')]); }

  /* ---------- unlock / lock ---------- */
  function showLock(msg, noForm) {
    $app.hidden = true; $app.textContent = '';
    $lock.hidden = false;
    $form.hidden = !!noForm;
    if (msg) $msg.textContent = msg;
    postHeight();
  }
  function setErr(t) { $err.textContent = t || ''; }

  function start(data, notes) {
    S.model = L.buildModel(data, notes, Date.now());
    $lock.hidden = true; $app.hidden = false;
    render();
  }

  function tryResume() {
    var raw = null;
    try { raw = sessionStorage.getItem(SS_KEY); } catch (e) {}
    return loadFiles().then(function (files) {
      if (!files[0]) return showLock('Nothing has been pulled yet. Once the first weekly refresh is merged, unlock it here.', true);
      if (!raw) return showLock();
      var keys = JSON.parse(raw);
      return C.importKey(keys.data).then(function (k) { return C.decryptWithKey(files[0], k, 'data'); }).then(function (data) {
        var np = files[1] && keys.notes ? C.importKey(keys.notes).then(function (k) { return C.decryptWithKey(files[1], k, 'notes'); }) : Promise.resolve(null);
        return np.then(function (notes) { start(data, notes); });
      });
    }).catch(function () {
      try { sessionStorage.removeItem(SS_KEY); } catch (e) {}
      showLock();
    });
  }

  $form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var pw = $pw.value;
    if (!pw) return;
    $btn.disabled = true; $btn.textContent = 'Unlocking…'; setErr('');
    loadFiles().then(function (files) {
      if (!files[0]) throw new Error('nodata');
      return Promise.all([
        C.decrypt(files[0], pw, 'data'),
        files[1] ? C.decrypt(files[1], pw, 'notes') : Promise.resolve(null)
      ]);
    }).then(function (res) {
      try { sessionStorage.setItem(SS_KEY, JSON.stringify({ data: res[0].keyB64, notes: res[1] ? res[1].keyB64 : null })); } catch (e) {}
      $pw.value = '';
      start(res[0].obj, res[1] ? res[1].obj : null);
    }).catch(function (e) {
      setErr(e && e.message === 'nodata' ? 'Nothing has been pulled yet.' : 'That password did not work.');
    }).then(function () { $btn.disabled = false; $btn.textContent = 'Unlock'; });
  });

  function lock() {
    try { sessionStorage.removeItem(SS_KEY); } catch (e) {}
    S.model = null; $pw.value = ''; setErr('');
    showLock('Locked. Enter the password to view this page again.');
  }

  /* ---------- rendering ---------- */
  var GROUP_LABEL = {}; L.GROUPS.forEach(function (g) { GROUP_LABEL[g.key] = g.label; });
  var LANE_LABEL = {}; L.LANES.forEach(function (g) { LANE_LABEL[g.key] = g.label; });
  var TYPE_OPTS = [['all', 'All types'], ['bug', 'Bug'], ['enhancement', 'Enhancement'], ['feature', 'Feature'], ['task', 'Task'], ['other', 'No type']];

  function select(id, label, opts, value, onchange) {
    var s = h('select', { class: 'lp-select', id: id, 'aria-label': label, onchange: function () { onchange(s.value); } });
    opts.forEach(function (o) { var op = h('option', { value: o[0], text: o[1] }); if (o[0] === value) op.selected = true; s.appendChild(op); });
    return s;
  }
  function rampLabel(key) { var r = L.CFG.RAMP.filter(function (x) { return x.key === key; })[0]; return r ? r.label : ''; }

  function ticketCard(it) {
    var t = it.t;
    var title = h('div', { class: 'lp-card-title' }, [h('a', { href: t.url, target: '_blank', rel: 'noopener noreferrer', text: t.name })]);
    var badges = h('div', { class: 'lp-badges' }, [
      badge('lp-type', L.effectiveType(t).trim() || 'No type'),
      badge('lp-lane', LANE_LABEL[it.lane]),
      badge('lp-g-' + (it.group || 'closed'), (GROUP_LABEL[it.group] || 'Unmapped') ),
      it.focus ? badge('lp-focus', '🎯 Focus') : null
    ]);
    function dd(label, val) { return h('div', {}, [h('dt', { text: label }), h('dd', { text: val })]); }
    var meta = h('dl', { class: 'lp-meta' }, [
      dd('Status', t.status), dd('List', t.listName || 'Unknown'),
      dd('Product Reviewer', t.reviewers.join(', ') || 'None'), dd('Project Manager', t.pms.join(', ') || 'None'),
      dd('Created', L.fmtDate(t.created)), dd('Last updated', L.fmtDate(t.updated))
    ]);
    var kids = [title, badges, meta];
    if (it.flags.length) kids.push(h('div', { class: 'lp-flags' }, it.flags.map(function (f) { return badge('lp-flag', f.text); })));
    return h('article', { class: 'lp-card' }, kids);
  }

  function renderTiles(m) {
    var t = L.tiles(m), c = t.counts;
    function tile(label, v) { return h('div', { class: 'lp-tile' }, [h('div', { class: 'lp-tile-label', text: label }), h('div', { class: 'lp-tile-value', text: String(v) })]); }
    return [
      h('div', { class: 'lp-tiles' }, [tile('Worked this week', c.worked), tile('New this week', c.added), tile('Shipped since start', c.shipped), tile('In flight', c.flight)]),
      h('p', { class: 'lp-tile-cap', text: 'Week of ' + L.fmtYmd(t.week.key) + ' to ' + L.fmtYmd(t.week.sunday) + '. Counts only.' })
    ];
  }

  function currentRange() { return L.presetRange(S.f.preset, S.model.now, S.f.custom); }
  function filterObj() { return { range: currentRange(), group: S.f.group, lane: S.f.lane, type: S.f.type, focus: S.f.focus, ramp: S.f.ramp }; }

  function renderFilters() {
    var f = S.f;
    var preset = select('lpPreset', 'Date range', [['this-week', 'This week'], ['last-week', 'Last week'], ['this-month', 'This month'], ['since-start', 'Since start'], ['custom', 'Custom range']], f.preset, function (v) { f.preset = v; render(); });
    var custom = h('span', { class: 'lp-custom', hidden: f.preset !== 'custom' }, [
      h('input', { class: 'lp-input', type: 'date', 'aria-label': 'From', value: f.custom.from, onchange: function (e) { f.custom.from = e.target.value; render(); } }),
      h('input', { class: 'lp-input', type: 'date', 'aria-label': 'To', value: f.custom.to, onchange: function (e) { f.custom.to = e.target.value; render(); } })
    ]);
    var groups = [['all', 'All statuses']].concat(L.GROUPS.map(function (g) { return [g.key, g.label]; }));
    var lanes = [['all', 'All lanes']].concat(L.LANES.map(function (g) { return [g.key, g.label]; }));
    var ramps = [['all', 'All ramp months']].concat(L.CFG.RAMP.map(function (r) { return [r.key, r.label + ' (' + L.fmtYmd(r.from).replace(/, \d{4}$/, '') + ' to ' + L.fmtYmd(r.to).replace(/, \d{4}$/, '') + ')']; }));
    var focus = h('label', { class: 'lp-check' }, [h('input', { type: 'checkbox', checked: f.focus, onchange: function (e) { f.focus = e.target.checked; render(); } }), '🎯 Focus only']);
    return h('div', {}, [
      h('div', { class: 'lp-filters' }, [preset, custom,
        select('lpGroup', 'Status group', groups, f.group, function (v) { f.group = v; render(); }),
        select('lpLane', 'Lane', lanes, f.lane, function (v) { f.lane = v; render(); }),
        select('lpType', 'Type', TYPE_OPTS, f.type, function (v) { f.type = v; render(); }),
        select('lpRamp', 'Ramp month', ramps, f.ramp, function (v) { f.ramp = v; render(); }),
        focus]),
      h('p', { class: 'lp-note', text: 'A ticket matches the date range when it was created or updated in it.' })
    ]);
  }

  function highlightsBlock(hl) {
    if (!hl) return null;
    var rows = [['Growth moment', hl.growth], ['Value to Product', hl.value], ['Setbacks', hl.setbacks]].filter(function (r) { return String(r[1] || '').trim(); });
    if (!rows.length) return null;
    return h('div', {}, [h('div', { class: 'lp-sec', text: 'Highlights' }),
      h('div', { class: 'lp-hl' }, rows.map(function (r) { return h('div', {}, [h('h4', { text: r[0] }), h('p', { text: r[1] })]); }))]);
  }

  function listOrEmpty(items, empty) {
    return items.length ? h('div', { class: 'lp-list' }, items.map(ticketCard)) : h('p', { class: 'lp-empty', text: empty });
  }

  function renderWeekly(m) {
    var ws = L.weeks(m, filterObj());
    var wrap = h('div', {});
    if (!ws.length) wrap.appendChild(h('p', { class: 'lp-empty', text: 'No weeks in this range.' }));
    ws.forEach(function (w, i) {
      var rk = L.rampOf(w.week.from);
      var d = h('details', { class: 'lp-week' }, [
        h('summary', {}, [h('span', { class: 'lp-week-name', text: L.fmtYmd(w.week.key).replace(/, \d{4}$/, '') + ' to ' + L.fmtYmd(w.week.sunday) }),
          h('span', { class: 'lp-week-meta', text: [rk ? rampLabel(rk) : '', w.worked.length + ' worked', w.added.length + ' added'].filter(Boolean).join(' · ') })])
      ]);
      if (i === 0) d.setAttribute('open', '');
      var body = h('div', { class: 'lp-week-body' });
      var hl = highlightsBlock(w.highlights);
      if (hl) body.appendChild(hl);
      body.appendChild(h('div', { class: 'lp-sec', text: 'Tickets worked' }));
      body.appendChild(listOrEmpty(w.worked, 'No tickets worked this week.'));
      body.appendChild(h('div', { class: 'lp-sec', text: 'Tickets added' }));
      body.appendChild(listOrEmpty(w.added, 'No tickets added this week.'));
      d.appendChild(body); wrap.appendChild(d);
    });
    return wrap;
  }

  function renderAll(m) {
    var items = L.filterItems(m, filterObj());
    return h('div', {}, [
      h('div', { class: 'lp-resultbar' }, [h('span', { text: items.length + (items.length === 1 ? ' ticket' : ' tickets') })]),
      listOrEmpty(items, 'No tickets match these filters.')
    ]);
  }

  function renderOverrides(m) {
    if (!m.excluded.length) return null;
    return h('details', { class: 'lp-ovr' }, [
      h('summary', { text: 'Excluded by override (' + m.excluded.length + ')' }),
      h('div', { class: 'lp-list' }, m.excluded.map(function (x) {
        return h('article', { class: 'lp-card' }, [
          h('div', { class: 'lp-card-title' }, [h('a', { href: x.t.url, target: '_blank', rel: 'noopener noreferrer', text: x.t.name })]),
          h('div', { class: 'lp-flags' }, [badge('lp-flag', 'Excluded by override: ' + (x.reason || 'no reason given'))])
        ]);
      }))
    ]);
  }

  function render() {
    var m = S.model;
    if (!m) return;
    var fr = L.freshness(m.data, m.now);
    var banner = h('div', { class: 'lp-sync ' + (fr.empty ? '' : fr.stale ? 'stale' : 'fresh'), role: 'status' }, [
      fr.empty ? 'No ClickUp pull has been merged yet.' : 'Last pulled from ClickUp on ' + L.fmtDate(fr.pulledAt) + '.' + (fr.stale ? ' That was more than 7 days ago.' : '')]);

    var head = h('div', { class: 'lp-head' }, [
      h('div', {}, [h('div', { class: 'lp-title', text: 'Laura Progress' }),
        h('p', { class: 'lp-sub', text: 'Weekly view of Laura Cuadros’s work as Junior Product Manager. V1 is in maintenance mode, so low volume is expected.' })]),
      h('button', { class: 'lp-btn ghost', type: 'button', onclick: lock, text: 'Lock' })
    ]);

    var sw = h('div', { class: 'lp-switch', role: 'tablist' }, [
      h('button', { type: 'button', role: 'tab', class: S.view === 'weekly' ? 'active' : '', 'aria-selected': String(S.view === 'weekly'), onclick: function () { S.view = 'weekly'; render(); }, text: 'Weekly view' }),
      h('button', { type: 'button', role: 'tab', class: S.view === 'all' ? 'active' : '', 'aria-selected': String(S.view === 'all'), onclick: function () { S.view = 'all'; render(); }, text: 'All tickets' })
    ]);

    var clear = h('button', { class: 'lp-link', type: 'button', text: 'Clear filters', onclick: function () {
      S.f = { preset: 'since-start', custom: { from: '', to: '' }, group: 'all', lane: 'all', type: 'all', focus: false, ramp: 'all' }; render(); } });

    $app.textContent = '';
    [head, banner].concat(renderTiles(m), [sw, renderFilters(), h('div', { class: 'lp-resultbar' }, [h('span'), clear]),
      S.view === 'weekly' ? renderWeekly(m) : renderAll(m), renderOverrides(m)]).forEach(function (n) { if (n) $app.appendChild(n); });
    postHeight();
  }

  if (!window.crypto || !window.crypto.subtle) showLock('This page needs a secure connection (HTTPS) to unlock.', true);
  else tryResume();
})();
