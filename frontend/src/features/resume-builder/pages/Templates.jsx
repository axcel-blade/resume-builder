/* src/features/resume-builder/pages/Templates.jsx */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listTemplates } from "../../../services/templates";
import { MARKETPLACE_TEMPLATES } from "../../../constants/templates";

export default function Templates() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(MARKETPLACE_TEMPLATES);
  const [error, setError] = useState("");

  useEffect(() => {
    listTemplates()
      .then(setTemplates)
      .catch(() => setError("Showing built-in templates while the catalog API is offline."));
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Template marketplace</h1>
      <p className="mt-4 text-gray-600">
        Choose a layout and accent, then open it in Resume Builder. Content stays yours; only styling changes.
      </p>
      {error ? <p className="mt-2 text-sm text-amber-700">{error}</p> : null}
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <article key={template.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div
              className="mb-3 h-2 rounded-full"
              style={{ backgroundColor: template.accent }}
              aria-hidden
            />
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{template.category}</p>
            <h2 className="mt-1 text-xl font-semibold text-gray-900">{template.name}</h2>
            <p className="mt-2 text-sm text-gray-600">{template.description}</p>
            <button
              type="button"
              className="mt-4 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
              onClick={() => navigate(`/apps/resume-builder?template=${template.id}`)}
            >
              Use template
            </button>
          </article>
        ))}
      </div>
      <p className="mt-8 text-sm text-gray-500">
        Already editing?{" "}
        <Link className="font-medium text-sky-700" to="/apps/resume-builder">
          Return to the builder
        </Link>
        .
      </p>
    </section>
  );
}
