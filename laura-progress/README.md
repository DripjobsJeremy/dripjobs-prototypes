# Laura Progress (Hub tab `#laura-progress`)

Weekly progress view of Laura Cuadros's work as Junior Product Manager. Visible to Jeremy, Tanner, and Eli only.
Counts only: no targets, scores, thresholds, or comparisons. V1 is in maintenance mode, so low volume is expected.

## Is the repo public? Yes. What that means.

`DripjobsJeremy/dripjobs-prototypes` is **public** (checked Nov 6, 2026: unauthenticated GitHub API and raw file requests return 200).

- The Hub gate (`gate.js`) is a deterrent only. Its hash is in a public file. It is NOT what protects this tab.
- This tab's protection is encryption. Only ciphertext is committed: AES-256-GCM, key from PBKDF2-SHA256 (1,000,000 iterations, random 16 byte salt, fresh IV per encryption), done with Web Crypto in the browser and in Node.
- Anyone can download the ciphertext and try passwords offline. The only real defense is a long random password: use a passphrase of 5 or more random words (20+ characters). Never reuse a password from anywhere else.
- Ciphertext, once pushed, stays in git history forever. If the password ever leaks, every past version is readable with it. Rotating protects only data encrypted after the rotation.
- Plaintext (ticket titles, ids, notes) must never be committed, pasted into a PR body, or put in a commit message. `tools/guard.mjs` checks for this before every push.
- GitHub Pages does not honor `robots.txt` for a project path, so the page relies on `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">`. The ciphertext has nothing to index.
- Strongest option, if wanted later: make the repo private (Pages on a private repo needs a paid plan) or put the Hub behind Cloudflare Access.

## Files

| File | Purpose |
|---|---|
| `index.html`, `app.js` | The tab page. Embedded in the Hub as an iframe, loaded only when the tab is opened. Own noindex meta. |
| `logic.js` | Every rule in one place: inclusion, status groups, lanes, weeks, ramp months, tiles, filters. Shared by the browser and the tools. |
| `lpcrypto.js` | Encrypt and decrypt (Web Crypto), shared by the browser and Node. |
| `data.enc.json` | Ciphertext of the pulled ticket data and the touch ledger. Written by the weekly routine only. |
| `notes.enc.json` | Ciphertext of the overrides and Highlights. Edited with `tools/notes.mjs`. |
| `ROUTINE.md` | Exact steps for the weekly refresh (ClickUp read only). |
| `tools/` | `build`, `guard`, `notes`, `rotate`, tests. |

Nothing from the data is shown anywhere else in the Hub: the tab button is only a label, with no counts, previews, or titles, and no cards or search entries exist for it.

## First-time setup (once)

1. Pick the password (see above). Never put it in the repo.
2. Create the encrypted files:
   ```bash
   LAURA_PW='your passphrase' node laura-progress/tools/build.mjs --empty
   LAURA_PW='your passphrase' node laura-progress/tools/notes.mjs init
   ```
3. Add the same password as the environment secret `LAURA_PW` for the refresh routine (Claude Code on the web: environment settings, secrets).
4. Commit `data.enc.json` and `notes.enc.json` and open a PR. Until a first pull is merged the tab shows "Nothing has been pulled yet" with no password box.
5. Run the first refresh (see `ROUTINE.md`).

## Using the tab

Enter the password once. The derived keys (not the password) live in `sessionStorage`, so the tab stays unlocked until the browser tab closes. The **Lock** button clears them immediately. A wrong password shows one generic message.

## Overrides and Highlights (encrypted, edited with a tool)

```bash
LAURA_PW='your passphrase' node laura-progress/tools/notes.mjs edit
```

It decrypts to a private temp file, opens `$EDITOR`, validates, re-encrypts, and wipes the temp file. Commit only `notes.enc.json`. Format:

```json
{
  "overrides": [
    { "id": "86bxxxxxx", "action": "include", "reason": "Laura drafted it offline" },
    { "id": "86byyyyyy", "action": "exclude", "reason": "Duplicate of another ticket" }
  ],
  "highlights": {
    "2026-11-02": { "growth": "", "value": "", "setbacks": "" }
  }
}
```

- `include` brings a ticket in (the next weekly pull fetches it) and shows "Included by override: reason" on its card. `exclude` hides it and lists it, with the reason, under "Excluded by override" at the bottom.
- Highlights are keyed by the Monday of the week. Empty fields are not shown; a week with no text shows nothing.

