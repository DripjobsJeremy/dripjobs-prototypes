# DripJobs Weekly Product Update

**Period:** August 24 – August 28, 2026
**Release:** Aug 26 & Aug 27 deployments · 13 updates

---

## Proposal Builder

### Fixed "View Details" Button Overlapping Line Item Text on Package Selection Cards (*Aug 27*)
**What changed:** Fixed a layout bug where the "View Details" button on Good/Better/Best package cards in the customer-facing proposal view rendered directly on top of the line item name instead of beside or below it.
**Why it matters:** Customers reviewing package options can now read every line item name without a button covering the text.
**Action needed:** None

### Improved Loading Feedback and Send Speed for Mobile Proposal Sends (*Aug 27*)
**What changed:** Investigated and addressed an elevated, inconsistent delay when sending a proposal from a mobile device, and added a visible loading indicator during the send so the screen no longer goes blank with no feedback.
**Why it matters:** Sending a proposal from your phone now shows clear progress instead of an unexplained delay that looks stalled.
**Action needed:** None

---

## Job Costing

### Fixed Job Costing Complete Zapier Trigger Not Firing Automatically (*Aug 26*)
**What changed:** Fixed a bug where the "Job Costing Complete" Zapier trigger only fired when run manually, not when a job costing record was actually completed.
**Why it matters:** Zaps built on the Job Costing Complete trigger now fire automatically as intended, without needing a manual test run first.
**Action needed:** None

---

## Jobs List & Sales List

### Added Job Address Column to the Jobs List (*Aug 27*)
**What changed:** The Jobs List now has a "Job Address" column showing the job's full service address (street, city, state, zip) from its Accepted proposal. On CSV export, the address breaks out into four separate columns.
**Why it matters:** You can see a job's service address directly in the Jobs List and pull it into spreadsheets or mail merges without manually splitting it out.
**Action needed:** None

---

## Appointments

### Added Per-User Holiday Calendar Display, US & Canada (*Aug 27*)
**What changed:** Added a per-user Holiday Calendar preference (None, United States, Canada, or both) that displays non-editable holiday blocks on the Appointments and Job Schedule calendars for the selected region(s). Defaults to None for all users.
**Why it matters:** You can see recognized holidays right on your calendar so you don't inadvertently schedule work on a day you or your team observes as a holiday.
**Action needed:** None. Opt in from your calendar settings if you'd like holiday blocks displayed; existing calendar behavior is unchanged until you do.

---

## Metrics & Reporting

### Added DripSense (AI Metrics Insights) (*Aug 27*)
**What changed:** Added an AI-generated insights panel to the Metrics Dashboard that translates your performance data into plain-English observations, comparing your selected time period against the equivalent prior period and calling out a likely driver when one is clear. Insights only generate when you click "Run Insights," so viewing different date ranges never uses AI credits on its own.
**Why it matters:** You get a plain-English summary of what changed in your numbers and why, without manually interpreting every chart and ratio yourself.
**Action needed:** None. Click "Run Insights" on the Metrics Dashboard whenever you want an updated summary for your selected period.

---

## Customer Portal

### Increased Size and Prominence of the Proposal Hero Image Upload Button (*Aug 27*)
**What changed:** The Upload button for the Proposal Hero Image in Customer Portal > Portal Visual Identity settings is now larger and more visually prominent.
**Why it matters:** The upload control for your proposal branding image is easier to find and use when setting up your portal.
**Action needed:** None

---

## Contacts

### Added Support for Multiple Phone Numbers and Emails on Contact Records (*Aug 26*)
**What changed:** A Contact record can now store multiple phone numbers, email addresses, and physical addresses, with one entry per category marked as Primary. The Primary values are used by default across communications, drips, proposals, and invoices, and existing addresses from a contact's past deals and jobs were backfilled onto the contact record automatically.
**Why it matters:** You can keep a complete contact profile instead of overwriting a customer's old number or email when they give you a new one, and everything still sends to the right Primary contact info by default.
**Action needed:** None. Review a contact's Primary phone, email, and address if you'd like to adjust which one is used by default.

---

## Communications

### Fixed Drips Still Sending After Being Disabled on a Deal (*Aug 27*)
**What changed:** Fixed a bug where a drip message could still send up to roughly 40 minutes after Drips were disabled on a Deal, most notably in the Project Completed stage.
**Why it matters:** Disabling Drips on a deal now reliably stops all further scheduled drip messages for that deal.
**Action needed:** None

### Fixed Blast Email Performance Tab Not Reflecting Opened Emails (*Aug 27*)
**What changed:** Fixed a bug where a Blast email campaign's Performance tab showed zero opens even when recipients had opened the email, which the contact-level Activity tab was already recording correctly.
**Why it matters:** Blast performance metrics now match what's actually happening with your recipients, so you can trust the open counts you're reviewing.
**Action needed:** None

---

## Booking Form

### Fixed Booking Form Not Restoring Scroll Position After Selecting a Date (*Aug 27*)
**What changed:** Fixed a bug where selecting a date in the Booking Form's Preferred Date or Alternate Date picker dropped the customer somewhere else on the page instead of returning them to the field they were completing.
**Why it matters:** Customers filling out a booking form no longer lose their place and have to scroll back down after picking a date.
**Action needed:** None

---

## Admin Tools

### Simplified Branch Admin Tool for Bulk Company Number Entry (*Aug 26*)
**What changed:** The Branch Admin tool now has one simplified screen where a Super Admin can paste in multiple company numbers at once and run the existing branch stored procedure against all of them in a single submission, instead of processing one company number at a time.
**Why it matters:** Bulk branch admin work that used to take one company at a time now runs as a single batch, with a clear per-company success or failure result.
**Action needed:** None (Super Admin tool only)

### Added HealthScore Dashboard At-Risk Account Finder (*Aug 27*)
**What changed:** Added a focused view of the HealthScore Dashboard that lets Super Admins filter accounts by Health tier, Plan, OBCSS owner, and signup date to find at-risk accounts, with contact info surfaced directly so a rep can reach out without impersonating the account.
**Why it matters:** Onboarding and CS reps can find and act on accounts likely to churn straight from a filtered list, instead of digging through accounts one at a time.
**Action needed:** None (Super Admin tool only)
