# Prototype Decision Log

Append a short entry after any session with a real design or scope decision. Newest entries at the top. Keep each entry to 2 to 4 lines: what was decided, why, and any open question left for Jeremy.

Format:

## [YYYY-MM-DD] Prototype name or feature
- Decision:
- Why:
- Open question (if any):

## [2026-08-12] HealthScore v2.8: No Activity filter rebuilt as a boolean "since signup" check, 14-day floor

- Decision: Replaced the v2.6 No Activity filter (three time-windowed options, gated on zero Active Users + a synthetic recency field) with a single toggle: an account matches if it's 14+ days old and has never had an Estimate Sent, Deal Created, or Proposal Viewed. Dropped Active Users from the check entirely (it's a headcount, not a recency signal — a 1-2 user account isn't inherently inactive). Added a real `dealEverCreated` boolean field (reusing `estimateSent`/`propViewed` as-is) and a visible "Deal Created" row in Engagement Signals so the check isn't based on hidden data. Added a "Limited History" note to every Legacy account's Engagement Signals section, since Deal Created and Proposal Viewed are structurally untracked (`null`) for all Legacy accounts, not just ones that happen to match this filter — confirmed this matters in testing when a Legacy account with 7 Active Users and 120 Contacts still matched the filter, flagged by one missing signal alone.
- Why: Worked through this with Jeremy across several turns before building: (1) time-windowed buckets required a data signal (last-deal-recency) that doesn't exist in production, while "has this ever happened" is a much simpler ask; (2) Active Users measures team size, not engagement, and would have produced false positives on small-but-active accounts; (3) young accounts need a minimum-age floor so "hasn't done anything yet" (day 2) isn't conflated with "hasn't done anything ever" (day 400); (4) Legacy accounts' incomplete signal coverage needed a visible caveat, not silent under- or over-flagging.
- Open question: Whether "ever sent/created/viewed" is actually obtainable as a boolean from the real event tables needs engineering confirmation, as does whether 14 days is the right floor (chosen as a reasonable placeholder here, not from usage-pattern analysis). Whether Legacy accounts' missing history should eventually be backfilled, or whether "Limited History" is the permanent state for those accounts, is also unresolved.

## [2026-08-12] HealthScore v2.7: Copy icon extended to Company Name and Primary Contact Name

- Decision: Per Jeremy's direct request, extended the Copy-to-clipboard affordance from v2.6 (Business Rule 16 covered only Phone and Email) to also cover Company Name (drawer header) and Primary Contact's Name field, using the same icon/checkmark-confirmation pattern. Refactored the copy button markup into a shared `copyBtn()` helper reused by both the header and the detail rows.
- Why: Direct request, not sourced from ticket 86bb90q17; a scope addition on top of the ticket's confirmed rules rather than a correction to them.
- Open question: None.

## [2026-08-12] HealthScore v2.6: Primary Contact, No Activity filter, Copy affordance

