import { useResumeStore } from "../../../../../store/resume.store";
import type { ResumeSection } from "../../../types/resume.types";

import { sectionComponentMap } from "./SectionRegistry.executive-sidebar";
import CustomSectionPreview from "./sections/CustomSectionPreview";

type RenderableSection = ResumeSection & {
  type: Exclude<ResumeSection["type"], "personalInfo" | "skills" | "languages">;
};

export default function DynamicSectionRenderer() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const visibleSections = resume.sections
    .filter(
      (section): section is RenderableSection =>
        section.enabled &&
        section.type !== "personalInfo" &&
        section.type !== "skills" &&
        section.type !== "languages",
    )
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {visibleSections.map((section) => {
        const customSection = resume.customSections.find(
          (item) => item.id === section.id,
        );

        if (customSection) {
          return (
            <CustomSectionPreview key={section.id} sectionId={section.id} />
          );
        }

        const Component =
          sectionComponentMap[section.type as keyof typeof sectionComponentMap];

        if (!Component) return null;

        return <Component key={section.id} />;
      })}
    </>
  );
}
