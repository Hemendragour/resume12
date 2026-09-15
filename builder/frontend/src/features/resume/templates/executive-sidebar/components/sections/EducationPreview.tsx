import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { ExecutiveSidebarTheme as T } from "../theme.executive-sidebar";

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

      <div className="space-y-3">
        {education.map((item, index) => {
          const dateRange = `${item.startMonth ? item.startMonth + " " : ""}${
            item.startYear
          } - ${
            item.current
              ? "Present"
              : `${item.endMonth ? item.endMonth + " " : ""}${item.endYear}`
          }`;

          return (
            <div key={index}>
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3
                    className={`${T.fontSize.itemTitle} ${T.fontWeight.bold} ${T.colors.heading}`}
                  >
                    {item.degree}
                    {item.fieldOfStudy ? `, ${item.fieldOfStudy}` : ""}
                  </h3>
                  <p className={`${T.fontSize.itemSubtitle} ${T.colors.body}`}>
                    {item.institution}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                </div>

                <p
                  className={`${T.fontSize.date} ${T.colors.muted} shrink-0 whitespace-nowrap`}
                >
                  {dateRange}
                </p>
              </div>

              {(item.cgpa || item.coursework) && (
                <p className={`${T.fontSize.body} ${T.colors.body} mt-1`}>
                  {item.cgpa && `CGPA: ${item.cgpa}`}
                  {item.cgpa && item.coursework ? " · " : ""}
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