- Decision: Ticket 86bb90q17 was updated with three new confirmed rules (Business Rules 14–16), incorporating Tanner's feedback via Eli. Built a Primary Contact section in the Account Details panel (directly below Company Info) backed by a new synthetic per-account user roster and a `getPrimaryContact()` resolver (oldest Admin, falling back to oldest user of any role, or a "No Contact Available" placeholder if zero users); a new single-select "No Activity" filter in Search & Segment (30 Days/90 Days/to Date, accordion count 8→9); and Copy-to-clipboard icons on Phone/Email with a checkmark-flash confirmation, hidden when the value is missing.
- Why: Direct ticket update dated today; all three rules were already fully confirmed in the ticket text (no open items blocking build), so implemented as written.
- Open question: Two gaps carried forward exactly as the ticket itself flags them (not new ones I'm raising): (1) the No Activity filter's three windows need a real time-bound activity signal from engineering, since Active Users/Deals(90d) don't natively support 30-day and lifetime variants — this prototype's `lastDealDaysAgo` field is a demo-only stand-in, not a proposed data model; (2) the Copy affordance's checkmark-flash treatment is a new small UX pattern, not a confirmed reuse — no other page in this hub has a working copy-to-clipboard example, even though `docs/design-system.md` names a `.copy`/`data-value` hook. Worth a design pass on both before this goes further than a prototype. Separately (not a ticket item, caught in QA): the synthetic email-domain generator originally concatenated company-name words directly, which could spell unintended substrings across word boundaries (e.g. a name ending in "...s" followed by "Experts"); fixed by joining words with a hyphen instead.

## [2026-08-07] HealthScore (health-score/): Branch accounts now carry real linked-family data

- Decision: Jeremy reported the Branch icon (v2.2) was confusing since Parent and Child roles were assigned independently at random with no data connecting a specific Child to its Parent. Replaced that with real branch families: a new `assignBranchFamilies()` pass builds 45 families (1 Parent, 1–3 Children each, weighted 60/30/10) and cross-links them by tenant ID and name. Added a "Branch Relationship" section to the Account Details panel showing the specific linked account(s) by name, each clickable to jump straight to that account (Parent shows up to 3 child names plus "+N more"; Child shows its one parent). Grid icon tooltips now name the linked account(s) too.
- Why: Jeremy's direct feedback that the feature was confusing as shipped; confirmed the fix should cap the displayed list rather than showing an unbounded number of children.
- Open question: None.

## [2026-08-07] HealthScore (health-score/): ticket 86bb90q17 updated again; reconciled with the separately-merged Green/Yellow/Red change

- Decision: Ticket 86bb90q17 was revised with two more confirmed rules (simplified 3-tier Health display, Branched Accounts filter) after a v2.2 update had already shipped. While implementing them, found that `main` had independently picked up a v2.3 change (a direct Jeremy request in another session, ahead of Aug 7 CS training) that displayed the Health badge as literal Green/Yellow/Red text, sourced from the CS Strategy Playbook, not from this ticket. The ticket instead specifies On Track/Needs Attention/At Risk as the display text, matching the existing Health Status filter. Surfaced the conflict directly rather than silently picking one; confirmed to go with the ticket's wording. Rebuilt the branch from the current `main` (the prior PR had already merged) and applied: the Metrics Bar's On Track/Needs Attention/At Risk cards (replacing Healthy/High Risk/Critical), the Health badge label reconciliation, a new Branched Accounts filter, and a Branch icon restyle from outlined glyph to solid color chip for better at-a-glance contrast per the ticket's updated UX note.
- Why: Two independent sessions modified overlapping display logic from different source documents; reconciling required a direct decision on which label scheme wins, since both were legitimate asks just from different sources.
- Open question: `health-scoring-training-guide/index.html` was rewritten in the other session specifically to describe the color-name badge (and removed its six-state explainer section on that basis). It's now stale again since the badge reverted to tier-name text. Flagged in `health-score/CHANGES.md`; needs a follow-up pass on the training guide, out of scope for this session.

## [2026-08-07] Training guide: removed the "reading the six labels" section, Inactive is the sole open item

- Decision: Removed the training guide's Section 4 ("Reading the Six Labels as Green / Yellow / Red") entirely, per Jeremy's call that this translation exercise is no longer needed now that the Health badge displays the color directly. Its "Inactive sits outside the 3-color scale" note moved into Section 3 (right after the trigger table); its "Two Different Health Scores Coexist" caution moved into Section 4, "Putting It Into Practice" (formerly Section 5). The dropped filter-wording table/callout (Health filter still uses On Track/Needs Attention/At Risk wording, not color names) wasn't carried forward, since that's a minor UI lag not worth its own callout anymore. Renumbered all subsequent sections and cross-references (TOC, "see Section N" mentions) accordingly. Open Items (now Section 5) leads with Inactive, flagged as the one remaining unresolved piece of the color model.
- Why: Jeremy confirmed the six-vs-three-color reading exercise is resolved and asked for the section to reflect that only Inactive's outreach-language question remains open.
- Open question: None from this session; Inactive's outreach language (Section 5, item 1) and the guide's other pre-existing open items (six-category framework timeline, Nicole's material, Super Admin access) carry forward unresolved.

## [2026-08-07] HealthScore v2.3: Health column displays 3-color model; training guide follow-up

- Decision: Per Jeremy's direct request, `health-score/index.html`'s Health column now displays the confirmed Green/Yellow/Red model instead of the six raw trigger labels (Healthy/On Track &rarr; Green, Warning &rarr; Yellow, High Risk/Critical &rarr; Red; Inactive stays its own grey state). Added a `healthColor()` helper; the original six-state label is preserved as a hover tooltip. Display-only: `computeHealth()`, the $10k/A2P filters, the Health filter's four options, and sort order are untouched. Updated `health-score/CHANGES.md` (new v2.3 entry) and the page's own version banner/info-note to match. Also updated `health-scoring-training-guide/index.html`: removed the ali.dripjobs.com "live testing site" references (that build was taken down for dev rework; the guide now says today's training runs off this repo's prototype only), and removed the "6-status vs. 3-color discrepancy" framing throughout Sections 2&ndash;4 since the badge itself now shows the color directly. Section 4 was reframed from a "correlation guide bridging two systems" to a note that only the Health filter's option labels (not the badge) still use the old four-way wording.
- Why: Jeremy confirmed both changes directly in this session ahead of the Aug 7 training: the old testing-site build no longer exists, and the color-vs-status gap the guide previously described as unresolved has been closed by this prototype update.
- Open question: None from this session. The guide's Section 6 open items (six-category framework timeline, Inactive outreach language, Nicole's material, Super Admin access enforcement) carry forward unresolved.

## [2026-08-07] Customer Health Scoring training guide: aligned to HealthScore v2.2

- Decision: Updated `health-scoring-training-guide/` (Section 3) to describe the current live build: the 10-column grid plus per-account Account Details drawer (v2.1, confirmed by ticket 86bb90q17), and the new Branch Account icon (v2.2). Added a second ticket badge (86bb90q17) to the hero and footer, updated the footer's stale "v2.0" reference to v2.2, and added Business Rule 11 (Super Admin access enforcement) as a fourth open item for the Aug 7 session.
- Why: The guide was written against an earlier build and hadn't caught up to `health-score/`'s v2.1/v2.2 changes (grid reduction, drawer, branch icon) documented in `health-score/CHANGES.md`. Friday's training is explicitly focused on this alignment.
- Open question: None from this session; the guide's existing Section 6 open items (six-category framework timeline, Inactive-state language, Nicole's material) carry forward unresolved, now joined by the Super Admin access question.

## [2026-08-07] HealthScore (health-score/): confirmed requirements from ticket 86bb90q17

- Decision: Removed two v2.1 features that ticket 86bb90q17 moved out of scope: the green "$" high-value-account marker and the "Health, Status & A2P fields last calculated" precomputed note. Added a new Branch Account icon (purple for Parent, teal for Child) next to the company name in the grid and Account Details panel, backed by a new `branchRole` field on about 9% of generated accounts. Confirmed the existing 10-column grid and 5-section drawer already match the ticket's Business Rules 3 and 4, so left both untouched.
- Why: The ticket formalized post-launch feedback into explicit business rules; two prior additions were reversed by PM direction (Aug 5 and Aug 6, 2026) and one new rule (Branch Account icon, Business Rule 12) needed building.
- Open question: Business Rule 11 (Super Admin-only access, blocking direct URL entry for non-Super-Admin sessions) is a real auth/routing requirement that this static prototype can't demonstrate. Flagged in the page copy and in `CHANGES.md`; needs implementation at the application layer, not in this mockup.

