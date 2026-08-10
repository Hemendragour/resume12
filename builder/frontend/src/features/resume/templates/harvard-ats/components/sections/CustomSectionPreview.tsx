// export interface CustomSection {
//   id: string;
//   type: "custom";
//   title: string;
//   enabled: boolean;
//   order: number;
//   items: CustomSectionItem[];
// }

// export interface CustomSectionItem {
//   id: string;
//   title: string;
//   subtitle?: string;
//   startDate?: string;
//   endDate?: string;
//   description?: string;
// }


import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { HarvardATSTheme as T } from "../theme.harvard-ats";

export default function CustomSectionPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const customSections = resume.customSections ?? [];

  if (!customSections.length) return null;

  return (
    <>
      {customSections.map((section) => (
        <section
          key={section.id}
          className={T.spacing.section}
        >
          <SectionHeader title={section.title} />

          <div className={T.spacing.item}>
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
                      {item.startDate}
                      {item.startDate && item.endDate ? " - " : ""}
                      {item.endDate}
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
      ))}
    </>
  );
}