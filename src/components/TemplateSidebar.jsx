import React from "react";
import {
  Section,
  ExperienceBlock,
  EducationBlock,
  AchievementsBlock,
  ProjectsBlock,
} from "./TemplateSharedParts";

export default function TemplateSidebar({ data }) {
  const accent = data.meta.accent;
  const profile = data.profile;

  return (
    <div className="print-page mx-auto flex text-[13px]">
      <aside
        className="w-[30%] bg-gray-50 p-6 border-r border-gray-200"
        style={{ color: "#333" }}
      >
        <h1 className="text-2xl font-bold mb-1" style={{ color: accent }}>
          {profile.fullName}
        </h1>
        <p className="text-sm text-gray-700 mb-2">{profile.title}</p>

        <div className="text-xs text-gray-600 space-y-1">
          {profile.email && <p>{profile.email}</p>}
          {profile.phone && <p>{profile.phone}</p>}
          {profile.location && <p>{profile.location}</p>}
          {profile.website && <p>{profile.website}</p>}
        </div>

        {data.links?.length > 0 && (
          <div className="mt-3 text-xs space-y-1">
            {data.links.map((l) => (
              <a
                key={l.id}
                href={l.url.startsWith("http") ? l.url : `https://${l.url}`}
                target="_blank"
                rel="noreferrer"
                className="block text-sky-600 hover:underline print:no-underline"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}

        {data.skills?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-2" style={{ color: accent }}>
              Skills
            </h3>
            <ul className="ml-4 list-disc space-y-1 text-gray-700">
              {data.skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className="flex-1 p-8 leading-5">
        {profile.summary && (
          <div className="mb-4">
            <h3
              className="text-sm font-semibold uppercase tracking-wide"
              style={{ color: accent }}
            >
              Summary
            </h3>
            <p className="text-[13px] text-gray-700 whitespace-pre-wrap break-words">
              {profile.summary}
            </p>
          </div>
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
      </main>
    </div>
  );
}