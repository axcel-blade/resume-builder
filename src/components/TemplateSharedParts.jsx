/* src/components/TemplateSharedParts.jsx */

import React from "react";

// Section header component used by all templates
export function Section({ title, accent, children }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <h3
        className="mb-2 text-xs font-semibold uppercase tracking-wider m-0"
        style={{ color: accent, pageBreakAfter: "avoid" }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

// Shared bullet list renderer — div-based, no CSS list-style
function BulletList({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ marginTop: "4px" }}>
      {items.map((b, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "2px",
            gap: "6px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              lineHeight: "1.5",
              color: "#4b5563",
              flexShrink: 0,
              marginTop: "0px",
            }}
          >
            •
          </span>
          <span
            style={{
              fontSize: "11.5px",
              lineHeight: "1.5",
              color: "#374151",
              flex: 1,
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {b}
          </span>
        </div>
      ))}
    </div>
  );
}

// Experience entry component
export function ExperienceBlock({ e }) {
  return (
    <div>
      <div className="font-semibold text-[12.5px] m-0">
        {e.role}
        {e.company && (
          <span className="text-gray-600 font-normal"> | {e.company}</span>
        )}
      </div>
      <div className="text-[11px] text-gray-500 mb-1 m-0">
        {e.start} - {e.end || "Present"} {e.location && `| ${e.location}`}
      </div>
      <BulletList items={e.bullets} />
    </div>
  );
}

// Education entry component
export function EducationBlock({ e }) {
  return (
    <div>
      <div className="font-semibold text-[12.5px] m-0">
        {e.degree}
        {e.school && (
          <span className="text-gray-600 font-normal"> | {e.school}</span>
        )}
      </div>
      <div className="text-[11px] text-gray-500 mb-1 m-0">
        {e.start} - {e.end} {e.location && `| ${e.location}`}
      </div>
      <BulletList items={e.bullets} />
    </div>
  );
}

// Projects entry component
export function ProjectsBlock({ p }) {
  return (
    <div>
      <div className="font-semibold text-[12.5px] m-0">
        {p.title}
      </div>
      <div className="text-[11px] text-gray-500 mb-1 m-0">
        {p.organization} | {p.start} - {p.end}
      </div>
      <BulletList items={p.bullets} />
    </div>
  );
}

// Achievements entry component
export function AchievementsBlock({ a }) {
  return (
    <div>
      <div className="font-semibold text-[12.5px] m-0">
        {a.title}
        {a.organization && (
          <span className="text-gray-600 font-normal"> | {a.organization}</span>
        )}
      </div>
      {a.year && (
        <div className="text-[11px] text-gray-500 mb-1 m-0">
          {a.year}
        </div>
      )}
      <BulletList items={a.bullets} />
    </div>
  );
}

// Skills group component
export function SkillsBlock({ group }) {
  return (
    <div>
      <p className="font-semibold text-[12px] text-gray-800 m-0">
        {group.title}
      </p>
      <BulletList items={group.bullets} />
    </div>
  );
}