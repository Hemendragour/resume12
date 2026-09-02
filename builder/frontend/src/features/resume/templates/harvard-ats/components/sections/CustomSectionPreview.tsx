import { useResumeStore } from "../../../../../../store/resume.store";
import { formatMonthYear } from "../../../../editor/utils/formatDate";

import SectionHeader from "../shared/SectionHeader";
import { HarvardATSTheme as T } from "../theme.harvard-ats";

interface Props {
  sectionId: string;
}

export default function CustomSectionPreview({ sectionId }: Props) {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const section = resume.customSections.find((item) => item.id === sectionId);

  if (!section || section.items.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader title={section.title} />

      <div className={T.spacing.itemHeader}>
        {section.items.map((item) => (
          <div key={item.id}>
            <div className={T.layout.between}>
              <div>
                <h3
                  className={`
                    ${T.fontSize.itemTitle}
                    ${T.fontWeight.bold}
                    ${T.colors.heading}
                  `}
                >
                  {item.title}
                </h3>

                {item.subtitle && (
                  <p
                    className={`
                      ${T.fontSize.itemSubtitle}
                      italic
                      ${T.colors.body}
                    `}
                  >
                    {item.subtitle}
                  </p>
                )}
              </div>

              {(item.startDate || item.endDate) && (
                <p
                  className={`
                    ${T.fontSize.date}
                    ${T.colors.muted}
                  `}
                >
                  {formatMonthYear(item.startDate)}
                  {item.startDate && item.endDate ? " - " : ""}
                  {formatMonthYear(item.endDate)}
                </p>
              )}
            </div>

            {item.description && (
              <p
                className={`
                  ${T.spacing.itemHeader}
                  ${T.fontSize.body}
                  ${T.lineHeight.body}
                  ${T.colors.body}
                  whitespace-pre-line
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
