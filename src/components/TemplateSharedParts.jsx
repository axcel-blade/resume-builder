/* src/components/TemplateSharedParts.jsx */

import React from "react";
import { formatDate, formatDateRange, sortByStartDesc, normalizeBullets } from "../utils/format";

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

// ─── Layout / typography constants — match jsPDF output ──────────────────────
// Section headings share one size. All in-section copy (titles, dates, bullets)
// shares one body size so the format checker sees consistent type.
const BODY = "12px";
const C = {
  name:    { fontSize: "29px",   fontWeight: "700", lineHeight: 1.1 },
  title:   { fontSize: "14.5px", fontWeight: "400", color: "#3c3c3c", marginTop: "4px" },
  contact: { fontSize: "12px",   color: "#505050",  marginTop: "5px" },
  linkRow: { fontSize: "12px",   marginTop: "3px" },
  secHead: { fontSize: BODY,     fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase" },
  rule:    { height: "0.75px",   marginTop: "2px", marginBottom: "5px" },
  eTitle:  { fontSize: BODY,     fontWeight: "700", color: "#1e1e1e" },
  eComp:   { fontSize: BODY,     fontWeight: "400", color: "#5a5a5a" },
  eMeta:   { fontSize: BODY,     color: "#787878",  marginTop: "1px", marginBottom: "3px" },
  date:    { fontSize: BODY,     fontWeight: "700", fontStyle: "italic", color: "#1e1e1e" },
  bullet:  { fontSize: BODY,     color: "#323232",  lineHeight: 1.55 },
  summary: { fontSize: BODY,     color: "#323232",  lineHeight: 1.6  },
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

// Date range is always bold + italic; other meta (location, org) is regular.
function DateMetaLine({ date, extra }) {
  if (!date && !extra) return null;
  return (
    <div style={C.eMeta}>
      {date && <span style={C.date}>{date}</span>}
      {date && extra && <span>{"   |   "}</span>}
      {extra && <span>{extra}</span>}
    </div>
  );
}

// ─── Entry blocks ────────────────────────────────────────────────────────────

export function ExperienceBlock({ e }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
        <span style={C.eTitle}>{e.role}</span>
        {e.company && <span style={C.eComp}>&nbsp;| {e.company}</span>}
      </div>
      <DateMetaLine date={formatDateRange(e.start, e.end)} extra={e.location} />
      <BulletList items={e.bullets} period />
    </div>
  );
}

export function EducationBlock({ e }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
        <span style={C.eTitle}>{e.degree}</span>
        {e.school && <span style={C.eComp}>&nbsp;| {e.school}</span>}
      </div>
      <DateMetaLine date={formatDateRange(e.start, e.end)} extra={e.location} />
      <BulletList items={e.bullets} period />
    </div>
  );
}

export function ProjectsBlock({ p }) {
  const range = formatDateRange(p.start, p.end);
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={C.eTitle}>{p.title}</div>
      <DateMetaLine date={range} extra={p.organization} />
      <BulletList items={p.bullets} period />
    </div>
  );
}

export function AchievementsBlock({ a }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
        <span style={C.eTitle}>{a.title}</span>
        {a.organization && <span style={C.eComp}>&nbsp;| {a.organization}</span>}
      </div>
      <DateMetaLine date={formatDate(a.year)} />
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
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
        <span style={C.eTitle}>{v.role}</span>
        {v.organization && <span style={C.eComp}>&nbsp;| {v.organization}</span>}
      </div>
      <DateMetaLine date={formatDateRange(v.start, v.end)} extra={v.location} />
      <BulletList items={v.bullets} period />
    </div>
  );
}

export function CertificateBlock({ c }) {
  const range = formatDateRange(c.year, c.expiry, { presentIfEmpty: false });
  const extra = c.credentialId ? `Credential ID: ${c.credentialId}` : "";
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
        <span style={C.eTitle}>{c.title}</span>
        {c.issuer && <span style={C.eComp}>&nbsp;| {c.issuer}</span>}
      </div>
      <DateMetaLine date={range} extra={extra} />
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

export { sortByStartDesc };