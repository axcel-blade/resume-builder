import React from "react";
import {
  Section,
  monthYYYY,
} from "./TemplateSharedParts";

export default function TemplateSidebar({ data }) {
  const accent = data.meta.accent;
  const profile = data.profile;

  return (
    <div className="print-page mx-auto flex text-[13px]">
      {/* Sidebar */}
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

      {/* Main Content */}
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

        {/* EXPERIENCE */}
        {data.experience?.length > 0 && (
          <Section title="Experience" accent={accent}>
            {data.experience.map((e) => (
              <div key={e.id}>
                <div className="text-[13px] font-medium">
                  <span>{e.role}</span>
                  {e.company && (
                    <>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-600">{e.company}</span>
                    </>
                  )}
                </div>
                {(e.start || e.end) && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {monthYYYY(e.start)} – {monthYYYY(e.end)}
                  </div>
                )}
                {e.location && (
                  <div className="italic text-gray-500">{e.location}</div>
                )}
                {e.bullets?.length > 0 && (
                  <ul className="ml-5 list-disc mt-1 text-gray-700">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* PROJECTS */}
        {data.projects?.length > 0 && (
          <Section title="Projects" accent={accent}>
            {data.projects.map((p) => (
              <div key={p.id}>
                <div className="text-[13px] font-medium">
                  <span>{p.title}</span>
                  {p.organization && (
                    <>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-600">{p.organization}</span>
                    </>
                  )}
                </div>
                {(p.start || p.end) && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {monthYYYY(p.start)} – {monthYYYY(p.end)}
                  </div>
                )}
                {p.bullets?.length > 0 && (
                  <ul className="ml-5 list-disc mt-1 text-gray-700">
                    {p.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* EDUCATION */}
        {data.education?.length > 0 && (
          <Section title="Education" accent={accent}>
            {data.education.map((e) => (
              <div key={e.id}>
                <div className="text-[13px] font-medium">
                  <span>{e.degree}</span>
                  {e.school && (
                    <>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-600">{e.school}</span>
                    </>
                  )}
                </div>
                {(e.start || e.end) && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {monthYYYY(e.start)} – {monthYYYY(e.end)}
                  </div>
                )}
                {e.location && (
                  <div className="italic text-gray-500">{e.location}</div>
                )}
                {e.bullets?.length > 0 && (
                  <ul className="ml-5 list-disc mt-1 text-gray-700">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* ACHIEVEMENTS */}
        {data.achievements?.length > 0 && (
          <Section title="Achievements" accent={accent}>
            {data.achievements.map((a) => (
              <div key={a.id}>
                <div className="text-[13px] font-medium">
                  <span>{a.title}</span>
                  {a.organization && (
                    <>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-600">{a.organization}</span>
                    </>
                  )}
                </div>
                {a.year && (
                  <div className="text-xs text-gray-500 mt-0.5">{a.year}</div>
                )}
                {a.bullets?.length > 0 && (
                  <ul className="ml-5 list-disc mt-1 text-gray-700">
                    {a.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}
      </main>
    </div>
  );
}