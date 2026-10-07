# DripJobs Product Release Notes | June 2026 through September 2026

Combined release notes for June, July, August, and September 2026.

---

## DripJobs Product Release Notes | June 2026

**Period:** June 1 – June 30, 2026
**Releases:** 8 deployments
**Improvements:** 30+ updates

---

### 📄 Proposals & Proposal Builder (11 updates)

#### Area Calculations Corrected in Proposals (Jun 25)
**What changed:** Fixed an issue causing incorrect area calculations to display inside certain proposals.
**Why it matters:** Pricing accuracy starts with area accuracy, and this affects the numbers your customer ultimately sees.
**Action needed:** Review any affected proposals sent before June 25 if the totals looked off.

#### Proposal Images Stay Intact After Adding Notes (Jun 25)
**What changed:** Images attached to a proposal no longer disappear or become distorted when notes are added afterward.
**Why it matters:** Photos are often the most persuasive part of a proposal, and they need to stay exactly as you uploaded them.
**Action needed:** None

#### Round Gallons Setting Now Applies Retroactively (Jun 18)
**What changed:** Toggling Round Gallons now updates existing substrates, not just newly added ones.
**Why it matters:** Your settings should apply consistently across a proposal, not just to whatever you add after flipping the switch.
**Action needed:** None

#### Client Notes No Longer Overflow the Notes Window (Jun 18)
**What changed:** Notes added to a proposal now stay contained within the note window instead of spilling outside its boundaries.
**Why it matters:** A note that visually breaks the layout looks unpolished in front of a customer.
**Action needed:** None

#### Fixed Duplicate Toggle Switches in Customize My PDFs (Jun 18)
**What changed:** Closing the Customize My PDFs popup no longer leaves a duplicate set of toggle switches on screen.
**Why it matters:** Duplicate controls make it unclear which toggle is actually live.
**Action needed:** None

#### Mobile Drag and Drop Fixed for Packages (Jun 18)
**What changed:** Reordering areas and items within a package by drag and drop now works correctly on mobile.
**Why it matters:** Building proposals in the field on mobile needs to feel as reliable as it does on desktop.
**Action needed:** None

#### Generate Invoice Restored for Accepted Proposals (Jun 18)
**What changed:** You can once again generate an invoice from an accepted proposal even if its original invoice was deleted.
**Why it matters:** Without this, an accidentally deleted invoice could leave you with no way to bill a job you'd already closed.
**Action needed:** None

#### Rejected Proposals No Longer Get Stuck in the Wrong Status (Jun 8 & 11)
**What changed:** Fixed two related bugs: a rejected proposal could silently revert to "Pending," and a proposal could stay stuck showing "Rejected" after its status was changed.
**Why it matters:** Proposal status drives your pipeline and reporting, and it needs to reflect reality at all times.
**Action needed:** Double check the status on any proposals you rejected or reinstated before these fixes.

#### Coverage Per Gallon Now Validates Zero Values (Jun 11)
**What changed:** Production Rate settings now catch and block zero value entries for coverage per gallon.
**Why it matters:** A zero left in by accident throws off every substrate calculation built on top of it.
**Action needed:** None

#### Full Keyboard Restored for Price Fields on Mobile (Jun 11)
**What changed:** Price fields in the mobile Proposal Builder now bring up your phone's full keyboard again, instead of a limited numeric only view.
**Why it matters:** A numeric only keyboard blocks you from typing things like decimals the way you naturally would.
**Action needed:** None

#### Duplicate Package No Longer Gets Stuck Loading (Jun 1)
**What changed:** Duplicating a package in the Proposal Builder now completes instantly instead of opening to an endless loading spinner.
**Why it matters:** A spinner that never resolves blocks you from building out a proposal, this was a full stop, not a minor annoyance.
**Action needed:** None

---

### 🧰 Work Orders (2 updates)

#### Area Titles Now Display on Work Orders & Proposal PDFs (Jun 25)
**What changed:** Fixed a bug causing area titles to be missing from Work Order and Proposal PDF exports for some accounts.
**Why it matters:** Your crew needs the full scope of the job, including area labels, in the Work Order they take to the field.
**Action needed:** Re-generate Work Orders for any affected jobs to pick up the corrected titles.

#### Share Work Order & Secret Work Order Display Fixed (Jun 18)
**What changed:** Resolved a rendering issue affecting how Share Work Order and Secret Work Order pages displayed.
**Why it matters:** These pages are often shared outside DripJobs, and they need to look right every time.
**Action needed:** None

---

### 💳 Customer Portal & Invoicing (3 updates)

#### Proposal Totals No Longer Overlap on Mobile (Jun 11)
**What changed:** Project Total and Balance at Completion now display cleanly in the mobile Customer Portal, with no overlapping text.
**Why it matters:** More of your customers view proposals on their phone than ever, and this is often their first impression of the job.
**Action needed:** None

#### Paid Invoice View No Longer Cuts Off Customer Info (Jun 11)
**What changed:** Customer details are no longer cut off when a customer views a fully paid invoice.
**Why it matters:** A paid invoice is a record both sides may need to reference later, it should always be complete.
**Action needed:** None

#### Payment Request Buttons Now Properly Centered (Jun 8)
**What changed:** "Send Request" and "Mark as Paid" in the payment request window are now vertically centered.
**Why it matters:** Small alignment issues like this slow you down on an action you take constantly.
**Action needed:** None

---

### 📝 Booking Forms (2 updates)

#### New: Booking Form Embed Code & Send to Developer (Jun 25)
**What changed:** Generate an embed code for any booking form and send it straight to your developer by email, right from the Booking Forms list.
**Why it matters:** If you want a booking form on your own website, this removes the back and forth of manually copying and sending code.
**Action needed:** None, find the option next to any form in your Booking Forms list.

#### Booking Form SMS Link Fixed (Jun 11)
**What changed:** Corrected a missing space in the booking form SMS template link, so the link text now reads correctly.
**Why it matters:** A run together link can look broken or untrustworthy to a customer receiving it by text.
**Action needed:** None

---

### 📱 Pipeline & Mobile (4 updates)

#### Call from Quo Deep Link on Mobile (Jun 25)
**What changed:** Tapping a phone number in the mobile app now deep links directly into the Quo calling app.
**Why it matters:** One tap instead of several means faster callbacks from the field.
**Action needed:** Requires the Quo app to be installed on your device.

#### Deal Card Task Edits Now Save on Mobile (Jun 18)
**What changed:** Fixed an unresponsive Save button when editing a task from a Deal Card on the mobile app.
**Why it matters:** A Save button that doesn't respond means edits silently don't stick, easy to miss until it's too late.
**Action needed:** None

#### Custom Job Stages Can Now Be Deleted (Jun 11)
**What changed:** Fixed an issue that prevented some accounts from deleting custom job stages.
**Why it matters:** Your pipeline should stay as clean as your workflow, stale stages you can't remove just add clutter.
**Action needed:** None

#### Negative Values Blocked on Mobile Line Items (Jun 11)
**What changed:** Duplicated packages and line items no longer accept invalid negative values on iOS and Android.
**Why it matters:** A stray negative value can throw off a proposal total without it being obvious at a glance.
**Action needed:** None

