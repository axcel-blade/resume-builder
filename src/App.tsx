import React, { useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Toolbar from "./components/Toolbar";
import ProfileEditor from "./components/ProfileEditor";
import ExperienceEditor from "./components/ExperienceEditor";
import EducationEditor from "./components/EducationEditor";
import AchievementsEditor from "./components/AchievementsEditor";
import SkillsEditor from "./components/SkillsEditor";
import ProjectsEditor from "./components/ProjectsEditor";
import TemplateModern from "./components/TemplateModern";
import TemplateBasic from "./components/TemplateBasic";
import TemplateSidebar from "./components/TemplateSidebar";
import { defaultData } from "./data/defaultData";

function useResumeState() {
  const [data, setData] = useState(defaultData);
  const set = (patch: any) => setData((d) => ({ ...d, ...patch }));
  return { data, set };
}

export default function App() {
  const { data, set } = useResumeState();
  const printRef = useRef<HTMLDivElement>(null);

  // Select template dynamically
  const Preview = useMemo(() => {
    switch (data.meta.template) {
      case "basic":
        return TemplateBasic;
      case "sidebar":
        return TemplateSidebar;
      default:
        return TemplateModern;
    }
  }, [data.meta.template]);

  // Print handler
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${data.profile.fullName || "resume"}`,
    removeAfterPrint: true,
  });

  return (
    <div className="mx-auto max-w-7xl p-4">
      {/* ✅ Print-specific styling */}
      <style>{`
        /* Default margins for all templates */
        @page { size: A4; margin: 18mm; }

        /* Minimal margin for TemplateSidebar only */
        @page TemplateSidebar {
          size: A4;
          margin: 8mm;
        }

        @media print {
          html, body, #root {
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body::before, body::after {
            display: none !important;
            content: none !important;
          }

          .print\\:hidden { display: none !important; }
          .print\\:border-none { border: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }

          /* ✅ Template-specific margins */
          .template-sidebar {
            margin: 0 !important;
            padding: 0 !important;
            page: TemplateSidebar;
          }
        }
      `}</style>

      {/* Header */}
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold tracking-tight">Resume Builder</h1>
      </header>

      {/* Toolbar for print/export */}
      <Toolbar data={data} set={set} onPrint={handlePrint} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Left side: Editors */}
        <div className="space-y-4 print:hidden">
          <ProfileEditor data={data} set={set} />
          <ExperienceEditor data={data} set={set} />
          <ProjectsEditor data={data} set={set} />
          <EducationEditor data={data} set={set} />
          <AchievementsEditor data={data} set={set} />
          <SkillsEditor data={data} set={set} />
        </div>

        {/* Right side: Live Preview */}
        <div
          ref={printRef}
          className={`rounded-2xl border border-gray-200 bg-white shadow-sm print:border-none print:shadow-none ${
            data.meta.template === "sidebar" ? "template-sidebar" : ""
          }`}
        >
          <Preview data={data} />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center text-xs text-gray-400 print:hidden">
        Developed by <span className="font-semibold text-gray-500">Ferx Technologies</span>.
      </footer>
    </div>
  );
}