## [2026-08-06] Activation Dashboard vs. HealthScore: un-merged back into two reports
- Decision: Built a new prototype (`activation-vs-healthscore-split/`) demonstrating Activation Dashboard and HealthScore as two separate Super Admin nav items again, reversing the earlier `health-score/` decision (v2.1) that renamed and merged Activation Dashboard into HealthScore. Activation Dashboard now tracks only new accounts against the 90-day / $10K + A2P milestone; HealthScore carries Green/Yellow/Red status for every account past activation (legacy accounts always, new accounts once their window closes), per Section 9 of the CS Strategy & Playbooks doc. The prior combined `health-score/` version was left untouched and is still linked from the hub and the new prototype's top bar, in case the merge is preferred after review.
- Why: Session-long discussion with Jeremy confirmed new business rules that only make sense as two reports: Red = missed the 90-day activation window, Yellow = activated but flagged for CS follow-up, and ongoing promotion/demotion (Yellow↔Green) is driven by Platform Engagement signals that don't apply to the 90-day countdown at all. Cramming both into one page hid that these are different questions (pace against a deadline vs. ongoing health).
- Open question: Whether the automated Yellow→Green/Red promotion logic should stay scoped to Platform Engagement only (as prototyped) or eventually pull in the other four CS-doc categories (Support Services, Billing, Social Media, Advocacy) as CS tooling matures; flagged to Jesus for PM review.

---

## [2026-08-05] HealthScore (health-score/): metric cards restyled to icon/label/description/button-left, value-right layout

- Decision: Restyled the 6 metrics-row cards (Total Accounts, Active Subscriptions, Healthy Accounts, High Risk, Critical, Prop. Viewed) to match the horizontal card format Jeremy referenced (a screenshot matching the "SALES" KPI cell pattern already used in `metrics-ai-predictability/index.html`): emoji icon + colored uppercase label and description stacked on the left, a "View details →" pill button below them, and a large bold value vertically centered on the right. Kept each card's existing semantic accent color (purple/green/amber/red) applied to its label, value, and button instead of making everything purple like the single reference example, since these 6 cards represent different states that the color-coding already communicated. Removed the old left-border color stripe since the new text/button coloring carries that signal instead. The "View details" button has no separate click handler — it relies on bubbling up to the card's existing `onclick="filterByCard(...)"` so clicking it filters once, not twice.
- Why: Jeremy supplied a screenshot and asked for the value-to-the-right layout "like we do in the metrics cards format."
- Open question: None.

---

## [2026-08-05] HealthScore (health-score/): fixed non-green $ marker, removed "recalculates nightly" from the live page

- Decision: Two fixes. (1) The high-value-account marker used the 💲 emoji, which rendered in its default (non-green) color on Jeremy's system since CSS `color` doesn't reliably override full-color emoji glyphs across platforms; switched to a bold text "$" character styled with `color:#059669`, which is guaranteed to render green everywhere since it's plain text, not an emoji sprite. (2) Removed "· recalculates nightly" from the in-page "Precomputed" note near the table — that exact phrase had already been dropped from CHANGES.md and the ClickUp ticket in an earlier session turn, but the live prototype copy itself was never updated to match; the note now just says fields were "last calculated Aug 5, 2026 6:00 AM" without asserting a specific refresh cadence.
- Why: Jeremy reported the $ wasn't rendering green, then flagged that the nightly-cadence copy should have been removed from the page itself too, not just the docs/ticket.
- Open question: None.

---

## [2026-08-05] HealthScore (health-score/): green dollar-sign marker for high-value accounts

- Decision: Added a green 💲 emoji to the right of an account's name when Plan = Advanced AND 3 or more of its 4 Add-Ons (Production Rates, Job Costing, Text Messaging, Jobi AI) are Yes. Shown in both the main table's Company Name cell and the Account Details drawer's company name header, driven by one shared `isHighValueAccount()` helper so both stay in sync. Has a hover tooltip ("Advanced plan with 3+ Add-Ons") for clarity. 114 of 1,400 generated accounts currently qualify.
- Why: Jeremy asked for this directly.
- Open question: None.

---

## [2026-08-05] HealthScore (health-score/): every generated account now has a Plan

- Decision: The mock data generator previously left `plan` as `null` for any inactive account and for ~22% of active new (non-legacy) accounts, showing as "No Active Plan" / a dash. Per Jeremy's correction that this can't happen in the real system, every account now gets a plan regardless of subscription status: legacy accounts keep the 55/45 Advanced/Pro split, new accounts always get Pro (Advanced stays legacy-only, matching the existing "Advanced — Legacy" filter label). Removed the now-impossible "No Active Plan" option from the Plan filter and simplified its matching logic accordingly.
- Why: Jeremy said this state wouldn't happen in the real system and asked for every account to have a plan.
- Open question: None. Verified across all 1,400 generated accounts: zero have no plan, and zero non-legacy accounts have "Advanced."

---

## [2026-08-05] HealthScore (health-score/): moved Plan again, from top snapshot into Company Info

- Decision: Superseding the immediately prior entry — moved Plan out of the drawer's top snapshot strip and into the "Company Info" section instead (placed after Account Type, before Created).
- Why: Jeremy asked for this placement directly, right after the previous move.
- Open question: None.

---

## [2026-08-05] HealthScore (health-score/): moved Plan into the Account Details drawer's top snapshot, renamed "Plan & Add-Ons" to "Add-Ons"

- Decision: Moved the Plan badge out of the drawer's "Plan & Add-Ons" section and into the top snapshot strip (alongside Health, Subscription, Total Sales, A2P Status, Days Rem., OBCSS Owner), placed right after Subscription. Renamed the now-Plan-less section from "Plan & Add-Ons" to "Add-Ons" (still holds Production Rates, Job Costing, Text Messaging, Jobi AI).
- Why: Jeremy asked directly to move Plan to the top and rename the section.
- Open question: None.

---

## [2026-08-05] HealthScore (health-score/): "Status" column renamed to "Subscription" to match its filter

