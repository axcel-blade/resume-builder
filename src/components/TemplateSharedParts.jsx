/* src/components/TemplateSharedParts.jsx */

import React from "react";
import { formatDate, formatDateRange, sortByStartDesc, normalizeBullets } from "../utils/format";

// ─── Font families ───────────────────────────────────────────────────────────
// Selectable font options. Sans-serif fonts are listed first as they're the
// workbook's recommended choice for resumes — Arial, Calibri and Verdana are
// explicitly named (Resume Workbook p.24, Cover Letter Workbook p.10) for
// being easy to read on screen and in print. Serif options are included for
// users who prefer a more traditional look.
export const FONT_FAMILIES = [
  { id: "helvetica", name: "Helvetica Neue",   recommended: true,  stack: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
  { id: "arial",     name: "Arial",            recommended: true,  stack: 'Arial, "Helvetica Neue", Helvetica, sans-serif' },
  { id: "calibri",   name: "Calibri",          recommended: true,  stack: 'Calibri, Candara, "Segoe UI", "San Francisco", sans-serif' },
  { id: "verdana",   name: "Verdana",          recommended: true,  stack: 'Verdana, Geneva, "DejaVu Sans", sans-serif' },
  { id: "tahoma",    name: "Tahoma",           recommended: false, stack: 'Tahoma, "Trebuchet MS", "DejaVu Sans", sans-serif' },
  { id: "georgia",   name: "Georgia",          recommended: false, stack: 'Georgia, "Times New Roman", Times, serif' },
  { id: "times",     name: "Times New Roman",  recommended: false, stack: '"Times New Roman", Times, Georgia, serif' },
];

export const DEFAULT_FONT_ID = "helvetica";

export function getFontStack(fontId) {
  const found = FONT_FAMILIES.find((f) => f.id === fontId);
  return (found || FONT_FAMILIES[0]).stack;
}

// ─── Layout / typography constants — match jsPDF output ──────────────────────
const C = {
  name:    { fontSize: "29px",   fontWeight: "700", lineHeight: 1.1 },
  title:   { fontSize: "14.5px", fontWeight: "400", color: "#3c3c3c", marginTop: "4px" },
  contact: { fontSize: "12px",   color: "#505050",  marginTop: "5px" },
  linkRow: { fontSize: "12px",   marginTop: "3px" },
  secHead: { fontSize: "11px",   fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase" },
  rule:    { height: "0.75px",   marginTop: "2px", marginBottom: "5px" },
  eTitle:  { fontSize: "13px",   fontWeight: "700", color: "#1e1e1e" },
  eComp:   { fontSize: "13px",   fontWeight: "400", color: "#5a5a5a" },
  eMeta:   { fontSize: "11px",   color: "#787878",  marginTop: "1px", marginBottom: "3px",
             fontStyle: "normal", fontWeight: "400" },
  bullet:  { fontSize: "12px",   color: "#323232",  lineHeight: 1.55 },
  summary: { fontSize: "12px",   color: "#323232",  lineHeight: 1.6  },
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

// ─── Entry blocks ────────────────────────────────────────────────────────────

export function ExperienceBlock({ e }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
        <span style={C.eTitle}>{e.role}</span>
        {e.company && <span style={C.eComp}>&nbsp;| {e.company}</span>}
      </div>
      <div style={C.eMeta}>
        {[formatDateRange(e.start, e.end), e.location].filter(Boolean).join("   |   ")}
      </div>
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
      <div style={C.eMeta}>
        {[formatDateRange(e.start, e.end), e.location].filter(Boolean).join("   |   ")}
      </div>
      <BulletList items={e.bullets} period />
    </div>
  );
}

export function ProjectsBlock({ p }) {
  const range = formatDateRange(p.start, p.end);
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={C.eTitle}>{p.title}</div>
      {(p.organization || range) && (
        <div style={C.eMeta}>
          {[p.organization, range].filter(Boolean).join("   |   ")}
        </div>
      )}
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
      {a.year && <div style={C.eMeta}>{a.year}</div>}
      <BulletList items={a.bullets} period />
    </div>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────
// Group title (bold) + paragraph description below — matches the workbook's
// professional/functional-resume style (Diego Romesco example, p.46):
//
//   Communication
//   Skilled communicator with the ability to positively motivate others,
//   frequently attending community events to represent Cricket WA…
//
// Bullets entered in the editor are joined into a single paragraph so the
// underlying data shape (group.bullets[]) doesn't need to change.
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

// Voluntary entries share the Experience shape (role/org/location/dates/bullets)
export function VoluntaryBlock({ v }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
        <span style={C.eTitle}>{v.role}</span>
        {v.organization && <span style={C.eComp}>&nbsp;| {v.organization}</span>}
      </div>
      <div style={C.eMeta}>
        {[formatDateRange(v.start, v.end), v.location].filter(Boolean).join("   |   ")}
      </div>
      <BulletList items={v.bullets} period />
    </div>
  );
}

// Certificate entries — meta line shows issue year, optional expiry, optional ID.
export function CertificateBlock({ c }) {
  const metaParts = [];
  if (c.year) {
    metaParts.push(c.expiry ? `Issued ${formatDate(c.year)} · Expires ${formatDate(c.expiry)}`
                            : `Issued ${formatDate(c.year)}`);
  } else if (c.expiry) {
    metaParts.push(`Expires ${formatDate(c.expiry)}`);
  }
  if (c.credentialId) metaParts.push(`Credential ID: ${c.credentialId}`);

  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
        <span style={C.eTitle}>{c.title}</span>
        {c.issuer && <span style={C.eComp}>&nbsp;| {c.issuer}</span>}
      </div>
      {metaParts.length > 0 && (
        <div style={C.eMeta}>{metaParts.join("   |   ")}</div>
      )}
      <BulletList items={c.bullets} period />
    </div>
  );
}

// Interests render as a single inline pipe-separated line — typical resume style.
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
// Each referee renders with every field on its own row, in this order:
//   1. Name           (bold)
//   2. Position
//   3. Organization
//   4. Telephone number
//   5. Email address
//
// Referees are stacked one beneath the other so each entry reads as a clean,
// self-contained block.
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
          {/* 1. Name */}
          {r.name && <div style={C.eTitle}>{r.name}</div>}

          {/* 2. Position */}
          {r.title && <div style={{ ...C.bullet, marginTop: "1px" }}>{r.title}</div>}

          {/* 3. Organization */}
          {r.organization && (
            <div style={{ ...C.bullet, marginTop: "1px" }}>{r.organization}</div>
          )}

          {/* 4. Telephone number */}
          {r.phone && (
            <div style={{ ...C.bullet, marginTop: "1px" }}>
              <span style={{ color: "#787878" }}>Tel:</span>&nbsp;{r.phone}
            </div>
          )}

          {/* 5. Email address */}
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