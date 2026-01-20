import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TemplateModern from "./TemplateModern";
import TemplateBasic from "./TemplateBasic";
import TemplateSidebar from "./TemplateSidebar";

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

      // Get the appropriate template component
      let TemplateComponent;
      const template = data.meta?.template || "modern";
      
      if (template === "modern") {
        TemplateComponent = TemplateModern;
      } else if (template === "basic") {
        TemplateComponent = TemplateBasic;
      } else if (template === "sidebar") {
        TemplateComponent = TemplateSidebar;
      } else {
        TemplateComponent = TemplateModern;
      }

      // PDF Constants
      const pageWidthMM = 210;
      const pageHeightMM = 297;
      const isSidebar = (data.meta?.template || "modern") === "sidebar";
      const marginMM = isSidebar ? 0 : 15;
      const dpi = 96;
      const pixelsPerMM = dpi / 25.4;

      // Create a temporary container with A4 dimensions
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.width = pageWidthMM + "mm";
      tempDiv.style.padding = marginMM > 0 ? marginMM + "mm" : "0";
      tempDiv.style.boxSizing = "border-box";
      tempDiv.style.backgroundColor = "#ffffff";
      tempDiv.style.fontFamily = "system-ui, -apple-system, sans-serif";
      tempDiv.style.lineHeight = "1.5";
      tempDiv.style.color = "#000000";

      // Import React DOM for server rendering
      const { createRoot } = await import("react-dom/client");
      const root = createRoot(tempDiv);
      
      // Render template
      root.render(React.createElement(TemplateComponent, { data }));
      document.body.appendChild(tempDiv);

      // Wait for rendering and DOM settlement
      await new Promise((resolve) => {
        setTimeout(() => {
          // Force a reflow to ensure all content is rendered
          tempDiv.offsetHeight;
          resolve();
        }, 800);
      });

      const contentElement = tempDiv.querySelector("div");
      if (!contentElement) {
        throw new Error("Template failed to render");
      }

      // Convert to canvas with better settings
      const canvas = await html2canvas(contentElement || tempDiv, {
        allowTaint: true,
        useCORS: true,
        scale: 2,
        logging: false,
        backgroundColor: "#ffffff",
        windowHeight: tempDiv.scrollHeight,
        windowWidth: pageWidthMM * pixelsPerMM * 2,
        ignoreElements: (element) => {
          // Ignore hidden or non-rendering elements
          return element.style.display === "none" || 
                 element.style.visibility === "hidden";
        },
      });

      // Cleanup
      root.unmount();
      if (tempDiv.parentNode) {
        document.body.removeChild(tempDiv);
      }

      // Create PDF with proper settings
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
        precision: 16,
      });

      // Calculate dimensions
      const contentAreaHeight = pageHeightMM - marginMM * 2;
      const contentHeightPx = contentAreaHeight * pixelsPerMM * 2;
      const contentWidthPx = (pageWidthMM - marginMM * 2) * pixelsPerMM * 2;

      // Calculate total pages
      const totalPages = Math.ceil(canvas.height / contentHeightPx);

      console.log(`Generating PDF: ${totalPages} pages from ${canvas.height}px canvas`);

      // Add each page to PDF
      for (let pageNum = 0; pageNum < totalPages; pageNum++) {
        if (pageNum > 0) {
          pdf.addPage();
        }

        const sourceY = pageNum * contentHeightPx;
        const remainingHeight = canvas.height - sourceY;
        const sliceHeight = Math.min(contentHeightPx, remainingHeight);

        // Create a canvas for this page
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = contentWidthPx;
        pageCanvas.height = sliceHeight;

        const ctx = pageCanvas.getContext("2d");
        if (!ctx) {
          throw new Error("Failed to get canvas context");
        }

        // Draw the slice of the full canvas onto the page canvas
        ctx.drawImage(
          canvas,
          0,
          sourceY,
          contentWidthPx,
          sliceHeight,
          0,
          0,
          contentWidthPx,
          sliceHeight
        );

        // Convert page canvas to image
        const pageImgData = pageCanvas.toDataURL("image/png");
        const displayHeightMM = (sliceHeight / pixelsPerMM) / 2;

        // Add image to PDF page
        pdf.addImage(
          pageImgData,
          "PNG",
          marginMM,
          marginMM,
          pageWidthMM - marginMM * 2,
          displayHeightMM
        );
      }

      // Save the PDF
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