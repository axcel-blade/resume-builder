import React from "react";
import {
  Section,
  ExperienceBlock,
  EducationBlock,
  AchievementsBlock,
  ProjectsBlock,
} from "./TemplateSharedParts";

export default function TemplateBasic({ data }) {
  const accent = data.meta.accent;
  const profile = data.profile;

  const renderSkillSection = (title, list) =>
    list?.length > 0 && (
      <Section title={title} accent={accent}>
        <ul className="ml-5 list-disc text-[13px] text-gray-700 space-y-1">
          {list.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </Section>
    );

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

        {/* Profile Links */}
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

      {/* Summary */}
      {profile.summary && (
        <Section title="Summary" accent={accent}>
          <p className="text-[13px] text-gray-700 whitespace-pre-wrap break-words">
            {profile.summary}
          </p>
        </Section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <Section title="Experience" accent={accent}>
          {data.experience.map((e) => (
            <ExperienceBlock key={e.id} e={e} />
          ))}
        </Section>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <Section title="Projects" accent={accent}>
          {data.projects.map((p) => (
            <ProjectsBlock key={p.id} p={p} />
          ))}
        </Section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <Section title="Education" accent={accent}>
          {data.education.map((e) => (
            <EducationBlock key={e.id} e={e} />
          ))}
        </Section>
      )}

      {/* Achievements */}
      {data.achievements?.length > 0 && (
        <Section title="Achievements" accent={accent}>
          {data.achievements.map((a) => (
            <AchievementsBlock key={a.id} a={a} />
          ))}
        </Section>
      )}

      {/* Categorized Skills */}
      {renderSkillSection("Hard Skills", data.skills?.hard)}
      {renderSkillSection("Soft Skills", data.skills?.soft)}
      {renderSkillSection("Transferable Skills", data.skills?.transferable)}
      {renderSkillSection("Technical Skills", data.skills?.technical)}
    </div>
  );
}