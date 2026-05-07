/* src/apps/cover-letter/services/exportCoverLetterPdf.js */

import jsPDF from "jspdf";

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 20;
const CONTENT_W = PAGE_W - MARGIN * 2;
const LINE_HEIGHT = 5.6;
const BLOCK_GAP = 6.2;

const toSafeFileName = (value) => {
  const cleaned = value.trim().replace(/\s+/g, "_");
  return cleaned.length > 0 ? cleaned : "cover_letter";
};

export function exportCoverLetterPdf({ letter, fullName }) {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const rawLines = letter.split("\n");
  let y = MARGIN;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);

  rawLines.forEach((line) => {
    if (!line.trim()) {
      y += BLOCK_GAP;
      if (y > PAGE_H - MARGIN) {
        pdf.addPage();
        y = MARGIN;
      }
      return;
    }

    const wrappedLines = pdf.splitTextToSize(line, CONTENT_W);
    wrappedLines.forEach((wrappedLine) => {
      if (y > PAGE_H - MARGIN) {
        pdf.addPage();
        y = MARGIN;
      }
      pdf.text(wrappedLine, MARGIN, y);
      y += LINE_HEIGHT;
    });
  });

  pdf.save(`${toSafeFileName(fullName)}_cover_letter.pdf`);
}
