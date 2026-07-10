# Product Roadmap: Response to Retention & Churn Analysis

**Prepared by:** Jeremy Harrison, PM · DripJobs Product & Engineering
**Date:** July 8, 2026 · **Last updated:** July 10, 2026
**Source:** Rick's Retention & Churn Full-Population Analysis (4,974 tenants, 46.3M activity events, as of 2026-07-08)
**Reference:** [DripJobs Prototype Hub](https://dripjobsjeremy.github.io/dripjobs-prototypes/)

---

## Progress Update: July 10, 2026

**Workstream 1 (Onboarding Wizard):** Ticket rewritten twice since this roadmap was published. On July 8, scope was extended through Create Proposal with completion redefined as customer side Proposal Viewed, and implementation prescription was removed. On July 9, a Phase 1 "Schedule Onboarding" step was folded in (the Flow 1/Flow 2 wizard concept, which previously had no ticket), and Create Deal was reclassified as inline within the Create Proposal step rather than a standalone step. Scoped to Cold Signup accounts only; Warm Signup is confirmed out of scope for this ticket. Ticket status moved from Needs PM Analysis to Needs Design. The Jason/Ahmad upstream dependency question remains open and unresolved.

**Workstream 2 (Activation Dashboard):** The parallel signal decision is resolved. Prop. Viewed and Deals (90d) columns, corresponding filters, and a new Metrics Bar card have been added to the ticket. Health scoring, the $10k filter, and A2P filters are confirmed unchanged; full Health redefinition is logged as an Out of Scope / Phase 2 item. Ticket is In Progress, assigned to Ali Raza.

**Workstream 3 (Dunning Recovery):** No change. Expired Payment Card Alert Banner remains in Needs PM Analysis.

**Workstream 4 (Funnel Refill):** No change. Still no ticket or owner.

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
**Status: In Progress**

**Existing ticket:** [Onboarding Walkthrough: Schedule Onboarding Through Proposal Viewed](https://app.clickup.com/t/8633445/86b4ek0j7) · Needs Design, Active Triage (V1)

Renamed from "Onboarding Walkthrough for Company Settings w/ Brandfetch Integration" and rewritten twice since this roadmap was first published on July 8. The ticket now confirms this is the same effort as the Flow 1/Flow 2 wizard concept rather than a separate, narrower piece of it, resolving the assumption flagged below at first publication.

**July 8 rewrite:**
- Removed implementation prescription (Shepherd.js/Intro.js, Zustand store, specific API endpoints, backend field names) per ticket standards
- Extended step flow beyond Brand tab through Create Deal, Create Proposal, Send Proposal
- Redefined completion criteria as customer-side "Proposal Viewed" activity on a Real proposal, not proposal creation or send
- Added Real vs. Test proposal distinction at the Send Proposal step, with Test excluded from completion and standard reporting
- Scoped to Cold Signup accounts only; Warm Signup treatment confirmed out of scope for this ticket

**July 9 rewrite (against the hybrid onboarding wizard prototype):**
- Added Phase 1: Schedule Onboarding, merging the Flow 1/Flow 2 wizard concept (which previously had no ticket) into this walkthrough as a scheduling step before account setup
- Reclassified "Create Deal" as fulfilled inline within the Create Proposal step via Lead/Contact creation, rather than a standalone step
- Company Info step now pre-populates from ChargeBee billing data
- New outbound communication scoped: one-time system-sender completion summary email, fixed non-editable template
- Saved walkthrough progress is resumable indefinitely, including across future requirement changes, with no forced restarts

**Still open:**
- Upstream dependency scope change with Jason/Ahmad remains unresolved, tracked separately, and is not blocking further ticket refinement
- Instrumenting proposal-viewed as a trackable event tied to the wizard session, feeding Workstream 2, is not yet explicitly confirmed in the ticket

---

## Workstream 2: Activation Dashboard — Health Score Aligned to the Data
**Status: On Track**

[Activation Dashboard V1 Expansion](https://app.clickup.com/t/86b9512kq) · In Progress, assigned to Ali Raza

**Upstream dependency:** [Customer Success Activation Tracking (90-Day Milestone)](https://app.clickup.com/t/86b72rqzq) · Pushed to Production, Dec 2025

Rick recommends retiring the current activation definition (10k in sales + A2P verification) in favor of a directable, leading metric: a proposal viewed by a customer plus 3+ deals worked, within the first 30 to 60 days. Signing a proposal has 3.94× retention lift; 3+ deals worked has 3.94× lift independently.

**Resolved (July 8):** Decided as Option A, parallel signal. Prop. Viewed and Deals (90d) columns have been added to the ticket, sourced from existing proposal activity tracking with no new instrumentation required. Corresponding filters and a new Metrics Bar card were added alongside them. Health scoring, the $10k filter, and A2P filters remain unchanged in this ticket; no coordinated change was made to the 90-Day Activation Rule ticket. Full Health redefinition (Option B) is logged as an Out of Scope / Phase 2 item for future consideration.

**Actions:**
- ~~Decide whether 86b72rqzq's underlying milestone definition changes, or whether the new leading indicator is added as a parallel signal alongside it~~ Resolved: parallel signal, no change to 86b72rqzq
- ~~Add a "Proposal Viewed" signal to the dashboard using existing activity data~~ Done
- ~~Add a "Deals Worked (90d)" or similar signal per Rick's 3+ deals threshold~~ Done
- Decide how legacy accounts are handled for the new Prop. Viewed and Deals (90d) signals specifically; legacy accounts currently display — for both, same as other milestone fields
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
