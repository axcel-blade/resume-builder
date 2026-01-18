import React, { useState, useRef, useEffect } from "react";

export default function A4PaginatedPreview({ data, templateComponent: TemplateComponent }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const contentRef = useRef(null);

  // A4 Constants at 96 DPI
  const A4_WIDTH_PX = 794; // 210mm
  const A4_HEIGHT_PX = 1123; // 297mm
  const MARGIN_PX = 56; // 15mm
  const CONTENT_HEIGHT = A4_HEIGHT_PX - MARGIN_PX * 2;

  // Calculate total pages when data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!contentRef.current) {
        setTotalPages(1);
        return;
      }

      const totalHeight = contentRef.current.scrollHeight;
      const numPages = Math.ceil(totalHeight / CONTENT_HEIGHT);
      setTotalPages(Math.max(1, numPages));
      setCurrentPage(0); // Reset to first page
    }, 100);

    return () => clearTimeout(timer);
  }, [data, CONTENT_HEIGHT]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setCurrentPage((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [totalPages]);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  if (!TemplateComponent) {
    return <div className="text-center text-red-500 p-4">Template not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Page Display */}
      <div className="w-full flex justify-center">
        <A4Page
          pageNum={currentPage}
          data={data}
          TemplateComponent={TemplateComponent}
          contentRef={contentRef}
          CONTENT_HEIGHT={CONTENT_HEIGHT}
        />
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
        {/* Previous Button */}
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition"
          title="Previous page (← Arrow)"
        >
          <span className="text-lg">←</span>
          <span className="text-sm font-medium">Previous</span>
        </button>

        {/* Page Counter */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
          <span className="text-sm font-semibold text-gray-700">
            Page <span className="text-sky-600">{currentPage + 1}</span> of <span className="text-sky-600">{totalPages}</span>
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition"
          title="Next page (→ Arrow)"
        >
          <span className="text-sm font-medium">Next</span>
          <span className="text-lg">→</span>
        </button>
      </div>

      {/* Keyboard Hint */}
      <div className="text-xs text-gray-400 text-center">
        Use arrow keys (← →) or buttons to navigate pages
      </div>
    </div>
  );
}

function A4Page({
  pageNum,
  data,
  TemplateComponent,
  contentRef,
  CONTENT_HEIGHT,
}) {
  // A4 Constants
  const A4_WIDTH_PX = 794;
  const A4_HEIGHT_PX = 1123;
  const MARGIN_PX = 56;

  if (!TemplateComponent) {
    return null;
  }

  return (
    <div
      className="shadow-lg bg-white rounded-lg overflow-hidden"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        position: "relative",
      }}
    >
      {/* A4 Page Container with Margins */}
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: `${MARGIN_PX}px`,
          boxSizing: "border-box",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Page Number Badge */}
        <div 
          className="absolute text-xs text-gray-400 pointer-events-none bg-gray-50 rounded px-2 py-1"
          style={{
            bottom: "8px",
            right: "8px",
            fontSize: "11px",
          }}
        >
          Page {pageNum + 1}
        </div>

        {/* Content Area */}
        <div
          style={{
            height: `${CONTENT_HEIGHT}px`,
            overflow: "hidden",
            position: "relative",
            width: "100%",
          }}
        >
          {/* Main Content Container - Translates to show correct page */}
          <div
            style={{
              transform: `translateY(-${pageNum * CONTENT_HEIGHT}px)`,
              transition: "none",
              width: "100%",
            }}
          >
            <div
              ref={contentRef}
              style={{
                width: "100%",
              }}
            >
              <TemplateComponent data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}