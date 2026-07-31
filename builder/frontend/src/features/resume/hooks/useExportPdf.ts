import html2pdf from "html2pdf.js";

interface ResumePdfOptions {
  margin?: number | [number, number, number, number];
  filename?: string;
  image?: { type?: "jpeg" | "png" | "webp"; quality?: number };
  html2canvas?: {
    scale?: number;
    useCORS?: boolean;
    backgroundColor?: string;
    letterRendering?: boolean;
  };
  jsPDF?: {
    unit?: string;
    format?: string;
    orientation?: string;
  };
  pagebreak?: {
    mode?: string[];
  };
}

export const exportResumePdf = (
  element: HTMLElement,
  fileName: string = "resume"
) => {
  if (!element) {
    console.error("No element provided for PDF export");
    return;
  }

  const options: ResumePdfOptions = {
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

  const links = Array.from(
    element.querySelectorAll("a[href]")
  ) as HTMLAnchorElement[];

  console.log("Found links:", links.length, links.map(l => l.href));

  const elementRect = element.getBoundingClientRect();
  const marginTop = 10;
  const marginLeft = 10;

  const worker = html2pdf().set(options as any).from(element);

  worker
    .toPdf()
    .get("pdf")
    .then((pdf: any) => {
      const pageWidth = pdf.internal.pageSize.getWidth();
      const contentWidth = pageWidth - marginLeft * 2;
      const scaleFactor = contentWidth / element.offsetWidth;

      console.log("pageWidth (mm):", pageWidth);
      console.log("element.offsetWidth (px):", element.offsetWidth);
      console.log("scaleFactor:", scaleFactor);

      links.forEach((linkEl) => {
        const rect = linkEl.getBoundingClientRect();

        const x = marginLeft + (rect.left - elementRect.left) * scaleFactor;
        const y = marginTop + (rect.top - elementRect.top) * scaleFactor;
        const w = rect.width * scaleFactor;
        const h = rect.height * scaleFactor;

        console.log("Link:", linkEl.href, { x, y, w, h });

        pdf.link(x, y, w, h, { url: linkEl.href });
      });

      return worker.save();
    })
    .catch((err: any) => {
      console.error("PDF export error:", err);
    });
};