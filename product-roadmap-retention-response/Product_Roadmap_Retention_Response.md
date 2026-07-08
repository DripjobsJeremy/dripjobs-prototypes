# Product Roadmap: Response to Retention & Churn Analysis

**Prepared by:** Jeremy Harrison, PM · DripJobs Product & Engineering
**Date:** July 8, 2026
**Source:** Rick's Retention & Churn Full-Population Analysis (4,974 tenants, 46.3M activity events, as of 2026-07-08)

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

---

## Four Workstreams

### 1. Onboarding Wizard: Finish Line Moves to "Proposal Viewed" (Scope Change)
Ticket: [86b4ek0j7 — Onboarding Walkthrough for Company Settings w/ Brandfetch Integration](https://app.clickup.com/t/86b4ek0j7) (Needs PM Analysis, Active Triage V1)

The ticket as scoped stops at Company Info and Brand tab setup, well short of the proposal-viewed fork. Recommendation: extend the flow through Create Deal, Create Proposal, and Send Proposal, with completion redefined as customer-side "Proposal Viewed," not proposal creation. The ticket also needs a rewrite pass to remove implementation prescription (Shepherd.js/Intro.js, Zustand store, specific API endpoints) before it's dev-ready.

### 2. Activation Dashboard: Health Score Aligned to the Data (On Track)
Ticket: [86b9512kq — Activation Dashboard](https://app.clickup.com/t/86b9512kq) (already elevated to internal priority)

Compare the current health score logic against a directable, leading definition: a proposal viewed by a customer plus 3+ deals worked, within the first 30 to 60 days. Keep existing scope (CS Feedback Flag column, filters) moving as planned.

### 3. Dunning Recovery: Unpaid Invoice Banner + Expired Card Alert (On Track)
~28% of cancellations (~$4.6K MRR/month) are failed payments, not deliberate churn, recoverable with retries, card-update nudges, and grace periods. No product rebuild required. Keep both tickets staffed and resolve the Chargebee caching question blocking the Expired Card Alert.

### 4. Funnel Refill: Qualified Signup Volume (New, Discovery Tracking)
Provisioned signups are down to ~80 to 120/month with net base growth of ~5 to 10 subs/month. Retention is healthy; top-of-funnel is now the growth ceiling. This is a growth lever, not a core product build, tracked as discovery only. No current owner identified.

---

*Reference: [DripJobs Prototype Hub](https://dripjobsjeremy.github.io/dripjobs-prototypes/)*
