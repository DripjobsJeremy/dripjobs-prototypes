# DripJobs Product Release Notes | October 2026

**Period:** October 1 – October 31, 2026
**Releases:** 7 deployments
**Improvements:** 23 updates

---

## 📄 Proposals & Proposal Builder (3 updates)

### New Proposals Created From a Deal Now Default the Project Manager (Oct 26)
**What changed:** A new proposal created from a deal, whether from the three-dot menu or the Command Center, now fills in the deal's Project Manager along with its Salesperson. Previously the Project Manager field was blank. If the deal has no Project Manager, the field stays blank.
**Why it matters:** Proposals, and the Inbox conversations that come from them, reach the right Project Manager without extra data entry.
**Action needed:** None

### Clearer Drag-and-Drop Indicators in the Proposal Builder (Oct 19)
**What changed:** Dragging an Area or Line Item now highlights only the places it can actually be dropped. The target lights up while your pointer is over it, and a Package shows an add zone. A Line Item no longer shows the Areas indicator, and the indicators clear when you drop or cancel. Where items land is unchanged.
**Why it matters:** Building a proposal with packages is clearer, with fewer items dropped in the wrong place.
**Action needed:** None

### Countersign Date Now Stays at the Original Acceptance Date (Oct 13)
**What changed:** Fixed an issue where the countersign date on an accepted proposal changed to the current date whenever the proposal was reopened later. It now stays fixed to the original acceptance date on screen, in PDF downloads, and in emails, and existing accepted proposals keep their historical date.
**Why it matters:** Your signed proposals show the true acceptance date, which matters for paperwork and disputes.
**Action needed:** None

---

## 💳 Customer Portal & Invoicing (2 updates)

### Request Payment Percent and Amount Now Stay in Sync and Round Correctly (Oct 29)
**What changed:** In the Request Payment window, typing a dollar Amount now updates the Custom % to match, and an Amount calculated from a percentage now rounds to the nearest cent instead of cutting off the extra digits. For example, 35% of $4,647.02 is now $1,626.46. A percent-based request can now be up to one cent higher than before.
**Why it matters:** The percent and dollar fields always agree, and the amounts you request are exact to the cent.
**Action needed:** None

### New: Default Document Language for the Customer Portal (Oct 22)
**What changed:** Admins can now set a Default Document Language in Company Settings > Customer Portal for the proposals, invoices, and change orders customers open in the portal. You can also set a language on an individual proposal or invoice, and change orders follow their proposal. Customers get a language selector in the portal header, and their own choice always takes priority. An optional "Also apply to Work Orders" setting is off by default. Translation uses Google Translate on portal pages only, so it is machine-generated, downloaded PDFs stay in the original language, and names, addresses, numbers, and money amounts stay exactly as entered.
**Why it matters:** Customers who read another language can read your proposals and invoices in it without you translating anything.
**Action needed:** Optional, set a Default Document Language in Company Settings > Customer Portal.

---

## 📱 Pipeline & Mobile (7 updates)

### Moving a Deal Stage in the Command Center Now Saves to the Proposal (Oct 26)
**What changed:** Changing a deal's stage with the Move option in the Command Center now saves to the deal and its proposal, including reopening a Rejected proposal as Draft, matching what drag-and-drop already did. If the save fails you now see an error instead of a false success.
**Why it matters:** A proposal you reopen from your phone stays reopened.
**Action needed:** None

### Contact Option Toggles Now Have Info Tooltips (Oct 26)
**What changed:** The Options section on the Contact Detail page now has an info icon beside Active Contact, Opt Out of Blasts/Newsletters, Opt Out of Drips, and Opt Out of SMS. Hover, tap, or focus the icon for a short explanation. The toggles themselves work exactly as before.
**Why it matters:** You and your office staff can see what each setting does before changing it.
**Action needed:** None

### On-Site Estimate Requests No Longer Linger on the Calendar After Scheduling (Oct 26)
**What changed:** Fixed an issue where scheduling an On-Site Estimate from the Command Center for a deal that came from a booking form left the original request on the calendar as a duplicate. The original request is now updated, so only the scheduled appointment shows.
**Why it matters:** Your calendar shows one entry per estimate, so you don't chase stale requests or risk double-booking.
**Action needed:** None

### Project Manager "Show All Jobs" Toggle Now Applies Everywhere (Oct 22)
**What changed:** With "Show All Jobs For Project Manager Role" turned on, Project Managers now see all company jobs in both the Jobs Pipeline List and Board views, and all job events on the Job Schedule calendar and the needs-scheduling list. With the toggle off, they still see only their own jobs.
**Why it matters:** Project Managers with the toggle on no longer miss jobs that need scheduling or attention.
**Action needed:** None

