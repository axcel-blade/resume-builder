/* src/core/layouts/MainLayout.jsx */

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../website/components/Navbar";
import Footer from "../../website/components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
