# DripJobs Weekly Product Update

**Period:** August 3 – August 14, 2026
**Release:** Aug 3, Aug 10 & Aug 13 deployments · 22 updates

*(Two-week catch-up edition: last week's report didn't go out, so this covers both weeks.)*

---

## Proposal Builder

### Fixed Incorrect Percentage-Based Payment Calculations with Optional Content — *Aug 3*
**What changed:** Fixed a bug where percentage-based payments on a proposal template didn't total correctly when optional areas, optional items, or packages were present, so the payment amount didn't match the proposal's actual total.
**Why it matters:** Percentage-based deposits and payments now calculate against the real proposal total, even when optional content is involved.
**Action needed:** None

### Fixed Broken Mobile Text Wrapping in the Section Order List — *Aug 10*
**What changed:** Fixed a bug where, on mobile, the Proposal Builder's section order list (Hero Image, Trust Builders, Client Notes, etc.) wrapped titles and descriptions one word per line instead of rendering cleanly.
**Why it matters:** Reordering proposal sections on your phone is now actually readable.
**Action needed:** None

### Added Minimum Deposit Validation & a Clearer Payment Error for Customers — *Aug 13*
**What changed:** A proposal with a calculated deposit below Stripe's processing minimum is now flagged before you can send it, instead of only failing when the customer tries to pay. A customer who does hit a proposal sent before this validation existed now sees a clear message asking them to contact you, instead of a generic error.
**Why it matters:** You catch a too-small deposit before it reaches a customer, and anyone who does hit the edge case gets useful guidance instead of a broken-looking error screen.
**Action needed:** None

---

## Job Costing

### Fixed Pre-Tax Invoice Revenue Mismatch Between Job Costing and Proposal Details — *Aug 3*
**What changed:** Fixed a bug where, with Pre-tax invoice enabled in Job Costing settings, the proposal detail view showed revenue using the total amount instead of the subtotal, creating a mismatch with the pre-tax figure Job Costing displayed for the same job.
**Why it matters:** Job Costing and the proposal record now show the same pre-tax revenue number for a job instead of two different totals.
**Action needed:** None

### Fixed Job Costing Dashboard Not Showing Jobs with Active Costing — *Aug 3*
**What changed:** Fixed a bug where jobs showing as "Costing Active" from the proposal-level view didn't appear in the Job Costing Dashboard under any status filter, date filter, or name search.
**Why it matters:** You can now find and manage a job's costing record from the Dashboard instead of only being able to see it from the individual proposal.
**Action needed:** None

### Fixed Area Substrate Crew Notes Missing from Work Order PDF — *Aug 10*
**What changed:** Fixed a bug where crew notes added to area substrates weren't showing up when the work order was downloaded as a PDF, across all accounts.
**Why it matters:** Crew notes you add to a job now actually reach the crew on the printed or downloaded work order.
**Action needed:** None

---

## Jobs List & Sales List

### Added Column Management (Show/Hide, Reorder, Saved Views) to the Jobs List — *New · Aug 3*
**What changed:** You can now show or hide columns on the Jobs List, drag to reorder them, and save your own column layout as a named view. Comes with built-in preset views (Default, Sales, Production, Accounting, Minimal) plus the ability to freeze columns up to a chosen point so key fields stay visible while scrolling. CSV export reflects whatever columns and order you currently have showing.
**Why it matters:** You can set the Jobs List up the way your role actually uses it, instead of scrolling through every column every time.
**Action needed:** None. Your current column layout stays as-is until you customize it.

### Added Column Management (Show/Hide, Reorder, Saved Views) to the Sales List — *New · Aug 13*
**What changed:** The same column management capability as the Jobs List (show/hide, drag-to-reorder, saved views, freeze boundary) is now available on the Sales List, with Default, Sales, and Minimal preset views.
**Why it matters:** Same benefit as the Jobs List update, extended to your sales pipeline table.
**Action needed:** None

---

## Appointments

### Fixed New Requests Count Not Matching the Pending Requests List — *Aug 3*
**What changed:** Fixed a bug where the Appointments calendar's "new requests" badge count could show a higher number than the requests actually visible in the pending requests list.
**Why it matters:** The number badge next to Appointments now accurately reflects the requests you can actually see and act on.
**Action needed:** None

---

## Metrics & Reporting

### Consolidated Closed Deals, Sales, and Production Reports — *New · Aug 3*
**What changed:** Replaced several separate metric-specific report pages (Closing Ratio by Source/Salesperson/Zip Code, Sales by Source/Salesperson/Zip Code/Crew, Sales by Production Rates/Product) with three unified report pages: Closed Deals, Sales, and Production. Each new page has filter controls to slice by the same dimensions the old separate pages covered.
**Why it matters:** One report page per topic instead of navigating between several near-duplicate pages to see different cuts of the same data.
**Action needed:** None. Links to the old standalone pages redirect to the matching consolidated report with a relevant filter pre-applied.

---

## Invoices & Payments

