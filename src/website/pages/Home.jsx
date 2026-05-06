/* src/website/pages/Home.jsx */

import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900">Build better resumes faster.</h1>
      <p className="mt-4 max-w-2xl text-gray-600">
        Vita Forge is a website that hosts career tools. Build your resume and draft role-specific cover
        letters in one platform.
      </p>
      <Link
        to="/products"
        className="mt-6 inline-flex rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
      >
        View Products
      </Link>
    </section>
  );
}
