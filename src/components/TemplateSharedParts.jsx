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
      {e.bullets && e.bullets.length > 0 && (
        <ul 
          className="list-disc text-[12px] text-gray-700 leading-[1.4] m-0 p-0" 
          style={{ paddingLeft: "20px", marginTop: "4px" }}
        >
          {e.bullets.map((b, i) => (
            <li key={i} className="text-[11.5px]" style={{ margin: 0, marginBottom: "2px" }}>
              {b}
            </li>
          ))}
        </ul>
      )}
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
      {e.bullets && e.bullets.length > 0 && (
        <ul 
          className="list-disc text-[12px] text-gray-700 leading-[1.4] m-0 p-0" 
          style={{ paddingLeft: "20px", marginTop: "4px" }}
        >
          {e.bullets.map((b, i) => (
            <li key={i} className="text-[11.5px]" style={{ margin: 0, marginBottom: "2px" }}>
              {b}
            </li>
          ))}
        </ul>
      )}
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
      {p.bullets && p.bullets.length > 0 && (
        <ul 
          className="list-disc text-[12px] text-gray-700 leading-[1.4] m-0 p-0" 
          style={{ paddingLeft: "20px", marginTop: "4px" }}
        >
          {p.bullets.map((b, i) => (
            <li key={i} className="text-[11.5px]" style={{ margin: 0, marginBottom: "2px" }}>
              {b}
            </li>
          ))}
        </ul>
      )}
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
      {a.bullets && a.bullets.length > 0 && (
        <ul 
          className="list-disc text-[12px] text-gray-700 leading-[1.4] m-0 p-0" 
          style={{ paddingLeft: "20px", marginTop: "4px" }}
        >
          {a.bullets.map((b, i) => (
            <li key={i} className="text-[11.5px]" style={{ margin: 0, marginBottom: "2px" }}>
              {b}
            </li>
          ))}
        </ul>
      )}
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
      {group.bullets && group.bullets.length > 0 && (
        <ul 
          className="list-disc text-[11.5px] text-gray-700 leading-[1.3] m-0 p-0" 
          style={{ paddingLeft: "16px" }}
        >
          {group.bullets.map((b, i) => (
            <li key={i} className="text-[11px]" style={{ margin: 0 }}>
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}