// import html2canvas from "html2canvas-pro";
// import jsPDF from "jspdf";

// import Button from "../../../components/ui/Button";

// export default function ExportPdfButton() {
//   const handleExport = async () => {
//     console.log("Export Clicked");

//     const element = document.getElementById("resume-export");

//     if (!element) {
//       alert("resume-export not found");
//       return;
//     }

//     try {
//       // Save original styles
//       // const originalHeight = element.style.height;
//       // const originalOverflow = element.style.overflow;
//       // const originalMaxHeight = element.style.maxHeight;

//       // // Allow complete resume height
//       // element.style.height = "auto";
//       // element.style.maxHeight = "none";
//       // element.style.overflow = "visible";

//       // Allow layout to settle
//       await new Promise<void>((resolve) => {
//         requestAnimationFrame(() => {
//           requestAnimationFrame(() => {
//             resolve();
//           });
//         });
//       });

//       /*
//        * Capture complete resume
//        */
//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         backgroundColor: "#ffffff",
//         logging: false,

//         width: element.scrollWidth,
//         height: element.scrollHeight,

//         windowWidth: Math.max(element.scrollWidth, window.innerWidth),

//         windowHeight: Math.max(element.scrollHeight, window.innerHeight),

//         scrollX: 0,
//         scrollY: 0,
//       });

//       console.log("Canvas size:", {
//         width: canvas.width,
//         height: canvas.height,
//       });

//       /*
//        * A4 PDF
//        */
//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//         compress: true,
//       });

//       const A4_WIDTH = 210;
//       const A4_HEIGHT = 297;

//       /*
//        * Calculate image height while keeping
//        * original aspect ratio.
//        */
//       const imageHeight = (canvas.height * A4_WIDTH) / canvas.width;

//       /*
//        * Fit complete resume inside ONE A4 page.
//        *
//        * If resume is taller than 297mm,
//        * scale it down proportionally.
//        */
//       const scale = imageHeight > A4_HEIGHT ? A4_HEIGHT / imageHeight : 1;

//       const finalWidth = A4_WIDTH * scale;

//       const finalHeight = imageHeight * scale;

//       /*
//        * Center horizontally.
//        */
//       const x = (A4_WIDTH - finalWidth) / 2;

//       /*
//        * Center vertically.
//        */
//       const y = (A4_HEIGHT - finalHeight) / 2;

//       console.log("PDF scaling:", {
//         originalHeight: imageHeight,
//         scale,
//         finalWidth,
//         finalHeight,
//         x,
//         y,
//       });

//       /*
//        * Add COMPLETE resume image
//        * scaled to fit inside A4.
//        */
//       const imgData = canvas.toDataURL("image/jpeg", 0.98);

//       pdf.addImage(
//         imgData,
//         "JPEG",
//         x,
//         y,
//         finalWidth,
//         finalHeight,
//         undefined,
//         "FAST",
//       );

//       /*
//        * Add clickable links.
//        */
//       const links = Array.from(
//         element.querySelectorAll("a[href]"),
//       ) as HTMLAnchorElement[];

//       const elementRect = element.getBoundingClientRect();

//       const pixelToMm = finalWidth / element.offsetWidth;

//       links.forEach((linkEl) => {
//         const rect = linkEl.getBoundingClientRect();

//         const relativeX = rect.left - elementRect.left;

//         const relativeY = rect.top - elementRect.top;

//         const linkX = x + relativeX * pixelToMm;

//         const linkY = y + relativeY * pixelToMm;

//         const linkWidth = rect.width * pixelToMm;

//         const linkHeight = rect.height * pixelToMm;

//         /*
//          * Only add valid links.
//          */
//         if (linkX >= 0 && linkY >= 0 && linkX < A4_WIDTH && linkY < A4_HEIGHT) {
//           pdf.link(
//             linkX,
//             linkY,
//             Math.min(linkWidth, A4_WIDTH - linkX),
//             Math.min(linkHeight, A4_HEIGHT - linkY),
//             {
//               url: linkEl.href,
//             },
//           );
//         }
//       });

//       /*
//        * Save ONE PAGE PDF.
//        */
//       pdf.save("resume.pdf");

//       console.log("PDF exported successfully as ONE A4 page.");

//       /*
//        * Restore original styles.
//        */
//       // element.style.height = originalHeight;

