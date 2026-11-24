# DripJobs Product Release Notes | November 2026 (Preliminary)

**Period:** November 1 – November 23, 2026 (preliminary, updated as the month closes)
**Releases:** 6 deployments so far
**Improvements:** 21 updates so far

---

## 📄 Proposals & Proposal Builder (6 updates)

### Category and Substrate Order Is Now Kept When Adding an Area (Nov 19)
**What changed:** Fixed an issue where the order you pick categories and substrates in when adding an Interior or Exterior Area, for example Doors, Ceiling, Walls, was re-sorted after you clicked Next. The order you chose is now kept through Next and in the saved Area.
**Why it matters:** You no longer have to re-order items by hand while building a bid.
**Action needed:** None

### Proposal Tax Rate Now Shows Three Decimals on Web and Mobile (Nov 12)
**What changed:** In the proposal and template builders on web and mobile, the tax rate now displays to three decimals, for example 7.666% or 5.000%, including the Tax Rate row, the save message, the rate-difference banner, and the toggle options. Tax calculations, the Customer Portal, PDFs, and invoices are unchanged.
**Why it matters:** You can see the exact tax rate you are charging. The amounts charged were already correct.
**Action needed:** None

### New: Description Only Option When Adding Multiple Items (Nov 9)
**What changed:** The Add Multiple Items window on web and mobile now has a Description Only checkbox for each item, in proposals, packages, and proposal templates. It locks Qty, Price, and Optional for that row and cannot be combined with Optional. Description Only items add nothing to the proposal total and show no price on the PDF, Customer Portal, or invoice.
**Why it matters:** You can add a batch of description-only lines in one pass instead of editing each one afterward.
**Action needed:** None

### "Edit Your Products and Services" Link Hidden From Non-Admin Users (Nov 5)
**What changed:** In the Proposal Builder's line item window, the "Edit Your Products and Services" link is now hidden from non-admin users such as salespeople. They can still save a line item as a new product or service, and admins keep the link.
**Why it matters:** Your staff are no longer pointed to a settings page they cannot use.
**Action needed:** None

### Proposal and Work Order PDF Text Now Matches the Invoice PDF Size (Nov 5)
**What changed:** Table text on Proposal PDFs, including Change Order sections, and on Work Order PDFs is now larger to match the Invoice PDF. This covers line item tables, production rate area tables, and package line items. Descriptions that set their own size keep it, and the totals block, Proposal Summary, and address positions are unchanged.
**Why it matters:** Homeowners and crews can read line items and work orders more easily.
**Action needed:** None, long proposals may run a page or two longer.

### Job Amounts Now Show the Proposal Price Everywhere (Nov 2)
**What changed:** Job amounts on the contact page, deal window, Schedule page, calendar banners and visit pop-ups, Schedule Job dropdown, Proposals list, and Proposals Sent report now consistently show the proposal price. Multi-visit invoiced jobs no longer show doubled totals, and pending change orders are no longer counted on the Proposals list. The Job Pipeline and billing screens still use invoice totals.
**Why it matters:** The same job shows the same dollar amount everywhere, so recurring and multi-visit jobs are no longer overstated.
**Action needed:** None, expect Proposals Sent report values to change for jobs that were invoiced in visits.

---

## 💳 Customer Portal & Invoicing (3 updates)

### Invoices No Longer Charge Tax on Change Order Areas When Production Rates Tax Is Off (Nov 23)
**What changed:** Fixed an issue where Areas added by a Change Order were invoiced with the company tax rate even when Tax on Materials and Tax on Labor were turned off in Production Rates. The invoice now shows no tax on those Areas, and the invoice total matches the signed proposal plus change orders. Behavior with tax turned on, and tax on standalone line items, is unchanged.
**Why it matters:** Customers are no longer billed tax that was not on anything they signed.
**Action needed:** None, you may want to review past invoices that had change order Areas while Production Rates tax was off.

### New: Text Message Option for Payment Receipts (Nov 2)
**What changed:** For companies with Text Messaging, the Receive Payment window now lets you send the receipt by email, text, both, or neither, and Edit Payment has the same options, defaulting to No Receipt. The text is prefilled and editable, includes a link to the invoice, and is logged in the contact's communication history. Texts are not sent to contacts with no phone number or who opted out of SMS.
**Why it matters:** Customers get their payment confirmation on the same channel you use for proposals and invoices.
**Action needed:** None

