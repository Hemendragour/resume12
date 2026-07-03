import { PDFDownloadLink } from "@react-pdf/renderer";

import Button from "../../../components/ui/Button";

import ResumeDocument from "../pdf/ResumeDocument";

import type { Resume } from "../types/resume.types";

interface Props {
  resume: Resume;
}

export default function ExportPdfButton({
  resume,
}: Props) {
  return (
    <PDFDownloadLink
      document={
        <ResumeDocument
          resume={resume}
        />
      }
      fileName={`${resume.title}.pdf`}
    >
      {({ loading }) => (
        <Button
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}