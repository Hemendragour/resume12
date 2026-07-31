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
      // Collect all links BEFORE capturing canvas (positions still valid in DOM)
      const links = Array.from(
        element.querySelectorAll("a[href]"),
      ) as HTMLAnchorElement[];

      const elementRect = element.getBoundingClientRect();

      console.log(
        "Found links:",
        links.length,
        links.map((l) => l.href),
      );

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

      // TEMPORARY DEBUG TEST
      pdf.link(10, 10, 190, 270, {
        url: "https://www.google.com",
      });

      // Overlay clickable links at their real positions
      const scaleFactor = pdfWidth / element.offsetWidth;

      console.log(
        "scaleFactor:",
        scaleFactor,
        "offsetWidth:",
        element.offsetWidth,
      );

      links.forEach((linkEl) => {
        const rect = linkEl.getBoundingClientRect();

        const x = (rect.left - elementRect.left) * scaleFactor;
        const y = (rect.top - elementRect.top) * scaleFactor;
        const w = rect.width * scaleFactor;
        const h = rect.height * scaleFactor;

        console.log("Link overlay:", linkEl.href, { x, y, w, h });

        pdf.link(x, y, w, h, { url: linkEl.href });
      });

      pdf.save("resume.pdf");
    } catch (err) {
      console.error("PDF Export Error:", err);
    }
  };

  return <Button onClick={handleExport}>Download PDF</Button>;
}
