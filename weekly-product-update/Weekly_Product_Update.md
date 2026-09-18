# DripJobs Weekly Product Update

**Period:** September 14 – September 18, 2026
**Release:** Sep 17 deployment · 6 updates

---

## Contacts

### Fixed Duplicate Contact Info Validation, Secondary Contact Search, and New Addresses Not Saving to Existing Contacts (*Sep 17*)
**What changed:** Fixed several contact data issues: duplicate email and phone validation now applies to every email and phone field on a contact, not just the primary; contacts can now be found in search by any of their secondary emails and phone numbers, not just the primary; a stray hover indicator in the Stores view is fixed; and a new address entered while creating a Lead, Proposal, or Onsite Estimate for an existing contact now automatically saves to that Contact record too.
**Why it matters:** Contact records stay accurate and duplicate-free, you can find a contact by any of their emails or phone numbers, and an address you enter once is available for reuse going forward instead of getting lost.
**Action needed:** None

---

## Communications

### Fixed Blast Performance Tab Not Tracking Activity After Send (*Sep 17*)
**What changed:** Fixed a bug where a Blast's Performance tab could fail to track and display delivery and engagement activity (opens, clicks, bounces, and similar events) after the blast was sent.
**Why it matters:** Blast Performance metrics now reliably reflect what actually happened after you hit send, so you can trust the numbers you're looking at.
**Action needed:** None

---

## Invoicing

### Secured Invoice Email Sending Against Unauthorized and Spam Sends (*Sep 17*)
**What changed:** Closed a security gap where invoice emails could be sent to a recipient not associated with that invoice's contact, bypassing the app's built-in checks. Every invoice email send is now independently validated on the server, not just in the browser.
**Why it matters:** Invoice emails can no longer be sent to unauthorized or spoofed recipients, protecting your accounts and customers from spam and abuse.
**Action needed:** None

### Fixed Voided Invoices Still Showing a Balance Due and Payment Button in the Customer Portal (*Sep 17*)
**What changed:** Fixed a bug where a voided invoice still showed its original balance due and an active "Pay" button in the customer portal, letting a customer attempt to pay an invoice you'd already voided.
**Why it matters:** Customers can no longer be misled into paying, or trying to pay, an invoice that's already been voided, avoiding confusing payment attempts and reconciliation headaches.
**Action needed:** None

---

## Production Rates

### Updated the Production Rates "Schedule Demo" Link (*Sep 17*)
**What changed:** Updated the "Schedule demo" link in Production Rates to point to the correct booking page.
**Why it matters:** Clicking Schedule demo from Production Rates now takes you to the right scheduling page instead of an outdated one.
**Action needed:** None

---

## Admin Tools

### Fixed a Custom Pipeline Stage That Couldn't Be Deleted Due to Stale Deal Assignments (*Sep 17*)
**What changed:** Fixed a bug where deleting a custom pipeline stage could be blocked by stale deal-stage associations, even after every deal had already been moved off that stage.
**Why it matters:** You can now delete a custom stage once all deals are actually off it, without a false "deals still assigned" error blocking you.
**Action needed:** None