## Laura's weekly update

Laura's message to Jeremy is stored encrypted in the same notes file and shown in that week's section as "Laura's update" (with "Sent to Jeremy on <date>"). Keep her text as markdown in a file outside the repo, then:

```bash
LAURA_PW='your passphrase' node laura-progress/tools/notes.mjs update 2026-11-02 ~/laura-update.md --received 2026-11-06
```

- The key is the Monday of the week the update covers. Running it again for the same week replaces that week's update.
- Supported markdown: `### headings`, `*` or `-` bullets, `**bold**`, `[text](https://link)` and bare links. Anything else, including pasted HTML, is shown as plain text, and only http and https links are clickable.
- In a Claude session with `LAURA_PW` set, say "Add laura update:" and paste her message. The steps are in `ROUTINE.md`.

## Rotating the password

1. Choose the new passphrase (5+ random words).
2. Re-encrypt both files:
   ```bash
   LAURA_PW_OLD='old' LAURA_PW_NEW='new' node laura-progress/tools/rotate.mjs
   ```
   This decrypts with the old password and re-encrypts with the new one using new random salts and IVs. It checks the result before writing.
3. Commit the two `.enc.json` files and merge the PR.
4. Update the `LAURA_PW` secret **before** the next Friday routine, or that run fails safely (it cannot decrypt the prior ledger).
5. Tell Jeremy, Tanner, and Eli the new password. Open tabs keep working until closed.
6. If you rotate because of a leak: commits made before the rotation still open with the old password. Treat everything pushed before as exposed. History can only be hidden by moving the repo to private or rewriting history, and a public repo's forks and caches may keep copies.

## Rules implemented (all in `logic.js`)

- Laura's ticket: Product Drafter = Laura Cuadros (whoever created it). Fallback: created by Laura with Product Drafter blank, flagged "Product Drafter missing". Baseline: created on or after Nov 2, 2026.
- Spaces: DripJobs Product Management (90140994633) and DripJobs Development V1 (90140994811). Never read: V2 Web Development list 901421393122. Also excluded: the PM space V 2 folder list and UX Review Tracking.
- A ticket with nothing in its body (no description) is left out of the report. Only an `include` override brings it back.
- Form list (901413487018): Draft until the ticket moves to Active Triage.
- Lanes (first match wins): Dev V1 space In Flight; `v2 candidate`; `lane: exception`; `lane: maintenance` or Type Bug; `lane: gate`; `lane: v2 prep`; else No lane. Shipped tickets in the Dev V1 space keep the In Flight lane (same as the Roadmap).
- Status groups: In Triage, In Flight, Shipped, Closed Without Fix, plus Draft. The full mapping is `STATUS_MAP` in `logic.js`; the routine reports any status it does not know.
- Weeks run Monday to Sunday in America/New_York (the ClickUp account timezone). Ramp: Month 1 Nov 2 to Nov 29, Month 2 Nov 30 to Dec 27, Month 3 Dec 28, 2026 to Jan 31, 2027.
- Worked this week: Laura's tickets updated in the week, plus tickets assigned to Laura updated in the week. New this week: Laura's tickets created in the week. Shipped since start and In flight count Laura's own tickets by current status group.
- A ticket matches the date range filter when it was created or updated in the range.

## Known limits

- ClickUp stores only each ticket's last update time, so every weekly pull appends it to a "touch ledger" inside the encrypted data. That keeps past weeks stable. A week that passed with no pull can miss an update that was later overwritten.
- "Last updated" in ClickUp also moves when someone else comments or an automation changes the ticket, so "worked" can include activity by others.
- Not in scope today: tickets in the ClickUp "Shared with me" folder (space 90142657770, list 901422482967) and the QA space (90142569445). Laura's own tickets there only appear if you add an `include` override or widen the scope in `logic.js` and `ROUTINE.md`.
- Assumption: tickets assigned to Laura but created before Nov 2 still count as worked (`ASSIGNED_IGNORES_BASELINE` in `logic.js`). Flip it to `false` to apply the baseline to them too.

## Tests

```bash
node laura-progress/tools/test.mjs     # unit and tool tests, synthetic data, throwaway password
node laura-progress/tools/e2e.mjs      # browser test through the Hub (needs Playwright)
```

Tests use fake tickets and a throwaway password and never touch ClickUp or the real files.
