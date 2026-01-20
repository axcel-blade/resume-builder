import React from "react";
import { Section, ExperienceBlock, EducationBlock, AchievementsBlock, ProjectsBlock, SkillsBlock } from "./TemplateSharedParts";

export default function TemplateModern({ data }) {
  const accent = data.meta.accent;
  const profile = data.profile;

  return (
    <div className="p-8 text-[14px] leading-5" style={{ pageBreakAfter: "avoid" }}>
      {/* Header - Keep together */}
      <div className="mb-4" style={{ pageBreakInside: "avoid", breakInside: "avoid" }}>
        <h1 className="text-3xl font-bold leading-tight" style={{ color: accent }}>
          {profile.fullName}
        </h1>
        <div className="text-sm text-gray-600">{profile.title}</div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
          {profile.email && <span>{profile.email}</span>}
          {profile.phone && <span>{profile.phone}</span>}
          {profile.location && <span>{profile.location}</span>}
          {profile.website && <span>{profile.website}</span>}
        </div>

        {/* Profile Links */}
        {data.links?.length > 0 && (
          <div className="mt-2 text-xs text-gray-600 space-y-0.5">
            {data.links.map((l) => (
              <div key={l.id} className="flex items-center gap-2">
                <span className="font-medium">{l.label}</span>
                <span className="text-gray-400">|</span>
                <a
                  href={l.url.startsWith("http") ? l.url : `https://${l.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-600 hover:underline print:no-underline break-all"
                >
                  {l.url}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary - Keep together */}
      {profile.summary && (
        <div style={{ pageBreakInside: "avoid", breakInside: "avoid" }}>
          <Section title="Summary" accent={accent}>
            <p className="text-[13px] text-gray-700 whitespace-pre-wrap break-words leading-[1.5]">
              {profile.summary}
            </p>
          </Section>
        </div>
      )}

      {/* Experience - Each item keeps together, section can break */}
      {data.experience?.length > 0 && (
        <Section title="Experience" accent={accent}>
          {data.experience.map((e, idx) => (
            <div 
              key={e.id} 
              style={{ 
                pageBreakInside: "avoid", 
                breakInside: "avoid",
                marginBottom: idx < data.experience.length - 1 ? "12px" : "0",
              }}
            >
              <ExperienceBlock e={e} />
            </div>
          ))}
        </Section>
      )}

      {/* Projects - Each item keeps together */}
      {data.projects?.length > 0 && (
        <Section title="Projects" accent={accent}>
          {data.projects.map((p, idx) => (
            <div 
              key={p.id} 
              style={{ 
                pageBreakInside: "avoid", 
                breakInside: "avoid",
                marginBottom: idx < data.projects.length - 1 ? "12px" : "0",
              }}
            >
              <ProjectsBlock p={p} />
            </div>
          ))}
        </Section>
      )}

      {/* Education - Each item keeps together */}
      {data.education?.length > 0 && (
        <Section title="Education" accent={accent}>
          {data.education.map((e, idx) => (
            <div 
              key={e.id} 
              style={{ 
                pageBreakInside: "avoid", 
                breakInside: "avoid",
                marginBottom: idx < data.education.length - 1 ? "12px" : "0",
              }}
            >
              <EducationBlock e={e} />
            </div>
          ))}
        </Section>
      )}

      {/* Achievements - Each item keeps together */}
      {data.achievements?.length > 0 && (
        <Section title="Achievements" accent={accent}>
          {data.achievements.map((a, idx) => (
            <div 
              key={a.id} 
              style={{ 
                pageBreakInside: "avoid", 
                breakInside: "avoid",
                marginBottom: idx < data.achievements.length - 1 ? "12px" : "0",
              }}
            >
              <AchievementsBlock a={a} />
            </div>
          ))}
        </Section>
      )}

      {/* Skill Groups - Each group keeps together */}
      {data.skillGroups?.length > 0 && (
        <Section title="Skills" accent={accent}>
          {data.skillGroups.map((g, idx) => (
            <div 
              key={g.id} 
              style={{ 
                pageBreakInside: "avoid", 
                breakInside: "avoid",
                marginBottom: idx < data.skillGroups.length - 1 ? "12px" : "0",
              }}
            >
              <SkillsBlock group={g} />
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}