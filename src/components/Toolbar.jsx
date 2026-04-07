/* src/components/Toolbar.jsx */

import React, { useRef } from "react";
import jsPDF from "jspdf";

// ─── Layout constants (all in mm) ───────────────────────────────────────────
const PAGE_W  = 210;
const PAGE_H  = 297;
const ML      = 15;
const MR      = 15;
const MT      = 16;
const MB      = 16;
const CONTENT_W = PAGE_W - ML - MR;
const BULLET_INDENT = 6;
const BULLET_HANG   = 4;

// ─── Font sizes (pt) ────────────────────────────────────────────────────────
const FS = {
  name:       22,
  title:      11,
  contact:     9,
  sectionHead: 8.5,
  entryTitle: 10,
  entryMeta:   8.5,
  bullet:      9.5,
  summary:     9.5,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

function ensureSpace(pdf, y, neededMM) {
  if (y + neededMM > PAGE_H - MB) {
    pdf.addPage();
    return MT;
  }
  return y;
}

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

function drawBullet(pdf, text, y) {
  const bulletX = ML + BULLET_INDENT;
  const textX   = bulletX + BULLET_HANG;
  const wrapW   = CONTENT_W - BULLET_INDENT - BULLET_HANG;
  const lineH   = 4.2;
  const lines   = pdf.splitTextToSize(text, wrapW);

  y = ensureSpace(pdf, y, lines.length * lineH + 1);
  lines.forEach((line, i) => {
    if (i === 0) pdf.text("\u2022", bulletX, y);
    pdf.text(line, textX, y);
    y += lineH;
  });
  return y;
}

function drawBullets(pdf, bullets, y) {
  if (!bullets?.length) return y;
  pdf.setFontSize(FS.bullet);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(50, 50, 50);
  bullets.forEach((b) => { y = drawBullet(pdf, b, y); });
  return y;
}

// ─── Header renderers (the only difference between Modern and Basic) ─────────

function drawHeaderModern(pdf, data, y, accent) {
  const [ar, ag, ab] = hexToRgb(accent);
  const p = data.profile;

  // Name — left-aligned
  pdf.setFontSize(FS.name);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(ar, ag, ab);
  pdf.text(p.fullName || "", ML, y);
  y += 8;

  // Title
  if (p.title) {
    pdf.setFontSize(FS.title);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(60, 60, 60);
    pdf.text(p.title, ML, y);
    y += 5.5;
  }

  // Contact
  pdf.setFontSize(FS.contact);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(80, 80, 80);
  const contact = [p.email, p.phone, p.location, p.website].filter(Boolean).join("   ");
  if (contact) { pdf.text(contact, ML, y); y += 4.5; }

  // Links
  if (data.links?.length) {
    pdf.setFontSize(FS.contact);
    data.links.forEach((l) => {
      y = ensureSpace(pdf, y, 4.5);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(80, 80, 80);
      pdf.text(l.label, ML, y);
      const lw = pdf.getTextWidth(l.label);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(ar, ag, ab);
      pdf.text(`  |  ${l.url}`, ML + lw, y);
      y += 4.2;
    });
  }

  return y + 3;
}

function drawHeaderBasic(pdf, data, y, accent) {
  const [ar, ag, ab] = hexToRgb(accent);
  const p = data.profile;
  const cx = PAGE_W / 2; // center x

  // Name — centered
  pdf.setFontSize(FS.name);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(ar, ag, ab);
  pdf.text(p.fullName || "", cx, y, { align: "center" });
  y += 8;

  // Title — centered
  if (p.title) {
    pdf.setFontSize(FS.title);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(60, 60, 60);
    pdf.text(p.title, cx, y, { align: "center" });
    y += 5.5;
  }

  // Contact — centered
  pdf.setFontSize(FS.contact);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(80, 80, 80);
  const contact = [p.email, p.phone, p.location, p.website].filter(Boolean).join("   |   ");
  if (contact) { pdf.text(contact, cx, y, { align: "center" }); y += 4.5; }

  // Links — centered
  if (data.links?.length) {
    pdf.setFontSize(FS.contact);
    data.links.forEach((l) => {
      y = ensureSpace(pdf, y, 4.5);
      const linkLine = `${l.label}  |  ${l.url}`;
      // label part in gray bold, url in accent — draw centered as one line
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(80, 80, 80);
      pdf.text(linkLine, cx, y, { align: "center" });
      y += 4.2;
    });
  }

  // Divider under header
  y += 2;
  pdf.setDrawColor(...hexToRgb(accent));
  pdf.setLineWidth(0.3);
  pdf.line(ML, y, ML + CONTENT_W, y);
  y += 5;

  return y;
}

// ─── Shared body sections ────────────────────────────────────────────────────

function drawBody(pdf, data, y, accent) {

  // SUMMARY
  if (data.profile?.summary) {
    y = ensureSpace(pdf, y, 14);
    y = drawSectionHead(pdf, "Summary", y, accent);
    pdf.setFontSize(FS.summary);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(50, 50, 50);
    const lines = pdf.splitTextToSize(data.profile.summary, CONTENT_W);
    lines.forEach((line) => {
      y = ensureSpace(pdf, y, 5);
      pdf.text(line, ML, y);
      y += 4.5;
    });
    y += 3;
  }

  // EXPERIENCE
  if (data.experience?.length) {
    y = ensureSpace(pdf, y, 14);
    y = drawSectionHead(pdf, "Experience", y, accent);
    data.experience.forEach((e) => {
      y = ensureSpace(pdf, y, 10);
      pdf.setFontSize(FS.entryTitle);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 30, 30);
      pdf.text(e.role || "", ML, y);
      if (e.company) {
        const rw = pdf.getTextWidth(e.role || "");
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(90, 90, 90);
        pdf.text(` | ${e.company}`, ML + rw, y);
      }
      y += 4.5;
      pdf.setFontSize(FS.entryMeta);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(120, 120, 120);
      pdf.text(
        [`${e.start} – ${e.end || "Present"}`, e.location].filter(Boolean).join("   |   "),
        ML, y
      );
      y += 4;
      y = drawBullets(pdf, e.bullets, y);
      y += 3;
    });
  }

  // PROJECTS
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
        pdf.text(
          [p.organization, `${p.start} – ${p.end}`].filter(Boolean).join("   |   "),
          ML, y
        );
        y += 4;
      }
      y = drawBullets(pdf, p.bullets, y);
      y += 3;
    });
  }

  // EDUCATION
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
        pdf.text(
          [`${e.start} – ${e.end}`, e.location].filter(Boolean).join("   |   "),
          ML, y
        );
        y += 4;
      }
      y = drawBullets(pdf, e.bullets, y);
      y += 3;
    });
  }

  // ACHIEVEMENTS
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
      y = drawBullets(pdf, a.bullets, y);
      y += 3;
    });
  }

  // SKILLS
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
      y = drawBullets(pdf, g.bullets, y);
      y += 3;
    });
  }

  return y;
}

