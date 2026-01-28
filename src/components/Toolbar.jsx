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

      const pageWidthMM = 210;
      const pageHeightMM = 297;
      const marginMM = 15;
      const dpi = 96;
      const pixelsPerMM = dpi / 25.4;

      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.width = pageWidthMM + "mm";
      tempDiv.style.padding = marginMM + "mm";
      tempDiv.style.boxSizing = "border-box";
      tempDiv.style.backgroundColor = "#ffffff";
      tempDiv.style.fontFamily = "system-ui, -apple-system, sans-serif";
      tempDiv.style.lineHeight = "1.5";
      tempDiv.style.color = "#000000";

      const { createRoot } = await import("react-dom/client");
      const root = createRoot(tempDiv);
      root.render(React.createElement(TemplateComponent, { data }));
      document.body.appendChild(tempDiv);

      await new Promise((resolve) => {
        setTimeout(() => {
          tempDiv.offsetHeight;
          resolve();
        }, 800);
      });

      const contentElement = tempDiv.querySelector("div");
      if (!contentElement) {
        throw new Error("Template failed to render");
      }

      const canvas = await html2canvas(contentElement || tempDiv, {
        allowTaint: true,
        useCORS: true,
        scale: 2,
        logging: false,
        backgroundColor: "#ffffff",
        windowHeight: tempDiv.scrollHeight,
        windowWidth: pageWidthMM * pixelsPerMM * 2,
      });

      root.unmount();
      if (tempDiv.parentNode) {
        document.body.removeChild(tempDiv);
      }

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
        precision: 16,
      });

      const contentAreaHeight = pageHeightMM - marginMM * 2;
      const contentHeightPx = contentAreaHeight * pixelsPerMM * 2;
      const contentWidthPx = (pageWidthMM - marginMM * 2) * pixelsPerMM * 2;

      const totalPages = Math.ceil(canvas.height / contentHeightPx);

      for (let pageNum = 0; pageNum < totalPages; pageNum++) {
        if (pageNum > 0) {
          pdf.addPage();
        }

        const sourceY = pageNum * contentHeightPx;
        const remainingHeight = canvas.height - sourceY;
        const sliceHeight = Math.min(contentHeightPx, remainingHeight);

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = contentWidthPx;
        pageCanvas.height = sliceHeight;

        const ctx = pageCanvas.getContext("2d");
        if (!ctx) {
          throw new Error("Failed to get canvas context");
        }

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

        const pageImgData = pageCanvas.toDataURL("image/png");
        const displayHeightMM = (sliceHeight / pixelsPerMM) / 2;

        pdf.addImage(
          pageImgData,
          "PNG",
          marginMM,
          marginMM,
          pageWidthMM - marginMM * 2,
          displayHeightMM
        );
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