---

### 💬 Messaging & Notifications (5 updates)

#### Text Messaging Now Accepts All Valid Physical Addresses (Jun 11)
**What changed:** Fixed a validation bug that was incorrectly rejecting certain valid physical addresses during text messaging setup.
**Why it matters:** A blocked setup step can stop your texting from working entirely until the address format is "guessed right."
**Action needed:** If your address was previously rejected, try saving it again.

#### Text Messages No Longer Double Send as Email (Jun 9)
**What changed:** Fixed a bug that caused some text messages to send as both a text and an email.
**Why it matters:** Sending the same message twice through two channels can look unprofessional and confuse the customer.
**Action needed:** None

#### Calendar SMS Reminders Now Respect Opt Outs (Jun 9)
**What changed:** The SMS reminder toggle on calendar events now correctly honors a contact's opt out status, and no longer resets the scheduled date when a warning appears.
**Why it matters:** Texting someone who has opted out is both a poor customer experience and a compliance risk.
**Action needed:** None

#### New: Reply To Override for Outbound Communications (Jun 9)
**What changed:** Set a company level reply to address for all outbound emails and messages.
**Why it matters:** Customer replies now land exactly where you want them, instead of wherever the system defaulted to.
**Action needed:** Set your preferred reply to address in Company Settings if you'd like to use this.

#### Chat Compose Box Now Auto Expands on Desktop (Jun 1)
**What changed:** The message compose box in Chat now grows automatically as you type longer messages.
**Why it matters:** A fixed height box hides your own message as you write it, this keeps everything visible.
**Action needed:** None

---

### 🔌 Integrations (1 update)

#### New: Default Salesperson & Project Manager for Zapier/API Leads (Jun 9)
**What changed:** Leads coming in through the API or Zapier can now automatically be assigned a default salesperson and project manager.
**Why it matters:** Leads from automated sources used to need manual assignment, now they route exactly like the rest of your pipeline.
**Action needed:** Set your default assignees in Settings if you want this applied.

---

### 📊 Metrics & Reports (2 updates)

#### New: Clickable Metrics & Report Drill Downs (Jun 22 & 25)
**What changed:** Metrics page cards and report sections are now clickable, with hint banners, hover states, and row level drill down.
**Why it matters:** You can now dig into the numbers behind each metric instead of just seeing the top line total.
**Action needed:** None, try clicking into any metric card to explore.

#### Production Rate Report Accuracy Fixed (Jun 25)
**What changed:** Fixed a bug where the Production Rate Report could include data from packages you didn't select, when those packages shared area names.
**Why it matters:** Production rate accuracy directly affects how you estimate future jobs.
**Action needed:** Re-pull any production rate reports you relied on before June 25 for packages with shared area names.

---

### ⚙️ Settings (1 update)

#### Products & Services Page Refreshed (June 2026)
**What changed:** The Products & Services list and edit views have a cleaner, refreshed look.
**Why it matters:** A clearer layout makes it faster to manage and update your catalog.
**Action needed:** None

---

### 🚀 Upcoming Releases (4 in progress)

#### Expanded Proposal Section Reordering (Code complete)
Position control is being extended to all eligible sections of a proposal, so you'll have full control over how every part of a proposal is ordered, not just a limited set.

#### Enhanced Proposal Rejection Reasons (Code complete)
An expanded dropdown of rejection reasons, plus an "Other" option with free text feedback, so you get clearer insight into why a proposal was declined.

#### QuickBooks Integration Improvements (In QA)
A round of fixes and UX improvements to the QuickBooks integration, addressing sync accuracy and clearing up confusing error states. Currently in QA testing.

#### New Zapier Trigger for Incoming Text Messages (In QA)
A new Zapier trigger that fires when an incoming text message is received, so you can build automations around inbound texts the same way you already can for other events.

---

### ✨ Other Exciting Updates Coming Soon (2 planned)

#### Inline Tax Rate Entry in Proposals & Templates (In dev)
Enter and adjust tax rates directly inline while building a proposal or template, instead of navigating away to a separate settings screen.

#### Bulk Archive for Booking Requests (In dev)
Archive multiple booking requests at once instead of one at a time, making it faster to clear out your queue.

---

Questions about anything above? Visit help.dripjobs.com or reach out to your DripJobs support team.

---

## DripJobs Product Release Notes | July 2026

**Period:** July 1 – July 31, 2026
**Releases:** 5 deployments
**Improvements:** 40+ updates

---

### 📄 Proposals & Proposal Builder (9 updates)

#### New Proposals Now Inherit Your Company Tax Rate (Jul 27)
**What changed:** Fixed an issue where new proposals started with no tax rate applied, even when a company-wide tax rate was configured.
**Why it matters:** Your default tax settings should carry over automatically so you don't have to re-enter them on every proposal.
**Action needed:** Double check the tax rate on any proposals created before July 27 if the totals looked off.

#### Proposal Builder UI Now Used in Proposal Template Builder (Jul 27)
**What changed:** Building and editing proposal templates now uses the same interface as building proposals themselves.
**Why it matters:** A consistent experience between proposals and templates means less relearning when you switch between the two.
**Action needed:** None

#### Tax Rate Row Redesigned in Proposal Builder (Jul 15)
**What changed:** Setting or editing the tax rate on a proposal or template now happens through a focused popup, with a confirmation message showing exactly how the change affected your totals.
**Why it matters:** A dedicated tax rate popup makes it much harder to accidentally change tax while browsing other settings.
**Action needed:** None

#### Drag and Drop Proposal Section Reordering (Jul 15)
**What changed:** Reordering the sections of your Customer Portal proposal layout now works by dragging and dropping instead of clicking through a menu.
**Why it matters:** The new drag and drop interaction is faster and more intuitive than the previous click based reordering.
**Action needed:** None

#### Line Item Cards Restored to White Background (Jul 15)
**What changed:** Fixed an issue where line item cards in the client facing proposal view had lost their white background and blended into the page.
**Why it matters:** Clear visual separation between line items makes proposals easier for your customers to read.
**Action needed:** None

#### Fixed Garbled Character on Change Request Status Badge (Jul 8)
**What changed:** Fixed a display bug that showed a garbled character in the proposal status badge whenever a change request was submitted.
**Why it matters:** A clean status badge keeps your pipeline looking professional and easy to read at a glance.
**Action needed:** None

#### Signed Proposals Now Save a Permanent Copy (Jul 1)
**What changed:** A permanent, point in time copy of a proposal (or Change Order) is now saved at the exact moment it's signed or accepted, so the record can't be affected by later edits or data issues.
**Why it matters:** You now have a reliable, unchanging copy of exactly what your customer agreed to, whenever you need it for legal or accounting purposes.
**Action needed:** None

#### More Control Over Proposal Section Order (Jul 1)
**What changed:** Position control for reordering proposal sections has been expanded to cover more sections, including Client Notes, Trust Builders, Packages, and more.
**Why it matters:** You can tailor the flow of your proposals to match your own sales process.
**Action needed:** None

#### Expanded Proposal Rejection Reasons (Jul 1)
**What changed:** The proposal rejection reason list now includes a broader set of options, plus an "Other" choice with a required explanation field.
**Why it matters:** More specific rejection reasons help you understand patterns in lost deals so you can adjust your pricing or process.
**Action needed:** None