// ─── Main builder ─────────────────────────────────────────────────────────────

function buildPDF(data) {
  const pdf    = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const accent = data.meta?.accent || "#0ea5e9";
  const template = data.meta?.template || "modern";

  let y = MT;

  // Draw template-specific header
  if (template === "basic") {
    y = drawHeaderBasic(pdf, data, y, accent);
  } else {
    y = drawHeaderModern(pdf, data, y, accent);
  }

  // Draw shared body
  drawBody(pdf, data, y, accent);

  return pdf;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Toolbar({ data, set }) {
  const fileInputRef = useRef(null);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `${(data.profile.fullName || "resume").replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try { set(JSON.parse(e.target.result)); }
      catch (error) { alert("Invalid JSON file: " + error.message); }
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
      buildPDF(data).save(
        `${(data.profile.fullName || "resume").replace(/\s+/g, "_")}.pdf`
      );
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
        <button className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 transition" onClick={reset}>Reset</button>
        <button className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 transition" onClick={exportJson}>Export JSON</button>
        <input ref={fileInputRef} type="file" accept="application/json" className="hidden"
          onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} />
        <button className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 transition"
          onClick={() => fileInputRef.current?.click()}>Import JSON</button>
        <button className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition"
          onClick={savePDF}>Save as PDF</button>
      </div>
    </div>
  );
}