### "Offline Requested" Added to the Invoices Status Filter (Nov 2)
**What changed:** The Status dropdown on the Invoices tab now includes "Offline Requested", so you can filter by every invoice status. Existing filters are unchanged.
**Why it matters:** You can quickly find invoices where the customer asked to pay offline.
**Action needed:** None

---

## 📱 Pipeline & Mobile (2 updates)

### New: Business Records for Commercial Accounts (Nov 19)
**What changed:** You can now create a Business as its own record, with a required Legal Name and optional DBA, email, phone, industry, and addresses, and associate several Contacts with it, one of them marked Primary. A new Businesses item in the Sales menu leads to a tabbed Business profile that brings together the activity tied to that business. You can create or choose a Business from New Lead, New Appointment, New Proposal, and Create Invoice, see Business icons on pipeline cards and calendar tiles, and turn on a Show Business toggle on the Contact List. A Business with open deals, invoices, or jobs can be archived but not deleted.
**Why it matters:** You can track commercial customers with several contacts under one business, with their deals and proposals in one place.
**Action needed:** None, create a Business for any commercial account you want to track this way.

### "Generate Invoice" No Longer Offered Before a Proposal Is Accepted (Nov 5)
**What changed:** "Generate Invoice" in Command Center > Invoices no longer appears for deals in the Sales Pipeline. It still appears for Jobs Pipeline deals that have no invoice, for example after an invoice was deleted. Accepting a proposal still creates the invoice as usual, and existing invoices and payments are untouched.
**Why it matters:** You can't invoice a proposal before it is accepted, which avoided status mismatches and Stripe payments not showing in DripJobs.
**Action needed:** None, invoices already generated early are not changed by this update.

---

## 💬 Messaging & Notifications (2 updates)

### Text Messaging Setup Now Opens for Canadian-Dollar Accounts (Nov 12)
**What changed:** Fixed an issue where, for accounts set to Canadian dollars, Text Messaging add-on setup refreshed the page instead of opening the configuration form after Continue and Complete setup. The form now opens, and a failed setup request shows an actionable error.
**Why it matters:** Canadian contractors can set up texting themselves.
**Action needed:** None, retry setup if you were stuck before.

### Emojis in Email Blast Subject Lines Now Save Correctly (Nov 9)
**What changed:** Fixed an issue where emojis typed or pasted into an email blast subject line were lost when saved and showed as "??". They now stay intact after saving, in the Live Preview, in test sends, and in recipients' inboxes.
**Why it matters:** Your seasonal promotion blasts no longer go out with broken "??" subject lines.
**Action needed:** Blasts or scheduled sends saved before this fix still contain "??", so re-enter the emojis in the subject.

---

## 🔌 Integrations (3 updates)

### Zapier "Find Most Recent Deal or Job" Action Updated to Help Move Deal Cards (Nov 23)
**What changed:** The Zapier action "Find Most Recent Deal or Job" was updated to return the Deal or Job ID, plus a clearly labeled record type, so a Zap can find a deal by email and phone and then move its deal card.
**Why it matters:** Your automations can find a customer's deal and move it through the pipeline automatically.
**Action needed:** If you use this action in a Zap, re-test it and map the new ID fields if needed.

### New: Zapier "Proposal Sent" Trigger (Nov 12)
**What changed:** A new public Zapier trigger, "Proposal Sent", fires each time a proposal is sent or resent, including scheduled sends when they actually go out. It sends a snapshot of the proposal with totals, deal and customer details, line items, areas, substrates, and packages. It does not fire on manual deal-stage moves or on saves.
**Why it matters:** You can automate follow-ups and record keeping the moment a proposal goes out.
**Action needed:** Optional, create a Zap with the Proposal Sent trigger.

### Zapier "Deal Stage Change" Trigger Test Now Works (Nov 2)
**What changed:** Testing the Deal Stage Change trigger in Zapier now loads valid sample deals instead of failing with "Unable to pull deals". Accounts with no sample data get an empty result, and behind-the-scenes errors no longer expose technical details.
**Why it matters:** You can set up and test Zapier automations on deal stage changes without hitting a dead end.
**Action needed:** None

