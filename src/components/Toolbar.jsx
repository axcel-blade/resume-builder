/* src/components/Toolbar.jsx */

import React, { useRef } from "react";
import jsPDF from "jspdf";

// ─── Layout constants (all in mm) ───────────────────────────────────────────
const PAGE_W = 210;
const PAGE_H = 297;
const ML = 15; // margin left
const MR = 15; // margin right
const MT = 16; // margin top
const MB = 16; // margin bottom
const CONTENT_W = PAGE_W - ML - MR;

// ─── Font sizes (pt) ────────────────────────────────────────────────────────
const FS = {
  name: 22,
  title: 11,
  contact: 9,
  sectionHead: 8.5,
  entryTitle: 10,
  entryMeta: 8.5,
  bullet: 9.5,
  summary: 9.5,
};

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Convert hex colour to [r, g, b] 0-255 */
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

/**
 * Wrap text to fit within maxWidth mm.
 * Returns an array of line strings.
 */
function wrapText(pdf, text, maxWidth) {
  return pdf.splitTextToSize(text, maxWidth);
}

/**
 * Draw wrapped text and return new Y position.
 * lineHeight in mm.
 */
function drawText(pdf, text, x, y, maxWidth, lineHeightMM) {
  const lines = wrapText(pdf, text, maxWidth);
  lines.forEach((line) => {
    pdf.text(line, x, y);
    y += lineHeightMM;
  });
  return y;
}

/**
 * Draw a section heading with an underline rule.
 * Returns new Y.
 */
function drawSectionHead(pdf, label, y, accent) {
  const [r, g, b] = hexToRgb(accent);
  pdf.setFontSize(FS.sectionHead);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(r, g, b);
  pdf.text(label.toUpperCase(), ML, y);
  y += 1.5;
  pdf.setDrawColor(r, g, b);
  pdf.setLineWidth(0.3);
  pdf.line(ML, y, ML + CONTENT_W, y);
  pdf.setTextColor(0, 0, 0);
  y += 4;
  return y;
}

/**
 * Add a new page and reset Y to top margin.
 */
function newPage(pdf) {
  pdf.addPage();
  return MT;
}

/**
 * Check if adding `neededMM` from current y would overflow the page.
 * If so, add a new page.
 */
function ensureSpace(pdf, y, neededMM) {
  if (y + neededMM > PAGE_H - MB) {
    return newPage(pdf);
  }
  return y;
}

// ─── Main export function ────────────────────────────────────────────────────

