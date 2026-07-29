import { useResumeStore } from "../../../../../store/resume.store";
import ResumeSection from "../shared/ResumeSection";
import SectionTitle from "../shared/SectionTitle";

interface Props {
  sectionId: string;
}

export default function CustomSectionPreview({ sectionId }: Props) {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const section = resume.customSections.find((item) => item.id === sectionId);

  if (!section || section.items.length === 0) return null;

  return (
    <ResumeSection title={section.title}>
      <SectionTitle title={section.title} />

      <div className="mt-4 space-y-5">
        {section.items.map((item) => (
          <div key={item.id}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{item.title}</h3>

                <p className="text-blue-600">{item.subtitle}</p>
              </div>

              {(item.startDate || item.endDate) && (
                <span className="text-sm text-gray-500">
                  {item.startDate}
                  {item.startDate && item.endDate ? " - " : ""}
                  {item.endDate}
                </span>
              )}
            </div>

            {item.description && (
              <p className="mt-2 text-gray-700">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </ResumeSection>
  );
}
