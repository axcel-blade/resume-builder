/* src/apps/cover-letter/components/CoverLetterPreview.jsx */

import React from "react";

export default function CoverLetterPreview({ letter }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="text-lg font-semibold text-gray-900">Generated Letter</h2>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
          Live Draft
        </span>
      </div>
      <div className="overflow-x-auto rounded-xl bg-gray-100 p-3">
        <div className="mx-auto w-full max-w-[794px]">
          <div className="mx-auto min-h-[1123px] w-full bg-white px-[96px] py-[96px] shadow-sm">
            <pre
              className="w-full whitespace-pre-wrap wrap-break-word text-gray-900"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "16px",
                lineHeight: 1.5,
              }}
            >
              {letter}
            </pre>
          </div>
        </div>
      </div>
    </article>
  );
}
