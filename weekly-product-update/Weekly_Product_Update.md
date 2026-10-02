# DripJobs Weekly Product Update

**Period:** September 28 – October 2, 2026
**Release:** Sep 28 & Sep 30 deployments · 10 updates

---

## Deals

### Deal Stage and Deal/Proposal Status Are Now Read-Only in the Edit Details Modal (*Sep 28*)
**What changed:** The Deal Stage and Deal/Proposal Status fields in the Edit Deal/Job Details modal are now read-only, relabeled, and have explanatory helper text, since they're already set automatically by actions elsewhere in the app and editing them here silently failed to save before.
**Why it matters:** You always see your deal or job's actual current stage and status, instead of two fields that looked editable but silently dropped your changes.
**Action needed:** None

---

## Appointments

### Booking Requests and Appointment Details Now Show the Customer's Email (*New · Sep 30*)
**What changed:** The booking request and appointment details views now show the customer's email address alongside their other contact info, when one was submitted or exists on file.
**Why it matters:** You can see a customer's email right from a booking request or appointment, without switching over to their full contact record.
**Action needed:** None

### Fixed Standalone Appointments Missing a Delete Option (*Sep 28*)
**What changed:** Fixed a bug where an appointment not associated with any deal had no delete or archive option available.
**Why it matters:** You can now delete a standalone appointment that isn't tied to a deal, instead of being stuck with no way to remove it.
**Action needed:** None

---

## Job Schedule

### Fixed Hard to Read Event Labels on the Job Schedule Calendar (*Sep 28*)
**What changed:** Fixed event label text being hard to read against several background colors on the Job Schedule calendar.
**Why it matters:** Job details are now clearly readable on every calendar color instead of blending into the background.
**Action needed:** None

---

## Invoicing

### Fixed Financed Payments Incorrectly Flagged as Not Funded (*Sep 30*)
**What changed:** Fixed a bug where a payment request incorrectly warned that financing hadn't been funded, even when the invoice and proposal both already showed it as Funded.
**Why it matters:** You can request payment on a funded financing-backed invoice without hitting a false "not yet funded" warning.
**Action needed:** None

---

## Communications

### AI Drip Message Writing Now Walks You Through Tone, Type, and Context (*New · Sep 28*)
**What changed:** The "Generate with AI" button on drip message steps now walks you through a guided flow (timing, a short description of what you want to say, tone, and message type) and generates one ready-to-edit message at a time for that step, instead of generating a full multi-step sequence with no input from you.
**Why it matters:** AI-generated drip messages are now tailored to what you actually want to say and the stage they're sent from, cutting down on generic or off-brand wording you'd have to rewrite anyway.
**Action needed:** None

### Removed an Auto-Suggested Signature from AI Drip Message Generation (*Sep 30*)
**What changed:** Removed an auto-suggested sales person signature from the AI drip message generation prompt.
**Why it matters:** Generated drip messages no longer include an auto-suggested signature you didn't ask for.
**Action needed:** None

---

## Integrations

### Fixed Routemize-Scheduled Deals Keeping Their Old Drip Sequence (*Sep 28*)
**What changed:** Fixed a bug where a Routemize-driven move from Estimate Requested to Estimate Scheduled updated the deal's stage but left its upcoming Drip sequence on the old Estimate Requested sequence.
**Why it matters:** Deals moved forward by Routemize now get the right follow-up sequence for their new stage instead of continuing to send Estimate Requested messages.
**Action needed:** None

---

## Admin Tools

### Added an Address Line 2 Field Everywhere Addresses Appear (*New · Sep 30*)
**What changed:** Added an optional "Address Line 2" field to Company Settings, Proposals, Appointments, Leads, and the public Booking Form, and made sure it displays everywhere else an address already appears (Command Center, PDFs, Drips, Zapier).
**Why it matters:** Suite, unit, or floor details now carry through consistently everywhere an address shows up, instead of getting lost on certain screens.
**Action needed:** None

### Holiday Calendar Region Is Now a Company-Wide Setting (*Sep 30*)
**What changed:** Holiday Region (which holidays your company recognizes) is now a single company-wide setting in Company Settings, instead of a per-user choice that defaulted to None for everyone. Each user still gets their own "Hide Holidays" toggle on the Appointments calendar and the Job Schedule calendar, independent of each other.
**Why it matters:** Your whole team now sees your company's holidays on the calendar by default, instead of each person having to opt in individually.
**Action needed:** None. Company Admins can set or change the Holiday Region in Company Settings.
