// DOM rendering helpers. This module never mutates task data; it only
// reads state and renders, and reports user intent back via callbacks.

import { todayISO, cadenceLabel, isRecurring } from './recurrence.js';

const PRIORITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };
const PRIORITY_LABEL = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' };

export function $(sel, root = document) {
  return root.querySelector(sel);
}

export function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if (v !== false && v !== null && v !== undefined) node.setAttribute(k, v);
  }
  for (const child of [].concat(children)) {
    if (child == null) continue;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

// ---------- Theme ----------

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('cc_theme', theme);
  const btn = $('#theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

export function loadTheme() {
  return localStorage.getItem('cc_theme') || 'dark';
}

// ---------- Sync indicator ----------

const SYNC_LABELS = {
  saved: 'Saved',
  saving: 'Saving…',
  unsynced: 'Unsynced changes',
  offline: 'Offline',
  error: 'Sync failed, retrying',
  'auth-error': 'Sync failed, check token',
};

export function renderSyncIndicator(status) {
  const node = $('#sync-indicator');
  if (!node) return;
  node.dataset.state = status;
  node.setAttribute('aria-label', `Sync status: ${SYNC_LABELS[status] || status}`);
  $('.sync-label', node).textContent = SYNC_LABELS[status] || status;
}

// ---------- Toast ----------

let toastTimer = null;
export function showToast(message, kind = 'info') {
  const node = $('#toast');
  if (!node) return;
  node.textContent = message;
  node.dataset.kind = kind;
  node.classList.remove('hidden');
  node.classList.add('toast-in');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    node.classList.add('hidden');
    node.classList.remove('toast-in');
  }, 3200);
}

// ---------- Progress ----------

export function renderProgress(done, total, label) {
  const fill = $('#progress-fill');
  const text = $('#progress-label');
  if (!fill || !text) return;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  fill.style.width = `${pct}%`;
  text.textContent = total === 0 ? 'Nothing on the books' : `${label || ''} ${done} of ${total} done`.trim();
}

// ---------- Filter option lists ----------

export function renderTagOptions(allTags, selected) {
  const select = $('#tag-filter');
  if (!select) return;
  const current = selected ?? select.value;
  select.innerHTML = '';
  select.appendChild(el('option', { value: '', text: 'All tags' }));
  allTags.sort().forEach((tag) => {
    select.appendChild(el('option', { value: tag, text: `#${tag}` }));
  });
  select.value = current;
}

// ---------- Task row ----------

function dueBadge(task) {
  if (!task.dueDate) return null;
  const overdue = task.dueDate < todayISO() && task.status !== 'done';
  const dueToday = task.dueDate === todayISO();
  const label = new Date(task.dueDate + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const cls = ['due-badge'];
  if (overdue) cls.push('due-badge-overdue');
  else if (dueToday) cls.push('due-badge-today');
  return el('span', { class: cls.join(' ') }, overdue ? `Overdue · ${label}` : dueToday ? 'Today' : label);
}

export function createTaskRow(task, handlers) {
  const overdue = task.dueDate && task.dueDate < todayISO() && task.status !== 'done';
  const rowClasses = ['task-row'];
  if (task.status === 'done') rowClasses.push('task-row-done');
  if (overdue) rowClasses.push('task-row-overdue');
  if (task.priority === 'critical') rowClasses.push('task-row-critical');

  const checkbox = el('button', {
    class: 'task-check',
    'aria-label': task.status === 'done' ? 'Mark not done' : 'Mark done',
    type: 'button',
    onclick: (e) => {
      e.stopPropagation();
      if (task.status === 'done') {
        handlers.onToggleDone(task);
        return;
      }
      // Peak-End Rule: let the checkmark/strike-through animation play
      // before the row leaves the list on the next render.
      checkbox.classList.add('task-check-done');
      row.classList.add('task-row-completing');
      row.style.pointerEvents = 'none';
      setTimeout(() => handlers.onToggleDone(task), 360);
    },
  });
  if (task.status === 'done') checkbox.classList.add('task-check-done');
  checkbox.appendChild(el('span', { class: 'task-check-mark' }, '✓'));

  const progressDot = el('button', {
    class: `task-progress-dot task-progress-${task.status}`,
    type: 'button',
    title: task.status === 'in-progress' ? 'In progress, click to reset' : 'Mark in progress',
    'aria-label': 'Toggle in-progress status',
    onclick: (e) => {
      e.stopPropagation();
      handlers.onToggleProgress(task);
    },
  });
  if (task.status === 'done') progressDot.classList.add('hidden');

  const titleEl = el('span', { class: 'task-title' }, task.title);

  const meta = el('div', { class: 'task-meta' });
  const badge = dueBadge(task);
  if (badge) meta.appendChild(badge);
  if (isRecurring(task.cadence)) {
    meta.appendChild(el('span', { class: 'task-chip task-chip-cadence' }, `↻ ${cadenceLabel(task.cadence)}`));
  }
  meta.appendChild(el('span', { class: `task-chip task-chip-priority priority-${task.priority}` }, PRIORITY_LABEL[task.priority]));
  (task.tags || []).forEach((tag) => {
    meta.appendChild(el('span', { class: 'task-chip task-chip-tag' }, `#${tag}`));
  });

  const main = el('div', { class: 'task-main' }, [titleEl, meta]);

  const row = el('div', { class: rowClasses.join(' '), role: 'listitem', tabindex: '0' }, [checkbox, progressDot, main]);
  row.addEventListener('click', () => handlers.onOpen(task));
  row.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handlers.onOpen(task);
  });
  return row;
}

