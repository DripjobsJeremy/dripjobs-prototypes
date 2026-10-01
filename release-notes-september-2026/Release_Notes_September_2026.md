# DripJobs Product Release Notes | September 2026

**Period:** September 1 – September 30, 2026
**Releases:** 7 deployments
**Improvements:** 25 updates

---

## 📄 Proposals & Proposal Builder (1 update)

### Job Report Margin and Profit Now Include Material Cost (Sep 3)
**What changed:** The Job Report summary on a proposal now includes material cost in Total Price, Total Cost, Profit, and Margin. Previously these figures reflected labor only. The Product Report and the per-substrate rows are unchanged.
**Why it matters:** The profit and margin you see on a proposal now reflect the whole job, not just the labor side of it.
**Action needed:** None, expect margin figures on existing proposals to read lower than before because material cost is now counted.

---

## 💳 Customer Portal & Invoicing (2 updates)

### Financed Payments No Longer Wrongly Flagged as "Not Funded" (Sep 30)
**What changed:** Fixed an issue where a payment request for a financed payment could show a false "financing has not yet been funded" warning even when the financing was already marked Funded on the invoice and in the proposal. Funded status is now recognized consistently across the proposal, invoice, and payment request, and the warning still appears when financing is genuinely unfunded.
**Why it matters:** You can collect financed payments without being blocked by an incorrect error.
**Action needed:** None

### Voided Invoices Now Clearly Show as Voided in the Customer Portal (Sep 17)
**What changed:** Voided invoices in the Customer Portal no longer present their balance due as payable and no longer show the "Pay with Other" button. The banner is also styled differently from an active invoice so the status is obvious.
**Why it matters:** Customers won't try to pay an invoice you already voided, which avoids payment mix-ups.
**Action needed:** None

---

## 📝 Booking Forms (1 update)

### Customer Email Now Shown on Booking Requests and Appointment Details (Sep 30)
**What changed:** The customer's email address now appears in the Customer Request section of the View Request modal on the Requests tab, and in the Contact Info section of the Appointment Details modal. It shows whenever the email was submitted on the booking form or is on the contact record, and stays visible after a request is accepted and scheduled.
**Why it matters:** You can email a customer straight from the request or appointment without opening their contact record first.
**Action needed:** None

---

## 📱 Pipeline & Mobile (8 updates)

### New: Company-Wide Holiday Region with a Per-Calendar Hide Holidays Toggle (Sep 30)
**What changed:** Holiday Region (None, United States, Canada, or both) is now a company-wide setting in Company Settings, along with a company default for whether holidays are shown. Each user can hide or show holidays separately on the Appointments calendar and the Job Schedule calendar. New companies start with a region based on their currency, and existing companies were set the same way with holidays shown. If an admin later changes the region or the default, everyone's toggles reset to the new default.
**Why it matters:** Your whole team sees the right holidays without each person having to set up their own region.
**Action needed:** None, Company Admins can review the Holiday Region and default visibility in Company Settings.

### Deal Stage and Status Are Now Read-Only in Edit Deal and Job Details (Sep 28)
**What changed:** The Stage and Status fields in the Edit Deal and Edit Job Details window are now read-only, labeled Deal Stage and Deal/Proposal Status (Job Stage and Job Status on jobs), with short helper text explaining they are set automatically. Changes made in those dropdowns never saved, so the controls were removed. When a deal is moved off Proposal(s) Rejected, its status now updates to match the new stage instead of staying on Rejected.
**Why it matters:** The fields now show you what is really on the deal instead of looking editable when they weren't, and a moved deal no longer keeps a stale Rejected status.
**Action needed:** None, move a deal to a new stage by dragging it on the pipeline board as you do today.

### Job Schedule Event Labels Now Readable on Every Calendar Color (Sep 28)
**What changed:** Event label text on the Job Schedule calendar now adjusts to stay readable on every calendar color, for example dark text on light colors like yellow, in all views.
**Why it matters:** Your crew can read job names at a glance, including on a phone in the field.
**Action needed:** None

### Appointments Not Linked to a Deal Can Now Be Deleted (Sep 28)
**What changed:** Fixed an issue where an appointment that was no longer tied to a deal, for example because the deal was deleted first, could not be deleted. You now get a confirmation prompt and the appointment is removed from the calendar, customer, and list views. Other contacts, deals, and jobs are not affected.
**Why it matters:** You can clean up leftover appointments instead of being stuck with orphaned ones on your calendar.
**Action needed:** None

### Custom Pipeline Stages Can Be Deleted Once They Are Empty (Sep 17)
**What changed:** Fixed an issue where a custom Sales Pipeline stage could not be deleted because old, stale deal links made the system think deals were still on it. The delete check, and the error message and downloadable list shown when deletion is blocked, now include only deals that are currently on the stage. Deal history and reporting are preserved.
**Why it matters:** You can tidy up your pipeline without being blocked by deals that are no longer there.
**Action needed:** None, if a custom stage was previously undeletable, try deleting it again.

