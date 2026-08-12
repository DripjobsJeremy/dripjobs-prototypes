# HealthScore Dashboard — Change Log

Prototype: `health-score/index.html` · Parent ticket [86b9512kq](https://app.clickup.com/t/86b9512kq) · Ticket [86bb90q17](https://app.clickup.com/t/86bb90q17)

This log covers changes taking the prototype from v1.7 through v2.12. v1.7 to v2.1 were driven by post-launch feedback from Jason, Rick, and Mary in Slack, plus several direct follow-up requests; v2.2, v2.4, and v2.6 implement the confirmed business rules formalized in ticket 86bb90q17 (added across three rounds as the ticket was updated); v2.3 was a direct follow-up request from Jeremy ahead of the Aug 7 CS training, made in a separate session, and is partially superseded by v2.4 (see below); v2.5 is a direct follow-up fix from Jeremy on the Branch Account feature added in v2.2; v2.7 through v2.11 are direct follow-up requests reworking the No Activity filter beyond what ticket 86bb90q17 originally specified; v2.12 is a copy fix unrelated to the No Activity work. Full rationale for each change lives in the repo's `docs/decision-log.md`; this file is a scannable summary.

---

## v2.12 — Fixed inaccurate Export CSV alert copy

Jeremy flagged that the Export CSV button's confirmation alert claimed "Full engagement/plan/integration detail exports separately from each account's Details panel" — that's not true. The Details panel has no export control at all, just a close button; that data is viewable per-account but was never exportable from there.

- Reworded the alert to state the actual limitation instead of a nonexistent capability: engagement/plan/integration detail is not included in the CSV export, and is only visible per-account in the Details panel today (no export claim attached to it).
- Not built: an actual per-account export from the Details panel. That would be a real feature addition, not a copy fix, and wasn't requested — flagged here in case it's wanted as a follow-up.

## v2.11 — Added a tooltip icon next to the No Activity toggle button, with a much faster reveal

Direct follow-up: the v2.9 toggle button relied on a native `title` attribute for its explanation, which gives no visual hint that a tooltip exists and pops up on the browser's own (slow, ~700&ndash;1500ms) delay.

- Added a small purple "i" icon (`.tooltip-icon` inside `.tooltip-wrap`) next to the button, so the explanation is visually discoverable instead of a hidden hover-only affordance. Reuses the icon-in-a-circle idiom already established in `tax-registration-number/index.html`'s `.tooltip-icon`/`.tooltip-pop` pattern rather than adding a new one or pulling in Font Awesome (which this page doesn't otherwise load) for the FA-based variant used in `notifications-ux/index.html`.
- New `.tooltip-pop` bubble fades in on `:hover` in ~80ms (CSS `transition`), replacing the native `title`'s browser-controlled delay entirely — removed the `title` attribute from the button so there's exactly one tooltip source, not two competing ones.
- Tooltip copy is unchanged from the old `title` text (14-day floor, three-signal rule), just relocated to the new bubble.

## v2.10 — Corrected the "not backfilled" vs. "never tracked" distinction for legacy accounts

Jeremy flagged that the v2.8 "Limited History" note overstated the gap: it read as "Deal Created and Proposal Viewed aren't tracked for legacy accounts," implying those signals are permanently blind for legacy. The real situation is narrower: historical data wasn't backfilled, but new Deal/Proposal activity on a legacy account since this HealthScore release is tracked exactly like it is for any other account.

