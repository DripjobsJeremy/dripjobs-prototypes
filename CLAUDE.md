# DripJobs Prototype Repo: Claude Code Instructions

This file is read automatically at the start of every Claude Code session in this repo. It replaces the DripJobs PM Claude Project for prototyping and direct GitHub work. That project remains the system of record for tickets, QA plans, and PRDs; this repo is the build arm.

## What DripJobs Is

CRM and job management platform for painting contractors. Tech stack: ASP.NET MVC / .NET 4.6, SQL Server, Bootstrap 4, jQuery, vanilla JS, mobile wrappers. No modern JS framework in production. Prototypes should look and feel like this stack, not like a modern SPA, unless a prototype is explicitly exploring a future direction.

Brand: Purple `#7C3AED` (marketing brand), Teal `#0DCECE`, font Nunito. Note: in-app settings-style pages use a softer scoped purple (`#8B85EA`) per the design system, that's an in-product token, not the marketing brand color. Use whichever matches the surface being prototyped.

Audience is field contractors using this on mobile in the field. Mobile-first, minimum 48px touch targets, thumb-reachable primary actions.

## Reference Docs in This Repo

- `docs/design-system.md`: color tokens, section/grid layout, form field patterns, button rules, alerts, tab navigation, spacing/radius scales, JS hooks that carry behavior, anti-patterns. Read this before building or restyling any page. This is the authoritative look-and-feel source, don't invent new patterns when one already exists here.
- `docs/ux-laws-reference.md`: Laws of UX and current UX/UI/accessibility standards to apply when making layout, interaction, and hierarchy decisions.
- `docs/qa-chrome-prompt.md`: QA self-check prompt. Use this to review a prototype against acceptance criteria before presenting it, when a ticket or AC list is provided.
- `docs/decision-log.md`: running log of prototype decisions. Append a short entry after any session where a real design or scope decision was made, don't rely on conversation memory carrying forward.

## Absolute Rules

- Never use an em dash in any output: code comments, commit messages, doc content, or prototype copy. Use colons, commas, parentheses, or restructure the sentence.
- Never invent business logic that wasn't specified. If a prototype needs a business rule to function (what happens on submit, what triggers a state change) and it wasn't given, ask or flag it as an assumption in the decision log rather than guessing silently.
- Prototypes show WHAT the experience looks and feels like. They are not required to wire up real backend calls, persistence, or auth unless a prototype is specifically testing that.
- Preserve the JS hooks listed in the design system doc (`.select2`, `.switchery`, `.formatted-phone-no`, autocomplete classes, `.tag-input.tagging`, `.ckeditor`, etc.) if a prototype is meant to represent a real page. Renaming them breaks the real implementation's assumptions if this prototype's markup gets reused.
- Match existing terminology. Don't rename product concepts (Deals, Proposals, Drips, Command Center, etc.) casually.

## GitHub Prototype Hub Mechanics

Repo: `DripjobsJeremy/dripjobs-prototypes`. GitHub Pages served from `main` branch root. `.nojekyll` file is present and must stay.

Key file paths:
- `index.html`: the hub landing page
- `weekly-product-update/index.html`: weekly update page with two-tab interface (Weekly Product Update + Weekly CS Product Roadmap)
- `weekly-product-update/Weekly_Product_Update.md`: source content for that page
- `cs-roadmap-jun20/index.html`: CS roadmap prototype
- `_template/index.html`: starting scaffold for new prototypes, already wired with the proto-bar markup and CSS

Hub mechanics:
- New prototype cards get inserted above the marker comment `<!-- ++ ADD NEW PROTOTYPE CARDS ABOVE THIS LINE ++ -->` in `index.html`.
- Every new card needs `data-status` and `data-name` attributes, the hub's filter/search logic depends on them.
- Every prototype file needs the proto-bar injected before `</body>`.

GitHub API mechanics:
- Always fetch a fresh file SHA immediately before any PUT to that file. Stale SHAs cause 409 conflicts. Don't reuse a SHA from earlier in a long session.
- Poll `/repos/{repo}/pages/builds/latest` to check build status.
- If a build shows `errored` with no useful message, trigger a manual rebuild via `POST /repos/{repo}/pages/builds` rather than guessing at the cause.

## Working Style

- Confirm-then-execute: for anything beyond a single prototype tweak, show what you're about to build or change before pushing to GitHub, especially for hub structure changes that could break the marker/filter logic.
- When a prototype maps to a specific DripJobs ticket, ask for the ticket title and a short summary of scope pasted in, this repo has no ClickUp connection and shouldn't guess at ticket scope from memory.
- After any session with a real design decision (a layout choice, a scope cut, a pattern deviation from the design system and why), append a dated entry to `docs/decision-log.md`. Keep entries to 2 to 4 lines.
- If a request would require deviating from an anti-pattern listed in the design system, flag it explicitly rather than silently doing it.

## Out of Scope for This Repo

- Ticket drafting, bug reports, QA test plans as ClickUp artifacts, PRDs. Those stay in the DripJobs PM Claude Project.
- Any real customer data. Prototypes use placeholder/sample data only.
