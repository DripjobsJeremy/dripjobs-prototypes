/*
 * Product Signals data.
 *
 * Source: the daily "feedback tracker sweep" posts in #prod-assistant
 * (Slack channel C0BSNSG2GQK), plus live ClickUp status checks where noted.
 * The hub tab reads this file only; to refresh the tab, append new rows below
 * and bump PS_META.lastSweep / PS_META.syncedOn (see "Sync signals" in CLAUDE.md).
 *
 * Row fields:
 *   type    bug | enh
 *   ch      source channel: bug-review | product-signals | thinktank | tanner-tickets | dji-intake
 *   d       reported date (ISO). When the sweep gave no explicit date, the sweep date.
 *   sw      key into PS_SWEEPS (Slack post the row came from; builds the permalink)
 *   sev     Expedite | S1 | S2 | S3 | S4 | High | Medium | '' (as rated in the sweep)
 *   cov     none (no ticket found) | possible (related ticket, verify) | tracked | shipped
 *   who     DripJobs rep or channel member who raised it (customer names are left out on purpose)
 *   theme   cluster key (see PS_THEMES), n = mentions seen so far, human = needs a human look
 *   ticket  { id, status, live }  live:true means status was read from ClickUp on syncedOn
 */
(function () {
  var PS_META = {
    lastSweep: '2026-10-19',
    syncedOn: '2026-10-19',
    channelUrl: 'https://dripjobs.slack.com/archives/C0BSNSG2GQK'
  };

  // Slack message timestamps for each sweep post (permalink = channelUrl + '/p' + ts without the dot)
  var PS_SWEEPS = {
    o19: '1792424137.071419', o16: '1792174858.394169', o14: '1791983664.107929',
    o13: '1791901536.898589', o09: '1791578130.623229', o05: '1791206172.080079',
    o02: '1790959269.998849', o01e: '1790856862.315909', o01b: '1790856847.129899',
    s28e: '1790628409.150629', s28b: '1790628380.867589', s18: '1789759840.926619',
    s16: '1789650599.828539', s15: '1789510032.450509', s14c: '1789400432.221889',
    s14b: '1789400418.507339', s14a: '1789400397.578269', s09: '1788956053.188389',
    s08: '1788869603.632389', s06: '1788696661.066849', s05: '1788610267.474799',
    s04: '1788524200.030119', s03: '1788437660.980099', s02: '1788351418.061459',
    s01: '1788265370.561249', a31: '1788178636.965209', a30: '1788091900.496579',
    a29: '1788005517.315329', a28: '1787919521.935609', a27: '1787833192.436169',
    a27c: '1787838931.458969'
  };

  var PS_THEMES = {
    'qb-sync':      'QuickBooks sync reliability',
    'gcal-sync':    'Google Calendar sync',
    'routemize':    'Routemize integration',
    'qb-time':      'QuickBooks Time',
    'job-costing':  'Job Costing',
    'partner':      'Partner / agency program',
    'sales-metrics':'Sales agent metrics',
    'booking-form': 'Booking form',
    'line-items':   'Line item reordering',
    'messaging':    'Chat and messaging inbox',
    'own-number':   'Own phone number for texting',
    'ai-voice':     'AI voice receptionist',
    'outlook-sync': 'Outlook / non-Google calendar',
    'fb-leads':     'Facebook / Meta leads',
    'financing':    'Financing providers',
    'recurring':    'Recurring jobs',
    'crew-access':  'Crew access and notifications',
    'multi-brand':  'Multiple brands per account',
    'time-tracking':'Employee time tracking',
    'discounts':    'Discounts and packages'
  };

  var rows = [];
  function A(type, ch, d, sw, sev, cov, title, who, note, x) {
    var o = { type: type, ch: ch, d: d, sw: sw, sev: sev, cov: cov, title: title, who: who || '', note: note || '' };
    if (x) for (var k in x) o[k] = x[k];
    rows.push(o);
  }
  function B(d, sw, sev, cov, title, who, note, x) { A('bug', 'bug-review', d, sw, sev, cov, title, who, note, x); }
  function P(d, sw, sev, cov, title, who, note, x) { A('enh', 'product-signals', d, sw, sev, cov, title, who, note, x); }
  function I(d, sw, sev, cov, title, who, note, x) { A('enh', 'thinktank', d, sw, sev, cov, title, who, note, x); }
  function T(d, sw, sev, cov, title, who, note, x) { A('enh', 'tanner-tickets', d, sw, sev, cov, title, who, note, x); }
  function tk(id, status, live) { return { id: id, status: status, live: !!live }; }

  /* ---------- Oct 16 to Oct 17 (sweep posted Oct 19) ---------- */
  B('2026-10-16', 'o19', 'S1', 'none', 'Scheduled appointment sourced via Routemize disappeared from the appointments calendar with no trace in the activity log', 'David Arteaga',
    'First of two Routemize appointment-sync failures this window, same account. Look at it as a pair with the Oct 17 report.', { theme: 'routemize' });
  B('2026-10-16', 'o19', 'S1', 'none', 'Proposal marked accepted (with or without signature) does not move the deal into the Jobs Pipeline', 'Leonardo Motta',
    'Closely matches a closed ticket ("Proposal Accepted Without Signature Does Not Update Deal Status", no fix needed) but keeps resurfacing under different accounts with no open ticket. Needs its own ticket rather than re-litigating the closed one.');
  B('2026-10-16', 'o19', 'S1', 'tracked', 'QuickBooks-synced invoices revert to unsynced: adding a second payment unsyncs the first, and synced invoices flip on their own', 'Juan Quintero',
    'Same ongoing QuickBooks sync cluster flagged since Sep 22.', { theme: 'qb-sync', ticket: tk('86bchqw0q', 'needs pm analysis', true) });
  B('2026-10-17', 'o19', 'S1', 'tracked', 'Job start and completion dates do not populate on the Jobs List after a deal is moved into Project Complete', 'Juan Quintero',
    'Ticket already exists and has not shipped yet.', { ticket: tk('86b3mthct', 'ready for dev', true) });
  B('2026-10-17', 'o19', 'S1', 'none', 'Appointment scheduled in Routemize for Oct 8 never arrived in DripJobs: no deal activity, no appointment record, salesperson could not build the proposal', 'Juan Quintero',
    'Second Routemize appointment-sync failure this window, same account as the Oct 16 report. Worth looking at as a pair.', { theme: 'routemize' });
  I('2026-10-16', 'o19', 'S2', 'none', 'Save chat messages as drafts so users can switch pages or customer records without losing an unsent message', 'Yoselin Bressan',
    'Full structured write-up.');
  I('2026-10-17', 'o19', 'S2', 'none', 'Salesperson-level metrics dashboard: agents see their own closing ratio, set rate, avg job size, jobs won, appointment count; owners and managers filter and compare by agent', 'Juan Quintero',
    'Resubmits an earlier internal ask from David Cerro. Reinforced by two #product-signals mentions the same week (Oct 16, Oct 17) and tied to the Oct 7 Sales Agent Dashboard ask Tanner said he would consider. The customer plans to escalate directly to Tanner in November.', { theme: 'sales-metrics', n: 3 });

  /* ---------- Oct 14 to Oct 16 (posted Oct 16) ---------- */
  A('bug', 'product-signals', '2026-10-15', 'o16', 'S4', 'possible', 'An optional add-on already included in some packages renders as "not included" on packages that do include it', 'Yoselin Bressan',
    'A similar fix shipped ("Change Order Displays Not Included Banner Despite Being Included") but it was for change orders on the invoice view, not packages on a proposal. Confirm whether it is the same root cause or a separate gap before assuming it is covered.');
  P('2026-10-15', 'o16', 'S3', 'none', 'Partner program: white-label DripJobs under a partner or agency brand, visibility into partner-page performance (clicks, referrals), featured placement in the partner directory', 'Eli Roark',
    'Two separate partnership-tagged calls the same day raised different pieces of this. Also reinforces the open partner API theme.', { theme: 'partner', n: 2 });

  /* ---------- Oct 13 (posted Oct 14) ---------- */
  B('2026-10-13', 'o14', 'S1', 'none', 'Employee records duplicate themselves repeatedly after manual entry, without the QuickBooks Time import being triggered', 'Laura Cuadros',
    'Job Costing and Employees area. Adjacent to the QuickBooks Time issues flagged Sep 22 and Oct 5, but a distinct data-duplication symptom rather than an auth or connection failure.', { theme: 'qb-time' });
  I('2026-10-13', 'o14', 'S2', 'none', 'Show the product/service category as a label next to each item name in the estimate item-selection dropdown', 'Yoselin Bressan',
    'Second mention of an ask first seen Sep 30, now with a complete internal write-up.', { n: 2 });
  P('2026-10-13', 'o14', 'S2', 'none', 'Agency or partner-level visibility into referred client accounts without needing each client\'s login', 'Eli Roark',
    'Explicit partnership signal (rep tagged "partnership"). Escalated despite a single mention, same standard applied to past partner-tagged asks.', { theme: 'partner' });

  /* ---------- Oct 9 to Oct 12 (posted Oct 13) ---------- */
  B('2026-10-09', 'o13', 'S1', 'tracked', 'Previously synced payments spontaneously revert to unsynced in QuickBooks-connected accounts; manual re-sync creates duplicate payments and a credit balance', 'David Cerro',
    'Laura traces the root cause to proposal line items that were not set up as proper products/services, but malformed input should not be able to produce duplicate payments. Worth a guardrail. Same symptom as the ticket created Oct 13, confirm they are linked.', { theme: 'qb-sync', ticket: tk('86bchqw0q', 'needs pm analysis', true) });

  /* ---------- Oct 6 to Oct 8 (posted Oct 9) ---------- */
  B('2026-10-06', 'o09', 'S1', 'none', 'Google Calendar multi-calendar selection: Appointments and Jobs both write to the same Google calendar regardless of the calendar selected per module', 'Nemesis Pena',
    'Sixth distinct Google Calendar symptom since Sep 21. Directly undermines the purpose of the Sep 21 multi-calendar linking feature.', { theme: 'gcal-sync' });
  B('2026-10-06', 'o09', 'S1', 'none', 'Contact phone number cannot be corrected when the target number is already saved on another contact record for the same person', 'David Cerro');
  B('2026-10-07', 'o09', 'S1', 'none', 'Abandoned text-messaging add-on flow triggered a subscription update and prorated charge though the application was never completed', 'Nemesis Pena',
    'Laura\'s reply suggests this may be intended billing behavior, but charging for an incomplete flow is worth a product look given the financial impact.');
  B('2026-10-07', 'o09', 'S1', 'none', 'Routemize integration creates duplicate deals and contacts, corrupting Metrics (closing ratio reporting a false 100%, 21 of 21 proposals accepted)', 'Juan Quintero',
    'Laura needs to test this further. The lead was created Cold, scheduled through Routemize, and the deal card duplicated instead of moving stages.', { theme: 'routemize' });
  I('2026-10-07', 'o09', 'S2', 'none', 'Pre-filled booking-form link that passes existing deal and contact data so external intake tools like Routemize do not make customers re-enter name, phone, email', 'Yoselin Bressan',
    'Jeremy flagged in-thread that pre-filling the booking form presents compliance issues (new Twilio/A2P requirements). Needs a compliance review before scoping.', { theme: 'routemize' });
  I('2026-10-07', 'o09', 'S2', 'none', 'Sales Agent Dashboard: per-agent filter and date range on Metrics, a "my dashboard" view, a manager comparison view, and a full metric list', 'David Cerro',
    'Tanner replied "Will consider this." Extends a narrower per-salesperson ask flagged Oct 2.', { theme: 'sales-metrics', n: 2 });
  T('2026-10-08', 'o09', '', 'none', '"also low hanging fruit" (screenshot only, no text, no thread)', 'Tanner',
    'Too vague to summarize or search against.', { human: true });
  T('2026-10-08', 'o09', '', 'none', 'Tanner referencing the color-chart / change-order-signature flow ("treat it like a change order, let the customer see it and sign it") and asking to move it up the queue', 'Tanner',
    'Reads like a request to reprioritize a ticket Tanner already has in mind. Not enough context to identify which one.', { human: true });

  /* ---------- Oct 2 to Oct 5 (posted Oct 5) ---------- */
  B('2026-10-02', 'o05', 'S1', 'none', 'Google Calendar events created on the customer\'s Google side do not appear in DripJobs even though the integration shows connected', 'Ximena Jimenez', '', { theme: 'gcal-sync' });
  B('2026-10-02', 'o05', 'S1', 'tracked', 'Work order PDF export renders text at an unreadably small size compared with the in-app view', 'Leonardo Motta',
    'Second independent report of the Oct 1 bug. Laura confirmed in-thread "Work order escalated already".');
  B('2026-10-02', 'o05', 'S1', 'none', 'Scheduling a multi-day job cannot exclude non-working days: Saturdays and Sundays are included in block and hour calculations', 'Leonardo Motta',
    'Also submitted as a full write-up the same day. A workaround exists (schedule in phases) but the gap is real.');
  B('2026-10-03', 'o05', 'S1', 'none', 'Scheduled jobs stopped writing to the subscribed shared Google calendar and landed only on the owner\'s personal calendar', 'Juan Quintero', '', { theme: 'gcal-sync' });
  I('2026-10-03', 'o05', 'S2', 'none', 'Automatically include the assigned crew name in the Google Calendar event title when a job syncs', 'Juan Manuel Solano Quintero',
    'Field crews only see their schedule through the shared Google Calendar, so CX hand-edits every title. The same ask came in the same day via #product-signals.', { theme: 'gcal-sync' });
  I('2026-10-02', 'o05', 'S2', 'none', 'Allow the same email address across multiple contact records', 'Juan Manuel Solano Quintero',
    'Customer pushback on a recent restriction. They rejected the suggested workaround (consolidate into one record).');

  /* ---------- Oct 1 (posted Oct 2) ---------- */
  B('2026-10-01', 'o02', 'S1', 'none', 'Work order printed from the browser cuts off content; the downloaded PDF prints complete but at an unreadably small font', 'Leonardo Motta');
  B('2026-10-01', 'o02', 'S4', 'none', '"Request Changes" control still renders in the proposal customer view after "allow customer change requests" is disabled', 'Seth Brown',
    'The proposal was already accepted when the customer tried to toggle it off, so this may be a narrower post-acceptance edge case.');
  B('2026-10-01', 'o02', 'Expedite', 'none', 'Account-activation email and onboarding calendar invite never delivered to a verified Outlook address, while demo-account emails to it arrived fine', 'Dominick Horvath',
    'Laura: already sent to billing to investigate.');
  P('2026-10-01', 'o02', 'S3', 'none', 'Larger or configurable font size on the downloaded work order PDF', 'Leonardo Motta',
    'Same call as the work order bug above. Treat as confirmed pain rather than a wishlist ask.');
  T('2026-10-01', 'o02', '', 'shipped', 'Password-last-updated field: clicking to edit drops the label and the datepicker overlaps page content', 'Tanner',
    'Jeremy and Jesus confirmed repro on desktop, Android, iOS and filed the ticket the same day.', { ticket: tk('86bcb8wr1', 'pushed to production', true) });

  /* ---------- Sep 24 to Sep 30, enhancements (posted Oct 1) ---------- */
  P('2026-09-30', 'o01e', 'S2', 'none', 'Use or port the business\'s own existing phone number as the DripJobs two-way texting number instead of a second provisioned number', 'Daniel Lee, Ximena Jimenez',
    'Escalated to a full row: 8+ independent mentions since Sep 1 and nothing tracking it. Recommend a deliberate yes/no rather than letting it keep accumulating.', { theme: 'own-number', n: 8 });
  P('2026-09-30', 'o01e', 'S2', 'none', 'Automatically import material costs into Job Costing from supplier invoices or QuickBooks instead of manual entry', 'David Cerro',
    'Two independent mentions the same day (one names Sherwin-Williams as the starting supplier).', { theme: 'job-costing', n: 2 });
  P('2026-09-30', 'o01e', 'S3', 'none', 'Unit-of-measure pricing on line items, specifically linear foot (a gutter quantity in feet drives the total)', 'Ximena Jimenez, Yoselin Bressan',
    'Two independent mentions the same day.', { n: 2 });

  /* ---------- Sep 24 to Sep 30, bugs (posted Oct 1) ---------- */
  B('2026-09-30', 'o01b', 'Expedite', 'none', 'QuickBooks Time: OAuth allow-step hits an error page, then the integration shows Connected but imports zero timesheets', 'Yoselin Bressan',
    'Another entry in the QuickBooks integration reliability cluster flagged Sep 22.', { theme: 'qb-time' });
  B('2026-09-29', 'o01b', 'S1', 'none', 'Tax rate field truncates a 5-decimal rate (0.06625) to 3 decimals, producing the wrong tax', 'Leonardo Motta',
    'Laura asked the rep for more info. Unconfirmed pending details.');
  B('2026-09-29', 'o01b', 'S1', 'none', 'Google Calendar sync brings a multi-day job into DripJobs as a single-day event', 'Leonardo Motta', 'Third distinct Google Calendar sync symptom in this tracking period.', { theme: 'gcal-sync' });
  B('2026-09-29', 'o01b', 'Expedite', 'none', 'Bank/ACH payment option on the invoice customer view errors when the customer pays; the card path works', 'Nemesis Pena',
    'Laura flagged "CA company", so this may be a state or account-specific Stripe ACH restriction. Confirm scope before filing broad.');
  B('2026-09-29', 'o01b', 'S4', 'none', 'Invoice fails to auto-sync to QuickBooks; the "Sync with QuickBooks" retry returns a cryptic error naming expense/income account refs', 'David Cerro',
    'Laura traced the root cause to products/services not synced to QB on that account, but the error message itself is unhelpful.', { theme: 'qb-sync' });
  T('2026-09-30', 'o01b', '', 'none', '"Not clickable on mobile" (screenshot only, no text, no thread reply)', 'Tanner',
    'Too vague to summarize or search ClickUp against.', { human: true });

  /* ---------- Sep 18 to Sep 23, enhancements (posted Sep 28) ---------- */
  P('2026-09-18', 's28e', 'S3', 'none', 'Copy or duplicate an existing drip sequence into a new custom stage instead of rebuilding message by message', 'Ximena Jimenez',
    'Same call as the Cold Leads drip failure. Treat as confirmed pain.');
  P('2026-09-20', 's28e', 'S2', 'none', 'Customer-facing arrival time window (e.g. "between 7 and 9 AM") on appointment confirmations and reminders instead of a fixed start time', 'Nemesis Pena',
    'Same call as the proposal-send-failure bug on Sep 20.');
  P('2026-09-22', 's28e', 'S2', 'none', 'Email or push notification when a customer opens (not just accepts) a proposal', 'Nemesis Pena, Ximena Jimenez', 'Second mention (Sep 19, Sep 22).', { n: 2 });
  T('2026-09-18', 's28e', '', 'none', '"lets make this on by default for new acc\'s" (screenshot only, no text, no thread)', 'Tanner',
    'Too vague to summarize; nothing to search ClickUp against.', { human: true });
  I('2026-09-22', 's28e', '', 'tracked', 'iPad view does not show the Google Calendar option on the Appointments calendar ("please prioritize")', 'Tanner',
    'Jeremy replied in-thread: existing ticket, will reprioritize. Currently hidden on mobile (including iPad) due to the known OAuth failure on mobile.', { theme: 'gcal-sync' });
  I('2026-09-22', 's28e', '', 'none', '"add the \'view\' thing here so users can see what they are typing" (screenshot did not come through)', 'Tanner',
    'Jeremy asked in-thread which screen this refers to. Still unanswered.', { human: true });
  I('2026-09-18', 's28e', 'S2', 'tracked', 'Zapier event trigger for accepted change orders so tools like FreshBooks auto-update invoice totals', 'Juan Manuel Solano Quintero',
    'Scoped inside the Zapier proposal activity triggers ticket, which includes a "Proposal Change Order Accepted" webhook. Reinforced twice more via #product-signals on Sep 22.', { n: 3, ticket: tk('86b6kfqcu', 'short term parking', true) });
  A('bug', 'thinktank', '2026-09-23', 's28e', 'S1', 'none', 'Manually created invoices show in global search as deals labeled "Invoice Draft"; one customer deleted two sent, unrecoverable invoices because of it', 'Juan Manuel Solano Quintero',
    'Real data-loss risk, worth prioritizing. The label only appears in search, not on the contact profile or Invoices list.');

  /* ---------- Sep 18 evening to Sep 23, bugs (posted Sep 28) ---------- */
  B('2026-09-18', 's28b', 'S1', 'none', 'Contacts manually added to Cold Leads did not receive the automatic first drip text; it only sent after moving to a custom stage', 'Ximena Jimenez');
  B('2026-09-19', 's28b', 'S1', 'none', 'Mobile photo upload rejects images as too large, forcing a screenshot workaround before attaching to a proposal', 'Leonardo Motta');
  B('2026-09-19', 's28b', 'S1', 'none', 'Proposal send intermittently fails with the client shown blocked in red; the customer works around it by switching send channel', 'Leonardo Motta');
  B('2026-09-20', 's28b', 'S1', 'none', 'Proposal send fails with a send-email error on a deal whose card shows "no email on deal" even though the contact has an email on file', 'Nemesis Pena');
  B('2026-09-21', 's28b', 'S1', 'none', 'Google Calendar events from secondary or subscribed calendars do not sync into the Appointments calendar; copying them to the primary calendar does not fix it', 'David Arteaga', '', { theme: 'gcal-sync' });
  B('2026-09-21', 's28b', 'Expedite', 'none', 'Persistent 403 error loading DripJobs in Chrome; clearing cache and incognito did not help', 'David Arteaga',
    'The customer came back about 3 minutes later saying it "synced", so it may be transient, but root cause is unconfirmed.');
  B('2026-09-22', 's28b', 'Expedite', 'none', 'QuickBooks Time integration fails at OAuth: "only authorized to log in against certain QuickBooks Time client URLs"', 'David Cerro', '', { theme: 'qb-time' });
  B('2026-09-22', 's28b', 'S1', 'none', 'QuickBooks integration silently disconnects; "Connect to QuickBooks" hangs on a spinner then errors, customer blocked 5 days', 'David Cerro',
    'One of five QuickBooks bugs from different customers on Sep 22, likely a reliability cluster rather than one-offs.', { theme: 'qb-sync' });
  B('2026-09-22', 's28b', 'S1', 'none', 'QuickBooks invoices and payments frequently do not auto-sync, require manual sync per record, and give no indication of which failed', 'David Cerro', '', { theme: 'qb-sync' });
  B('2026-09-22', 's28b', 'S1', 'none', 'QuickBooks sync fails with a validation error when a DripJobs product/service name collides with an existing QuickBooks item, with no user guidance', 'David Cerro', '', { theme: 'qb-sync' });
  B('2026-09-22', 's28b', 'S1', 'none', 'Google Calendar to DripJobs sync does not pull Google events into Appointments; DripJobs to Google works (one-way only)', 'David Cerro', '', { theme: 'gcal-sync' });
  B('2026-09-22', 's28b', 'S1', 'none', 'Invoices intermittently fail to auto-sync to QuickBooks; manual Sync works every time', 'Juan Quintero', '', { theme: 'qb-sync' });
  B('2026-09-22', 's28b', 'S1', 'none', 'Salesperson selected on New Proposal sometimes does not persist; the proposal saves with the account owner as salesperson', 'Nemesis Pena');
  B('2026-09-23', 's28b', 'S1', 'none', 'Email thread in the DripJobs email view attributes to the wrong user when the sending user and assigned salesperson or PM are the same person', 'David Arteaga');
  B('2026-09-23', 's28b', 'S1', 'none', 'The same saved product/service renders without a "/each" unit on one proposal but with "/each" when re-added to a new proposal', 'Seth Brown');

  /* ---------- Sep 18 ---------- */
  B('2026-09-18', 's18', 'S1', 'none', 'Mobile app hangs on the loading screen after tapping "Activate account" from the welcome email', 'Dominick Horvath');
  T('2026-09-18', 's18', 'S2', 'none', 'Discounts should apply to the total regardless of Package selection state instead of hiding or breaking until a package is chosen', 'Tanner',
    'Jeremy confirmed the current logic cannot calculate a discount before a package is selected and called this a big part of other discount enhancements on the roadmap. A #product-signals report the same day asked for the inverse.', { theme: 'discounts', n: 2 });
  P('2026-09-18', 's18', 'S3', 'none', 'Support multiple trade brands under one account with brand-specific sender identity (e.g. painting plus roofing plus remodeling)', 'Ximena Jimenez',
    'Third mention of this theme (Aug 25, Sep 8, Sep 18).', { theme: 'multi-brand', n: 3 });

  /* ---------- Sep 15 to Sep 16 ---------- */
  P('2026-09-16', 's16', 'S3', 'none', 'Notify the owner when a subcontractor\'s license or insurance is approaching expiry or has lapsed', 'Daniel Lee',
    'Second mention (Aug 29 asked for expiry dates stored and flagged on the subcontractor record; this is the notification angle).', { n: 2 });
  P('2026-09-15', 's15', 'S3', 'none', 'Allow more than one account owner or co-owner on the account record', 'Dominick Horvath', 'Second mention (Sep 3, Sep 15).', { n: 2 });
  I('2026-09-15', 's15', 'S3', 'none', 'Drag-and-drop reordering for invoice line items', 'Bennah Eliseo',
    '"Nice-to-have" per the source write-up. Today the only fix for wrong order is delete and re-add.', { theme: 'line-items' });
  I('2026-09-15', 's15', 'S2', 'possible', 'Replace drag-and-drop with up/down buttons for line-item reordering on mobile', 'Daniel Lee',
    'An old validated request ("Line Item Reorder Button", 2023) raised the same root problem (accidental reorders while scrolling on iPad) and proposed a lock plus button. Check it before filing a new ticket.', { theme: 'line-items', ticket: tk('8669au3mg', 'validated request', true) });

  /* ---------- Sep 9 to Sep 14 catch-up (posted Sep 14) ---------- */
  I('2026-09-14', 's14c', 'S2', 'none', 'Delete (not just archive) booking-form appointment requests', 'Juan Manuel Solano Quintero',
    'Blocks fully deleting a contact record when an unscheduled request is still attached. Only archiving is possible today.', { theme: 'booking-form' });
  I('2026-09-14', 's14c', 'S2', 'none', 'Employee and subcontractor SMS replies should appear in the Messaging Inbox', 'Daniel Lee',
    '"Priority Suggestion: High" in the source write-up. Replies only surface by email today, so contractors watch two places.', { theme: 'messaging' });
  I('2026-09-14', 's14c', 'S3', 'none', 'Extend the job-scheduling working-hours range (fixed 7:00am to 8:30pm)', 'Leonardo Motta',
    'Customers who start earlier or end later seasonally cannot log it.');
  I('2026-09-14', 's14c', 'S2', 'none', 'Add Cash, Zelle, PayPal and similar to the default payment-method list (only Credit Card and Check today)', 'Daniel Lee',
    'Ties directly to the Sep 9 bug where "Cash" was missing from the payment dropdown; this generalizes it into a real gap.');
  I('2026-09-14', 's14c', 'S2', 'none', 'Display inbound SMS from unknown numbers in the messaging inbox', 'Daniel Lee',
    '"Priority Suggestion: High." Messages from unrecognized numbers currently vanish. Proposed: show the phone number as a placeholder name.', { theme: 'messaging' });

  P('2026-09-09', 's14b', 'S3', 'none', 'Use the customer\'s own business phone number as the DripJobs texting number instead of a second provisioned number', '', 'Second mention (Sep 1, Sep 9).', { theme: 'own-number', n: 2 });
  P('2026-09-11', 's14b', 'S3', 'none', 'Support additional financing providers beyond Acorn as selectable options on proposals', '', 'Second mention (Sep 2, Sep 9).', { theme: 'financing', n: 2 });
  P('2026-09-11', 's14b', 'S3', 'none', 'Automatic sales-tax rate lookup by job address or zip (TaxJar style)', '', 'Second mention (Aug 28, Sep 11).', { n: 2 });
  P('2026-09-11', 's14b', 'S2', 'none', 'Bidirectional drag-and-drop of line items in and out of packages in the proposal builder', 'Daniel Lee',
    'The same call also produced the reproducible drag-out bug below. Treat as confirmed pain.', { theme: 'line-items' });

  B('2026-09-10', 's14a', 'S1', 'possible', 'Cold Leads first-drip follow-up did not send to 2 of 3 Zapier-sourced leads, and no error was surfaced', 'Seth Brown',
    'A related but different ticket exists (Zapier lead source intermittently not persisting). Check whether it is the same root cause.', { ticket: tk('86b8p851t', 'ready for dev', true) });
  B('2026-09-10', 's14a', 'S1', 'none', 'Adding a door or substrate to a Production Rates area hangs in infinite loading when it has no default product assigned', 'Alex Calderon');
  B('2026-09-10', 's14a', 'S1', 'none', 'Proposal builder hangs on a loading spinner and loses unsaved progress, worst on exterior estimates', 'Laura Moreno');
  B('2026-09-10', 's14a', 'S1', 'possible', 'Negative-priced line item on a change order zeroes out the item total instead of subtracting from the proposal total', 'Seth Brown',
    'Possibly related to the open QuickBooks "Change Order Removals Into Discount Field" ticket. Worth a look before filing separately.', { ticket: tk('86bb5y2w3', 'in progress', true) });
  B('2026-09-11', 's14a', 'S4', 'none', 'Company logo upload silently rejects a valid image; only succeeded after multiple re-saves', 'Seth Brown', 'Third distinct logo-upload report since Aug 25.');
  B('2026-09-11', 's14a', 'S4', 'none', 'Proposal-approval notification email CCs an address never configured anywhere in account settings', 'David Cerro');
  B('2026-09-11', 's14a', 'S4', 'none', 'Newly scheduled job with an assigned crew does not render on the Jobs Schedule for the admin until log-out and log-in (the rep sees it immediately)', 'David Cerro');
  B('2026-09-11', 's14a', 'S1', 'none', 'A line item dragged into a package cannot be dragged back out, and a refresh does not recover it', 'Daniel Lee',
    'Same call also requested bidirectional drag-and-drop as a feature.', { theme: 'line-items' });

  /* ---------- Sep 9 ---------- */
  B('2026-09-09', 's09', 'S1', 'none', '"Cash" is missing from the payment-method dropdown when marking an invoice as received', 'Yoselin Bressan');
  P('2026-09-09', 's09', 'S3', 'possible', 'Custom or arbitrary send time for scheduled proposals, not just the fixed 7/9/11 AM presets', 'Alex Garcia',
    'A related ticket exists ("Smart Time Recognition for Proposal Send Scheduling") but it covers auto-detected timing, not a manual custom time. Check scope before filing separately.', { n: 2, ticket: tk('86b0wc5mf', 'needs pm analysis', true) });
  P('2026-09-09', 's09', 'S2', 'none', 'Native Outlook Calendar sync for the Appointments Calendar', '',
    'Pairs with the Sep 3 internal ask for a Jobs Schedule to Outlook Zapier trigger. Same underlying Outlook gap.', { theme: 'outlook-sync' });
  P('2026-09-09', 's09', 'S2', 'none', 'Lightweight way to dispatch a scheduled job to a crew without producing a customer-facing proposal first', '', 'Second mention (Aug 27, Sep 9).', { n: 2, theme: 'crew-access' });
  P('2026-09-09', 's09', 'S3', 'none', 'One review-request link that posts to multiple platforms at once (Google, Facebook, Angi)', '', 'Second mention (Sep 3, Sep 9).', { n: 2 });

  /* ---------- Sep 8 ---------- */
  B('2026-09-08', 's08', 'S4', 'none', 'Reviews and testimonials widget renders on the customer portal even with zero reviews, and links to a blank page with no way to remove it', 'Yoselin Bressan');
  P('2026-09-08', 's08', 'S2', 'none', 'AI voice agent that answers inbound calls, qualifies the caller, creates the lead, and recognizes existing customers', 'David Cerro',
    'Second mention on Sep 8, 4th or later by Sep 14, and raised again Oct 13. Still nothing tracking it.', { theme: 'ai-voice', n: 5 });

  /* ---------- Sep 6 ---------- */
  B('2026-09-06', 's06', 'Expedite', 'none', 'Password reset loops: after setting a new password the user is bounced back to the same "update your password" screen and cannot log in', 'Nemesis Pena',
    'Fully blocks account access.');
  I('2026-09-06', 's06', 'S2', 'none', 'Native Meta (Facebook) CRM integration plus a custom "Meta Lead ID" field so conversion events match on Lead ID instead of name, phone, email', 'Juan Manuel Solano Quintero',
    'Structured write-up. A more technical angle on the native Facebook leads theme: accurate ad-optimization signal, not just lead ingestion.', { theme: 'fb-leads' });

  /* ---------- Sep 5 ---------- */
  P('2026-09-05', 's05', 'S2', 'none', 'Native Facebook lead-form integration that pulls leads into DripJobs without Zapier', 'Juan Quintero',
    'The "native, no Zapier" framing has come up twice in 4 days, on top of the broader Meta lead-forms gap flagged Aug 21.', { theme: 'fb-leads', n: 3 });

  /* ---------- Sep 4 ---------- */
  B('2026-09-04', 's04', 'S1', 'none', 'Production Rates "Add Area" is unusable on one account; settings appear unconfigured and block area creation', 'David Cerro');
  B('2026-09-04', 's04', 'S4', 'none', 'Apply Discount total does not recalculate when a customer adds an optional item to a proposal', 'Daniel Lee', '', { theme: 'discounts' });
  B('2026-09-04', 's04', 'S1', 'possible', 'No notification for incoming DripJobs Chat messages, even though the system logs the notification as sent', 'Alex Calderon',
    'Possibly related to an earlier iOS push ticket marked resolved without fix, but this report is more specific (a logging versus delivery mismatch). Check whether it is the same root cause.', { theme: 'messaging', ticket: tk('86b5670z3', 'resolved without fix', true) });
  B('2026-09-04', 's04', 'Expedite', 'none', 'DripJobs Chat mobile app rejects login with credentials that work for the main DripJobs account', 'Alex Calderon', 'Blocking.', { theme: 'messaging' });
  B('2026-09-04', 's04', 'S1', 'none', 'Project-accepted notification email to the business owner stopped arriving', 'Alex Calderon');
  B('2026-09-04', 's04', 'S1', 'none', 'Review Request drip in Project Complete defaulted to SMS-only with an empty email body, so no review email was sent', 'Seth Brown');
  B('2026-09-04', 's04', 'S1', 'none', 'Proposal send-by-SMS no longer allows editing the recipient phone number at send time', 'David Cerro');
  B('2026-09-04', 's04', 'S1', 'possible', 'QuickBooks payment sync fails on invoices with a locked sales-discount line; manual re-sync creates a duplicate payment', 'David Cerro',
    'Duplicate payment creation makes this worth prioritizing. An "Investigate: QuickBooks Sync Fails... Incorrect Discount Mapping" ticket shipped Sep 8 and may be the investigation for this. Confirm.', { theme: 'qb-sync' });

  /* ---------- Sep 3 ---------- */
  B('2026-09-03', 's03', 'S4', 'none', 'Blast AI Email Builder returns "failed to generate" for a marketing or incentive email', 'Dominick Horvath');
  B('2026-09-03', 's03', 'S4', 'none', 'Logo upload silently fails on Company Settings > Brand (no error, it just does not apply)', 'Seth Brown');
  B('2026-09-03', 's03', 'S4', 'none', 'Account shows two unpaid invoices after a coupon was applied, which looks like stale billing state', 'Daniel Lee');
  B('2026-09-03', 's03', 'S1', 'none', 'Google Calendar events sync into the Appointments calendar but do not appear on the Jobs schedule', 'Nemesis Pena',
    'A related "events not syncing" bug already shipped, but it covered a different symptom. This Appointments versus Jobs gap looks uncovered.', { theme: 'gcal-sync' });
  P('2026-09-03', 's03', 'S2', 'none', 'Per-item hide controls on the work order (description, quantity, or whole item) before it goes to a subcontractor', '', 'Two customers on the same day.', { n: 2 });
  P('2026-09-03', 's03', 'S3', 'tracked', 'Point an existing or self-generated QR code at the DripJobs booking form', '', '', { theme: 'booking-form', ticket: tk('86bbj9hpp', 'ticketed (Aug 21 batch)', false) });
  P('2026-09-03', 's03', 'S2', 'none', 'Public or partner write API plus outbound webhooks on new-lead creation, with control over where integration-supplied content lands in the proposal', 'Eli Roark',
    'Raised for an actual partner, not just a customer ask. Reinforces the open-API theme recurring since Aug 21, now with real partnership stakes.', { theme: 'partner', n: 3 });
  P('2026-09-03', 's03', 'S3', 'none', 'Non-Stripe in-platform payment processor for ACH and credit card', '', 'Related to an Aug 21 ask for processor choice at signup.', { n: 2 });
  P('2026-09-03', 's03', 'S3', 'none', 'Faster, self-serve account-ownership transfer', '', 'Raised again by the same person who asked Aug 26.', { n: 2 });
  I('2026-09-03', 's03', 'S2', 'none', 'Jobs Schedule needs an Outlook-via-Zapier trigger (the Appointments calendar already has one, forcing customers to juggle two calendars)', 'Juan Manuel Solano Quintero',
    'Structured write-up with a 5-reply thread.', { theme: 'outlook-sync' });

  /* ---------- Sep 2 ---------- */
  B('2026-09-02', 's02', 'S4', 'none', 'Payment-schedule entry name field appears uneditable when adding a row in proposal template settings', 'Seth Brown');
  B('2026-09-02', 's02', 'S4', 'none', 'Approve & Pay completes with no payment-method screen when Stripe is not connected, so the customer sees no alternative', 'Ximena Jimenez');
  P('2026-09-02', 's02', 'S3', 'none', 'Editable tax label on proposals ("Excise Tax" instead of "Tax" or "Sales Tax")', 'Seth Brown',
    'Same rep and customer pairing as an Aug 27 mention, so it may be one call surfaced twice. Treat as a single data point.');
  I('2026-09-02', 's02', 'S2', 'tracked', 'Select-from-record dropdown for phone and email on drips and other communications, matching the address-selection dropdown', 'Laura Cuadros',
    'Laura: "our customers are waiting for something like this." 5 fire reactions.', { ticket: tk('86ba528d1', 'in progress', true) });

  /* ---------- Sep 1 ---------- */
  B('2026-09-01', 's01', 'S4', 'none', 'AI-generated cover photo cannot be saved from the Customer Portal generator', 'Ximena Jimenez');
  B('2026-09-01', 's01', 'S4', 'none', 'Interior categories still show in the category selector after picking an Exterior area in Production Rates', 'Daniel Lee');
  B('2026-09-01', 's01', 'S1', 'shipped', 'Company Settings "Add-Ons" tab becomes unreachable on narrower browser windows because horizontal scroll does not appear', 'Seth Brown',
    'Ticketed the same day ("Horizontal Tab Bar Cannot Be Dragged to Reveal Hidden Tabs at 100% Zoom") and shipped in the Sep 8 deploy batch.', { ticket: tk('86bbqxmmj', 'shipped Sep 8 (per sweep)', false) });
  P('2026-09-01', 's01', 'S3', 'tracked', 'Offline mode in the mobile app to build estimates with no cell or Wi-Fi', '', 'Second mention (Aug 22, Sep 1).', { n: 2, ticket: tk('86azr0fj8', 'new (V2 backlog)', true) });

  /* ---------- Aug 27 to Aug 31 ---------- */
  P('2026-08-31', 'a31', 'S2', 'tracked', 'Real-availability self-scheduling on the booking form (a confirmed slot, not just a preferred date)', 'Nemesis Pena',
    'Second mention (Aug 25, Aug 31).', { n: 2, theme: 'booking-form', ticket: tk('86b6z539f', 'new (V2 backlog)', true) });
  B('2026-08-30', 'a30', 'S1', 'none', 'On iPad, changing a deal\'s Current Stage from the deal card does not persist: the selection half-commits and reverts', 'Nemesis Pena');
  B('2026-08-29', 'a29', 'S1', 'none', 'DripJobs Chat sends no notification on a customer text reply despite settings being enabled', 'Ximena Jimenez', '', { theme: 'messaging' });
  B('2026-08-29', 'a29', 'S1', 'none', 'New Appointment button requires an email even for phone-only contacts with email comms toggled off', 'Seth Brown', 'The same call also raised this as a feature ask; merged as one issue.');
  B('2026-08-29', 'a29', 'S4', 'none', 'Add Contact silently "succeeds" when it failed: the validation banner for a missing lead source is off-screen', 'Seth Brown');
  B('2026-08-29', 'a29', 'S1', 'possible', 'Closing Ratio by Source under-counts compared with Sales by Source for the same lead source and period', 'Juan Quintero',
    'Related to the Closing Ratio saga that ended in the "Update Closing Ratio Display" fix, but the by-Source breakdown is a more specific symptom than that ticket covered. Needs a human look.', { theme: 'sales-metrics' });
  P('2026-08-29', 'a29', 'S3', 'none', 'Per-proposal color or branding instead of one account-wide portal color', '', 'Second mention (Aug 25, Aug 29).', { n: 2 });
  P('2026-08-29', 'a29', 'S3', 'none', 'Crew-facing app or login so field teams can access job info directly', '', 'Second mention (Aug 22, Aug 29). Mentions kept growing through Oct 1.', { theme: 'crew-access', n: 3 });
  T('2026-08-29', 'a29', 'S2', 'shipped', 'Make holiday-calendar visibility a company-level default (with per-user override) instead of a per-user opt-in', 'Tanner',
    'Tanner: "this is a companywide read-only function... the company should be able to set the default for all users." Shipped in the Sep 24 to 30 deploy window per the Oct 1 sweep.');
  I('2026-08-29', 'a29', 'S2', 'none', 'Auto-pause or adjust drip sequences based on the customer\'s most recent reply', '', 'Structured write-up with reactions. Second mention (Aug 24, Aug 29).', { n: 2 });
  I('2026-08-29', 'a29', 'S3', 'none', '"Report Bug" verify-before-ticket button inside the call report, replacing auto-ticket on the word "bug" with a verify and duplicate-check step', '',
    'Process change to the bug-review pipeline itself. Structured write-up with strong reaction support.');

  B('2026-08-28', 'a28', 'S1', 'none', 'Proposal or change-order email link opens the mobile app instead of the web view on iOS, and cannot be dismissed', 'Ximena Jimenez');
  B('2026-08-28', 'a28', 'S1', 'possible', 'QuickBooks sync fails with "discount amount greater than subtotal"', 'David Cerro',
    'Looks like a recurrence on 2 accounts. A near-identical earlier report was closed resolved without fix. Route new evidence to the open ticket rather than filing fresh.', { theme: 'qb-sync', ticket: tk('86bb5y2w3', 'in progress', true) });
  B('2026-08-28', 'a28', 'S4', 'none', '"Click here for invoice validation" tool shows for the admin, not the customer', 'David Cerro');
  B('2026-08-28', 'a28', 'S1', 'none', 'Proposal link opens a blank black page in Safari on iPad', 'Ximena Jimenez');
  B('2026-08-28', 'a28', 'S1', 'none', 'Company notes drag-and-drop rejects XLSX and PDF with no format guidance', 'David Cerro');
  P('2026-08-28', 'a28', 'S2', 'none', 'Public or open REST API for two-way automation', '', 'Second mention (Aug 21, Aug 28).', { theme: 'partner', n: 2 });
  P('2026-08-28', 'a28', 'S3', 'tracked', 'Recurring or repeat-service scheduling for maintenance jobs', '', 'Second mention. Tracked in the V2 recurring job schedule events ticket.', { theme: 'recurring', n: 2, ticket: tk('86ba0wyvt', 'needs pm analysis', true) });
  P('2026-08-28', 'a28', 'S2', 'tracked', 'Download or export the Job Costing dashboard as a report (PDF, Excel, CSV)', 'David Cerro',
    'Same-day cross-channel duplicate (#product-signals and #tanner-innovative-thinktank).', { theme: 'job-costing', ticket: tk('86b5hu44p', 'tracked (per sweep)', false) });
  P('2026-08-28', 'a28', 'S2', 'none', 'Functional internal-only Attachments tab on deal cards (the tab exists today but has no way to add a file)', 'David Cerro',
    'Same-day cross-channel duplicate (#product-signals and #tanner-innovative-thinktank).');
  T('2026-08-28', 'a28', 'S3', 'tracked', 'Configurable, dynamically updating proposal expiration (set a number of days)', 'Tanner',
    'Adds a second voice to the "Default Proposal Expiration Period" ticket; worth bumping priority.', { ticket: tk('86bbjbt4r', 'product signals dji', true) });

  B('2026-08-27', 'a27', 'S4', 'none', 'Customer View shows glitchy, repeated panes on the iPad web browser', 'Leonardo Motta');
  B('2026-08-27', 'a27', 'S4', 'possible', 'Package selection view renders incorrectly in Customer View', 'Daniel Lee',
    'A "View Details Button Overlaps Line Item Text" fix deployed to PROD that morning. Re-check before filing.');
  B('2026-08-27', 'a27', 'S4', 'none', 'Customer View does not reflect proposal state until a manual refresh', 'Daniel Lee');
  B('2026-08-27', 'a27', 'S4', 'none', 'Review-request link does not persist on first save, leaving a dead button in the email', 'Ximena Jimenez');
  B('2026-08-27', 'a27', 'S1', 'none', 'Invoice loses its status entirely when the customer pays via "Pay with Check" (disappears from Open, Partially Paid, Paid filters)', 'Seth Brown');
  B('2026-08-27', 'a27', 'S1', 'none', 'A contact who opted out of SMS still received a drip text', 'Seth Brown');
  P('2026-08-27', 'a27', 'S3', 'none', 'Specific booking-form appointment time window (e.g. 11am to 4pm), not just available days', '', 'Second mention (Aug 23, Aug 27).', { theme: 'booking-form', n: 2 });
  P('2026-08-27', 'a27', 'S3', 'tracked', 'AI cover-image generator for multiple trades in one image', '', 'Second mention (Aug 26, Aug 27). Many later mentions of non-painting trades.', { n: 2, ticket: tk('86b9t5cqx', 'needs pm analysis', true) });
  P('2026-08-27', 'a27', 'S2', 'tracked', 'Closing ratio should count unsuccessful sales when no proposal is created', 'Leonardo Motta',
    'Cross-channel duplicate. The two earlier "no fix needed" tickets mean a decision was made; the work landed in the "Update Closing Ratio Display" ticket (corrected in the Aug 27 follow-up post).', { theme: 'sales-metrics', n: 2, ticket: tk('86b84xxeb', 'resolved without fix (per sweep)', false) });
  T('2026-08-27', 'a27c', '', 'possible', 'Proposal Rejection Reason and Count', 'Tanner',
    'Currently matched against an older ticket. Jeremy plans a dedicated ticket and has not created it yet, so it should not be re-surfaced as if nothing is happening.');
  T('2026-08-27', 'a27c', '', 'shipped', 'Login error popup for one account ("Duplicate tag: Facebook Ad" on admin login)', 'Tanner',
    'Originally logged as too vague. Already ticketed and shipped Sep 3.', { ticket: tk('86bbn1e0y', 'shipped Sep 3 (per sweep)', false) });


  /* ---------- Aug 21 batch (migrated from the original tab; ClickUp statuses not re-checked) ---------- */
  A("bug", 'dji-intake', '2026-08-21', null, "High", 'tracked', "Outbound SMS Intermittently Never Delivered (Work-Order Links, Review Requests, Onboarding Links)", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9f00", "CS verification", false) });
  A("bug", 'dji-intake', '2026-08-21', null, "Medium", 'tracked', "Package \"View Details\" Renders Incorrectly in Proposal Customer View", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9fpj", "CS verification", false) });
  A("bug", 'dji-intake', '2026-08-21', null, "Medium", 'tracked', "Proposal Template Editing Noticeably Slow/Laggy", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9fr2", "CS verification", false) });
  A("bug", 'dji-intake', '2026-08-21', null, "High", 'tracked', "Proposal Template Integrity: Template Disappeared + Embedded Video Not Rendering", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9ftu", "CS verification", false) });
  A("bug", 'dji-intake', '2026-08-21', null, "High", 'tracked', "Estimate Requested Count/List Mismatch Between Mobile App and Desktop + Stale Appointments Tab", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9fyv", "CS verification", false) });
  A("bug", 'dji-intake', '2026-08-21', null, "Medium", 'tracked', "Appointment Added to a Synced Google Calendar Did Not Appear in DripJobs Until Later/Refresh", 'DJI Intake', "", { legacy: true, ticket: tk("86bbjbt1p", "CS verification", false) });
  A("bug", 'dji-intake', '2026-08-21', null, "Medium", 'tracked', "Custom Email Domain DNS Verification Fails for Webador-Hosted Domain (Hostname Mismatch)", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9g4b", "CS verification", false) });
  A("bug", 'dji-intake', '2026-08-21', null, "Medium", 'tracked', "Booking Form: Preferred-Date Field Doesn't Open Date Picker on First Tap", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9g35", "CS verification", false) });
  A("bug", 'dji-intake', '2026-08-21', null, "Medium", 'tracked', "Jobs Pipeline: Deal Card Cannot Be Dragged to Off-Screen Stage (No Auto-Scroll While Dragging)", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9g0x", "CS verification", false) });
  A("bug", 'dji-intake', '2026-08-21', null, "High", 'tracked', "iOS Push Notifications Missing for DripJobs & DJ Chat SMS Replies (Android OK, Same Account)", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9fmp", "CS verification", false) });
  A("bug", 'dji-intake', '2026-08-21', null, "High", 'tracked', "QuickBooks Shows Connected but Invoices and Products/Services Fail to Sync", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9fk8", "CS verification", false) });
  A("bug", 'dji-intake', '2026-08-21', null, "High", 'tracked', "Email Delivery: Bounce-Suppression False Positive + Notification Emails Never Arriving", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9f30", "CS verification", false) });
  A("bug", 'dji-intake', '2026-08-21', null, "Medium", 'tracked', "Text-Messaging Number Search Returns No Results for Valid Chicago-Area Codes", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9f0z", "CS verification", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Historical Data Import From Prior CRM : Documents (Estimates/Proposals/Invoices) and Metrics", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9gfb", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Embeddable Third-Party Widgets in the Proposal (Not Just Hyperlinks)", 'DJI Intake', "", { legacy: true, ticket: tk("86bbjbtah", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Sentiment-Gated Review Requests : Only Send the Google Review Link to Satisfied Customers", 'DJI Intake', "", { legacy: true, ticket: tk("86bbjbta5", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Import Path From a Third-Party Estimating Tool (SimplyWise) Into DripJobs Proposals", 'DJI Intake', "", { legacy: true, ticket: tk("86bbjbt95", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Painter-Specific Estimating in the Base Plan (Production Rates Packaging)", 'DJI Intake', "", { legacy: true, ticket: tk("86bbjbt8g", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Group Multiple Line Items Into a Single Collapsed Block on the Proposal (PaintScout-Style)", 'DJI Intake', "", { legacy: true, ticket: tk("86bbjbt5w", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Hide Unit Quantities on the Work Order (Hours Can Be Hidden, Units Cannot)", 'DJI Intake', "", { legacy: true, ticket: tk("86bbjbt5e", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Default Proposal Expiration Period (Set Once, Apply to Every Proposal)", 'DJI Intake', "", { legacy: true, ticket: tk("86bbjbt4r", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Send Conversion Events Back to Meta When a Lead Becomes a Sold Job (Native)", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9hr5", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Booking-Form QR Code Portability / Stable Redirect Control", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9hpp", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Commercial vs Residential Proposal Presentation : Separate Branding/Portal Treatments", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9hn8", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "GreenSky Financing Integration on Proposals (Alongside Acorn)", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9hdw", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Native Lead-Capture Pop-Up / Newsletter Modal for Websites \u2192 Cold Leads", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9hcb", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Square as a Payment Processing Option (Alongside Stripe)", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9hb7", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "RingCentral Integration / Keep Texting in an Existing Phone System", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9h9q", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Published Starter Cheat Sheet of Production/Spread Rates by Surface Type", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9h7t", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Native New-Lead Push/SMS Notification to Owner (No Zapier+Twilio Required)", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9h09", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Per-Service Booking Form Branching : Different Landing Page/Video by Service Selected", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9gz1", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "SMS Blast Marketing (Alongside Email Blast)", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9gxw", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "AI Assistant: Natural-Language Instruction \u2192 Estimate, Quote, or Scheduled Appointment", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9gw0", "ticketed (Aug 21 batch)", false) });
  A("enh", 'dji-intake', '2026-08-21', null, "", 'tracked', "Route Inbound Business-Line Calls to a Specific Salesperson From Within DripJobs", 'DJI Intake', "", { legacy: true, ticket: tk("86bbj9gry", "ticketed (Aug 21 batch)", false) });


  // Themes that keep coming back. cov: none = nothing tracking it, possible = partly covered, tracked = has a ticket.
  var PS_RECURRING = [
    { name: 'Use the business\'s own phone number for texting and calls', theme: 'own-number', mentions: '8+', since: 'Sep 1', cov: 'none', note: 'Escalated Oct 1 with a recommendation for a deliberate yes/no decision.' },
    { name: 'Employee and crew time tracking (punch in/out, wage capture; BusyBusy named as an integration target)', theme: 'time-tracking', mentions: '5+', since: 'Aug 22', cov: 'none', note: 'Only a gated V2 "Custom Employee Performance Tracking Fields" ticket exists and it is not the same thing. Reinforced Sep 30 and Oct 13.' },
    { name: 'Crew-level or installer access (job schedule without a full paid seat) and native crew notifications when a job is scheduled', theme: 'crew-access', mentions: '6+', since: 'Aug 21', cov: 'none', note: 'Raised repeatedly Aug 22 through Oct 9. Crew-notification angle also seen Sep 7 and Oct 9.' },
    { name: 'AI voice receptionist for inbound calls', theme: 'ai-voice', mentions: '5+', since: 'Aug 31', cov: 'none', note: 'Still nothing tracking it as of Oct 13.' },
    { name: 'Open or partner API, partner program, agency-level visibility', theme: 'partner', mentions: '8+', since: 'Aug 21', cov: 'none', note: 'Escalated because several asks come from real partners. Oct 13 and Oct 15 added agency visibility, white-label, and directory placement.' },
    { name: 'Outlook, Apple, and other non-Google calendar sync', theme: 'outlook-sync', mentions: '5+', since: 'Sep 3', cov: 'none', note: 'Includes the Jobs Schedule to Outlook Zapier trigger ask. Reinforced Oct 9.' },
    { name: 'Native Facebook / Meta lead forms and conversion events', theme: 'fb-leads', mentions: '4', since: 'Aug 21', cov: 'possible', note: 'A conversion-events-to-Meta ticket exists in the Aug 21 batch; native lead ingestion without Zapier has no ticket.' },
    { name: 'Website hosting and marketing services bundled with the CRM', mentions: '4+', since: 'Sep 9', cov: 'none', note: 'Third mention by Sep 14, again Oct 16.' },
    { name: 'Financing providers beyond Acorn (Wisetack named Oct 13)', theme: 'financing', mentions: '4', since: 'Sep 2', cov: 'tracked', note: 'GreenSky ticket exists from the Aug 21 batch; Wisetack is a second provider named.', ticket: { id: '86bbj9hdw', status: 'ticketed (Aug 21 batch)', live: false } },
    { name: 'Recurring and repeat-schedule jobs, recurring billing', theme: 'recurring', mentions: '6+', since: 'Aug 25', cov: 'tracked', note: 'V2 backlog ticket exists and needs PM analysis.', ticket: { id: '86ba0wyvt', status: 'needs pm analysis', live: true } },
    { name: 'Job Costing gaps: OCR receipts, subcontractor payment lifecycle, Gusto payroll, percentage-of-revenue pay, raw data export', theme: 'job-costing', mentions: '~15', since: 'Sep 29', cov: 'possible', note: 'About 15 distinct asks in 2 days, mostly single mentions. Oct 2 teamchat post mentions profitability workbench, percentage-of-revenue pay, and data export as upcoming work.' },
    { name: 'Real-availability self-scheduling on the booking form (Book Now)', theme: 'booking-form', mentions: '5+', since: 'Aug 25', cov: 'tracked', note: 'V2 backlog.', ticket: { id: '86b6z539f', status: 'new (V2 backlog)', live: true } },
    { name: 'Offline mode for the mobile app', mentions: '3+', since: 'Aug 22', cov: 'tracked', note: 'V2 backlog.', ticket: { id: '86azr0fj8', status: 'new (V2 backlog)', live: true } },
    { name: 'Multiple brands or trades under one account', theme: 'multi-brand', mentions: '4', since: 'Aug 25', cov: 'none', note: 'Aug 25, Sep 8, Sep 18, Oct 1 (multi-brand / DBA).' },
    { name: 'Thumbtack and Google LSA native lead integrations', mentions: '3+', since: 'Aug 21', cov: 'none', note: 'Reinforced Sep 22.' },
    { name: 'Per-proposal branding: hero or banner image and color', mentions: '4', since: 'Aug 25', cov: 'none', note: 'Color asked Aug 25 and Aug 29; hero image Sep 6 and Oct 13.' }
  ];
  window.PS_RECURRING = PS_RECURRING;
  window.PS_META = PS_META;
  window.PS_SWEEPS = PS_SWEEPS;
  window.PS_THEMES = PS_THEMES;
  window.PS_ROWS = rows;
})();
