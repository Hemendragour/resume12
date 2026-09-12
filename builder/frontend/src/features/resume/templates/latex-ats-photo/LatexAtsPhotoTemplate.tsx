import { useResumeStore } from "../../../../store/resume.store";

import { LatexATSPhotoTheme as T } from "./components/theme.latex-ats-photo";

import HeaderPreview from "./components/sections/HeaderPreview";
import DynamicSectionRenderer from "./components/DynamicSectionRenderer";

export default function LatexAtsPhotoTemplate() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  return (
    <div
      className={`
        ${T.page.container}
        ${T.fontFamily.body}
        ${T.spacing.page}
      `}
    >
      {/* Header */}
      <HeaderPreview />

      {/* Dynamic Resume Sections */}
      <DynamicSectionRenderer />
    </div>
  );
}