---

### 💳 Customer Portal & Invoicing (3 updates)

#### Archived and Deleted Proposals Hidden From Customer Portal (Jul 27)
**What changed:** Archived or deleted proposals no longer appear in your customer's Proposals list, and a direct link to an archived proposal now shows a closure message instead of the proposal itself.
**Why it matters:** Customers should never be able to act on a proposal you've already closed out.
**Action needed:** None

#### Change Order Line Item Photos Now Display in Customer Portal (Jul 20)
**What changed:** Fixed an issue where photos attached to change order line items weren't showing up when a customer viewed the change order in the Customer Portal.
**Why it matters:** Customers need to see the supporting photos for a change order without hunting through a separate media section.
**Action needed:** None

#### New: Tax Registration Number Field for Invoices (Jul 15)
**What changed:** Company Settings now includes a dedicated field for your tax registration number (such as a GST/HST number), with a toggle to automatically display it on every invoice.
**Why it matters:** If your business is required to show a tax registration number on invoices, you no longer need to manually add it every time.
**Action needed:** Add your tax registration number and turn on the toggle in Company Settings if you'd like it to appear on your invoices.

---

### 🧰 Work Orders (2 updates)

#### New: Hide Hours on Work Orders (Jul 20)
**What changed:** A new toggle lets you hide hour related details from Work Orders without affecting whether hours show on your customer facing proposals.
**Why it matters:** If you pay your crew per job rather than hourly, you can now keep hour estimates off their Work Orders without hiding that information from your customers.
**Action needed:** None, look for the new toggle in Production Rates settings if you'd like to turn it on.

#### Work Orders Now Show Both Labels (Jul 8)
**What changed:** Customer facing views like proposal PDFs now show only the client facing label, while Work Orders show both labels so the information is clear for crews and contractors.
**Why it matters:** Work Orders are often shared with people outside the customer relationship, so they need the fuller label information.
**Action needed:** None

---

### 📝 Booking Forms (1 update)

#### New: Bulk Archive for Booking Requests (Jul 27)
**What changed:** You can now select multiple booking requests at once and archive them together, with the option to also cancel their related deals.
**Why it matters:** Cleaning out your booking request queue no longer means archiving requests one at a time.
**Action needed:** None

---

### 📱 Pipeline & Mobile (6 updates)

#### Scheduled Job Dates Now Visible on Contact Profiles (Jul 15)
**What changed:** A contact's profile now shows their upcoming scheduled jobs, not just sales appointments, right from the Appointments tab.
**Why it matters:** You can answer scheduling questions on a call without digging through deal cards or message history.
**Action needed:** None

#### Clearer Error Screens When the App Has a Problem (Jul 15)
**What changed:** Crash and loading error screens now explain in plain language that something went wrong, along with a simple way to retry or reload.
**Why it matters:** A blank or confusing error screen makes the app feel broken; a clear message and next step keeps you moving.
**Action needed:** None

#### Frozen Customer Name Column in Jobs and Sales Lists (Jul 8)
**What changed:** The customer name column, and everything to its left, now stays fixed in place when you scroll right in the Jobs List or Sales List. The Jobs List "Name" column is also now labeled "Customer Name."
**Why it matters:** You always know which customer a row belongs to, even when scrolling through a wide table.
**Action needed:** None

#### Android: Client Notes Save Button No Longer Hidden (Jul 8)
**What changed:** Fixed an issue on Android where the Save button for Client Notes on a proposal was partially hidden and hard to tap.
**Why it matters:** A save button you can't reliably tap risks losing a note you just wrote.
**Action needed:** None

#### Deal Cards Now Show Proposal Link Even Before Sending (Jul 8)
**What changed:** Fixed an issue where a deal card would show an appointment date instead of a "View Proposal" link when a proposal existed but hadn't been sent yet.
**Why it matters:** Consistent deal card layout means less guessing about what's going on with a deal at a glance.
**Action needed:** None

#### Call With Quo Only Appears When Quo Is Active (Jul 1)
**What changed:** The Call with Quo option, along with a refreshed design, now only appears if you actually have the Quo integration turned on.
**Why it matters:** You won't see a calling option that doesn't apply to your account.
**Action needed:** None

---

### 💬 Messaging & Notifications (4 updates)

#### New: All Company Admins CC'd on Proposal Accepted Notifications (Jul 20)
**What changed:** Every user with the Administrator role on your account is now automatically CC'd when a proposal is accepted, regardless of which salesperson owns the deal.
**Why it matters:** Admins get visibility into new deal activity without depending on a salesperson to forward the news.
**Action needed:** None

#### Search Results in DJ Chat Now Highlight Your Search Term (Jul 8)
**What changed:** Searching across conversations in DJ Chat now highlights the matching word or phrase in the results.
**Why it matters:** You can spot why a result matched and find the relevant text much faster.
**Action needed:** None

#### New: First Name Dynamic Keywords (Jul 8)
**What changed:** Two new dynamic keywords let you insert just a first name, for either the assigned salesperson or the sending user, into drip messages, reminders, and templates.
**Why it matters:** Messages that use a first name instead of a full name read more like a natural, personal note.
**Action needed:** None, look for the new keywords in the keyword picker when composing a message.

#### Drip Opt-Out Status Now Visible Across the App (Jul 1)
**What changed:** A "Drips Opted Out" tag now appears on the Contact Record, Command Center, Deal Card, and Job Card whenever a contact has opted out of drip sequences.
**Why it matters:** You can spot at a glance that automated messages won't go out to a contact, without digging into their record.
**Action needed:** None

---

### 🔌 Integrations (10 updates)

#### Move Job Zapier Action: Drip Sequence No Longer Required (Jul 27)
**What changed:** The Drip Sequence field on the Move Job Zapier action is no longer required. If you leave it blank, a deal's existing drip sequence assignment stays untouched.
**Why it matters:** You can automate moving a job between stages without being forced to also set a drip sequence every time.
**Action needed:** None

#### New Zapier Trigger: Payment Marked as Received (Jul 27)
**What changed:** A new Zapier trigger fires whenever any payment, including partial payments, is registered in DripJobs, with detailed payment, invoice, customer, and deal fields.
**Why it matters:** You can build automations around payments without needing to piece the data together yourself.
**Action needed:** None

#### New Zapier Trigger: Proposal Rejected (Jul 27)
**What changed:** A new Zapier trigger fires whenever a proposal is rejected, including the proposal ID, total, status, and related deal and contact records.
**Why it matters:** You can automate follow up or reporting the moment a proposal is declined.
**Action needed:** None

#### New Zapier Trigger: New Invoice Created (Jul 20)
**What changed:** A new Zapier trigger fires once whenever a new invoice is created, whether generated manually or off an accepted proposal.
**Why it matters:** You can kick off downstream automations the moment an invoice exists, without waiting on payment status.
**Action needed:** None

#### Acorn Financing Now Available on the Pro Plan (Jul 15)
**What changed:** Pro plan accounts can now access and use the Acorn Financing integration, previously limited to the Advanced plan.
**Why it matters:** You can offer financing to your customers without needing to upgrade your plan.
**Action needed:** None

