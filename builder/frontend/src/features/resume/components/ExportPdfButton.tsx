import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

import Button from "../../../components/ui/Button";

export default function ExportPdfButton() {
  const handleExport = async () => {
    console.log("Export Clicked");

    const element = document.getElementById("resume-export");

    console.log("ELEMENT:", element);

    if (!element) {
      alert("resume-export not found");
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save("resume.pdf");
    } catch (err) {
      console.error("PDF Export Error:", err);
    }
  };

  return (
    <Button onClick={handleExport}>
      Download PDF
    </Button>
  );
}