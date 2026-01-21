import React, { useState } from "react";
import Toolbar from "./components/Toolbar";
import ToolbarSidebar from "./components/ToolbarSidebar";
import TabNavigation from "./components/TabNavigation";
import ResumeEditor from "./components/editors/ResumeEditor";
import CoverLetterEditor from "./components/editors/CoverLetterEditor";
import A4PaginatedPreview from "./components/preview/A4PaginatedPreview";
import TemplateModern from "./components/TemplateModern";
import TemplateBasic from "./components/TemplateBasic";
import TemplateSidebar from "./components/TemplateSidebar";
import CoverLetterTemplate from "./components/templates/CoverLetterTemplate";
import { defaultData } from "./data/defaultData";

export default function App() {
  const [data, setData] = useState(defaultData);
  const [activeTab, setActiveTab] = useState("resume");

  const set = (patch) => setData((prev) => ({ ...prev, ...patch }));

  // Determine which template component to use
  const getTemplateComponent = () => {
    if (activeTab === "coverLetter") {
      return CoverLetterTemplate;
    }
    
    const template = data.meta?.template || "modern";
    
    switch (template) {
      case "modern":
        return TemplateModern;
      case "basic":
        return TemplateBasic;
      case "sidebar":
        return TemplateSidebar;
      default:
        return TemplateModern;
    }
  };

  // Determine which toolbar to render
  const isSidebarTemplate = data.meta?.template === "sidebar";

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto flex flex-col lg:flex-row gap-4 p-4">
        {/* EDITOR PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {isSidebarTemplate ? (
            <ToolbarSidebar data={data} set={set} />
          ) : (
            <Toolbar data={data} set={set} />
          )}
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* EDITOR CONTENT */}
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {activeTab === "resume" ? (
              <ResumeEditor data={data} set={set} />
            ) : (
              <CoverLetterEditor data={data} set={set} />
            )}
          </div>
        </div>

        {/* PREVIEW PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm h-full">
            <div className="sticky top-0 border-b border-gray-200 bg-gray-50 px-4 py-2 print:hidden z-10">
              <p className="text-sm font-semibold text-gray-700">
                {activeTab === "resume" ? "Resume Preview (A4 Pages)" : "Cover Letter Preview"}
              </p>
            </div>
            <div className="max-h-[calc(100vh-100px)] overflow-y-auto bg-gray-100 p-4">
              {activeTab === "resume" ? (
                <A4PaginatedPreview data={data} templateComponent={getTemplateComponent()} />
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 mx-auto" style={{ maxWidth: "794px" }}>
                  <CoverLetterTemplate data={data} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}