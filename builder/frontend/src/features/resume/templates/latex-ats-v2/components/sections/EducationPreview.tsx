import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { LatexATSV2Theme as T } from "../theme.latex-ats-v2";

export default function EducationPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const education = resume.education ?? [];

  if (!education.length) return null;

  const section = resume.sections.find(
    (section) => section.type === "education",
  );

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Education"
        }
      />

      <div className={`${T.spacing.itemHeader} ${T.education.container}`}>
        {education.map((item, index) => {
          const dateRange = `${item.startMonth ? item.startMonth + " " : ""}${
            item.startYear
          } - ${
            item.current
              ? "Present"
              : `${item.endMonth ? item.endMonth + " " : ""}${item.endYear}`
          }`;

          const subLeft = [item.degree, item.fieldOfStudy]
            .filter(Boolean)
            .join(", ");

          const subRight = [item.location, item.cgpa && `CGPA: ${item.cgpa}`]
            .filter(Boolean)
            .join(" | ");

          return (
            <div key={index}>
              {/* Row 1: institution (bold) — date range (bold) */}
              <div className={T.layout.between}>
                <h3
                  className={`
                    ${T.fontSize.itemTitle}
                    ${T.fontWeight.bold}
                    ${T.colors.heading}
                  `}
                >
                  {item.institution}
                </h3>
                <p
                  className={`
                    ${T.fontSize.date}
                    ${T.fontWeight.bold}
                    ${T.colors.heading}
                    shrink-0
                  `}
                >
                  {dateRange}
                </p>
              </div>

              {/* Row 2: degree / field — location, CGPA */}
              {(subLeft || subRight) && (
                <div className={`${T.layout.between} mt-0.5`}>
                  <p
                    className={`
                      ${T.fontSize.itemSubtitle}
                      italic
                      ${T.colors.body}
                    `}
                  >
                    {subLeft}
                  </p>
                  {subRight && (
                    <p
                      className={`
                        ${T.fontSize.location}
                        italic
                        ${T.colors.body}
                        shrink-0
                      `}
                    >
                      {subRight}
                    </p>
                  )}
                </div>
              )}

              {item.coursework && (
                <p
                  className={`
                    mt-1
                    ${T.fontSize.body}
                    ${T.lineHeight.body}
                    ${T.colors.body}
                  `}
                >
                  <span className={T.fontWeight.bold}>Relevant Coursework:</span>{" "}
                  {item.coursework}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
