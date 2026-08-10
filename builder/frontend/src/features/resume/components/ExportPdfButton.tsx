import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

import Button from "../../../components/ui/Button";

export default function ExportPdfButton() {
  const handleExport = async () => {
    console.log("Export Clicked");

    const element = document.getElementById("resume-export");

    if (!element) {
      alert("resume-export not found");
      return;
    }

    try {
      // Save original styles
      // const originalHeight = element.style.height;
      // const originalOverflow = element.style.overflow;
      // const originalMaxHeight = element.style.maxHeight;

      // // Allow complete resume height
      // element.style.height = "auto";
      // element.style.maxHeight = "none";
      // element.style.overflow = "visible";

      // Allow layout to settle
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve();
          });
        });
      });

      /*
       * Capture complete resume
       */
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,

        width: element.scrollWidth,
        height: element.scrollHeight,

        windowWidth: Math.max(element.scrollWidth, window.innerWidth),

        windowHeight: Math.max(element.scrollHeight, window.innerHeight),

        scrollX: 0,
        scrollY: 0,
      });

      console.log("Canvas size:", {
        width: canvas.width,
        height: canvas.height,
      });

      /*
       * A4 PDF
       */
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const A4_WIDTH = 210;
      const A4_HEIGHT = 297;

      /*
       * Calculate image height while keeping
       * original aspect ratio.
       */
      const imageHeight = (canvas.height * A4_WIDTH) / canvas.width;

      /*
       * Fit complete resume inside ONE A4 page.
       *
       * If resume is taller than 297mm,
       * scale it down proportionally.
       */
      const scale = imageHeight > A4_HEIGHT ? A4_HEIGHT / imageHeight : 1;

      const finalWidth = A4_WIDTH * scale;

      const finalHeight = imageHeight * scale;

      /*
       * Center horizontally.
       */
      const x = (A4_WIDTH - finalWidth) / 2;

      /*
       * Center vertically.
       */
      const y = (A4_HEIGHT - finalHeight) / 2;

      console.log("PDF scaling:", {
        originalHeight: imageHeight,
        scale,
        finalWidth,
        finalHeight,
        x,
        y,
      });

      /*
       * Add COMPLETE resume image
       * scaled to fit inside A4.
       */
      const imgData = canvas.toDataURL("image/jpeg", 0.98);

      pdf.addImage(
        imgData,
        "JPEG",
        x,
        y,
        finalWidth,
        finalHeight,
        undefined,
        "FAST",
      );

      /*
       * Add clickable links.
       */
      const links = Array.from(
        element.querySelectorAll("a[href]"),
      ) as HTMLAnchorElement[];

      const elementRect = element.getBoundingClientRect();

      const pixelToMm = finalWidth / element.offsetWidth;

      links.forEach((linkEl) => {
        const rect = linkEl.getBoundingClientRect();

        const relativeX = rect.left - elementRect.left;

        const relativeY = rect.top - elementRect.top;

        const linkX = x + relativeX * pixelToMm;

        const linkY = y + relativeY * pixelToMm;

        const linkWidth = rect.width * pixelToMm;

        const linkHeight = rect.height * pixelToMm;

        /*
         * Only add valid links.
         */
        if (linkX >= 0 && linkY >= 0 && linkX < A4_WIDTH && linkY < A4_HEIGHT) {
          pdf.link(
            linkX,
            linkY,
            Math.min(linkWidth, A4_WIDTH - linkX),
            Math.min(linkHeight, A4_HEIGHT - linkY),
            {
              url: linkEl.href,
            },
          );
        }
      });

      /*
       * Save ONE PAGE PDF.
       */
      pdf.save("resume.pdf");

      console.log("PDF exported successfully as ONE A4 page.");

      /*
       * Restore original styles.
       */
      // element.style.height = originalHeight;

      // element.style.maxHeight = originalMaxHeight;

      // element.style.overflow = originalOverflow;
    } catch (error) {
      console.error("PDF Export Error:", error);

      alert("Failed to generate PDF. Please try again.");
    }
  };

  return <Button onClick={handleExport}>Download PDF</Button>;
}
