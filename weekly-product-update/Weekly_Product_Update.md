# DripJobs Weekly Product Update

**Period:** September 7 – September 11, 2026
**Release:** Sep 8 deployment · 10 updates

---

## Proposal Builder

### Fixed Accepted Proposals Missing Their Activity Log Event and Metrics Credit (*Sep 8*)
**What changed:** Fixed a bug where accepting a proposal didn't always record an Activity Log event on the contact, and didn't always credit the acceptance toward that proposal's metrics.
**Why it matters:** Every accepted proposal now shows up correctly in the contact's Activity Log and in your proposal metrics, so acceptance history and reporting stay accurate.
**Action needed:** None

### Fixed Proposal Downloads Missing Images and Attachments on One Account (*Sep 8*)
**What changed:** Fixed a bug on one account where downloading a proposal produced a PDF missing its images and attachments, while the on-screen proposal displayed them correctly.
**Why it matters:** Downloaded proposal PDFs now match what you and your customer see on screen, images and attachments included.
**Action needed:** None

---

## Command Center

### Fixed Tasks Tab Getting Clipped When Jobi AI and QUO Are Both Enabled (*Sep 8*)
**What changed:** Fixed a layout bug where Command Center's Tasks tab got visually clipped on accounts with both Jobi AI and QUO enabled, cutting off part of the tab's content.
**Why it matters:** The Tasks tab now displays fully regardless of which combination of Jobi AI and QUO you have enabled.
**Action needed:** None

---

## Integrations

### Fixed Google Calendar Syncing Appointments to the Wrong Admin's Calendar (*Sep 8*)
**What changed:** Fixed a bug where some appointments synced to a different admin's connected Google Calendar than the one they were actually assigned to.
**Why it matters:** Appointments now sync to the correct admin's Google Calendar, so everyone's calendar reflects only the appointments actually assigned to them.
**Action needed:** None

### Fixed a QuickBooks Sync Failure Caused by a Stale Discount Mapping (*Sep 8*)
**What changed:** Fixed a bug where QuickBooks sync failed on invoices carrying a discount mapped to an item that had since been removed or changed in QuickBooks.
**Why it matters:** Invoices with discounts now sync to QuickBooks reliably instead of silently failing when a mapped discount item is no longer current.
**Action needed:** None. Re-sync any invoice that previously failed for this reason.

### Added "Send Marketing Agency Info" to the Zapier Integration Card (*New · Sep 8*)
**What changed:** Added a "Send Marketing Agency Info" action to the Zapier integration card, so a Zap can push a contact's marketing agency details out to other tools.
**Why it matters:** Marketing agency info can now flow into whatever other systems you connect through Zapier, without a manual export.
**Action needed:** None. Build a Zap using the new action if you'd like to use it.

### Fixed Routemize Appointments Ignoring Communication Settings (*Sep 8*)
**What changed:** Fixed a bug where appointments created through the Routemize integration sent customer communications even when that contact's communication settings had them disabled.
**Why it matters:** Routemize-created appointments now respect a contact's communication preferences the same way appointments created directly in DripJobs already do.
**Action needed:** None

### Added Stripe Payment Support to the "Payment Received" Zapier Trigger (*New · Sep 8*)
**What changed:** The "Payment Received" Zapier trigger now fires for Stripe payments in addition to the payment methods it already covered.
**Why it matters:** Zaps built on "Payment Received" now catch Stripe payments too, instead of missing them.
**Action needed:** None

---

## Admin Tools

### Added Accepted File Format Helper Text to Company Logo Upload (*New · Sep 8*)
**What changed:** The Company Logo upload in Company Settings now shows helper text listing the accepted file formats before you pick a file.
**Why it matters:** You know which file types will work before attempting an upload, instead of finding out only after a failed attempt.
**Action needed:** None

### Fixed Company Settings' Horizontal Tab Bar Not Responding to Drag at 100% Zoom (*Sep 8*)
**What changed:** Fixed a bug where Company Settings' horizontal tab bar didn't respond to click-and-drag scrolling at 100% browser zoom, even though scrolling worked at other zoom levels.
**Why it matters:** You can now drag-scroll the Company Settings tab bar at any zoom level, including the default 100%.
**Action needed:** None
