// GitHub-as-database layer. Reads/writes a single JSON file in a repo via
// the GitHub Contents API, directly from the browser using a fine-grained PAT.

const CONFIG_KEY = 'cc_github_config';
const CACHE_KEY = 'cc_tasks_cache';
const PENDING_KEY = 'cc_pending_write';

const DEFAULT_PATH = 'command-center/data/tasks.json';
const DEFAULT_BRANCH = 'main';

export function loadConfig() {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveConfig(config) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

export function clearConfig() {
  localStorage.removeItem(CONFIG_KEY);
}

export function isConfigured() {
  const c = loadConfig();
  return !!(c && c.owner && c.repo && c.pat);
}

function apiBase(config) {
  return `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path || DEFAULT_PATH}`;
}

function withDefaults(config) {
  return { path: DEFAULT_PATH, branch: DEFAULT_BRANCH, ...config };
}

function b64EncodeUnicode(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary);
}

function b64DecodeUnicode(b64) {
  const binary = atob(b64.replace(/\n/g, ''));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function githubFetch(url, config, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.pat}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {}),
    },
  });
  return res;
}

export class GitHubApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// Fetches the current file: { tasks, sha }. If the file doesn't exist yet
// (404), returns an empty task list with sha=null so the first save creates it.
export async function fetchTasks() {
  const config = withDefaults(loadConfig());
  const branch = config.branch ? `?ref=${encodeURIComponent(config.branch)}` : '';
  const res = await githubFetch(`${apiBase(config)}${branch}`, config);

  if (res.status === 404) {
    return { tasks: [], sha: null };
  }
  if (!res.ok) {
    throw new GitHubApiError(`GitHub read failed (${res.status})`, res.status);
  }

  const body = await res.json();
  const json = b64DecodeUnicode(body.content);
  let tasks = [];
  try {
    tasks = JSON.parse(json);
  } catch {
    tasks = [];
  }
  return { tasks, sha: body.sha };
}

// Writes the full task array back. Retries once on 409 (stale sha) by
// re-fetching the latest sha and re-applying the write.
export async function saveTasks(tasks, sha) {
  const config = withDefaults(loadConfig());
  const content = b64EncodeUnicode(JSON.stringify(tasks, null, 2));

  const body = {
    message: `Update tasks.json (${tasks.length} tasks), ${new Date().toISOString()}`,
    content,
    branch: config.branch,
  };
  if (sha) body.sha = sha;

  let res = await githubFetch(apiBase(config), config, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  if (res.status === 409) {
    const fresh = await fetchTasks();
    body.sha = fresh.sha || undefined;
    res = await githubFetch(apiBase(config), config, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new GitHubApiError(errBody.message || `GitHub write failed (${res.status})`, res.status);
  }

  const result = await res.json();
  return { sha: result.content.sha };
}

// ---- Local cache (short-lived, not the source of truth) ----

export function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeCache(tasks, sha) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ tasks, sha, cachedAt: new Date().toISOString() }));
}

// ---- Pending-write tracking, so a failed sync never silently loses data ----

export function markPending(tasks) {
  localStorage.setItem(PENDING_KEY, JSON.stringify({ tasks, queuedAt: new Date().toISOString() }));
}

export function clearPending() {
  localStorage.removeItem(PENDING_KEY);
}

export function readPending() {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ---- Debounced, retrying save queue ----

let debounceTimer = null;
let currentSha = null;
let saving = false;
let retryCount = 0;
let onStatusChange = () => {};

export function setSha(sha) {
  currentSha = sha;
}

export function onStatus(fn) {
  onStatusChange = fn;
}

export function queueSave(tasks, delay = 800) {
  markPending(tasks);
  onStatusChange('unsynced');
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => flushSave(tasks), delay);
}

async function flushSave(tasks) {
  if (saving) return;
  saving = true;
  onStatusChange('saving');
  try {
    const { sha } = await saveTasks(tasks, currentSha);
    currentSha = sha;
    writeCache(tasks, sha);
    clearPending();
    retryCount = 0;
    onStatusChange('saved');
  } catch (err) {
    retryCount += 1;
    onStatusChange(err.status === 401 || err.status === 403 ? 'auth-error' : 'error');
    if (retryCount <= 5) {
      const backoff = Math.min(30000, 1000 * 2 ** retryCount);
      setTimeout(() => flushSave(tasks), backoff);
    }
  } finally {
    saving = false;
  }
}

export function retryNow(tasks) {
  clearTimeout(debounceTimer);
  retryCount = 0;
  flushSave(tasks);
}
