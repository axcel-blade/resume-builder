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

// Shared item list renderer — no bullets, just indented lines
function ItemList({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ marginTop: "4px", paddingLeft: "12px" }}>
      {items.map((b, i) => (
        <div
          key={i}
          style={{
            fontSize: "11.5px",
            lineHeight: "1.5",
            color: "#374151",
            marginBottom: "2px",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {b}
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
      <ItemList items={e.bullets} />
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
      <ItemList items={e.bullets} />
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
      <ItemList items={p.bullets} />
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
      <ItemList items={a.bullets} />
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
      <ItemList items={group.bullets} />
    </div>
  );
}