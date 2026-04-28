/* src/components/Toolbar.jsx */

import React, { useRef } from "react";
import jsPDF from "jspdf";
import {
  formatDateRange,
  sortByStartDesc,
  normalizeBullets,
} from "../utils/format";

// ─── Layout constants (all in mm) ───────────────────────────────────────────
// Bumped from 15/16 to 20mm so all four margins land in the community-required
// 0.75–1 inch range (20mm ≈ 0.787").
const PAGE_W    = 210;
const PAGE_H    = 297;
const ML        = 20;
const MR        = 20;
const MT        = 20;
const MB        = 20;
const CONTENT_W = PAGE_W - ML - MR;
const BULLET_INDENT = 6;
const BULLET_HANG   = 4;

// ─── Font sizes (pt) ────────────────────────────────────────────────────────
const FS = {
  name:        22,
  title:       11,
  contact:      9,
  sectionHead:  8.5,
  entryTitle:  10,
  entryMeta:    8.5,
  bullet:       9.5,
  summary:      9.5,
};

// ─── Community-approved section labels ──────────────────────────────────────
const HEADINGS = {
  summary:      "Summary",
  experience:   "Professional Experience",
  projects:     "Projects",
  education:    "Education",
  achievements: "Achievements and Awards",
  skills:       "Key Skills",
  references:   "References",
};

// ─── Helpers ────────────────────────────────────────────────────────────────

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

function drawBullets(pdf, bullets, y, { period = true } = {}) {
  if (!bullets?.length) return y;
  const items = normalizeBullets(bullets, { period });
  pdf.setFontSize(FS.bullet);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(50, 50, 50);
  items.forEach((b) => { y = drawBullet(pdf, b, y); });
  return y;
}

/**
 * Draw "Label  |  url" with the URL in accent colour + a clickable PDF link.
 */
function drawLinkRow(pdf, label, url, x, y, accentRgb, align = "left") {
  const [ar, ag, ab] = accentRgb;
  const sep    = "  |  ";
  const href   = url.startsWith("http") ? url : `https://${url}`;
  const lineH  = 4.2;
  const capH   = lineH;

  if (align === "center") {
    const fullLine  = `${label}${sep}${url}`;
    const fullW     = pdf.getTextWidth(fullLine);
    const labelSepW = pdf.getTextWidth(`${label}${sep}`);
    const urlW      = pdf.getTextWidth(url);
    const lineStartX = (PAGE_W - fullW) / 2;

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(80, 80, 80);
    pdf.text(fullLine, PAGE_W / 2, y, { align: "center" });

    pdf.setTextColor(ar, ag, ab);
    pdf.text(url, lineStartX + labelSepW, y);
    pdf.link(lineStartX + labelSepW, y - capH + 1, urlW, capH, { url: href });
  } else {
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(80, 80, 80);
    pdf.text(label, x, y);
    const labelW = pdf.getTextWidth(label);

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(80, 80, 80);
    pdf.text(sep, x + labelW, y);
    const sepW = pdf.getTextWidth(sep);

    pdf.setTextColor(ar, ag, ab);
    pdf.text(url, x + labelW + sepW, y);
    const urlW = pdf.getTextWidth(url);
    pdf.link(x + labelW + sepW, y - capH + 1, urlW, capH, { url: href });
  }

  return y + lineH;
}

// ─── Headers ─────────────────────────────────────────────────────────────────

function drawHeaderModern(pdf, data, y, accent) {
  const [ar, ag, ab] = hexToRgb(accent);
  const accentRgb = [ar, ag, ab];
  const p = data.profile;

  pdf.setFontSize(FS.name);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(ar, ag, ab);
  pdf.text(p.fullName || "", ML, y);
  y += 8;

  if (p.title) {
    pdf.setFontSize(FS.title);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(60, 60, 60);
    pdf.text(p.title, ML, y);
    y += 5.5;
  }

  pdf.setFontSize(FS.contact);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(80, 80, 80);
  const contact = [p.email, p.phone, p.location, p.website].filter(Boolean).join("   ");
  if (contact) { pdf.text(contact, ML, y); y += 4.5; }

  if (data.links?.length) {
    pdf.setFontSize(FS.contact);
    data.links.forEach((l) => {
      y = ensureSpace(pdf, y, 4.5);
      y = drawLinkRow(pdf, l.label, l.url, ML, y, accentRgb, "left");
    });
  }

  return y + 3;
}

function drawHeaderBasic(pdf, data, y, accent) {
  const [ar, ag, ab] = hexToRgb(accent);
  const accentRgb = [ar, ag, ab];
  const p = data.profile;
  const cx = PAGE_W / 2;

  pdf.setFontSize(FS.name);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(ar, ag, ab);
  pdf.text(p.fullName || "", cx, y, { align: "center" });
  y += 8;

  if (p.title) {
    pdf.setFontSize(FS.title);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(60, 60, 60);
    pdf.text(p.title, cx, y, { align: "center" });
    y += 5.5;
  }

  pdf.setFontSize(FS.contact);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(80, 80, 80);
  const contact = [p.email, p.phone, p.location, p.website].filter(Boolean).join("   |   ");
  if (contact) { pdf.text(contact, cx, y, { align: "center" }); y += 4.5; }

  if (data.links?.length) {
    pdf.setFontSize(FS.contact);
    data.links.forEach((l) => {
      y = ensureSpace(pdf, y, 4.5);
      y = drawLinkRow(pdf, l.label, l.url, ML, y, accentRgb, "center");
    });
  }

  return y + 3;
}