### Mobile App Calendar Now Shows Full Holiday Names (Oct 13)
**What changed:** In the mobile app's calendar month view, holidays now show a recognizable name instead of a single letter, and tapping a holiday shows its full name on iOS and Android. The holiday styling and the Holidays toggle are unchanged.
**Why it matters:** Your crew can tell which holiday falls on a day when planning jobs from a phone.
**Action needed:** None

### Large Contact List Exports Now Work (Oct 5)
**What changed:** Fixed an issue where exporting the full contact list for accounts with very large lists, around 15,000 contacts or more, ended on a generic error with no file. Exports now complete, each eligible contact appears once, and a failure shows a useful error message. Archived and active filtering is unchanged.
**Why it matters:** Contractors with big customer lists can get their complete data out.
**Action needed:** None, retry the export if it failed for you before.

### Google Address Suggestions Are Back on Contacts, Proposals, and Invoices (Oct 5)
**What changed:** Fixed the Google address suggestion dropdown not appearing when adding or editing addresses on Contacts, Proposals, and Invoices. Selecting a suggestion fills in the address fields, and typing an address manually still works.
**Why it matters:** Job-site addresses are faster to enter and cleaner, with fewer typos on quotes and invoices.
**Action needed:** None

---

## 💬 Messaging & Notifications (5 updates)

### Email Menu Badge Now Matches What You Can See in Your Inbox (Oct 26)
**What changed:** For non-admin users such as salespeople, the unread badge on the Email menu now counts only the conversations they are allowed to see in their Inbox. It previously counted unread conversations company-wide. Admins keep the company-wide count.
**Why it matters:** Your badge matches your Inbox, so you won't see "1 new" with nothing to open.
**Action needed:** None

### Email Blast Previews and Test Sends Now Match the Editor (Oct 19)
**What changed:** Fixed an issue where an email blast preview or test send could leave out images that appear in the editor and hide the message content behind a "View entire message" link. Previews and test sends now show the images and the full message body.
**Why it matters:** You can trust that a blast preview matches what your customers will receive.
**Action needed:** None

### Inbox Tags Now Show the Deal's Salesperson and Project Manager (Oct 15)
**What changed:** Inbox conversations sent from a deal now show the deal's assigned Salesperson in the row and thread header tag instead of the account owner, and the Project Manager tag now shows whenever one is assigned. Each conversation reflects its own deal, and the tag matches the Salesperson filter.
**Why it matters:** Your reps can tell at a glance who owns each conversation.
**Action needed:** None

### Verified Texting Companies No Longer See "Text Messages Are Disabled" (Oct 15)
**What changed:** Fixed a mismatch where a company that was approved and verified for texting could still see "Text Messages are disabled" on Integrations and be sent to a verification form from Chat. Check Twilio Status, Integrations, and Chat now use the same verification state, and if messaging is blocked for another reason, the specific reason is shown.
**Why it matters:** Verified contractors are no longer locked out of texting and Chat.
**Action needed:** None

### Privacy Policy and Terms Links Now Required for New Text Messaging Registrations (Oct 15)
**What changed:** New A2P 10DLC text messaging registrations now require a Privacy Policy URL and a Terms & Conditions URL, both public HTTPS links that are sent to Twilio. Booking forms now show separate Privacy Policy and Terms & Conditions links that open in a new tab without losing the form. Existing approved campaigns are not changed.
**Why it matters:** Your texting registration keeps meeting Twilio's requirements, and booking form visitors can read your legal terms.
**Action needed:** If you are registering for texting, have your public HTTPS Privacy Policy and Terms & Conditions links ready. Existing campaigns need nothing.

---

## 🔌 Integrations (4 updates)

### New: Zapier "New Email Received" Trigger (Oct 22)
**What changed:** A new Zapier trigger, "New Email Received", fires once for each customer email that arrives in the DripJobs Inbox, including replies. It sends the customer's name, phone, and email, the assigned Salesperson and Project Manager, the email content, the date received, and the email type (Proposal, Invoice, Drip Reply, or Change Order).
**Why it matters:** You can automatically alert your staff or log customer replies in the tools you already use.
**Action needed:** Turn on "Route all email replies to DripJobs" in Company Settings > Email Settings, then add the trigger in Zapier.

