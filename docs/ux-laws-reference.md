# UX Laws and Modern UX/UI Reference

Practical reference for layout, interaction, and hierarchy decisions when building DripJobs prototypes. Not academic theory, apply these as decision rules when a prototyping choice is ambiguous.

## Laws of UX (the ones that matter most for a field-service CRM)

**Fitts's Law**: the time to reach a target depends on its size and distance. Primary actions get large, thumb-reachable touch targets (48px minimum height on mobile). Don't shrink a button to fit a row, widen the row instead.

**Hick's Law**: more choices means slower decisions. Wizards, dropdowns, and settings pages should limit visible options at any one step. Use progressive disclosure (show advanced options behind a toggle or secondary step) rather than exposing everything at once.

**Miller's Law**: working memory holds roughly 7 items. Chunk multi-step flows into stages (the onboarding wizard's 8-step structure is a good existing example) rather than one long form.

**Jakob's Law**: users spend most of their time on other apps, and expect yours to work the same way. Match conventions from CRMs and mobile apps contractors already use (swipe patterns, standard iconography, familiar form layouts) unless there's a specific reason to diverge.

**Aesthetic-Usability Effect**: users perceive attractive design as more usable, even when it isn't objectively easier. Doesn't excuse poor usability, but a polished prototype gets a fairer first impression in review.

**Peak-End Rule**: users judge an experience mostly by its most intense point and its ending. The final step of a flow (confirmation, success state) deserves as much design attention as the middle.

**Von Restorff Effect (Isolation Effect)**: an item that stands out visually is remembered and noticed more. Use sparingly, for one primary action per screen, not for every element competing for attention.

**Tesler's Law (Law of Conservation of Complexity)**: complexity can't be eliminated, only moved. Push complexity into the system, not onto the contractor, smart defaults, pre-filled fields, and automated calculations behind the scenes beat asking the user to figure it out. If a flow feels like it's offloading decisions the system could make itself, that's a signal to reconsider, not a fact of life to accept.

**Serial Position Effect**: items at the start and end of a list are recalled better than the middle. Put the most important options first or last in a menu or list, not buried in the middle.

**Law of Proximity / Common Region** (Gestalt): elements grouped closely or enclosed in a shared boundary are read as related. This is already encoded in the design system's section-card pattern, keep using card boundaries to group related fields rather than relying on whitespace alone.

**Doherty Threshold**: keep response feedback under about 400ms perceived latency, or show a loading state. Any prototype interaction that simulates a save, submit, or fetch should show immediate visual feedback (spinner, disabled state, skeleton) rather than a silent pause.

**Postel's Law (robustness principle, applied to UX)**: be liberal in what input you accept, conservative in what you produce. Form validation should be forgiving of input format (phone numbers, addresses) and strict and clear about what it outputs or confirms.

## Accessibility Baseline (WCAG 2.2 AA, practical subset)

- Text contrast: 4.5:1 for body text, 3:1 for large text (18px+ or 14px+ bold) against its background. Check this against the design system's text-muted color (`#80879A`) on white, it's close to the line and worth verifying per use case.
- Every interactive element has a visible focus state, not just a hover state. Don't remove the default focus ring without replacing it with an equally visible one.
- Every form input has a programmatically associated label, not just placeholder text. The design system's floating-label pattern already satisfies this if markup is copied correctly (real `<label for>`, not a styled div).
- Touch targets: 44 to 48px minimum, with adequate spacing between adjacent targets to avoid mis-taps on mobile.
- Don't convey status by color alone (the alert variants already pair color with an icon and label, keep that pairing when extending the pattern).
- Interactive elements are reachable and operable via keyboard, even if the primary use case is touch, since some users will use desktop with a keyboard.

## Modern UX/UI Practices Worth Defaulting To

- **Skeleton loading states** over spinners for content-heavy views (lists, dashboards), spinners for short actions (button submits).
- **Optimistic UI** for low-risk actions (marking something complete, toggling a setting): update the UI immediately, roll back only if the action fails.
- **Empty states with a clear next action**, not just "No data." Tell the user what to do to get data (e.g. "No leads yet, create your first lead").
- **Inline validation** on blur for form fields, not only on submit. Surface errors next to the field, not in a summary banner at the top, unless there are many errors at once.
- **Progressive disclosure** for advanced or rarely-used settings, keep the default view lean.
- **Consistent iconography**: don't mix icon sets or invent new semantic meanings for icons already established elsewhere in the product (the design system's anti-patterns section already flags this for per-doc icon colors, the same discipline applies broadly).
- **Responsive breakpoints follow the design system's existing grid** (mobile single column, tablet 2-up, desktop up to 6-col grid), don't introduce a new breakpoint scheme per prototype.

## How to Use This in Practice

When a prototyping decision is ambiguous (how many steps should this wizard have, how should this error surface, how big should this button be), check this file before defaulting to whatever looks reasonable. If a decision meaningfully departs from a law or standard listed here, note why in the decision log rather than silently deviating.
