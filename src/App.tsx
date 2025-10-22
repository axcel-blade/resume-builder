import React, { useMemo, useRef, useState } from "react";
import Toolbar from "./components/Toolbar";
import ProfileEditor from "./components/ProfileEditor";
import ExperienceEditor from "./components/ExperienceEditor";
import EducationEditor from "./components/EducationEditor";
import AchievementsEditor from "./components/AchievementsEditor";
import SkillsEditor from "./components/SkillsEditor";
import TemplateModern from "./components/TemplateModern";
import { defaultData } from "./data/defaultData";

function useResumeState() {
  const [data, setData] = useState(defaultData);
  const set = (patch) => setData((d) => ({ ...d, ...patch }));
  return { data, set };
}

export default function App() {
  const { data, set } = useResumeState();
  const printRef = useRef(null);
  const onPrint = () => window.print();

  const Preview = useMemo(() => {
    switch (data.meta.template) {
      default:
        return TemplateModern;
    }
  }, [data.meta.template]);

  return (
    <div className="mx-auto max-w-7xl p-4">
      <style>{`
        @page { size: A4; margin: 18mm; }
        @media print {
          html, body, #root { background: white; }
          .print\\:hidden { display: none !important; }
          .print\\:no-underline { text-decoration: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-none { border: none !important; }
        }
      `}</style>

      {/* Header */}
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold tracking-tight">Resume Builder</h1>
      </header>

      {/* Toolbar (template, color, import/export, print) */}
      <Toolbar data={data} set={set} onPrint={onPrint} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* ✏️ Left Side — Editors (IN CORRECT ORDER) */}
        <div className="space-y-4 print:hidden">
          {/* 👤 Profile (includes Summary + Links) */}
          <ProfileEditor data={data} set={set} />

          {/* 💼 Experience */}
          <ExperienceEditor data={data} set={set} />

          {/* 🎓 Education */}
          <EducationEditor data={data} set={set} />

          {/* 🏆 Achievements */}
          <AchievementsEditor data={data} set={set} />

          {/* 💡 Skills */}
          <SkillsEditor data={data} set={set} />
        </div>

        {/* 📄 Right Side — PDF Preview */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm print:border-none print:shadow-none">
          <div ref={printRef}>
            <Preview data={data} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center text-xs text-gray-400 print:hidden">
        Developed by <span className="font-semibold text-gray-500">Ferx Technologies</span>.
      </footer>
    </div>
  );
}