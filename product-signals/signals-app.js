/*
 * Product Signals tab: renders PS_ROWS / PS_RECURRING (signals-data.js) into the hub.
 * Shared triage decisions come from the data file (PS_TRIAGE). Changes made on the tab are saved in this browser only
 * (localStorage), they never leave the device, and they override the shared decision for that row.
 */
(function () {
  var rows = window.PS_ROWS || [];
  var recurring = window.PS_RECURRING || [];
  var meta = window.PS_META || {};
  var sweeps = window.PS_SWEEPS || {};
  var themes = window.PS_THEMES || {};
  var rowsEl = document.getElementById('psRows');
  if (!rowsEl) return;

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var CHANNELS = {
    'bug-review': '#bug-review',
    'product-signals': '#product-signals',
    'thinktank': '#tanner-innovative-thinktank',
    'tanner-tickets': '#tanner-tickets',
    'dji-intake': 'DJI intake (Aug 21 batch)'
  };
  var SEV_RANK = { 'Expedite': 0, 'S1': 1, 'High': 1.5, 'S2': 2, '': 2.5, 'S3': 3, 'Medium': 3.5, 'S4': 4 };
  var COV_RANK = { none: 0, possible: 1, tracked: 2, shipped: 3 };
  var COV_LABEL = { none: '🎫 No ticket found', possible: '⚠️ Verify match', tracked: '✅ Tracked', shipped: '🚀 Shipped' };
  var TRIAGE = [
    ['', 'Untriaged'], ['reviewing', 'Reviewing'], ['needs-ticket', 'Needs ticket'],
    ['ticketed', 'Ticket created'], ['parked', 'Parked'], ['dismissed', 'Dismissed']
  ];
  var STORE_KEY = 'dj-product-signals-triage-v1';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function parseDay(iso) { var p = iso.split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]); }
  function fmtDate(iso) { var p = iso.split('-'); return MONTHS[+p[1] - 1] + ' ' + (+p[2]) + ', ' + p[0]; }
  function rowKey(r) { return r.d + '|' + r.title.slice(0, 70); }
  function isCritical(r) { return r.type === 'bug' && (r.sev === 'Expedite' || r.sev === 'S1' || r.sev === 'High'); }

  // Triage state (browser only)
  var triage = {};
  try { triage = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {}; } catch (e) { triage = {}; }
  function saveTriage() { try { localStorage.setItem(STORE_KEY, JSON.stringify(triage)); } catch (e) { /* storage blocked, state stays in memory */ } }
  function getTriage(r) { return triage[rowKey(r)] || { s: r.triage || '', n: r.tnote || '' }; }

  // Filter state
  var DEFAULT_STATE = { stat: 'all', q: '', type: 'all', sev: 'all', source: 'all', theme: 'all', win: '30', triage: 'open', sort: 'priority' };
  var state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  var lastSweepMs = meta.lastSweep ? parseDay(meta.lastSweep) : Date.now();

  var ui = {
    search: document.getElementById('psSearch'), type: document.getElementById('psType'), sev: document.getElementById('psSev'),
    source: document.getElementById('psSource'), theme: document.getElementById('psTheme'), win: document.getElementById('psWindow'),
    triage: document.getElementById('psTriageFilter'), sort: document.getElementById('psSort'),
    count: document.getElementById('psResultCount'), empty: document.getElementById('psEmptyState'),
    stats: Array.prototype.slice.call(document.querySelectorAll('.ps-stat'))
  };

  function fillSelect(sel, items, firstLabel) {
    sel.textContent = '';
    var all = el('option', null, firstLabel); all.value = 'all'; sel.appendChild(all);
    items.forEach(function (it) { var o = el('option', null, it[1]); o.value = it[0]; sel.appendChild(o); });
  }
  fillSelect(ui.source, Object.keys(CHANNELS).map(function (k) { return [k, CHANNELS[k]]; }), 'All sources');
  fillSelect(ui.theme, Object.keys(themes).map(function (k) { return [k, themes[k]]; }), 'All themes');
  fillSelect(ui.triage, TRIAGE.map(function (t) { return [t[0] || 'untriaged', t[1]]; }), 'All triage states');
  (function () { var o = el('option', null, 'Open (hide dismissed)'); o.value = 'open'; ui.triage.insertBefore(o, ui.triage.firstChild); ui.triage.value = 'open'; })();

  function matchesBase(r) {
    if (state.type !== 'all' && r.type !== state.type) return false;
    if (state.sev !== 'all' && r.sev !== state.sev) return false;
    if (state.source !== 'all' && r.ch !== state.source) return false;
    if (state.theme !== 'all' && r.theme !== state.theme) return false;
    if (state.win !== 'all' && parseDay(r.d) < lastSweepMs - (+state.win) * 86400000) return false;
    if (state.triage !== 'all') {
      var s = getTriage(r).s || 'untriaged';
      if (state.triage === 'open') { if (s === 'dismissed') return false; }
      else if (s !== state.triage) return false;
    }
    if (state.q) {
      var hay = [r.title, r.note, r.who, r.ch, themes[r.theme] || '', r.ticket ? r.ticket.id + ' ' + r.ticket.status : ''].join(' ').toLowerCase();
      if (hay.indexOf(state.q) === -1) return false;
    }
    return true;
  }
  function matchesStat(r, stat) {
    switch (stat) {
      case 'critical': return isCritical(r);
      case 'none': return r.cov === 'none' && !r.human;
      case 'possible': return r.cov === 'possible';
      case 'human': return !!r.human;
      case 'covered': return r.cov === 'tracked' || r.cov === 'shipped';
      default: return true;
    }
  }
  function compare(a, b) {
    if (state.sort === 'newest') return b.d.localeCompare(a.d);
    if (state.sort === 'oldest') return a.d.localeCompare(b.d);
    if (state.sort === 'mentions') return (b.n || 1) - (a.n || 1) || SEV_RANK[a.sev] - SEV_RANK[b.sev] || b.d.localeCompare(a.d);
    // priority: severity as rated, then uncovered before covered, then more mentions, then newest
    return SEV_RANK[a.sev] - SEV_RANK[b.sev] || COV_RANK[a.cov] - COV_RANK[b.cov] || (b.n || 1) - (a.n || 1) || b.d.localeCompare(a.d);
  }

  var visible = [];
  function render() {
    var base = rows.filter(matchesBase);
    var counts = { all: base.length, critical: 0, none: 0, possible: 0, human: 0, covered: 0 };
    base.forEach(function (r) { ['critical', 'none', 'possible', 'human', 'covered'].forEach(function (k) { if (matchesStat(r, k)) counts[k]++; }); });
    ui.stats.forEach(function (b) { b.querySelector('.stat-value').textContent = counts[b.dataset.psFilter] || 0; });

    visible = base.filter(function (r) { return matchesStat(r, state.stat); }).sort(compare);
    rowsEl.textContent = '';
    var frag = document.createDocumentFragment();
    visible.forEach(function (r) { frag.appendChild(buildRow(r)); });
    rowsEl.appendChild(frag);
    ui.empty.classList.toggle('visible', visible.length === 0);

    var hidden = state.win === 'all' ? 0 : rows.filter(function (r) { return parseDay(r.d) < lastSweepMs - (+state.win) * 86400000; }).length;
    ui.count.textContent = '';
    var s = el('strong', null, String(visible.length));
    ui.count.appendChild(s);
    ui.count.appendChild(document.createTextNode(' of ' + rows.length + ' signals shown' + (hidden ? ' (' + hidden + ' older than the time window are hidden)' : '')));
    if (hidden) {
      ui.count.appendChild(document.createTextNode(' '));
      var more = el('button', 'ps-linkbtn', 'Show all time');
      more.type = 'button';
      more.addEventListener('click', function () { state.win = 'all'; ui.win.value = 'all'; render(); });
      ui.count.appendChild(more);
    }
    if (state.triage === 'open') {
      var dismissed = rows.filter(function (r) { return getTriage(r).s === 'dismissed'; }).length;
      if (dismissed) {
        ui.count.appendChild(document.createTextNode(' · ' + dismissed + ' dismissed hidden '));
        var sd = el('button', 'ps-linkbtn', 'Show dismissed');
        sd.type = 'button';
        sd.addEventListener('click', function () { state.triage = 'all'; ui.triage.value = 'all'; render(); });
        ui.count.appendChild(sd);
      }
    }
  }

  function buildRow(r) {
    var t = getTriage(r);
    var row = el('div', 'ps-row');
    if (r.type === 'bug' && (r.sev === 'Expedite' || r.sev === 'S1' || r.sev === 'High')) row.classList.add('ps-sev-hot');
    else if (r.sev === 'S2') row.classList.add('ps-sev-warm');
    if (t.s === 'dismissed' || t.s === 'parked') row.classList.add('ps-dismissed');

    // Signal
    var c1 = el('div', 'ps-col ps-col-signal');
    var title = el('div', 'ps-signal-title');
    var icon = el('span', 'ps-type-icon', r.type === 'bug' ? '🐞' : '💡');
    icon.title = r.type === 'bug' ? 'Bug' : 'Enhancement';
    title.appendChild(icon);
    title.appendChild(document.createTextNode(r.title));
    c1.appendChild(title);
    var chips = el('div', 'ps-chips');
    chips.appendChild(el('span', 'ps-chip', CHANNELS[r.ch] || r.ch));
    if (r.theme && themes[r.theme]) {
      var tb = el('button', 'ps-chip', themes[r.theme]);
      tb.type = 'button'; tb.title = 'Filter to this theme';
      tb.addEventListener('click', function () { state.theme = r.theme; ui.theme.value = r.theme; state.win = 'all'; ui.win.value = 'all'; render(); });
      chips.appendChild(tb);
    }
    if (r.n > 1) chips.appendChild(el('span', 'ps-chip', r.n + ' mentions'));
    if (r.human) chips.appendChild(el('span', 'ps-chip ps-chip-human', '👀 Needs a human look'));
    c1.appendChild(chips);
    if (r.note) {
      var note = el('div', 'ps-note', r.note);
      c1.appendChild(note);
      if (r.note.length > 150) {
        var tg = el('button', 'ps-toggle', 'Show more');
        tg.type = 'button';
        tg.addEventListener('click', function () { var ex = note.classList.toggle('expanded'); tg.textContent = ex ? 'Show less' : 'Show more'; });
        c1.appendChild(tg);
      }
    }
    if (r.sw && sweeps[r.sw] && meta.channelUrl) {
      var a = el('a', 'ps-slacklink', 'View sweep in Slack ↗');
      a.href = meta.channelUrl + '/p' + sweeps[r.sw].replace('.', '');
      a.target = '_blank'; a.rel = 'noopener';
      var wrap = el('div'); wrap.style.marginTop = '4px'; wrap.appendChild(a);
      c1.appendChild(wrap);
    }
    row.appendChild(c1);

    // Severity
    var c2 = el('div', 'ps-col');
    c2.appendChild(el('span', 'ps-col-label', 'Severity'));
    c2.appendChild(el('span', 'ps-sev ps-sev-' + (r.sev || 'none'), r.sev || 'Unrated'));
    row.appendChild(c2);

    // Coverage
    var c3 = el('div', 'ps-col ps-col-ref');
    c3.appendChild(el('span', 'ps-col-label', 'Ticket Coverage'));
    c3.appendChild(el('span', 'ps-badge ps-cov-' + r.cov, COV_LABEL[r.cov]));
    if (r.ticket) {
      var line = el('span', 'ps-ticket-status');
      var tl = el('a', 'ticket-link', r.ticket.id);
      tl.href = 'https://app.clickup.com/t/' + r.ticket.id; tl.target = '_blank'; tl.rel = 'noopener';
      line.appendChild(tl);
      line.appendChild(document.createTextNode(' · ' + r.ticket.status));
      if (r.ticket.live) {
        var ck = el('span', 'ps-checked', ' ✓ checked ' + fmtDate(meta.syncedOn).replace(', 2026', ''));
        ck.title = 'Status read from ClickUp on the sync date';
        line.appendChild(ck);
      }
      c3.appendChild(line);
    }
    row.appendChild(c3);

    // Reported
    var c4 = el('div', 'ps-col ps-col-user');
    c4.appendChild(el('span', 'ps-col-label', 'Reported'));
    if (r.who) { var w = el('strong', null, r.who); w.title = 'DripJobs rep or channel member who raised it'; c4.appendChild(w); c4.appendChild(el('br')); }
    c4.appendChild(document.createTextNode(fmtDate(r.d)));
    row.appendChild(c4);

    // Triage
    var c5 = el('div', 'ps-col ps-col-triage');
    c5.appendChild(el('span', 'ps-col-label', 'Triage'));
    var sel = el('select', 'ps-triage-select');
    sel.setAttribute('aria-label', 'Triage state for ' + r.title);
    TRIAGE.forEach(function (o) { var op = el('option', null, o[1]); op.value = o[0]; if (o[0] === t.s) op.selected = true; sel.appendChild(op); });
    c5.appendChild(sel);
    var ta = el('textarea', 'ps-triage-note');
    ta.placeholder = 'Triage note'; ta.value = t.n || ''; ta.setAttribute('aria-label', 'Triage note');
    ta.hidden = !t.n;
    var nb = el('button', 'ps-toggle', t.n ? 'Edit note' : 'Add note'); nb.type = 'button';
    nb.addEventListener('click', function () { ta.hidden = !ta.hidden; if (!ta.hidden) ta.focus(); });
    c5.appendChild(el('br')); c5.appendChild(nb); c5.appendChild(ta);
    var key = rowKey(r);
    function persist() {
      var cur = triage[key] || { s: '', n: '' };
      cur.s = sel.value; cur.n = ta.value;
      triage[key] = cur;
      saveTriage();
      nb.textContent = ta.value ? 'Edit note' : 'Add note';
    }
    sel.addEventListener('change', function () { persist(); render(); });
    ta.addEventListener('input', persist);
    row.appendChild(c5);
    return row;
  }

  // Freshness banner
  (function () {
    var box = document.getElementById('psSync');
    if (!box || !meta.lastSweep) return;
    var days = Math.floor((Date.now() - lastSweepMs) / 86400000);
    var stale = days > 3;
    box.classList.add(stale ? 'stale' : 'fresh');
    var msg = el('span');
    msg.appendChild(el('strong', null, stale ? 'Data is ' + days + ' days old. ' : 'Up to date. '));
    msg.appendChild(document.createTextNode('Last sweep covered through ' + fmtDate(meta.lastSweep) + '; synced ' + fmtDate(meta.syncedOn) + (meta.triageSyncedOn ? '; triage decisions applied ' + fmtDate(meta.triageSyncedOn) : '') + '.'));
    box.appendChild(msg);
    if (stale) {
      var how = el('span');
      how.appendChild(document.createTextNode('To refresh, ask Claude Code in this repo: '));
      how.appendChild(el('code', null, 'Sync signals:'));
      box.appendChild(how);
    }
  })();

  // Recurring themes
  function renderThemes() {
    var host = document.getElementById('psThemes');
    host.textContent = '';
    recurring.forEach(function (t) {
      var card = el('div', 'ps-theme');
      var c1 = el('div');
      c1.appendChild(el('div', 'ps-theme-name', t.name));
      if (t.note) c1.appendChild(el('div', 'ps-note expanded', t.note));
      card.appendChild(c1);
      var c2 = el('div', 'ps-theme-count', t.mentions);
      c2.appendChild(el('small', null, 'mentions since ' + t.since));
      card.appendChild(c2);
      var c3 = el('div', 'ps-col-ref');
      c3.appendChild(el('span', 'ps-badge ps-cov-' + t.cov, t.cov === 'none' ? '🎫 Nothing tracking it' : t.cov === 'possible' ? '⚠️ Partly covered' : '✅ Tracked'));
      if (t.ticket) {
        var line = el('span', 'ps-ticket-status');
        var tl = el('a', 'ticket-link', t.ticket.id);
        tl.href = 'https://app.clickup.com/t/' + t.ticket.id; tl.target = '_blank'; tl.rel = 'noopener';
        line.appendChild(tl);
        line.appendChild(document.createTextNode(' · ' + t.ticket.status));
        if (t.ticket.live) line.appendChild(el('span', 'ps-checked', ' ✓ checked'));
        c3.appendChild(line);
      }
      card.appendChild(c3);
      var c4 = el('div');
      var n = t.theme ? rows.filter(function (r) { return r.theme === t.theme; }).length : 0;
      if (n) {
        var b = el('button', 'ps-linkbtn', 'View ' + n + ' related signal' + (n === 1 ? '' : 's'));
        b.type = 'button';
        b.addEventListener('click', function () {
          state.theme = t.theme; ui.theme.value = t.theme; state.win = 'all'; ui.win.value = 'all'; state.stat = 'all';
          ui.stats.forEach(function (s) { s.classList.toggle('active', s.dataset.psFilter === 'all'); });
          switchView('signals'); render();
        });
        c4.appendChild(b);
      }
      card.appendChild(c4);
      host.appendChild(card);
    });
    document.getElementById('psThemeCount').textContent = '(' + recurring.length + ')';
  }

  function switchView(v) {
    document.getElementById('psSignalsPane').hidden = v !== 'signals';
    document.getElementById('psThemesPane').hidden = v !== 'themes';
    Array.prototype.forEach.call(document.querySelectorAll('.ps-viewbtn'), function (b) {
      var on = b.dataset.psView === v;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.getElementById('psStats').hidden = v !== 'signals';
  }

  // CSV export of the current (filtered) view
  function csvCell(v) { v = String(v == null ? '' : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
  function exportCsv() {
    var head = ['Reported', 'Type', 'Severity', 'Title', 'Source', 'Theme', 'Mentions', 'Ticket coverage', 'Ticket', 'Ticket status', 'Reported by', 'Triage', 'Triage note', 'Sweep note'];
    var lines = [head.join(',')];
    visible.forEach(function (r) {
      var t = getTriage(r);
      var tr = TRIAGE.filter(function (x) { return x[0] === t.s; })[0][1];
      lines.push([r.d, r.type === 'bug' ? 'Bug' : 'Enhancement', r.sev || 'Unrated', r.title, CHANNELS[r.ch] || r.ch, themes[r.theme] || '', r.n || 1,
        COV_LABEL[r.cov].replace(/^\S+\s/, ''), r.ticket ? r.ticket.id : '', r.ticket ? r.ticket.status : '', r.who, tr, t.n, r.note].map(csvCell).join(','));
    });
    var blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'product-signals-' + (meta.syncedOn || 'export') + '.csv';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  // Wiring
  ui.stats.forEach(function (b) {
    b.addEventListener('click', function () {
      state.stat = b.dataset.psFilter;
      ui.stats.forEach(function (x) { x.classList.toggle('active', x === b); });
      render();
    });
  });
  ui.search.addEventListener('input', function () { state.q = ui.search.value.toLowerCase().trim(); render(); });
  [['type', 'type'], ['sev', 'sev'], ['source', 'source'], ['theme', 'theme'], ['win', 'win'], ['triage', 'triage'], ['sort', 'sort']].forEach(function (p) {
    ui[p[0]].addEventListener('change', function () { state[p[1]] = ui[p[0]].value; render(); });
  });
  document.getElementById('psClear').addEventListener('click', function () {
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    ui.search.value = '';
    ['type', 'sev', 'source', 'theme'].forEach(function (k) { ui[k].value = 'all'; });
    ui.triage.value = 'open'; ui.win.value = '30'; ui.sort.value = 'priority';
    ui.stats.forEach(function (x) { x.classList.toggle('active', x.dataset.psFilter === 'all'); });
    render();
  });
  document.getElementById('psExport').addEventListener('click', exportCsv);
  Array.prototype.forEach.call(document.querySelectorAll('.ps-viewbtn'), function (b) {
    b.addEventListener('click', function () { switchView(b.dataset.psView); });
  });

  renderThemes();
  render();
})();