//       // element.style.maxHeight = originalMaxHeight;

//       // element.style.overflow = originalOverflow;
//     } catch (error) {
//       console.error("PDF Export Error:", error);

//       alert("Failed to generate PDF. Please try again.");
//     }
//   };

//   return <Button onClick={handleExport}>Download PDF</Button>;
// }
//////////////////////////////////////////////////////////
// import html2canvas from "html2canvas-pro";
// import jsPDF from "jspdf";

// import Button from "../../../components/ui/Button";

// export default function ExportPdfButton() {
//   const handleExport = async () => {
//     console.log("Export Clicked");

//     const element = document.getElementById("resume-export");

//     if (!element) {
//       alert("resume-export not found");
//       return;
//     }

//     try {
//       /*
//        * ========================================================
//        * A4
//        * ========================================================
//        */

//       const A4_WIDTH_PX = 794;
//       const A4_HEIGHT_PX = 1123;

//       const A4_WIDTH_MM = 210;
//       const A4_HEIGHT_MM = 297;

//       /*
//        * ========================================================
//        * WAIT FOR LAYOUT
//        * ========================================================
//        */

//       await new Promise<void>((resolve) => {
//         requestAnimationFrame(() => {
//           requestAnimationFrame(() => {
//             resolve();
//           });
//         });
//       });

//       /*
//        * ========================================================
//        * WAIT FOR IMAGES
//        * ========================================================
//        */

//       const images = Array.from(element.querySelectorAll("img"));

//       await Promise.all(
//         images.map((img) => {
//           if (img.complete) {
//             return Promise.resolve();
//           }

//           return new Promise<void>((resolve) => {
//             img.onload = () => resolve();

//             img.onerror = () => resolve();
//           });
//         }),
//       );

//       /*
//        * ========================================================
//        * CAPTURE A4
//        * ========================================================
//        */

//       const canvas = await html2canvas(element, {
//         scale: 2,

//         useCORS: true,

//         allowTaint: true,

//         backgroundColor: "#ffffff",

//         logging: false,

//         width: A4_WIDTH_PX,

//         height: A4_HEIGHT_PX,

//         windowWidth: A4_WIDTH_PX,

//         windowHeight: A4_HEIGHT_PX,

//         scrollX: 0,

//         scrollY: 0,

//         /*
//          * IMPORTANT
//          *
//          * Live preview scale exists on parent.
//          *
//          * We remove that scale ONLY
//          * inside html2canvas clone.
//          */

//         onclone: (clonedDocument) => {
//           const clonedElement = clonedDocument.getElementById("resume-export");

//           if (!clonedElement) {
//             return;
//           }

//           /*
//            * Exact A4 size
//            */

//           clonedElement.style.width = "794px";

//           clonedElement.style.height = "1123px";

//           clonedElement.style.minWidth = "794px";

//           clonedElement.style.maxWidth = "794px";

//           clonedElement.style.minHeight = "1123px";

//           clonedElement.style.maxHeight = "1123px";

//           clonedElement.style.transform = "none";

//           clonedElement.style.overflow = "hidden";

//           clonedElement.style.backgroundColor = "#ffffff";

//           /*
//            * Remove scale from parents.
//            */

//           let parent = clonedElement.parentElement;

//           while (parent) {
//             parent.style.transform = "none";

//             parent.style.transformOrigin = "top left";

//             parent.style.overflow = "visible";

//             parent = parent.parentElement;
//           }
//         },
//       });

//       console.log("Canvas generated:", canvas.width, canvas.height);

//       /*
//        * ========================================================
//        * CREATE A4 PDF
//        * ========================================================
//        */

//       const pdf = new jsPDF({
//         orientation: "portrait",

//         unit: "mm",

//         format: "a4",

//         compress: true,
//       });

//       /*
//        * ========================================================
//        * CANVAS → EXACT A4
//        * ========================================================
//        */

//       const imageData = canvas.toDataURL("image/jpeg", 0.98);

//       pdf.addImage(
//         imageData,

//         "JPEG",

//         0,

//         0,

//         A4_WIDTH_MM,

//         A4_HEIGHT_MM,

//         undefined,

//         "FAST",
//       );

//       /*
//        * ========================================================
//        * CLICKABLE LINKS
//        * ========================================================
//        */

