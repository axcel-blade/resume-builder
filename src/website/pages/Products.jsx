/* src/website/pages/Products.jsx */

import React from "react";
import ProductCard from "../components/ProductCard";

const products = [
  {
    title: "Resume Builder",
    description: "Create, edit, preview, and export your resume with template support.",
    to: "/apps/resume-builder",
    status: "Live",
  },
  {
    title: "Cover Letter Writer",
    description: "Generate role-specific cover letters with guided content blocks.",
    to: "/apps/cover-letter",
    status: "Coming Soon",
  },
];

export default function Products() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Products</h1>
      <p className="mt-2 text-gray-600">Choose an app inside the Vita Forge platform.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </div>
    </section>
  );
}
