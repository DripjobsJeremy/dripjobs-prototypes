# DripJobs Weekly Product Update

**Period:** October 5 – October 9, 2026
**Release:** Oct 5 deployment · 6 updates

---

## Contacts

### Fixed Google Address Autofill Not Appearing (*Oct 5*)
**What changed:** Fixed a bug where Google's address autofill suggestions weren't appearing when adding or editing an address on Contacts, Proposals, or Invoices.
**Why it matters:** You can once again pick a suggested address while typing instead of entering the full address manually every time.
**Action needed:** None

### Fixed Large Contact List Exports Failing (*Oct 5*)
**What changed:** Fixed a bug where exporting your full contacts list failed for accounts with a very large number of contacts.
**Why it matters:** You can now export your complete contacts list regardless of how many contacts you have.
**Action needed:** None

---

## Integrations

### Fixed Google Calendar Sync Getting Stuck on Permission Errors (*Oct 5*)
**What changed:** Fixed a bug where a Google Calendar connection without write access could get stuck retrying and abandon syncing, instead of being handled as an expected permissions state.
**Why it matters:** A Google Calendar connection missing write access no longer triggers repeated failed sync attempts, and other calendar connections keep syncing normally.
**Action needed:** None

### Fixed Google Calendar Events Displaying Hours Off from Their Actual Time (*Oct 5*)
**What changed:** Fixed a bug where some Google Calendar events displayed at the wrong time in DripJobs, several hours off from the time shown in Google Calendar, even when both were set to the same timezone.
**Why it matters:** Synced calendar events now show the same time in DripJobs as they do in Google Calendar.
**Action needed:** None

---

## Admin Tools

### Updated the Zapier Demo Link in Company Settings (*Oct 5*)
**What changed:** Updated the demo link in the Zapier integration card under Company Settings to point to the correct overview page.
**Why it matters:** Clicking the Zapier demo link now takes you to the right scheduling page instead of an outdated one.
**Action needed:** None

### Fixed Custom Email Domains Failing to Verify (*Oct 5*)
**What changed:** Fixed a bug preventing a custom sending domain from being added and verified in Company Settings > Email Settings.
**Why it matters:** You can now successfully set up and verify a custom email domain for your outbound drip messages.
**Action needed:** None
