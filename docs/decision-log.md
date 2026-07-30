# Prototype Decision Log

Append a short entry after any session with a real design or scope decision. Newest entries at the top. Keep each entry to 2 to 4 lines: what was decided, why, and any open question left for Jeremy.

Format:

## [YYYY-MM-DD] Prototype name or feature
- Decision:
- Why:
- Open question (if any):

---

## [2026-07-30] Release Notes | July 2026: added to hub, sourced from ClickUp
- Decision: Built `release-notes-july-2026/` (index.html + Release_Notes_July_2026.md) matching June's exact structure and voice, and added its card to the Product Release Notes tab. Content was compiled from ClickUp's 5 July release tags (07-01 through 07-27, ~50 "pushed to production" tickets) rather than drafted from memory. Excluded single-tenant bug tickets (company name + account ID in the title) and internal-only ops tickets (Zapier payload cleanup, API key rotation, superadmin tooling) from the customer-facing copy. Also cut 2 drafted "Upcoming" teasers after confirming with Jeremy that they described internal CS/support tooling, not customer-facing features.
- Why: This repo has no ClickUp connection by default and the prior release-notes pages establish that customer-facing notes must reflect only genuinely customer-visible changes, not internal engineering housekeeping or one-off account fixes.
- Open question: None. Full excluded-ticket list with reasons was reviewed before publishing.

---

## [2026-07-30] HealthScore+ Lifecycle Status: synced with HealthScore Phase 1 UI updates

