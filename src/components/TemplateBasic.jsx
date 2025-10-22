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
        <p className="text-[13px] text-gray-700">{list.join(", ")}</p>
      </Section>
    );

  return (
    <div className="print-page mx-auto text-[14px] leading-6 font-serif p-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: accent }}>
          {profile.fullName}
        </h1>
        <p className="text-gray-700 text-sm">{profile.title}</p>
        <p className="text-xs text-gray-600 mt-1">
          {profile.email} • {profile.phone} • {profile.location}
        </p>
      </div>

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

      {/* New categorized skills */}
      {renderSkillSection("Hard Skills", data.skills?.hard)}
      {renderSkillSection("Soft Skills", data.skills?.soft)}
      {renderSkillSection("Transferable Skills", data.skills?.transferable)}
      {renderSkillSection("Technical Skills", data.skills?.technical)}
    </div>
  );
}