#### Acorn Financing Now Available in Massachusetts (Jul 8)
**What changed:** Acorn Financing is now enabled for Massachusetts based accounts, with a $6,700 minimum financed amount required to submit an application.
**Why it matters:** Massachusetts customers can now offer financing just like accounts in other supported states.
**Action needed:** None

#### New Zapier Trigger: Incoming Text Message Received (Jul 20)
**What changed:** A new Zapier trigger fires whenever a text message is received, including the sender's number, timestamp, message content, and related contact.
**Why it matters:** You can build automations off incoming texts the same way you already can for other events.
**Action needed:** None

#### New Zapier Trigger: Full Job Costing Payload (Jul 1)
**What changed:** A new Zapier trigger sends the complete job costing payload with every available field in one event.
**Why it matters:** You can build automations from the full job costing dataset without reconstructing it from individual fields.
**Action needed:** None

#### New Zapier Action: Move Deal (Jul 1)
**What changed:** A new Zapier action lets you move a deal or job to a new pipeline stage, choose the drip sequence tied to that stage, and optionally pause drips during the move.
**Why it matters:** You can now automate pipeline moves that used to require manually updating a deal.
**Action needed:** None

#### New Zapier Action: Find Most Recent Deal (Jul 1)
**What changed:** A new Zapier action looks up a customer's most recently created deal by matching on email and phone number.
**Why it matters:** You can pull in the latest deal for a customer without building your own lookup logic.
**Action needed:** None

---

### 📊 Metrics & Reports (3 updates)

#### Job Costing Search Now Returns Results (Jul 27)
**What changed:** Fixed an issue where searching for a job by name on the Job Costing page didn't filter the results or show a "no results" message.
**Why it matters:** You can now trust that a job costing search either shows the matching job or tells you clearly that nothing matched.
**Action needed:** None

#### Clickable Drill-Downs in Metric Breakdown Details (Jul 8)
**What changed:** The individual counts inside a Metric Breakdown popup on the dashboard are now clickable, taking you straight to the full detail report, filtered and ready to go.
**Why it matters:** You can dig into the specific numbers behind a metric without manually setting up report filters.
**Action needed:** None, try clicking a count inside any Metric Breakdown popup to explore.

#### Sales by Source Now Reflects Current Lead Source (Jul 1)
**What changed:** Fixed an issue where the Sales by Source chart kept crediting revenue to a contact's original lead source, even after you corrected it.
**Why it matters:** Revenue attribution now stays accurate whenever you update a contact's lead source.
**Action needed:** None

---

### ⚙️ Settings (2 updates)

#### Deactivated Accounts Now Pause Communications and Document Links (Jul 27)
**What changed:** When an account is deactivated, active drip sequences, appointment reminders, and scheduled blasts now pause automatically, and public links to proposals, invoices, and change orders show a "no longer available" message instead of the document.
**Why it matters:** An inactive account should never keep sending messages or exposing customer facing documents.
**Action needed:** None

#### Company Settings Page No Longer Errors (Jul 15)
**What changed:** Fixed an issue causing the Company Settings page to show an error instead of loading normally.
**Why it matters:** You need reliable access to your company settings without hitting a dead end.
**Action needed:** None

---

### 🚀 Upcoming Releases (1 in progress)

#### Column Management for the Jobs List (PR in review)
You'll soon be able to show or hide columns in the Jobs List, drag them into whatever order fits your workflow, and save your own named views, alongside a set of built in presets for common roles like Sales or Accounting. A freeze option keeps the columns you rely on most, like Customer Name, pinned in place while the rest of the table scrolls.

---

### ✨ Other Exciting Updates Coming Soon (3 planned)

#### More QuickBooks Integration Improvements (Ready for dev)
Additional improvements are planned for the QuickBooks integration, including clear visibility when a sync fails, plain language explanations of what went wrong, and the ability to manually retry a failed sync without disconnecting and reconnecting your account.

#### Direct Thumbtack Integration (In progress)
A direct Thumbtack integration is in the works. Once live, new Thumbtack leads will flow straight into DripJobs as contacts and deals, tagged with Thumbtack as the lead source, and dropped automatically into your Sales Pipeline and drip sequences, no manual entry required.

#### Multiple Documents Per Category in Customer Portal Settings (In progress)
We're expanding document management in Customer Portal Settings so each of your document categories, like Insurance, Warranty, and License Information, can hold multiple files instead of just one. You'll also be able to create your own custom categories to share anything else your customers need.

---

Questions about anything above? Visit help.dripjobs.com or reach out to your DripJobs support team.

---

## DripJobs Product Release Notes | August 2026

**Period:** August 1 – August 31, 2026
**Releases:** 7 deployments
**Improvements:** 34+ updates

---

### 📄 Proposals & Proposal Builder (6 updates)

#### Package Line Item Text No Longer Hidden Behind "View Details" Button (Aug 27)
**What changed:** Fixed a layout bug in the customer-facing proposal where the "View Details" button on a package tier could overlap and cover the line item name next to it.
**Why it matters:** Customers reviewing your Good, Better, and Best packages can now read every line item clearly without text getting hidden behind a button.
**Action needed:** None

#### Larger, More Visible Proposal Hero Image Upload Button (Aug 27)
**What changed:** The Upload button for your Proposal Hero Image in Portal Visual Identity settings is now bigger and easier to spot.
**Why it matters:** Setting up your proposal branding is quicker when the upload control is easy to find instead of easy to miss.
**Action needed:** None

#### Accepted Package Total Now Matches What the Customer Approved (Aug 20)
**What changed:** Fixed an issue where, after a customer accepted one package from a multi-package proposal, the total shown under Contact Information still included the other, unselected packages.
**Why it matters:** The deal total you see should always reflect what the customer actually agreed to, not every option they were shown.
**Action needed:** None

#### "View Details" Button Replaces Info Icon on Package Line Items (Aug 20)
**What changed:** Package line items in the customer-facing proposal now show a clear "View details" button instead of a small (i) icon that only revealed more information on hover.
**Why it matters:** A visible, tappable button makes it obvious to customers, especially on mobile, that more detail is available for a line item.
**Action needed:** None

#### Cleaner Section List Layout on Mobile Proposal Builder (Aug 10)
**What changed:** Fixed a display bug where section titles and descriptions in the Proposal Builder's section order list (Hero Image, Trust Builders, Client Notes, and similar) wrapped one word per line on mobile screens.
**Why it matters:** The section list is now easy to read on a phone instead of breaking into a jumbled column of single words.
**Action needed:** None

#### Percentage-Based Payments Now Calculate Correctly with Optional Content (Aug 3)
**What changed:** Fixed an issue in proposal templates where a percentage-based payment amount didn't match the proposal total whenever optional areas, optional items, or packages were included.
**Why it matters:** Your deposit and payment amounts now line up with the total your customer actually sees, no matter what optional content is on the proposal.
**Action needed:** None

---

### 💳 Customer Portal & Invoicing (7 updates)

