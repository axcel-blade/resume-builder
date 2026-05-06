/* src/apps/resume-builder/pages/Builder.jsx */

import React, { useEffect, useRef, useState } from "react";
import Toolbar from "../../../components/Toolbar";
import ResumeEditor from "../../../components/editors/ResumeEditor";
import A4PaginatedPreview from "../../../components/preview/A4PaginatedPreview";
import TemplateModern from "../../../components/TemplateModern";
import TemplateBasic from "../../../components/TemplateBasic";
import { defaultData } from "../../../data/defaultData";
import { readProfileBundle, writeProfileBundle } from "../../shared/services/profileBundle";

export default function Builder() {
  const [data, setData] = useState(defaultData);
  const previewRef = useRef(null);

  const set = (patch) => setData((prev) => ({ ...prev, ...patch }));

  useEffect(() => {
    const bundle = readProfileBundle();
    if (bundle.resume) {
      setData(bundle.resume);
    }
  }, []);

  useEffect(() => {
    writeProfileBundle({ resume: data });
  }, [data]);

  const getTemplateComponent = () => {
    const template = data.meta?.template || "modern";
    if (template === "basic") return TemplateBasic;
    return TemplateModern;
  };

  return (
    <section className="mx-auto max-w-[1700px] p-4">
      <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
      <p className="mt-2 max-w-3xl text-gray-600">
        Create a focused, professional resume by filling in your profile, experience, and skills with live
        A4 preview support.
      </p>
      <Toolbar data={data} set={set} />
      <div className="mx-auto flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 px-4 py-2">
              <p className="text-sm font-semibold text-gray-700">Profile</p>
            </div>
            <div className="max-h-[calc(100vh-160px)] overflow-y-auto bg-gray-100 p-4">
              <ResumeEditor data={data} set={set} />
            </div>
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