### Duplicate Checks and Search Now Cover Secondary Emails and Phones (Sep 17)
**What changed:** Duplicate email and phone checks now include a contact's secondary emails and phone numbers, both when creating and editing, and promoting a secondary value to Primary no longer bypasses the check. Contacts list search and global search also find contacts by any secondary email or phone. A new address entered on a new lead, proposal, or on-site estimate for an existing contact is now saved to that contact without creating duplicates, and a stray question-mark hover indicator in Stores was removed.
**Why it matters:** Contact records stay cleaner, are easier to find, and reuse addresses automatically.
**Action needed:** None, existing duplicates may now block a save until they are corrected.

### Command Center Tabs No Longer Cut Off (Sep 8)
**What changed:** Fixed an issue where the Tasks tab in the Command Center could be clipped when Jobi AI and QUO are both enabled. When tabs run out of room, there is now a clickable way to reach them instead of relying on horizontal scrolling.
**Why it matters:** Every Command Center tab is reachable with a mouse, not just with a trackpad swipe.
**Action needed:** None

### Streamlined Archive and Delete for Contacts (Sep 3)
**What changed:** After you archive a contact you now stay on that contact's record, and a separate prompt asks whether you also want to delete the customer. Archiving a contact with deals, proposals, or invoices warns that they will be archived too, and deleting a contact with dependent records warns that the deletion is permanent and removes its deals, proposals, and invoices.
**Why it matters:** Archiving and then deleting a contact takes fewer steps and has clearer safeguards before anything is removed.
**Action needed:** None

---

## 💬 Messaging & Notifications (1 update)

### New: AI-Assisted Drip Message Writing (Sep 28)
**What changed:** A "Generate with AI" button in the drip step editor, for email and text steps in both the Sales and Jobs pipelines, now writes a message for that step. You set the timing, describe what you want to say, and pick a tone and message type, and it fills in the message body for you to edit. Nothing goes out until you save, and the subject line and send delay stay yours to set.
**Why it matters:** You can start from a well-written draft instead of a blank field, with fewer typos and less time spent writing every follow-up.
**Action needed:** None, look for the Generate with AI button when editing a drip step.

---

## 🔌 Integrations (7 updates)

### Routemize Appointments Now Switch the Deal to the Right Drip (Sep 28)
**What changed:** Fixed an issue where, when Routemize scheduled an appointment and moved a deal from Estimate Requested to Estimate Scheduled, the deal could stay on the Estimate Requested drip. The deal now switches to the drip set for Estimate Scheduled, with no duplicate deals or duplicate sends, and messages already sent stay in the deal history.
**Why it matters:** Customers who book through Routemize get the right follow-up messages instead of stale "request received" ones.
**Action needed:** None, confirm your Estimate Scheduled drip is set up the way you want.

### New: Link More Than One Google Calendar (Sep 21)
**What changed:** You can now link more than one Google Calendar to DripJobs. Events from every linked calendar show in DripJobs for reference only and do not affect scheduling availability, and you choose exactly one linked calendar as the one DripJobs writes new events to. You can change that choice at any time for future events, and unlinking the current write-to calendar asks you to pick a new one first. Each linked calendar's events show in its own color and name.
**Why it matters:** You can see everything on your schedule while keeping DripJobs events organized on a single calendar.
**Action needed:** None, link your calendars from the Google Calendar connection screen.

### New: Send Marketing Agency Info from the Zapier Card (Sep 8)
**What changed:** The Zapier card in Company Settings > Integrations now has a "Send Marketing Agency Info" button. It opens an editable email template for your marketing agency, pre-filled with your Zapier API key, your name, company name, and phone, with a Copy button for the subject and body. Nothing is sent from DripJobs, and the button is disabled until a Zapier API key exists.
**Why it matters:** You can hand your agency exactly what it needs to send leads into your pipeline in one copy and paste.
**Action needed:** None, generate a Zapier API key first if you haven't, and fill in your agency contact's name before copying.

### Zapier "New Payment Received" Trigger Now Covers Stripe Payments (Sep 8)
**What changed:** The Zapier "New Payment Received" trigger now also fires for Stripe payments made at proposal acceptance, including deposits, and for recurring invoice payments, alongside the manual payments it already supported.
**Why it matters:** You can automate follow-ups the moment a customer pays by Stripe.
**Action needed:** None

### Routemize Appointments Now Respect Your Communication Setting (Sep 8)
**What changed:** Fixed an issue where appointments created through Routemize still sent a confirmation even when On-Site Estimate Communication was turned off. Routemize appointments now follow that setting, and scheduling through Calendly, Zapier, or manually works as before.
**Why it matters:** Customers no longer get appointment confirmations you turned off.
**Action needed:** None, check On-Site Estimate Communication under Company Settings > App Settings > Estimate Settings if you want to adjust it.

### Google Calendar Sync Now Only Adds Appointments Assigned to You (Sep 8)
**What changed:** Appointments now sync only to the Google Calendar of the user they are assigned to, so admins who can see other users' appointments in DripJobs no longer get copies on their own Google Calendar. This covers new, reassigned, updated, and canceled appointments.
**Why it matters:** Your Google Calendar shows your own appointments instead of duplicates of everyone else's.
**Action needed:** None, admins may want to delete leftover duplicate events created before this fix.