//       const links = Array.from(
//         element.querySelectorAll("a[href]"),
//       ) as HTMLAnchorElement[];

//       /*
//        * Actual A4 coordinate conversion.
//        */

//       const elementRect = element.getBoundingClientRect();

//       const pxToMmX = A4_WIDTH_MM / element.offsetWidth;

//       const pxToMmY = A4_HEIGHT_MM / element.offsetHeight;

//       links.forEach((link) => {
//         if (!link.href) {
//           return;
//         }

//         const rect = link.getBoundingClientRect();

//         const relativeX = rect.left - elementRect.left;

//         const relativeY = rect.top - elementRect.top;

//         const x = relativeX * pxToMmX;

//         const y = relativeY * pxToMmY;

//         const width = rect.width * pxToMmX;

//         const height = rect.height * pxToMmY;

//         /*
//          * Ignore links outside A4.
//          */

//         if (x < 0 || y < 0 || x >= A4_WIDTH_MM || y >= A4_HEIGHT_MM) {
//           return;
//         }

//         const finalWidth = Math.min(width, A4_WIDTH_MM - x);

//         const finalHeight = Math.min(height, A4_HEIGHT_MM - y);

//         if (finalWidth <= 0 || finalHeight <= 0) {
//           return;
//         }

//         pdf.link(x, y, finalWidth, finalHeight, {
//           url: link.href,
//         });
//       });

//       /*
//        * ========================================================
//        * SAVE
//        * ========================================================
//        */

//       pdf.save("resume.pdf");

//       console.log("PDF exported successfully as ONE A4 page.");
//     } catch (error) {
//       console.error("PDF Export Error:", error);

//       alert("Failed to generate PDF. Please try again.");
//     }
//   };

//   return <Button onClick={handleExport}>Download PDF</Button>;
// }
// import html2canvas from "html2canvas-pro";
// import jsPDF from "jspdf";

// import Button from "../../../components/ui/Button";

// export default function ExportPdfButton() {
//   const handleExport = async () => {
//     const element = document.getElementById("resume-export");

//     if (!element) {
//       alert("Resume preview not found");
//       return;
//     }

//     try {
//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         allowTaint: true,
//         backgroundColor: "#ffffff",
//         logging: false,

//         onclone: (doc) => {
//           const cloned = doc.getElementById("resume-export");

//           if (!cloned) return;

//           // Exact A4
//           cloned.style.width = "794px";
//           cloned.style.height = "1123px";

//           cloned.style.minWidth = "794px";
//           cloned.style.maxWidth = "794px";

//           cloned.style.minHeight = "1123px";
//           cloned.style.maxHeight = "1123px";

//           cloned.style.transform = "none";
//           cloned.style.overflow = "hidden";

//           // Remove live-preview scale from parents
//           let parent = cloned.parentElement;

//           while (parent) {
//             parent.style.transform = "none";
//             parent.style.transformOrigin = "top left";
//             parent.style.overflow = "visible";

//             parent = parent.parentElement;
//           }
//         },
//       });

//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//         compress: true,
//       });

//       const imageData = canvas.toDataURL(
//         "image/jpeg",
//         0.98,
//       );

//       // Exact A4
//       pdf.addImage(
//         imageData,
//         "JPEG",
//         0,
//         0,
//         210,
//         297,
//         undefined,
//         "FAST",
//       );

//       pdf.save("resume.pdf");

//       console.log("PDF downloaded successfully");
//     } catch (error) {
//       console.error("PDF Export Error:", error);
//       alert("Failed to generate PDF");
//     }
//   };

//   return (
//     <Button
//       type="button"
//       onClick={handleExport}
//     >
//       Download PDF
//     </Button>
//   );
// }
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

import Button from "../../../components/ui/Button";

