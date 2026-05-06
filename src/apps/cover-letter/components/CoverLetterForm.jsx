/* src/apps/cover-letter/components/CoverLetterForm.jsx */

import React from "react";

const toneOptions = [
  { label: "Professional", value: "professional" },
  { label: "Confident", value: "confident" },
  { label: "Friendly", value: "friendly" },
];

function TextInput({ label, value, onChange, placeholder, readOnly = false }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none ${
          readOnly
            ? "cursor-not-allowed bg-gray-100 text-gray-600"
            : "focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
        }`}
      />
    </label>
  );
}

function TextAreaInput({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
      />
    </label>
  );
}

export default function CoverLetterForm({ formData, setFormData, hasResumeIdentity }) {
  const setField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Your Details</h2>
      <p className="mt-1 text-sm text-gray-600">Use short, clear highlights for better drafted output.</p>
      {hasResumeIdentity && (
        <p className="mt-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-800">
          Name, email, and phone are synced from Resume Builder profile details.
        </p>
      )}

      <div className="mt-4 space-y-4">
        <TextInput
          label="Name (from resume)"
          value={formData.fullName}
          onChange={undefined}
          placeholder="Alex Carter"
          readOnly
        />
        <TextInput
          label="Email (from resume)"
          value={formData.email}
          onChange={undefined}
          placeholder="alex.carter@email.com"
          readOnly
        />
        <TextInput
          label="Phone (from resume)"
          value={formData.phone}
          onChange={undefined}
          placeholder="+61 400 123 456"
          readOnly
        />
        <TextInput
          label="Target Job Title"
          value={formData.jobTitle}
          onChange={(event) => setField("jobTitle", event.target.value)}
          placeholder="Frontend Developer"
        />
        <TextInput
          label="Company Name"
          value={formData.companyName}
          onChange={(event) => setField("companyName", event.target.value)}
          placeholder="Acme Inc."
        />
        <TextInput
          label="Recipient Name"
          value={formData.recipientName}
          onChange={(event) => setField("recipientName", event.target.value)}
          placeholder="Mrs Andrea Smith"
        />
        <TextInput
          label="Recipient Title"
          value={formData.recipientTitle}
          onChange={(event) => setField("recipientTitle", event.target.value)}
          placeholder="HR Manager"
        />
        <TextAreaInput
          label="Company Address (one line per row)"
          value={formData.companyAddress}
          onChange={(event) => setField("companyAddress", event.target.value)}
          placeholder={"Drop Digital Design\n152 Silston Way\nClydeson WA 6000"}
          rows={3}
        />
        <TextAreaInput
          label="Top Skills (comma separated)"
          value={formData.topSkills}
          onChange={(event) => setField("topSkills", event.target.value)}
          placeholder="React, TypeScript, Testing"
        />
        <TextAreaInput
          label="Key Achievements"
          value={formData.achievements}
          onChange={(event) => setField("achievements", event.target.value)}
          placeholder="Increased conversion by 18%, reduced page load by 40%"
        />
        <TextAreaInput
          label="Why this company?"
          value={formData.whyCompany}
          onChange={(event) => setField("whyCompany", event.target.value)}
          placeholder="I admire your user-first product culture..."
          rows={4}
        />
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Tone</span>
          <select
            value={formData.tone}
            onChange={(event) => setField("tone", event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          >
            {toneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </article>
  );
}
