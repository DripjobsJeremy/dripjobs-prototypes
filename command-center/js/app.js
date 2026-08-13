import * as GitHub from './github.js';
import * as Rec from './recurrence.js';
import * as UI from './ui.js';

const state = {
  tasks: [],
  sha: null,
  view: 'today',
  filters: { text: '', tag: '', priority: '' },
  monthCursor: Rec.startOfMonth(Rec.todayISO()),
  yearCursor: Rec.startOfYear(Rec.todayISO()),
  selectedDay: null,
  loaded: false,
};

function uid() {
  return (crypto.randomUUID && crypto.randomUUID()) || `t_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function nowISO() {
  return new Date().toISOString();
}

// ---------- Persistence ----------

function persist() {
  GitHub.queueSave(state.tasks);
}

async function loadInitial() {
  const root = UI.$('#view-root');
  root.innerHTML = '';
  root.appendChild(UI.renderLoading());

  const pending = GitHub.readPending();
  try {
    const { tasks, sha } = await GitHub.fetchTasks();
    state.sha = sha;
    GitHub.setSha(sha);
    if (pending && pending.tasks) {
      // A previous session had unsynced local edits, trust them and re-push.
      state.tasks = pending.tasks;
      state.loaded = true;
      render();
      GitHub.queueSave(state.tasks, 50);
      UI.showToast('Recovered unsynced changes from last session', 'info');
      return;
    }
    state.tasks = tasks;
    GitHub.writeCache(tasks, sha);
    state.loaded = true;
    render();
  } catch (err) {
    const cache = GitHub.readCache();
    if (cache) {
      state.tasks = pending?.tasks || cache.tasks;
      state.sha = cache.sha;
      GitHub.setSha(cache.sha);
      state.loaded = true;
      UI.renderSyncIndicator('offline');
      UI.showToast('Could not reach GitHub, showing last synced copy', 'error');
      render();
    } else {
      root.innerHTML = '';
      root.appendChild(
        UI.el('div', { class: 'empty-state' }, [
          UI.el('div', { class: 'empty-state-icon' }, '⚠️'),
          UI.el('div', { class: 'empty-state-title' }, 'Could not load tasks from GitHub'),
          UI.el('div', { class: 'empty-state-sub' }, err.message || 'Check your settings and connection.'),
        ])
      );
    }
  }
}

// ---------- Task mutations (optimistic) ----------

function addTask(fields) {
  const task = {
    id: uid(),
    title: fields.title.trim(),
    notes: fields.notes || '',
    cadence: fields.cadence || 'one-time',
    recurrence: { enabled: (fields.cadence || 'one-time') !== 'one-time', rule: fields.recurrenceRule || '' },
    dueDate: fields.dueDate || null,
    priority: fields.priority || 'medium',
    status: 'todo',
    tags: fields.tags || [],
    createdAt: nowISO(),
    updatedAt: nowISO(),
    completedAt: null,
    completionHistory: [],
  };
  if (!task.title) return null;
  state.tasks.unshift(task);
  persist();
  render();
  return task;
}

function saveTaskFromModal(patch) {
  if (!patch.title.trim()) {
    UI.showToast('Title is required', 'error');
    return;
  }
  const idx = state.tasks.findIndex((t) => t.id === patch.id);
  if (idx === -1) {
    addTask({
      title: patch.title,
      notes: patch.notes,
      cadence: patch.cadence,
      recurrenceRule: patch.recurrence?.rule,
      dueDate: patch.dueDate,
      priority: patch.priority,
      tags: patch.tags,
    });
  } else {
    state.tasks[idx] = { ...state.tasks[idx], ...patch, updatedAt: nowISO() };
    persist();
    render();
  }
  UI.closeTaskModal();
}

function deleteTask(task) {
  if (!confirm(`Delete "${task.title}"? This can't be undone.`)) return;
  state.tasks = state.tasks.filter((t) => t.id !== task.id);
  persist();
  UI.closeTaskModal();
  render();
}