### Future DripJobs Events Now Sync to Your Connected Google Calendar (Sep 3)
**What changed:** When you connect Google Calendar and choose a calendar, every future DripJobs event, including appointments, scheduled jobs, and estimates, is now created on it, and new events you create afterward keep syncing. Disconnecting or changing the calendar stops syncing to the old one.
**Why it matters:** Your upcoming schedule shows up in Google Calendar without re-entering anything.
**Action needed:** None, reconnect or confirm your calendar selection if events seem to be missing.

---

## ⚙️ Settings (5 updates)

### New: Address Line 2 Across Company Settings, Jobs, Appointments, and Documents (Sep 30)
**What changed:** Company Settings > Company Information now has an optional Address Line 2 for both the physical and billing address, and New Proposal, New On-Site Estimate, other appointment types, New Lead, and the public Booking Form each have an optional Address Line 2 for the job or appointment address. Where present it now appears in the Command Center contact card, appointment modals, PDF documents, the {job-location} and {appointment-location} keywords, and Zapier. Choosing an existing contact also fills in their Primary Address automatically, and editing an on-file address saves it as a new address instead of overwriting the original.
**Why it matters:** Suite, unit, and floor details no longer get lost depending on which screen or document you are looking at.
**Action needed:** None

### Refreshed User Profile Page (Sep 21)
**What changed:** The user profile page has been updated to match the current DripJobs design, and the password line now reads "Password last updated on: [date] (click to edit)".
**Why it matters:** The profile page is cleaner and the password label is clearer.
**Action needed:** None

### Production Rates Demo Button Opens the Current Booking Page (Sep 17)
**What changed:** The "Schedule demo" button in the Production Rates section now opens the current Production Rates Overview booking page instead of an outdated link.
**Why it matters:** If you want a Production Rates walkthrough, you land on the right page to book it.
**Action needed:** None

### Company Logo Upload Now Shows Accepted File Formats Up Front (Sep 8)
**What changed:** The Company Logo upload on the Brand settings page now shows "Accepted formats: JPG, JPEG, PNG, GIF, BMP, ICO, SVG" before you choose a file.
**Why it matters:** You know which logo files will work before you try to upload one.
**Action needed:** None

### Settings Tab Bar Can Now Be Dragged or Scrolled to Reach Hidden Tabs (Sep 8)
**What changed:** The Company Settings tab bar can now be dragged or scrolled with a mouse or trackpad to reveal hidden tabs. On narrow windows, including Mac Safari, the scroll control stays visible and the Add-Ons tab no longer flickers in and out.
**Why it matters:** You can reach every settings tab, including Add-Ons, on smaller screens and laptops.
**Action needed:** None

---

## 🚀 Upcoming Releases (4 in progress)

### Business Entity Records (In QA)
Commercial accounts will be able to track a Business as its own record, with several Contacts associated to it and one marked Primary. A new Businesses item in the Sales menu leads to a tabbed Business profile that brings together its deals, proposals, change orders, appointments, invoices, and payments in one place, and Business can be chosen when creating a lead, appointment, proposal, or invoice.

### Google Calendar Icon and My Profile Connection (In QA)
The Google Calendar widget on Appointments and Job Schedule is becoming a compact icon that takes every user to a Google Calendar section at the top of My Profile. From there you can connect, choose whether to sync appointments and jobs, and disconnect, all in one place.

### Per-Package Discounts (In QA)
Every package on a proposal will get its own discount action, flat or percentage, calculated against that package's subtotal and added as a discount line inside the package. Each package's discount stays independent of the others.

### Event Banner Settings Moving to the Calendar Tab (PR in review)
The "Add crew name to event banner" and "Add job total to event banner" toggles are moving from Estimate Settings to Company Settings > Calendar, keeping every company's current choice. New accounts will also have the job total shown on event banners by default.

---

## ✨ Other Exciting Updates Coming Soon (3 planned)

### Customer Portal Document Language (Planned)
Admins will be able to set a default viewing language for the proposals, invoices, and change orders customers open in the Customer Portal, adjust it on an individual proposal or invoice, and let customers pick their own language from a selector in the portal header. Translation applies to the portal pages you see on screen, and downloaded PDFs stay in the original language.

### Direct Thumbtack Integration (In progress)
A direct Thumbtack integration is in the works. Once live, new Thumbtack leads will flow straight into DripJobs as contacts and deals, tagged with Thumbtack as the lead source, and dropped automatically into your Sales Pipeline and drip sequences, no manual entry required.

### Invoice Reminders (Planned)
Automatic, configurable reminders for outstanding invoices are on the way, sent by email or text before the due date, on the due date, or after, on a schedule you control. The Invoices page is also getting summary stats, more filters, a reminder status for every invoice, and bulk actions like Send Reminder, Mark as Paid, and Export.

---

Questions about anything above? Visit help.dripjobs.com or reach out to your DripJobs support team.
