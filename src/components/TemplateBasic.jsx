import React from "react";
import { Section, ExperienceBlock, EducationBlock, AchievementsBlock, ProjectsBlock, SkillsBlock } from "./TemplateSharedParts";

export default function TemplateBasic({ data }) {
  const accent = data.meta.accent;
  const profile = data.profile;

  return (
    <div className="print-page mx-auto text-[14px] leading-6 font-serif p-8">
      {/* Header */}
      <div className="text-center mb-6" style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
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
        <div style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
          <Section title="Summary" accent={accent}>
            <p className="text-[13px] text-gray-700 whitespace-pre-wrap break-words">
              {profile.summary}
            </p>
          </Section>
        </div>
      )}

      {data.experience?.length > 0 && (
        <Section title="Experience" accent={accent}>
          {data.experience.map((e) => (
            <div key={e.id} style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
              <ExperienceBlock e={e} />
            </div>
          ))}
        </Section>
      )}

      {data.projects?.length > 0 && (
        <Section title="Projects" accent={accent}>
          {data.projects.map((p) => (
            <div key={p.id} style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
              <ProjectsBlock p={p} />
            </div>
          ))}
        </Section>
      )}

      {data.education?.length > 0 && (
        <Section title="Education" accent={accent}>
          {data.education.map((e) => (
            <div key={e.id} style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
              <EducationBlock e={e} />
            </div>
          ))}
        </Section>
      )}

      {data.achievements?.length > 0 && (
        <Section title="Achievements" accent={accent}>
          {data.achievements.map((a) => (
            <div key={a.id} style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
              <AchievementsBlock a={a} />
            </div>
          ))}
        </Section>
      )}

      {/* Skill Groups */}
      {data.skillGroups?.length > 0 && (
        <Section title="Skills" accent={accent}>
          {data.skillGroups.map((g) => (
            <div key={g.id} style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
              <SkillsBlock group={g} />
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}