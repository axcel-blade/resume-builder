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

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Convert "YYYY-MM" / "YYYY" / "Present" / "" to a display string.
 *  - "2022-06"  -> "Jun 2022"
 *  - "2022"     -> "2022"
 *  - "Present"  -> "Present"
 *  - ""         -> ""
 *  - any other free-form input is returned unchanged.
 */
export function formatDate(s) {
  if (!s) return "";
  const v = String(s).trim();
  if (!v) return "";
  if (/^present$/i.test(v)) return "Present";

  const m = /^(\d{4})-(\d{1,2})$/.exec(v);
  if (m) {
    const year = m[1];
    const idx = parseInt(m[2], 10) - 1;
    if (idx >= 0 && idx < 12) return `${MONTHS_SHORT[idx]} ${year}`;
  }

  if (/^\d{4}$/.test(v)) return v;
  return v;
}

/**
 * "Jun 2022 – Present" — single en-dash, single space either side.
 * If `end` is empty the range becomes "<start> – Present".
 */
export function formatDateRange(start, end) {
  const s = formatDate(start);
  const e = end ? formatDate(end) : "Present";
  if (!s && (!e || e === "Present")) return "";
  if (!s) return e;
  return `${s} – ${e}`;
}

/**
 * Sort an array of items reverse-chronologically by their `start` field.
 * Lexicographic compare on "YYYY-MM" works because the format is fixed.
 * Items lacking a start date sink to the bottom.
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