---

## 📊 Metrics & Reports (1 update)

### Job Costing Refreshed to Match the Current DripJobs Design (Nov 23)
**What changed:** Eight Job Costing screens, the Dashboard, Details, Reports index, Employee Timesheets, Employee Payroll, QuickBooks Time entries, Misc. Costs, and Tutorials, now use the current DripJobs look with section cards, floating-label fields, standard buttons, and pill tabs. The Edit action on Materials and Misc. Costs rows now actually edits the row, and Costing Status can move from Costing Complete back to Costing Active.
**Why it matters:** Job Costing looks consistent with the rest of DripJobs, and you can correct a cost line without deleting it.
**Action needed:** None

---

## ⚙️ Settings (4 updates)

### New Production Rate Tutorial Video Series (Nov 19)
**What changed:** Production Rate Guides in Settings > Production Rates now has an 8-part video series in place of the previous 4 videos, covering why to use Production Rates, setting up standard prep, pricing materials, labor, and total costs, a tour of the tabs, setting up substrates and areas, building a living room bid, and estimating exterior repaint labor and materials.
**Why it matters:** You get current, step-by-step training for setting up accurate bids.
**Action needed:** None, watch the videos from the Production Rate Guides section.

### New: Full Logo Upload for Wide Logos (Nov 9)
**What changed:** Company Settings > Brand now has an optional "Full Logo" upload for wide or horizontal logos, and the existing logo field is now labeled Logo Icon for your square logo. The Full Logo appears in proposals, invoices, work orders, the Customer Portal sidebar, and outbound emails, while the portal header box and watermark keep the Logo Icon. Brand Finder fills in both.
**Why it matters:** A wide logo now shows at a readable size instead of being squeezed into a square.
**Action needed:** Optional, upload a Full Logo if you have a wide logo. Once uploaded, emails, queued sends, and PDFs switch to it.

### Expanded Starting Rates for Companies Adding Production Rates (Nov 9)
**What changed:** Companies adding the Production Rates add-on for the first time now start with an expanded set of default base rates that merges with the existing defaults, including combined categories, a new Interior Closets category, many more substrates, and 30 products. Existing add-on accounts are not changed.
**Why it matters:** New users get realistic starting rates for their first proposals.
**Action needed:** None

### New: Expired Payment Card Banner for Account Owners (Nov 5)
**What changed:** Account owners now see a red banner when the primary card on their DripJobs subscription has expired, with an "Update Billing Details" button that opens Manage Billing. It shows on active and trial subscriptions and clears once a valid primary card is on file.
**Why it matters:** You get a warning before a failed charge interrupts your subscription.
**Action needed:** If your card has expired, update your billing details.

---

## 🚀 Upcoming Releases (3 in progress)

### Direct Thumbtack Integration (QA complete)
A direct Thumbtack integration is in the works. Once live, new Thumbtack leads will flow straight into DripJobs as contacts and deals, tagged with Thumbtack as the lead source, and dropped automatically into your Sales Pipeline and drip sequences, no manual entry required.

### Per-Package Discounts (In QA)
Every package on a proposal will get its own discount action, flat or percentage, calculated against that package's subtotal and added as a discount line inside the package. Each package's discount stays independent of the others.

### Job Costing Export to Spreadsheet (PR in review)
Admins will be able to download Job Costing data as CSV files from the Job Costing Dashboard, matching the jobs on screen, and from each Job Costing Details page, with its snapshot totals, labor, subcontractors, materials, and miscellaneous costs in one file, for any costing status.

---

## ✨ Other Exciting Updates Coming Soon (1 planned)

### Invoice Reminders (Planned)
Automatic, configurable reminders for outstanding invoices are on the way, sent by email or text before the due date, on the due date, or after, on a schedule you control. The Invoices page is also getting summary stats, more filters, a reminder status for every invoice, and bulk actions like Send Reminder, Mark as Paid, and Export.

---

Questions about anything above? Visit help.dripjobs.com or reach out to your DripJobs support team.
