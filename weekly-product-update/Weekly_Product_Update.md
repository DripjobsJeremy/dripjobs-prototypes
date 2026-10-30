# DripJobs Weekly Product Update

**Period:** October 26 – October 30, 2026
**Release:** Oct 26 & Oct 29 deployments · 7 updates

---

## Proposal Builder

### Fixed Reopened Proposals Not Updating After a Stage Change in Command Center (*Oct 26*)
**What changed:** Fixed a bug where changing a proposal's stage through the Command Center's Move workflow (for example, reopening a Rejected proposal to Draft) appeared to save but didn't actually update the proposal's status. Moving a proposal by drag-and-drop was not affected.
**Why it matters:** Reopening a rejected proposal through Command Center now reliably updates its status, the same as dragging it to a new stage.
**Action needed:** None

---

### Fixed New Proposals Not Inheriting the Deal's Assigned Project Manager (*Oct 26*)
**What changed:** Fixed a bug where creating a new proposal from a deal correctly defaulted the assigned Salesperson but left the Project Manager field blank, even when the deal had one assigned.
**Why it matters:** New proposals created from a deal now carry over both the Salesperson and Project Manager automatically, so you don't have to re-select the Project Manager by hand.
**Action needed:** None

---

### Fixed Scheduled Proposal Sends Not Saving or Queuing in Some Cases (*Oct 29*)
**What changed:** Fixed a bug that, for some accounts, prevented a proposal scheduled to send at a future date and time from saving or queuing. Clicking Send appeared to work but the proposal was never actually scheduled or sent.
**Why it matters:** Scheduling a proposal for a future send now reliably saves and sends at the time you selected.
**Action needed:** None

---

## Appointments

### Fixed Duplicate Calendar Entries After Scheduling an On-Site Estimate (*Oct 26*)
**What changed:** Fixed a bug where the original booking-form request stayed visible on the calendar after an on-site estimate was scheduled from Command Center, creating a duplicate entry alongside the new appointment.
**Why it matters:** Your calendar now shows a single, accurate entry once an on-site estimate request has been scheduled.
**Action needed:** None

---

## Inbox

### Fixed Email Unread Badge Showing Conversations You Can't Access (*Oct 26*)
**What changed:** Fixed a bug where the unread badge on the Email menu could count conversations from deals you're not assigned to, even though your Inbox correctly showed them as not visible to you.
**Why it matters:** The unread count on the Email menu now always matches what's actually waiting in your Inbox.
**Action needed:** None

---

## Contacts

### Added Explanations to Contact Option Toggles (*New · Oct 26*)
**What changed:** Added info icons next to the Active Contact, Opt Out of Blasts/Newsletters, Opt Out of Drips, and Opt Out of SMS toggles on a contact's Options section. Hovering or tapping an icon explains what the toggle does.
**Why it matters:** It's now clear at a glance what each contact-level toggle controls, especially for the communication opt-out settings.
**Action needed:** None

---

## Invoicing

### Fixed Request Payment's Custom % and Amount Fields Not Staying in Sync (*Oct 29*)
**What changed:** Fixed a bug in the Request Payment modal where entering a dollar amount didn't update the Custom % field to match, and where a percentage entry rounded the calculated amount down instead of to the nearest cent.
**Why it matters:** The percentage and dollar amount in a payment request now always match, and amounts are rounded correctly.
**Action needed:** None

---

## Production Rates

### Added a 48-Character Limit to Substrate Client Labels (*Oct 29*)
**What changed:** Limited the Client label field on a substrate to 48 characters going forward, with a live character counter, so new labels always display in full on customer-facing documents. Existing longer labels are unchanged and show a warning until edited back under the limit.
**Why it matters:** Client labels you add from now on will always show completely on proposals, invoices, and change orders instead of getting cut off.
**Action needed:** None