function toggleDone(task) {
  const row = document.activeElement;
  const idx = state.tasks.findIndex((t) => t.id === task.id);
  if (idx === -1) return;
  const t = state.tasks[idx];

  if (t.status === 'done') {
    // Undo an accidental complete on a one-time task.
    t.status = 'todo';
    t.completedAt = null;
    t.updatedAt = nowISO();
    persist();
    render();
    return;
  }

  if (Rec.isRecurring(t.cadence)) {
    t.completionHistory = [...(t.completionHistory || []), nowISO()];
    t.dueDate = Rec.computeNextDueDate(t, t.dueDate);
    t.status = 'todo';
    t.completedAt = null;
    t.updatedAt = nowISO();
    UI.showToast(`Nice, next one due ${t.dueDate}`, 'success');
  } else {
    t.status = 'done';
    t.completedAt = nowISO();
    t.updatedAt = nowISO();
    UI.showToast('Task completed', 'success');
  }
  persist();
  render();
}

function toggleProgress(task) {
  const idx = state.tasks.findIndex((t) => t.id === task.id);
  if (idx === -1 || state.tasks[idx].status === 'done') return;
  state.tasks[idx].status = state.tasks[idx].status === 'in-progress' ? 'todo' : 'in-progress';
  state.tasks[idx].updatedAt = nowISO();
  persist();
  render();
}

// ---------- View computation ----------

function isDueOn(task, iso, today) {
  if (task.dueDate) return task.dueDate === iso;
  return Rec.isRecurring(task.cadence) && iso === today;
}

function matchesFilters(task) {
  const { text, tag, priority } = state.filters;
  if (priority && task.priority !== priority) return false;
  if (tag && !(task.tags || []).includes(tag)) return false;
  if (text) {
    const needle = text.toLowerCase();
    const haystack = `${task.title} ${task.notes || ''}`.toLowerCase();
    if (!haystack.includes(needle)) return false;
  }
  return true;
}

function activeTasks() {
  return state.tasks.filter((t) => t.status !== 'done' && matchesFilters(t));
}

function overdueTasks(pool) {
  const today = Rec.todayISO();
  return pool.filter((t) => t.dueDate && t.dueDate < today);
}

function buildTagList() {
  const set = new Set();
  state.tasks.forEach((t) => (t.tags || []).forEach((tag) => set.add(tag)));
  return Array.from(set);
}

function renderProgressFor(scopeTasks, label) {
  const done = scopeTasks.filter((t) => t.status === 'done').length;
  UI.renderProgress(done, scopeTasks.length, label);
}

function viewToolbar(title, onPrev, onNext) {
  return UI.el('div', { class: 'view-nav' }, [
    UI.el('button', { class: 'icon-btn', type: 'button', onclick: onPrev, 'aria-label': 'Previous' }, '‹'),
    UI.el('div', { class: 'view-nav-title' }, title),
    UI.el('button', { class: 'icon-btn', type: 'button', onclick: onNext, 'aria-label': 'Next' }, '›'),
  ]);
}

const handlers = {
  onToggleDone: toggleDone,
  onToggleProgress: toggleProgress,
  onOpen: (task) => UI.openTaskModal(task, buildTagList(), { onSave: saveTaskFromModal, onDelete: deleteTask }),
};

function renderTodayView(root) {
  const today = Rec.todayISO();
  const pool = activeTasks();
  const scopeForProgress = state.tasks.filter(
    (t) => matchesFilters(t) && (isDueOn(t, today, today) || (t.dueDate && t.dueDate < today))
  );
  renderProgressFor(scopeForProgress, 'Today:');

  const overdue = overdueTasks(pool);
  const dueToday = pool.filter((t) => !overdue.includes(t) && isDueOn(t, today, today));

  if (overdue.length === 0 && dueToday.length === 0) {
    root.appendChild(UI.renderEmptyState("You're all caught up", 'Nothing due today. Add something with the bar above.'));
    return;
  }
  if (overdue.length) root.appendChild(UI.renderSection('Overdue', overdue, handlers, { sortByPriority: true }));
  root.appendChild(UI.renderSection('Due Today', dueToday, handlers, { sortByPriority: true, emptyText: 'Nothing due today.' }));
}

