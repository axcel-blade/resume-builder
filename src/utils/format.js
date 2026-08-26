/* src/utils/format.js
 *
 * Shared formatting helpers used by both the on-screen template (React)
 * and the PDF builder (jsPDF). VMock community checks require:
 *
 *   • Abbreviated months, no period ("Jun 2022")
 *   • Date ranges with a spaced hyphen: "Jun 2022 - Present"
 *   • Dates bold + italic, same type size as the rest of the section
 *   • Reverse-chronological order (current / latest end date first)
 */

export const DATE_RANGE_SEP = " - ";

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MONTHS_LONG = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

function monthIndexFromName(name) {
  const n = String(name).replace(/\./g, "").toLowerCase();
  const long = MONTHS_LONG.indexOf(n);
  if (long >= 0) return long;
  const short = MONTHS_SHORT.findIndex((m) => m.toLowerCase() === n);
  return short;
}

/**
 * Convert common date inputs to a display string.
 * Year-only values become "Jan YYYY" so every date includes an abbreviated month.
 */
export function formatDate(s) {
  if (!s) return "";
  const v = String(s).trim();
  if (!v) return "";
  if (/^present$/i.test(v) || /^current$/i.test(v) || /^now$/i.test(v)) {
    return "Present";
  }

  const iso = /^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/.exec(v);
  if (iso) {
    const year = iso[1];
    const idx = parseInt(iso[2], 10) - 1;
    if (idx >= 0 && idx < 12) return `${MONTHS_SHORT[idx]} ${year}`;
  }

  const named = /^(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)\.?[\s,]+(\d{4})$/i.exec(v);
  if (named) {
    let idx = monthIndexFromName(named[1]);
    if (named[1].toLowerCase() === "sept") idx = 8;
    if (idx >= 0) return `${MONTHS_SHORT[idx]} ${named[2]}`;
  }

  const slash = /^(\d{1,2})[/-](\d{4})$/.exec(v);
  if (slash) {
    const idx = parseInt(slash[1], 10) - 1;
    if (idx >= 0 && idx < 12) return `${MONTHS_SHORT[idx]} ${slash[2]}`;
  }

  if (/^\d{4}$/.test(v)) return `Jan ${v}`;
  return v;
}

/**
 * "Jun 2022 - Present" — ASCII hyphen, one space either side (VMock space-dash-space).
 */
export function formatDateRange(start, end, { presentIfEmpty = true } = {}) {
  const s = formatDate(start);
  const e = end ? formatDate(end) : (presentIfEmpty ? "Present" : "");
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s}${DATE_RANGE_SEP}${e}`;
}

/** Sort key YYYY-MM. Present / empty end sorts as still current. */
export function toYearMonth(s) {
  const v = String(s || "").trim();
  if (!v || /^present$/i.test(v) || /^current$/i.test(v) || /^now$/i.test(v)) {
    return "9999-12";
  }
  const iso = /^(\d{4})-(\d{1,2})/.exec(v);
  if (iso) return `${iso[1]}-${String(parseInt(iso[2], 10)).padStart(2, "0")}`;
  if (/^\d{4}$/.test(v)) return `${v}-12`;
  const named = formatDate(v);
  const m = /^([A-Z][a-z]{2}) (\d{4})$/.exec(named);
  if (m) {
    const idx = MONTHS_SHORT.indexOf(m[1]);
    if (idx >= 0) return `${m[2]}-${String(idx + 1).padStart(2, "0")}`;
  }
  return "0000-00";
}

/**
 * Reverse chronological: later end date first (Present first), then later start.
 */
export function sortByRecencyDesc(items, { startKey = "start", endKey = "end" } = {}) {
  if (!Array.isArray(items)) return items;
  return [...items].sort((a, b) => {
    const aEnd = toYearMonth(a?.[endKey] || a?.[startKey]);
    const bEnd = toYearMonth(b?.[endKey] || b?.[startKey]);
    if (aEnd !== bEnd) return bEnd.localeCompare(aEnd);
    return toYearMonth(b?.[startKey]).localeCompare(toYearMonth(a?.[startKey]));
  });
}

/** @deprecated prefer sortByRecencyDesc */
export function sortByStartDesc(items, key = "start") {
  if (key === "year") {
    return sortByRecencyDesc(items, { startKey: "year", endKey: "year" });
  }
  return sortByRecencyDesc(items, { startKey: key, endKey: "end" });
}

export function normalizeBullets(items, { period = true } = {}) {
  if (!Array.isArray(items)) return items;
  return items.map((b) => {
    const t = String(b ?? "").trim();
    if (!t) return t;
    const last = t.slice(-1);
    const ends = ".!?".includes(last);
    if (period && !ends) return t + ".";
    if (!period && last === ".") return t.slice(0, -1);
    return t;
  });
}
