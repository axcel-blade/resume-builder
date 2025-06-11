import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function GeneratePDF() {
    const handleDownload = async () => {
        const resume = document.getElementById("resume");
        const canvas = await html2canvas(resume);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "pt", "a4");
        pdf.addImage(imgData, "PNG", 0, 0, 595, 842);
        pdf.save("resume.pdf");
    };

    return (
        <button onClick={handleDownload} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Download PDF
        </button>
    );
}
