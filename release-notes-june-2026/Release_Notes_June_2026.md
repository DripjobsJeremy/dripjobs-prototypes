# DripJobs Product Release Notes | June 2026

**Period:** June 1 – June 30, 2026
**Releases:** 8 deployments
**Improvements:** 30+ updates

---

## 📄 Proposals & Proposal Builder (11 updates)

### Area Calculations Corrected in Proposals — Jun 25
**What changed:** Fixed an issue causing incorrect area calculations to display inside certain proposals.
**Why it matters:** Pricing accuracy starts with area accuracy, and this affects the numbers your customer ultimately sees.
**Action needed:** Review any affected proposals sent before June 25 if the totals looked off.

### Proposal Images Stay Intact After Adding Notes — Jun 25
**What changed:** Images attached to a proposal no longer disappear or become distorted when notes are added afterward.
**Why it matters:** Photos are often the most persuasive part of a proposal, and they need to stay exactly as you uploaded them.
**Action needed:** None

### Round Gallons Setting Now Applies Retroactively — Jun 18
**What changed:** Toggling Round Gallons now updates existing substrates, not just newly added ones.
**Why it matters:** Your settings should apply consistently across a proposal, not just to whatever you add after flipping the switch.
**Action needed:** None

### Client Notes No Longer Overflow the Notes Window — Jun 18
**What changed:** Notes added to a proposal now stay contained within the note window instead of spilling outside its boundaries.
**Why it matters:** A note that visually breaks the layout looks unpolished in front of a customer.
**Action needed:** None

### Fixed Duplicate Toggle Switches in Customize My PDFs — Jun 18
**What changed:** Closing the Customize My PDFs popup no longer leaves a duplicate set of toggle switches on screen.
**Why it matters:** Duplicate controls make it unclear which toggle is actually live.
**Action needed:** None

### Mobile Drag and Drop Fixed for Packages — Jun 18
**What changed:** Reordering areas and items within a package by drag and drop now works correctly on mobile.
**Why it matters:** Building proposals in the field on mobile needs to feel as reliable as it does on desktop.
**Action needed:** None

### Generate Invoice Restored for Accepted Proposals — Jun 18
**What changed:** You can once again generate an invoice from an accepted proposal even if its original invoice was deleted.
**Why it matters:** Without this, an accidentally deleted invoice could leave you with no way to bill a job you'd already closed.
**Action needed:** None

### Rejected Proposals No Longer Get Stuck in the Wrong Status — Jun 8 & 11
**What changed:** Fixed two related bugs: a rejected proposal could silently revert to "Pending," and a proposal could stay stuck showing "Rejected" after its status was changed.
**Why it matters:** Proposal status drives your pipeline and reporting, and it needs to reflect reality at all times.
**Action needed:** Double check the status on any proposals you rejected or reinstated before these fixes.

### Coverage Per Gallon Now Validates Zero Values — Jun 11
**What changed:** Production Rate settings now catch and block zero value entries for coverage per gallon.
**Why it matters:** A zero left in by accident throws off every substrate calculation built on top of it.
**Action needed:** None

### Full Keyboard Restored for Price Fields on Mobile — Jun 11
**What changed:** Price fields in the mobile Proposal Builder now bring up your phone's full keyboard again, instead of a limited numeric only view.
**Why it matters:** A numeric only keyboard blocks you from typing things like decimals the way you naturally would.
**Action needed:** None

### Duplicate Package No Longer Gets Stuck Loading — Jun 1
**What changed:** Duplicating a package in the Proposal Builder now completes instantly instead of opening to an endless loading spinner.
**Why it matters:** A spinner that never resolves blocks you from building out a proposal, this was a full stop, not a minor annoyance.
**Action needed:** None

---

## 🧰 Work Orders (2 updates)

### Area Titles Now Display on Work Orders & Proposal PDFs — Jun 25
**What changed:** Fixed a bug causing area titles to be missing from Work Order and Proposal PDF exports for some accounts.
**Why it matters:** Your crew needs the full scope of the job, including area labels, in the Work Order they take to the field.
**Action needed:** Re-generate Work Orders for any affected jobs to pick up the corrected titles.

### Share Work Order & Secret Work Order Display Fixed — Jun 18
**What changed:** Resolved a rendering issue affecting how Share Work Order and Secret Work Order pages displayed.
**Why it matters:** These pages are often shared outside DripJobs, and they need to look right every time.
**Action needed:** None

---

## 💳 Customer Portal & Invoicing (3 updates)

### Proposal Totals No Longer Overlap on Mobile — Jun 11
**What changed:** Project Total and Balance at Completion now display cleanly in the mobile Customer Portal, with no overlapping text.
**Why it matters:** More of your customers view proposals on their phone than ever, and this is often their first impression of the job.
**Action needed:** None

### Paid Invoice View No Longer Cuts Off Customer Info — Jun 11
**What changed:** Customer details are no longer cut off when a customer views a fully paid invoice.
**Why it matters:** A paid invoice is a record both sides may need to reference later, it should always be complete.
**Action needed:** None

### Payment Request Buttons Now Properly Centered — Jun 8
**What changed:** "Send Request" and "Mark as Paid" in the payment request window are now vertically centered.
**Why it matters:** Small alignment issues like this slow you down on an action you take constantly.
**Action needed:** None

---

## 📝 Booking Forms (2 updates)

### New: Booking Form Embed Code & Send to Developer — Jun 25
**What changed:** Generate an embed code for any booking form and send it straight to your developer by email, right from the Booking Forms list.
**Why it matters:** If you want a booking form on your own website, this removes the back and forth of manually copying and sending code.
**Action needed:** None, find the option next to any form in your Booking Forms list.

