# DripJobs Weekly Product Update

**Period:** July 27 – July 31, 2026
**Release:** Jul 27 deployment · 10 updates

---

## Proposal Builder

### Fixed Proposals Not Inheriting Company Tax Rate — *Jul 27*
**What changed:** Fixed a bug where new proposals started with a blank tax rate instead of automatically inheriting the company tax rate configured in Company Settings, which threw off proposal totals until the rate was set manually.
**Why it matters:** New proposals now calculate tax correctly from the start, without an extra manual step.
**Action needed:** None

### Fixed Substrate Measurements Reverting on Proposals — *Jul 27*
**What changed:** Fixed a bug where certain SQFT-based substrate measurements could revert to an old saved value after clicking Next, with the incorrect value also showing up in Customer View.
**Why it matters:** Substrate measurements you enter now save and display correctly everywhere, so proposals reflect the numbers you actually measured.
**Action needed:** None

### Archived and Deleted Proposals No Longer Visible to Customers — *New · Jul 27*
**What changed:** Archived or deleted proposals no longer appear in a customer's Proposals list in the Customer Portal. If a customer opens a direct link to a proposal that's since been archived, they now see a closure message instead of the proposal content.
**Why it matters:** Customers can't act on a proposal you've already closed out, and won't see stale pricing or job details through old links.
**Action needed:** None

---

## Sales Pipeline

### Bulk Archive Booking Requests — *New · Jul 27*
**What changed:** You can now select multiple booking requests in the Requests list and archive them all at once, instead of archiving them one at a time. A confirmation step lets you choose whether to archive just the requests or the requests and their associated deal cards.
**Why it matters:** Clearing out a backlog of stale booking requests takes one bulk action instead of dozens of individual ones.
**Action needed:** None

---

## Job Costing

### Fixed Job Costing Search by Job Name — *Jul 27*
**What changed:** Fixed a bug where searching for a job by name on the Job Costing page and clicking Go just refreshed the page instead of returning results. Search now returns matching job costings, or a clear message when nothing matches.
**Why it matters:** You can find the job costing you're looking for by name instead of scrolling to find it manually.
**Action needed:** None

---

## Text Messaging

### Fixed False Error Banner After Successful Proposal Text — *Jul 27*
**What changed:** Fixed a bug where sending a proposal by text could show a red error banner claiming the text failed to send, even though the message was delivered and the chat should have updated normally.
**Why it matters:** You won't see a false failure warning on a proposal text that actually went through.
**Action needed:** None

---

## Integrations

### New Zapier Trigger: Payment Marked as Received — *New · Jul 27*
**What changed:** Added a new Zapier trigger that fires whenever a payment is registered, including partial payments and deposits, with payment, invoice, customer, and deal details exposed as individually mappable fields.
**Why it matters:** You can build automations off any payment event, including partials, without extra lookups.
**Action needed:** The new trigger is available now in your Zapier account under DripJobs triggers.

### New Zapier Trigger: Proposal Rejected — *New · Jul 27*
**What changed:** Added a new Zapier trigger that fires when a proposal is rejected, including the proposal ID, total, status, and the associated deal and contact IDs.
**Why it matters:** You can automate follow-up workflows the moment a proposal is rejected instead of checking manually.
**Action needed:** The new trigger is available now in your Zapier account under DripJobs triggers.

### Cleaned Up Fields on Three Zap Steps — *Jul 27*
**What changed:** Removed a set of unused fields from the Find Most Recent Deal or Job, Move Job, and Job Costing Completed Zap steps to simplify the field list when mapping them, and made Drip Sequence an optional field on the Move Job action instead of required.
**Why it matters:** Less clutter when building a Zap, and Move Job no longer forces you to specify a drip sequence you don't need.
**Action needed:** If an existing Zap maps one of the removed fields, it may need updating. Reach out to your Customer Success contact if a Zap stops working as expected.

---

## Admin Settings

### Account Deactivation Now Pauses Communications and Locks Public Document Links — *New · Jul 27*
**What changed:** Deactivating a tenant account now automatically pauses that account's active drip sequences and scheduled appointment reminders, halts unsent blasts, and shows a "no longer available" message on public proposal, invoice, and change order links instead of rendering them. Reactivating the account resumes everything normally.
**Why it matters:** A deactivated account can't keep messaging customers or exposing pricing and job details through old public links.
**Action needed:** None
