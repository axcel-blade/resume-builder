/* src/routes/AppRoutes.jsx */

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../core/layouts/MainLayout";
import Home from "../website/pages/Home";
import About from "../website/pages/About";
import Products from "../website/pages/Products";
import Contact from "../website/pages/Contact";
import Builder from "../apps/resume-builder/pages/Builder";
import Templates from "../apps/resume-builder/pages/Templates";
import Preview from "../apps/resume-builder/pages/Preview";
import CoverLetterHome from "../apps/cover-letter/pages/CoverLetterHome";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apps/resume-builder" element={<Builder />} />
        <Route path="/apps/resume-builder/templates" element={<Templates />} />
        <Route path="/apps/resume-builder/preview" element={<Preview />} />
        <Route path="/apps/cover-letter" element={<CoverLetterHome />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
