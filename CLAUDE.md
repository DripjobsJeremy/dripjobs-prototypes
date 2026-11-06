# DripJobs Prototype Repo: Claude Code Instructions

This file is read automatically at the start of every Claude Code session in this repo. It replaces the DripJobs PM Claude Project for prototyping and direct GitHub work. That project remains the system of record for tickets, QA plans, and PRDs; this repo is the build arm.

## What DripJobs Is

CRM and job management platform for painting contractors. Tech stack: ASP.NET MVC / .NET 4.6, SQL Server, Bootstrap 4, jQuery, vanilla JS, mobile wrappers. No modern JS framework in production. Prototypes should look and feel like this stack, not like a modern SPA, unless a prototype is explicitly exploring a future direction.

Brand: Purple `#7C3AED` (marketing brand), Teal `#0DCECE`, font Nunito. Note: in-app settings-style pages use a softer scoped purple (`#8B85EA`) per the design system, that's an in-product token, not the marketing brand color. Use whichever matches the surface being prototyped.

Audience is field contractors using this on mobile in the field. Mobile-first, minimum 48px touch targets, thumb-reachable primary actions.

## Reference Docs in This Repo

- `docs/design-system.md`: color tokens, section/grid layout, form field patterns, button rules, alerts, tab navigation, spacing/radius scales, JS hooks that carry behavior, anti-patterns. Read this before building or restyling any page. This is the authoritative look-and-feel source, don't invent new patterns when one already exists here.
- `docs/ux-laws-reference.md`: Laws of UX and current UX/UI/accessibility standards to apply when making layout, interaction, and hierarchy decisions.
- `docs/design-workflow.md`: scope discipline rules (only build what was asked, don't redesign adjacent areas), deliverable type definitions (wireframe vs. high-fidelity mockup vs. clickable prototype vs. annotated design), and the input → analysis → execution → validation workflow. Read this before starting any new request to confirm what fidelity and scope is actually expected.
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

Deploy sync (Drippy Slack reports):
- Jeremy pastes Drippy's "🚀 Deployed to PROD:" Slack messages (each has an `Item name:` and a `Link:` to a ClickUp ticket) with the lead-in "Sync hub:". Treat that lead-in as the trigger for this workflow, no other setup or ClickUp API access needed.
- Extract the ClickUp ticket ID from each `Link:` and check it against every card's ticket link(s) in the Prototypes tab (`#protoGrid` only, leave Resources and Release Notes alone).
- Remove any card whose ticket (or, for a multi-ticket card, all of its tickets) matches a deployed link, it has shipped and is no longer needed on the hub. Deployed items with no matching card need no action.
- If a multi-ticket card only partially matches (some linked tickets deployed, some not), don't remove it, update its status tooltip/description instead to reflect what shipped.
- Append a dated entry to `docs/decision-log.md` naming which cards were removed and which deployed items had no match. Commit, push a branch named `claude/prototype-hub-sync-<date>`, and open a PR, do not merge it, Jeremy reviews and merges these himself.

Signals sync (Product Signals tab):
- Trigger: "Sync signals:" from Jeremy or Laura. The source is the daily feedback sweep posts in Slack `#prod-assistant` (channel ID `C0BSNSG2GQK`), read through the Slack connector, nothing needs to be pasted.
- The tab is driven by `product-signals/signals-data.js` (rows, themes, sweep timestamps) and rendered by `product-signals/signals-app.js`. The field guide is the comment at the top of the data file.
- Read every sweep post newer than `PS_META.lastSweep`, append one row per bug or enhancement, add the post's message timestamp to `PS_SWEEPS`, then bump `lastSweep` and `syncedOn`. Update `PS_RECURRING` counts when a sweep flags a recurring theme again.
- For every ClickUp link in the new posts, read the live ticket status (ClickUp connector) and store it with `live: true`. Re-check the open tickets already in the file and move rows to `tracked` or `shipped` when their status changed.
- Leave customer and account names out (rep names only). Severity is copied as rated in the sweep, never computed.
- Triage decisions live in `PS_TRIAGE` in the data file (key is `date|first 70 characters of the title`). When someone shares an "Export CSV" file from the tab, apply its Triage and Triage note columns to `PS_TRIAGE`, apply any changed ticket or coverage columns to the matching rows (confirm the live ClickUp status), and bump `triageSyncedOn`. A routine sync must never overwrite or drop existing `PS_TRIAGE` entries.
- Append a dated entry to `docs/decision-log.md`, commit, push a branch named `claude/signals-sync-<date>`, and open a PR. Do not merge it.

Laura Progress sync (Laura Progress tab, password-gated):
- Trigger: "Refresh laura progress:" (also runs weekly on Fridays). Full steps are in `laura-progress/ROUTINE.md`.
- ClickUp is read only. The tab's data and notes are AES-GCM ciphertext (`laura-progress/data.enc.json`, `notes.enc.json`). The repo is public, so never commit, paste, or log plaintext ticket data; the password is read from `LAURA_PW` and never stored.
- Rules, rotation, and the public repo caveats are in `laura-progress/README.md`. Lane and status rules live only in `laura-progress/logic.js`.
- Trigger "Add laura update:" stores a weekly message from Laura (encrypted, in `notes.enc.json`). Steps are in `laura-progress/ROUTINE.md`. Never paste any of it into the repo, a commit, or a PR body.
- Tickets with an empty body are left out of the report.
- When Jeremy or Laura's update presents a ClickUp ticket outside the two searched spaces, add an include override for it (`notes.mjs override`), see `laura-progress/ROUTINE.md`.
- Do not show anything from this tab elsewhere in the Hub (no counts, previews, titles, cards, or search entries).
- Push a branch named `claude/laura-progress-<date>` and open a PR. Do not merge it.

GitHub API mechanics:
- Always fetch a fresh file SHA immediately before any PUT to that file. Stale SHAs cause 409 conflicts. Don't reuse a SHA from earlier in a long session.
- Poll `/repos/{repo}/pages/builds/latest` to check build status.
- If a build shows `errored` with no useful message, trigger a manual rebuild via `POST /repos/{repo}/pages/builds` rather than guessing at the cause.

## Working Style

- Confirm-then-execute: for anything beyond a single prototype tweak, show what you're about to build or change before pushing to GitHub, especially for hub structure changes that could break the marker/filter logic.
- When a prototype maps to a specific DripJobs ticket, ask for the ticket title and a short summary of scope pasted in, this repo has no ClickUp connection and shouldn't guess at ticket scope from memory.
- After any session with a real design decision (a layout choice, a scope cut, a pattern deviation from the design system and why), append a dated entry to `docs/decision-log.md`. Keep entries to 2 to 4 lines.
- If a request would require deviating from an anti-pattern listed in the design system, flag it explicitly rather than silently doing it.

## Roadmap Lanes (dripjobs-product-roadmap)

The Roadmap is a standalone page (`dripjobs-product-roadmap/index.html`) rendered from files, not hand-edited HTML:
- `roadmap-data.js`: every open ClickUp task tagged 🎯 (bare tag only, not `🎯 focus`), read only. Refresh it on request ("Refresh roadmap") with the ClickUp connector: `clickup_filter_tasks` (tag 🎯) for name, status, priority, tags, list, then `clickup_get_task` per task for `task_type` and the space id, and map list to space name. Update `syncedAt`. Never write to ClickUp.
- `roadmap-lanes.js`: the ONLY place lane rules live. Precedence: 1 space in `inFlightSpaces` = In Flight, 2 tag `v2 candidate`, 3 `lane: exception`, 4 `lane: maintenance` or type Bug, 5 `lane: gate`, 6 `lane: v2 prep`, 7 Unassigned (hidden when empty). Tags are case insensitive, the retired `v1` and `v2` tags are ignored, and more than one lane tag outside In Flight shows a "Lane conflict" badge.
- `roadmap-config.js`: hand-edited settings. `inFlightSpaces` (matched by space NAME, currently DripJobs Development V1 and QA Space - V1), `shippingTitles` (remove a title once it ships), `pins.now` / `pins.next` (optional, ships empty), `inFlightOrder` (status order for In Flight, closest to done first).
- `?fixtures=1` on the roadmap URL adds three local test tickets (no lane tag, two lane tags, retired tags only) to check the logic.
- Product Signals shows a lane badge on rows whose linked ticket is on the board (or whose `ticket.parent` is). Other rows show nothing. The hub `index.html` loads the three roadmap files for this.
- Policy source: `docs/DripJobs_V1_Operating_Mode_Nov2026.md` (lane tags and precedence). It lists rule 1 as the Development V1 space only; Jeremy approved adding QA Space - V1 on Nov 3 because the QA Development Testing list lives there.
- Do not show raw task IDs on the board. Do not move the board back to status columns.

## Out of Scope for This Repo

- Ticket drafting, bug reports, QA test plans as ClickUp artifacts, PRDs. Those stay in the DripJobs PM Claude Project.
- Any real customer data. Prototypes use placeholder/sample data only.