function renderWeekView(root) {
  const today = Rec.todayISO();
  const weekEnd = Rec.endOfWeek(today);
  const pool = activeTasks();
  const scopeForProgress = state.tasks.filter(
    (t) => matchesFilters(t) && ((t.dueDate && t.dueDate <= weekEnd) || (Rec.isRecurring(t.cadence) && !t.dueDate))
  );
  renderProgressFor(scopeForProgress, 'This week:');

  const overdue = overdueTasks(pool);
  const dueToday = pool.filter((t) => !overdue.includes(t) && isDueOn(t, today, today));
  const restOfWeek = pool.filter(
    (t) => !overdue.includes(t) && !dueToday.includes(t) && t.dueDate && t.dueDate > today && t.dueDate <= weekEnd
  );

  if (!overdue.length && !dueToday.length && !restOfWeek.length) {
    root.appendChild(UI.renderEmptyState("You're all caught up", 'Nothing on deck for the rest of this week.'));
    return;
  }
  if (overdue.length) root.appendChild(UI.renderSection('Overdue', overdue, handlers, { sortByPriority: true }));
  root.appendChild(UI.renderSection('Due Today', dueToday, handlers, { sortByPriority: true, emptyText: 'Nothing due today.' }));
  root.appendChild(UI.renderSection('Later This Week', restOfWeek, handlers, { emptyText: 'Nothing else scheduled this week.' }));
}

function renderMonthView(root) {
  const monthStart = state.monthCursor;
  const monthEnd = Rec.endOfMonth(monthStart);
  const today = Rec.todayISO();
  const pool = activeTasks();

  const scopeForProgress = state.tasks.filter((t) => matchesFilters(t) && t.dueDate && t.dueDate >= monthStart && t.dueDate <= monthEnd);
  const monthLabel = Rec.isoToDate(monthStart).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  renderProgressFor(scopeForProgress, `${monthLabel}:`);

  root.appendChild(
    viewToolbar(monthLabel, () => {
      state.monthCursor = Rec.startOfMonth(Rec.addMonths(monthStart, -1));
      state.selectedDay = null;
      render();
    }, () => {
      state.monthCursor = Rec.startOfMonth(Rec.addMonths(monthStart, 1));
      state.selectedDay = null;
      render();
    })
  );

  const tasksByDate = {};
  pool.forEach((t) => {
    if (t.dueDate) (tasksByDate[t.dueDate] ||= []).push(t);
  });
  root.appendChild(
    UI.renderMonthCalendar(monthStart, tasksByDate, (iso) => {
      state.selectedDay = state.selectedDay === iso ? null : iso;
      render();
    }, state.selectedDay)
  );

  const overdue = overdueTasks(pool);

  if (state.selectedDay) {
    const dayTasks = pool.filter((t) => !overdue.includes(t) && t.dueDate === state.selectedDay);
    const label = Rec.isoToDate(state.selectedDay).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
    root.appendChild(
      UI.el('div', { class: 'selected-day-bar' }, [
        UI.el('span', {}, `Showing ${label}`),
        UI.el('button', { class: 'link-btn', type: 'button', onclick: () => { state.selectedDay = null; render(); } }, 'Clear'),
      ])
    );
    if (overdue.length) root.appendChild(UI.renderSection('Overdue', overdue, handlers, { sortByPriority: true }));
    root.appendChild(UI.renderSection(label, dayTasks, handlers, { emptyText: 'Nothing due this day.' }));
    return;
  }

  const restOfMonth = pool.filter((t) => !overdue.includes(t) && t.dueDate && t.dueDate >= monthStart && t.dueDate <= monthEnd);
  const someday = pool.filter((t) => !t.dueDate && t.cadence === 'one-time');

  if (overdue.length) root.appendChild(UI.renderSection('Overdue', overdue, handlers, { sortByPriority: true }));
  root.appendChild(UI.renderSection('Due This Month', restOfMonth, handlers, { emptyText: 'Nothing else due this month.' }));
  if (someday.length) root.appendChild(UI.renderSection('Someday', someday, handlers, {}));
}