function buildPDF(data) {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const accent = data.meta?.accent || "#0ea5e9";
  const [ar, ag, ab] = hexToRgb(accent);
  const profile = data.profile;

  let y = MT;

  // ── NAME ──────────────────────────────────────────────────────────────────
  pdf.setFontSize(FS.name);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(ar, ag, ab);
  pdf.text(profile.fullName || "", ML, y);
  y += 8;

  // ── TITLE ─────────────────────────────────────────────────────────────────
  if (profile.title) {
    pdf.setFontSize(FS.title);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(60, 60, 60);
    pdf.text(profile.title, ML, y);
    y += 5.5;
  }

  // ── CONTACT LINE ─────────────────────────────────────────────────────────
  pdf.setFontSize(FS.contact);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(80, 80, 80);
  const contactParts = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
  ].filter(Boolean);
  if (contactParts.length) {
    pdf.text(contactParts.join("   "), ML, y);
    y += 4.5;
  }

  // ── LINKS ─────────────────────────────────────────────────────────────────
  if (data.links?.length) {
    pdf.setFontSize(FS.contact);
    pdf.setFont("helvetica", "normal");
    data.links.forEach((l) => {
      y = ensureSpace(pdf, y, 4.5);
      pdf.setTextColor(80, 80, 80);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${l.label}`, ML, y);
      const labelW = pdf.getTextWidth(`${l.label}  `);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(ar, ag, ab);
      pdf.text(l.url, ML + labelW + 2, y);
      y += 4.2;
    });
  }

  y += 3; // gap before first section

  // ── SUMMARY ───────────────────────────────────────────────────────────────
  if (profile.summary) {
    y = ensureSpace(pdf, y, 14);
    y = drawSectionHead(pdf, "Summary", y, accent);
    pdf.setFontSize(FS.summary);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(50, 50, 50);
    y = drawText(pdf, profile.summary, ML, y, CONTENT_W, 4.5);
    y += 4;
  }

  // ── EXPERIENCE ────────────────────────────────────────────────────────────
  if (data.experience?.length) {
    y = ensureSpace(pdf, y, 14);
    y = drawSectionHead(pdf, "Experience", y, accent);

    data.experience.forEach((e) => {
      y = ensureSpace(pdf, y, 10);

      // Role | Company
      pdf.setFontSize(FS.entryTitle);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 30, 30);
      const roleText = e.company ? `${e.role}` : e.role;
      pdf.text(roleText, ML, y);
      if (e.company) {
        const roleW = pdf.getTextWidth(roleText);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(90, 90, 90);
        pdf.text(` | ${e.company}`, ML + roleW, y);
      }
      y += 4.5;

      // Date | Location
      pdf.setFontSize(FS.entryMeta);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(120, 120, 120);
      const meta = [
        `${e.start} – ${e.end || "Present"}`,
        e.location,
      ].filter(Boolean).join("   |   ");
      pdf.text(meta, ML, y);
      y += 4;

      // Bullets
      if (e.bullets?.length) {
        pdf.setFontSize(FS.bullet);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(50, 50, 50);
        e.bullets.forEach((b) => {
          const lines = wrapText(pdf, b, CONTENT_W - 6);
          y = ensureSpace(pdf, y, lines.length * 4 + 1);
          lines.forEach((line, li) => {
            pdf.text(line, ML + 6, y);
            y += 4;
          });
        });
      }
      y += 3;
    });
  }

  // ── PROJECTS ──────────────────────────────────────────────────────────────
  if (data.projects?.length) {
    y = ensureSpace(pdf, y, 14);
    y = drawSectionHead(pdf, "Projects", y, accent);

    data.projects.forEach((p) => {
      y = ensureSpace(pdf, y, 10);

      pdf.setFontSize(FS.entryTitle);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 30, 30);
      pdf.text(p.title || "", ML, y);
      y += 4.5;

      if (p.organization || p.start) {
        pdf.setFontSize(FS.entryMeta);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(120, 120, 120);
        const meta = [p.organization, `${p.start} – ${p.end}`].filter(Boolean).join("   |   ");
        pdf.text(meta, ML, y);
        y += 4;
      }

      if (p.bullets?.length) {
        pdf.setFontSize(FS.bullet);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(50, 50, 50);
        p.bullets.forEach((b) => {
          const lines = wrapText(pdf, b, CONTENT_W - 6);
          y = ensureSpace(pdf, y, lines.length * 4 + 1);
          lines.forEach((line) => {
            pdf.text(line, ML + 6, y);
            y += 4;
          });
        });
      }
      y += 3;
    });
  }

  // ── EDUCATION ─────────────────────────────────────────────────────────────
  if (data.education?.length) {
    y = ensureSpace(pdf, y, 14);
    y = drawSectionHead(pdf, "Education", y, accent);

    data.education.forEach((e) => {
      y = ensureSpace(pdf, y, 10);

      pdf.setFontSize(FS.entryTitle);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 30, 30);
      pdf.text(e.degree || "", ML, y);
      if (e.school) {
        const dw = pdf.getTextWidth(e.degree || "");
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(90, 90, 90);
        pdf.text(` | ${e.school}`, ML + dw, y);
      }
      y += 4.5;

      if (e.start) {
        pdf.setFontSize(FS.entryMeta);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(120, 120, 120);
        const meta = [`${e.start} – ${e.end}`, e.location].filter(Boolean).join("   |   ");
        pdf.text(meta, ML, y);
        y += 4;
      }

      if (e.bullets?.length) {
        pdf.setFontSize(FS.bullet);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(50, 50, 50);
        e.bullets.forEach((b) => {
          const lines = wrapText(pdf, b, CONTENT_W - 6);
          y = ensureSpace(pdf, y, lines.length * 4 + 1);
          lines.forEach((line) => {
            pdf.text(line, ML + 6, y);
            y += 4;
          });
        });
      }
      y += 3;
    });
  }

  // ── ACHIEVEMENTS ──────────────────────────────────────────────────────────
  if (data.achievements?.length) {
    y = ensureSpace(pdf, y, 14);
    y = drawSectionHead(pdf, "Achievements", y, accent);

    data.achievements.forEach((a) => {
      y = ensureSpace(pdf, y, 10);

      pdf.setFontSize(FS.entryTitle);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 30, 30);
      pdf.text(a.title || "", ML, y);
      if (a.organization) {
        const tw = pdf.getTextWidth(a.title || "");
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(90, 90, 90);
        pdf.text(` | ${a.organization}`, ML + tw, y);
      }
      y += 4.5;

      if (a.year) {
        pdf.setFontSize(FS.entryMeta);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(120, 120, 120);
        pdf.text(a.year, ML, y);
        y += 4;
      }

      if (a.bullets?.length) {
        pdf.setFontSize(FS.bullet);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(50, 50, 50);
        a.bullets.forEach((b) => {
          const lines = wrapText(pdf, b, CONTENT_W - 6);
          y = ensureSpace(pdf, y, lines.length * 4 + 1);
          lines.forEach((line) => {
            pdf.text(line, ML + 6, y);
            y += 4;
          });
        });
      }
      y += 3;
    });
  }

  // ── SKILLS ────────────────────────────────────────────────────────────────
  if (data.skillGroups?.length) {
    y = ensureSpace(pdf, y, 14);
    y = drawSectionHead(pdf, "Skills", y, accent);

    data.skillGroups.forEach((g) => {
      y = ensureSpace(pdf, y, 8);

      pdf.setFontSize(FS.entryTitle);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 30, 30);
      pdf.text(g.title || "", ML, y);
      y += 4.5;

      if (g.bullets?.length) {
        pdf.setFontSize(FS.bullet);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(50, 50, 50);
        g.bullets.forEach((b) => {
          y = ensureSpace(pdf, y, 4);
          pdf.text(b, ML + 6, y);
          y += 4;
        });
      }
      y += 3;
    });
  }

  return pdf;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Toolbar({ data, set }) {
  const fileInputRef = useRef(null);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(data.profile.fullName || "resume").replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        set(JSON.parse(e.target.result));
      } catch (error) {
        alert("Invalid JSON file: " + error.message);
      }
    };
    reader.readAsText(file);
  };

  const reset = () => {
    if (confirm("Reset to starter content?")) window.location.reload();
  };

  const savePDF = (event) => {
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = "Generating PDF...";
    btn.disabled = true;

    try {
      const pdf = buildPDF(data);
      const fileName = `${(data.profile.fullName || "resume").replace(/\s+/g, "_")}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error("PDF error:", err);
      alert("Failed to generate PDF:\n" + err.message);
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  };

  return (
    <div className="sticky top-0 z-10 mb-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm print:hidden">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-700">Accent</span>
        <input
          type="color"
          className="h-9 w-9 cursor-pointer rounded-xl border border-gray-300 p-1"
          value={data.meta.accent}
          onChange={(e) => set({ meta: { ...data.meta, accent: e.target.value } })}
          aria-label="Select resume accent color"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 transition"
          onClick={reset}
        >
          Reset
        </button>
        <button
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 transition"
          onClick={exportJson}
        >
          Export JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])}
        />
        <button
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 transition"
          onClick={() => fileInputRef.current?.click()}
        >
          Import JSON
        </button>
        <button
          className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition"
          onClick={savePDF}
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
}