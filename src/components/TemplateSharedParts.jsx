/* src/components/TemplateSharedParts.jsx */

import React from "react";
import { formatDate, formatDateRange, sortByRecencyDesc, normalizeBullets, formatInstitutionName } from "../utils/format";

// ─── Font ────────────────────────────────────────────────────────────────────
// Single hardcoded sans-serif stack. The Curtin Resume Workbook (p.24)
// recommends sans-serif fonts (Arial, Calibri, Helvetica) as easiest to
// read on screen and in print, so we standardise on Helvetica Neue with
// Arial fallbacks across all templates and the PDF export.
export const RESUME_FONT_STACK =
  '"Helvetica Neue", Helvetica, Arial, sans-serif';

// ─── Section ordering ────────────────────────────────────────────────────────
// Default order of the *moveable* body sections — i.e. those that appear
// between the always-on-top Career Objective and the always-at-bottom
// References. The user can reorder these via the Section Order panel in
// the editor; the chosen order is persisted in `data.meta.sectionOrder`.
export const DEFAULT_SECTION_ORDER = [
  "experience",
  "education",
  "projects",
  "skills",
  "achievements",
  "voluntary",
  "certificates",
  "interests",
];

// Returns a safe, complete section order. Unknown ids are dropped, and any
// known sections missing from the stored order are appended at the end so
// nothing silently disappears after upgrades or partial JSON imports.
export function getSectionOrder(meta) {
  const stored = meta?.sectionOrder;
  if (!Array.isArray(stored) || stored.length === 0) return DEFAULT_SECTION_ORDER;
  const known = new Set(DEFAULT_SECTION_ORDER);
  const filtered = stored.filter((id) => known.has(id));
  const missing = DEFAULT_SECTION_ORDER.filter((id) => !filtered.includes(id));
  return [...filtered, ...missing];
}

// ─── Layout / typography constants — match jsPDF (11pt) ──────────────────────
// VMock flags mixed sizes. The professional Title, section headings, job
// titles, dates, and bullets all use the same 11pt. Only the name is larger.
export const RESUME_TEXT_SIZE = "11pt";
const C = {
  name:    { fontSize: "16pt", fontWeight: "700", lineHeight: 1.1 },
  title:   { fontSize: RESUME_TEXT_SIZE, fontWeight: "400", color: "#3c3c3c", marginTop: "4px" },
  contact: { fontSize: RESUME_TEXT_SIZE, color: "#505050",  marginTop: "5px" },
  linkRow: { fontSize: RESUME_TEXT_SIZE, marginTop: "3px" },
  secHead: { fontSize: RESUME_TEXT_SIZE, fontWeight: "700", textTransform: "uppercase" },
  rule:    { height: "0.75px",   marginTop: "2px", marginBottom: "5px" },
  eTitle:  { fontSize: RESUME_TEXT_SIZE, fontWeight: "700", color: "#1e1e1e" },
  eComp:   { fontSize: RESUME_TEXT_SIZE, fontWeight: "400", color: "#5a5a5a" },
  eMeta:   { fontSize: RESUME_TEXT_SIZE, color: "#505050",  marginTop: "1px", marginBottom: "3px" },
  date:    { fontSize: RESUME_TEXT_SIZE, fontWeight: "700", fontStyle: "italic", color: "#1e1e1e", whiteSpace: "nowrap" },
  bullet:  { fontSize: RESUME_TEXT_SIZE, color: "#323232",  lineHeight: 1.55 },
  summary: { fontSize: RESUME_TEXT_SIZE, color: "#323232",  lineHeight: 1.6  },
};

// ─── Section heading ─────────────────────────────────────────────────────────
export function Section({ title, accent, children }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div style={{ ...C.secHead, color: accent }}>{title}</div>
      <div style={{ ...C.rule, backgroundColor: accent }} />
      <div>{children}</div>
    </div>
  );
}

// ─── Bullet list ─────────────────────────────────────────────────────────────
function BulletList({ items, period = true }) {
  if (!items?.length) return null;
  const normalised = normalizeBullets(items, { period });
  return (
    <div style={{ marginTop: "3px" }}>
      {normalised.map((b, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "5px",
            marginBottom: "1.5px",
            paddingLeft: "6px",
          }}
        >
          <span style={{ ...C.bullet, flexShrink: 0, marginTop: "0px" }}>•</span>
          <span style={{ ...C.bullet, flex: 1, wordBreak: "break-word" }}>{b}</span>
        </div>
      ))}
    </div>
  );
}

