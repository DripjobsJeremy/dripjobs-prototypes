# DripJobs Command Center

A fast, keyboard-friendly personal task and deadline manager. Vanilla HTML/CSS/JS,
no build step, no framework. GitHub itself is the database: tasks live in
`data/tasks.json` in this repo and are read/written directly from the browser
via the GitHub REST API.

## Setup

### 1. Create a fine-grained Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens →
   **Fine-grained tokens** → Generate new token.
2. Set **Resource owner** to the account/org that owns this repo.
3. Under **Repository access**, choose **Only select repositories** and pick
   `dripjobs-prototypes` (or wherever you deploy this app). Do not grant access
   to any other repo.
4. Under **Permissions → Repository permissions**, set **Contents** to
   **Read and write**. Leave everything else at no access.
5. Generate the token and copy it (you won't see it again).

Do not use a classic token with account-wide access. This app stores the token
in browser `localStorage` in plaintext, which is an acceptable tradeoff for a
single-user personal tool on a device you control, but only if the token's
blast radius is limited to this one repo.

### 2. Open the app and connect it

1. Open `index.html` (locally or via GitHub Pages).
2. On first load you'll see a Settings screen. Enter:
   - **Repo owner**, e.g. `DripjobsJeremy`
   - **Repo name**, e.g. `dripjobs-prototypes`
   - **Branch**, usually `main`
   - **Data file path**, where `tasks.json` lives in that repo, e.g.
     `command-center/data/tasks.json`
   - **Personal Access Token**, the one you just created
3. Save & Connect. The app will read `data/tasks.json` (creating it on first
   save if it doesn't exist yet) and you're up and running.

Settings can be changed later via the gear icon in the top bar.

### 3. Run it locally (no build step)

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open the served URL. This works unmodified on GitHub Pages too, just
make sure Pages is enabled for the repo/branch this lives on.

## Notes

- Changes are applied to the UI immediately, then synced to GitHub in the
  background (debounced ~800ms). The sync indicator in the top bar shows
  saving / saved / unsynced / offline / error state.
- If a write fails (offline, rate limit, stale SHA), the change stays queued
  in `localStorage` and retries with backoff; it is never silently dropped.
  Reopening the app recovers any unsynced changes from the last session.
- Use the download icon in the top bar any time to export the current task
  list as a JSON backup, independent of the GitHub sync.
- Keyboard: press `/` or `Cmd/Ctrl+K` from anywhere to jump to the quick-add
  bar. `Escape` closes open modals.