// ─── Body ───────────────────────────────────────────────────────────────────

function drawBody(pdf, data, y, accent) {
  // Sort the date-bearing sections reverse-chronologically.
  const experience = sortByStartDesc(data.experience || []);
  const projects   = sortByStartDesc(data.projects   || []);
  const education  = sortByStartDesc(data.education  || []);

  // SUMMARY
  if (data.profile?.summary) {
    y = ensureSpace(pdf, y, 14);
    y = drawSectionHead(pdf, HEADINGS.summary, y, accent);
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

  // PROFESSIONAL EXPERIENCE
  if (experience.length) {
    y = ensureSpace(pdf, y, 14);
    y = drawSectionHead(pdf, HEADINGS.experience, y, accent);
    experience.forEach((e) => {
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
        [formatDateRange(e.start, e.end), e.location].filter(Boolean).join("   |   "),
        ML, y
      );
      y += 4;
      y = drawBullets(pdf, e.bullets, y, { period: true });
      y += 3;
    });
  }

  // PROJECTS
  if (projects.length) {
    y = ensureSpace(pdf, y, 14);
    y = drawSectionHead(pdf, HEADINGS.projects, y, accent);
    projects.forEach((p) => {
      y = ensureSpace(pdf, y, 10);
      pdf.setFontSize(FS.entryTitle);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 30, 30);
      pdf.text(p.title || "", ML, y);
      y += 4.5;

      const range = formatDateRange(p.start, p.end);
      if (p.organization || range) {
        pdf.setFontSize(FS.entryMeta);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(120, 120, 120);
        pdf.text(
          [p.organization, range].filter(Boolean).join("   |   "),
          ML, y
        );
        y += 4;
      }
      y = drawBullets(pdf, p.bullets, y, { period: true });
      y += 3;
    });
  }

  // EDUCATION
  if (education.length) {
    y = ensureSpace(pdf, y, 14);
    y = drawSectionHead(pdf, HEADINGS.education, y, accent);
    education.forEach((e) => {
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

      const range = formatDateRange(e.start, e.end);
      if (range || e.location) {
        pdf.setFontSize(FS.entryMeta);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(120, 120, 120);
        pdf.text(
          [range, e.location].filter(Boolean).join("   |   "),
          ML, y
        );
        y += 4;
      }
      y = drawBullets(pdf, e.bullets, y, { period: true });
      y += 3;
    });
  }

  // ACHIEVEMENTS AND AWARDS
  if (data.achievements?.length) {
    y = ensureSpace(pdf, y, 14);
    y = drawSectionHead(pdf, HEADINGS.achievements, y, accent);
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
      y = drawBullets(pdf, a.bullets, y, { period: true });
      y += 3;
    });
  }

  // KEY SKILLS — period: false because skill rows are noun phrases
  if (data.skillGroups?.length) {
    y = ensureSpace(pdf, y, 14);
    y = drawSectionHead(pdf, HEADINGS.skills, y, accent);
    data.skillGroups.forEach((g) => {
      y = ensureSpace(pdf, y, 8);
      pdf.setFontSize(FS.entryTitle);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 30, 30);
      pdf.text(g.title || "", ML, y);
      y += 4.5;
      y = drawBullets(pdf, g.bullets, y, { period: false });
      y += 3;
    });
  }

  // REFERENCES — always emitted; falls back to "available on request"
  y = ensureSpace(pdf, y, 14);
  y = drawSectionHead(pdf, HEADINGS.references, y, accent);
  const refs = (data.references || []).filter((r) => r && (r.name || r.title));

  if (!refs.length) {
    pdf.setFontSize(FS.bullet);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(50, 50, 50);
    pdf.text("References available on request.", ML, y);
    y += 5;
  } else {
    refs.forEach((r) => {
      y = ensureSpace(pdf, y, 12);
      pdf.setFontSize(FS.entryTitle);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 30, 30);
      pdf.text(r.name || "", ML, y);
      if (r.title) {
        const nw = pdf.getTextWidth(r.name || "");
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(90, 90, 90);
        pdf.text(` | ${r.title}`, ML + nw, y);
      }
      y += 4.5;

      if (r.organization) {
        pdf.setFontSize(FS.entryMeta);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(120, 120, 120);
        pdf.text(r.organization, ML, y);
        y += 4;
      }

      const contact = [r.email, r.phone].filter(Boolean).join("   |   ");
      if (contact) {
        pdf.setFontSize(FS.bullet);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(50, 50, 50);
        pdf.text(contact, ML, y);
        y += 4.5;
      }
      y += 2;
    });
  }

  return y;
}

// ─── Main builder ───────────────────────────────────────────────────────────

function buildPDF(data) {
  const pdf      = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const accent   = data.meta?.accent || "#0ea5e9";
  const template = data.meta?.template || "modern";

  let y = MT;
  y = template === "basic"
    ? drawHeaderBasic(pdf, data, y, accent)
    : drawHeaderModern(pdf, data, y, accent);

  drawBody(pdf, data, y, accent);
  return pdf;
}

// ─── Component ──────────────────────────────────────────────────────────────

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
      catch (err) { alert("Invalid JSON file: " + err.message); }
    };
    reader.readAsText(file);
  };

  const reset = () => {
    if (confirm("Reset to starter content?")) window.location.reload();
  };

  const savePDF = (event) => {
    const btn = event.target;
    const orig = btn.textContent;
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
      btn.textContent = orig;
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