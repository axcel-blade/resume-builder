/* src/components/TemplateModern.jsx */

import React from "react";
import {
  Section,
  ExperienceBlock,
  EducationBlock,
  AchievementsBlock,
  ProjectsBlock,
  SkillsBlock,
} from "./TemplateSharedParts";

// Matches jsPDF: ML=15mm, MR=15mm, MT=16mm → ~57px, 57px, 61px at 96dpi
// We let the A4 wrapper handle margins, so padding here is 0.
// Font: Helvetica (jsPDF default) → we use the system helvetica stack.

const FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

export default function TemplateModern({ data }) {
  const accent = data.meta?.accent || "#0ea5e9";
  const p = data.profile;

  const accentRgb = accent;

  return (
    <div
      style={{
        fontFamily: FONT,
        fontSize: "12px",
        lineHeight: 1.45,
        color: "#1a1a1a",
        backgroundColor: "#ffffff",
        padding: "0",
        width: "100%",
        boxSizing: "border-box",
        wordWrap: "break-word",
        overflowWrap: "break-word",
      }}
    >
      {/* ── NAME ── */}
      <div
        style={{
          fontSize: "29px",
          fontWeight: "700",
          color: accent,
          lineHeight: 1.1,
          marginBottom: "4px",
          fontFamily: FONT,
        }}
      >
        {p.fullName}
      </div>

      {/* ── TITLE ── */}
      {p.title && (
        <div
          style={{
            fontSize: "14.5px",
            fontWeight: "400",
            color: "#3c3c3c",
            marginBottom: "5px",
            fontFamily: FONT,
          }}
        >
          {p.title}
        </div>
      )}

      {/* ── CONTACT ── */}
      <div
        style={{
          fontSize: "12px",
          color: "#505050",
          marginBottom: "4px",
          fontFamily: FONT,
        }}
      >
        {[p.email, p.phone, p.location, p.website].filter(Boolean).join("   ")}
      </div>

      {/* ── LINKS ── */}
      {data.links?.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          {data.links.map((l) => (
            <div key={l.id} style={{ fontSize: "12px", lineHeight: 1.6, fontFamily: FONT }}>
              <span style={{ fontWeight: "700", color: "#505050" }}>{l.label}</span>
              <span style={{ color: "#505050" }}>  |  </span>
              <a
                href={l.url.startsWith("http") ? l.url : `https://${l.url}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: accent, textDecoration: "none" }}
              >
                {l.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {/* ── SUMMARY ── */}
      {p.summary && (
        <Section title="Summary" accent={accent}>
          <div
            style={{
              fontSize: "12px",
              color: "#323232",
              lineHeight: 1.6,
              fontFamily: FONT,
              wordBreak: "break-word",
            }}
          >
            {p.summary}
          </div>
        </Section>
      )}

      {/* ── EXPERIENCE ── */}
      {data.experience?.length > 0 && (
        <Section title="Experience" accent={accent}>
          {data.experience.map((e) => (
            <ExperienceBlock key={e.id} e={e} />
          ))}
        </Section>
      )}

      {/* ── PROJECTS ── */}
      {data.projects?.length > 0 && (
        <Section title="Projects" accent={accent}>
          {data.projects.map((p) => (
            <ProjectsBlock key={p.id} p={p} />
          ))}
        </Section>
      )}

      {/* ── EDUCATION ── */}
      {data.education?.length > 0 && (
        <Section title="Education" accent={accent}>
          {data.education.map((e) => (
            <EducationBlock key={e.id} e={e} />
          ))}
        </Section>
      )}

      {/* ── ACHIEVEMENTS ── */}
      {data.achievements?.length > 0 && (
        <Section title="Achievements" accent={accent}>
          {data.achievements.map((a) => (
            <AchievementsBlock key={a.id} a={a} />
          ))}
        </Section>
      )}

      {/* ── SKILLS ── */}
      {data.skillGroups?.length > 0 && (
        <Section title="Skills" accent={accent}>
          {data.skillGroups.map((g) => (
            <SkillsBlock key={g.id} group={g} />
          ))}
        </Section>
      )}
    </div>
  );
}