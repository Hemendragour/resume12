import { useResumeStore } from "../../../../../store/resume.store";

interface Props {
  registry: Record<string, React.ComponentType>;
  customSectionComponent: React.ComponentType<{ sectionId: string }>;
}

export default function DynamicSectionRenderer({
  registry,
  customSectionComponent: CustomSectionPreview,
}: Props) {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const sections = [...resume.sections]
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {sections.map((section) => {
        const customSection = resume.customSections.find(
          (item) => item.id === section.id,
        );

        if (customSection) {
          return (
            <CustomSectionPreview key={section.id} sectionId={section.id} />
          );
        }

        if (section.type === "personalInfo") {
          return null;
        }

        const Component = registry[section.type as keyof typeof registry];

        if (!Component) {
          return null;
        }

        return <Component key={section.id} />;
      })}
    </>
  );
}
