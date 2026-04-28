/* src/components/TemplateModern.jsx */

import React from "react";
import {
  Section,
  ExperienceBlock,
  EducationBlock,
  AchievementsBlock,
  ProjectsBlock,
  SkillsBlock,
  VoluntaryBlock,
  CertificateBlock,
  InterestsBlock,
  ReferencesBlock,
  sortByStartDesc,
} from "./TemplateSharedParts";

const FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const HEADINGS = {
  summary:      "Summary",
  experience:   "Professional Experience",
  voluntary:    "Voluntary Experience",
  projects:     "Projects",
  education:    "Education",
  achievements: "Achievements and Awards",
  certificates: "Certificates & Licences",
  skills:       "Key Skills",
  interests:    "Interests",
  references:   "References",
};

export default function TemplateModern({ data }) {
  const accent = data.meta?.accent || "#0ea5e9";
  const p = data.profile;

  const experience  = sortByStartDesc(data.experience  || []);
  const voluntary   = sortByStartDesc(data.voluntary   || []);
  const projects    = sortByStartDesc(data.projects    || []);
  const education   = sortByStartDesc(data.education   || []);
  const certificates = sortByStartDesc(data.certificates || [], "year");
  const interests   = (data.interests || []).filter(Boolean);

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
      <div style={{ fontSize: "29px", fontWeight: "700", color: accent, lineHeight: 1.1, marginBottom: "4px", fontFamily: FONT }}>
        {p.fullName}
      </div>

      {/* ── TITLE ── */}
      {p.title && (
        <div style={{ fontSize: "14.5px", fontWeight: "400", color: "#3c3c3c", marginBottom: "5px", fontFamily: FONT }}>
          {p.title}
        </div>
      )}

      {/* ── CONTACT ── */}
      <div style={{ fontSize: "12px", color: "#505050", marginBottom: "4px", fontFamily: FONT }}>
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

      {p.summary && (
        <Section title={HEADINGS.summary} accent={accent}>
          <div style={{ fontSize: "12px", color: "#323232", lineHeight: 1.6, fontFamily: FONT, wordBreak: "break-word" }}>
            {p.summary}
          </div>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title={HEADINGS.experience} accent={accent}>
          {experience.map((e) => <ExperienceBlock key={e.id} e={e} />)}
        </Section>
      )}

      {voluntary.length > 0 && (
        <Section title={HEADINGS.voluntary} accent={accent}>
          {voluntary.map((v) => <VoluntaryBlock key={v.id} v={v} />)}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title={HEADINGS.projects} accent={accent}>
          {projects.map((proj) => <ProjectsBlock key={proj.id} p={proj} />)}
        </Section>
      )}

      {education.length > 0 && (
        <Section title={HEADINGS.education} accent={accent}>
          {education.map((e) => <EducationBlock key={e.id} e={e} />)}
        </Section>
      )}

      {data.achievements?.length > 0 && (
        <Section title={HEADINGS.achievements} accent={accent}>
          {data.achievements.map((a) => <AchievementsBlock key={a.id} a={a} />)}
        </Section>
      )}

      {certificates.length > 0 && (
        <Section title={HEADINGS.certificates} accent={accent}>
          {certificates.map((c) => <CertificateBlock key={c.id} c={c} />)}
        </Section>
      )}

      {data.skillGroups?.length > 0 && (
        <Section title={HEADINGS.skills} accent={accent}>
          {data.skillGroups.map((g) => <SkillsBlock key={g.id} group={g} />)}
        </Section>
      )}

      {interests.length > 0 && (
        <Section title={HEADINGS.interests} accent={accent}>
          <InterestsBlock interests={interests} />
        </Section>
      )}

      {/* References — always rendered (mandatory) */}
      <Section title={HEADINGS.references} accent={accent}>
        <ReferencesBlock references={data.references} />
      </Section>
    </div>
  );
}