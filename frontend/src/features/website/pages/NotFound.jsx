/* src/website/pages/NotFound.jsx */

import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">404 Error</p>
      <h1 className="mt-2 text-4xl font-bold text-gray-900">Page not found</h1>
      <p className="mx-auto mt-4 max-w-2xl text-gray-600">
        The page you are looking for does not exist or may have been moved. Return to the homepage or
        explore available products.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          to="/"
          className="inline-flex rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
        >
          Go Home
        </Link>
        <Link
          to="/products"
          className="inline-flex rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          View Products
        </Link>
      </div>
    </section>
  );
}
