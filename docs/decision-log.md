# Prototype Decision Log

Append a short entry after any session with a real design or scope decision. Newest entries at the top. Keep each entry to 2 to 4 lines: what was decided, why, and any open question left for Jeremy.

Format:

## [YYYY-MM-DD] Prototype name or feature
- Decision:
- Why:
- Open question (if any):

---

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
