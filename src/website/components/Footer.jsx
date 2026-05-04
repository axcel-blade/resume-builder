/* src/website/components/Footer.jsx */

import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Vita Forge. Resume Builder is live. Cover Letter Writer is coming soon.
      </div>
    </footer>
  );
}
