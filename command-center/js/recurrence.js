// Cadence / recurrence helpers. Deliberately simple: no RRULE spec, just
// "add N days/months/years" plus a couple of human-readable rule keywords.

const WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export function todayISO() {
  return dateToISO(new Date());
}

export function dateToISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function isoToDate(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(iso, n) {
  const d = isoToDate(iso);
  d.setDate(d.getDate() + n);
  return dateToISO(d);
}

export function addMonths(iso, n) {
  const d = isoToDate(iso);
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + n);
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, lastDay));
  return dateToISO(d);
}

export function addYears(iso, n) {
  const d = isoToDate(iso);
  d.setFullYear(d.getFullYear() + n);
  return dateToISO(d);
}

export function isRecurring(cadence) {
  return cadence && cadence !== 'one-time';
}

export function startOfWeek(iso) {
  const d = isoToDate(iso);
  const dow = d.getDay(); // 0 = Sunday
  d.setDate(d.getDate() - dow);
  return dateToISO(d);
}

export function endOfWeek(iso) {
  return addDays(startOfWeek(iso), 6);
}

export function startOfMonth(iso) {
  const d = isoToDate(iso);
  return dateToISO(new Date(d.getFullYear(), d.getMonth(), 1));
}

export function endOfMonth(iso) {
  const d = isoToDate(iso);
  return dateToISO(new Date(d.getFullYear(), d.getMonth() + 1, 0));
}

export function startOfYear(iso) {
  const d = isoToDate(iso);
  return dateToISO(new Date(d.getFullYear(), 0, 1));
}

export function endOfYear(iso) {
  const d = isoToDate(iso);
  return dateToISO(new Date(d.getFullYear(), 11, 31));
}

export function isBefore(a, b) {
  return a < b;
}

export function isSameDay(a, b) {
  return a === b;
}

function nextWeekdayOnOrAfter(iso, targetDow) {
  const d = isoToDate(iso);
  const diff = (targetDow - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + diff);
  return dateToISO(d);
}

// Parses a light-touch rule string ("every thursday", "1st of month") and
// returns the next due date on top of the cadence's default interval.
export function computeNextDueDate(task, fromISO) {
  const base = fromISO || task.dueDate || todayISO();
  const rule = (task.recurrence && task.recurrence.rule || '').toLowerCase();

  switch (task.cadence) {
    case 'daily':
      return addDays(base, 1);

    case 'weekly': {
      const namedDay = WEEKDAYS.findIndex((w) => rule.includes(w));
      if (namedDay !== -1) return nextWeekdayOnOrAfter(base, namedDay);
      return addDays(base, 7);
    }

    case 'monthly': {
      if (rule.includes('last day')) {
        const next = addMonths(base, 1);
        return endOfMonth(next);
      }
      const dayMatch = rule.match(/(\d{1,2})(st|nd|rd|th)?/);
      if (dayMatch) {
        const day = Math.min(31, parseInt(dayMatch[1], 10));
        const d = isoToDate(base);
        const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
        const lastDay = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
        next.setDate(Math.min(day, lastDay));
        return dateToISO(next);
      }
      return addMonths(base, 1);
    }

    case 'quarterly':
      return addMonths(base, 3);

    case 'yearly':
      return addYears(base, 1);

    default:
      return null;
  }
}

export function cadenceLabel(cadence) {
  const labels = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    yearly: 'Yearly',
    'one-time': 'One-time',
  };
  return labels[cadence] || cadence;
}
