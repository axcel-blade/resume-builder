import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Toolbar({ data, set, onPrint, printContent }) {
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
    const element = document.getElementById("print-content");
    if (!element) {
      alert("Content not found. Please try again.");
      return;
    }

    try {
      // Show loading message
      const btn = event.target;
      const originalText = btn.textContent;
      btn.textContent = "Generating PDF...";
      btn.disabled = true;

      // Create a temporary container to measure content
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.width = "210mm"; // A4 width
      tempDiv.innerHTML = element.innerHTML;
      document.body.appendChild(tempDiv);

      // Convert HTML to canvas with proper dimensions
      const canvas = await html2canvas(tempDiv, {
        allowTaint: true,
        useCORS: true,
        scale: 2,
        logging: false,
        backgroundColor: "#ffffff",
        windowHeight: tempDiv.scrollHeight,
        windowWidth: 794, // A4 width in pixels at 96 DPI
      });

      // Remove temp div
      document.body.removeChild(tempDiv);

      // Get image data
      const imgData = canvas.toDataURL("image/png");
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add remaining pages
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download PDF
      const fileName = `${(data.profile.fullName || "resume").replace(/\s+/g, "_")}.pdf`;
      pdf.save(fileName);

      // Reset button
      btn.textContent = originalText;
      btn.disabled = false;
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
      // Reset button on error
      const btn = event.target;
      btn.textContent = "Save as PDF";
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