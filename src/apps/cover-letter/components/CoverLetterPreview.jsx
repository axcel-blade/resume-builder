/* src/apps/cover-letter/components/CoverLetterPreview.jsx */

import React from "react";

export default function CoverLetterPreview({ letter }) {
  return (
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
  );
}
