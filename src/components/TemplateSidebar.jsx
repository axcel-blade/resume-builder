import React from "react";
import { Section, monthYYYY } from "./TemplateSharedParts";

export default function TemplateSidebar({ data }) {
  const accent = data.meta.accent;
  const profile = data.profile;

  return (
    <div className="print-page template-sidebar mx-auto flex text-[12.5px] leading-[1.4] font-sans">
      {/* ==== SIDEBAR ==== */}
      <aside className="w-[30%] bg-gray-50 border-r border-gray-200 px-4 py-5">
        {/* Name & Title */}
        <div className="mb-2">
          <h1 className="text-xl font-bold leading-tight" style={{ color: accent }}>
            {profile.fullName}
          </h1>
          <p className="text-[12px] text-gray-700">{profile.title}</p>
        </div>

        {/* Personal Details */}
        <div className="mb-2">
          <h3 className="text-[12px] font-semibold mb-[2px]" style={{ color: accent }}>
            PERSONAL DETAILS
          </h3>
          <ul className="text-[11.5px] text-gray-700 leading-[1.3] space-y-[1px]">
            {profile.phone && <li>{profile.phone}</li>}
            {profile.email && <li>{profile.email}</li>}
            {profile.location && <li>{profile.location}</li>}
            {profile.website && <li>{profile.website}</li>}
          </ul>
        </div>

        {/* Websites & Social Links */}
        {data.links?.length > 0 && (
          <div className="mb-2">
            <h3 className="text-[12px] font-semibold mb-[2px]" style={{ color: accent }}>
              WEBSITES & SOCIAL LINKS
            </h3>
            <ul className="text-[11.5px] text-gray-700 leading-[1.3] space-y-[1px]">
              {data.links.map((l) => (
                <li key={l.id}>
                  <a
                    href={l.url.startsWith("http") ? l.url : `https://${l.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-600 hover:underline print:no-underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills */}
        {data.skillGroups?.length > 0 && (
          <div>
            <h3 className="text-[12px] font-semibold mb-[2px]" style={{ color: accent }}>
              SKILLS
            </h3>
            {data.skillGroups.map((g) => (
              <div key={g.id} className="mb-[4px]">
                <p className="font-semibold text-[12px] text-gray-800">{g.title}</p>
                {g.bullets?.length > 0 && (
                  <ul className="ml-4 list-disc text-[11.5px] text-gray-700 leading-[1.3]">
                    {g.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* ==== MAIN CONTENT ==== */}
      <main className="flex-1 px-6 py-5">
        {/* Summary */}
        {profile.summary && (
          <Section title="SUMMARY" accent={accent}>
            <p className="text-[12.5px] text-gray-800 whitespace-pre-wrap break-words leading-[1.4]">
              {profile.summary}
            </p>
          </Section>
        )}

        {/* Employment */}
        {data.experience?.length > 0 && (
          <Section title="EMPLOYMENT HISTORY" accent={accent}>
            {data.experience.map((e) => (
              <div key={e.id} className="mb-[6px]">
                <div className="font-semibold text-[12.5px]">
                  {e.role}
                  {e.company && (
                    <span className="text-gray-600 font-normal"> • {e.company}</span>
                  )}
                </div>
                <div className="text-[11px] text-gray-500 mb-[2px]">
                  {monthYYYY(e.start)} – {monthYYYY(e.end) || "Present"}{" "}
                  {e.location && `| ${e.location}`}
                </div>
                {e.bullets?.length > 0 && (
                  <ul className="ml-5 list-disc text-[12px] text-gray-700 leading-[1.4]">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <Section title="EDUCATION" accent={accent}>
            {data.education.map((e) => (
              <div key={e.id} className="mb-[6px]">
                <div className="font-semibold text-[12.5px]">
                  {e.degree}
                  {e.school && (
                    <span className="text-gray-600 font-normal"> • {e.school}</span>
                  )}
                </div>
                <div className="text-[11px] text-gray-500 mb-[2px]">
                  {monthYYYY(e.start)} – {monthYYYY(e.end)} {e.location && `| ${e.location}`}
                </div>
                {e.bullets?.length > 0 && (
                  <ul className="ml-5 list-disc text-[12px] text-gray-700 leading-[1.4]">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <Section title="PROJECTS" accent={accent}>
            {data.projects.map((p) => (
              <div key={p.id} className="mb-[6px]">
                <div className="font-semibold text-[12.5px]">{p.title}</div>
                <div className="text-[11px] text-gray-500 mb-[2px]">
                  {p.organization} | {monthYYYY(p.start)} – {monthYYYY(p.end)}
                </div>
                {p.bullets?.length > 0 && (
                  <ul className="ml-5 list-disc text-[12px] text-gray-700 leading-[1.4]">
                    {p.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Achievements */}
        {data.achievements?.length > 0 && (
          <Section title="ACHIEVEMENTS" accent={accent}>
            {data.achievements.map((a) => (
              <div key={a.id} className="mb-[6px]">
                <div className="font-semibold text-[12.5px]">
                  {a.title}
                  {a.organization && (
                    <span className="text-gray-600 font-normal"> • {a.organization}</span>
                  )}
                </div>
                <div className="text-[11px] text-gray-500 mb-[2px]">
                  {a.year && `${a.year}`}
                </div>
                {a.bullets?.length > 0 && (
                  <ul className="ml-5 list-disc text-[12px] text-gray-700 leading-[1.4]">
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