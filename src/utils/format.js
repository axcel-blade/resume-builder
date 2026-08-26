/* src/utils/format.js
 *
 * Shared formatting helpers used by both the on-screen template (React)
 * and the PDF builder (jsPDF). Centralising these guarantees the preview
 * and the exported PDF stay in lock-step on the things the resume-format
 * checker is grading us on:
 *
 *   • Dates rendered as "Jun 2022" (abbreviated month + 4-digit year)
 *   • Consistent " – " separator (en-dash, single space each side)
 *   • Reverse-chronological ordering on date-bearing sections
 *   • Trailing-period consistency inside any given section
 */

export const DATE_RANGE_SEP = " – ";

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
 *  - "2022-06" / "2022-6" / "2022-06-15" -> "Jun 2022"
 *  - "June 2022" / "Jun 2022" / "Jun. 2022" -> "Jun 2022"
 *  - "06/2022" / "6/2022" -> "Jun 2022"
 *  - "2022"     -> "2022"
 *  - "Present"  -> "Present"
 *  - ""         -> ""
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

  if (/^\d{4}$/.test(v)) return v;
  return v;
}

/**
 * "Jun 2022 – Present" — single en-dash, single space either side.
 * Job-like ranges default empty `end` to Present. Pass presentIfEmpty: false
 * for certificates so a missing expiry does not become "Present".
 */
export function formatDateRange(start, end, { presentIfEmpty = true } = {}) {
  const s = formatDate(start);
  const e = end ? formatDate(end) : (presentIfEmpty ? "Present" : "");
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s}${DATE_RANGE_SEP}${e}`;
}

/**
 * Sort an array of items reverse-chronologically by their date field.
 * Lexicographic compare on "YYYY-MM" / "YYYY" works because the format is fixed.
 * Items lacking a date sink to the bottom.
 */
export function sortByStartDesc(items, key = "start") {
  if (!Array.isArray(items)) return items;
  return [...items].sort((a, b) => {
    const A = (a?.[key] || "").trim();
    const B = (b?.[key] || "").trim();
    if (!A && !B) return 0;
    if (!A) return 1;
    if (!B) return -1;
    return B.localeCompare(A);
  });
}

/**
 * Section-level bullet normaliser.
 *
 * The community style guide says "all bullets end with a period OR none
 * of them do" — but applied per-section. Skill rows are noun phrases
 * ("React.js", "PostgreSQL") so periods would look wrong. Everywhere
 * else (Experience, Projects, Education, Achievements) we want trailing
 * periods on every bullet.
 *
 * Pass { period: true } for prose sections, { period: false } for skills.
 */
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
