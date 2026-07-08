# Product Roadmap: Response to Retention & Churn Analysis

**Prepared by:** Jeremy Harrison, PM · DripJobs Product & Engineering
**Date:** July 8, 2026
**Source:** Rick's Retention & Churn Full-Population Analysis (4,974 tenants, 46.3M activity events, as of 2026-07-08)
**Reference:** [DripJobs Prototype Hub](https://dripjobsjeremy.github.io/dripjobs-prototypes/)

---

## The Fork That Survived the Pivot

The February pay-at-signup pivot fixed who signs up: net churn down to 3.3% from 5.7%, 90-day survival up, 1-day bounce halved. It did not fix activation. Among paying customers who still churn, about half never send a single proposal.

Every tenant does account setup (creates a customer, creates a deal). No separation there. The split opens the instant a proposal actually reaches a customer:

| Step | Retained | Churned | Gap |
|---|---|---|---|
| Created a deal | 98.2% | 99.1% | none |
| **Proposal viewed by a customer** | **94.6%** | **54%** | **40.6 pts** |
| Signed proposal | 87% | 50.7% | 36.3 pts |
| Collected a payment | 76.3% | 38.4% | 37.9 pts |

Retention is ~57% for tenants who get a proposal viewed in the first 90 days, ~8% for those who don't.

**Key metrics at a glance:**
- **Healthy:** 3.3% net monthly churn, down from 5.7%
- **Critical:** ~50% of churn still never sends a proposal
- **The Lever:** 57% vs 8% retention, proposal viewed vs. not
- **Recoverable:** ~28% of cancellations are failed payments, not deliberate churn

---

## Workstream 1: Onboarding Wizard — Finish Line Moves to "Proposal Viewed"
**Status: Scope Change**

**Wizard concept:** Onboarding Wizard (Flow 1/Flow 2), Tanner requested, currently blocked on Ahmad's upstream dependency. No formal ticket on file for this concept specifically.

> ❓ **Gap:** this is directionally bet #1, but there's a scope gap. The wireframed flow ends at "Create First Proposal" (step 8), described as a test or real proposal walkthrough. Rick's data says the fork isn't proposal *created*, it's proposal *viewed by the customer*. If the wizard's success state is "a proposal exists" rather than "a proposal was sent and opened," it stops one step short of the behavior that actually predicts retention. Worth deciding now, before development unblocks, whether the wizard's finish line needs to move.

**Existing ticket:** [Onboarding Walkthrough for Company Settings w/ Brandfetch Integration](https://app.clickup.com/t/8633445/86b4ek0j7) · Needs PM Analysis, Active Triage (V1)

This ticket stops even earlier than the wizard concept, at Company Info and the Brand tab. Neither the wireframed flow nor this ticket currently reaches the proposal-viewed line.

**Actions:**
- Rewrite the ticket to remove implementation prescription (it currently specifies Shepherd.js/Intro.js, Zustand store, specific API endpoints); keep only user-facing behavior and business rules
- Extend step flow beyond Brand tab through Create Deal, Create Proposal, Send Proposal
- Redefine completion criteria as customer-side "Proposal Viewed" activity, not proposal creation
- Confirm with Jason/Ahmad whether this changes the blocked upstream dependency scope or can layer on top of it
- Decide cold vs. warm signup treatment (open question from last sync) with this new finish line in mind
- Instrument proposal-viewed as a trackable event tied to the wizard session, feeding Workstream 2

> ⚠ **Assumption:** this ticket is the right vehicle for the expanded scope, and is the same effort as the Flow 1/Flow 2 wizard concept rather than a separate, narrower piece of it. (Note: this roadmap has already been linked directly into the ticket's comments, which is a strong signal it's being treated as the vehicle.)

---

## Workstream 2: Activation Dashboard — Health Score Aligned to the Data
**Status: On Track**

[Activation Dashboard](https://app.clickup.com/t/86b9512kq) · In Progress, Internal Priority 1

**Upstream dependency:** [Customer Success Activation Tracking (90-Day Milestone)](https://app.clickup.com/t/86b72rqzq) · Pushed to Production, Dec 2025

Rick recommends retiring the current activation definition (10k in sales + A2P verification) in favor of a directable, leading metric: a proposal viewed by a customer plus 3+ deals worked, within the first 30 to 60 days. Signing a proposal has 3.94× retention lift; 3+ deals worked has 3.94× lift independently.

Confirmed directly in the dashboard ticket: the Health column's "Healthy" condition is coded as `totalSales >= $10,000 AND a2pActivated = true`, exactly the metric Rick says to retire.

The $10k + A2P definition isn't owned by the dashboard ticket itself, it's computed upstream in 86b72rqzq and the dashboard just displays it. Redefining activation touches both tickets. The good news: no new instrumentation is needed. Proposal-viewed activity is already tracked ([Enhance Proposal Activity Tracking](https://app.clickup.com/t/86b61qexb), shipped), and Rick's own report confirms Proposal/Viewed events are already logged in the activity data. The dashboard's existing Est. Sent / Last Est. columns are close but track whether an estimate was sent, not whether the customer opened it.

**Actions:**
- Decide whether 86b72rqzq's underlying milestone definition changes, or whether the new leading indicator is added as a parallel signal alongside it
- Add a "Proposal Viewed" signal to the dashboard using existing activity data, no new tracking required
- Add a "Deals Worked (90d)" or similar signal per Rick's 3+ deals threshold
- Decide how legacy accounts are handled, they have no 90-day window today by design, so a 30-to-60-day leading indicator needs an explicit rule for them
- Connect this to the unscoped Renewal Risk Flag (Phase 2 stub, ticket 86bajkxdy), which maps closely to Rick's "activated-then-left" churn segment, but is still waiting on thresholds from Tanner/Mary/Eli
- Keep the CS Feedback Flag column and filter work moving; no change to that scope

---

## Workstream 3: Dunning Recovery — Unpaid Invoice Banner + Expired Card Alert
**Status: On Track**

- **Shipped:** [ChargeBee - Unpaid Invoice Alert in Company Settings](https://app.clickup.com/t/86b8ayzwh) · Pushed to Production, Feb 12, 2026
- **Shipped (adjacent):** [Display Banner for Failed Subscription Payment](https://app.clickup.com/t/86b4deec4) · Pushed to Production, Jun 13, 2025 · site-wide, fires after a payment attempt fails
- **Not yet built:** [Expired Payment Card Alert Banner](https://app.clickup.com/t/86b8bmzhr) · Needs PM Analysis, recently updated and moved to Active Triage

Roughly 28% of cancellations (~$4.6K MRR/month) are failed payments, not deliberate churn. Rick calls this the fastest dollar-for-effort win on the board, recoverable with retries, card-update nudges, and grace periods, with no product rebuild required.

Chat history shows the original Unpaid Invoice Banner was planned as a site-wide, master-layout banner. Jason flagged a performance risk and proposed alternatives, including limiting scope to Company Settings. Ticket comments from Feb 11, 2026 show the team landed somewhere in between: desktop shows the banner across all pages, mobile is limited to the Sales Pipeline screen only, and cache time was set to 15 minutes to address the performance concern. Neither of the two shipped banners is preventative, both fire after a payment has already failed or gone unpaid. The Expired Card Alert is the one built to catch a card expiring before the next charge attempt fails.

**Actions:**
- Update 86b8ayzwh's written description to match what actually shipped; it still describes a Company Settings-only row, but comments show the accepted scope is desktop site-wide with mobile limited to Sales Pipeline
- Move the newly updated Expired Card Alert ticket forward as the preventative piece the other two don't cover
- Confirm whether retry logic and grace periods are in scope anywhere, or need a new follow-up ticket once the Expired Card Alert ships
- Track recovered MRR from dunning improvements as a standing metric, per Rick's "what to watch" list

> ❓ **Gap (confirmed via ClickUp search):** no ticket currently covers proactive dunning recovery (retries, grace periods) once a payment does fail. All three tickets here are detection/notification, not recovery workflow.

---

## Workstream 4: Funnel Refill — Qualified Signup Volume
**Status: New, Discovery Tracking**

No ticket yet. Recommend opening a discovery item, not an enhancement ticket.

Provisioned signups are down to ~80 to 120/month with net base growth of ~5 to 10 subs/month. Retention is healthy post-pivot; top-of-funnel is now the growth ceiling. Rick's caution: don't revert to free-trial volume, since ~50% of those signups never provisioned an account at all.

This is a growth lever more than a product build. Track it as a discovery item so it doesn't get lost, without committing engineering scope yet.

**Actions:**
- Open a discovery thread to define what "qualified pay-at-signup start" means as an acquisition target
- Loop in whoever owns top-of-funnel/marketing, since this sits outside core product scope
- Watch the discount-expiry cohorts (March to June signups) as the real test of whether current retention holds once intro pricing ends

> ❓ **Gap:** no current owner identified for top-of-funnel acquisition work. Needs an owner before this becomes actionable.

---

*Reference: [DripJobs Prototype Hub](https://dripjobsjeremy.github.io/dripjobs-prototypes/)*
