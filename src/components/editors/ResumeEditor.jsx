/* src/components/editors/ResumeEditor.jsx */

import React, { useState } from "react";
import ProfileEditor from "./ProfileEditor";
import ExperienceEditor from "./ExperienceEditor";
import VoluntaryEditor from "./VoluntaryEditor";
import ProjectsEditor from "./ProjectsEditor";
import EducationEditor from "./EducationEditor";
import AchievementsEditor from "./AchievementsEditor";
import CertificatesEditor from "./CertificatesEditor";
import SkillsEditor from "./SkillsEditor";
import InterestsEditor from "./InterestsEditor";
import ReferencesEditor from "./ReferencesEditor";
import { IconButton, SectionCard } from "../SharedInputs";

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

      {/* Editors are listed in the same order they appear on the rendered resume. */}
      <ProfileEditor      data={data} set={set} />
      <ExperienceEditor   data={data} set={set} />
      <VoluntaryEditor    data={data} set={set} />
      <ProjectsEditor     data={data} set={set} />
      <EducationEditor    data={data} set={set} />
      <AchievementsEditor data={data} set={set} />
      <CertificatesEditor data={data} set={set} />
      <SkillsEditor       data={data} set={set} />
      <InterestsEditor    data={data} set={set} />
      <ReferencesEditor   data={data} set={set} />
    </div>
  );
}