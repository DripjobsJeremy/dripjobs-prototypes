# DripJobs Product Release Notes | August 2026

**Period:** August 1 – August 31, 2026
**Releases:** 7 deployments
**Improvements:** 34+ updates

---

## 📄 Proposals & Proposal Builder (6 updates)

### Package Line Item Text No Longer Hidden Behind "View Details" Button (Aug 27)
**What changed:** Fixed a layout bug in the customer-facing proposal where the "View Details" button on a package tier could overlap and cover the line item name next to it.
**Why it matters:** Customers reviewing your Good, Better, and Best packages can now read every line item clearly without text getting hidden behind a button.
**Action needed:** None

### Larger, More Visible Proposal Hero Image Upload Button (Aug 27)
**What changed:** The Upload button for your Proposal Hero Image in Portal Visual Identity settings is now bigger and easier to spot.
**Why it matters:** Setting up your proposal branding is quicker when the upload control is easy to find instead of easy to miss.
**Action needed:** None

### Accepted Package Total Now Matches What the Customer Approved (Aug 20)
**What changed:** Fixed an issue where, after a customer accepted one package from a multi-package proposal, the total shown under Contact Information still included the other, unselected packages.
**Why it matters:** The deal total you see should always reflect what the customer actually agreed to, not every option they were shown.
**Action needed:** None

### "View Details" Button Replaces Info Icon on Package Line Items (Aug 20)
**What changed:** Package line items in the customer-facing proposal now show a clear "View details" button instead of a small (i) icon that only revealed more information on hover.
**Why it matters:** A visible, tappable button makes it obvious to customers, especially on mobile, that more detail is available for a line item.
**Action needed:** None

### Cleaner Section List Layout on Mobile Proposal Builder (Aug 10)
**What changed:** Fixed a display bug where section titles and descriptions in the Proposal Builder's section order list (Hero Image, Trust Builders, Client Notes, and similar) wrapped one word per line on mobile screens.
**Why it matters:** The section list is now easy to read on a phone instead of breaking into a jumbled column of single words.
**Action needed:** None

### Percentage-Based Payments Now Calculate Correctly with Optional Content (Aug 3)
**What changed:** Fixed an issue in proposal templates where a percentage-based payment amount didn't match the proposal total whenever optional areas, optional items, or packages were included.
**Why it matters:** Your deposit and payment amounts now line up with the total your customer actually sees, no matter what optional content is on the proposal.
**Action needed:** None

---

## 💳 Customer Portal & Invoicing (7 updates)

### Multiple Documents Per Category in Customer Portal Settings (Aug 10)
**What changed:** Each document category in Customer Portal Settings, including Insurance, Warranty, Workers' Comp, License Information, W-9 Information, and Misc Documents, now accepts up to 5 files instead of just one. You can also create your own custom document categories with their own title, icon, and color, and reorder them however you like.
**Why it matters:** You can now share every license, certificate, and document your customers need without merging files together to fit them into a single upload slot.
**Action needed:** None, look for the updated document management area in Company Settings > Customer Portal.

### Broken Proposal Attachments No Longer Crash the Customer Portal (Aug 13)
**What changed:** Fixed an issue where a proposal with a missing or corrupted attachment image would fail to load entirely in the Customer Portal instead of just skipping that one image.
**Why it matters:** A single bad attachment should never keep your customer from being able to open and review the rest of a proposal.
**Action needed:** None

### Successful Stripe Card Payments Now Reliably Recorded on Invoices (Aug 13)
**What changed:** Fixed an issue where a successfully processed Stripe card payment could occasionally fail to show up on the invoice's payment history, making it look like the customer hadn't paid.
**Why it matters:** Your team and your customers can now trust that a completed payment always appears where it should, without needing a manual check.
**Action needed:** None

### Approved Change Orders No Longer Show a "Not Included" Warning (Aug 13)
**What changed:** Fixed a bug where an approved Change Order that was correctly reflected in the invoice total could still display a "Not included" banner on the customer-facing invoice view.
**Why it matters:** Customers should see one consistent story about what's included in their invoice, not a warning that contradicts the total they're being charged.
**Action needed:** None

### Configurable Default for "Pay with Other" on Invoices (Aug 13)
**What changed:** The "Pay with Other" payment option on customer invoices no longer automatically defaults to Check with no way to change it.
**Why it matters:** If your business doesn't accept checks, your customers won't be steered toward a payment method you can't process.
**Action needed:** None, check your invoice payment settings if you'd like to adjust or remove Check as a default option.

### Deposit Amounts Below Stripe's Minimum Are Now Caught Before Sending (Aug 13)
**What changed:** If a proposal's deposit calculates to less than $1.00, you'll now see a warning before you can send it, and if an older proposal like this reaches a customer, they'll see a clear message directing them to contact you instead of a generic error.
**Why it matters:** Your customers get a working payment experience instead of a confusing error message when a deposit amount is too small for card processing.
**Action needed:** None