// Title/org on the left, date range bold-italic on the right — same 11pt.
// Left copy wraps inside the remaining width so long degrees/schools never
// paint over the date column.
function EntryHeading({ title, secondary, date }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
      <div style={{ flex: 1, minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" }}>
        <span style={C.eTitle}>{title}</span>
        {secondary && <span style={C.eComp}>&nbsp;| {secondary}</span>}
      </div>
      {date && <span style={{ ...C.date, flexShrink: 0, maxWidth: "42%" }}>{date}</span>}
    </div>
  );
}

function MetaLine({ text }) {
  if (!text) return null;
  return <div style={C.eMeta}>{text}</div>;
}

// ─── Entry blocks ────────────────────────────────────────────────────────────

export function ExperienceBlock({ e }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <EntryHeading title={e.role} secondary={e.company} date={formatDateRange(e.start, e.end)} />
      <MetaLine text={e.location} />
      <BulletList items={e.bullets} period />
    </div>
  );
}

export function EducationBlock({ e }) {
  // School is always bold, never italic, Title Case. Degree sits on the next
  // line in regular weight so every university name matches VMock styling.
  return (
    <div style={{ marginBottom: "10px" }}>
      <EntryHeading title={formatInstitutionName(e.school)} date={formatDateRange(e.start, e.end)} />
      <MetaLine text={e.degree} />
      <MetaLine text={e.location} />
      <BulletList items={e.bullets} period />
    </div>
  );
}

export function ProjectsBlock({ p }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <EntryHeading title={p.title} date={formatDateRange(p.start, p.end)} />
      <MetaLine text={p.organization} />
      <BulletList items={p.bullets} period />
    </div>
  );
}

export function AchievementsBlock({ a }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <EntryHeading title={a.title} secondary={a.organization} date={formatDate(a.year)} />
      <BulletList items={a.bullets} period />
    </div>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────
// Group title (bold) + paragraph description below — matches the workbook's
// professional/functional-resume style (Diego Romesco example, p.46).
export function SkillsBlock({ group }) {
  const items = (group.bullets || []).filter((b) => b && String(b).trim().length > 0);
  const paragraph = normalizeBullets(items, { period: true }).join(" ");

  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ ...C.eTitle, marginBottom: "2px" }}>{group.title}</div>
      {paragraph && (
        <div style={{ ...C.bullet, lineHeight: 1.55, wordBreak: "break-word" }}>
          {paragraph}
        </div>
      )}
    </div>
  );
}

export function VoluntaryBlock({ v }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <EntryHeading title={v.role} secondary={v.organization} date={formatDateRange(v.start, v.end)} />
      <MetaLine text={v.location} />
      <BulletList items={v.bullets} period />
    </div>
  );
}

export function CertificateBlock({ c }) {
  const range = formatDateRange(c.year, c.expiry, { presentIfEmpty: false });
  return (
    <div style={{ marginBottom: "10px" }}>
      <EntryHeading title={c.title} secondary={c.issuer} date={range} />
      <MetaLine text={c.credentialId ? `Credential ID: ${c.credentialId}` : ""} />
      <BulletList items={c.bullets} period />
    </div>
  );
}

export function InterestsBlock({ interests }) {
  const items = (interests || []).map((s) => String(s).trim()).filter(Boolean);
  if (!items.length) return null;
  return (
    <div style={{ ...C.bullet, marginTop: "2px" }}>
      {items.join("  •  ")}
    </div>
  );
}

// ─── References ─────────────────────────────────────────────────────────────
export function ReferencesBlock({ references }) {
  const list = Array.isArray(references)
    ? references.filter((r) => r && (r.name || r.title))
    : [];

  if (!list.length) {
    return (
      <div style={{ ...C.bullet, marginTop: "2px" }}>References available on request.</div>
    );
  }

  return (
    <div>
      {list.map((r) => (
        <div key={r.id} style={{ marginBottom: "10px" }}>
          {r.name && <div style={C.eTitle}>{r.name}</div>}
          {r.title && <div style={{ ...C.bullet, marginTop: "1px" }}>{r.title}</div>}
          {r.organization && (
            <div style={{ ...C.bullet, marginTop: "1px" }}>{r.organization}</div>
          )}
          {r.phone && (
            <div style={{ ...C.bullet, marginTop: "1px" }}>
              <span style={{ color: "#787878" }}>Tel:</span>&nbsp;{r.phone}
            </div>
          )}
          {r.email && (
            <div style={{ ...C.bullet, marginTop: "1px" }}>
              <span style={{ color: "#787878" }}>Email:</span>&nbsp;{r.email}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export { sortByRecencyDesc, sortByRecencyDesc as sortByStartDesc };