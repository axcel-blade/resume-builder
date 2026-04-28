/* src/components/TemplateSharedParts.jsx */

import React from "react";
import { formatDateRange, sortByStartDesc, normalizeBullets } from "../utils/format";

// ─── Matches jsPDF layout constants ──────────────────────────────────────────
// PDF: ML=20mm, MR=20mm, MT=20mm — replicated by the wrapper. Font sizes
// matched pt→px (1pt ≈ 1.333px at 96dpi).

const C = {
  name:    { fontSize: "29px",   fontWeight: "700", lineHeight: 1.1 },
  title:   { fontSize: "14.5px", fontWeight: "400", color: "#3c3c3c", marginTop: "4px" },
  contact: { fontSize: "12px",   color: "#505050",  marginTop: "5px" },
  linkRow: { fontSize: "12px",   marginTop: "3px" },
  secHead: { fontSize: "11px",   fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase" },
  rule:    { height: "0.75px",   marginTop: "2px", marginBottom: "5px" },
  eTitle:  { fontSize: "13px",   fontWeight: "700", color: "#1e1e1e" },
  eComp:   { fontSize: "13px",   fontWeight: "400", color: "#5a5a5a" },
  // Date meta — matched on every entry type so the format checker sees one
  // consistent style (no italics, no bold, same colour, same size).
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
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0" }}>
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

export function SkillsBlock({ group }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ ...C.eTitle, marginBottom: "1px" }}>{group.title}</div>
      {/* Skills are noun phrases — period: false keeps "React.js" from becoming "React.js." */}
      <BulletList items={group.bullets} period={false} />
    </div>
  );
}

// ─── References ──────────────────────────────────────────────────────────────
// Renders an optional list of referees or, if none, the standard
// "References available on request" line. The community guide treats this
// section as mandatory, so the template always emits something here.

export function ReferencesBlock({ references }) {
  const list = Array.isArray(references) ? references.filter((r) => r && (r.name || r.title)) : [];

  if (!list.length) {
    return (
      <div style={{ ...C.bullet, marginTop: "2px" }}>References available on request.</div>
    );
  }

  return (
    <div>
      {list.map((r) => (
        <div key={r.id} style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
            <span style={C.eTitle}>{r.name}</span>
            {r.title && <span style={C.eComp}>&nbsp;| {r.title}</span>}
          </div>
          {r.organization && <div style={C.eMeta}>{r.organization}</div>}
          {(r.email || r.phone) && (
            <div style={{ ...C.bullet, marginTop: "2px" }}>
              {[r.email, r.phone].filter(Boolean).join("   |   ")}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Re-exported helpers ─────────────────────────────────────────────────────
// Templates use these to sort experience/education before mapping.
export { sortByStartDesc };