import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { HarvardATSTheme as T } from "../theme.harvard-ats";

export default function InternshipPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const internships = resume.internships ?? [];

  if (!internships.length) return null;

  const section = resume.sections.find(
    (section) => section.type === "internships"
  );

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Internships"
        }
      />

      <div className="space-y-5">
        {internships.map((item, index) => (
          <div key={index}>
            {/* Header */}
            <div className={T.layout.between}>
              <div>
                <h3
                  className={`
                    ${T.fontSize.itemTitle}
                    ${T.fontWeight.bold}
                    ${T.colors.heading}
                  `}
                >
                  {item.company}
                </h3>

                <p
                  className={`
                    ${T.fontSize.itemSubtitle}
                    italic
                    ${T.colors.body}
                  `}
                >
                  {item.role}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`
                    ${T.fontSize.date}
                    ${T.colors.muted}
                  `}
                >
                  {item.startDate} -{" "}
                  {item.currentlyInterning
                    ? "Present"
                    : item.endDate || "Present"}
                </p>
              </div>
            </div>

            {/* Responsibilities */}
            {item.responsibilities.length > 0 && (
              <ul
                className={`
                  ${T.list.bullet}
                  ${T.spacing.itemHeader}
                  ${T.spacing.bullet}
                  ${T.fontSize.body}
                  ${T.lineHeight.body}
                  ${T.colors.body}
                `}
              >
                {item.responsibilities.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}

            {/* Achievements */}
            {item.achievements.length > 0 && (
              <ul
                className={`
                  ${T.list.bullet}
                  ${T.spacing.itemHeader}
                  ${T.spacing.bullet}
                  ${T.fontSize.body}
                  ${T.lineHeight.body}
                  ${T.colors.body}
                `}
              >
                {item.achievements.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}