# Laura Progress weekly refresh (routine instructions)

Trigger: "Refresh Laura progress:" (manual) or the Friday scheduled task. It may run any time on Friday, including evening. Running it twice is safe.
Result: one PR containing ciphertext only. Do not merge it. Jeremy reviews and merges.

## Hard rules

- ClickUp is READ ONLY. Use only `clickup_filter_tasks`, `clickup_get_task`, `clickup_get_user`, and `clickup_execute_operator` with `task.get_many` (bulk fetch). Never create, update, comment on, move, tag, or delete anything.
- Never read or fetch anything from list `901421393122` (V2 Web Development), the PM space `V 2` folder list `901412659249`, or `UX Review Tracking` `901413486812`. Drop those from candidate lists before fetching details.
- The password comes from the environment variable `LAURA_PW`. Never print it, write it to a file, or put it in a commit, PR, or log. If it is not set, stop and say so.
- Plaintext (titles, ids, names, statuses, notes) lives only in memory or in a file OUTSIDE the repo (`$TMPDIR`). Never in the repo, commit messages, PR title or body, or chat output that would be pasted into the PR. Report counts only.

## Steps

1. Candidates (spaces `90140994633` and `90140994811`, `include_closed: true`, `subtasks: true`, follow `has_more` until false):
   - A. `clickup_filter_tasks` with custom field Product Drafter `74ecffe3-fb66-489a-a3a0-bbfe916ef45e`, operator `ANY`, value `[82240534]` (Laura Cuadros).
   - B. `clickup_filter_tasks` with `assignees: ["82240534"]`.
   - C. Fallback: `clickup_filter_tasks` with Product Drafter `IS NULL`, `order_by: created`. Keep only tickets whose creator is Laura. Stop paging when a whole page was created before Nov 2, 2026.
   - D. Overrides: run `node laura-progress/tools/notes.mjs show` (needs `LAURA_PW`) and also fetch every `include` ticket id (still skipping the excluded lists).
2. Drop candidates whose list is excluded. Deduplicate by id.
3. Fetch details in bulk (`task.get_many`, 100 ids per call) or `clickup_get_task` with `include: ["custom_fields"]`, and build one record per ticket:

   | Field | Source |
   |---|---|
   | `id`, `name`, `url`, `status` | task (status lowercase is fine) |
   | `type` | custom field **Type** (`6a66d331-0c0c-4774-bd70-41d672d00229`) option name |
   | `taskType` | ClickUp task type name |
   | `spaceId`, `listId`, `listName` | task space id, list id, list name |
   | `tags` | tag names |
   | `drafter` | **Product Drafter** user name, or empty |
   | `creator` | creator username |
   | `assignees`, `assigneeIds` | assignee usernames, ids (as strings) |
   | `reviewers` | **Product Reviewer** (`116cceb6-1e97-4961-82fe-3d348b047a91`) user names |
   | `pms` | **Project Manager** (`716b00e9-b31a-49df-9bbc-c0583347aa70`) user names |
   | `created`, `updated`, `closed` | `date_created`, `date_updated`, `date_closed` in ms (numbers) |
   | `parent` | parent task id if any |

4. Write `{ "pulledAt": <now in ms>, "tickets": [ ... ] }` to `$TMPDIR/laura-pull.json` (outside the repo).
5. Build the ciphertext: `node laura-progress/tools/build.mjs --in "$TMPDIR/laura-pull.json"`.
   It decrypts the previous bundle to carry the touch ledger forward, drops tickets that are not Laura's, refuses a suspiciously small pull, round-trip checks, and writes `laura-progress/data.enc.json`.
   If it prints `UNMAPPED STATUSES`, tell Jeremy the status names (names only) so the mapping in `logic.js` can be confirmed. The tickets still appear, flagged "Status not mapped".
6. Branch `claude/laura-progress-<YYYY-MM-DD>`. Stage ONLY `laura-progress/data.enc.json`.
7. Write the PR body to `$TMPDIR/pr-body.md`: `Weekly Laura Progress refresh, <date>. Ciphertext only (laura-progress/data.enc.json).` plus the attribution lines. No counts, titles, or ids.
8. Run `node laura-progress/tools/guard.mjs "$TMPDIR/laura-pull.json" --text "$TMPDIR/pr-body.md"`. If it fails, do not push.
9. Commit (message: `Laura Progress: weekly refresh <date> (ciphertext only)`), push, open the PR. Do not merge.
10. Delete `$TMPDIR/laura-pull.json` and `$TMPDIR/pr-body.md`.
11. Reply with: the PR link, the number of tickets kept (a count), and any unmapped status names. Nothing else from the data.

Scheduled task suggestion: weekly on Fridays (for example `CRON_TZ=America/New_York 17 15 * * 5`), fresh session, ClickUp connector granted, `LAURA_PW` set as an environment secret.