#### Multiple Documents Per Category in Customer Portal Settings (Aug 10)
**What changed:** Each document category in Customer Portal Settings, including Insurance, Warranty, Workers' Comp, License Information, W-9 Information, and Misc Documents, now accepts up to 5 files instead of just one. You can also create your own custom document categories with their own title, icon, and color, and reorder them however you like.
**Why it matters:** You can now share every license, certificate, and document your customers need without merging files together to fit them into a single upload slot.
**Action needed:** None, look for the updated document management area in Company Settings > Customer Portal.

#### Broken Proposal Attachments No Longer Crash the Customer Portal (Aug 13)
**What changed:** Fixed an issue where a proposal with a missing or corrupted attachment image would fail to load entirely in the Customer Portal instead of just skipping that one image.
**Why it matters:** A single bad attachment should never keep your customer from being able to open and review the rest of a proposal.
**Action needed:** None

#### Successful Stripe Card Payments Now Reliably Recorded on Invoices (Aug 13)
**What changed:** Fixed an issue where a successfully processed Stripe card payment could occasionally fail to show up on the invoice's payment history, making it look like the customer hadn't paid.
**Why it matters:** Your team and your customers can now trust that a completed payment always appears where it should, without needing a manual check.
**Action needed:** None

#### Approved Change Orders No Longer Show a "Not Included" Warning (Aug 13)
**What changed:** Fixed a bug where an approved Change Order that was correctly reflected in the invoice total could still display a "Not included" banner on the customer-facing invoice view.
**Why it matters:** Customers should see one consistent story about what's included in their invoice, not a warning that contradicts the total they're being charged.
**Action needed:** None

#### Configurable Default for "Pay with Other" on Invoices (Aug 13)
**What changed:** The "Pay with Other" payment option on customer invoices no longer automatically defaults to Check with no way to change it.
**Why it matters:** If your business doesn't accept checks, your customers won't be steered toward a payment method you can't process.
**Action needed:** None, check your invoice payment settings if you'd like to adjust or remove Check as a default option.

#### Deposit Amounts Below Stripe's Minimum Are Now Caught Before Sending (Aug 13)
**What changed:** If a proposal's deposit calculates to less than $1.00, you'll now see a warning before you can send it, and if an older proposal like this reaches a customer, they'll see a clear message directing them to contact you instead of a generic error.
**Why it matters:** Your customers get a working payment experience instead of a confusing error message when a deposit amount is too small for card processing.
**Action needed:** None

#### "First Name" Keyword Now Resolves Correctly in Invoice Payment Instructions (Aug 10)
**What changed:** Fixed an issue where the "First name" keyword worked correctly in proposal payment instructions but showed up as literal text instead of the customer's name in invoice payment instructions.
**Why it matters:** Your invoice messaging now reads as personally as your proposal messaging does.
**Action needed:** None

---

### 🧰 Work Orders (1 update)

#### Area Substrate Crew Notes Now Appear on Work Order PDFs (Aug 10)
**What changed:** Fixed an issue where crew notes added to area substrates weren't showing up on the downloaded Work Order PDF.
**Why it matters:** Your crew gets the notes they need on the paperwork they actually use in the field.
**Action needed:** None

---

### 📝 Booking Forms (1 update)

#### Booking Form Now Returns You to Where You Left Off After Picking a Date (Aug 27)
**What changed:** Fixed an issue where selecting a Preferred or Alternate Date on the Booking Form would leave the customer somewhere else on the page instead of back at the field they were filling out.
**Why it matters:** Customers filling out a Booking Form on their phone no longer have to hunt for their place after picking a date.
**Action needed:** None

---

### 📱 Pipeline & Mobile (6 updates)

#### New: Holiday Calendar Display for Appointments and Job Schedule (Aug 27)
**What changed:** You can now choose to display US holidays, Canadian holidays, or both directly on your Appointments and Job Schedule calendars, so scheduled days off show up automatically without blocking you from booking on them if you need to.
**Why it matters:** You can spot a holiday at a glance instead of accidentally scheduling a job on a day your team doesn't work.
**Action needed:** None, set your Holiday Calendar preference if you'd like holidays to show up on your calendars.

#### New: Job Address Column on the Jobs List (Aug 27)
**What changed:** The Jobs List now includes a Job Address column, sourced from the job's accepted proposal, and it exports as separate Street, City, State, and Zip columns.
**Why it matters:** You can see and export a job's full service address without leaving the Jobs List or manually splitting it into pieces.
**Action needed:** None

#### New: Multiple Phone Numbers, Emails, and Addresses on Contact Records (Aug 26)
**What changed:** A Contact record can now hold more than one phone number, email address, and physical address, with one of each marked as Primary. The Primary values are what's used across proposals, invoices, and outbound communications by default.
**Why it matters:** You can keep a complete profile for every contact and still be confident the right phone number or email is the one your team and DripJobs use automatically.
**Action needed:** None

#### New: Column Management for the Jobs List and Sales List (Aug 13)
**What changed:** You can now show or hide columns, drag them into any order, and save your own named views on both the Jobs List and Sales List, alongside built-in presets for common roles. A freeze option keeps the columns you rely on most, like Customer Name, pinned in place while the rest of the table scrolls.
**Why it matters:** You can build a view of your Jobs and Sales Lists that matches how you actually work, instead of scrolling past columns you never use.
**Action needed:** None, look for the new column management control on the Jobs List and Sales List.

#### Change Orders List Fixed in the Mobile App (Aug 13)
**What changed:** Fixed the Change Orders list in the mobile app so the "View" dropdown appears on each row and tapping a Change Order ID opens its detail view, matching how Jobs and Proposals already work.
**Why it matters:** You can review and act on a change order from your phone the same way you can on desktop.
**Action needed:** None

#### Appointments Calendar "New Requests" Count Now Matches Pending Requests (Aug 3)
**What changed:** Fixed a bug where the "new requests" badge on the Appointments calendar could show a higher number than the pending requests actually visible in the list.
**Why it matters:** The badge count is now something you can trust instead of second-guessing whether a request is missing.
**Action needed:** None

---

### 💬 Messaging & Notifications (6 updates)

#### Fixed: Drips No Longer Send After Being Disabled (Aug 27)
**What changed:** Fixed an issue where a drip message could still go out on a deal after Drips had been disabled for that deal, most noticeably in the Project Completed stage.
**Why it matters:** Turning off drips for a deal now reliably stops every future message for that deal, so customers won't hear from you after you've told the system to stop.
**Action needed:** None

#### Blast Performance Tab Now Reflects Email Opens (Aug 27)
**What changed:** Fixed an issue where the Blast Performance tab could show zero opens for a campaign even though individual contacts' Activity tabs correctly showed the email had been opened.
**Why it matters:** Your Blast performance numbers now match what's actually happening with your recipients.
**Action needed:** None

#### New: Customer Portal Email Preferences Page Redesign (Aug 20)
**What changed:** The Customer Portal's email settings page now leads with "Unsubscribe from all emails" and gives it a distinct warning style, followed by job-related and marketing email options, each of which can be expanded to show exactly what it blocks and what still sends.
**Why it matters:** Your customers can see at a glance which option has the biggest impact on their emails, so they don't accidentally opt out of everything by mistake.
**Action needed:** None

