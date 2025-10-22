import React from "react";
import {
  Section,
  ExperienceBlock,
  EducationBlock,
  AchievementsBlock,
  ProjectsBlock,
} from "./TemplateSharedParts";

export default function TemplateModern({ data }) {
  const accent = data.meta.accent;
  const profile = data.profile;

  return (
    <div className="p-8 text-[14px] leading-5">
      <div className="mb-4">
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

        {data.links?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
            {data.links.map((l) => (
              <a
                key={l.id}
                href={l.url.startsWith("http") ? l.url : `https://${l.url}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline text-sky-600 print:no-underline"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
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

      {data.skills?.length > 0 && (
        <Section title="Skills" accent={accent}>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <span
                key={i}
                className="rounded-full border border-gray-300 px-3 py-1 text-xs"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}