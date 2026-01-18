import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Toolbar from "./components/Toolbar";
import TabNavigation from "./components/TabNavigation";
import ResumeEditor from "./components/editors/ResumeEditor";
import CoverLetterEditor from "./components/editors/CoverLetterEditor";
import ResumeTemplate from "./components/TemplateModern";
import TemplateBasic from "./components/TemplateBasic";
import TemplateSidebar from "./components/TemplateSidebar";
import CoverLetterTemplate from "./components/templates/CoverLetterTemplate";
import { defaultData } from "./data/defaultData";

export default function App() {
  const [data, setData] = useState(defaultData);
  const [activeTab, setActiveTab] = useState("resume");
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${data.profile.fullName}-${activeTab}`,
  });

  const set = (patch) => setData((prev) => ({ ...prev, ...patch }));

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto flex flex-col lg:flex-row gap-4 p-4">
        {/* EDITOR PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <Toolbar data={data} set={set} onPrint={handlePrint} />
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
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="sticky top-0 border-b border-gray-200 bg-gray-50 px-4 py-2 print:hidden">
              <p className="text-sm font-semibold text-gray-700">
                {activeTab === "resume" ? "Resume Preview" : "Cover Letter Preview"}
              </p>
            </div>
            <div className="max-h-[calc(100vh-100px)] overflow-y-auto bg-gray-50" ref={printRef}>
              {activeTab === "resume" ? (
                data.meta.template === "modern" ? (
                  <ResumeTemplate data={data} />
                ) : data.meta.template === "basic" ? (
                  <TemplateBasic data={data} />
                ) : (
                  <TemplateSidebar data={data} />
                )
              ) : (
                <CoverLetterTemplate data={data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}