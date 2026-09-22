import { useCoverLetterStore } from "../../../store/coverLetter.store";
import { CoverLetterTemplates } from "../types/coverLetter.types";

import ClassicFormalPreview from "./classic-formal/CoverLetterPreview";

export default function CoverLetterTemplateRenderer() {
  const coverLetter = useCoverLetterStore((state) => state.coverLetter);

  if (!coverLetter) return null;

  switch (coverLetter.templateId) {
    case CoverLetterTemplates.CLASSIC_FORMAL:
    default:
      return <ClassicFormalPreview />;
  }
}
