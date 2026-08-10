import { useResumeStore } from "../../../../store/resume.store";

import { HarvardATSTheme as T } from "./components/theme.harvard-ats";

import HeaderPreview from "./components/sections/HeaderPreview";
import DynamicSectionRenderer from "./components/DynamicSectionRenderer";

export default function HarvardATSTemplate() {
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
