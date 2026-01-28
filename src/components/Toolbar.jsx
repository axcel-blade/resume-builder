import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TemplateModern from "./TemplateModern";
import TemplateBasic from "./TemplateBasic";

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

  const savePDF = async (event) => {
    const btn = event.target;
    const originalText = btn.textContent;

    try {
      btn.textContent = "Generating PDF...";
      btn.disabled = true;

      const template = data.meta?.template || "modern";
      const TemplateComponent = template === "basic" ? TemplateBasic : TemplateModern;

      // A4 dimensions in mm
      const pageWidthMM = 210;
      const pageHeightMM = 297;
      const marginTopMM = 15;
      const marginBottomMM = 15;
      const marginLeftMM = 15;
      const marginRightMM = 15;

      // Create container
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.width = (pageWidthMM - marginLeftMM - marginRightMM) + "mm";
      tempDiv.style.padding = "0";
      tempDiv.style.margin = "0";
      tempDiv.style.boxSizing = "border-box";
      tempDiv.style.backgroundColor = "#ffffff";
      tempDiv.style.fontFamily = "Arial, sans-serif";
      tempDiv.style.lineHeight = "1.4";
      tempDiv.style.color = "#000000";
      tempDiv.style.fontSize = "10pt";
      tempDiv.style.overflow = "visible";
      tempDiv.style.pageBreakInside = "avoid";

      const { createRoot } = await import("react-dom/client");
      const root = createRoot(tempDiv);
      root.render(React.createElement(TemplateComponent, { data }));
      document.body.appendChild(tempDiv);

      // Wait for rendering
      await new Promise((resolve) => {
        setTimeout(() => {
          tempDiv.offsetHeight;
          resolve();
        }, 1000);
      });

      // Get actual content height
      const contentHeight = tempDiv.scrollHeight;
      
      // Convert to canvas with high DPI
      const dpi = 300;
      const scale = dpi / 96;
      
      const canvas = await html2canvas(tempDiv, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        letterRendering: true,
        windowHeight: contentHeight,
        windowWidth: tempDiv.offsetWidth,
      });

      root.unmount();
      if (tempDiv.parentNode) {
        document.body.removeChild(tempDiv);
      }

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: false,
      });

      const pageContentWidth = pageWidthMM - marginLeftMM - marginRightMM;
      const pageContentHeight = pageHeightMM - marginTopMM - marginBottomMM;

      // Canvas dimensions
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Calculate pixels per mm at the scale we used
      const pixelsPerMM = (dpi / 25.4);
      
      // Height of content area in pixels
      const contentHeightPixels = pageContentHeight * pixelsPerMM;
      
      // Calculate number of pages needed
      const totalPages = Math.ceil(canvasHeight / contentHeightPixels);

      console.log(`PDF Info:
        Canvas size: ${canvasWidth}x${canvasHeight}px
        Page content area: ${pageContentWidth}x${pageContentHeight}mm
        Content height pixels: ${contentHeightPixels}px
        Total pages: ${totalPages}`);

      // Add each page to PDF
      for (let pageNum = 0; pageNum < totalPages; pageNum++) {
        if (pageNum > 0) {
          pdf.addPage();
        }

        // Calculate what portion of the canvas to use for this page
        const sourceYPixels = pageNum * contentHeightPixels;
        const remainingHeightPixels = canvasHeight - sourceYPixels;
        const pageHeightPixels = Math.min(contentHeightPixels, remainingHeightPixels);

        // Create image for this page section
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvasWidth;
        pageCanvas.height = pageHeightPixels;

        const ctx = pageCanvas.getContext("2d");
        if (!ctx) {
          throw new Error("Failed to get canvas context");
        }

        // Draw the slice
        ctx.drawImage(
          canvas,
          0,
          sourceYPixels,
          canvasWidth,
          pageHeightPixels,
          0,
          0,
          canvasWidth,
          pageHeightPixels
        );

        // Convert to image data
        const imgData = pageCanvas.toDataURL("image/png");

        // Add to PDF with proper sizing
        const imgWidthMM = pageContentWidth;
        const imgHeightMM = (pageHeightPixels / pixelsPerMM);

        pdf.addImage(
          imgData,
          "PNG",
          marginLeftMM,
          marginTopMM,
          imgWidthMM,
          imgHeightMM
        );
      }

      // Save PDF
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