- Decision: Brought `dj-health-score-lifecycle/` up to date with the Phase 1 UI changes already reflected on the base HealthScore dashboard (per ticket 86b9512kq's QA Round 2 notes and the `company-activation-tracking-mockup/` restyle it was built from): renamed the page from "HealthScore" to "HealthScore+" (title, h1, proto banner) to distinguish this Lifecycle-extension prototype from the base dashboard; restyled the Export CSV button to the purple pill treatment; moved the "Show" entries selector out of the table toolbar into a floating-label pill next to a single "Clear All Filters" button (dropping the old separate "Clear All" text link, matching the "Move Show selector next to Clear All Filters, drop redundant Clear button" precedent); and removed the `[+]`/`[-]` collapse/expand toggle on the Integrations and Automations table column groups, which QA Round 2 flagged as a stale control after that requirement was removed (both groups now always render expanded, no toggle). Reorganized the flat filters grid into the same accordion pattern as the mockup (Search & Segment, Account Data, Integrations/Automations/Add-Ons) and added three new accordion sections unique to this prototype's own features: Account Lifecycle (Pause/Cancellation Reason), Login Data, and CS Flags.
- Why: This prototype forked from the pre-Phase-1 HealthScore layout, so it still had the old flat filter grid, gray Export CSV button, in-toolbar Show selector, and the now-removed column-group toggle. The bucketing of this prototype's own lifecycle/login/CS-feedback filters into three additional accordion sections (vs. cramming them into the existing three) wasn't specified and is flagged here as an assumption, consistent with how the original mockup flagged its own bucketing choice.
- Open question: Confirm the 3-extra-section bucketing (Account Lifecycle / Login Data / CS Flags) against however this actually lands in the real accordion-based production UI, since only the base 3 groups (Search & Segment, Account Data, Integrations/Automations/Add-Ons) are confirmed from the live screenshot — this prototype's lifecycle-specific groups are new territory.

---

## [2026-07-30] Shareable personal portfolio page added (`portfolio/`)

- Decision: Built a standalone `portfolio/index.html`, separate from the internal `index.html` hub, as a general-audience personal portfolio: short first-person intro, then a visual gallery of six hand-picked prototypes (Business Entity Records, Metrics AI Predictability, Proposal Expiration Enforcement, Jobs List Column Management, Job Costing Workbench, HealthScore+ Lifecycle). No ClickUp links or ticket references anywhere on the page. Each card uses a real Playwright screenshot of the live prototype (demo/proto-bar scaffolding hidden before capture) rather than an icon placeholder, styled with the marketing brand tokens (`#7C3AED` purple, `#0DCECE` teal, Nunito) since this is a marketing-style surface, not an in-app settings page. Not linked from the main hub yet.
- Why: Jeremy wanted a slick, modern, "not overwhelming" page shareable outside the team, distinct from the internal ClickUp-linked hub. Curation and framing (general portfolio, not job-search-specific) were his explicit choices via Q&A before building.
- Open question: none remaining. Resolved: Jeremy confirmed the page stays standalone, not linked from the main hub `index.html`. Resolved: added a LinkedIn link (topbar icon + footer text link) to https://www.linkedin.com/in/jeremywharrison/, no other contact links requested.

---

## [2026-07-29] Business Entity Records V1: clickable prototype built from PRD v1.4

- Decision: Built a full clickable prototype (`business-entity-records/`) covering the Businesses nav item + list, a New Business form (Legal Name required; DBA, multi-email/phone, Industry, Address, Billing Address with "same as Address" toggle, Display DBA toggle), a tabbed Business profile (all 12 tabs from the PRD), Contact list Business column + filter, Contact-to-Business association (one entity per contact), and the shared Business/Individual 2x2 selector demoed once in depth and reused across all four creation entry points (New Lead, New Appointment, New Proposal, Create Invoice) rather than building four full standalone wizards. Used the current-product app shell (Nunito, `#7C3AED` sidebar/topbar, matching `tasks-ui-refresh`) for chrome, and the design system's softer `#8B85EA` tokens for the Information tab, New Business form, and tab-chip pattern, per the CLAUDE.md guidance to split shell vs. in-page-settings coloring.
- Why: The PRD's own Open Items are unresolved (whether Deals/Proposals/Appointments/Invoices/Payments tabs get real aggregation or ship "coming soon"; whether Delete is blocked by open Deals/Jobs/Invoices; whether Call Business uses the entity's own phone or the Primary Contact's). Rather than silently picking one, the prototype populates the data tabs with sample "snapshot" rows (matching the confirmed contact-snapshot behavior from the dependency ticket) and visibly flags the Delete-block and Call Business behaviors with an amber "Assumption" badge tied to the PRD's Open Item numbers, so reviewers see exactly where the prototype is guessing.
- Open question: Same four items already tracked in the PRD's "Remaining Open Items Before Ticketing" table (owner: Jason / Jesus) — nothing new surfaced during the build.

---

## [2026-07-29] Customer Health Scoring training guide: naming update + color path confirmed

- Decision: Renamed every reference from "Activation Dashboard" to "HealthScore" throughout the training guide and its hub card, per Jeremy's note that the product name has been upgraded. Added an explicit "Naming Update" callout in Section 3 so readers who saw the old name aren't confused. Swapped the "See It Live" link from the local `dj-health-score-v2` prototype to the current testing site (`ali.dripjobs.com/companyactivationtrackings`). Also resolved the previously-flagged color-count open item: Jeremy confirmed the target is the 3-color Green/Yellow/Red system from Section 9, superseding the ticket QA note's 4-color (green/yellow/orange/red) direction. Updated the correlation table (High Risk now maps cleanly to Red, no asterisk) and replaced the "Flagged, Not Resolved" warn callout with a "Confirmed" success callout; removed the resolved question from the Open Items list.
- Why: Jeremy provided both updates directly in conversation as corrections to his own initial framing, not new open questions.
- Open question: None new. Inactive accounts still have no defined place in the confirmed 3-color model — carried forward as its own open item, separate from the now-resolved color-count question.

---

## [2026-07-29] Full hub sweep: "Activation Dashboard" → "HealthScore," chronology preserved

- Decision: Completed the naming sweep across the remaining hub surfaces, applying two different treatments by content type. **Evergreen/current** descriptions (things still true today, not a dated snapshot) were renamed directly to HealthScore with a "(formerly 'Activation Dashboard,' renamed Jul 29, 2026)" annotation on first mention: the Account Lifecycle card, the Accordion Filters mockup card and its prototype page/title/h1 (`company-activation-tracking-mockup/`), and `dj-health-score-lifecycle/`'s title/banner/h1. **Dated historical snapshots** (roadmap docs and the superseded v1.5 prototype) were left with their original "Activation Dashboard" wording intact throughout the body, since that's what it was accurately called at the time, and instead got exactly one added naming note near the top (or, for the v1.5 prototype's banner, an inline "Renamed HealthScore, Jul 29, 2026" tag) pointing forward to the new name: `cs-roadmap-jun20/` (Jun 20 snapshot), `product-roadmap-retention-response/` index and markdown source (Jul 8-10 snapshot), and `health-score/` (v1.5, the oldest surviving prototype iteration, superseded by v2 and the Lifecycle variant). The two Release Notes card blurbs on the hub for those roadmap docs got the same inline "(renamed HealthScore, Jul 29, 2026)" treatment as the other one-liners.
- Why: Jeremy asked for a full sweep but to preserve a chronological identifier, so dated/historical content isn't silently rewritten to imply the new name existed before it did, while current/ongoing material reads consistently under the new name.
- Open question: None. `docs/decision-log.md`'s own past entries (including the ones earlier today) were intentionally left untouched, since rewriting prior dated log entries would be the same kind of history-erasure this sweep was designed to avoid.

---

## [2026-07-29] DJ Health Score v2.0 prototype + hub card: renamed to HealthScore

- Decision: Followed up on the training guide's naming update by renaming the linked live prototype too: `dj-health-score-v2/index.html`'s `<title>`, banner strap, and `<h1>` now read "HealthScore" instead of "Activation Dashboard" (each noting "formerly 'Activation Dashboard'" once, on first mention). Updated that prototype's own hub card description to match.
- Why: Jeremy confirmed he wanted the rename applied to that card too, for consistency with the training guide.
- Open question: Three other hub entries still say "Activation Dashboard" and weren't touched in this pass — the Account Lifecycle extension card, the Accordion Filters + Show/Clear Restyle mockup card, and two Product Release Notes descriptions (CS Roadmap Jun 20, Retention & Churn Response). None were specifically called out, so left as-is; flag if a full hub-wide rename is wanted.

---

## [2026-07-29] Customer Health Scoring: training guide (pre-work for Aug 7 session)

- Decision: Built a new reading-guide page (`health-scoring-training-guide/`, ticket 86b9512kq) as CS training pre-work, combining the Green/Yellow/Red target framework from the Customer Team Guide (Section 9, pg. 12-13, uploaded as reference) with a correlation guide showing how to read the V1 Activation Dashboard's current six raw Health badges (Healthy, On Track, Warning, High Risk, Critical, Inactive) against that target. Used the "guide" template style (`tax-registration-number-help-guide/`) rather than the "prototype" or "changelog" templates, since this is reading content, not a UI mockup. Added as a `status-shipped` card under the Resources tab, not the main Prototypes pipeline grid.
- Why: Jeremy's Slack reply to Mary confirmed V1 intentionally ships with the original six status labels (Ali was already far into this round of dev; Jesus' call not to redirect mid-build) and asked for a "correlation training" bridging that build to the long-term 3-color goal. Cross-referenced ticket 86b9512kq directly (BR 12's own Health-badge-to-filter mapping, and the QA note deferring a "streamlined color-based ranking system") to build the crosswalk table accurately rather than guessing at the mapping.
- Open question: flagged in the guide itself, not resolved here. The ticket's QA notes describe a future 4-color system (green/yellow/orange/red) as the deferred direction, which doesn't match Jeremy's/Section 9's 3-color Green/Yellow/Red framing. Also open: whether/when the six-category relationship framework will ever feed the automated dashboard score (a related option, Prop. Viewed/Deals (90d), was evaluated and explicitly not adopted this pass), and whether this same doc covers what Nicole needs for her Aug 7 session.

---

## [2026-07-29] Activation Dashboard: accordion filters + Show/Clear restyle mockup

- Decision: Built a new mockup (`company-activation-tracking-mockup/`, no ticket given) of the live Activation Dashboard at ali.dripjobs.com/companyactivationtrackings, grouping its filters into the three collapsible sections shown in Jeremy's screenshot (Search & Segment [7], Account Data [8], Integrations/Automations/Add-Ons [3]), and restyling the table's "Show" entries selector plus the "Clear"/"Clear All Filters" buttons to match the floating-label pill pattern from the attached Proposals-tab reference screenshot (purple-bordered select with notched label, paired with a plain bordered "Clear" button).
- Why: no existing file in this repo had the accordion filter treatment shown in the live screenshot (closest sibling, `dj-health-score-v2/`, uses an always-expanded filter grid), so this is a new page rather than an edit to that prototype. The 18 filters were bucketed into the 7/8/3 groups by matching each filter's purpose to the screenshot's own subtitles ("always visible" vs. "deeper investigation" vs. "niche, low-frequency"); this bucketing wasn't specified and is flagged as an assumption both in-page and here.
- Open question: whether the compact "Clear" button next to "Show" should reset the same filter state as "Clear All Filters" (built that way here) or something narrower (e.g. just sort/search); also whether a ticket exists for this ask that should be linked on the hub card instead of "No Ticket."

---

## [2026-07-28] Proposal Expiration Enforcement & Re-Open Flow: new clickable prototype

- Decision: Built a new clickable prototype (ticket 86b2xn7hx) covering BR-1 through BR-12: expired-state enforcement in both the Proposal Builder (Edit/Send disabled, Re-Open available) and Customer Portal (signing disabled, expired message, content stays visible), the Re-Open modal, Activity Log entries, PDF export omission/inclusion of the Exp. Date field, and the Accepted-overrides-expiry edge case (BR-9). Jeremy provided live screenshots and narration of the existing Rejected Proposal flow (Customer Portal reject modal, the Rejected banner + Re-Open Proposal button in the Proposal Builder, pill badge behavior) so the Re-Open flow's modal, banner placement, and button could mirror that real pattern per BR-8, rather than being approximated.
- Why: BR-8 requires the Re-Open flow to mirror the existing rejected-proposal pattern exactly, and that pattern wasn't represented anywhere in this repo to copy from. Per CLAUDE.md's instruction not to guess at unspecified UI, paused and asked Jeremy for ground truth instead of approximating.
- Scope calls made explicit with Jeremy before building: (1) the "win-back opportunity" sub-flow shown in the rejected-proposal recording (customer requests reconsideration, pipeline tag) was intentionally not built here — it's specific to customer-initiated rejection reasons and isn't in this ticket's BRs; only the core Re-Open modal/banner/button pattern was mirrored, per BR-8's own scope ("consistent modal, language, and workflow behavior. No new interaction pattern is introduced"). (2) BR-11 (drip suppression) is annotated only, as a note on the Expired banner and in the Activity Log and Re-Open modal — no separate Deal/drip sequence UI was built, since the implementation mechanism is still an open feasibility question with Jason per the July 17 decision log comment on the ticket.
- Open question: None from this session. The ticket's own two flagged gaps carry forward unresolved: BR-11's exact suppression mechanism (skip-next-step vs. pause-sequence) and whether drip suppression lifts automatically on Re-Open (flagged as an unconfirmed assumption in both the ticket and this prototype's Re-Open modal).

## [2026-07-28] Metrics — AI Predictability: design system rework

- Decision: Reworked the ClickUp-attached prototype (ticket 86b9bmc1u, "Metrics Natural Language Insights") to match current design standards, then published it to the hub as `metrics-ai-predictability/`. Swapped every hardcoded marketing-brand purple `#7C3AED` for the in-app token `#8B85EA`, matching `design-system.md` and the existing `metrics-clickable-affordance` prototype (the only other Metrics Dashboard prototype in this repo, already on `#8B85EA`). Introduced `:root` CSS custom properties instead of hardcoded hex, per the design system's token pattern. Corrected five buttons using non-standard 20px/12px pill radii to the documented 999px scale value. Added the proto-bar. No content, copy, or business-logic changes.
- Why: The attachment used the marketing brand purple throughout, which is a hardcoded-hex anti-pattern per the design system, and doesn't match the established in-app token already used for this exact dashboard elsewhere in the repo. Confirmed the color swap and hub placement with Jeremy before executing, per the confirm-then-execute rule for anything beyond a single tweak.
- Open question: None. Noting the hub's top stat counters (Total/Triage/Needs PM Review/Postponed) remain the pre-existing stale figures flagged in the 2026-07-27 entry below; this session added one more "analysis"-status card without recomputing them, consistent with that already-flagged, unrelated data-hygiene issue.

## [2026-07-27] Hub: sync card status badges to ClickUp dev-stage statuses
- Decision: Cross-checked every hub card's linked ClickUp ticket against its actual current status and corrected 12 cards whose badge no longer matched (e.g. Customer Portal Documents was showing "Needs PM Analysis" but is actually "Ready for Dev"). Added four new badge/filter categories the hub didn't have before: Ready for Dev, In QA Testing, Pushed to Production, and Mixed Status. Mixed Status is used for the one card (Job Address + Column Management) whose 3 linked tickets are now at different stages — per Jeremy's call, rather than picking one ticket's status to represent the whole card.
- Why: The hub previously only had pre-dev badges (Triage, Needs PM Analysis, Needs Design, New, Postponed) with no way to reflect a ticket that has moved into or through development. Several tickets have shipped to production or reached Ready for Dev/QA without the hub reflecting it.
- Open question: The top stats row (Total Prototypes / Active Triage / Needs PM Review / Postponed) was already stale before this session (shows 17 total vs. 24 actual cards) and wasn't touched here since it's a pre-existing data-hygiene issue unrelated to ClickUp status sync, not a design decision. Flagged for Jeremy to decide whether to make it dynamic (JS-computed) or keep it as a manually maintained figure.

## [2026-07-27] Customer Portal Documents: PDF-only reversal + clickable file names
- Decision: Updated the customer-portal-documents prototype for ticket 86b7p31xb's Jul 27 revision: removed the earlier DOC/DOCX/JPG/PNG upload simulation (PDF only again), and made uploaded file names clickable in Settings, opening a preview labeled with the document's clean original file name.
- Why: Jeremy's Jul 27 ticket comment explicitly reversed the file-type expansion and added a new Admin View & File Naming business rule; the prototype (last built against the Jul 20 version) needed to catch up to both changes.
- Open question: None.

## [2026-07-24] QBO Connected screen: field helper text
- Decision: Replaced the hover-only "i" tooltip icons on Income/Expense and Invoice Sync Date with always-visible helper text, and added the same treatment to Tax Code and Tax Rate, which previously had no explanation at all.
- Why: Follow-up to ticket 86b8nxcm2. Consistent with the static-helper-text decision already made for the sync toggles on this same page, and the bare `title` attribute tooltip doesn't reliably show on tap/touch.
- Open question: None.

## [2026-07-24] Jobs Schedule Calendar — Crew Leveling (ticket 86barp4zu)
- Decision: Built a clickable prototype demonstrating crew-ordered rows on Day, 3 Day, and Month views, with a prototype-only "current sort vs. crew-leveled" toggle for before/after comparison and a reorderable Crew Settings reference panel that live-updates the calendar. Month view uses compact colored-dot single-line entries instead of full swimlane cards, per the ticket's own recommendation to treat Month as a distinct layout, not a shrunk Week view. Also fixed a pre-existing hub bug: the `status-design` badge class was used by two other cards but had no CSS rule and no filter chip, so it rendered unstyled and wasn't filterable; added both since this card also needs them.
- Why: The ticket explicitly asked for a design pass on Month view before dev, and flagged an assumption (in-crew sort order unchanged) and a gap (deactivated/deleted crew handling undefined) that aren't safe to guess at, so both are called out as alert banners in the prototype rather than silently resolved.
- Open question: How jobs assigned to a since-deactivated/deleted crew should sort (as unassigned, or something else) is unresolved per the ticket's own flagged gap; recommend walking that scenario in production before finalizing.

## [2026-07-22] CSV Import for Products & Services (V1 prototype)
- Decision: Built a 3-step wizard (Upload → Review & Resolve → Done) with no column-mapping step, since the ticket specifies fixed required/optional columns rather than flexible header mapping like the Production Rates import. Category-name matching in the preview is shown as exact-match only (no case/whitespace fuzzy matching implemented).
- Why: The ticket explicitly flags "CSV contains a Category value that differs only in casing or trailing whitespace" as an edge case needing a defined matching rule, and flags the file size/row-count limit as an assumption pending confirmation against the existing Contact import limit. Neither was specified, so the prototype demonstrates exact-match category creation and omits a stated size cap rather than inventing either rule.
- Open question: Confirm the category dedup rule (exact vs. case-insensitive/trimmed match) and the file size/row limit before this moves to dev-ready.

## [2026-07-22] QBO Initial Connect and Sync: helper text
- Decision: Added static helper text (12px, muted, per the design system's Helper text spec) under each sync toggle on the Initial Connect modal, and under "Stop Syncing Invoices If Deposit is Zero" on the Connected screen, rather than a hover-tooltip icon like the Income/Expense field uses.
- Why: ClickUp 86b8nxcm2 asked for helper text explaining the sync toggle tradeoff and the zero-deposit setting; static text is always visible and doesn't rely on hover/discovery the way the existing info-icon tooltip pattern does.
- Open question: None.

## [Template entry, delete once real entries exist]
- Decision: Example, chose a 3-step wizard instead of 5 for the X flow.
- Why: Hick's Law, original 5-step version front-loaded too many decisions before showing value.
- Open question: None.
