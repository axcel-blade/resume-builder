/* src/components/TemplateSharedParts.jsx */

import React from "react";

// ─── Matches jsPDF layout constants ──────────────────────────────────────────
// PDF: ML=15mm, MR=15mm, MT=16mm — we replicate via padding in the wrapper.
// Font sizes are matched pt→px (1pt ≈ 1.333px at 96dpi).

const C = {
  accent: "inherit",          // overridden per-template via style prop
  name:   { fontSize: "29px",  fontWeight: "700", lineHeight: 1.1 },
  title:  { fontSize: "14.5px",fontWeight: "400", color: "#3c3c3c", marginTop: "4px" },
  contact:{ fontSize: "12px",  color: "#505050",  marginTop: "5px" },
  linkRow:{ fontSize: "12px",  marginTop: "3px" },
  secHead:{ fontSize: "11px",  fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase" },
  rule:   { height: "0.75px",  marginTop: "2px", marginBottom: "5px" },
  eTitle: { fontSize: "13px",  fontWeight: "700", color: "#1e1e1e" },
  eComp:  { fontSize: "13px",  fontWeight: "400", color: "#5a5a5a" },
  eMeta:  { fontSize: "11px",  color: "#787878",  marginTop: "1px", marginBottom: "3px" },
  bullet: { fontSize: "12px",  color: "#323232",  lineHeight: 1.55 },
  summary:{ fontSize: "12px",  color: "#323232",  lineHeight: 1.6  },
};

// ─── Section heading — matches jsPDF drawSectionHead() ───────────────────────
export function Section({ title, accent, children }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div style={{ ...C.secHead, color: accent }}>{title}</div>
      <div style={{ ...C.rule, backgroundColor: accent }} />
      <div>{children}</div>
    </div>
  );
}

// ─── Bullet list — matches jsPDF drawBullet() ────────────────────────────────
// • char at bulletX, text at bulletX + hang, wrapped lines also at hang indent
function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <div style={{ marginTop: "3px" }}>
      {items.map((b, i) => (
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

// ─── Entry blocks ─────────────────────────────────────────────────────────────

export function ExperienceBlock({ e }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0" }}>
        <span style={C.eTitle}>{e.role}</span>
        {e.company && <span style={C.eComp}>&nbsp;| {e.company}</span>}
      </div>
      <div style={C.eMeta}>
        {e.start} – {e.end || "Present"}{e.location ? `   |   ${e.location}` : ""}
      </div>
      <BulletList items={e.bullets} />
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
        {e.start} – {e.end}{e.location ? `   |   ${e.location}` : ""}
      </div>
      <BulletList items={e.bullets} />
    </div>
  );
}

export function ProjectsBlock({ p }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={C.eTitle}>{p.title}</div>
      {(p.organization || p.start) && (
        <div style={C.eMeta}>
          {[p.organization, `${p.start} – ${p.end}`].filter(Boolean).join("   |   ")}
        </div>
      )}
      <BulletList items={p.bullets} />
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
      <BulletList items={a.bullets} />
    </div>
  );
}

export function SkillsBlock({ group }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ ...C.eTitle, marginBottom: "1px" }}>{group.title}</div>
      <BulletList items={group.bullets} />
    </div>
  );
}