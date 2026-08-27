import { GraduationCap } from "lucide-react";

import { useResumeStore } from "../../../../../../store/resume.store";

import { ProfessionalModernTheme as T } from "../../theme.professional-modern";
import SectionHeader from "../../shared/professional-modern/SectionHeader";

export default function EducationPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const education = resume.education ?? [];
  const educationSection = resume.sections.find(
    (section) => section.id === "education",
  );

  if (education.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          educationSection?.displayTitle?.trim() ||
          educationSection?.title ||
          "Education"
        }
        icon={<GraduationCap size={16} />}
      />

      <div className="mt-3 space-y-5">
        {education.map((item, index) => (
          <div key={index}>
            <div className="flex items-baseline justify-between gap-3">
              <h3
                className={`font-semibold ${T.fontSize.itemTitle} ${T.colors.heading}`}
              >
                {item.institution}
              </h3>

              <span
                className={`whitespace-nowrap ${T.fontSize.date} ${T.colors.muted}`}
              >
                {item.startYear} - {item.current ? "Present" : item.endYear}
              </span>
            </div>

            <p className={`${T.fontSize.itemSubtitle} ${T.colors.body}`}>
              {item.degree}
              {item.fieldOfStudy ? ` in ${item.fieldOfStudy}` : ""}
            </p>

            {item.cgpa && (
              <p className={`mt-1 ${T.fontSize.body} ${T.colors.body}`}>
                CGPA : {item.cgpa}
              </p>
            )}

            {item.coursework && (
              <p className={`mt-1 ${T.fontSize.body} ${T.colors.body}`}>
                Coursework : {item.coursework}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
