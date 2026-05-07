/* src/routes/AppRoutes.jsx */

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../core/layouts/MainLayout";
import Seo from "../core/seo/Seo";
import { SITE_NAME, SITE_URL } from "../core/config/seo";
import Home from "../website/pages/Home";
import About from "../website/pages/About";
import Products from "../website/pages/Products";
import Contact from "../website/pages/Contact";
import Builder from "../apps/resume-builder/pages/Builder";
import Templates from "../apps/resume-builder/pages/Templates";
import Preview from "../apps/resume-builder/pages/Preview";
import CoverLetterHome from "../apps/cover-letter/pages/CoverLetterHome";

function withSeo(PageComponent, seoProps) {
  return (
    <>
      <Seo {...seoProps} />
      <PageComponent />
    </>
  );
}

export default function AppRoutes() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  };

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={withSeo(Home, {
            title: "Home",
            path: "/",
            keywords: "resume builder, cover letter writer, ATS friendly resume, professional templates",
            schema: {
              "@context": "https://schema.org",
              "@graph": [
                orgSchema,
                {
                  "@type": "WebSite",
                  name: SITE_NAME,
                  url: SITE_URL,
                },
              ],
            },
          })}
        />
        <Route
          path="/about"
          element={withSeo(About, {
            title: "About",
            path: "/about",
            description:
              "Learn how Vita Forge helps job seekers build professional, ATS-friendly resumes and cover letters with a connected workflow.",
            schema: {
              "@context": "https://schema.org",
              "@graph": [
                orgSchema,
                {
                  "@type": "AboutPage",
                  name: "About Vita Forge",
                  url: `${SITE_URL}/about`,
                  description:
                    "About Vita Forge and its modular platform for resume and cover letter creation.",
                },
              ],
            },
          })}
        />
        <Route
          path="/products"
          element={withSeo(Products, {
            title: "Products",
            path: "/products",
            description:
              "Explore Vita Forge products including Resume Builder and Cover Letter Writer for fast, ATS-friendly document creation.",
            schema: {
              "@context": "https://schema.org",
              "@graph": [
                orgSchema,
                {
                  "@type": "CollectionPage",
                  name: "Vita Forge Products",
                  url: `${SITE_URL}/products`,
                },
              ],
            },
          })}
        />
        <Route
          path="/contact"
          element={withSeo(Contact, {
            title: "Contact",
            path: "/contact",
            description:
              "Contact Vita Forge support for help with resume and cover letter templates, imports, exports, and formatting questions.",
            schema: {
              "@context": "https://schema.org",
              "@graph": [
                orgSchema,
                {
                  "@type": "ContactPage",
                  name: "Contact Vita Forge",
                  url: `${SITE_URL}/contact`,
                },
              ],
            },
          })}
        />
        <Route
          path="/apps/resume-builder"
          element={withSeo(Builder, {
            title: "Resume Builder",
            path: "/apps/resume-builder",
            description:
              "Build and edit your resume with structured sections, live preview, and export-ready formatting.",
            type: "article",
            schema: {
              "@context": "https://schema.org",
              "@graph": [
                orgSchema,
                {
                  "@type": "SoftwareApplication",
                  name: "Vita Forge Resume Builder",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web",
                  url: `${SITE_URL}/apps/resume-builder`,
                },
              ],
            },
          })}
        />
        <Route
          path="/apps/resume-builder/templates"
          element={withSeo(Templates, {
            title: "Resume Templates",
            path: "/apps/resume-builder/templates",
            description:
              "Browse resume templates and pick a professional, ATS-friendly layout for your job applications.",
            type: "article",
          })}
        />
        <Route
          path="/apps/resume-builder/preview"
          element={withSeo(Preview, {
            title: "Resume Preview",
            path: "/apps/resume-builder/preview",
            description:
              "Preview your resume in an A4 format before export to ensure clean, recruiter-ready presentation.",
            type: "article",
          })}
        />
        <Route
          path="/apps/cover-letter"
          element={withSeo(CoverLetterHome, {
            title: "Cover Letter Writer",
            path: "/apps/cover-letter",
            description:
              "Create role-focused cover letters with guided inputs, live preview, and PDF export-ready formatting.",
            type: "article",
            schema: {
              "@context": "https://schema.org",
              "@graph": [
                orgSchema,
                {
                  "@type": "SoftwareApplication",
                  name: "Vita Forge Cover Letter Writer",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web",
                  url: `${SITE_URL}/apps/cover-letter`,
                },
              ],
            },
          })}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
