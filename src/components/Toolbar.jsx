import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
      } catch {
        alert("Invalid JSON file");
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

      // Create a temporary container with A4 dimensions and margins
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.width = "210mm"; // A4 width
      tempDiv.style.padding = "15mm"; // 15mm margins
      tempDiv.style.boxSizing = "border-box";
      tempDiv.style.backgroundColor = "#ffffff";

      // Get all templates and render the active one
      const templateDiv = document.querySelector('[id$="template"]');
      if (!templateDiv) {
        // Fallback: create a minimal resume from data
        tempDiv.innerHTML = `
          <div style="font-family: sans-serif; font-size: 14px; line-height: 1.5;">
            <h1 style="margin: 0 0 10px 0; font-size: 24px;">${data.profile.fullName}</h1>
            <p style="margin: 0 0 15px 0; color: #666;">${data.profile.email} • ${data.profile.phone} • ${data.profile.location}</p>
            <p style="margin: 0 0 15px 0; line-height: 1.6;">${data.profile.summary}</p>
          </div>
        `;
      } else {
        tempDiv.innerHTML = templateDiv.innerHTML;
      }

      document.body.appendChild(tempDiv);

      // Convert to canvas
      const dpi = 96;
      const pixelsPerMM = dpi / 25.4;
      const pageWidthMM = 210;
      const pageHeightMM = 297;
      const marginMM = 15;

      const canvas = await html2canvas(tempDiv, {
        allowTaint: true,
        useCORS: true,
        scale: 2,
        logging: false,
        backgroundColor: "#ffffff",
        windowHeight: tempDiv.scrollHeight,
        windowWidth: pageWidthMM * pixelsPerMM * 2,
      });

      document.body.removeChild(tempDiv);

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      // Calculate dimensions
      const contentHeightPx = (pageHeightMM - marginMM * 2) * pixelsPerMM * 2;
      const contentWidthPx = (pageWidthMM - marginMM * 2) * pixelsPerMM * 2;
      const totalPages = Math.ceil(canvas.height / contentHeightPx);

      // Add pages
      for (let pageNum = 0; pageNum < totalPages; pageNum++) {
        if (pageNum > 0) {
          pdf.addPage();
        }

        // Calculate the slice of canvas for this page
        const sourceY = pageNum * contentHeightPx;
        const sliceHeight = Math.min(contentHeightPx, canvas.height - sourceY);

        // Create a canvas for this page slice
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = contentWidthPx;
        pageCanvas.height = sliceHeight;

        const ctx = pageCanvas.getContext("2d");
        ctx.drawImage(
          canvas,
          0, sourceY,
          contentWidthPx, sliceHeight,
          0, 0,
          contentWidthPx, sliceHeight
        );

        // Convert to image
        const imgData = pageCanvas.toDataURL("image/png");

        // Calculate display height
        const displayHeight = (sliceHeight / pixelsPerMM) / 2;

        // Add to PDF with margins
        pdf.addImage(
          imgData,
          "PNG",
          marginMM,
          marginMM,
          pageWidthMM - marginMM * 2,
          displayHeight
        );
      }

      // Download PDF
      const fileName = `${(data.profile.fullName || "resume").replace(/\s+/g, "_")}.pdf`;
      pdf.save(fileName);

      btn.textContent = originalText;
      btn.disabled = false;
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
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
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
          onClick={reset}
        >
          Reset
        </button>
        <button
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
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
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
          onClick={() => fileInputRef.current?.click()}
        >
          Import JSON
        </button>
        <button
          className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          onClick={savePDF}
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
}