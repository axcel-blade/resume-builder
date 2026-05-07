/* src/website/components/ProductCard.jsx */

import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ title, description, to, status, image }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {image ? (
        <img
          src={image}
          alt={`${title} illustration`}
          className="mb-4 h-44 w-full rounded-lg border border-gray-100 bg-gray-50 object-contain p-3"
        />
      ) : null}
      <p className="mb-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
        {status}
      </p>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <Link
        to={to}
        className="mt-4 inline-flex rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
      >
        Open App
      </Link>
    </article>
  );
}