// ---------- Sections ----------

export function renderSection(title, tasks, handlers, opts = {}) {
  const section = el('section', { class: 'task-section' });
  const header = el('div', { class: 'task-section-header' }, [
    el('h3', { class: 'task-section-title' }, title),
    el('span', { class: 'task-section-count' }, String(tasks.length)),
  ]);
  section.appendChild(header);

  if (tasks.length === 0) {
    section.appendChild(el('div', { class: 'task-section-empty' }, opts.emptyText || 'Nothing here.'));
    return section;
  }

  const list = el('div', { class: 'task-list', role: 'list' });
  tasks
    .slice()
    .sort((a, b) => {
      if (opts.sortByPriority) {
        const pa = PRIORITY_ORDER[a.priority] ?? 9;
        const pb = PRIORITY_ORDER[b.priority] ?? 9;
        if (pa !== pb) return pa - pb;
      }
      return (a.dueDate || '9999').localeCompare(b.dueDate || '9999');
    })
    .forEach((task) => list.appendChild(createTaskRow(task, handlers)));
  section.appendChild(list);
  return section;
}

export function renderEmptyState(message, sub) {
  return el('div', { class: 'empty-state' }, [
    el('div', { class: 'empty-state-icon' }, '✓'),
    el('div', { class: 'empty-state-title' }, message),
    sub ? el('div', { class: 'empty-state-sub' }, sub) : null,
  ]);
}

export function renderLoading() {
  return el('div', { class: 'loading-state' }, [
    el('div', { class: 'spinner' }),
    el('div', { class: 'loading-text' }, 'Loading tasks from GitHub…'),
  ]);
}

// ---------- Month calendar ----------

