import { Document, Page } from "@react-pdf/renderer";

import { styles } from "./PdfStyles";

import TechnicalPdfTemplate from "./TechnicalPdfTemplate";

import type { Resume } from "../types/resume.types";

interface Props {
  resume: Resume;
}

export default function ResumeDocument({ resume }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <TechnicalPdfTemplate resume={resume} />
      </Page>
    </Document>
  );
}
