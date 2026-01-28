import React, { useState } from "react";
import Toolbar from "./components/Toolbar";
import ResumeEditor from "./components/editors/ResumeEditor";
import A4PaginatedPreview from "./components/preview/A4PaginatedPreview";
import TemplateModern from "./components/TemplateModern";
import TemplateBasic from "./components/TemplateBasic";
import { defaultData } from "./data/defaultData";

export default function App() {
  const [data, setData] = useState(defaultData);

  const set = (patch) => setData((prev) => ({ ...prev, ...patch }));

  const getTemplateComponent = () => {
    const template = data.meta?.template || "modern";
    
    switch (template) {
      case "modern":
        return TemplateModern;
      case "basic":
        return TemplateBasic;
      default:
        return TemplateModern;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto flex flex-col lg:flex-row gap-4 p-4">
        {/* EDITOR PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <Toolbar data={data} set={set} />

          {/* EDITOR CONTENT */}
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            <ResumeEditor data={data} set={set} />
          </div>
        </div>

        {/* PREVIEW PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm h-full">
            <div className="sticky top-0 border-b border-gray-200 bg-gray-50 px-4 py-2 print:hidden z-10">
              <p className="text-sm font-semibold text-gray-700">
                Resume Preview (A4 Pages)
              </p>
            </div>
            <div className="max-h-[calc(100vh-100px)] overflow-y-auto bg-gray-100 p-4">
              <A4PaginatedPreview data={data} templateComponent={getTemplateComponent()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}