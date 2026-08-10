import { useResumeStore } from "../../../../../store/resume.store";
import type { ResumeSection } from "../../../types/resume.types";
// import type { ResumeSection } from "../../../../../types/resume.types";

import { sectionComponentMap } from "./SectionRegistry.harvard";

type RenderableSection = ResumeSection & {
  type: Exclude<ResumeSection["type"], "personalInfo">;
};

export default function DynamicSectionRenderer() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const visibleSections = resume.sections
    .filter(
      (section): section is RenderableSection =>
        section.enabled && section.type !== "personalInfo",
    )
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {visibleSections.map((section) => {
        const Component = sectionComponentMap[section.type];

        return <Component key={section.id} />;
      })}
    </>
  );
}