#### Cleaned Up Salesperson Keyword in Templates and Keyword Picker (Aug 13)
**What changed:** The older {assigned-user} keyword has been removed from the keyword picker and replaced with {salesperson-name} everywhere it appeared in default templates, since both resolved to the same value.
**Why it matters:** There's now one clear keyword for inserting a salesperson's name into a message, instead of two overlapping options that did the same thing.
**Action needed:** None

#### New: Send Test Email for Drips (Aug 13)
**What changed:** You can now send yourself a test copy of a drip email straight from the editor before it goes live, with every keyword filled in with sample data and the subject line clearly marked as a test.
**Why it matters:** You can check that a drip email looks and reads the way you want before it ever reaches a real customer.
**Action needed:** None, look for the new "Send Test Email" option when editing a drip email.

#### Manually Sent Inbox Replies Now Appear in Activity (Aug 10)
**What changed:** Fixed an issue where a reply you typed and sent manually from the Inbox wouldn't show up in that contact's Activity feed, even though it was delivered successfully.
**Why it matters:** Activity now shows a complete picture of every email sent to a contact, no matter how it was sent.
**Action needed:** None

---

### 🔌 Integrations (2 updates)

#### Job Costing Complete Zapier Trigger Now Fires Automatically (Aug 26)
**What changed:** Fixed an issue where the Job Costing Complete Zapier trigger worked when run manually but didn't fire on its own once a job costing record was actually completed.
**Why it matters:** Automations built on this trigger now run the moment job costing wraps up, without you needing to trigger them by hand.
**Action needed:** None

#### QuickBooks Integration Reliability Improvements (Aug 17)
**What changed:** When a record fails to sync to QuickBooks, you'll now see a clear failure indicator directly on that record along with a plain-language explanation of what went wrong, and you can manually retry the sync without disconnecting and reconnecting your account. The QuickBooks panel in Company Settings also now clearly shows whether your connection is active, expired, or disconnected.
**Why it matters:** You can see and fix a sync problem yourself instead of discovering later that records silently failed to make it into QuickBooks.
**Action needed:** None

---

### 📊 Metrics & Reports (4 updates)

#### New: DripSense, AI-Generated Metrics Insights (Aug 27)
**What changed:** A new DripSense panel on the Metrics Dashboard generates a plain-English summary of what changed in your numbers, compared to the equivalent prior period, whenever you click "Run Insights."
**Why it matters:** You get a quick read on what moved and, where the data supports it, why, without manually comparing charts and ratios yourself.
**Action needed:** None, click "Run Insights" on your Metrics Dashboard to try it.

#### Email and Phone Columns Added to Metrics Reports (Aug 20)
**What changed:** The Leads, Closed Deals, Sales, Production, and Total Proposal Sent reports now show each contact's primary email and phone number, both on screen and in CSV exports, matching what's already shown on the Sales List and Jobs List.
**Why it matters:** You can reach out to a contact directly from a metrics report without switching over to look up their details elsewhere.
**Action needed:** None

#### Pre-Tax Invoice Revenue Now Consistent Between Job Costing and Proposal Details (Aug 3)
**What changed:** Fixed an issue where, with Pre-tax invoice enabled, the Job Costing view correctly showed the pre-tax subtotal but the proposal detail view still showed the full total.
**Why it matters:** Your revenue numbers now match wherever you look, instead of two screens telling two different stories.
**Action needed:** None

#### Reports Consolidated into Closed Deals, Sales, and Production Pages (Aug 3)
**What changed:** Closing ratio, sales, and production reports that used to live on separate pages for each dimension (source, salesperson, zip code, and more) are now combined into three pages, Closed Deals, Sales, and Production, with filters to slice the data however you need.
**Why it matters:** You can explore every angle of a report from one page with filters instead of hopping between a dozen narrow, single-purpose reports.
**Action needed:** None, old report links redirect automatically to the consolidated page.

---

### ⚙️ Settings (1 update)

#### Township Addresses No Longer Rejected as Missing a City (Aug 3)
**What changed:** Fixed an issue where addresses in townships (like Shelby Township, MI) were rejected across every address field in DripJobs because the township name wasn't recognized as a city.
**Why it matters:** Anyone entering a job, contact, or company address in a township can now save it without hitting a false error.
**Action needed:** None

---

### 🚀 Upcoming Releases (2 in progress)

#### Automatic Google Calendar Sync for DripJobs Events (PR in review)
Once you connect Google Calendar, every future DripJobs event, including appointments, scheduled jobs, and estimates, will sync automatically to the calendar you choose, and any new events you create afterward will keep syncing without any extra steps. Disconnecting will stop new events from syncing while leaving what's already on your Google Calendar untouched.

#### Link More Than One Google Calendar (In QA)
You'll soon be able to link more than one Google Calendar to DripJobs instead of just one. Every linked calendar's events show up in DripJobs for reference, and you'll choose exactly which linked calendar DripJobs writes new appointments and jobs to, with the option to change that at any time.

---

### ✨ Other Exciting Updates Coming Soon (3 planned)

#### Auto-Filled Marketing Agency Email Template for Zapier (In QA)
A new tool on the Zapier integration card will let you generate a ready-to-send email for your marketing agency, pre-filled with your API key, company name, and contact details, walking them through exactly how to connect their lead forms into your DripJobs pipeline. You'll be able to edit the message before copying it into your own email client.

#### Direct Thumbtack Integration (In progress)
A direct Thumbtack integration is in the works. Once live, new Thumbtack leads will flow straight into DripJobs as contacts and deals, tagged with Thumbtack as the lead source, and dropped automatically into your Sales Pipeline and drip sequences, no manual entry required.

#### Invoice Reminders (Planned)
Automatic, configurable reminders for outstanding invoices are on the way, sent by email or text before the due date, on the due date, or after, on a schedule you control. The Invoices page is also getting summary stats, more filters, a reminder status for every invoice, and bulk actions like Send Reminder, Mark as Paid, and Export.

---

Questions about anything above? Visit help.dripjobs.com or reach out to your DripJobs support team.

---

## DripJobs Product Release Notes | September 2026

**Period:** September 1 – September 30, 2026
**Releases:** 7 deployments
**Improvements:** 27 updates

---

### 📄 Proposals & Proposal Builder (2 updates)

#### Downloaded Proposals Now Include Images and Attachments (Sep 8)
**What changed:** Fixed an issue where a downloaded proposal with "Include images" set to Yes could leave out line item images and the files in the attachments section. Both now come through in the download, whether you download from the internal view or the customer view.
**Why it matters:** Customers get the complete proposal, with your photos and attachments, in the file you send them.
**Action needed:** None

#### Job Report Margin and Profit Now Include Material Cost (Sep 3)
**What changed:** The Job Report summary on a proposal now includes material cost in Total Price, Total Cost, Profit, and Margin. Previously these figures reflected labor only. The Product Report and the per-substrate rows are unchanged.
**Why it matters:** The profit and margin you see on a proposal now reflect the whole job, not just the labor side of it.
**Action needed:** None, expect margin figures on existing proposals to read lower than before because material cost is now counted.

---

### 💳 Customer Portal & Invoicing (2 updates)

