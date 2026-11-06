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

  /* Safe markdown for Laura's updates: headings (#, ##, ###), bullets (*, -), bold, and
     http(s) links. Everything is created with textContent, so pasted HTML stays plain text. */
  var INLINE = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|(https?:\/\/[^\s)]+)/g;
  function inline(parent, text) {
    var last = 0, m;
    INLINE.lastIndex = 0;
    while ((m = INLINE.exec(text)) !== null) {
      if (m.index > last) parent.appendChild(document.createTextNode(text.slice(last, m.index)));
      if (m[2]) parent.appendChild(h('a', { href: m[2], target: '_blank', rel: 'noopener noreferrer', text: m[1] }));
      else if (m[3]) parent.appendChild(h('strong', { text: m[3] }));
      else parent.appendChild(h('a', { href: m[4], target: '_blank', rel: 'noopener noreferrer', text: m[4] }));
      last = m.index + m[0].length;
    }
    if (last < text.length) parent.appendChild(document.createTextNode(text.slice(last)));
    return parent;
  }
  function renderMarkdown(md) {
    var root = h('div', { class: 'lp-md' }), ul = null;
    String(md).replace(/\r\n/g, '\n').split('\n').forEach(function (raw) {
      var line = raw.replace(/\s+$/, ''), m;
      if (!line.trim()) { ul = null; return; }
      if ((m = /^\s*#{1,4}\s+(.*)$/.exec(line))) { ul = null; root.appendChild(inline(h('h4', {}), m[1])); return; }
      if ((m = /^(\s*)[*\-\u2022]\s+(.*)$/.exec(line))) {
        if (!ul) { ul = h('ul', {}); root.appendChild(ul); }
        ul.appendChild(inline(h('li', { class: m[1].length >= 2 ? 'lp-md-sub' : '' }), m[2]));
        return;
      }
      ul = null;
      root.appendChild(inline(h('p', {}), line.trim()));
    });
    return root;
  }
  function updateBlock(up) {
    if (!up) return null;
    var meta = up.received ? 'Sent to Jeremy on ' + L.fmtYmd(up.received) : '';
    return h('div', {}, [h('div', { class: 'lp-sec', text: 'Laura\u2019s update' }),
      h('div', { class: 'lp-upd' }, [meta ? h('div', { class: 'lp-upd-meta', text: meta }) : null, renderMarkdown(up.markdown)])]);
  }

  /* Latest Highlights, shown at the very top (independent of the filters). */
  function topHighlights(m) {
    var lh = L.latestHighlights(m);
    if (!lh) return null;
    var rows = [['Growth moment', lh.hl.growth], ['Value to Product', lh.hl.value], ['Setbacks', lh.hl.setbacks]]
      .filter(function (r) { return String(r[1] || '').trim(); });
    return { key: lh.key, node: h('section', { class: 'lp-top', 'aria-label': 'Latest highlights' }, [
      h('div', { class: 'lp-sec lp-top-title', text: 'Highlights, week of ' + L.fmtYmd(lh.week.key).replace(/, \d{4}$/, '') + ' to ' + L.fmtYmd(lh.week.sunday) }),
      h('div', { class: 'lp-hl lp-top-hl' }, rows.map(function (r) { return h('div', {}, [h('h4', { text: r[0] }), h('p', { text: r[1] })]); }))]) };
  }

  /* One thin bar split by status group. Counts are written out, color is never the only signal. */
  function statusBar(m) {
    var mix = L.statusMix(m);
    if (!mix.length) return null;
    var total = mix.reduce(function (a, x) { return a + x.count; }, 0);
    var aria = 'Laura\u2019s tickets by status group: ' + mix.map(function (x) { return x.label + ' ' + x.count; }).join(', ');
    var bar = h('div', { class: 'lp-mix-bar', role: 'img', 'aria-label': aria }, mix.map(function (x) {
      return h('span', { class: 'lp-mix-seg lp-mix-' + x.key, style: 'flex-grow:' + x.count }); }));
    var legend = h('ul', { class: 'lp-mix-legend' }, mix.map(function (x) {
      return h('li', {}, [h('span', { class: 'lp-mix-dot lp-mix-' + x.key, 'aria-hidden': 'true' }), x.label + ' ', h('strong', { text: String(x.count) })]); }));
    return h('section', { class: 'lp-mix', 'aria-label': 'Tickets by status group' }, [
      h('div', { class: 'lp-sec', text: 'Laura\u2019s tickets by status group (' + total + ')' }), bar, legend]);
  }

  /* What went live. Independent of the filters. */
  function shippedList(m) {
    var rows = L.shipped(m);
    var kids = [h('div', { class: 'lp-sec', text: 'Shipped' })];
    if (!rows.length) kids.push(h('p', { class: 'lp-empty', text: 'Shipped tickets will appear here.' }));
    else kids.push(h('ul', { class: 'lp-ship' }, rows.map(function (r) {
      var t = r.it.t;
      return h('li', { class: 'lp-ship-row' }, [
        h('a', { href: t.url, target: '_blank', rel: 'noopener noreferrer', text: t.name }),
        h('span', { class: 'lp-ship-meta', text: (r.exact ? 'Shipped ' : 'Updated ') + L.fmtDate(r.at) + ' \u00B7 ' + (L.effectiveType(t).trim() || 'No type') + ' \u00B7 ' + LANE_LABEL[r.it.lane] })]);
    })));
    return h('section', { class: 'lp-shipped', 'aria-label': 'Shipped tickets' }, kids);
  }

  function listOrEmpty(items, empty) {
    return items.length ? h('div', { class: 'lp-list' }, items.map(ticketCard)) : h('p', { class: 'lp-empty', text: empty });
  }

  function renderWeekly(m) {
    var ws = L.weeks(m, filterObj());
    var featured = L.latestHighlights(m);
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
      var hl = featured && featured.key === w.week.key ? null : highlightsBlock(w.highlights); // shown at the top of the page instead
      if (hl) body.appendChild(hl);
      var ub = updateBlock(w.update);
      if (ub) body.appendChild(ub);
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
      h('div', {}, [h('div', { class: 'lp-title', text: 'Jr Prod Mgr | Weekly Progress Report' }),
        h('p', { class: 'lp-sub', text: 'Weekly view of Laura Cuadros’s work as Junior Product Manager. V1 is in maintenance mode, so low volume is expected.' })]),
      h('button', { class: 'lp-btn ghost', type: 'button', onclick: lock, text: 'Lock' })
    ]);

    var sw = h('div', { class: 'lp-switch', role: 'tablist' }, [
      h('button', { type: 'button', role: 'tab', class: S.view === 'weekly' ? 'active' : '', 'aria-selected': String(S.view === 'weekly'), onclick: function () { S.view = 'weekly'; render(); }, text: 'Weekly view' }),
      h('button', { type: 'button', role: 'tab', class: S.view === 'all' ? 'active' : '', 'aria-selected': String(S.view === 'all'), onclick: function () { S.view = 'all'; render(); }, text: 'All tickets' })
    ]);

    var clear = h('button', { class: 'lp-link', type: 'button', text: 'Clear filters', onclick: function () {
      S.f = { preset: 'since-start', custom: { from: '', to: '' }, group: 'all', lane: 'all', type: 'all', focus: false, ramp: 'all' }; render(); } });

    var top = topHighlights(m);
    $app.textContent = '';
    [head, banner, top ? top.node : null].concat(renderTiles(m), [statusBar(m), shippedList(m), sw, renderFilters(), h('div', { class: 'lp-resultbar' }, [h('span'), clear]),
      S.view === 'weekly' ? renderWeekly(m) : renderAll(m), renderOverrides(m)]).forEach(function (n) { if (n) $app.appendChild(n); });
    postHeight();
  }

  if (!window.crypto || !window.crypto.subtle) showLock('This page needs a secure connection (HTTPS) to unlock.', true);
  else tryResume();
})();
