import React from "react";
import { Section, ExperienceBlock, EducationBlock, AchievementsBlock, ProjectsBlock, SkillsBlock } from "./TemplateSharedParts";

export default function TemplateBasic({ data }) {
  const accent = data.meta.accent;
  const profile = data.profile;

  return (
    <div 
      className="text-[14px] leading-6 font-serif"
      style={{ 
        backgroundColor: "#ffffff",
        margin: 0,
        padding: "60px 60px 60px 60px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header - Keep on first page */}
      <div 
        className="text-center mb-6" 
        style={{ 
          pageBreakInside: "avoid",
          pageBreakAfter: "avoid"
        }}
      >
        <h1 className="text-3xl font-bold m-0" style={{ color: accent }}>
          {profile.fullName}
        </h1>
        <p className="text-gray-700 text-sm m-0 mt-1">{profile.title}</p>
        <p className="text-xs text-gray-600 mt-1 m-0">
          {profile.email} | {profile.phone} | {profile.location}
        </p>

        {/* Profile Links */}
        {data.links?.length > 0 && (
          <div className="mt-2 text-xs text-gray-600">
            {data.links.map((l) => (
              <div key={l.id} style={{ margin: 0, marginBottom: "2px" }}>
                <span className="font-medium">{l.label}</span>
                {" | "}
                <a
                  href={l.url.startsWith("http") ? l.url : `https://${l.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-600"
                >
                  {l.url}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sections - Each section can move to next page */}
      {profile.summary && (
        <div style={{ marginBottom: "12px" }}>
          <Section title="Summary" accent={accent}>
            <p className="text-[13px] text-gray-700 whitespace-pre-wrap break-words leading-[1.5]">
              {profile.summary}
            </p>
          </Section>
        </div>
      )}

      {data.experience?.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <Section title="Experience" accent={accent}>
            {data.experience.map((e, idx) => (
              <div 
                key={e.id} 
                style={{ 
                  pageBreakInside: "avoid",
                  marginBottom: idx < data.experience.length - 1 ? "12px" : "0",
                }}
              >
                <ExperienceBlock e={e} />
              </div>
            ))}
          </Section>
        </div>
      )}

      {data.projects?.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <Section title="Projects" accent={accent}>
            {data.projects.map((p, idx) => (
              <div 
                key={p.id} 
                style={{ 
                  pageBreakInside: "avoid",
                  marginBottom: idx < data.projects.length - 1 ? "12px" : "0",
                }}
              >
                <ProjectsBlock p={p} />
              </div>
            ))}
          </Section>
        </div>
      )}

      {data.education?.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <Section title="Education" accent={accent}>
            {data.education.map((e, idx) => (
              <div 
                key={e.id} 
                style={{ 
                  pageBreakInside: "avoid",
                  marginBottom: idx < data.education.length - 1 ? "12px" : "0",
                }}
              >
                <EducationBlock e={e} />
              </div>
            ))}
          </Section>
        </div>
      )}

      {data.achievements?.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <Section title="Achievements" accent={accent}>
            {data.achievements.map((a, idx) => (
              <div 
                key={a.id} 
                style={{ 
                  pageBreakInside: "avoid",
                  marginBottom: idx < data.achievements.length - 1 ? "12px" : "0",
                }}
              >
                <AchievementsBlock a={a} />
              </div>
            ))}
          </Section>
        </div>
      )}

      {/* Skill Groups */}
      {data.skillGroups?.length > 0 && (
        <div>
          <Section title="Skills" accent={accent}>
            {data.skillGroups.map((g, idx) => (
              <div 
                key={g.id} 
                style={{ 
                  pageBreakInside: "avoid",
                  marginBottom: idx < data.skillGroups.length - 1 ? "12px" : "0",
                }}
              >
                <SkillsBlock group={g} />
              </div>
            ))}
          </Section>
        </div>
      )}
    </div>
  );
}