- Decision: The grid column and Account Details drawer both labeled this field "Status" while its accordion filter was labeled "Subscription" — same underlying field (`c.sub`, Active/Inactive), two different names. Renamed the column header and drawer label to "Subscription" to match the filter, rather than the reverse, since "Status" would clash with the adjacent "Health Status" filter and "A2P Status" column (both already using "Status" for a different concept), while "Subscription" is unambiguous. Re-measured the column's natural minimum width for the new, longer header text and widened it from 72px to 112px (no cell overflow, verified across all 1,400 rows); bumped the table's own `min-width` floor from 1085px to 1125px to match.
- Why: Jeremy asked directly for the column and filter to use matching titles.
- Open question: None.

---

## [2026-08-05] HealthScore (health-score/): removed plan pricing from the Plan filter dropdown

- Decision: Removed "($97/m)" and "($147/m)" from the Plan multi-select filter's option labels ("Pro ($97/m)" → "Pro", "Advanced — Legacy ($147/m)" → "Advanced — Legacy"). Filter values/behavior unchanged.
- Why: Jeremy asked directly. This resolves the open question flagged in the 2026-08-05 "removed plan/billing revenue" entry above, about whether the no-revenue-on-this-page intent extended to these filter labels too.
- Open question: None.

---

## [2026-08-05] HealthScore: dropped the "precompute cadence" open item

