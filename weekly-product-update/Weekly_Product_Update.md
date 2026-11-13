# DripJobs Weekly Product Update

**Period:** November 12 – November 13, 2026
**Release:** Nov 12 deployment · 3 updates

---

## Billing

### Fixed Text Messaging Add-On Setup Failing to Open for CAD Accounts (*Nov 12*)
**What changed:** Fixed a bug where starting Text Messaging add-on setup with Canadian dollars (CAD) selected as the account currency refreshed the page instead of opening the configuration form, blocking setup. The existing USD setup flow is unaffected.
**Why it matters:** CAD accounts can now complete Text Messaging add-on setup through the standard flow.
**Action needed:** None

---

## Proposal Builder

### Fixed Proposal Tax Rate Displaying Two Decimals Instead of Three (*Nov 12*)
**What changed:** Fixed a bug where the proposal Tax Rate row, save confirmation toast, rate difference banner, and Edit Tax Rate toggle options on web and mobile rounded the tax rate to two decimal places instead of showing the full three-decimal rate that's actually stored and applied to every calculation.
**Why it matters:** The tax rate you see now always matches the rate you're actually charging.
**Action needed:** None

---

## Integrations

### Added Public Zapier Trigger: Proposal Sent (*New · Nov 12*)
**What changed:** Added a new Proposal Sent trigger to the DripJobs Zapier app, firing whenever a proposal is sent or resent, with a snapshot of totals, customer and deal details, line items, areas, substrates, and packages at the moment of sending.
**Why it matters:** You can now build Zaps that react the moment a proposal goes out, instead of only when a deal changes stage.
**Action needed:** None
