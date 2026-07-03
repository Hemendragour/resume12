import TechnicalThumbnail from "./TechnicalThumbnail";
import type { Resume } from "../types/resume.types";

interface Props {
  resume: Resume;
}

export default function StudentThumbnail({
  resume,
}: Props) {
  return (
    <TechnicalThumbnail
      resume={resume}
    />
  );
}