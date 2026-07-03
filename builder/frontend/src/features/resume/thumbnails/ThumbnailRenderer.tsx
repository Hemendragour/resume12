import type { Resume } from "../types/resume.types";

import TechnicalThumbnail from "./TechnicalThumbnail";

interface Props {
  resume: Resume;
}

export default function ThumbnailRenderer({ resume }: Props) {
  switch (resume.templateId) {
    case "modern-professional":
      return <TechnicalThumbnail resume={resume} />;

    case "executive":
      return <TechnicalThumbnail resume={resume} />;

    case "minimal-clean":
      return <TechnicalThumbnail resume={resume} />;

    case "student":
      return <TechnicalThumbnail resume={resume} />;

    default:
      return <TechnicalThumbnail resume={resume} />;
  }
}
