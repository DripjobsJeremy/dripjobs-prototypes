# DripJobs Weekly Product Update

**Period:** October 19 – October 23, 2026
**Release:** Oct 19 & Oct 22 deployments · 6 updates

---

## Proposal Builder

### Fixed Inconsistent Drag-and-Drop Feedback Between Packages, Areas, and Line Items (*Oct 19*)
**What changed:** Fixed a bug where dragging a line item out of a package showed the wrong drop-target indicator, and dragging an area or line item into a package showed no indicator at all. Drag-and-drop now shows the correct visual feedback in every direction between packages, areas, and line items.
**Why it matters:** It's now clear where you can drop an item while rearranging a proposal, instead of guessing.
**Action needed:** None

---

## Communications

### Fixed Email Blast Images Not Appearing in Preview, and Message Body Being Cut Off (*Oct 19*)
**What changed:** Fixed a bug where images in an email blast displayed correctly in the editor but didn't appear in the preview or delivered preview email, and the email body was sometimes truncated in the recipient's inbox until they clicked "View entire message."
**Why it matters:** Previewing a blast before you send it now accurately shows what your customers will actually receive, images and all.
**Action needed:** None

---

## Jobs & Job Schedule

### Fixed the "Show All Jobs" Toggle Not Applying to Every Jobs and Job Schedule View (*Oct 22*)
**What changed:** Fixed a bug where the "Show All Jobs For Project Manager Role" toggle opened full visibility on the Jobs Pipeline List and Job Schedule Calendar, but the Jobs Board view and the "needs scheduling" list still only showed a Project Manager's own assigned jobs.
**Why it matters:** With the toggle on, a Project Manager now sees the same full set of jobs across every view in Jobs and Job Schedule, so nothing is missed depending on which view they're looking at.
**Action needed:** None

---

## Customer Portal

### Customers Can Now View Proposals, Invoices, and Change Orders in Their Own Language (*New · Oct 22*)
**What changed:** Added a Default Document Language setting in Company Settings > Customer Portal that Admins can set for all customers, plus a per-document language option on individual Proposals and Invoices. Customers can also pick their own language from a new selector in the Customer Portal header, which takes priority over any default. Translation covers portal web pages only; downloaded PDFs stay in the original language.
**Why it matters:** Customers can read their proposals, invoices, and change orders in the language they're most comfortable with, without you having to do anything extra.
**Action needed:** None

---

## Integrations

### Zapier: Payment Schedule Now Available on the "New Invoice Created" Trigger (*New · Oct 22*)
**What changed:** Added a Payment Schedule field to the existing "New Invoice Created" Zapier trigger, exposing each scheduled payment's name, percentage, and dollar amount so it can be mapped into downstream Zaps.
**Why it matters:** Zaps that use invoice data can now also account for how payments are scheduled, without an extra lookup step.
**Action needed:** None

---

### New Zapier Trigger: "New Email Received" (*New · Oct 22*)
**What changed:** Added a new Zapier trigger, "New Email Received," that fires whenever a customer email arrives in your Inbox Email (when "Route all email replies to DripJobs" is enabled in Company Settings > Email Settings). The trigger includes customer name, phone, email, assigned Salesperson and Project Manager, email content, received date, and email type.
**Why it matters:** You can now build Zaps that react the moment a customer email lands in your Inbox, without checking DripJobs first.
**Action needed:** None
