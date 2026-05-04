/* src/apps/resume-builder/pages/Builder.jsx */

import React, { useRef, useState } from "react";
import Toolbar from "../../../components/Toolbar";
import ResumeEditor from "../../../components/editors/ResumeEditor";
import A4PaginatedPreview from "../../../components/preview/A4PaginatedPreview";
import TemplateModern from "../../../components/TemplateModern";
import TemplateBasic from "../../../components/TemplateBasic";
import { defaultData } from "../../../data/defaultData";

export default function Builder() {
  const [data, setData] = useState(defaultData);
  const previewRef = useRef(null);

  const set = (patch) => setData((prev) => ({ ...prev, ...patch }));

  const getTemplateComponent = () => {
    const template = data.meta?.template || "modern";
    if (template === "basic") return TemplateBasic;
    return TemplateModern;
  };

  return (
    <section className="mx-auto max-w-[1700px] p-4">
      <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Resume Builder AI assistant is coming soon.
      </div>
      <div className="mx-auto flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <Toolbar data={data} set={set} previewRef={previewRef} />
          <div className="mt-4 max-h-[calc(100vh-230px)] overflow-y-auto">
            <ResumeEditor data={data} set={set} />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 px-4 py-2">
              <p className="text-sm font-semibold text-gray-700">Resume Preview (A4 Pages)</p>
            </div>
            <div className="max-h-[calc(100vh-160px)] overflow-y-auto bg-gray-100 p-4">
              <A4PaginatedPreview
                ref={previewRef}
                data={data}
                templateComponent={getTemplateComponent()}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
