/* src/components/Toolbar.jsx */

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Toolbar({ data, set, previewRef }) {
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

  const savePDF = async (event) => {
    const btn = event.target;
    const originalText = btn.textContent;

    try {
      btn.textContent = "Generating PDF...";
      btn.disabled = true;

      // A4 dimensions
      const pageWidthMM = 210;
      const pageHeightMM = 297;
      const marginMM = 15;

      // Find the live content node rendered inside the A4 preview
      // This is the div with ref={contentRef} inside A4PaginatedPreview
      const liveContentNode = previewRef?.current;

      if (!liveContentNode) {
        throw new Error(
          "Could not find resume preview. Make sure the preview is visible on screen."
        );
      }

      // Capture the live DOM — same styles, same fonts, same layout as what you see
      const dpi = 192; // 2x for crisp output
      const scale = dpi / 96;

      const canvas = await html2canvas(liveContentNode, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        letterRendering: true,
        // Capture the full scrollHeight so we get all pages
        windowWidth: liveContentNode.scrollWidth,
        windowHeight: liveContentNode.scrollHeight,
        width: liveContentNode.scrollWidth,
        height: liveContentNode.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        ignoreElements: (el) => {
          // Skip the page-number badge and navigation controls
          return (
            el.classList?.contains("pointer-events-none") ||
            el.tagName === "BUTTON" ||
            el.dataset?.pdfIgnore === "true"
          );
        },
      });

      // Build PDF page by page
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const contentWidthMM = pageWidthMM - marginMM * 2;
      const contentHeightMM = pageHeightMM - marginMM * 2;
      const pixelsPerMM = dpi / 25.4;
      const contentHeightPx = contentHeightMM * pixelsPerMM;
      const canvasHeight = canvas.height;
      const canvasWidth = canvas.width;
      const totalPages = Math.ceil(canvasHeight / contentHeightPx);

      for (let pageNum = 0; pageNum < totalPages; pageNum++) {
        if (pageNum > 0) pdf.addPage();

        const sourceY = pageNum * contentHeightPx;
        const sliceHeight = Math.min(contentHeightPx, canvasHeight - sourceY);

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvasWidth;
        pageCanvas.height = sliceHeight;

        const ctx = pageCanvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvasWidth, sliceHeight);
        ctx.drawImage(canvas, 0, sourceY, canvasWidth, sliceHeight, 0, 0, canvasWidth, sliceHeight);

        const imgData = pageCanvas.toDataURL("image/png");
        const imgHeightMM = sliceHeight / pixelsPerMM;

        pdf.addImage(imgData, "PNG", marginMM, marginMM, contentWidthMM, imgHeightMM);
      }

      const fileName = `${(data.profile.fullName || "resume").replace(/\s+/g, "_")}.pdf`;
      pdf.save(fileName);

      btn.textContent = originalText;
      btn.disabled = false;
      alert(`Success! PDF saved.\n${totalPages} page(s) generated`);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert(`Failed to generate PDF:\n${error.message}`);
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
          aria-label="Reset resume to default content"
        >
          Reset
        </button>
        <button
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 transition"
          onClick={exportJson}
          aria-label="Export resume as JSON file"
        >
          Export JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])}
          aria-label="Import JSON resume file"
        />
        <button
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 transition"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Import resume from JSON file"
        >
          Import JSON
        </button>
        <button
          className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition"
          onClick={savePDF}
          aria-label="Export resume as PDF document"
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
}