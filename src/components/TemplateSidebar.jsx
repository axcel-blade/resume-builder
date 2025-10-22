import React from "react";
import { Section, monthYYYY } from "./TemplateSharedParts";

export default function TemplateSidebar({ data }) {
  const accent = data.meta.accent;
  const profile = data.profile;

  const dateRange = (start, end) =>
    `${monthYYYY(start)} – ${monthYYYY(end) || "Present"}`;

  const renderSkillList = (title, list) =>
    list?.length > 0 && (
      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-1" style={{ color: accent }}>
          {title}
        </h3>
        <ul className="ml-4 list-disc space-y-1 text-gray-700">
          {list.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    );

  return (
    <div className="print-page mx-auto flex text-[13px]">
      <aside className="w-[30%] bg-gray-50 p-6 border-r border-gray-200">
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

        {/* Categorized Skills as bullet points */}
        {renderSkillList("Hard Skills", data.skills?.hard)}
        {renderSkillList("Soft Skills", data.skills?.soft)}
        {renderSkillList("Transferable Skills", data.skills?.transferable)}
        {renderSkillList("Technical Skills", data.skills?.technical)}
      </aside>

      <main className="flex-1 p-8 leading-5">
        {profile.summary && (
          <Section title="Summary" accent={accent}>
            <p className="text-[13px] text-gray-700 whitespace-pre-wrap break-words">
              {profile.summary}
            </p>
          </Section>
        )}

        {["experience", "projects", "education", "achievements"].map((key) =>
          data[key]?.length > 0 ? (
            <Section
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              accent={accent}
            >
              {data[key].map((item) => (
                <div key={item.id}>
                  <div className="text-[13px] font-medium">
                    <span>{item.role || item.title || item.degree}</span>
                    {item.company ||
                    item.organization ||
                    item.school ? (
                      <>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-600">
                          {item.company ||
                            item.organization ||
                            item.school}
                        </span>
                      </>
                    ) : null}
                  </div>

                  {(item.start || item.end || item.year) && (
                    <div className="text-xs text-gray-500 mt-0.5">
                      {dateRange(item.start || item.year, item.end)}
                    </div>
                  )}

                  {item.bullets?.length > 0 && (
                    <ul className="ml-5 list-disc mt-1 text-gray-700">
                      {item.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </Section>
          ) : null
        )}
      </main>
    </div>
  );
}