function renderYearView(root) {
  const yearStart = state.yearCursor;
  const yearEnd = Rec.endOfYear(yearStart);
  const yearNum = Rec.isoToDate(yearStart).getFullYear();
  const pool = activeTasks();

  const scopeForProgress = state.tasks.filter((t) => matchesFilters(t) && t.dueDate && t.dueDate >= yearStart && t.dueDate <= yearEnd);
  renderProgressFor(scopeForProgress, `${yearNum}:`);

  root.appendChild(
    viewToolbar(String(yearNum), () => {
      state.yearCursor = Rec.startOfYear(Rec.addYears(yearStart, -1));
      render();
    }, () => {
      state.yearCursor = Rec.startOfYear(Rec.addYears(yearStart, 1));
      render();
    })
  );

  const overdue = overdueTasks(pool);
  if (overdue.length) root.appendChild(UI.renderSection('Overdue', overdue, handlers, { sortByPriority: true }));

  const quarters = [
    ['Q1 · Jan–Mar', `${yearNum}-01-01`, `${yearNum}-03-31`],
    ['Q2 · Apr–Jun', `${yearNum}-04-01`, `${yearNum}-06-30`],
    ['Q3 · Jul–Sep', `${yearNum}-07-01`, `${yearNum}-09-30`],
    ['Q4 · Oct–Dec', `${yearNum}-10-01`, `${yearNum}-12-31`],
  ];
  quarters.forEach(([label, start, end]) => {
    const qTasks = pool.filter((t) => !overdue.includes(t) && t.dueDate && t.dueDate >= start && t.dueDate <= end);
    root.appendChild(UI.renderSection(label, qTasks, handlers, { emptyText: 'Nothing scheduled.' }));
  });

  const someday = pool.filter((t) => !t.dueDate && t.cadence === 'one-time');
  if (someday.length) root.appendChild(UI.renderSection('Someday', someday, handlers, {}));
}

function renderArchiveView(root) {
  const doneOneTime = state.tasks
    .filter((t) => t.status === 'done' && matchesFilters(t))
    .sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''));

  UI.renderProgress(doneOneTime.length, doneOneTime.length, 'Archive:');

  root.appendChild(UI.renderSection('Completed', doneOneTime, handlers, { emptyText: 'Nothing completed yet.' }));

  const historyEntries = [];
  state.tasks.forEach((t) => {
    if (!matchesFilters(t)) return;
    (t.completionHistory || []).forEach((ts) => historyEntries.push({ task: t, ts }));
  });
  historyEntries.sort((a, b) => b.ts.localeCompare(a.ts));

  const historySection = UI.el('section', { class: 'task-section' }, [
    UI.el('div', { class: 'task-section-header' }, [
      UI.el('h3', { class: 'task-section-title' }, 'Recurring Completion History'),
      UI.el('span', { class: 'task-section-count' }, String(historyEntries.length)),
    ]),
  ]);
  if (historyEntries.length === 0) {
    historySection.appendChild(UI.el('div', { class: 'task-section-empty' }, 'No recurring completions logged yet.'));
  } else {
    const list = UI.el('div', { class: 'history-list' });
    historyEntries.slice(0, 100).forEach(({ task, ts }) => {
      const date = new Date(ts).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
      list.appendChild(
        UI.el('div', { class: 'history-row' }, [
          UI.el('span', { class: 'history-task' }, task.title),
          UI.el('span', { class: 'history-date' }, date),
        ])
      );
    });
    historySection.appendChild(list);
    if (historyEntries.length > 100) {
      historySection.appendChild(UI.el('div', { class: 'task-section-empty' }, `+ ${historyEntries.length - 100} earlier completions not shown.`));
    }
  }
  root.appendChild(historySection);
}

function render() {
  if (!state.loaded) return;
  UI.renderTagOptions(buildTagList(), state.filters.tag);

  const root = UI.$('#view-root');
  root.innerHTML = '';

  UI.$all('.view-tab').forEach((btn) => btn.classList.toggle('active', btn.dataset.view === state.view));

  switch (state.view) {
    case 'today': renderTodayView(root); break;
    case 'week': renderWeekView(root); break;
    case 'month': renderMonthView(root); break;
    case 'year': renderYearView(root); break;
    case 'archive': renderArchiveView(root); break;
    default: renderTodayView(root);
  }
}