- Decision: Removed the "Precompute cadence" open item (the note that the prototype's "recalculates nightly" copy is a placeholder, not a proposed SLA) from `health-score/CHANGES.md` and from ClickUp ticket [86bb90q17](https://app.clickup.com/t/86bb90q17)'s "Open items for PM review" list, per Jeremy's direct instruction. Also simplified the ticket's and CHANGES.md's v2.1 description of the "Health last calculated" note to drop the same caveat language, rather than just relocating it elsewhere in the same documents.
- Why: Jeremy asked directly to remove it.
- Open question: None. (Earlier dated entries above that reference this same open item — the original v2.1 build and the ClickUp-ticket-creation entries — were left untouched, consistent with this log's own convention of not rewriting prior dated entries.)

---

## [2026-08-05] HealthScore hub card: fixed broken GitHub link

- Decision: The card's "GitHub" button pointed to `github.com/DripjobsJeremy/DJ-HealthScore-v1.5`, a separate external repo that 404s (confirmed via curl: old URL returns 403/not found, likely private or deleted). Changed it to `github.com/DripjobsJeremy/dripjobs-prototypes/tree/main/health-score`, matching the pattern already used by the sibling `dj-health-score-v2` and `dj-health-score-lifecycle` cards, which correctly link into this same repo's folder rather than an external one. Confirmed the new URL returns 200.
- Why: Jeremy reported the 404 directly.
- Open question: None.

---

## [2026-08-05] HealthScore (health-score/): trimmed oversized column widths

- Decision: Measured the true minimum content width needed per column (header label + sort icon vs. the longest possible cell value, rendered in isolation to avoid the table's own `width:100%` auto-layout masking the real numbers) across all 1,400 generated accounts. Most columns were already close to their real minimum (some, like Total Sales and A2P Status, are technically tighter than their true worst-case content but rely on `table{width:100%}` distributing extra space, which is safe and not worth changing). Three columns had genuine excess and were trimmed: Created (88px→86px), Health (90px→88px), OBCSS (130px→120px, the longest name "Alexis Calderon" only needs ~117px). Also tightened the table's own `min-width` floor from 1180px to 1085px to match the new column-width sum instead of carrying an arbitrary buffer from the original v2.1 rebuild.
- Why: Jeremy asked to remove unnecessary column space directly. Verified with a full-dataset scan (all 1,400 rows, every column) that no cell overflows its new width and no horizontal scroll is introduced at normal viewport widths.
- Open question: None.

---

## [2026-08-05] HealthScore (health-score/): follow-up ClickUp ticket created for the v1.8–v2.1 UX rework

- Decision: Created ticket [86bb90q17](https://app.clickup.com/t/86bb90q17) in DripJobs Product Management > V1 > Active Triage, status "Needs PM Analysis," summarizing this session's full v1.8–v2.1 changes (accordion filters, plan/billing revenue removal, 34→10 column grid reduction + Account Details drawer, Export CSV page-scoping, Show/Clear restyle, column alignment/accounting format, HealthScore rename) so PM can review whether/how to formalize them against the original ticket 86b9512kq. Added the new ticket as a second `ticket-link` on the hub card (`index.html`), preserving the original 86b9512kq link rather than replacing it, matching the existing multi-ticket-link pattern already used on the "Job Address + Column Management" card.
- Why: Jeremy asked directly for a ClickUp ticket and a hub card link. Flagged to him first that ticket creation is normally out-of-scope for this repo per CLAUDE.md (meant to stay in the DripJobs PM Claude Project); he confirmed to proceed here.
- Open question: None from this task. The ticket itself carries forward 3 open items already flagged across this session's earlier decision-log entries (the 10-column bucketing, precompute cadence, and Details-drawer section completeness) for PM to weigh in on.

---

## [2026-08-05] HealthScore (health-score/): renamed page title/h1 from "Activation Dashboard" to "HealthScore," hub card updated to "HealthScore 2.1"

- Decision: Renamed the `<title>`, proto-banner strap, and `<h1>` in `health-score/index.html` from "Activation Dashboard" to "HealthScore," keeping a "(formerly 'Activation Dashboard,' renamed Jul 29, 2026)" annotation on first mention in the banner rather than dropping the history outright. Updated the hub's card title (`index.html`) from "DJ Health Score v1.5" to "HealthScore 2.1" to reflect both the name and the file's actual current version. Left the card's `data-name` search keywords, status badge, and external GitHub link untouched since none were part of this request.
- Why: Jeremy asked for both renames directly. This supersedes the 2026-07-29 sweep's decision to leave this specific file's body wording as "Activation Dashboard" (it had been treated as a historical/superseded snapshot at the time), since the file has since been actively developed through v1.6-v2.1 and Jeremy is now asking for the current name directly.
- Open question: None.

---

## [2026-08-05] HealthScore (health-score/): table columns left-aligned, Total Sales formatted as accounting

- Decision: Column headers were defaulting to center alignment (the browser default for `<th>`) while body cells were left-aligned (the browser default for `<td>`), so headers didn't line up with the data below them. Added an explicit left-align to all headers to match. Total Sales is the one exception: it's now right-aligned (header and cells) with tabular-nums, and its dollar figures show two decimal places with thousand separators (e.g. "$3,507,872.00" instead of "$3,507,872"), matching standard accounting-number convention.
- Why: Jeremy asked directly for left-aligned columns and accounting-formatted Total Sales.
- Open question: None.

---

## [2026-08-05] HealthScore (health-score/): Show selector + Clear All Filters restyled to floating-label pill pattern

- Decision: Restyled the "Show [n] entries" page-size control into the floating-label pill (`.show-field`) already used in `company-activation-tracking-mockup/` and `dj-health-score-lifecycle/` — purple-bordered select with a notched "Show" label and custom chevron — paired with a plain bordered "Clear All Filters" button, dropping the old separate "Clear All" text link from the filters card header. Per Jeremy's follow-up, kept both controls in their existing table-toolbar location (right of "All Company Data") rather than moving them up next to the filter accordion like the mockup does. Colors adapted to this page's own hardcoded `#7C3AED` accent instead of the mockup's `#8B85EA` token, consistent with prior sessions on this file.
- Why: Jeremy supplied a screenshot of the target pill/button styling directly; the placement correction came from his own follow-up during the same turn.
- Open question: None.

---

## [2026-08-05] HealthScore (health-score/): Export CSV scoped to the current page only

- Decision: Export CSV's row count now matches whatever is currently visible on-screen (the active page at the current "Show" page size), not the full filtered result set. Changing Show to 50, paging to page 2, or setting Show to "All" all update the export count to match exactly what's displayed.
- Why: Jeremy asked for this directly — export was previously exporting every filtered row regardless of pagination.
- Open question: None.

---

## [2026-08-05] HealthScore (health-score/): v2.1, grid cut to health-relevant columns + per-account Details drawer, per Slack thread (Jason/Rick/Mary)

- Decision: Rebuilt `health-score/index.html` around a Slack thread flagging three problems: the grid was slow, most of its 34 columns aren't things anyone scans, and Jason noted fewer than 10 fields actually drive `computeHealth()`. The grid is now 10 columns (Tenant ID, Company Name, Type, Created, Health, Status, Total Sales, A2P Status, Days Rem., OBCSS) plus a "Details" link per row/click-row that opens a slide-over drawer containing everything that used to be a column: Industry/Account Age, Engagement Signals (Active Users, Contacts, Est. Sent, Last Est., Prop. Viewed, Deals 90d), Plan & Add-Ons, Integrations, and Automations. Dropped two redundant columns in the process: $10K (folded into a colored/badged Total Sales cell) and A2P Applied (A2P Status already covers it). Added a static "Precomputed" note near the table ("Health, Status & A2P fields last calculated Aug 5, 2026 6:00 AM · recalculates nightly") to visually address Rick's concern that these should be batch-computed, not computed live — the real precompute architecture is a backend decision outside this mockup. Also fixed a pre-existing bug surfaced while rewriting the Days Rem. cell: inactive, non-legacy accounts (`daysRemaining === null`) rendered literally as red "nulld" text; now renders as a dash like legacy accounts do. All 18 existing filters (including ones for fields that now only live in the drawer, like Integrations/Add-Ons/Contacts) were left completely unchanged, since filtering doesn't require the column to be rendered. `computeHealth()` itself was not touched. Removed the now-unnecessary two-row sticky header (group coloring + Integrations/Automations `[+]`/`[-]` expand toggle) since there's only one column group left.
- Why: Jeremy asked for recommendations based on the Jason/Rick/Mary Slack thread, then asked to build it as v2.1. Mary's stated CS use case (pulling a full adoption snapshot right before a call) maps directly onto the Details drawer rather than needing those fields rendered for all 1,400 rows on every load, which is what Jason's own proposed fix (a details page/drawer per account) was aiming at.
- Open question: The exact 10-column health-relevant set (which fields "count" beyond `computeHealth()`'s literal 5 inputs — Type, Created, Total Sales, A2P Status, Days Rem. — versus identity/ownership fields like Company Name, Tenant ID, OBCSS) wasn't specified by Jason beyond "less than 10," so this is this session's best-guess bucketing, flagged here the same way the original accordion-filters mockup flagged its own bucketing. Also unconfirmed: whether the real precompute cadence should actually be nightly, or some other interval — the note's copy is a placeholder to demonstrate the concept, not a proposed SLA.

---

## [2026-08-05] HealthScore (health-score/): removed plan/billing revenue, per Jason's post-launch feedback

- Decision: Removed all plan/billing dollar figures from `health-score/index.html` per Jason's feedback that total revenue should not show on this page. Renamed the "Plan & Billing" column group to "Plan" (colspan 2 → 1), removed the "/Month" column entirely (header, row cells, and its sort case), removed the monthly-billing sum from the totals row (that cell is now blank under "Plan"), and removed the "Total Plan Rev. (visible)" metric card (Metrics Bar is now 6 cards instead of 7). Also removed the now-dead `planCost`/`PLAN_COSTS` data generation and sort-value code entirely rather than leaving it unused. The Plan name/badge column and its filter are unchanged, only dollar amounts were removed. "Total Sales" (the tracked company's own deal revenue, not DripJobs' subscription revenue) was left untouched since it's a different metric than what Jason flagged.
- Why: Jeremy relayed Jason's explicit instruction that total revenue should not be visible on this dashboard; the four concrete asks (header rename, remove /Month, remove totals-row calc, remove metric card) map directly to every place monthly plan revenue appeared.
- Open question: The Plan multi-select filter's option labels still show list pricing for reference ("Pro ($97/m)", "Advanced — Legacy ($147/m)"). That wasn't called out in the four explicit asks so it was left as-is, but flagging in case Jason's "no revenue on this page" intent extends to those labels too.

---

## [2026-08-05] HealthScore (health-score/): added accordion collapse filtering, per Jason's post-launch Phase 1 feedback

- Decision: Reorganized `health-score/index.html`'s flat 18-filter grid into the same three collapsible accordion sections already established elsewhere in this repo (`company-activation-tracking-mockup/`, and `dj-health-score-lifecycle/`): Search & Segment (7, open by default), Account Data (8), Integrations/Automations & Add-Ons (3, both collapsed by default). All existing filter IDs, multi-select components, session-storage persistence, and `applyFilters()`/`clearAllFilters()` logic were left untouched, this is a pure layout/grouping change, not a filtering-logic change. Fixed a clipping bug found while testing: the accordion section wrapper's `overflow:hidden` (needed for the collapsed rounded-corner clip) was also clipping the custom multi-select dropdown panels (Industry, OBCSS, Plan, etc.) when a section was open, added `overflow:visible` on `.acc-section.acc-open` to fix. Kept the page's existing hardcoded `#7C3AED` marketing-purple accents for the new accordion icons/count badges rather than introducing the softer `#8B85EA` in-app token used by the mockup and Lifecycle variant, since this file already uses `#7C3AED` throughout (buttons, active metric cards, badges) and mixing two purples on one page would be inconsistent. Bumped the page to v1.8 and added a short "what's new" line.
- Why: Jeremy relayed Jason's post-launch feedback asking for the collapse filtering already prototyped in `company-activation-tracking-mockup/` to be applied to the live HealthScore dashboard mockup. Defaulting Search & Segment open (others collapsed) matches that section's own subtitle copy ("always visible, used on nearly every search") and is the same default behavior already shipped in the Lifecycle variant.
- Open question: None from Jason's feedback directly. Same as the original mockup's own flagged assumption: whether the static 7/8/3 header counts (total fields per section) is the wanted badge behavior versus a dynamic "N active" count, carried forward unresolved since it wasn't specified here either.

---

## [2026-08-04] Metrics — DripSense, updated for BR-9 correction + Stale Results Indicator (ticket 86b9bmc1u)
- Decision: Confirmed the panel's existing refresh behavior already matched the corrected BR-9 (period changes never auto-run insights; only a manual "Run Insights" click regenerates; stale results keep displaying under their original run-period label), so no logic change was needed there. Rebuilt the stale-results notice to match the new UX / UI Considerations section: replaced the old full-width banner + separate "Re-run" button with compact helper text positioned directly under the Run Insights button, using the ticket's suggested copy verbatim ("You've changed the date range. Run insights again to recalculate for this period."), and it now disappears via that same Run Insights button rather than a dedicated re-run action. Also fixed a gap where switching the date filter back to the already-run period left the old hint visible; it now explicitly hides on a match too.
- Why: The ticket's newest decision-log comments correct BR-9 and add an explicit AC for helper text "near the Run Insights button," so the placement and copy needed to match, not just the underlying regenerate-on-manual-trigger-only behavior.
- Open question: None.

---

## [2026-08-04] Metrics — AI Predictability, updated for ticket 86b9bmc1u revision (DripSense)
- Decision: Reworked the AI Predictability panel's demo logic to match the ticket's full BR-1 through BR-11 rewrite (renamed DripSense in ClickUp, kept the existing "AI Predictability" UI label here since that rename wasn't confirmed for this surface, flagged below). Comparison-basis tags on all 5 insight cards are now driven uniformly by the selected date filter (BR-2), including the Aug 4 correction that Last Wk/Last Mo are complete calendar-anchored periods with no elapsed-time caveat (BR-4 exclusion). Added: milestone framing for the "All" period instead of a delta headline (BR-3); a headline suppression state when the elapsed-time or 70% confidence gate isn't met, demoable via a new "Early In Period" toggle (BR-8); a distinct "No meaningful change" card for Appt → Proposal Rate with no explanatory language (BR-11, the other Aug 4 decision); and a "Suppress Closing Ratio" demo toggle showing the pre-Jan 14 2025 suppressed-comparison edge case (BR-10) as a dashed/muted card, visually distinct from both the no-change card and the generic no-data placeholder. Also fixed a latent bug while in there: the range-change notice's innerHTML rewrite was destroying its own nested `#range-notice-range` node, throwing null on the second notice.
- Why: The ticket's Aug 4 decision-log comments explicitly call out BR-11 (no-change) and the BR-2 Last Wk correction as the newest changes, but the panel as built still reflected the pre-revision ticket (only a color/token restyle had been done since). Rebuilding the comparison-basis and gating logic was necessary to make the ticket's business rules demonstrable rather than just described.
- Open question: Whether the panel/section label should be renamed from "AI Predictability" to "DripSense" per the ticket rename, since that wasn't confirmed this session, kept the existing name as the safer default.

---

## [2026-08-04] Metrics — AI Predictability, renamed to DripSense
- Decision: Resolved the open naming question above — renamed all user-facing panel/section labels (page title, proto-bar title, section eyebrow, panel header title, collapsed-bar summary, never-run/no-data copy) from "AI Predictability" to "DripSense" to match the ClickUp ticket rename. Also updated the matching card name on the hub landing page (`index.html`) and its search keywords. Left the file path/folder (`metrics-ai-predictability/`) and the public portfolio page (`portfolio/index.html`) untouched, since renaming the path would break the existing shared prototype URL and the portfolio entry is a separate public-facing deliverable not tied to this ticket.
- Why: Jeremy confirmed the rename directly.
- Open question: None.

---

## [2026-08-04] Active Company Toggle: Billing Confirmation, updated for ticket 86bb85q08 revision
- Decision: Ticket added Business Rules 7-9: after Confirm, show a one-time on-screen reminder to notify Billing, with copy that differs by direction ("Company activated. Please notify Billing of this change." / "Company deactivated. Please notify Billing of this change."). Replaced the prior generic green success toast with a distinct amber reminder toast (reusing the `settings-alert--warn` color tokens, not the success-green ones) carrying a bell icon and a manual "Got it" dismiss button, plus a 6s auto-fade fallback. Nothing is logged, tracked, or persisted; dismissing just removes the DOM node, matching AC8's "does not persist after dismissal."
- Why: The ticket is explicit that this reminder is a distinct instruction to the user (not a "saved successfully" confirmation), so it needed visually different treatment from a routine toast, and a deliberate dismiss action rather than only relying on a timed fade, since it's asking the user to go do something outside the app.
- Open question: None new. Same backend-persistence-timing question noted in the original entry below still applies.

---

## [2026-08-04] Active Company Toggle: Billing Confirmation, built from ticket 86bb85q08
- Decision: Built `active-company-confirmation-modal/`, a clickable prototype replicating the existing Company Settings > Company Information > Admin Controls page (from the provided screenshot) and adding a confirmation modal on the "Active Company" toggle. Clicking the toggle in either direction optimistically flips it, then opens a modal with the exact required message ("This impacts billing and requires manager approval. Are you sure you want to do this?"); Cancel reverts the toggle to its prior state, Confirm keeps the change and shows a toast. Modal header text ("Turn On/Off Active Company") is dynamic based on direction, purely for prototype clarity during demo since both directions use the same required message; this is a minor addition beyond the ticket's literal text, flagged here per scope-discipline guidance rather than added silently.
- Why: The ticket explicitly defers the "super admin permission tier" alternative to V2, so the modal applies uniformly regardless of role, with no new gating introduced. Reused the existing `.toggle-switch`/`.modal-overlay`/toast patterns already established elsewhere in this repo instead of inventing new component styling.
- Open question: None from the ticket. Whether the toggle change persists immediately (as modeled here, matching "the toggle currently performs the action immediately on click" in the problem statement) versus only on the page's main Save button is a backend behavior question outside this prototype's scope.

---

## [2026-08-03] Super Admin: Connect Branches, built from ticket 86b2uvyy7 (rework of a 2024 draft)
- Decision: Built `super-admin-branch-connect/`, a clickable prototype for the Super Admin "Connect Branches" flow, replacing today's fully manual process (Laura messages TJ in Slack, TJ connects accounts and syncs Branch Admin access on the backend). Access point is nested inside Super Admin > Tenants per the ticket's current nav (no standalone "Branches" item exists). Two entry points feed one wizard: an unscoped "Connect Branches" toolbar button (parent chosen via the same search pattern as Tenants search, satisfying AC2) and a per-row kebab action that pre-selects that row as Parent (matching the ticket's own UX example). The wizard shows existing branch connections before adding new ones (AC7), blocks/tags accounts already connected to a different parent instead of letting them be reselected (rule 5), supports adding multiple branches before confirming (rule 4), and a success toast confirms the connection plus the automatic Branch Admin access sync (rule 6, 8). A "Branch Group" viewer (opened from a purple pill on connected rows) shows the parent/branches and a sample ongoing sync log entry to demonstrate rule 9 (access extends automatically on later Branch Admin assignments) without building a full RBAC screen. A dashed-border, clearly-labeled "Prototype demo control" toggle previews the sync-failure notification (edge case / AC10), since that state can't otherwise be triggered from a static prototype.
- Why: Business rules 8 and 9 (initial and ongoing Branch Admin access sync) and the sync-failure edge case are core acceptance criteria, not incidental, so they needed a visible home in the prototype; the Branch Group viewer and demo-only failure toggle exist for that reason, not as scope creep. Disconnect/reassign was left out per the ticket's own Out of Scope / V2 note.
- Open question: The ticket flags an unresolved assumption: branch groups connected before this ships won't be auto-migrated into the new ongoing sync unless reconnected through this screen. Not addressed in the prototype since it's a backend/migration decision, not a UI question, flagged here per the ticket's own request for confirmation.

---

## [2026-07-31] Stripe Instant Payouts: built from ticket 86b62np7t
- Decision: Built `stripe-instant-payouts/`, a clickable prototype for connected accounts to request Instant Payouts of a paid invoice's proceeds. Placed the "Get Paid Instantly" capability directly on the invoice's payment context (matching the ticket's "instant payout option on an associated invoice" AC), with a persona toggle to also show a lightweight admin summary (volume, fee revenue, per-account table) rather than a full dedicated reporting tab, since the ticket explicitly marks a filterable Payments/Earnings reporting tab as out of scope/V2. Modeled all four eligibility states called out in the ticket (eligible, no eligible payout method, approaching daily limit, daily limit reached) plus the fee-disclosure-before-confirm step, min/max ($0.50-$9,999 US) and available-balance validation, and both success and simulated-failure outcomes via the dashed "Prototype Controls" panel (same pattern as `send-test-email-drips`).
- Why: The ticket's own business rules and acceptance criteria are unusually thorough (17 business rules, 6 edge cases, 10 ACs) and already flag several open gaps, so the prototype follows that document closely rather than inventing new scope.
- Open question: The ticket flags the actual convenience fee amount as TBD pending a business decision; this prototype uses Stripe's own baseline 1% platform fee (from the Pricing section of the dev doc) purely as a placeholder to demonstrate the disclosure UI, not as a proposed rate. Also unaddressed here, per the ticket's own noted gap: refund/dispute clawback handling on funds already paid out instantly, and whether payout confirmations should also send via email/SMS (Postmark/Twilio) versus in-app only.

---

## [2026-07-31] Proposal Builder mobile section list: fixed jumbled text-wrap bug
- Decision: Built `proposal-builder-mobile-fix/index.html`, a high-fidelity before/after mockup fixing a reported mobile bug where the proposal builder's section list (Hero Image, Trust Builders, Client Notes, About Us) wrapped titles and descriptions one word per line. Fix: let the text column take its full share of row width and truncate an overly long title/description to one line with an ellipsis, rather than a fixed narrow column that force-wrapped every word.
- Why: The user-supplied mobile screenshot showed the text column constrained far narrower than the row's available space; the comparison Misc Documents screenshot showed the same settings page already truncates long filenames on one line instead of wrapping, so the fix reuses that existing pattern rather than inventing a new one.
- Open question: No ticket was provided for this fix. This mockup only addresses the text-column layout shown in the screenshot, it doesn't touch the drag-and-drop reordering behavior already prototyped separately in `proposal-section-order-dragdrop`. If the real production bug has a different root cause, flag it back.

## [2026-07-31] Weekly Prod Roadmap tab: refreshed against live ClickUp status/comments, not just last week's snapshot
- Decision: Rewrote `cs-roadmap-jun20/index.html` (the "Weekly Prod Roadmap" tab, iframed into `weekly-product-update/index.html`) by pulling current status and recent comments for every tracked initiative rather than assuming last week's snapshot still held. Moved "Bulk Archive Booking Requests" out of NOW into a new SHIPPED section (added a 4th stat tile and reused the `pill-shipped`/`shipped-grid` CSS that already existed but was unused). HealthScore V1 Expansion moved from "Test In Progress" to "QA Round 5" per Jeremy's latest comment; its three login-tracking sub-tickets are now "Ready for Dev" (PM analysis completed Jul 16) so the redundant standalone "Needs PM Analysis" card for that same combined ticket was removed from NEXT. QuickBooks Integration Improvements corrected from "Testing Ready" to "In Progress" — ClickUp shows it's still blocked on a QuickBooks sandbox account. Multiple Phone/Email/Address on Contacts updated from "reworking QA kickback" to "56/56 tests passed, landing final polish items." Renamed "Activation Dashboard" to "HealthScore" throughout per the Jul 29 product rename, keeping a naming-note banner since the underlying ClickUp ticket titles still say "Activation Dashboard." Save & Reuse Packages in Proposal Builder corrected to "Needs PM Analysis" (ClickUp's actual current status) rather than repeating last week's "Design in Progress, actively being refined," since no comment activity since early July supports that framing.
- Why: The prior version was carried forward without checking whether NOW items had shipped or changed status, which is how "Bulk Archive Booking Requests" ended up listed as in-progress in the same week it actually shipped (confirmed via the release-2026-07-27 tag used for the Weekly Product Update tab).
- Open question: None.

---

## [2026-07-31] Weekly Product Update: refreshed for Jul 27-31, sourced from ClickUp, hub card date fixed
- Decision: Pulled the 12 tickets tagged `release-2026-07-27` (status "pushed to production") from the DripJobs Development V1 > Active Development list and rewrote `weekly-product-update/index.html` and `Weekly_Product_Update.md` into 10 customer-facing cards across 6 sections (Proposal Builder, Sales Pipeline, Job Costing, Text Messaging, Integrations, Admin Settings). Two tickets were tenant-reported bugs with the company name and tenant # in the ClickUp title (Roots Painting substrate measurement revert, Smart Painting Colours text error banner); both were generalized into feature-level bug descriptions with all customer-identifying info stripped, rather than excluded outright, since the underlying defects are general product bugs, not one-off data issues. Combined 3 Zap payload-cleanup tickets (Find Most Recent Deal or Job, Move Job, Job Costing Completed) into a single card to avoid three near-identical internal-plumbing entries. Excluded 2 tickets closed in the same window but not tagged `release-2026-07-27`: one resolved without a fix, one with no release tag (looked like a later release). Also fixed the hub's Weekly Product Update card subtitle in `index.html`, which was still reading "Jul 13 – Jul 17, 2026" from two updates ago even after the page content had already moved to Jul 20-24 last week.
- Why: Same ClickUp-sourcing approach as the July 2026 Release Notes precedent (2026-07-30 entry above); the hub card date is a separate literal string from the page's own hero/title and has to be updated in the same pass or it silently goes stale, which is exactly what happened last week.
- Open question: None.

---

## [2026-07-30] Send Test Email for Drips: built from ticket 86bb67g73 + live screenshots
- Decision: Built `send-test-email-drips/` around the real Edit Drip drawer and Preview Email panel, which Jeremy screenshotted live from the app mid-session and which superseded any earlier assumptions about that surface. Placed the new "Send Test Email" action directly beside the existing "Preview Email Drip" link in the Email section header (the one place a drip's email content is edited, satisfying the ticket's "Edit Drip panel, Email delivery method section" requirement without needing a second surface). Reused the existing Preview Email panel's exact visual style (docked left panel, company mark, white card, footer address) for the "what was sent" confirmation, styled with a red "TEST" ribbon and a "[TEST]" subject prefix so it's never confused with the real preview. Confirm step shows the destination account email as a read-only pill (no input field, per the no-free-text-recipient rule) rather than a full form. Added a dashed-border "Prototype Controls" toggle (matching the `proposal-expiration-enforcement` precedent) to simulate the no-valid-email edge case on demand, since that state can't be reached by clicking through the happy path.
- Why: A screenshot of the current UI was provided mid-session, which per the design workflow doc is ground truth over any guessed layout; the sample data (Sparrow's Nest Painting, salesperson "Smith", the {view-request-button} rendering as "Schedule Appointment") was pulled directly from that second screenshot rather than invented, so the keyword-substitution behavior in the test-send preview matches what the real Preview Email feature already renders.
- Open question: Confirm actual placement is right, next to "Preview Email Drip" was the minimal-scope choice, not confirmed against a real design for this specific action. Also flagging for review (per the ticket's own Communications Impact Check): whether the test-send path shares Postmark rate limits/queue with live drip sends.

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