export function renderMonthCalendar(monthCursorISO, tasksByDate, onDayClick, selectedDay) {
  const [y, m] = monthCursorISO.split('-').map(Number);
  const first = new Date(y, m - 1, 1);
  const startOffset = first.getDay();
  const daysInMonth = new Date(y, m, 0).getDate();
  const today = todayISO();

  const grid = el('div', { class: 'calendar-grid' });
  ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach((d) => {
    grid.appendChild(el('div', { class: 'calendar-dow' }, d));
  });

  for (let i = 0; i < startOffset; i++) {
    grid.appendChild(el('div', { class: 'calendar-cell calendar-cell-empty' }));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const iso = `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayTasks = tasksByDate[iso] || [];
    const hasOverdueOrCritical = dayTasks.some((t) => t.priority === 'critical' || (t.dueDate < today && t.status !== 'done'));
    const cellClasses = ['calendar-cell'];
    if (iso === today) cellClasses.push('calendar-cell-today');
    if (iso === selectedDay) cellClasses.push('calendar-cell-selected');
    if (hasOverdueOrCritical) cellClasses.push('calendar-cell-alert');

    const cell = el('button', { class: cellClasses.join(' '), type: 'button', onclick: () => onDayClick(iso) }, [
      el('span', { class: 'calendar-daynum' }, String(day)),
    ]);
    if (dayTasks.length > 0) {
      const dots = el('span', { class: 'calendar-dots' });
      dayTasks.slice(0, 4).forEach((t) => {
        dots.appendChild(el('span', { class: `calendar-dot priority-dot-${t.priority}` }));
      });
      cell.appendChild(dots);
    }
    grid.appendChild(cell);
  }

  return grid;
}

// ---------- Task detail modal ----------

export function openTaskModal(task, tagSuggestions, handlers) {
  const modal = $('#task-modal');
  modal.classList.remove('hidden');
  $('#task-modal-title-label').textContent = task.id ? 'Edit task' : 'New task';

  $('#task-title').value = task.title || '';
  $('#task-notes').value = task.notes || '';
  $('#task-cadence').value = task.cadence || 'one-time';
  $('#task-due').value = task.dueDate || '';
  $('#task-priority').value = task.priority || 'medium';
  $('#task-status').value = task.status || 'todo';
  $('#task-tags').value = (task.tags || []).join(', ');
  $('#task-recurrence-rule').value = (task.recurrence && task.recurrence.rule) || '';

  toggleRecurrenceRuleVisibility($('#task-cadence').value);

  const deleteBtn = $('#task-delete-btn');
  deleteBtn.classList.toggle('hidden', !task.id);

  const form = $('#task-form');
  form.onsubmit = (e) => {
    e.preventDefault();
    handlers.onSave(readTaskForm(task));
  };
  deleteBtn.onclick = () => handlers.onDelete(task);
  $('#task-modal-close').onclick = () => closeTaskModal();
  $('#task-cadence').onchange = (e) => toggleRecurrenceRuleVisibility(e.target.value);
}

function toggleRecurrenceRuleVisibility(cadence) {
  $('#task-recurrence-row').classList.toggle('hidden', cadence === 'one-time');
}

function readTaskForm(existing) {
  const tags = $('#task-tags').value
    .split(',')
    .map((t) => t.trim().toLowerCase().replace(/\s+/g, '-'))
    .filter(Boolean);
  return {
    ...existing,
    title: $('#task-title').value.trim(),
    notes: $('#task-notes').value,
    cadence: $('#task-cadence').value,
    dueDate: $('#task-due').value || null,
    priority: $('#task-priority').value,
    status: $('#task-status').value,
    tags,
    recurrence: {
      enabled: $('#task-cadence').value !== 'one-time',
      rule: $('#task-recurrence-rule').value.trim(),
    },
  };
}

export function closeTaskModal() {
  $('#task-modal').classList.add('hidden');
}

// ---------- Settings modal ----------

export function openSettingsModal(config, handlers) {
  const modal = $('#settings-modal');
  modal.classList.remove('hidden');
  $('#settings-owner').value = config?.owner || '';
  $('#settings-repo').value = config?.repo || '';
  $('#settings-pat').value = config?.pat || '';
  $('#settings-path').value = config?.path || 'command-center/data/tasks.json';
  $('#settings-branch').value = config?.branch || 'main';

  $('#settings-form').onsubmit = (e) => {
    e.preventDefault();
    handlers.onSave({
      owner: $('#settings-owner').value.trim(),
      repo: $('#settings-repo').value.trim(),
      pat: $('#settings-pat').value.trim(),
      path: $('#settings-path').value.trim() || 'command-center/data/tasks.json',
      branch: $('#settings-branch').value.trim() || 'main',
    });
  };
  $('#settings-close').onclick = handlers.onClose;
}

export function closeSettingsModal() {
  $('#settings-modal').classList.add('hidden');
}

export function setSettingsCloseable(closeable) {
  $('#settings-close').classList.toggle('hidden', !closeable);
}
