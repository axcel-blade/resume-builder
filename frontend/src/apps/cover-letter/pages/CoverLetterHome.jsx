/* src/apps/cover-letter/pages/CoverLetterHome.jsx */

import React, { useEffect, useMemo, useRef, useState } from "react";
import CoverLetterForm from "../components/CoverLetterForm";
import CoverLetterPreview from "../components/CoverLetterPreview";
import { buildCoverLetter } from "../services/buildCoverLetter";
import { exportCoverLetterPdf } from "../services/exportCoverLetterPdf";
import {
  buildProfileExport,
  normalizeImportedProfile,
  readProfileBundle,
  writeProfileBundle,
} from "../../shared/services/profileBundle";
import { defaultCoverLetterData, defaultData } from "../../../data/defaultData";

const initialForm = defaultCoverLetterData;

const sanitizeLine = (value) => (value || "").replace(/\s+/g, " ").trim();

const extractResumeIdentity = (resume) => {
  const profile = resume?.profile || {};
  return {
    fullName: profile.fullName || "",
    email: profile.email || "",
    phone: profile.phone || "",
  };
};

const deriveFromResume = (resume) => {
  const profile = resume?.profile || {};
  const skillTitles = (resume?.skillGroups || [])
    .map((group) => sanitizeLine(group.title))
    .filter(Boolean)
    .slice(0, 4)
    .join(", ");
  const topBullets = (resume?.experience || [])
    .flatMap((exp) => exp?.bullets || [])
    .map((bullet) => sanitizeLine(bullet))
    .filter(Boolean);

  return {
    ...initialForm,
    ...extractResumeIdentity(resume),
    jobTitle: sanitizeLine(profile.title || ""),
    topSkills: skillTitles,
    achievements: topBullets.slice(0, 2).join("; "),
  };
};

export default function CoverLetterHome() {
  const [formData, setFormData] = useState(initialForm);
  const [isSavingPdf, setIsSavingPdf] = useState(false);
  const [hasResumeIdentity, setHasResumeIdentity] = useState(false);
  const fileInputRef = useRef(null);

  const letter = useMemo(() => buildCoverLetter(formData), [formData]);

  useEffect(() => {
    const bundle = readProfileBundle();
    const resumeIdentity = bundle.resume ? extractResumeIdentity(bundle.resume) : null;
    setHasResumeIdentity(
      Boolean(resumeIdentity?.fullName || resumeIdentity?.email || resumeIdentity?.phone),
    );
    if (bundle.coverLetter) {
      setFormData((prev) => ({ ...prev, ...bundle.coverLetter, ...resumeIdentity }));
      return;
    }
    if (bundle.resume) {
      setFormData(deriveFromResume(bundle.resume));
      return;
    }
    setFormData(defaultCoverLetterData);
  }, []);

  useEffect(() => {
    writeProfileBundle({ coverLetter: formData });
  }, [formData]);

  const handleSavePdf = () => {
    try {
      setIsSavingPdf(true);
      exportCoverLetterPdf({
        letter,
        fullName: formData.fullName,
      });
    } catch (error) {
      console.error("Cover letter PDF export failed:", error);
      alert(`Failed to generate PDF:\n${error.message}`);
    } finally {
      setIsSavingPdf(false);
    }
  };

  const handleExportJson = () => {
    const bundle = readProfileBundle();
    const payload = buildProfileExport({
      resume: bundle.resume || defaultData,
      coverLetter: formData,
    });
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(formData.fullName || "cover_letter").replace(/\s+/g, "_")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const normalized = normalizeImportedProfile(parsed);
        if (normalized.resume) {
          writeProfileBundle({ resume: normalized.resume });
          const resumeIdentity = extractResumeIdentity(normalized.resume);
          setHasResumeIdentity(
            Boolean(resumeIdentity.fullName || resumeIdentity.email || resumeIdentity.phone),
          );
        }
        if (normalized.coverLetter) {
          const resumeIdentity = normalized.resume ? extractResumeIdentity(normalized.resume) : {};
          setFormData((prev) => ({ ...prev, ...normalized.coverLetter, ...resumeIdentity }));
        } else if (normalized.resume) {
          setFormData(deriveFromResume(normalized.resume));
        }
      } catch (error) {
        alert(`Invalid JSON file: ${error.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("Reset cover letter details?")) {
      const bundle = readProfileBundle();
      if (bundle.resume) {
        setFormData(deriveFromResume(bundle.resume));
        return;
      }
      setFormData(initialForm);
    }
  };

  return (
    <section className="mx-auto max-w-[1700px] p-4">
      <h1 className="text-3xl font-bold text-gray-900">Cover Letter Writer</h1>
      <p className="mt-2 max-w-3xl text-gray-600">
        Create a focused, role-specific draft letter by filling in your details and experience highlights.
      </p>
      <div className="sticky top-0 z-40 mt-4 flex flex-wrap items-center justify-end gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm print:hidden">
        <button
          type="button"
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm transition hover:bg-gray-50"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          type="button"
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm transition hover:bg-gray-50"
          onClick={handleExportJson}
        >
          Export JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) handleImportJson(file);
          }}
        />
        <button
          type="button"
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm transition hover:bg-gray-50"
          onClick={() => fileInputRef.current?.click()}
        >
          Import JSON
        </button>
        <button
          type="button"
          className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
          onClick={handleSavePdf}
          disabled={isSavingPdf}
        >
          {isSavingPdf ? "Saving PDF..." : "Save as PDF"}
        </button>
      </div>
      <div className="mx-auto mt-4 flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 px-4 py-2">
              <p className="text-sm font-semibold text-gray-700">Your Details</p>
            </div>
            <div className="max-h-[calc(100vh-160px)] overflow-y-auto bg-gray-100 p-4">
              <CoverLetterForm
                formData={formData}
                setFormData={setFormData}
                hasResumeIdentity={hasResumeIdentity}
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 px-4 py-2">
              <p className="text-sm font-semibold text-gray-700">Cover Letter Preview (A4)</p>
            </div>
            <div className="max-h-[calc(100vh-160px)] overflow-y-auto bg-gray-100 p-4">
              <CoverLetterPreview letter={letter} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
