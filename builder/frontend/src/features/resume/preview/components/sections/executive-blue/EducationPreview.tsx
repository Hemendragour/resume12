import { useResumeStore } from "../../../../../../store/resume.store";
import { ExecutiveBlueTheme as T } from "../../theme.executive-blue";

export default function EducationPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  const educationSection = resume.sections.find(
    (section) => section.id === "education",
  );
  return (
    <section className="mt-5">
      <h2
        className={`border-b ${T.colors.sectionBorder} pb-1 ${T.fontSize.sectionHeader} font-bold uppercase tracking-wide ${T.colors.heading}`}
      >
        {educationSection?.displayTitle?.trim() ||
          educationSection?.title ||
          "Education"}
      </h2>

      {resume.education.length === 0 ? (
        <p className={`mt-2 ${T.fontSize.body} ${T.colors.muted}`}>
          No education added.
        </p>
      ) : (
        <div className="mt-3 space-y-3">
          {resume.education.map((edu, index) => (
            <div key={index}>
              <div className="flex items-baseline justify-between">
                <p
                  className={`${T.fontSize.itemTitle} font-bold ${T.colors.heading}`}
                >
                  {edu.degree}
                  {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                </p>
                <span className={`${T.fontSize.date} ${T.colors.muted}`}>
                  {edu.startYear} - {edu.current ? "Present" : edu.endYear}
                </span>
              </div>

              <p
                className={`italic ${T.fontSize.itemSubtitle} ${T.colors.muted}`}
              >
                {edu.institution}
                {edu.location && `, ${edu.location}`}
                {edu.cgpa && ` | CGPA: ${edu.cgpa}`}
              </p>

              {edu.coursework && (
                <p
                  className={`mt-1 italic ${T.fontSize.body} ${T.colors.body}`}
                >
                  {edu.coursework}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
