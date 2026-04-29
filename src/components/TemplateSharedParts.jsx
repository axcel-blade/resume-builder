/* src/components/TemplateSharedParts.jsx */

import React from "react";
import { formatDate, formatDateRange, sortByStartDesc, normalizeBullets } from "../utils/format";

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
// Each referee is rendered as one row, with all 5 fields surfaced:
//   Row line 1:  Name  |  Position, Company
//   Row line 2:  Tel: phone   ·   Email: email
//
// Referees are stacked one beneath the other (row by row), making each entry
// a clean, self-contained block that's easy to scan.
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
      {list.map((r) => {
        // "Position, Company" — joined neatly when both exist.
        const positionLine = [r.title, r.organization].filter(Boolean).join(", ");

        // Phone + email rendered side by side on the same row line.
        const contactParts = [];
        if (r.phone) contactParts.push(<><span style={{ color: "#787878" }}>Tel:</span>&nbsp;{r.phone}</>);
        if (r.email) contactParts.push(<><span style={{ color: "#787878" }}>Email:</span>&nbsp;{r.email}</>);

        return (
          <div key={r.id} style={{ marginBottom: "8px" }}>
            {/* Row line 1 — Name | Position, Company */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}>
              <span style={C.eTitle}>{r.name}</span>
              {positionLine && <span style={C.eComp}>&nbsp;| {positionLine}</span>}
            </div>

            {/* Row line 2 — Phone · Email */}
            {contactParts.length > 0 && (
              <div style={{ ...C.bullet, marginTop: "1px" }}>
                {contactParts.map((part, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span style={{ color: "#787878" }}>&nbsp;&nbsp;·&nbsp;&nbsp;</span>}
                    {part}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export { sortByStartDesc };