/*
 * Roadmap config. Hand-edited by Jeremy; the weekly refresh never touches this file.
 * Lane rules live in roadmap-lanes.js, ticket data lives in roadmap-data.js.
 */
window.RM_CONFIG = {

  /* Lane rule 1: any tag-🎯 task whose list sits in one of these ClickUp spaces is In Flight.
     Matched by exact space NAME (never list ids, lists in a space can change).
     QA Space - V1 holds the QA Development Testing list, which TJ's work passes through. */
  inFlightSpaces: ['DripJobs Development V1', 'QA Space - V1'],

  /* SHIPPING HIGHLIGHT: ticket titles that get the "Shipping" badge inside In Flight.
     Remove a title once the ticket ships. Matched on title, ignoring case and extra spaces. */
  shippingTitles: [
    'Business Entity Records (V1)',
    'Add Thumbtack direct integration'
  ],

  /* NOW / NEXT PINS (optional, ships empty): pin tickets by title within their lane.
     Pinned tickets sort above unpinned ones and show a Now or Next label.
     Example: now: ['Invoice Reminders'], next: ['CSV Import for Products and Services'] */
  pins: {
    now: [],
    next: []
  },

  /* IN FLIGHT ORDER: closest to done first. Statuses are lowercase ClickUp names.
     Any status not listed sorts after the listed ones. */
  inFlightOrder: [
    'branch ready', 'code complete', 'pr created', 'testing complete', 'qa kickback',
    'test in progress', 'testing ready', 'in progress', 'ready for dev'
  ]
};
