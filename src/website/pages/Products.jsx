/* src/website/pages/Products.jsx */

import React from "react";
import ProductCard from "../components/ProductCard";
import resumeImage from "../assets/images/resume.svg";
import interviewImage from "../assets/images/interview.svg";

const products = [
  {
    title: "Resume Builder",
    description: "Create, edit, preview, and export your resume with template support.",
    to: "/apps/resume-builder",
    status: "Live",
    image: resumeImage,
  },
  {
    title: "Cover Letter Writer",
    description: "Draft role-specific cover letters with guided inputs and live output preview.",
    to: "/apps/cover-letter",
    status: "Live",
    image: interviewImage,
  },
];

export default function Products() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Products</h1>
      <p className="mt-2 max-w-3xl text-gray-600">
        Choose a module based on where you are in your job application workflow. Both tools support live
        preview and export-ready output.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </div>
    </section>
  );
}
