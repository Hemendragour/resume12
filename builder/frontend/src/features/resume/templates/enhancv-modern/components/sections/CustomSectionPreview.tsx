import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { EnhancvModernTheme as T } from "../theme.enhancv-modern";

interface Props {
  sectionId: string;
}

export default function CustomSectionPreview({ sectionId }: Props) {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const section = resume.customSections.find((item) => item.id === sectionId);

  if (!section || !section.items.length) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader title={section.title?.trim() || section.title} />

      <div className="mt-4 space-y-6">
        {section.items.map((item) => (
          <div key={item.id} className="border-l-2 border-slate-300 pl-4">
            <div className="flex justify-between items-start gap-4 flex-wrap">
              <div>
                <h3
                  className={`
                    ${T.fontSize.title}
                    ${T.fontWeight.heading}
                    ${T.colors.heading}
                  `}
                >
                  {item.title}
                </h3>

                {item.subtitle && (
                  <p
                    className={`
                      mt-1
                      ${T.fontSize.body}
                      ${T.colors.body}
                    `}
                  >
                    {item.subtitle}
                  </p>
                )}
              </div>

              {(item.startDate || item.endDate) && (
                <span
                  className={`
                    ${T.fontSize.date}
                    ${T.colors.muted}
                  `}
                >
                  {item.startDate} - {item.endDate}
                </span>
              )}
            </div>

            {item.description && (
              <p
                className={`
                  mt-3
                  whitespace-pre-line
                  leading-7
                  ${T.fontSize.body}
                  ${T.colors.body}
                `}
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
