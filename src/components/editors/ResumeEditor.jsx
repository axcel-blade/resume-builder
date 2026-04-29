/* src/components/editors/ResumeEditor.jsx */

import React, { useState } from "react";
import ProfileEditor from "./ProfileEditor";
import ExperienceEditor from "./ExperienceEditor";
import EducationEditor from "./EducationEditor";
import ProjectsEditor from "./ProjectsEditor";
import SkillsEditor from "./SkillsEditor";
import AchievementsEditor from "./AchievementsEditor";
import VoluntaryEditor from "./VoluntaryEditor";
import CertificatesEditor from "./CertificatesEditor";
import InterestsEditor from "./InterestsEditor";
import ReferencesEditor from "./ReferencesEditor";
import { IconButton, SectionCard, Label } from "../SharedInputs";
import { FONT_FAMILIES, DEFAULT_FONT_ID } from "../TemplateSharedParts";

export default function ResumeEditor({ data, set }) {
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const templates = [
    { id: "modern", name: "Modern", icon: "✨" },
    { id: "basic", name: "Basic", icon: "📋" },
  ];

  const selectTemplate = (templateId) => {
    set({ meta: { ...data.meta, template: templateId } });
    setShowTemplateSelector(false);
  };

  const currentFontId = data.meta?.font || DEFAULT_FONT_ID;
  const setFont = (fontId) => set({ meta: { ...data.meta, font: fontId } });

  return (
    <div className="space-y-4">
      <SectionCard
        title="Resume Template"
        action={
          <IconButton onClick={() => setShowTemplateSelector(!showTemplateSelector)}>
            {showTemplateSelector ? "Close" : "Change"}
          </IconButton>
        }
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Current: </span>
          <span className="text-sm font-semibold text-sky-600">
            {templates.find((t) => t.id === data.meta.template)?.name || "Modern"}
          </span>
        </div>

        {showTemplateSelector && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => selectTemplate(template.id)}
                className={`rounded-xl p-4 border-2 transition ${
                  data.meta.template === template.id
                    ? "border-sky-600 bg-sky-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="text-3xl mb-2">{template.icon}</div>
                <div className="text-sm font-semibold text-gray-700">{template.name}</div>
              </button>
            ))}
          </div>
        )}
      </SectionCard>

      {/* ── Typography (font family picker) ──────────────────────────────────
          The Curtin Resume Workbook (p.24) recommends sans-serif fonts —
          Arial, Calibri, and Verdana — as easiest to read on screen and in
          print. Recommended fonts are flagged in the picker below. */}
      <SectionCard title="Typography">
        <div className="mb-2">
          <Label htmlFor="font-family-select">Font Family</Label>
        </div>
        <select
          id="font-family-select"
          value={currentFontId}
          onChange={(e) => setFont(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
          style={{ fontFamily: (FONT_FAMILIES.find((f) => f.id === currentFontId) || FONT_FAMILIES[0]).stack }}
        >
          <optgroup label="Recommended (sans-serif)">
            {FONT_FAMILIES.filter((f) => f.recommended).map((f) => (
              <option key={f.id} value={f.id} style={{ fontFamily: f.stack }}>
                {f.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Other">
            {FONT_FAMILIES.filter((f) => !f.recommended).map((f) => (
              <option key={f.id} value={f.id} style={{ fontFamily: f.stack }}>
                {f.name}
              </option>
            ))}
          </optgroup>
        </select>
        <p className="mt-2 text-xs text-gray-500 italic">
          Sans-serif fonts (Arial, Calibri, Verdana) are recommended for resumes —
          they're easier to read on screen and in print.
        </p>
      </SectionCard>

      {/*
        Editors are listed in the same order they appear on the rendered resume.
        Order follows a typical professional resume:
          1. Profile (Personal Details + Career Objective)
          2. Professional Experience
          3. Education
          4. Projects
          5. Key Skills
          6. Achievements and Awards
          7. Volunteer Work
          8. Certificates & Licenses
          9. Interests
         10. References
      */}
      <ProfileEditor      data={data} set={set} />
      <ExperienceEditor   data={data} set={set} />
      <EducationEditor    data={data} set={set} />
      <ProjectsEditor     data={data} set={set} />
      <SkillsEditor       data={data} set={set} />
      <AchievementsEditor data={data} set={set} />
      <VoluntaryEditor    data={data} set={set} />
      <CertificatesEditor data={data} set={set} />
      <InterestsEditor    data={data} set={set} />
      <ReferencesEditor   data={data} set={set} />
    </div>
  );
}