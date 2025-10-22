import React from "react";

export function Header({ profile, accent }) {
  return (
    <div className="mb-4">
      <h1 className="text-3xl font-bold leading-tight" style={{ color: accent }}>{profile.fullName}</h1>
      <div className="text-sm text-gray-600">{profile.title}</div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
        {profile.email && <span>{profile.email}</span>}
        {profile.phone && <span>{profile.phone}</span>}
        {profile.location && <span>{profile.location}</span>}
        {profile.website && <span>{profile.website}</span>}
      </div>
    </div>
  );
}

export function Section({ title, children, accent }) {
  return (
    <div className="mt-4">
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>{title}</h3>
      <div className="space-y-2 text-sm text-gray-800">{children}</div>
    </div>
  );
}

export function Dot() { return <span className="mx-2 text-gray-400">•</span>; }

export function monthYYYY(s) {
  if (!s) return "";
  if (/^\d{4}-\d{2}$/.test(s)) {
    const [y, m] = s.split("-");
    const d = new Date(Number(y), Number(m) - 1, 1);
    return d.toLocaleString(undefined, { month: "short", year: "numeric" });
  }
  return s;
}

export const prefixHttp = (url) => (url?.startsWith("http") ? url : `https://${url}`);

export function ExperienceBlock({ e }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline text-[13px] font-medium">
        <span>{e.role}</span>
        {e.company && (<><Dot /><span className="text-gray-600">{e.company}</span></>)}
        {(e.start || e.end) && <span className="ml-auto text-xs text-gray-500">{monthYYYY(e.start)} – {monthYYYY(e.end)}</span>}
      </div>
      {(e.location || e.bullets?.length) && (
        <div className="mt-1 text-[13px] text-gray-700">
          {e.location && <div className="italic text-gray-500">{e.location}</div>}
          {e.bullets?.length > 0 && <ul className="ml-5 list-disc">{e.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
        </div>
      )}
    </div>
  );
}

export function EducationBlock({ e }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline text-[13px] font-medium">
        <span>{e.degree}</span>
        {e.school && (<><Dot /><span className="text-gray-600">{e.school}</span></>)}
        {(e.start || e.end) && <span className="ml-auto text-xs text-gray-500">{e.start} – {e.end}</span>}
      </div>
      {(e.location || e.bullets?.length) && (
        <div className="mt-1 text-[13px] text-gray-700">
          {e.location && <div className="italic text-gray-500">{e.location}</div>}
          {e.bullets?.length > 0 && <ul className="ml-5 list-disc">{e.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
        </div>
      )}
    </div>
  );
}

export function AchievementsBlock({ a }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline text-[13px] font-medium">
        <span>{a.title}</span>
        {a.organization && (<><Dot /><span className="text-gray-600">{a.organization}</span></>)}
        {a.year && <span className="ml-auto text-xs text-gray-500">{a.year}</span>}
      </div>
      {a.bullets?.length > 0 && (
        <ul className="ml-5 list-disc text-[13px] text-gray-700">
          {a.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
    </div>
  );
}