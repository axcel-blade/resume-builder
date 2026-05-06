/* src/website/pages/Contact.jsx */

import React from "react";

export default function Contact() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
      <p className="mt-4 max-w-3xl text-gray-600">
        Need help with exports, templates, or data import? Send your question and we will guide you through
        setup, troubleshooting, and best-practice document formatting.
      </p>
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-600">
          General support: <span className="font-semibold text-gray-900">team@vitaforge.dev</span>
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Product feedback: <span className="font-semibold text-gray-900">feedback@vitaforge.dev</span>
        </p>
      </div>
    </section>
  );
}
