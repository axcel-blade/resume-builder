/* src/website/pages/About.jsx */

import React from "react";

export default function About() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">About Vita Forge</h1>
      <p className="mt-4 max-w-3xl text-gray-600">
        Vita Forge is a modular platform for career preparation. The website introduces each tool, while
        dedicated apps provide focused editing workflows for resumes and cover letters.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">What We Focus On</h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>Consistent A4-ready output for professional applications</li>
            <li>Fast editing with clear sections and live preview feedback</li>
            <li>Reusable personal data across resume and cover-letter modules</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Platform Direction</h2>
          <p className="mt-3 text-sm text-gray-600">
            The architecture is designed for future career tools, with shared navigation, routing, and data
            exchange patterns to keep every module connected and maintainable.
          </p>
        </article>
      </div>
    </section>
  );
}