### "First Name" Keyword Now Resolves Correctly in Invoice Payment Instructions (Aug 10)
**What changed:** Fixed an issue where the "First name" keyword worked correctly in proposal payment instructions but showed up as literal text instead of the customer's name in invoice payment instructions.
**Why it matters:** Your invoice messaging now reads as personally as your proposal messaging does.
**Action needed:** None

---

## 🧰 Work Orders (1 update)

### Area Substrate Crew Notes Now Appear on Work Order PDFs (Aug 10)
**What changed:** Fixed an issue where crew notes added to area substrates weren't showing up on the downloaded Work Order PDF.
**Why it matters:** Your crew gets the notes they need on the paperwork they actually use in the field.
**Action needed:** None

---

## 📝 Booking Forms (1 update)

### Booking Form Now Returns You to Where You Left Off After Picking a Date (Aug 27)
**What changed:** Fixed an issue where selecting a Preferred or Alternate Date on the Booking Form would leave the customer somewhere else on the page instead of back at the field they were filling out.
**Why it matters:** Customers filling out a Booking Form on their phone no longer have to hunt for their place after picking a date.
**Action needed:** None

---

## 📱 Pipeline & Mobile (6 updates)

### New: Holiday Calendar Display for Appointments and Job Schedule (Aug 27)
**What changed:** You can now choose to display US holidays, Canadian holidays, or both directly on your Appointments and Job Schedule calendars, so scheduled days off show up automatically without blocking you from booking on them if you need to.
**Why it matters:** You can spot a holiday at a glance instead of accidentally scheduling a job on a day your team doesn't work.
**Action needed:** None, set your Holiday Calendar preference if you'd like holidays to show up on your calendars.

### New: Job Address Column on the Jobs List (Aug 27)
**What changed:** The Jobs List now includes a Job Address column, sourced from the job's accepted proposal, and it exports as separate Street, City, State, and Zip columns.
**Why it matters:** You can see and export a job's full service address without leaving the Jobs List or manually splitting it into pieces.
**Action needed:** None

### New: Multiple Phone Numbers, Emails, and Addresses on Contact Records (Aug 26)
**What changed:** A Contact record can now hold more than one phone number, email address, and physical address, with one of each marked as Primary. The Primary values are what's used across proposals, invoices, and outbound communications by default.
**Why it matters:** You can keep a complete profile for every contact and still be confident the right phone number or email is the one your team and DripJobs use automatically.
**Action needed:** None

### New: Column Management for the Jobs List and Sales List (Aug 13)
**What changed:** You can now show or hide columns, drag them into any order, and save your own named views on both the Jobs List and Sales List, alongside built-in presets for common roles. A freeze option keeps the columns you rely on most, like Customer Name, pinned in place while the rest of the table scrolls.
**Why it matters:** You can build a view of your Jobs and Sales Lists that matches how you actually work, instead of scrolling past columns you never use.
**Action needed:** None, look for the new column management control on the Jobs List and Sales List.

### Change Orders List Fixed in the Mobile App (Aug 13)
**What changed:** Fixed the Change Orders list in the mobile app so the "View" dropdown appears on each row and tapping a Change Order ID opens its detail view, matching how Jobs and Proposals already work.
**Why it matters:** You can review and act on a change order from your phone the same way you can on desktop.
**Action needed:** None

### Appointments Calendar "New Requests" Count Now Matches Pending Requests (Aug 3)
**What changed:** Fixed a bug where the "new requests" badge on the Appointments calendar could show a higher number than the pending requests actually visible in the list.
**Why it matters:** The badge count is now something you can trust instead of second-guessing whether a request is missing.
**Action needed:** None

---

## 💬 Messaging & Notifications (6 updates)

### Fixed: Drips No Longer Send After Being Disabled (Aug 27)
**What changed:** Fixed an issue where a drip message could still go out on a deal after Drips had been disabled for that deal, most noticeably in the Project Completed stage.
**Why it matters:** Turning off drips for a deal now reliably stops every future message for that deal, so customers won't hear from you after you've told the system to stop.
**Action needed:** None

### Blast Performance Tab Now Reflects Email Opens (Aug 27)
**What changed:** Fixed an issue where the Blast Performance tab could show zero opens for a campaign even though individual contacts' Activity tabs correctly showed the email had been opened.
**Why it matters:** Your Blast performance numbers now match what's actually happening with your recipients.
**Action needed:** None

### New: Customer Portal Email Preferences Page Redesign (Aug 20)
**What changed:** The Customer Portal's email settings page now leads with "Unsubscribe from all emails" and gives it a distinct warning style, followed by job-related and marketing email options, each of which can be expanded to show exactly what it blocks and what still sends.
**Why it matters:** Your customers can see at a glance which option has the biggest impact on their emails, so they don't accidentally opt out of everything by mistake.
**Action needed:** None

