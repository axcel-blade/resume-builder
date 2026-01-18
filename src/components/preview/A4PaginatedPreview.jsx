import React, { useState, useRef, useEffect } from "react";

export default function A4PaginatedPreview({ data, templateComponent: TemplateComponent }) {
  const [pages, setPages] = useState([]);
  const contentRef = useRef(null);

  // A4 Constants at 96 DPI
  const A4_WIDTH_PX = 794; // 210mm
  const A4_HEIGHT_PX = 1123; // 297mm
  const MARGIN_PX = 56; // 15mm
  const CONTENT_HEIGHT = A4_HEIGHT_PX - MARGIN_PX * 2;

  // Calculate pages when data changes
  useEffect(() => {
    // Delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!contentRef.current) {
        setPages([0]); // At least show one page
        return;
      }

      const totalHeight = contentRef.current.scrollHeight;
      const numPages = Math.ceil(totalHeight / CONTENT_HEIGHT);
      
      setPages(Array.from({ length: Math.max(1, numPages) }, (_, i) => i));
    }, 100);

    return () => clearTimeout(timer);
  }, [data, CONTENT_HEIGHT]);

  if (!TemplateComponent) {
    return <div className="text-center text-red-500 p-4">Template not found</div>;
  }

  return (
    <div className="space-y-6">
      {pages.map((pageNum) => (
        <div key={pageNum}>
          <A4Page
            pageNum={pageNum}
            data={data}
            TemplateComponent={TemplateComponent}
            contentRef={pageNum === 0 ? contentRef : null}
            isFirstPage={pageNum === 0}
            CONTENT_HEIGHT={CONTENT_HEIGHT}
          />
        </div>
      ))}
    </div>
  );
}

function A4Page({
  pageNum,
  data,
  TemplateComponent,
  contentRef,
  isFirstPage,
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
      className="mx-auto shadow-lg bg-white"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        position: "relative",
        borderRadius: "4px",
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
        {/* Page Number */}
        <div 
          className="absolute text-xs text-gray-400 pointer-events-none"
          style={{
            bottom: "8px",
            right: "8px",
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
          {/* Main Content Container */}
          <div
            style={{
              transform: `translateY(-${pageNum * CONTENT_HEIGHT}px)`,
              transition: "none",
              width: "100%",
            }}
          >
            <div
              ref={isFirstPage ? contentRef : null}
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