// ---------- Quick add ----------

function wireQuickAdd() {
  const form = UI.$('#quickadd-form');
  const input = UI.$('#quickadd-input');
  const detailsPanel = UI.$('#quickadd-details');
  const detailsToggle = UI.$('#quickadd-details-toggle');

  detailsToggle.addEventListener('click', () => {
    detailsPanel.classList.toggle('hidden');
    detailsToggle.classList.toggle('active');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = input.value.trim();
    if (!title) return;

    const tagsRaw = UI.$('#qa-tags').value;
    const task = addTask({
      title,
      cadence: UI.$('#qa-cadence').value,
      dueDate: UI.$('#qa-due').value || null,
      priority: UI.$('#qa-priority').value,
      recurrenceRule: UI.$('#qa-rule').value.trim(),
      tags: tagsRaw ? tagsRaw.split(',').map((t) => t.trim().toLowerCase().replace(/\s+/g, '-')).filter(Boolean) : [],
    });

    if (task) {
      input.value = '';
      UI.$('#qa-tags').value = '';
      UI.$('#qa-due').value = '';
      UI.$('#qa-cadence').value = 'one-time';
      UI.$('#qa-priority').value = 'medium';
      UI.$('#qa-rule').value = '';
      input.focus();
    }
  });
}

// ---------- Wiring ----------

function wireViewTabs() {
  UI.$all('.view-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.view = btn.dataset.view;
      state.selectedDay = null;
      render();
    });
  });
}

function wireFilters() {
  let debounce;
  UI.$('#search-input').addEventListener('input', (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      state.filters.text = e.target.value;
      render();
    }, 150);
  });
  UI.$('#tag-filter').addEventListener('change', (e) => {
    state.filters.tag = e.target.value;
    render();
  });
  UI.$('#priority-filter').addEventListener('change', (e) => {
    state.filters.priority = e.target.value;
    render();
  });
}

function wireTheme() {
  UI.applyTheme(UI.loadTheme());
  UI.$('#theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    UI.applyTheme(next);
  });
}

function wireSettings() {
  const openSettings = (closeable) => {
    UI.openSettingsModal(GitHub.loadConfig(), {
      onSave: (config) => {
        const wasConfigured = GitHub.isConfigured();
        GitHub.saveConfig(config);
        UI.closeSettingsModal();
        if (!wasConfigured) {
          init();
        } else {
          UI.showToast('Settings saved', 'success');
        }
      },
      onClose: () => UI.closeSettingsModal(),
    });
    UI.setSettingsCloseable(closeable);
  };
  UI.$('#settings-btn').addEventListener('click', () => openSettings(true));
  window.__ccOpenSettings = openSettings;
}

function wireExport() {
  UI.$('#export-btn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state.tasks, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-backup-${Rec.todayISO()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    UI.showToast('Backup downloaded', 'success');
  });
}

function wireKeyboard() {
  document.addEventListener('keydown', (e) => {
    const isTypingTarget = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
    if ((e.key === '/' && !isTypingTarget) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      UI.$('#quickadd-input').focus();
    }
    if (e.key === 'Escape') {
      UI.closeTaskModal();
      if (GitHub.isConfigured()) UI.closeSettingsModal();
    }
  });
}

function wireSyncStatus() {
  GitHub.onStatus((status) => UI.renderSyncIndicator(status));
  window.addEventListener('online', () => GitHub.retryNow(state.tasks));
  window.addEventListener('offline', () => UI.renderSyncIndicator('offline'));
}

async function init() {
  if (!GitHub.isConfigured()) {
    UI.$('#view-root').innerHTML = '';
    window.__ccOpenSettings(false);
    return;
  }
  UI.closeSettingsModal();
  await loadInitial();
}

function boot() {
  wireTheme();
  wireQuickAdd();
  wireViewTabs();
  wireFilters();
  wireSettings();
  wireExport();
  wireKeyboard();
  wireSyncStatus();
  init();
}

document.addEventListener('DOMContentLoaded', boot);