#### Financed Payments No Longer Wrongly Flagged as "Not Funded" (Sep 30)
**What changed:** Fixed an issue where a payment request for a financed payment could show a false "financing has not yet been funded" warning even when the financing was already marked Funded on the invoice and in the proposal. Funded status is now recognized consistently across the proposal, invoice, and payment request, and the warning still appears when financing is genuinely unfunded.
**Why it matters:** You can collect financed payments without being blocked by an incorrect error.
**Action needed:** None

#### Voided Invoices Now Clearly Show as Voided in the Customer Portal (Sep 17)
**What changed:** Voided invoices in the Customer Portal no longer present their balance due as payable and no longer show the "Pay with Other" button. The banner is also styled differently from an active invoice so the status is obvious.
**Why it matters:** Customers won't try to pay an invoice you already voided, which avoids payment mix-ups.
**Action needed:** None

---

### 📝 Booking Forms (1 update)

#### Customer Email Now Shown on Booking Requests and Appointment Details (Sep 30)
**What changed:** The customer's email address now appears in the Customer Request section of the View Request modal on the Requests tab, and in the Contact Info section of the Appointment Details modal. It shows whenever the email was submitted on the booking form or is on the contact record, and stays visible after a request is accepted and scheduled.
**Why it matters:** You can email a customer straight from the request or appointment without opening their contact record first.
**Action needed:** None

---

### 📱 Pipeline & Mobile (8 updates)

#### New: Company-Wide Holiday Region with a Per-Calendar Hide Holidays Toggle (Sep 30)
**What changed:** Holiday Region (None, United States, Canada, or both) is now a company-wide setting in Company Settings, along with a company default for whether holidays are shown. Each user can hide or show holidays separately on the Appointments calendar and the Job Schedule calendar. New companies start with a region based on their currency, and existing companies were set the same way with holidays shown. If an admin later changes the region or the default, everyone's toggles reset to the new default.
**Why it matters:** Your whole team sees the right holidays without each person having to set up their own region.
**Action needed:** None, Company Admins can review the Holiday Region and default visibility in Company Settings.

#### Deal Stage and Status Are Now Read-Only in Edit Deal and Job Details (Sep 28)
**What changed:** The Stage and Status fields in the Edit Deal and Edit Job Details window are now read-only, labeled Deal Stage and Deal/Proposal Status (Job Stage and Job Status on jobs), with short helper text explaining they are set automatically. Changes made in those dropdowns never saved, so the controls were removed. When a deal is moved off Proposal(s) Rejected, its status now updates to match the new stage instead of staying on Rejected.
**Why it matters:** The fields now show you what is really on the deal instead of looking editable when they weren't, and a moved deal no longer keeps a stale Rejected status.
**Action needed:** None, move a deal to a new stage by dragging it on the pipeline board as you do today.

#### Job Schedule Event Labels Now Readable on Every Calendar Color (Sep 28)
**What changed:** Event label text on the Job Schedule calendar now adjusts to stay readable on every calendar color, for example dark text on light colors like yellow, in all views.
**Why it matters:** Your crew can read job names at a glance, including on a phone in the field.
**Action needed:** None

#### Appointments Not Linked to a Deal Can Now Be Deleted (Sep 28)
**What changed:** Fixed an issue where an appointment that was no longer tied to a deal, for example because the deal was deleted first, could not be deleted. You now get a confirmation prompt and the appointment is removed from the calendar, customer, and list views. Other contacts, deals, and jobs are not affected.
**Why it matters:** You can clean up leftover appointments instead of being stuck with orphaned ones on your calendar.
**Action needed:** None

#### Custom Pipeline Stages Can Be Deleted Once They Are Empty (Sep 17)
**What changed:** Fixed an issue where a custom Sales Pipeline stage could not be deleted because old, stale deal links made the system think deals were still on it. The delete check, and the error message and downloadable list shown when deletion is blocked, now include only deals that are currently on the stage. Deal history and reporting are preserved.
**Why it matters:** You can tidy up your pipeline without being blocked by deals that are no longer there.
**Action needed:** None, if a custom stage was previously undeletable, try deleting it again.

#### Duplicate Checks and Search Now Cover Secondary Emails and Phones (Sep 17)
**What changed:** Duplicate email and phone checks now include a contact's secondary emails and phone numbers, both when creating and editing, and promoting a secondary value to Primary no longer bypasses the check. Contacts list search and global search also find contacts by any secondary email or phone. A new address entered on a new lead, proposal, or on-site estimate for an existing contact is now saved to that contact without creating duplicates, and a stray question-mark hover indicator in Stores was removed.
**Why it matters:** Contact records stay cleaner, are easier to find, and reuse addresses automatically.
**Action needed:** None, existing duplicates may now block a save until they are corrected.

#### Command Center Tabs No Longer Cut Off (Sep 8)
**What changed:** Fixed an issue where the Tasks tab in the Command Center could be clipped when Jobi AI and QUO are both enabled. When tabs run out of room, there is now a clickable way to reach them instead of relying on horizontal scrolling.
**Why it matters:** Every Command Center tab is reachable with a mouse, not just with a trackpad swipe.
**Action needed:** None

#### Streamlined Archive and Delete for Contacts (Sep 3)
**What changed:** After you archive a contact you now stay on that contact's record, and a separate prompt asks whether you also want to delete the customer. Archiving a contact with deals, proposals, or invoices warns that they will be archived too, and deleting a contact with dependent records warns that the deletion is permanent and removes its deals, proposals, and invoices.
**Why it matters:** Archiving and then deleting a contact takes fewer steps and has clearer safeguards before anything is removed.
**Action needed:** None

---

### 💬 Messaging & Notifications (2 updates)

#### New: AI-Assisted Drip Message Writing (Sep 28)
**What changed:** A "Generate with AI" button in the drip step editor, for email and text steps in both the Sales and Jobs pipelines, now writes a message for that step. You set the timing, describe what you want to say, and pick a tone and message type, and it fills in the message body for you to edit. Nothing goes out until you save, and the subject line and send delay stay yours to set.
**Why it matters:** You can start from a well-written draft instead of a blank field, with fewer typos and less time spent writing every follow-up.
**Action needed:** None, look for the Generate with AI button when editing a drip step.

#### Support Panel No Longer Covers the Command Center Chat Message Box (Sep 3)
**What changed:** Improved the Command Center chat layout so the DripJobs Support panel no longer sits over the message compose box, which could block typing on a tablet.
**Why it matters:** You can type and send customer replies from a tablet without the panel getting in the way.
**Action needed:** None

---

### 🔌 Integrations (7 updates)

#### Routemize Appointments Now Switch the Deal to the Right Drip (Sep 28)
**What changed:** Fixed an issue where, when Routemize scheduled an appointment and moved a deal from Estimate Requested to Estimate Scheduled, the deal could stay on the Estimate Requested drip. The deal now switches to the drip set for Estimate Scheduled, with no duplicate deals or duplicate sends, and messages already sent stay in the deal history.
**Why it matters:** Customers who book through Routemize get the right follow-up messages instead of stale "request received" ones.
**Action needed:** None, confirm your Estimate Scheduled drip is set up the way you want.

