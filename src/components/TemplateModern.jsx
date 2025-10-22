import React from "react";
import { Header, Section, ExperienceBlock, EducationBlock, AchievementsBlock } from "./TemplateSharedParts";

export default function TemplateModern({ data }) {
    const accent = data.meta.accent;
    const profile = data.profile;

    return (
        <div className="p-8 text-[14px] leading-5">
        <Header profile={profile} accent={accent} />

        {profile.summary && (
            <Section title="Summary" accent={accent}>
            <p className="text-[13px] text-gray-700">{profile.summary}</p>
            </Section>
        )}

        {data.skills?.length > 0 && (
            <Section title="Skills" accent={accent}>
            <div className="flex flex-wrap gap-2">
                {data.skills.map((s, i) => (
                <span key={i} className="rounded-full border border-gray-300 px-3 py-1 text-xs">{s}</span>
                ))}
            </div>
            </Section>
        )}

        {data.experience?.length > 0 && (
            <Section title="Experience" accent={accent}>
            {data.experience.map((e) => <ExperienceBlock key={e.id} e={e} />)}
            </Section>
        )}

        {data.education?.length > 0 && (
            <Section title="Education" accent={accent}>
            {data.education.map((e) => <EducationBlock key={e.id} e={e} />)}
            </Section>
        )}

        {data.achievements?.length > 0 && (
            <Section title="Achievements" accent={accent}>
            {data.achievements.map((a) => <AchievementsBlock key={a.id} a={a} />)}
            </Section>
        )}

        {data.links?.length > 0 && (
            <Section title="Links" accent={accent}>
            <ul className="ml-5 list-disc text-[13px]">
                {data.links.map((l) => <li key={l.id}><span className="font-medium">{l.label}:</span> {l.url}</li>)}
            </ul>
            </Section>
        )}
        </div>
    );
}