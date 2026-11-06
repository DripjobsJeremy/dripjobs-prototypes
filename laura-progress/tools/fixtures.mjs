// Synthetic tickets for tests. Not real data. Fixed "now" is Fri Nov 6, 2026 4:36pm ET.
export const NOW = Date.parse('2026-11-06T21:36:00Z');
const ms = (s) => Date.parse(s);
const base = { type: '', taskType: '', tags: [], drafter: 'Laura Cuadros', creator: 'Jeremy Harrison', assignees: [], assigneeIds: [],
  reviewers: ['Jeremy Harrison'], pms: ['Terry Bennett'], closed: 0, parent: '', listName: 'Active Triage', listId: '901402649270', spaceId: '90140994633' };
const T = (o) => ({ ...base, url: 'https://app.clickup.com/t/' + o.id, ...o });
export const PULL = {
  pulledAt: NOW,
  tickets: [
    T({ id: 'tst000a1', name: 'SYNTH dev ticket in flight', status: 'pr created', spaceId: '90140994811', listId: '901402649641', listName: 'Active Development', tags: ['🎯'], type: 'Enhancement ', created: ms('2026-11-03T15:00:00Z'), updated: ms('2026-11-05T15:00:00Z') }),
    T({ id: 'tst000a2', name: 'SYNTH triage bug', status: 'needs pm analysis', type: 'Bug ', created: ms('2026-11-04T15:00:00Z'), updated: ms('2026-11-04T16:00:00Z') }),
    T({ id: 'tst000a3', name: 'SYNTH creator fallback', status: 'new', drafter: '', creator: 'Laura Cuadros', created: ms('2026-11-05T15:00:00Z'), updated: ms('2026-11-05T15:00:00Z') }),
    T({ id: 'tst000a4', name: 'SYNTH before baseline', status: 'new', created: ms('2026-10-20T15:00:00Z'), updated: ms('2026-11-05T15:00:00Z') }),
    T({ id: 'tst000a5', name: 'SYNTH assigned only', status: 'in progress', drafter: 'Someone Else', assignees: ['Laura Cuadros'], assigneeIds: ['82240534'], spaceId: '90140994811', listId: '901407852471', listName: 'TJ - Project Management', created: ms('2026-10-01T15:00:00Z'), updated: ms('2026-11-04T15:00:00Z') }),
    T({ id: 'tst000a6', name: 'SYNTH form draft', status: 'new', listId: '901413487018', listName: 'Form', created: ms('2026-11-05T18:00:00Z'), updated: ms('2026-11-05T18:00:00Z') }),
    T({ id: 'tst000a7', name: 'SYNTH v2 list never read', status: 'new', listId: '901412659249', listName: 'DripJobs (v2)', created: ms('2026-11-05T18:00:00Z'), updated: ms('2026-11-05T18:00:00Z') }),
    T({ id: 'tst000a8', name: 'SYNTH shipped exception', status: 'pushed to production', tags: ['lane: exception'], type: 'Feature ', created: ms('2026-11-02T15:00:00Z'), updated: ms('2026-11-03T15:00:00Z') }),
    T({ id: 'tst000a9', name: 'SYNTH lane conflict', status: 'on hold', tags: ['lane: gate', 'v2 candidate'], created: ms('2026-11-04T15:00:00Z'), updated: ms('2026-11-04T15:00:00Z') }),
    T({ id: 'tst000b1', name: 'SYNTH closed no fix', status: 'no fix needed', created: ms('2026-11-02T15:00:00Z'), updated: ms('2026-11-02T20:00:00Z') }),
    T({ id: 'tst000b2', name: 'SYNTH not laura', status: 'new', drafter: 'Someone Else', created: ms('2026-11-04T15:00:00Z'), updated: ms('2026-11-04T15:00:00Z') }),
    T({ id: 'tst000b3', name: 'SYNTH weird status', status: 'brand new status', created: ms('2026-11-04T15:00:00Z'), updated: ms('2026-11-04T15:00:00Z') })
  ]
};
export const NOTES = {
  overrides: [
    { id: 'tst000b2', action: 'include', reason: 'Laura drafted it offline' },
    { id: 'tst000b1', action: 'exclude', reason: 'Duplicate of another ticket' }
  ],
  highlights: {
    '2026-11-02': { growth: 'SYNTH growth text', value: 'SYNTH value text', setbacks: '' },
    '2026-11-09': { growth: '', value: '', setbacks: '' }
  }
};
export const PW = 'throwaway test passphrase 1';
