# Design Workflow and Scope Discipline

This covers how to approach a design or prototyping request, and what "done" looks like for each deliverable type. Read alongside `design-system.md` (visual patterns) and `ux-laws-reference.md` (why those patterns work).

## Scope Discipline (read this first)

The most common way to waste a review cycle is doing more than was asked.

- Make only the change explicitly requested. If a ticket says "add a filter button for Job Type," add the filter button. Don't also restyle the toolbar it lives in.
- Don't redesign a full screen to fix a small, localized issue.
- Don't add elements, states, or flourishes that weren't asked for, even if they seem like an improvement. Flag the idea instead of building it unprompted.
- When a change touches a shared component (a button style, a card pattern), check `design-system.md` for the existing pattern before inventing a new one. Reuse over redesign.
- Keep the professional, clean, uncluttered look already established. If a screen feels crowded, the fix is usually restraint, not more UI.

If you think a request is too narrow and something adjacent really should change too, say so and ask, don't just expand the scope silently.

## Deliverable Types

Match the fidelity to what was actually requested. Ask if it's unclear which one is wanted.

**Wireframe**: low or mid-fidelity structure and flow only. Grayscale or near-grayscale, placeholder text, no final colors or polish. Purpose is to validate layout and flow before investing in visual design.

**High-fidelity mockup**: pixel-accurate, full DripJobs styling from `design-system.md` (real colors, spacing, typography). Static, not interactive. This is what a developer would build directly from.

**Clickable prototype**: interactive, built as an HTML artifact or repo page with working navigation between the screens relevant to this specific flow. Only wire up the screens needed to demonstrate the requested flow, not the entire surrounding app.

**Annotated design**: a mockup or prototype with explicit developer notes attached (spacing values, which existing component/class to reuse, interaction behavior on click/hover/focus, edge case handling). Annotate only the parts that changed or need clarification, not the whole screen.

## Workflow

1. **Input**: work from what's given, a screenshot of the current UI, a ticket description, or notes on behavior/edge cases. If a screenshot exists, treat it as ground truth for the current state, don't assume the current UI matches the design system's ideal pattern until confirmed.
2. **Analysis**: identify the minimum set of changes that satisfies the request. Check `design-system.md` for whether an existing pattern already covers this. Check `ux-laws-reference.md` if the request involves a UX judgment call (how many steps, how to surface an error, how big a target should be).
3. **Execution**: build the requested deliverable at the requested fidelity. Apply DripJobs colors and patterns from the design system, not improvised ones.
4. **Validation**, before presenting:
   - Did I add anything that wasn't asked for? Remove it.
   - Does this match the design system's existing patterns, or did I invent something new without flagging it?
   - If a screenshot was provided, can I show a clear before/after so the change is easy to verify at a glance?
   - Are touch targets, contrast, and focus states still meeting the accessibility baseline in `ux-laws-reference.md`?

## Presenting Work

When a screenshot of the current state was provided, show the updated version in the same context so the diff is obvious, don't make the reviewer hunt for what changed. Call out explicitly what changed and, briefly, why (a one-line rationale, not a full essay).
