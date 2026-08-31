/* src/core/layouts/MainLayout.jsx */

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../website/components/Navbar";
import Footer from "../../website/components/Footer";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
