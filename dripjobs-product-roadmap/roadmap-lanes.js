/*
 * LANE RULES (single implementation, used by the Roadmap page and the Product Signals badge).
 * Precedence, first match wins:
 *   1 task's space is in RM_CONFIG.inFlightSpaces      -> In Flight
 *   2 tag "v2 candidate"                               -> V2 Candidate
 *   3 tag "lane: exception"                            -> V1 Approved Exception
 *   4 tag "lane: maintenance" or task type Bug         -> V1 Maintenance
 *   5 tag "lane: gate"                                 -> Gate Decision Needed
 *   6 tag "lane: v2 prep"                              -> V2 Prep
 *   7 none of the above                                -> Unassigned
 * Tags are matched case insensitively. The retired "v1" and "v2" tags are ignored.
 * Outside In Flight, more than one lane tag (rules 2 to 6, tags only) flags a lane conflict.
 */
(function (root) {
  var LANES = [
    { key: 'inflight',    label: 'In Flight',              group: 'V1', note: "TJ's queue",
      desc: "TJ's active queue: tickets sitting in a development or QA space in ClickUp." },
    { key: 'exception',   label: 'V1 Approved Exceptions', group: 'V1',
      desc: 'Approved V1 work beyond maintenance (Job Costing, Invoice Reminders, Color Chart).' },
    { key: 'maintenance', label: 'V1 Maintenance',         group: 'V1',
      desc: 'Bugs and small maintenance improvements.' },
    { key: 'gate',        label: 'Gate Decision Needed',   group: 'V1',
      desc: 'Waiting on a go or no-go decision before it can enter V1.' },
    { key: 'unassigned',  label: 'Unassigned',             group: 'V1',
      desc: 'No lane yet. Needs a lane tag in ClickUp. Hidden when empty.' },
    { key: 'v2prep',      label: 'V2 Prep',                group: 'V2',
      desc: 'Groundwork that supports the V2 migration.' },
    { key: 'v2cand',      label: 'V2 Candidates',          group: 'V2',
      desc: 'Parked for V2. Not V1 work.' }
  ];

  var LANE_TAGS = {
    'v2 candidate': 'v2cand', 'lane: exception': 'exception', 'lane: maintenance': 'maintenance',
    'lane: gate': 'gate', 'lane: v2 prep': 'v2prep'
  };
  var PRIORITY_RANK = { urgent: 0, high: 1, normal: 2, low: 3 };

  function norm(s) { return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim(); }
  function lowerTags(t) { return (t.tags || []).map(norm); }

  function assignLane(task, cfg) {
    cfg = cfg || {};
    var tags = lowerTags(task);
    var isBug = norm(task.type) === 'bug';
    var inSpaces = (cfg.inFlightSpaces || []).map(norm);
    if (inSpaces.indexOf(norm(task.space)) !== -1) return { lane: 'inflight', conflict: [] };

    var present = Object.keys(LANE_TAGS).filter(function (k) { return tags.indexOf(k) !== -1; });
    var lane = 'unassigned';
    if (tags.indexOf('v2 candidate') !== -1) lane = 'v2cand';
    else if (tags.indexOf('lane: exception') !== -1) lane = 'exception';
    else if (tags.indexOf('lane: maintenance') !== -1 || isBug) lane = 'maintenance';
    else if (tags.indexOf('lane: gate') !== -1) lane = 'gate';
    else if (tags.indexOf('lane: v2 prep') !== -1) lane = 'v2prep';
    return { lane: lane, conflict: present.length > 1 ? present : [] };
  }

  function pinOf(task, cfg) {
    var pins = (cfg && cfg.pins) || {}, t = norm(task.name);
    if ((pins.now || []).map(norm).indexOf(t) !== -1) return 'now';
    if ((pins.next || []).map(norm).indexOf(t) !== -1) return 'next';
    return '';
  }

  function compare(laneKey, cfg) {
    var order = (cfg.inFlightOrder || []).map(norm);
    return function (a, b) {
      var pa = a.pin === 'now' ? 0 : a.pin === 'next' ? 1 : 2;
      var pb = b.pin === 'now' ? 0 : b.pin === 'next' ? 1 : 2;
      if (pa !== pb) return pa - pb;
      if (laneKey === 'inflight') {
        var ia = order.indexOf(norm(a.task.status)), ib = order.indexOf(norm(b.task.status));
        ia = ia === -1 ? order.length : ia; ib = ib === -1 ? order.length : ib;
        if (ia !== ib) return ia - ib;
      } else {
        var ra = PRIORITY_RANK[norm(a.task.priority)], rb = PRIORITY_RANK[norm(b.task.priority)];
        ra = ra === undefined ? 4 : ra; rb = rb === undefined ? 4 : rb;
        if (ra !== rb) return ra - rb;
      }
      return (b.task.updated || 0) - (a.task.updated || 0);
    };
  }

  /* Returns { lanes: {key: [card]}, cards: [card] } where card = { task, lane, conflict, pin, shipping } */
  function build(tasks, cfg) {
    var shipping = ((cfg && cfg.shippingTitles) || []).map(norm);
    var lanes = {};
    LANES.forEach(function (l) { lanes[l.key] = []; });
    var cards = tasks.map(function (t) {
      var r = assignLane(t, cfg);
      return { task: t, lane: r.lane, conflict: r.conflict, pin: pinOf(t, cfg),
               shipping: r.lane === 'inflight' && shipping.indexOf(norm(t.name)) !== -1 };
    });
    cards.forEach(function (c) { lanes[c.lane].push(c); });
    LANES.forEach(function (l) { lanes[l.key].sort(compare(l.key, cfg || {})); });
    return { lanes: lanes, cards: cards };
  }

  var api = { LANES: LANES, LANE_TAGS: LANE_TAGS, assignLane: assignLane, build: build, norm: norm };
  root.RMLanes = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : this);
