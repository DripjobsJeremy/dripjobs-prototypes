/* Roadmap renderer. Lane logic is in roadmap-lanes.js, settings in roadmap-config.js, tickets in roadmap-data.js. */
(function () {
  var R = window.RMLanes, CFG = window.RM_CONFIG, DATA = window.RM_DATA;
  var LANES = R.LANES;
  var tasks = DATA.tasks.slice();

  // Local fixtures for checking lane logic: add ?fixtures=1 to the URL. Never real data.
  var useFixtures = /[?&]fixtures=1/.test(location.search);
  if (useFixtures) {
    var PM = 'DripJobs Product Management';
    tasks = tasks.concat([
      { id: 'fx1', name: '[Fixture] No lane tag, outside Development V1 (expect Unassigned)', status: 'needs pm analysis', priority: 'normal', type: '', tags: ['featurebase'], list: 'Active Triage', space: PM, updated: 1793700000000 },
      { id: 'fx2', name: '[Fixture] Two lane tags (expect V2 Candidates plus Lane conflict)', status: 'needs design', priority: 'high', type: '', tags: ['lane: gate', 'v2 candidate'], list: 'Active Triage', space: PM, updated: 1793700000001 },
      { id: 'fx3', name: '[Fixture] Retired v1 and v2 tags only (expect Unassigned)', status: 'needs pm analysis', priority: 'low', type: '', tags: ['v1', 'v2'], list: 'Active Triage', space: PM, updated: 1793700000002 }
    ]);
    document.getElementById('fixtureBanner').hidden = false;
  }

  var built = R.build(tasks, CFG);
  var state = { q: '', bug: false, lanes: {} };
  LANES.forEach(function (l) { state.lanes[l.key] = true; });

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function statusLabel(s) { return s ? cap(s).replace(/\b(Pr|Qa|Pm|Ux|Ui)\b/g, function (m) { return m.toUpperCase(); }) : 'No status'; }
  function cap(s) { return s ? s.replace(/\b\w/g, function (c) { return c.toUpperCase(); }) : s; }
  function fmtDate(iso) { var d = new Date(iso + 'T12:00:00'); return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
  var isMobile = function () { return window.matchMedia('(max-width: 760px)').matches; };

  function laneCount(key) { return built.lanes[key].length; }
  var conflictCount = built.cards.filter(function (c) { return c.conflict.length; }).length;

  function renderStrip() {
    var s = document.getElementById('strip'); s.textContent = '';
    function stat(label, n, flag, note) {
      var e = el('span', 'stat' + (flag && n > 0 ? ' flag' : '')); var b = el('b', null, String(n));
      e.appendChild(b); e.appendChild(document.createTextNode(' ' + label + (note ? ' (' + note + ')' : '')));
      return e;
    }
    var v1 = el('span', 'grp'); v1.appendChild(el('span', 'grp-label', 'V1'));
    v1.appendChild(stat('In Flight', laneCount('inflight'), false, "TJ's queue"));
    v1.appendChild(stat('Exceptions', laneCount('exception')));
    v1.appendChild(stat('Maintenance', laneCount('maintenance')));
    v1.appendChild(stat('Gate decision', laneCount('gate')));
    v1.appendChild(stat('Unassigned', laneCount('unassigned'), true));
    v1.appendChild(stat('Lane conflicts', conflictCount, true));
    var v2 = el('span', 'grp'); v2.appendChild(el('span', 'grp-label', 'V2 (not V1 work)'));
    v2.appendChild(stat('V2 Prep', laneCount('v2prep')));
    v2.appendChild(stat('V2 Candidates', laneCount('v2cand')));
    s.appendChild(v1); s.appendChild(v2);
    s.appendChild(el('span', 'synced', 'Last synced ' + fmtDate(DATA.syncedAt)));
  }

  function renderFilters() {
    var fs = document.getElementById('laneFilter');
    LANES.forEach(function (l) {
      if (l.key === 'unassigned' && !laneCount('unassigned')) return;
      var lab = el('label', 'lane-chip'); var cb = document.createElement('input');
      cb.type = 'checkbox'; cb.checked = true; cb.setAttribute('data-lane', l.key);
      cb.addEventListener('change', function () { state.lanes[l.key] = cb.checked; renderBoard(); });
      lab.appendChild(cb); lab.appendChild(document.createTextNode(l.label)); fs.appendChild(lab);
    });
    document.getElementById('q').addEventListener('input', function (e) { state.q = e.target.value.trim().toLowerCase(); renderBoard(); });
    document.getElementById('bugOnly').addEventListener('change', function (e) { state.bug = e.target.checked; renderBoard(); });
  }

  function renderLegend() {
    var dl = document.getElementById('legendList');
    LANES.forEach(function (l) {
      dl.appendChild(el('dt', null, l.label + (l.group === 'V2' ? ' (V2)' : '')));
      dl.appendChild(el('dd', null, l.desc));
    });
  }

  function cardEl(c) {
    var t = c.task;
    var card = el('div', 'card' + (c.shipping ? ' shipping' : ''));
    var a = el('a', 'card-title', t.name); a.href = 'https://app.clickup.com/t/' + t.id; a.target = '_blank'; a.rel = 'noopener';
    a.appendChild(el('span', 'ext', ' ↗')); a.querySelector('.ext').setAttribute('aria-hidden', 'true');
    a.setAttribute('aria-label', t.name + ' (opens in ClickUp, new tab)');
    card.appendChild(a);
    var m = el('div', 'meta');
    if (c.pin) m.appendChild(el('span', 'badge b-pin', c.pin === 'now' ? 'Now' : 'Next'));
    if (c.shipping) m.appendChild(el('span', 'badge b-ship', 'Shipping'));
    m.appendChild(el('span', 'badge b-status', statusLabel(t.status)));
    var p = el('span', 'badge b-pri ' + (t.priority || 'none')); p.appendChild(el('span', 'dot'));
    p.appendChild(document.createTextNode(t.priority ? cap(t.priority) + ' priority' : 'No priority')); m.appendChild(p);
    if (String(t.type).toLowerCase() === 'bug') m.appendChild(el('span', 'badge b-bug', 'Bug'));
    if (c.conflict.length) m.appendChild(el('span', 'badge b-conflict', 'Lane conflict: ' + c.conflict.join(', ')));
    card.appendChild(m);
    return card;
  }

  function visible(c) {
    if (!state.lanes[c.lane]) return false;
    if (state.bug && String(c.task.type).toLowerCase() !== 'bug') return false;
    if (state.q && c.task.name.toLowerCase().indexOf(state.q) === -1) return false;
    return true;
  }

  var collapsedByUser = {};
  function laneEl(l) {
    var all = built.lanes[l.key], shown = all.filter(visible);
    var sec = el('section', 'lane' + (l.key === 'unassigned' ? ' unassigned' : ''));
    sec.setAttribute('data-lane', l.key);
    var collapsed = collapsedByUser[l.key] !== undefined ? collapsedByUser[l.key] : (isMobile() && l.key !== 'inflight');
    if (collapsed) sec.classList.add('collapsed');
    var bodyId = 'lane-body-' + l.key;
    var h = el('h2'); h.style.fontSize = 'inherit';
    var btn = el('button', 'lane-head'); btn.type = 'button';
    btn.setAttribute('aria-expanded', String(!collapsed)); btn.setAttribute('aria-controls', bodyId);
    var nm = el('span', 'name', l.label); if (l.note) nm.appendChild(el('span', 'sub', l.note));
    btn.appendChild(nm);
    if (l.key === 'unassigned') btn.appendChild(el('span', 'attn', 'Needs attention'));
    var cnt = el('span', 'count', String(all.length)); cnt.setAttribute('aria-label', all.length + ' tickets'); btn.appendChild(cnt);
    var chev = el('span', 'chev', '▼'); chev.setAttribute('aria-hidden', 'true'); btn.appendChild(chev);
    btn.addEventListener('click', function () {
      var now = sec.classList.toggle('collapsed'); collapsedByUser[l.key] = now; btn.setAttribute('aria-expanded', String(!now));
    });
    h.appendChild(btn); sec.appendChild(h);
    var body = el('div', 'lane-body'); body.id = bodyId;
    if (shown.length) shown.forEach(function (c) { body.appendChild(cardEl(c)); });
    else body.appendChild(el('div', 'lane-empty', all.length ? 'No tickets match the filters' : 'No tickets in this lane'));
    sec.appendChild(body);
    return sec;
  }

  function renderBoard() {
    var board = document.getElementById('board'); board.textContent = '';
    var v2 = el('div', 'v2-group'); v2.appendChild(el('span', 'v2-group-label', 'V2 (not V1 work)'));
    LANES.forEach(function (l) {
      if (l.key === 'unassigned' && !laneCount('unassigned')) return;
      (l.group === 'V2' ? v2 : board).appendChild(laneEl(l));
    });
    board.appendChild(v2);
    var total = built.cards.length, shown = built.cards.filter(visible).length;
    document.getElementById('showing').textContent = shown === total ? '' : 'Showing ' + shown + ' of ' + total + ' tickets';
  }

  renderStrip(); renderFilters(); renderLegend(); renderBoard();
  var wasMobile = isMobile();
  window.addEventListener('resize', function () { var m = isMobile(); if (m !== wasMobile) { wasMobile = m; collapsedByUser = {}; renderBoard(); } });
})();
