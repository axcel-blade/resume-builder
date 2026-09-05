/* src/routes/AppRoutes.jsx */

import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../core/layouts/MainLayout";
import Seo from "../core/seo/Seo";
import { SITE_NAME, SITE_URL } from "../core/config/seo";
import { LoginPage, RegisterPage } from "../components/auth";

const Home = lazy(() => import("../website/pages/Home"));
const About = lazy(() => import("../website/pages/About"));
const Products = lazy(() => import("../website/pages/Products"));
const Contact = lazy(() => import("../website/pages/Contact"));
const NotFound = lazy(() => import("../website/pages/NotFound"));
const Builder = lazy(() => import("../apps/resume-builder/pages/Builder"));
const Templates = lazy(() => import("../apps/resume-builder/pages/Templates"));
const Preview = lazy(() => import("../apps/resume-builder/pages/Preview"));
const CoverLetterHome = lazy(() => import("../apps/cover-letter/pages/CoverLetterHome"));

function withSeo(PageComponent, seoProps) {
  return (
    <>
      <Seo {...seoProps} />
      <Suspense fallback={<RouteLoadingFallback />}>
        <PageComponent />
      </Suspense>
    </>
  );
}

function RouteLoadingFallback() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm font-medium text-gray-600">Loading page...</p>
    </section>
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
        {/* Auth Routes (Public) */}
        <Route path="/login" element={withSeo(LoginPage, { title: "Login", path: "/login" })} />
        <Route path="/register" element={withSeo(RegisterPage, { title: "Register", path: "/register" })} />

        {/* Website Pages (Public) */}        <Route
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
        <Route
          path="*"
          element={withSeo(NotFound, {
            title: "Page Not Found",
            path: "/404",
            description:
              "The page you requested could not be found. Return to Vita Forge home or browse available products.",
            robots: "noindex, nofollow",
          })}
        />
      </Route>
    </Routes>
  );
}