### Fixed Invoice Payment Instructions Not Resolving the First Name Keyword — *Aug 10*
**What changed:** Fixed a bug where the First Name keyword worked correctly in proposal payment instructions but showed up as literal placeholder text instead of the customer's name in invoice payment instructions.
**Why it matters:** Customers see their actual name in invoice payment instructions instead of unresolved placeholder text.
**Action needed:** None

### Fixed "Not Included" Banner Showing on Approved Change Orders in the Customer Invoice View — *Aug 13*
**What changed:** Fixed a bug where an approved Change Order already reflected in the invoice total could still show a "Not included" banner on the customer-facing invoice view, even though the Proposal view showed it correctly.
**Why it matters:** Customers won't see a confusing "not included" warning on a charge that's actually part of their invoice total.
**Action needed:** None

### "Pay with Other" No Longer Locked to Defaulting on Check — *Aug 13*
**What changed:** The default payment method shown under "Pay with Other" on a customer invoice is now configurable, and Check can be removed as an option if your business doesn't accept checks.
**Why it matters:** Businesses that don't accept checks no longer have to explain to customers why Check shows up as the default "other" payment method.
**Action needed:** If you don't accept checks, update your payment method options in Company Settings to remove it.

### Fixed Stripe Card Payments Not Always Registering on Invoice Payment History — *Aug 13*
**What changed:** Fixed a bug where a successful Stripe card payment could fail to record on the invoice and its payment history, even though Stripe confirmed the charge succeeded, leaving the invoice showing as unpaid.
**Why it matters:** A completed card payment now reliably shows up on the invoice, so customers won't be told a payment wasn't received when it actually was.
**Action needed:** None

---

## Customer Portal

### Multiple Documents per Category & Custom Document Categories — *New · Aug 10*
**What changed:** All six document categories in Customer Portal settings (Insurance, Warranty, Workers' Comp, License Information, W-9 Information, Misc Documents) now accept up to 5 documents each instead of one. You can also create unlimited custom document categories with your own title and icon color.
**Why it matters:** You can share a full set of documents per category (for example, both in-state and neighboring-state licenses) instead of merging everything into a single file to work around a one-document limit.
**Action needed:** None. Existing uploaded documents are unaffected.

### Fixed Proposal Page Crash on a Missing Attachment Image — *Aug 13*
**What changed:** Fixed a bug where a proposal referencing a missing or corrupted attachment image could throw a fatal error and fail to load in the Customer Portal instead of loading normally.
**Why it matters:** A proposal now loads for the customer even if one of its attachment images is missing, instead of blocking the whole page.
**Action needed:** None

---

## Communications

### Added "Send Test Email" for Drips — *New · Aug 13*
**What changed:** You can now send yourself a test copy of a drip email before it goes live, from wherever you edit a drip email. The test reflects your current unsaved draft, fills every keyword with a sample value, and is clearly marked [TEST] in the subject line. Test sends only go to your own account email and don't touch Activity, deal records, or live drip logic.
**Why it matters:** You can proof a drip email exactly as a customer would see it before it ever reaches one.
**Action needed:** None

### Fixed Manually Sent Inbox Email Replies Missing from Activity Feed — *Aug 10*
**What changed:** Fixed a bug where a manual reply sent from the Inbox on an existing email thread didn't create an Activity entry, even though the email itself sent and delivered successfully.
**Why it matters:** Your Activity feed now shows a complete communication history, including replies you send manually from the Inbox.
**Action needed:** None

### Removed Redundant {assigned-user} Template Keyword — *Aug 10*
**What changed:** Removed the `{assigned-user}` keyword from the System Communication Templates keyword picker, since it always resolved to the same value as the existing `{salesperson-name}` keyword. All 37 templates were audited and any stored uses of `{assigned-user}` were replaced with `{salesperson-name}`.
**Why it matters:** One clear keyword for the assigned salesperson instead of two overlapping ones that did the same thing.
**Action needed:** None

### New Accounts No Longer Seed Content with the Deprecated {assigned-user} Token — *Aug 13*
**What changed:** Default templates and other auto-generated content for newly created accounts now use `{salesperson-name}` instead of the deprecated `{assigned-user}` keyword. Existing accounts are unaffected.
**Why it matters:** New accounts start clean, without a keyword that was already being phased out elsewhere.
**Action needed:** None

---

## Address & Data Quality

### Fixed Township Addresses Rejected as Missing City — *Aug 3*
**What changed:** Fixed a bug where addresses in townships (e.g. Shelby Township, MI) were rejected as missing a city everywhere DripJobs validates an address (booking form, contact/deal address, Company Settings, proposal job address, scheduling), because Google's address data returns townships as an administrative area rather than a standard city.
**Why it matters:** Contractors and customers in townships can now enter their address anywhere in DripJobs without a false "missing field" error.
**Action needed:** None

---

## Mobile App

### Fixed Change Orders List Missing "View" Dropdown & Tap Navigation — *Aug 13*
**What changed:** Fixed the Change Orders list in the mobile app so each row now has a "View" dropdown with the same options available on web, and tapping a Change Order ID opens that change order's detail view instead of doing nothing.
**Why it matters:** You can view and act on change orders from the mobile app the same way you can on desktop.
**Action needed:** None
