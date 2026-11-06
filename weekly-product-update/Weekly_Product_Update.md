# DripJobs Weekly Product Update

**Period:** November 2 – November 6, 2026
**Release:** Nov 2 & Nov 5 deployments · 8 updates

---

## Proposal Builder

### Fixed Non-Admin Users Seeing a Restricted Settings Link in Proposal Line Items (*Nov 5*)
**What changed:** Fixed a bug where the "Edit Your Products and Services" helper link appeared in the Add/Edit Line Item modal for non-admin users, even though they don't have access to that settings page. Saving a line item as a new product or service still works the same for non-admin users.
**Why it matters:** Non-admin users no longer see a link to a settings page they can't open.
**Action needed:** None

---

### Increased Proposal and Work Order PDF Line Item Text Size to Match Invoices (*Nov 5*)
**What changed:** Increased the line item and area table text size on Proposal PDFs (including Change Orders) and Work Order PDFs so they match the larger text already used on Invoice PDFs.
**Why it matters:** Proposals and work orders are now as easy to read as your invoices, for both homeowners reviewing a scope and crews reading job details in the field.
**Action needed:** None

---

## Jobs

### Fixed Job Amounts Showing the Summed Invoice Total Instead of the Proposal Price (*Nov 2*)
**What changed:** Fixed a bug where several screens, including a contact's Proposals/Jobs tab, the Deal modal, the Schedule page, and the Calendar, showed a job's amount as the sum of every visit invoice once the job was invoiced, instead of the proposal price. A multi-visit job could appear at double or more its actual proposal price on these screens.
**Why it matters:** Job amounts now match the proposal price everywhere except the Jobs Pipeline, which still compares the proposal to what's actually been invoiced.
**Action needed:** None

---

## Sales Pipeline

### Removed "Generate Invoice" from Command Center for Sales Pipeline Deals (*Nov 5*)
**What changed:** Removed the "Generate Invoice" option from the Command Center for deals still in the Sales Pipeline, so an invoice can no longer be created before a proposal is accepted. The option remains available in the Jobs Pipeline when a deal doesn't yet have an invoice.
**Why it matters:** Prevents invoices from being generated too early, which could leave a customer's Stripe payment unrecorded in DripJobs.
**Action needed:** None

---

## Invoicing

### Added Text Message Option for Payment Receipts (*New · Nov 2*)
**What changed:** You can now send a payment receipt by text message, email, or both from Receive Payment and Edit Payment, for companies with Text Messaging enabled. The text includes your company name, the payment amount, the invoice number, and a link to view the invoice.
**Why it matters:** Customers can now get payment confirmation on the same channel they already use for proposals and invoices.
**Action needed:** None

---

### Added "Offline Requested" to the Invoices Status Filter (*Nov 2*)
**What changed:** Added "Offline Requested" as an option in the Invoices Status filter dropdown, alongside the existing Open, Partially Paid, and Paid statuses.
**Why it matters:** You can now filter your Invoices list by every supported status.
**Action needed:** None

---

## Integrations

### Fixed Zapier's Deal Stage Change Trigger Failing to Load Sample Records (*Nov 2*)
**What changed:** Fixed a bug where testing the Deal Stage Change trigger in Zapier failed with an error instead of loading sample records, which blocked setting up new Zaps based on that trigger.
**Why it matters:** You can now test and set up Zaps using the Deal Stage Change trigger without errors.
**Action needed:** None

---

## Billing

### Added an Alert for Expired Payment Cards (*New · Nov 5*)
**What changed:** Account owners now see a persistent banner when the card DripJobs charges for your subscription has expired, prompting you to update your payment method before the next billing attempt.
**Why it matters:** You can update an expired card before it causes a failed payment or an interruption to your subscription.
**Action needed:** Update your payment method if this banner appears.
