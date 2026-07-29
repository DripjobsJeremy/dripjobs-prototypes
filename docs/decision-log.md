# Prototype Decision Log

Append a short entry after any session with a real design or scope decision. Newest entries at the top. Keep each entry to 2 to 4 lines: what was decided, why, and any open question left for Jeremy.

Format:

## [YYYY-MM-DD] Prototype name or feature
- Decision:
- Why:
- Open question (if any):

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