### Cleaned Up Salesperson Keyword in Templates and Keyword Picker (Aug 13)
**What changed:** The older {assigned-user} keyword has been removed from the keyword picker and replaced with {salesperson-name} everywhere it appeared in default templates, since both resolved to the same value.
**Why it matters:** There's now one clear keyword for inserting a salesperson's name into a message, instead of two overlapping options that did the same thing.
**Action needed:** None

### New: Send Test Email for Drips (Aug 13)
**What changed:** You can now send yourself a test copy of a drip email straight from the editor before it goes live, with every keyword filled in with sample data and the subject line clearly marked as a test.
**Why it matters:** You can check that a drip email looks and reads the way you want before it ever reaches a real customer.
**Action needed:** None, look for the new "Send Test Email" option when editing a drip email.

### Manually Sent Inbox Replies Now Appear in Activity (Aug 10)
**What changed:** Fixed an issue where a reply you typed and sent manually from the Inbox wouldn't show up in that contact's Activity feed, even though it was delivered successfully.
**Why it matters:** Activity now shows a complete picture of every email sent to a contact, no matter how it was sent.
**Action needed:** None

---

## 🔌 Integrations (2 updates)

### Job Costing Complete Zapier Trigger Now Fires Automatically (Aug 26)
**What changed:** Fixed an issue where the Job Costing Complete Zapier trigger worked when run manually but didn't fire on its own once a job costing record was actually completed.
**Why it matters:** Automations built on this trigger now run the moment job costing wraps up, without you needing to trigger them by hand.
**Action needed:** None

### QuickBooks Integration Reliability Improvements (Aug 17)
**What changed:** When a record fails to sync to QuickBooks, you'll now see a clear failure indicator directly on that record along with a plain-language explanation of what went wrong, and you can manually retry the sync without disconnecting and reconnecting your account. The QuickBooks panel in Company Settings also now clearly shows whether your connection is active, expired, or disconnected.
**Why it matters:** You can see and fix a sync problem yourself instead of discovering later that records silently failed to make it into QuickBooks.
**Action needed:** None

---

## 📊 Metrics & Reports (4 updates)

### New: DripSense, AI-Generated Metrics Insights (Aug 27)
**What changed:** A new DripSense panel on the Metrics Dashboard generates a plain-English summary of what changed in your numbers, compared to the equivalent prior period, whenever you click "Run Insights."
**Why it matters:** You get a quick read on what moved and, where the data supports it, why, without manually comparing charts and ratios yourself.
**Action needed:** None, click "Run Insights" on your Metrics Dashboard to try it.

### Email and Phone Columns Added to Metrics Reports (Aug 20)
**What changed:** The Leads, Closed Deals, Sales, Production, and Total Proposal Sent reports now show each contact's primary email and phone number, both on screen and in CSV exports, matching what's already shown on the Sales List and Jobs List.
**Why it matters:** You can reach out to a contact directly from a metrics report without switching over to look up their details elsewhere.
**Action needed:** None

### Pre-Tax Invoice Revenue Now Consistent Between Job Costing and Proposal Details (Aug 3)
**What changed:** Fixed an issue where, with Pre-tax invoice enabled, the Job Costing view correctly showed the pre-tax subtotal but the proposal detail view still showed the full total.
**Why it matters:** Your revenue numbers now match wherever you look, instead of two screens telling two different stories.
**Action needed:** None

### Reports Consolidated into Closed Deals, Sales, and Production Pages (Aug 3)
**What changed:** Closing ratio, sales, and production reports that used to live on separate pages for each dimension (source, salesperson, zip code, and more) are now combined into three pages, Closed Deals, Sales, and Production, with filters to slice the data however you need.
**Why it matters:** You can explore every angle of a report from one page with filters instead of hopping between a dozen narrow, single-purpose reports.
**Action needed:** None, old report links redirect automatically to the consolidated page.

---

## ⚙️ Settings (1 update)

### Township Addresses No Longer Rejected as Missing a City (Aug 3)
**What changed:** Fixed an issue where addresses in townships (like Shelby Township, MI) were rejected across every address field in DripJobs because the township name wasn't recognized as a city.
**Why it matters:** Anyone entering a job, contact, or company address in a township can now save it without hitting a false error.
**Action needed:** None

---

## 🚀 Upcoming Releases (1 in progress)

### Automatic Google Calendar Sync for DripJobs Events (PR in review)
Once you connect Google Calendar, every future DripJobs event, including appointments, scheduled jobs, and estimates, will sync automatically to the calendar you choose, and any new events you create afterward will keep syncing without any extra steps. Disconnecting will stop new events from syncing while leaving what's already on your Google Calendar untouched.

---

## ✨ Other Exciting Updates Coming Soon (1 planned)

### Auto-Filled Marketing Agency Email Template for Zapier (In QA)
A new tool on the Zapier integration card will let you generate a ready-to-send email for your marketing agency, pre-filled with your API key, company name, and contact details, walking them through exactly how to connect their lead forms into your DripJobs pipeline. You'll be able to edit the message before copying it into your own email client.

---

Questions about anything above? Visit help.dripjobs.com or reach out to your DripJobs support team.
