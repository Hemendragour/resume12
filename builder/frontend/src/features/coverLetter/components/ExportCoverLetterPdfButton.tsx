import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

import Button from "../../../components/ui/Button";
import { useCoverLetterStore } from "../../../store/coverLetter.store";

export default function ExportCoverLetterPdfButton() {
  const coverLetter = useCoverLetterStore((state) => state.coverLetter);

  const handleExport = async () => {
    const element = document.getElementById("cover-letter-export");

    if (!element) {
      alert("Cover letter preview not found");
      return;
    }

    try {
      const A4_WIDTH = 210;
      const A4_HEIGHT = 297;

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve();
          });
        });
      });

      const links = Array.from(
        element.querySelectorAll("a[href]"),
      ) as HTMLAnchorElement[];

      const elementRect = element.getBoundingClientRect();

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        scrollX: 0,
        scrollY: 0,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const imageData = canvas.toDataURL("image/jpeg", 0.98);

      const imageWidth = A4_WIDTH;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;

      const scale = imageHeight > A4_HEIGHT ? A4_HEIGHT / imageHeight : 1;

      const finalWidth = imageWidth * scale;
      const finalHeight = imageHeight * scale;

      const x = (A4_WIDTH - finalWidth) / 2;
      const y = (A4_HEIGHT - finalHeight) / 2;

      pdf.addImage(
        imageData,
        "JPEG",
        x,
        y,
        finalWidth,
        finalHeight,
        undefined,
        "FAST",
      );

      const pixelToMm = finalWidth / element.offsetWidth;

      links.forEach((link) => {
        const href = link.href;
        if (!href) return;

        const rect = link.getBoundingClientRect();

        const relativeX = rect.left - elementRect.left;
        const relativeY = rect.top - elementRect.top;

        const linkX = x + relativeX * pixelToMm;
        const linkY = y + relativeY * pixelToMm;

        const linkWidth = rect.width * pixelToMm;
        const linkHeight = rect.height * pixelToMm;

        if (linkWidth <= 0 || linkHeight <= 0) return;
        if (linkX < 0 || linkY < 0 || linkX >= A4_WIDTH || linkY >= A4_HEIGHT)
          return;

        const safeWidth = Math.min(linkWidth, A4_WIDTH - linkX);
        const safeHeight = Math.min(linkHeight, A4_HEIGHT - linkY);

        if (safeWidth <= 0 || safeHeight <= 0) return;

        pdf.link(linkX, linkY, safeWidth, safeHeight, { url: href });
      });

      const fileName = coverLetter?.title
        ? coverLetter.title.replace(/\s+/g, "-").toLowerCase()
        : "cover-letter";

      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error("Cover letter PDF export error:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <Button type="button" onClick={handleExport}>
      Download PDF
    </Button>
  );
}
