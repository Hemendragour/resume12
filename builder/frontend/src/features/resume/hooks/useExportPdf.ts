import html2pdf from "html2pdf.js";
import type { Html2PdfOptions } from "html2pdf.js";

export const exportResumePdf = (
  element: HTMLElement,
  fileName: string = "resume"
) => {
  if (!element) {
    console.error("No element provided for PDF export");
    return;
  }

  const options: Html2PdfOptions = {
    margin: [10, 10, 10, 10],
    filename: `${fileName}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      letterRendering: true,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: {
      mode: ["avoid-all", "css", "legacy"],
    },
  };

  html2pdf().set(options).from(element).save();
};