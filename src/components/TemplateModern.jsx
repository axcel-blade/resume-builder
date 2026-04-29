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
  getFontStack,
} from "./TemplateSharedParts";

/* Headings + order follow a typical professional resume:
   Profile → Professional Experience → Education → Projects → Key Skills →
   Achievements and Awards → Volunteer Work → Certificates & Licenses →
   Interests → References. */
const HEADINGS = {
  summary:      "Career Objective",
  experience:   "Professional Experience",
  education:    "Education",
  projects:     "Projects",
  skills:       "Key Skills",
  achievements: "Achievements and Awards",
  voluntary:    "Volunteer Work",
  certificates: "Certificates & Licenses",
  interests:    "Interests",
  references:   "References",
};

export default function TemplateModern({ data }) {
  const accent = data.meta?.accent || "#0ea5e9";
  // Font family is user-selectable; defaults to Helvetica Neue when unset.
  // The workbook recommends sans-serif fonts (Arial, Calibri, Verdana) for
  // resumes — these are surfaced as preferred options in the picker.
  const fontFamily = getFontStack(data.meta?.font);
  const p = data.profile;

  const experience   = sortByStartDesc(data.experience   || []);
  const voluntary    = sortByStartDesc(data.voluntary    || []);
  const projects     = sortByStartDesc(data.projects     || []);
  const education    = sortByStartDesc(data.education    || []);
  const certificates = sortByStartDesc(data.certificates || [], "year");
  const interests    = (data.interests || []).filter(Boolean);

  return (
    <div
      style={{
        fontFamily,
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
      <div style={{ fontSize: "29px", fontWeight: "700", color: accent, lineHeight: 1.1, marginBottom: "4px", fontFamily }}>
        {p.fullName}
      </div>

      {/* ── TITLE ── */}
      {p.title && (
        <div style={{ fontSize: "14.5px", fontWeight: "400", color: "#3c3c3c", marginBottom: "5px", fontFamily }}>
          {p.title}
        </div>
      )}

      {/* ── CONTACT ── */}
      <div style={{ fontSize: "12px", color: "#505050", marginBottom: "4px", fontFamily }}>
        {[p.email, p.phone, p.location, p.website].filter(Boolean).join("   ")}
      </div>

      {/* ── LINKS ── */}
      {data.links?.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          {data.links.map((l) => (
            <div key={l.id} style={{ fontSize: "12px", lineHeight: 1.6, fontFamily }}>
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

      {/* 1. Career Objective */}
      {p.summary && (
        <Section title={HEADINGS.summary} accent={accent}>
          <div style={{ fontSize: "12px", color: "#323232", lineHeight: 1.6, fontFamily, wordBreak: "break-word" }}>
            {p.summary}
          </div>
        </Section>
      )}

      {/* 2. Professional Experience */}
      {experience.length > 0 && (
        <Section title={HEADINGS.experience} accent={accent}>
          {experience.map((e) => <ExperienceBlock key={e.id} e={e} />)}
        </Section>
      )}

      {/* 3. Education */}
      {education.length > 0 && (
        <Section title={HEADINGS.education} accent={accent}>
          {education.map((e) => <EducationBlock key={e.id} e={e} />)}
        </Section>
      )}

      {/* 4. Projects */}
      {projects.length > 0 && (
        <Section title={HEADINGS.projects} accent={accent}>
          {projects.map((proj) => <ProjectsBlock key={proj.id} p={proj} />)}
        </Section>
      )}

      {/* 5. Key Skills — group title + paragraph (workbook functional/business style) */}
      {data.skillGroups?.length > 0 && (
        <Section title={HEADINGS.skills} accent={accent}>
          {data.skillGroups.map((g) => <SkillsBlock key={g.id} group={g} />)}
        </Section>
      )}

      {/* 6. Achievements and Awards */}
      {data.achievements?.length > 0 && (
        <Section title={HEADINGS.achievements} accent={accent}>
          {data.achievements.map((a) => <AchievementsBlock key={a.id} a={a} />)}
        </Section>
      )}

      {/* 7. Volunteer Work */}
      {voluntary.length > 0 && (
        <Section title={HEADINGS.voluntary} accent={accent}>
          {voluntary.map((v) => <VoluntaryBlock key={v.id} v={v} />)}
        </Section>
      )}

      {/* 8. Certificates & Licenses */}
      {certificates.length > 0 && (
        <Section title={HEADINGS.certificates} accent={accent}>
          {certificates.map((c) => <CertificateBlock key={c.id} c={c} />)}
        </Section>
      )}

      {/* 9. Interests */}
      {interests.length > 0 && (
        <Section title={HEADINGS.interests} accent={accent}>
          <InterestsBlock interests={interests} />
        </Section>
      )}

      {/* 10. References — always rendered, row-by-row with all 5 fields */}
      <Section title={HEADINGS.references} accent={accent}>
        <ReferencesBlock references={data.references} />
      </Section>
    </div>
  );
}