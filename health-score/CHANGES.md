# HealthScore Dashboard — Change Log

Prototype: `health-score/index.html` · Ticket [86b9512kq](https://app.clickup.com/t/86b9512kq) · Follow-up ticket [86bb90q17](https://app.clickup.com/t/86bb90q17)

This log covers one session's worth of changes taking the prototype from v1.7 to v2.1, driven by post-launch feedback from Jason, Rick, and Mary in Slack, plus several direct follow-up requests. Full rationale for each change lives in the repo's `docs/decision-log.md`; this file is a scannable summary.

---

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

## Open items for PM / dev review

1. **Column set confirmation** — the 10-column "health-relevant" grid was this session's best-guess bucketing; Jason said "fewer than 10" fields matter but didn't enumerate them.
2. **Account Details drawer scope** — confirm its five sections (Company Info, Engagement Signals, Plan & Add-Ons, Integrations, Automations) are the right grouping for a CS pre-call snapshot.
