import React from "react";

export default function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-2 rounded-2xl border border-gray-200 bg-white p-3 print:hidden">
      <button
        onClick={() => setActiveTab("resume")}
        className={`flex-1 rounded-xl px-4 py-2 font-semibold text-sm transition ${
          activeTab === "resume"
            ? "bg-sky-600 text-white"
            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        📄 Resume
      </button>
      <button
        onClick={() => setActiveTab("coverLetter")}
        className={`flex-1 rounded-xl px-4 py-2 font-semibold text-sm transition ${
          activeTab === "coverLetter"
            ? "bg-sky-600 text-white"
            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        📝 Cover Letter
      </button>
    </div>
  );
}