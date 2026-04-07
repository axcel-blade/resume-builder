/* src/components/TemplateBasic.jsx */

// TemplateBasic uses the same layout as TemplateModern for PDF-preview parity.
// The only visual difference: the name is centered.

import React from "react";
import {
  Section,
  ExperienceBlock,
  EducationBlock,
  AchievementsBlock,
  ProjectsBlock,
  SkillsBlock,
} from "./TemplateSharedParts";

const FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

export default function TemplateBasic({ data }) {
  const accent = data.meta?.accent || "#0ea5e9";
  const p = data.profile;

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
      {/* ── NAME (centered) ── */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
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

        {p.title && (
          <div style={{ fontSize: "14.5px", fontWeight: "400", color: "#3c3c3c", marginBottom: "4px" }}>
            {p.title}
          </div>
        )}

        <div style={{ fontSize: "12px", color: "#505050", marginBottom: "4px" }}>
          {[p.email, p.phone, p.location, p.website].filter(Boolean).join("   ")}
        </div>

        {data.links?.length > 0 && (
          <div style={{ marginBottom: "4px" }}>
            {data.links.map((l) => (
              <div key={l.id} style={{ fontSize: "12px", lineHeight: 1.6 }}>
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

        {/* Divider removed */}
      </div>

      {/* ── SUMMARY ── */}
      {p.summary && (
        <Section title="Summary" accent={accent}>
          <div style={{ fontSize: "12px", color: "#323232", lineHeight: 1.6, wordBreak: "break-word" }}>
            {p.summary}
          </div>
        </Section>
      )}

      {data.experience?.length > 0 && (
        <Section title="Experience" accent={accent}>
          {data.experience.map((e) => <ExperienceBlock key={e.id} e={e} />)}
        </Section>
      )}

      {data.projects?.length > 0 && (
        <Section title="Projects" accent={accent}>
          {data.projects.map((p) => <ProjectsBlock key={p.id} p={p} />)}
        </Section>
      )}

      {data.education?.length > 0 && (
        <Section title="Education" accent={accent}>
          {data.education.map((e) => <EducationBlock key={e.id} e={e} />)}
        </Section>
      )}

      {data.achievements?.length > 0 && (
        <Section title="Achievements" accent={accent}>
          {data.achievements.map((a) => <AchievementsBlock key={a.id} a={a} />)}
        </Section>
      )}

      {data.skillGroups?.length > 0 && (
        <Section title="Skills" accent={accent}>
          {data.skillGroups.map((g) => <SkillsBlock key={g.id} group={g} />)}
        </Section>
      )}
    </div>
  );
}