- **Data model fix**: `propViewed` and `dealEverCreated` no longer default to `null` unconditionally for every Legacy account. Both now run the same random roll used for New accounts; a `true` result stays `true` for Legacy accounts too (real, current signal), and only a "no signal" result becomes `null` for Legacy (can't distinguish "genuinely never" from "happened before the unbackfilled cutoff"). In the current dataset this gives 240 of 602 Legacy accounts a real Proposal Viewed signal and 164 a real Deal Created signal, rather than all 602 being permanently dashed.
- **Note text corrected** to: historical data "wasn't backfilled before this release," a dash means "missing history, not confirmed inactivity," and "any new deal or proposal activity on a legacy account since release is tracked and shown here." Removed the inaccurate "aren't tracked for legacy accounts" phrasing entirely.
- **Effect on the No Activity filter**: fewer false positives on Legacy accounts, since accounts with a real post-release signal now correctly clear the filter instead of being flagged purely because that signal was previously hardcoded blind for all Legacy accounts.

## v2.9 — No Activity filter changed from a select to a toggle button

Direct follow-up: Jeremy flagged that the "All / No Activity Since Signup" `<select>` from v2.8 was confusing — with only one real "on" state, the dropdown made "All" look like it was being weighed against a category instead of just being the off switch.

- Replaced the `<select>` with a toggle `<button>` (`No Activity Since Signup`), styled after the existing active/pressed state already used by the Metrics Bar cards (`filterByCard()`'s highlighted-border treatment) rather than inventing a new on/off visual. Click to filter, click again to clear.
- Underlying logic is unchanged from v2.8 (`noActivitySinceSignup()`, 14-day floor, three-signal OR check) — only the control type changed, from a `<select>`'s `.value` to a `noActivityFilterOn` boolean flipped by `toggleNoActivityFilter()`.
- The button's full-sentence phrasing ("Show accounts with no activity since signup") lives in its hover tooltip; the visible label is the shorter "No Activity Since Signup," per Jeremy's call that the full sentence was too long to sit inline with the other short filter chips.
- `clearAllFilters()` and `filterByCard()` (the Metrics Bar card click-to-filter shortcuts) both reset the button's active state along with every other filter, same as before.

## v2.8 — No Activity filter rebuilt: boolean "since signup" check with a 14-day floor, replacing time-bucketed windows

Direct follow-up request from Jeremy reworking the No Activity filter added in v2.6. Two problems with the original approach came up in discussion: Active Users is a headcount, not a recency signal, so it didn't actually belong in an activity check; and the three time-windowed options (30/90/to-date) required a synthetic recency field (`lastDealDaysAgo`) that doesn't map to anything trackable today. The simpler fix: three real, already-existing boolean signals, checked since signup, with an age floor so brand-new accounts aren't flagged just for being new.

- **Filter is now a single toggle** ("No Activity Since Signup") instead of three windowed options. An account matches when it's **14+ days old** (`NO_ACTIVITY_MIN_AGE_DAYS`) **and** has never had an Estimate Sent, a Deal Created, or a Proposal Viewed (`noActivitySinceSignup()`, replacing `hasNoActivity()`). This is an OR across the three signals (any one of them ever happening clears the account), not the old AND-of-zero-counts logic.
- **New `dealEverCreated` field** (boolean, `null` for legacy accounts) replaces the removed `lastDealDaysAgo` proxy: `true` immediately if `dealsNinety>0`, otherwise a smaller independent chance of having had a deal outside the 90-day rolling window. Reuses the existing `estimateSent` and `propViewed` fields as-is for the other two signals — no new fields needed for those.
- **Active Users removed from the check entirely**, per the discussion above: it's a seat count, not an activity-recency signal, and including it would have falsely flagged small-but-genuinely-active accounts.
- **New "Deal Created" row** added to the Account Details panel's Engagement Signals section (next to the existing "Deals (90d)" rolling count), so the boolean this filter runs on is visible, not just implied.
- **"Limited history" note added to Engagement Signals for every Legacy account**, not just ones matching the filter: Deal Created and Proposal Viewed are `null`/untracked for all Legacy accounts (a pre-existing data-model fact, not new to this change), so a Legacy account can get flagged based on the Estimate Sent signal alone. Verified this in testing: a Legacy account with 7 Active Users and 120 Contacts (clearly real usage) still matched the filter because Estimate Sent was "No" and the other two signals were dashes, not confirmed zeros. The note exists specifically so CS doesn't read a Legacy match as more certain than it is.
- **Not built, flagged for engineering** (same category of gap as v2.6's, just now precisely scoped): "has an Estimate/Deal/Proposal event ever happened" is a much lower lift than a last-occurred date, but it still isn't the same as data already displayed elsewhere on this page today — needs confirming with whoever owns the underlying event tables before this goes further than a prototype.

## v2.7 — Copy icon extended to Company Name and Primary Contact Name

Direct follow-up request from Jeremy: extend the Copy affordance introduced in v2.6 (Business Rule 16, which only covered Phone and Email) to the Company Name in the drawer header and the Name field in the Primary Contact section, in the Account Details slide-over. Not a ticket 86bb90q17 requirement; a scope addition on top of it.

- Refactored the copy-button markup out of `copyRow()` into a shared `copyBtn(value,label)` helper so the same icon/confirmation behavior could be reused outside a `.detail-row` context.
- Company Name in the drawer header (`.details-company-name`) now gets a Copy icon next to the branch icon (when present); the header was switched to a flex layout so the name, branch icon, and copy button line up on one baseline.
- Primary Contact's Name row now uses `copyRow()` like Phone and Email, instead of rendering as a plain non-copyable row.

## v2.6 — Ticket 86bb90q17 update: Primary Contact, No Activity filter, Copy affordance

Ticket 86bb90q17 was updated again (Aug 12, 2026) to incorporate Tanner's HealthScore feedback (via Eli), adding three new confirmed business rules.

- **Primary Contact section (Business Rule 14)**: new section in the Account Details panel, directly below Company Info, showing the account's oldest Admin user's Name/Phone/Email. New `genUsers()` generates a small synthetic user roster per account (0–6 users; ~3% of accounts get zero users, to exercise the empty state), and `getPrimaryContact()` resolves it: oldest Admin by `dateCreated`, falling back to the oldest user of any role if no Admin exists, or `null` if the account has no users at all (rendered as a "No Contact Available" placeholder). A small number of generated users are missing a phone or email on file, to exercise that edge case too.
- **No Activity filter (Business Rule 15)**: new single-select filter in Search & Segment (30 Days / 90 Days / to Date; accordion count 8→9). An account matches when it currently has zero Active Users and zero Deals within that window. ⚠️ **Flagged, per the ticket's own Business Rule 15 gap note**: the existing Active Users (point-in-time) and Deals (90d, rolling) fields can't natively support three distinct windows, so a new synthetic `lastDealDaysAgo` signal was added purely to make the three filter options behave differently from each other in this prototype. This does not resolve the underlying gap the ticket flags for engineering; it's a prototype-only stand-in so the UX can be reviewed. Since `activeUsers` is only ever `0` for currently-inactive accounts in this data model, the filter in practice only ever surfaces Inactive accounts, consistent with the ticket's stated goal (accounts that signed up and never engaged).
- **Copy Contact affordance (Business Rule 16)**: Phone and Email in the Primary Contact section each get a Copy icon (reusing the `.copy` / `data-value` hook name documented in `docs/design-system.md`); clicking copies the value via `navigator.clipboard` (with an `execCommand` fallback) and flashes a checkmark for ~1.3s as confirmation. A missing phone or email hides its Copy icon rather than copying a blank value. No click-to-call or click-to-email behavior was added, per the ticket's explicit V1 scope. **Flagged**: no working copy-to-clipboard example existed elsewhere in this hub to reuse; the design system doc names the hook but no live page demonstrates it, so this is a new small visual pattern, not a confirmed reuse. Worth a design pass to confirm the checkmark-flash treatment before this goes further than a prototype.

## v2.5 — Branch accounts now carry real linked-family data

Jeremy flagged that the Branch icon (added in v2.2) was confusing: a Parent and a Child each got an independent random role with no data connecting a specific Child to its Parent, so there was no way to tell which accounts belonged together.

- **Replaced independent random role assignment with real branch families.** `generateCompanies()` now calls a new `assignBranchFamilies()` pass after generating all 1,400 accounts: it builds 45 families, each with 1 Parent and 1–3 Children (weighted 60%/30%/10%), and cross-links them by tenant ID and name (`branchParent` on a Child, `branchChildren` on a Parent). No account can belong to more than one family. This produced 45 Parents and 72 Children in the current dataset, consistent with v2.2's original ~9% branch-account proportion.
- **Account Details panel gets a new "Branch Relationship" section** (only rendered for Branch accounts): a Parent shows "Child Accounts (N)" listing up to 3 child names (then "+N more"); a Child shows its one Parent's name. Every name is a clickable link (`openDetails()`) that jumps straight to that account's own details panel, so a CS rep can walk an entire branch family without leaving the drawer.
- **Grid icon tooltip now names the specific linked account(s)** instead of a generic "Parent branch account" / "Child branch account, linked to a parent" string, so even a quick hover in the grid (without opening the drawer) answers "linked to what?"
- No change to the icon's visual treatment, sort behavior, or filter behavior (including the v2.4 Branched Accounts filter, which still just checks whether `branchRole` is set).

## v2.4 — Ticket 86bb90q17 update: simplified Health tiers, Branch filter, and a label reconciliation

Ticket 86bb90q17 was revised again after v2.2 shipped, adding two more confirmed business rules. Applying them surfaced a conflict with v2.3, which had been built in a separate session from a different source (a CS Strategy Playbook / training-guide alignment request), not from this ticket.

- **Simplified the Health display to 3 tiers.** The Metrics Bar's "Healthy Accounts," "High Risk," and "Critical" cards are replaced with **On Track** (green), **Needs Attention** (yellow), and **At Risk** (red), mapped via the existing `healthCategory()` helper (Healthy/On Track → On Track, Warning → Needs Attention, High Risk/Critical → At Risk). Inactive accounts are excluded from all three cards. The grid's Health column and the Account Details panel use the same mapping and now show only the three tiers plus a separate grey Inactive badge. Metrics Bar stays at exactly 6 cards. This only changes what's displayed; `computeHealth()` and the column's sort order are untouched.
- **Reconciled the Health badge's label text with the ticket and the existing filter wording.** v2.3 (previous session) had changed the Health badge to display the literal words Green/Yellow/Red, with the original six-state value in a hover tooltip, sourced from a CS Strategy Playbook / training-guide alignment request unrelated to this ticket. Ticket 86bb90q17 instead specifies **On Track / Needs Attention / At Risk** as the display text, matching the existing Health Status filter's option labels. Surfaced this conflict directly; confirmed to go with the ticket's wording. Removed the `healthColor()` helper (now redundant with `healthCategory()`) and rewrote `hBadge()` to display the tier name, reusing v2.3's `h-green`/`h-yellow`/`h-red`/`h-inactive` CSS classes for color (no CSS change needed). The hover tooltip showing the raw six-state value was dropped along with the color-name text, since it doesn't apply once the badge shows the tier name.
- **Flagged, not fixed**: `health-scoring-training-guide/index.html` was rewritten in the v2.3 session to specifically describe the color-name badge ("the badge itself now shows the color directly") and to remove its six-state-to-three-color explainer section on that basis. This page no longer matches that description, and the guide needs a follow-up pass; out of scope for this session, which only touches `health-score/`.
- **Added a "Branched Accounts" filter** to the Search & Segment accordion section (All / Branched Only / Not Branched), per the ticket's updated Business Rule 13. Filters on the `branchRole` field added in v2.2.
- **Restyled the Branch icon** from a small outlined glyph into a solid filled color chip: purple for Parent, teal for Child, since the ticket's updated UX note called for the two to be "clearly differentiable from each other at a glance, not just on close inspection."

## v2.3 — Health column displays the confirmed 3-color model (superseded by v2.4, see above)

- **Health column now renders Green / Yellow / Red instead of the six raw trigger labels**, in both the main grid and the Account Details panel: Healthy and On Track both display as Green, Warning as Yellow, and High Risk and Critical both display as Red (no separate orange tier), matching the CS Strategy Playbook's Section 9 target model one-for-one. Inactive still renders as its own grey state, outside the three-color scale, since it's a subscription status rather than an engagement level.
- The original six-state label (Healthy, On Track, Warning, High Risk, Critical, Inactive) is preserved as a hover tooltip on the badge, so the underlying trigger reason isn't lost, just no longer the primary read.
- **Display-only change**: `computeHealth()`'s two-signal calculation (Total Sales + A2P), the $10k filter, the A2P filters, the Health filter's four options (On Track / Needs Attention / At Risk / Inactive), and sort order are all unchanged. New `healthColor()` helper does the six-to-three mapping; the CSS badge classes `h-healthy`/`h-on-track`/`h-warning`/`h-highrisk`/`h-critical` were replaced by `h-green`/`h-yellow`/`h-red` (`h-inactive` unchanged), since `hBadge()` was their only consumer.
- Not built: renaming the Health filter's four options or the metrics-bar cards (High Risk, Critical) to match the new color terminology. Neither was requested; flagged here so a future pass doesn't have to rediscover the inconsistency.

## v2.2 — Ticket 86bb90q17 confirmed requirements

Ticket 86bb90q17 formalized the v2.1 rework into confirmed business rules and added a few new ones. Most of v2.1's work matched the ticket as written and needed no changes; three things did.

- **Removed the green "$" high-value-account marker** (Advanced plan plus 3+ Add-Ons), added in an earlier v2.1 follow-up session. The ticket's Out of Scope / V2 section drops it entirely per PM direction after discussion with Mary (Aug 6, 2026), to avoid CS de-prioritizing accounts based on lower monthly revenue alone. `isHighValueAccount()`, `highValueMark()`, and the now-unused `addonCount()` helper were removed from the script.
- **Removed the "Health, Status & A2P fields last calculated" precomputed note** near the table. The ticket's Out of Scope / V2 section drops this entirely per PM direction (Aug 5, 2026): no note, badge, or refresh-cadence commitment is in scope. The `.calc-note`/`.calc-badge` CSS was removed along with the markup.
- **Added a new Branch Account icon** (Business Rule 12): any account that is part of the existing linked-account/branch-switching relationship now shows a small icon to the right of its name, in both the main grid and the Account Details panel. A purple branch icon marks a Parent account; a teal corner-arrow icon marks a Child account. Backed by a new `branchRole` field (`'parent' | 'child' | null`) on ~9% of the 1,400 generated accounts (about 3.5% parent, 5.5% child). No grouping, sort, or filter change: a branch account still sorts and filters exactly like any other account, per the ticket's explicit instruction.
- Confirmed but unchanged: the 10-column grid (Business Rule 3) and the 5-section Account Details drawer with its exact field groupings, including a standalone Add-Ons section (Business Rule 4), already matched the ticket. The Plan field already only ever generates "Pro" or "Advanced," never blank (Business Rule 10), and the Plan filter already only offers those two options.
- **Flagged, not built**: Business Rule 11 (Super Admin-only access, enforced against direct URL entry) is a real access-control requirement for the eventual build, not something a static HTML prototype can meaningfully demonstrate. Left as-is (the page's existing "Super Admin View" labeling) and noted in the page's info-note and in `docs/decision-log.md` rather than faking a login gate.

## v2.1 — Grid reduction + Account Details drawer

The core rework. Jason's Slack feedback: the page was slow, most of its 34 columns aren't things anyone scans, and fewer than 10 fields actually drive the Health score. Rick flagged that Health should be precomputed, not calculated live. Mary explained CS needs the fuller dataset when pulling up one specific account before a call, not across all accounts at once.

- **Grid cut from 34 columns to 10**: Tenant ID, Company Name, Type, Created, Health, Status, Total Sales, A2P Status, Days Rem., OBCSS — the fields that actually feed `computeHealth()`, plus identity/ownership context.
- **New "Account Details" slide-over drawer**: click any row (or its "Details ›" link) to see everything that used to be a column — Industry, Account Age, Active Users, Contacts, Est. Sent, Last Est., Prop. Viewed, Deals (90d), Plan, Add-Ons, Integrations, Automations — loaded per-account instead of rendered for all 1,400+ rows on every load.
- **Two redundant columns folded in**: $10K became a badge on the Total Sales cell; A2P Applied was dropped since A2P Status already covers it.
- **"Precomputed" note added** near the table signaling Health/Status/A2P fields come from a scheduled batch job (recalculates nightly), not live computation.
- **Removed** the two-row sticky header and the Integrations/Automations `[+]`/`[−]` expand toggle, since only one column group remains.
- **Fixed a pre-existing bug**: inactive, non-legacy accounts were rendering "nulld" in the Days Rem. cell; now shows a dash like legacy accounts do.
- All 18 existing filters and `computeHealth()` itself were left untouched.

## v1.9 — Removed DripJobs plan/billing revenue

Per Jason's explicit feedback that total revenue shouldn't be visible on this page:

- "Plan & Billing" column group renamed to "Plan"; the "/Month" price column removed entirely (header, cells, sort logic).
- Totals row no longer sums monthly plan billing.
- "Total Plan Rev. (visible)" metric card removed (Metrics Bar went from 7 cards to 6).
- Plan name/badge and its filter were left alone — only dollar figures were removed. ("Total Sales," the tracked company's own deal revenue and a real Health input, is a different metric and was not touched.)
- Cleaned up the now-dead `planCost`/`PLAN_COSTS` data-generation and sort code.

## v1.8 — Collapsible filter sections

- Replaced the flat 18-filter grid with three collapsible accordion sections: **Search & Segment** (7, open by default), **Account Data** (8), **Integrations, Automations & Add-Ons** (3) — matching the pattern already established in `company-activation-tracking-mockup/`.
- No filter behavior changed, only how the filters are grouped and revealed.
- Fixed a clipping bug the accordion introduced: the section wrapper's `overflow:hidden` (needed for the collapsed state) was also clipping the custom multi-select dropdown panels when a section was open.

## Follow-on polish (all v2.1)

- **Export CSV scoped to the current page**: previously exported every filtered row regardless of pagination; now matches exactly what's on screen (respects the "Show" page-size selector and current page, including "All").
- **Show / Clear All Filters restyled**: the page-size selector is now the purple-bordered floating-label pill pattern used elsewhere in the hub, paired with a restyled "Clear All Filters" button. Both stayed in their existing table-toolbar location; the redundant "Clear All" text link was removed from the filters card header.
- **Columns left-aligned**: headers were centered by browser default while body cells were left-aligned, so headers didn't line up with data. All headers now left-align to match, except **Total Sales**, which is right-aligned with tabular figures and formatted as accounting (two decimals, thousand separators — e.g. `$3,507,872.00`).
- **Renamed "Activation Dashboard" → "HealthScore"**: page `<title>`, banner strap, and `<h1>` updated (keeping a "formerly 'Activation Dashboard'" note on first mention); hub card title updated from "DJ Health Score v1.5" to "HealthScore 2.1."
- **Trimmed oversized column widths**: measured true minimum content width per column across all 1,400 generated accounts; trimmed Created (88→86px), Health (90→88px), and OBCSS (130→120px) where real excess existed. Table's own `min-width` floor tightened from 1180px to 1085px to match.
- **Fixed a broken hub-card link**: the "GitHub" button pointed to a separate external repo (`DJ-HealthScore-v1.5`) that no longer resolves; now links into this repo's own `health-score/` folder, matching the sibling `dj-health-score-v2` and `dj-health-score-lifecycle` cards.
- **Follow-up ClickUp ticket** [86bb90q17](https://app.clickup.com/t/86bb90q17) created (Needs PM Analysis) summarizing this entire rework for PM review, linked as a second ticket reference on the hub card.

---

## Resolved by ticket 86bb90q17

1. **Column set confirmation** — the 10-column "health-relevant" grid was v2.1's best-guess bucketing. Ticket 86bb90q17's Business Rule 3 confirms the same 10 columns in the same order; no change needed.
2. **Account Details drawer scope** — Business Rule 4 confirms the same 5 sections, with Add-Ons broken out as its own section (Production Rates, Job Costing, Text Messaging, Jobi AI) rather than folded into Plan; v2.1's implementation already matched, no change needed.

## Open items for PM / dev review

1. **Super Admin access enforcement** (Business Rule 11) is a real auth/routing requirement for the eventual build (block direct URL entry for non-Super-Admin sessions). Not represented in this static HTML prototype; needs to be implemented at the application layer.
2. **Copy Contact confirmation pattern** (Business Rule 16) is a new small UX pattern, not a confirmed reuse of an existing one; the design system doc names a `.copy`/`data-value` hook but no other page in this hub demonstrates its visual treatment.
3. **No Activity filter (v2.8 rework)**: confirm with engineering that "has an Estimate ever been sent / Deal ever been created / Proposal ever been viewed" is actually obtainable as a boolean per account, and confirm the 14-day minimum-age floor is the right number for real usage patterns (chosen here as a reasonable placeholder, not from any data analysis). Also confirm whether Legacy accounts' missing Deal Created/Proposal Viewed history should eventually be backfilled, or whether the "Limited History" caveat is the permanent answer for those accounts.
