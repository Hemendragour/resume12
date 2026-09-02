import { FileText } from "lucide-react";

import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../../shared/professional-modern/SectionHeader";
import { ProfessionalModernTheme as T } from "../../theme.professional-modern";
import { formatMonthYear } from "../../../../editor/utils/formatDate";

interface Props {
  sectionId: string;
}

export default function ProfessionalModernCustomSection({ sectionId }: Props) {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const section = resume.customSections.find((item) => item.id === sectionId);

  if (!section) return null;

  if (section.items.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader title={section.title} icon={<FileText size={16} />} />

      <div className="mt-4 space-y-4">
        {section.items.map((item) => (
          <div key={item.id}>
            <div className="flex items-start justify-between">
              <div>
                {item.title && <h4 className="font-semibold">{item.title}</h4>}

                {item.subtitle && (
                  <p className={`${T.fontSize.body} ${T.colors.body}`}>
                    {item.subtitle}
                  </p>
                )}
              </div>

              {(item.startDate || item.endDate) && (
                <span className={`${T.fontSize.date} ${T.colors.body}`}>
                  {formatMonthYear(item.startDate)}
                  {item.startDate && item.endDate ? " - " : ""}
                  {formatMonthYear(item.endDate)}
                </span>
              )}
            </div>

            {item.description && (
              <p
                className={`mt-2 whitespace-pre-line ${T.fontSize.body} ${T.colors.body}`}
              >
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
