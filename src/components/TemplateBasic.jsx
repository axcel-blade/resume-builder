import React from "react";
import { Section, ExperienceBlock, EducationBlock, AchievementsBlock, ProjectsBlock, SkillsBlock } from "./TemplateSharedParts";

export default function TemplateBasic({ data }) {
  const accent = data.meta.accent;
  const profile = data.profile;

  return (
    <div className="print-page mx-auto text-[14px] leading-6 font-serif p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: accent }}>
          {profile.fullName}
        </h1>
        <p className="text-gray-700 text-sm">{profile.title}</p>
        <p className="text-xs text-gray-600 mt-1">
          {profile.email} • {profile.phone} • {profile.location}
        </p>

        {data.links?.length > 0 && (
          <p className="mt-1 text-xs text-gray-600">
            {data.links.map((l, i) => (
              <span key={l.id}>
                <a
                  href={l.url.startsWith("http") ? l.url : `https://${l.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-600 hover:underline print:no-underline"
                >
                  {l.label}
                </a>
                {i < data.links.length - 1 && " • "}
              </span>
            ))}
          </p>
        )}
      </div>

      {/* Sections */}
      {profile.summary && (
        <Section title="Summary" accent={accent}>
          <p className="text-[13px] text-gray-700 whitespace-pre-wrap break-words">
            {profile.summary}
          </p>
        </Section>
      )}

      {data.experience?.length > 0 && (
        <Section title="Experience" accent={accent}>
          {data.experience.map((e) => (
            <ExperienceBlock key={e.id} e={e} />
          ))}
        </Section>
      )}

      {data.projects?.length > 0 && (
        <Section title="Projects" accent={accent}>
          {data.projects.map((p) => (
            <ProjectsBlock key={p.id} p={p} />
          ))}
        </Section>
      )}

      {data.education?.length > 0 && (
        <Section title="Education" accent={accent}>
          {data.education.map((e) => (
            <EducationBlock key={e.id} e={e} />
          ))}
        </Section>
      )}

      {data.achievements?.length > 0 && (
        <Section title="Achievements" accent={accent}>
          {data.achievements.map((a) => (
            <AchievementsBlock key={a.id} a={a} />
          ))}
        </Section>
      )}

      {/* Skill Groups */}
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