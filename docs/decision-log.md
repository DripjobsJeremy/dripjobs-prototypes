# Prototype Decision Log

Append a short entry after any session with a real design or scope decision. Newest entries at the top. Keep each entry to 2 to 4 lines: what was decided, why, and any open question left for Jeremy.

Format:

## [YYYY-MM-DD] Prototype name or feature
- Decision:
- Why:
- Open question (if any):

---

## [2026-07-22] QBO Initial Connect and Sync: helper text
- Decision: Added static helper text (12px, muted, per the design system's Helper text spec) under each sync toggle on the Initial Connect modal, and under "Stop Syncing Invoices If Deposit is Zero" on the Connected screen, rather than a hover-tooltip icon like the Income/Expense field uses.
- Why: ClickUp 86b8nxcm2 asked for helper text explaining the sync toggle tradeoff and the zero-deposit setting; static text is always visible and doesn't rely on hover/discovery the way the existing info-icon tooltip pattern does.
- Open question: None.

## [Template entry, delete once real entries exist]
- Decision: Example, chose a 3-step wizard instead of 5 for the X flow.
- Why: Hick's Law, original 5-step version front-loaded too many decisions before showing value.
- Open question: None.
