import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { HarvardATSTheme as T } from "../theme.harvard-ats";

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

      <div className={`${T.spacing.itemHeader} space-y-5`}>
        {education.map((item, index) => (
          <div key={index}>
            <div className={T.layout.between}>
              <div>
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
                    ${T.fontSize.itemSubtitle}
                    italic
                    ${T.colors.body}
                  `}
                >
                  {item.degree}
                  {item.fieldOfStudy && ` • ${item.fieldOfStudy}`}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`
                    ${T.fontSize.date}
                    ${T.colors.muted}
                  `}
                >
                  {item.startMonth && `${item.startMonth} `}
                  {item.startYear}
                  {" - "}
                  {item.current
                    ? "Present"
                    : `${item.endMonth ? item.endMonth + " " : ""}${item.endYear}`}
                </p>

                {item.location && (
                  <p
                    className={`
                      ${T.fontSize.location}
                      ${T.colors.muted}
                    `}
                  >
                    {item.location}
                  </p>
                )}
              </div>
            </div>

            {item.cgpa && (
              <p
                className={`
                  ${T.spacing.itemHeader}
                  ${T.fontSize.body}
                  ${T.colors.body}
                `}
              >
                <span className={T.fontWeight.bold}>CGPA:</span> {item.cgpa}
              </p>
            )}

            {item.coursework && (
              <p
                className={`
                  ${T.spacing.itemHeader}
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
        ))}
      </div>
    </section>
  );
}
