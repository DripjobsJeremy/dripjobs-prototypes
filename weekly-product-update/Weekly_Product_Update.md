# DripJobs Weekly Product Update

**Period:** August 31 – September 4, 2026
**Release:** Sep 1 & Sep 3 deployments · 7 updates

---

## Proposal Builder

### Fixed Job Report Profit and Margin Excluding Material Cost (*Sep 3*)
**What changed:** Fixed a bug where a proposal's Job Report summary calculated Profit and Margin using labor cost and labor price only, leaving out the material cost and price already shown in the same proposal's Product Report. The Job Report now combines labor and material to calculate Total Price, Total Cost, Profit, and Margin.
**Why it matters:** The Profit and Margin shown on a proposal's Job Report now reflect the job's true, full cost and revenue picture instead of a labor-only number that could understate your actual margin by 10 points or more.
**Action needed:** None

---

## Job Costing

### Fixed a Subcontractor Cost Entry's Dropdown Not Opening (*Sep 3*)
**What changed:** Fixed a bug where a specific subcontractor/cost entry's dropdown in a job's Job Costing record wouldn't open, blocking access to that entry's details while other entries on the same job worked normally.
**Why it matters:** You can open and manage every subcontractor cost entry on a job instead of hitting one that's silently stuck.
**Action needed:** None

---

## Command Center

### Fixed Support Panel Overlapping the Chat Compose Box (*Sep 3*)
**What changed:** Fixed a layout issue in Command Center's Chat where the panel could render on top of the message compose box, blocking the text field on certain devices.
**Why it matters:** You can reliably click into the compose box and type a reply in Command Center Chat without the panel getting in the way.
**Action needed:** None

---

## Contacts

### Streamlined Archive → Delete Contact Workflow (*New · Sep 3*)
**What changed:** Archiving a contact now keeps you on that contact's record instead of redirecting to the active contact list, and immediately offers a separate prompt asking if you'd also like to delete the contact. If the contact has existing Deals, Proposals, Invoices, Appointments, or Jobs, you're warned before archiving that those records will be archived too, and warned again with stronger language before an immediate delete, since deleting permanently removes those associated records.
**Why it matters:** You no longer have to search under "Show Archived" just to finish deleting a contact, and the two-step warning keeps a lower-stakes action (archive) from being bundled with an irreversible one (delete).
**Action needed:** None

---

## Communications

### Investigated and Fixed Unintended Reschedule Messages Sent Without a Job Being Rescheduled (*Sep 1*)
**What changed:** Fixed a bug where customers on a handful of accounts received an automated reschedule text even though their job was never actually rescheduled, including cases where communications were disabled for that contact.
**Why it matters:** A reschedule text now only goes out when a job is genuinely rescheduled, so customers won't get a confusing message about a change that didn't happen.
**Action needed:** None

---

## Integrations

### Google Calendar Now Syncs All Future DripJobs Events (*Sep 3*)
**What changed:** Connecting Google Calendar now syncs every future-dated DripJobs event (appointments, scheduled jobs, estimates, etc.) to the Google Calendar you select, and keeps syncing new events created afterward. Disconnecting stops further syncing to that calendar.
**Why it matters:** Your connected Google Calendar now reliably reflects your full DripJobs schedule going forward, not just some events.
**Action needed:** None. Reconnect Google Calendar if you'd like your existing future events to sync now.

---

## Admin Tools

### Fixed Duplicate Lead Source Tags Blocking Admin Login (*Sep 3*)
**What changed:** Fixed a bug on one account where duplicate lead source tags triggered a chain of "Duplicate tag" popups that had to be dismissed one at a time before the CRM finished loading, blocking normal admin login.
**Why it matters:** Admin login is no longer interrupted by a string of duplicate-tag popups.
**Action needed:** None. Flag your Customer Success contact if you notice duplicate lead source tags on your own account.