### Booking Form SMS Link Fixed — Jun 11
**What changed:** Corrected a missing space in the booking form SMS template link, so the link text now reads correctly.
**Why it matters:** A run together link can look broken or untrustworthy to a customer receiving it by text.
**Action needed:** None

---

## 📱 Pipeline & Mobile (4 updates)

### Call from Quo Deep Link on Mobile — Jun 25
**What changed:** Tapping a phone number in the mobile app now deep links directly into the Quo calling app.
**Why it matters:** One tap instead of several means faster callbacks from the field.
**Action needed:** Requires the Quo app to be installed on your device.

### Deal Card Task Edits Now Save on Mobile — Jun 18
**What changed:** Fixed an unresponsive Save button when editing a task from a Deal Card on the mobile app.
**Why it matters:** A Save button that doesn't respond means edits silently don't stick, easy to miss until it's too late.
**Action needed:** None

### Custom Job Stages Can Now Be Deleted — Jun 11
**What changed:** Fixed an issue that prevented some accounts from deleting custom job stages.
**Why it matters:** Your pipeline should stay as clean as your workflow, stale stages you can't remove just add clutter.
**Action needed:** None

### Negative Values Blocked on Mobile Line Items — Jun 11
**What changed:** Duplicated packages and line items no longer accept invalid negative values on iOS and Android.
**Why it matters:** A stray negative value can throw off a proposal total without it being obvious at a glance.
**Action needed:** None

---

## 💬 Messaging & Notifications (5 updates)

### Text Messaging Now Accepts All Valid Physical Addresses — Jun 11
**What changed:** Fixed a validation bug that was incorrectly rejecting certain valid physical addresses during text messaging setup.
**Why it matters:** A blocked setup step can stop your texting from working entirely until the address format is "guessed right."
**Action needed:** If your address was previously rejected, try saving it again.

### Text Messages No Longer Double Send as Email — Jun 9
**What changed:** Fixed a bug that caused some text messages to send as both a text and an email.
**Why it matters:** Sending the same message twice through two channels can look unprofessional and confuse the customer.
**Action needed:** None

### Calendar SMS Reminders Now Respect Opt Outs — Jun 9
**What changed:** The SMS reminder toggle on calendar events now correctly honors a contact's opt out status, and no longer resets the scheduled date when a warning appears.
**Why it matters:** Texting someone who has opted out is both a poor customer experience and a compliance risk.
**Action needed:** None

### New: Reply To Override for Outbound Communications — Jun 9
**What changed:** Set a company level reply to address for all outbound emails and messages.
**Why it matters:** Customer replies now land exactly where you want them, instead of wherever the system defaulted to.
**Action needed:** Set your preferred reply to address in Company Settings if you'd like to use this.

### Chat Compose Box Now Auto Expands on Desktop — Jun 1
**What changed:** The message compose box in Chat now grows automatically as you type longer messages.
**Why it matters:** A fixed height box hides your own message as you write it, this keeps everything visible.
**Action needed:** None

---

## 🔌 Integrations (1 update)

### New: Default Salesperson & Project Manager for Zapier/API Leads — Jun 9
**What changed:** Leads coming in through the API or Zapier can now automatically be assigned a default salesperson and project manager.
**Why it matters:** Leads from automated sources used to need manual assignment, now they route exactly like the rest of your pipeline.
**Action needed:** Set your default assignees in Settings if you want this applied.

---

## 📊 Metrics & Reports (2 updates)

### New: Clickable Metrics & Report Drill Downs — Jun 22 & 25
**What changed:** Metrics page cards and report sections are now clickable, with hint banners, hover states, and row level drill down.
**Why it matters:** You can now dig into the numbers behind each metric instead of just seeing the top line total.
**Action needed:** None, try clicking into any metric card to explore.

### Production Rate Report Accuracy Fixed — Jun 25
**What changed:** Fixed a bug where the Production Rate Report could include data from packages you didn't select, when those packages shared area names.
**Why it matters:** Production rate accuracy directly affects how you estimate future jobs.
**Action needed:** Re-pull any production rate reports you relied on before June 25 for packages with shared area names.

---

## ⚙️ Settings (1 update)

### Products & Services Page Refreshed — June 2026
**What changed:** The Products & Services list and edit views have a cleaner, refreshed look.
**Why it matters:** A clearer layout makes it faster to manage and update your catalog.
**Action needed:** None

---

## 🚀 Upcoming Releases (4 in progress)

### Expanded Proposal Section Reordering — Code complete
Position control is being extended to all eligible sections of a proposal, so you'll have full control over how every part of a proposal is ordered, not just a limited set.

### Enhanced Proposal Rejection Reasons — Code complete
An expanded dropdown of rejection reasons, plus an "Other" option with free text feedback, so you get clearer insight into why a proposal was declined.

### QuickBooks Integration Improvements — In QA
A round of fixes and UX improvements to the QuickBooks integration, addressing sync accuracy and clearing up confusing error states. Currently in QA testing.

### New Zapier Trigger for Incoming Text Messages — In QA
A new Zapier trigger that fires when an incoming text message is received, so you can build automations around inbound texts the same way you already can for other events.

---

## ✨ Other Exciting Updates Coming Soon (2 planned)

### Inline Tax Rate Entry in Proposals & Templates — In dev
Enter and adjust tax rates directly inline while building a proposal or template, instead of navigating away to a separate settings screen.

### Bulk Archive for Booking Requests — In dev
Archive multiple booking requests at once instead of one at a time, making it faster to clear out your queue.

---

Questions about anything above? Visit help.dripjobs.com or reach out to your DripJobs support team.
