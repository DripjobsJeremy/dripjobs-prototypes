/*
 * Laura Progress: shared rules (browser + Node). No data lives here.
 * Every rule from the brief is implemented once, in this file:
 *   inclusion, status groups, lanes, weeks, ramp months, tiles, filters.
 * Times are epoch ms. Calendar math uses TZ below (the ClickUp account timezone).
 */
(function (root) {
  var CFG = {
    TZ: 'America/New_York',
    LAURA_ID: 82240534,
    LAURA_NAME: 'Laura Cuadros',
    BASELINE: '2026-11-02',            // tickets created on/after this local date
    // Assumption (flagged in docs/decision-log.md): tickets merely assigned to Laura
    // are shown as "worked" even when created before the baseline.
    ASSIGNED_IGNORES_BASELINE: true,
    SPACES: { pm: '90140994633', dev: '90140994811', qa: '90142569445' /* QA Space - V1, in the Roadmap In Flight list since Nov 3 */ },
    // Draft lists: tickets here are Draft until they move to Active Triage.
    // 901413487018 is the Form list (UX Review folder); 901422482967 is the "Shared with me" list (Feature Radar).
    FORM_LIST_IDS: ['901413487018', '901422482967'],
    // Never read, never shown. 901421393122 is the V2 Web Development list (never touch).
    EXCLUDED_LIST_IDS: ['901421393122', '901412659249' /* V2 folder list */, '901413486812' /* UX Review Tracking */],
    FRESH_DAYS: 7,
    RAMP: [
      { key: 'm1', label: 'Month 1', from: '2026-11-02', to: '2026-11-29' },
      { key: 'm2', label: 'Month 2', from: '2026-11-30', to: '2026-12-27' },
      { key: 'm3', label: 'Month 3', from: '2026-12-28', to: '2027-01-31' }
    ]
  };

  /* ---------- status groups (confirmed with Jeremy, Nov 6 2026) ---------- */
  var GROUPS = [
    { key: 'draft',   label: 'Draft' },
    { key: 'triage',  label: 'In Triage' },
    { key: 'flight',  label: 'In Flight' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'closed',  label: 'Cleared' }
  ];
  var STATUS_MAP = {
    triage: ['new', 'open', 'product signals dji', 'dji bugs review', 'needs pm analysis', 'needs design',
      'in review', 'triage', 'kickback', 'postponed', 'on hold', 'needs analysis', 'analysis complete',
      'needs more info', 'cannot replicate', 'flight delayed', 'flight crew pre-check', 'short term parking',
      'long term parking', 'boarding gates closing', 'gate change to (v2)'],
    flight: ['send to dev', 'ready for dev', 'need more context', 'need context', 'qa kickback', 'in progress',
      'awaiting test site', 'deployed to test', 'testing complete', 'pr created', 'code complete',
      'branch ready', 'pr rejected', 'needs more work', 'ready for production', 'test in progress', 'testing ready'],
    shipped: ['pushed to production'],
    closed: ['no fix needed', 'resolved without fix', 'trashed']
  };
  var STATUS_LOOKUP = {};
  Object.keys(STATUS_MAP).forEach(function (g) {
    STATUS_MAP[g].forEach(function (s) { STATUS_LOOKUP[s] = g; });
  });

  function norm(s) { return String(s == null ? '' : s).toLowerCase().replace(/\s+/g, ' ').trim(); }

  /* Returns group key, or '' when the status is not mapped (the routine reports these). */
  function statusGroup(t) {
    if (CFG.FORM_LIST_IDS.indexOf(String(t.listId)) !== -1) return 'draft';
    return STATUS_LOOKUP[norm(t.status)] || '';
  }

  /* ---------- lanes (same precedence as the Roadmap) ---------- */
  var LANES = [
    { key: 'inflight',    label: 'In Flight' },
    { key: 'v2cand',      label: 'V2 Candidate' },
    { key: 'exception',   label: 'Approved Exception' },
    { key: 'maintenance', label: 'V1 Maintenance' },
    { key: 'gate',        label: 'Gate Decision Needed' },
    { key: 'v2prep',      label: 'V2 Prep' },
    { key: 'none',        label: 'No lane' }
  ];
  var LANE_TAGS = { 'v2 candidate': 'v2cand', 'lane: exception': 'exception', 'lane: maintenance': 'maintenance',
    'lane: gate': 'gate', 'lane: v2 prep': 'v2prep' };

  function isBug(t) { return norm(t.type) === 'bug' || norm(t.taskType) === 'bug'; }
  function effectiveType(t) {
    var v = String(t.type || t.taskType || '').trim();
    return v;
  }
  function typeKey(t) {
    if (isBug(t)) return 'bug';
    var v = norm(t.type || t.taskType);
    return v || 'other';
  }
  function laneOf(t) {
    var tags = (t.tags || []).map(norm);
    if (String(t.spaceId) === CFG.SPACES.dev || String(t.spaceId) === CFG.SPACES.qa) return { lane: 'inflight', conflict: [] };
    var present = Object.keys(LANE_TAGS).filter(function (k) { return tags.indexOf(k) !== -1; });
    var lane = 'none';
    if (tags.indexOf('v2 candidate') !== -1) lane = 'v2cand';
    else if (tags.indexOf('lane: exception') !== -1) lane = 'exception';
    else if (tags.indexOf('lane: maintenance') !== -1 || isBug(t)) lane = 'maintenance';
    else if (tags.indexOf('lane: gate') !== -1) lane = 'gate';
    else if (tags.indexOf('lane: v2 prep') !== -1) lane = 'v2prep';
    return { lane: lane, conflict: present.length > 1 ? present : [] };
  }
  function isFocus(t) { return (t.tags || []).some(function (x) { return String(x).indexOf('\uD83C\uDFAF') !== -1; }); }

  /* ---------- time ---------- */
  var dtf = null;
  function parts(ms) {
    dtf = dtf || new Intl.DateTimeFormat('en-US', { timeZone: CFG.TZ, hourCycle: 'h23',
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    var o = {};
    dtf.formatToParts(new Date(ms)).forEach(function (p) { o[p.type] = parseInt(p.value, 10); });
    return o;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function localDate(ms) { var p = parts(ms); return p.year + '-' + pad(p.month) + '-' + pad(p.day); }
  function offsetAt(ms) {
    var p = parts(ms);
    return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(ms / 1000) * 1000;
  }
  function addDays(ymd, n) {
    var a = ymd.split('-').map(Number), d = new Date(Date.UTC(a[0], a[1] - 1, a[2] + n));
    return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate());
  }
  function startMs(ymd) { // local midnight of ymd
    var a = ymd.split('-').map(Number), utc = Date.UTC(a[0], a[1] - 1, a[2]);
    var r = utc - offsetAt(utc);
    var o2 = offsetAt(r);
    return utc - o2;
  }
  function endMs(ymd) { return startMs(addDays(ymd, 1)) - 1; } // end of local day
  function mondayOf(ymd) {
    var a = ymd.split('-').map(Number), dow = new Date(Date.UTC(a[0], a[1] - 1, a[2])).getUTCDay();
    return addDays(ymd, -((dow + 6) % 7));
  }
  function weekRange(mondayYmd) { return { key: mondayYmd, from: startMs(mondayYmd), to: startMs(addDays(mondayYmd, 7)) - 1,
    sunday: addDays(mondayYmd, 6) }; }
  function weekOf(ms) { return weekRange(mondayOf(localDate(ms))); }
  function rampOf(ms) {
    var d = localDate(ms);
    for (var i = 0; i < CFG.RAMP.length; i++) if (d >= CFG.RAMP[i].from && d <= CFG.RAMP[i].to) return CFG.RAMP[i].key;
    return '';
  }
  function fmtDate(ms) {
    if (!ms) return '';
    var p = parts(ms), m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][p.month - 1];
    return m + ' ' + p.day + ', ' + p.year;
  }
  function fmtYmd(ymd) { return fmtDate(startMs(ymd) + 3600000 * 12); }

  /* ---------- inclusion ---------- */
  /* t: raw ticket as stored. Returns 'drafter' | 'fallback' | 'assigned' | '' (not Laura's). */
  function classify(t) {
    if (String(t.listId) && CFG.EXCLUDED_LIST_IDS.indexOf(String(t.listId)) !== -1) return '';
    // A ticket with nothing in its body (no description) is left out of the report.
    // Only an explicit include override in the notes file can bring it back.
    if (t.hasBody === false) return '';
    var inSpace = [CFG.SPACES.pm, CFG.SPACES.dev].indexOf(String(t.spaceId)) !== -1;
    if (!inSpace) return '';
    var base = startMs(CFG.BASELINE);
    var assigned = (t.assigneeIds || []).map(String).indexOf(String(CFG.LAURA_ID)) !== -1;
    if (norm(t.drafter) === norm(CFG.LAURA_NAME)) return t.created >= base ? 'drafter' : (assigned && CFG.ASSIGNED_IGNORES_BASELINE ? 'assigned' : '');
    if (!t.drafter && norm(t.creator) === norm(CFG.LAURA_NAME)) return t.created >= base ? 'fallback' : (assigned && CFG.ASSIGNED_IGNORES_BASELINE ? 'assigned' : '');
    if (assigned && (CFG.ASSIGNED_IGNORES_BASELINE || t.created >= base)) return 'assigned';
    return '';
  }

  /* ---------- model ---------- */
  /* data: decrypted data bundle. notes: decrypted notes (or null). now: epoch ms. */
  function buildModel(data, notes, now) {
    notes = notes || {};
    var ovr = {};
    (notes.overrides || []).forEach(function (o) { if (o && o.id) ovr[String(o.id)] = { action: o.action === 'exclude' ? 'exclude' : 'include', reason: String(o.reason || '') }; });
    var touches = data.touches || {};
    var items = [], excluded = [];
    (data.tickets || []).forEach(function (t) {
      if (CFG.EXCLUDED_LIST_IDS.indexOf(String(t.listId)) !== -1) return;
      var inc = classify(t), o = ovr[String(t.id)];
      var flags = [];
      if (o && o.action === 'exclude') { excluded.push({ t: t, reason: o.reason }); return; }
      if (o && o.action === 'include') { inc = inc || 'override'; flags.push({ k: 'override', text: 'Included by override: ' + (o.reason || 'no reason given') }); }
      if (!inc) return;
      if (inc === 'fallback') flags.push({ k: 'drafter', text: 'Product Drafter missing' });
      if (inc === 'assigned') flags.push({ k: 'assigned', text: 'Assigned to Laura' });
      var ln = laneOf(t);
      if (ln.conflict.length) flags.push({ k: 'conflict', text: 'Lane conflict' });
      var grp = statusGroup(t);
      if (!grp) flags.push({ k: 'unmapped', text: 'Status not mapped' });
      var tm = (touches[t.id] || []).concat([t.updated]).filter(Boolean);
      items.push({ t: t, inc: inc, lane: ln.lane, group: grp, type: typeKey(t), focus: isFocus(t), flags: flags,
        touches: tm, own: inc !== 'assigned' });
    });
    return { items: items, excluded: excluded, notes: notes, data: data, now: now };
  }

  function touchedIn(it, from, to) { return it.touches.some(function (m) { return m >= from && m <= to; }); }
  function createdIn(it, from, to) { return it.t.created >= from && it.t.created <= to; }

  function tiles(model) {
    var w = weekOf(model.now), n = { worked: 0, added: 0, cleared: 0, shipped: 0, flight: 0 };
    model.items.forEach(function (it) {
      if (touchedIn(it, w.from, w.to)) n.worked++;
      if (it.group === 'closed' && touchedIn(it, w.from, w.to)) n.cleared++; // cleared from the board after evaluating or testing
      if (it.own && createdIn(it, w.from, w.to)) n.added++;
      if (it.own && it.group === 'shipped') n.shipped++;
      if (it.own && it.group === 'flight') n.flight++;
    });
    return { week: w, counts: n };
  }

  /* range: {from, to} ms. Returns the window for a preset. */
  function presetRange(preset, now, custom) {
    var today = localDate(now), w = weekOf(now);
    if (preset === 'this-week') return { from: w.from, to: w.to };
    if (preset === 'last-week') { var lw = weekRange(addDays(w.key, -7)); return { from: lw.from, to: lw.to }; }
    if (preset === 'this-month') { var ms = today.slice(0, 8) + '01'; return { from: startMs(ms), to: Infinity }; }
    if (preset === 'custom') {
      return { from: custom && custom.from ? startMs(custom.from) : -Infinity, to: custom && custom.to ? endMs(custom.to) : Infinity };
    }
    return { from: startMs(CFG.BASELINE), to: Infinity }; // since start (assigned tickets keyed by activity, so allow earlier touches too)
  }

  /* f: {range:{from,to}, group, lane, type, focus, ramp}. Attribute filter only (no range). */
  function attrMatch(it, f) {
    if (f.group && f.group !== 'all' && it.group !== f.group) return false;
    if (f.lane && f.lane !== 'all' && it.lane !== f.lane) return false;
    if (f.type && f.type !== 'all' && it.type !== f.type) return false;
    if (f.focus && !it.focus) return false;
    return true;
  }
  function rangeMatch(it, from, to) { return createdIn(it, from, to) || touchedIn(it, from, to); }
  function rampWindow(key) {
    for (var i = 0; i < CFG.RAMP.length; i++) if (CFG.RAMP[i].key === key) return { from: startMs(CFG.RAMP[i].from), to: endMs(CFG.RAMP[i].to) };
    return null;
  }
  function filterItems(model, f) {
    var r = f.range || { from: -Infinity, to: Infinity };
    var rw = f.ramp && f.ramp !== 'all' ? rampWindow(f.ramp) : null;
    return model.items.filter(function (it) {
      if (!attrMatch(it, f)) return false;
      if (!rangeMatch(it, r.from, r.to)) return false;
      if (rw && !rangeMatch(it, rw.from, rw.to)) return false;
      return true;
    }).sort(function (a, b) { return Math.max.apply(null, b.touches) - Math.max.apply(null, a.touches); });
  }

  /* Weeks from the baseline week to the current week, newest first. */
  function weeks(model, f) {
    var first = mondayOf(CFG.BASELINE), last = mondayOf(localDate(model.now)), out = [];
    var r = f.range || { from: -Infinity, to: Infinity };
    var rw = f.ramp && f.ramp !== 'all' ? rampWindow(f.ramp) : null;
    for (var m = last; m >= first; m = addDays(m, -7)) {
      var w = weekRange(m);
      if (w.to < r.from || w.from > r.to) continue;
      if (rw && (w.to < rw.from || w.from > rw.to)) continue;
      var worked = [], added = [];
      model.items.forEach(function (it) {
        if (!attrMatch(it, f)) return;
        if (touchedIn(it, w.from, w.to)) worked.push(it);
        if (it.own && createdIn(it, w.from, w.to)) added.push(it);
      });
      var h = (model.notes.highlights || {})[m] || null;
      if (h && !(String(h.growth || '').trim() || String(h.value || '').trim() || String(h.setbacks || '').trim())) h = null;
      var up = (model.notes.updates || {})[m] || null;
      if (up && !String(up.markdown || '').trim()) up = null;
      out.push({ week: w, worked: worked, added: added, highlights: h, update: up });
    }
    return out;
  }

  /* Laura's own tickets by status group, counts only (no percentages, no comparison). */
  function statusMix(model) {
    var c = {};
    model.items.forEach(function (it) { if (!it.own) return; var k = it.group || 'unmapped'; c[k] = (c[k] || 0) + 1; });
    var out = GROUPS.map(function (g) { return { key: g.key, label: g.label, count: c[g.key] || 0 }; })
      .filter(function (x) { return x.count > 0; });
    if (c.unmapped) out.push({ key: 'unmapped', label: 'Status not mapped', count: c.unmapped });
    return out;
  }

  /* Laura's own shipped tickets, newest first. ClickUp's closed date is used when it has one,
     otherwise the last updated date (exact: false). */
  function shipped(model) {
    return model.items.filter(function (it) { return it.own && it.group === 'shipped'; })
      .map(function (it) { return { it: it, at: it.t.closed || it.t.updated, exact: !!it.t.closed }; })
      .sort(function (a, b) { return b.at - a.at; });
  }

  /* Newest week (not in the future) that has any Highlights text. */
  function latestHighlights(model) {
    var hs = model.notes.highlights || {}, cur = mondayOf(localDate(model.now));
    var keys = Object.keys(hs).filter(function (k) {
      var h = hs[k];
      return k <= cur && h && (String(h.growth || '').trim() || String(h.value || '').trim() || String(h.setbacks || '').trim());
    }).sort();
    if (!keys.length) return null;
    var k = keys[keys.length - 1];
    return { key: k, week: weekRange(k), hl: hs[k] };
  }

  function freshness(data, now) {
    if (!data.pulledAt) return { pulledAt: 0, stale: false, empty: true };
    return { pulledAt: data.pulledAt, stale: (now - data.pulledAt) > CFG.FRESH_DAYS * 86400000, empty: false };
  }

  var api = { CFG: CFG, GROUPS: GROUPS, LANES: LANES, STATUS_MAP: STATUS_MAP, norm: norm, statusGroup: statusGroup,
    laneOf: laneOf, effectiveType: effectiveType, typeKey: typeKey, isFocus: isFocus, localDate: localDate, startMs: startMs,
    endMs: endMs, addDays: addDays, mondayOf: mondayOf, weekRange: weekRange, weekOf: weekOf, rampOf: rampOf,
    fmtDate: fmtDate, fmtYmd: fmtYmd, classify: classify, buildModel: buildModel, tiles: tiles,
    presetRange: presetRange, filterItems: filterItems, weeks: weeks, freshness: freshness, touchedIn: touchedIn,
    statusMix: statusMix, shipped: shipped, latestHighlights: latestHighlights };
  root.LPLogic = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : this);