export default function ExportPdfButton() {
  const handleExport = async () => {
    console.log("Export Clicked");

    const element =
      document.getElementById("resume-export");

    if (!element) {
      alert("Resume preview not found");
      return;
    }

    try {
      /*
       * ============================================================
       * A4
       * ============================================================
       */

      const A4_WIDTH = 210;
      const A4_HEIGHT = 297;

      /*
       * ============================================================
       * WAIT FOR RENDER
       * ============================================================
       */

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve();
          });
        });
      });

      /*
       * ============================================================
       * GET LINKS
       * ============================================================
       */

      const links = Array.from(
        element.querySelectorAll("a[href]"),
      ) as HTMLAnchorElement[];

      console.log(
        "PDF Links Found:",
        links.length,
      );

      /*
       * ============================================================
       * SAVE ELEMENT POSITION
       * ============================================================
       */

      const elementRect =
        element.getBoundingClientRect();

      /*
       * ============================================================
       * CAPTURE RESUME
       *
       * IMPORTANT:
       * NO onclone
       * NO parent transform changes
       * NO width/height override
       *
       * This keeps the same capture method
       * that was already generating your PDF.
       * ============================================================
       */

      const canvas =
        await html2canvas(element, {
          scale: 2,

          useCORS: true,

          backgroundColor: "#ffffff",

          logging: false,

          scrollX: 0,

          scrollY: 0,
        });

      console.log("Canvas:", {
        width: canvas.width,
        height: canvas.height,
      });

      /*
       * ============================================================
       * CREATE A4 PDF
       * ============================================================
       */

      const pdf =
        new jsPDF({
          orientation: "portrait",

          unit: "mm",

          format: "a4",

          compress: true,
        });

      /*
       * ============================================================
       * IMAGE
       * ============================================================
       */

      const imageData =
        canvas.toDataURL(
          "image/jpeg",
          0.98,
        );

      /*
       * ============================================================
       * FIT RESUME INTO ONE A4 PAGE
       * ============================================================
       */

      const imageWidth =
        A4_WIDTH;

      const imageHeight =
        (canvas.height * imageWidth) /
        canvas.width;

      /*
       * If content is taller than A4,
       * scale it down proportionally.
       */

      const scale =
        imageHeight > A4_HEIGHT
          ? A4_HEIGHT / imageHeight
          : 1;

      const finalWidth =
        imageWidth * scale;

      const finalHeight =
        imageHeight * scale;

      /*
       * Center on A4
       */

      const x =
        (A4_WIDTH - finalWidth) / 2;

      const y =
        (A4_HEIGHT - finalHeight) / 2;

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

      /*
       * ============================================================
       * CLICKABLE LINKS
       * ============================================================
       */

      /*
       * CSS pixel → PDF mm
       */

      const pixelToMm =
        finalWidth /
        element.offsetWidth;

      links.forEach((link) => {
        const href = link.href;

        if (!href) return;

        const rect =
          link.getBoundingClientRect();

        /*
         * Position relative to resume
         */

        const relativeX =
          rect.left -
          elementRect.left;

        const relativeY =
          rect.top -
          elementRect.top;

        /*
         * Convert to PDF coordinates
         */

        const linkX =
          x +
          relativeX * pixelToMm;

        const linkY =
          y +
          relativeY * pixelToMm;

        const linkWidth =
          rect.width * pixelToMm;

        const linkHeight =
          rect.height * pixelToMm;

        /*
         * Ignore invalid links
         */

        if (
          linkWidth <= 0 ||
          linkHeight <= 0
        ) {
          return;
        }

        /*
         * Keep link inside PDF page
         */

        if (
          linkX < 0 ||
          linkY < 0 ||
          linkX >= A4_WIDTH ||
          linkY >= A4_HEIGHT
        ) {
          return;
        }

        const safeWidth =
          Math.min(
            linkWidth,
            A4_WIDTH - linkX,
          );

        const safeHeight =
          Math.min(
            linkHeight,
            A4_HEIGHT - linkY,
          );

        if (
          safeWidth <= 0 ||
          safeHeight <= 0
        ) {
          return;
        }

        console.log(
          "PDF Link:",
          href,
          {
            x: linkX,
            y: linkY,
            width: safeWidth,
            height: safeHeight,
          },
        );

        pdf.link(
          linkX,
          linkY,
          safeWidth,
          safeHeight,
          {
            url: href,
          },
        );
      });

      /*
       * ============================================================
       * SAVE
       * ============================================================
       */

      pdf.save("resume.pdf");

      console.log(
        "PDF downloaded successfully",
      );
    } catch (error) {
      console.error(
        "PDF Export Error:",
        error,
      );

      alert(
        "Failed to generate PDF. Please try again.",
      );
    }
  };

  return (
    <Button
      type="button"
      onClick={handleExport}
    >
      Download PDF
    </Button>
  );
}