#### New: Link More Than One Google Calendar (Sep 21)
**What changed:** You can now link more than one Google Calendar to DripJobs. Events from every linked calendar show in DripJobs for reference only and do not affect scheduling availability, and you choose exactly one linked calendar as the one DripJobs writes new events to. You can change that choice at any time for future events, and unlinking the current write-to calendar asks you to pick a new one first. Each linked calendar's events show in its own color and name.
**Why it matters:** You can see everything on your schedule while keeping DripJobs events organized on a single calendar.
**Action needed:** None, link your calendars from the Google Calendar connection screen.

#### New: Send Marketing Agency Info from the Zapier Card (Sep 8)
**What changed:** The Zapier card in Company Settings > Integrations now has a "Send Marketing Agency Info" button. It opens an editable email template for your marketing agency, pre-filled with your Zapier API key, your name, company name, and phone, with a Copy button for the subject and body. Nothing is sent from DripJobs, and the button is disabled until a Zapier API key exists.
**Why it matters:** You can hand your agency exactly what it needs to send leads into your pipeline in one copy and paste.
**Action needed:** None, generate a Zapier API key first if you haven't, and fill in your agency contact's name before copying.

#### Zapier "New Payment Received" Trigger Now Covers Stripe Payments (Sep 8)
**What changed:** The Zapier "New Payment Received" trigger now also fires for Stripe payments made at proposal acceptance, including deposits, and for recurring invoice payments, alongside the manual payments it already supported.
**Why it matters:** You can automate follow-ups the moment a customer pays by Stripe.
**Action needed:** None

#### Routemize Appointments Now Respect Your Communication Setting (Sep 8)
**What changed:** Fixed an issue where appointments created through Routemize still sent a confirmation even when On-Site Estimate Communication was turned off. Routemize appointments now follow that setting, and scheduling through Calendly, Zapier, or manually works as before.
**Why it matters:** Customers no longer get appointment confirmations you turned off.
**Action needed:** None, check On-Site Estimate Communication under Company Settings > App Settings > Estimate Settings if you want to adjust it.

#### Google Calendar Sync Now Only Adds Appointments Assigned to You (Sep 8)
**What changed:** Appointments now sync only to the Google Calendar of the user they are assigned to, so admins who can see other users' appointments in DripJobs no longer get copies on their own Google Calendar. This covers new, reassigned, updated, and canceled appointments.
**Why it matters:** Your Google Calendar shows your own appointments instead of duplicates of everyone else's.
**Action needed:** None, admins may want to delete leftover duplicate events created before this fix.

#### Future DripJobs Events Now Sync to Your Connected Google Calendar (Sep 3)
**What changed:** When you connect Google Calendar and choose a calendar, every future DripJobs event, including appointments, scheduled jobs, and estimates, is now created on it, and new events you create afterward keep syncing. Disconnecting or changing the calendar stops syncing to the old one.
**Why it matters:** Your upcoming schedule shows up in Google Calendar without re-entering anything.
**Action needed:** None, reconnect or confirm your calendar selection if events seem to be missing.

---

### ⚙️ Settings (5 updates)

#### New: Address Line 2 Across Company Settings, Jobs, Appointments, and Documents (Sep 30)
**What changed:** Company Settings > Company Information now has an optional Address Line 2 for both the physical and billing address, and New Proposal, New On-Site Estimate, other appointment types, New Lead, and the public Booking Form each have an optional Address Line 2 for the job or appointment address. Where present it now appears in the Command Center contact card, appointment modals, PDF documents, the {job-location} and {appointment-location} keywords, and Zapier. Choosing an existing contact also fills in their Primary Address automatically, and editing an on-file address saves it as a new address instead of overwriting the original.
**Why it matters:** Suite, unit, and floor details no longer get lost depending on which screen or document you are looking at.
**Action needed:** None

#### Refreshed User Profile Page (Sep 21)
**What changed:** The user profile page has been updated to match the current DripJobs design, and the password line now reads "Password last updated on: [date] (click to edit)".
**Why it matters:** The profile page is cleaner and the password label is clearer.
**Action needed:** None

#### Production Rates Demo Button Opens the Current Booking Page (Sep 17)
**What changed:** The "Schedule demo" button in the Production Rates section now opens the current Production Rates Overview booking page instead of an outdated link.
**Why it matters:** If you want a Production Rates walkthrough, you land on the right page to book it.
**Action needed:** None

#### Company Logo Upload Now Shows Accepted File Formats Up Front (Sep 8)
**What changed:** The Company Logo upload on the Brand settings page now shows "Accepted formats: JPG, JPEG, PNG, GIF, BMP, ICO, SVG" before you choose a file.
**Why it matters:** You know which logo files will work before you try to upload one.
**Action needed:** None

#### Settings Tab Bar Can Now Be Dragged or Scrolled to Reach Hidden Tabs (Sep 8)
**What changed:** The Company Settings tab bar can now be dragged or scrolled with a mouse or trackpad to reveal hidden tabs. On narrow windows, including Mac Safari, the scroll control stays visible and the Add-Ons tab no longer flickers in and out.
**Why it matters:** You can reach every settings tab, including Add-Ons, on smaller screens and laptops.
**Action needed:** None

---

### 🚀 Upcoming Releases (4 in progress)

#### Business Entity Records (In QA)
Commercial accounts will be able to track a Business as its own record, with several Contacts associated to it and one marked Primary. A new Businesses item in the Sales menu leads to a tabbed Business profile that brings together its deals, proposals, change orders, appointments, invoices, and payments in one place, and Business can be chosen when creating a lead, appointment, proposal, or invoice.

#### Google Calendar Icon and My Profile Connection (In QA)
The Google Calendar widget on Appointments and Job Schedule is becoming a compact icon that takes every user to a Google Calendar section at the top of My Profile. From there you can connect, choose whether to sync appointments and jobs, and disconnect, all in one place.

#### Per-Package Discounts (In QA)
Every package on a proposal will get its own discount action, flat or percentage, calculated against that package's subtotal and added as a discount line inside the package. Each package's discount stays independent of the others.

#### Event Banner Settings Moving to the Calendar Tab (PR in review)
The "Add crew name to event banner" and "Add job total to event banner" toggles are moving from Estimate Settings to Company Settings > Calendar, keeping every company's current choice. New accounts will also have the job total shown on event banners by default.

---

### ✨ Other Exciting Updates Coming Soon (3 planned)

#### Customer Portal Document Language (Planned)
Admins will be able to set a default viewing language for the proposals, invoices, and change orders customers open in the Customer Portal, adjust it on an individual proposal or invoice, and let customers pick their own language from a selector in the portal header. Translation applies to the portal pages you see on screen, and downloaded PDFs stay in the original language.

#### Direct Thumbtack Integration (In progress)
A direct Thumbtack integration is in the works. Once live, new Thumbtack leads will flow straight into DripJobs as contacts and deals, tagged with Thumbtack as the lead source, and dropped automatically into your Sales Pipeline and drip sequences, no manual entry required.

#### Invoice Reminders (Planned)
Automatic, configurable reminders for outstanding invoices are on the way, sent by email or text before the due date, on the due date, or after, on a schedule you control. The Invoices page is also getting summary stats, more filters, a reminder status for every invoice, and bulk actions like Send Reminder, Mark as Paid, and Export.

---

Questions about anything above? Visit help.dripjobs.com or reach out to your DripJobs support team.