### Payment Schedule Added to the Zapier "New Invoice Created" Trigger (Oct 22)
**What changed:** The Zapier "New Invoice Created" trigger now includes a Payment Schedule field that lists each scheduled payment in order, with its name, percentage, and dollar amount. Invoices with no schedule return an empty value, and existing Zaps keep working unchanged.
**Why it matters:** You can send an invoice's payment milestones into your other tools through Zapier.
**Action needed:** None

### New: Google Calendar Icon and One Place to Manage Your Connection in My Profile (Oct 13)
**What changed:** The Google Calendar status widget on Appointments and Job Schedule is now a compact Google icon that takes every user, admin or not, to a Google Calendar section at the top of My Profile. That is where you connect, manage, and disconnect Google Calendar, with new Sync Appointments and Sync Jobs toggles and a Disconnect toggle. Changes apply when you click Save. Sync is one way, DripJobs to Google, and turning it off stops future syncing without removing events already on Google. Admins also see a read-only Google Calendar card in Settings > Integrations that links back to My Profile.
**Why it matters:** Any user can connect Google Calendar and choose what syncs, without hunting through admin settings.
**Action needed:** None, go to My Profile > Google Calendar to connect, change what syncs, or disconnect, and click Save.

### Zapier Demo Link Updated (Oct 5)
**What changed:** The demo link in the Zapier box under Company Settings > Integrations now opens the current Zapier overview booking page. Your Zapier connection and settings are unchanged.
**Why it matters:** If you want help with Zapier automations, the link takes you to the right place.
**Action needed:** None

---

## ⚙️ Settings (2 updates)

### Substrate Client Labels Now Limited to 48 Characters (Oct 29)
**What changed:** The Client label on a substrate in Production Rates is now limited to 48 characters, with a counter such as 12/48, in substrate settings and on proposals. The full 48 characters now show on the Customer Portal and the proposal PDF. Existing longer labels are not changed and show a "too long" warning, and you can still save other changes to that substrate, but editing the label text requires 48 characters or fewer. Work order PDFs and the crew view may still clip long labels.
**Why it matters:** Your customers see the full label on proposals, invoices, and change orders.
**Action needed:** Shorten any existing labels over 48 characters if your customers see them cut off.

### Event Banner Toggles Moved to the Calendar Tab (Oct 5)
**What changed:** "Add crew name to event banner" and "Add job total to event banner" have moved from Company Settings > App Settings > Estimate Settings to Company Settings > Calendar. Every company's current on/off choice is kept and banners behave the same. New accounts now have the job total shown by default, and the crew name default stays off.
**Why it matters:** Calendar display options are now where you would expect to find them.
**Action needed:** None, look in the Calendar tab if you adjust these toggles.

---

## 🚀 Upcoming Releases (5 in progress)

### Direct Thumbtack Integration (QA complete)
A direct Thumbtack integration is in the works. Once live, new Thumbtack leads will flow straight into DripJobs as contacts and deals, tagged with Thumbtack as the lead source, and dropped automatically into your Sales Pipeline and drip sequences, no manual entry required.

### Business Entity Records (In QA)
Commercial accounts will be able to track a Business as its own record, with several Contacts associated to it and one marked Primary. A new Businesses item in the Sales menu leads to a tabbed Business profile that brings together its deals, proposals, change orders, appointments, invoices, and payments in one place, and Business can be chosen when creating a lead, appointment, proposal, or invoice.

### Per-Package Discounts (In QA)
Every package on a proposal will get its own discount action, flat or percentage, calculated against that package's subtotal and added as a discount line inside the package. Each package's discount stays independent of the others.

### Job Costing Design Refresh (In QA)
The Job Costing Dashboard, Details, Reports, Employee Timesheets, Employee Payroll, Time Sheet Entries, Misc. Costs, and Tutorials pages are being updated to match the current DripJobs design, with the same section cards, floating label fields, buttons, and tabs you see elsewhere. The Edit action on Materials and Misc. Costs rows will also work the way Delete already does.

### Description Only Option When Adding Multiple Items (PR in review)
A Description Only checkbox is coming to the Add Multiple Items window on web and mobile, in proposals, packages, and proposal templates, so you can mark items as Description Only while adding them in bulk instead of editing each one afterward. Description Only items add nothing to the proposal total.

---

## ✨ Other Exciting Updates Coming Soon (1 planned)

### Invoice Reminders (Planned)
Automatic, configurable reminders for outstanding invoices are on the way, sent by email or text before the due date, on the due date, or after, on a schedule you control. The Invoices page is also getting summary stats, more filters, a reminder status for every invoice, and bulk actions like Send Reminder, Mark as Paid, and Export.

---

Questions about anything above? Visit help.dripjobs.com or reach out to your DripJobs support team.
