import React, { useRef } from "react";

export default function Toolbar({ data, set, onPrint }) {
  const fileInputRef = useRef(null);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(data.profile.fullName || "resume").replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        set(JSON.parse(e.target.result));
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const reset = () => {
    if (confirm("Reset to starter content?")) window.location.reload();
  };

  return (
    <div className="sticky top-0 z-10 mb-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm print:hidden">
      {/* Template & Accent */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-700">Template</span>
        <select
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
          value={data.meta.template}
          onChange={(e) => set({ meta: { ...data.meta, template: e.target.value } })}
        >
          <option value="modern">Modern</option>
          <option value="basic">Basic</option>
          <option value="sidebar">Sidebar</option>
        </select>

        <span className="ml-3 text-sm font-semibold text-gray-700">Accent</span>
        <input
          type="color"
          className="h-9 w-9 cursor-pointer rounded-xl border border-gray-300 p-1"
          value={data.meta.accent}
          onChange={(e) => set({ meta: { ...data.meta, accent: e.target.value } })}
        />
      </div>

      {/* Export/Import/Print */}
      <div className="flex items-center gap-2">
        <button
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
          onClick={reset}
        >
          Reset
        </button>
        <button
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
          onClick={exportJson}
        >
          Export JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])}
        />
        <button
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
          onClick={() => fileInputRef.current?.click()}
        >
          Import JSON
        </button>
        <button
          className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          onClick={onPrint}
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
}