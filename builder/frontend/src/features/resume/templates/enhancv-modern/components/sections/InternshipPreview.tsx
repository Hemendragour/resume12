import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { EnhancvModernTheme as T } from "../theme.enhancv-modern";

export default function InternshipPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const internships = resume.internships ?? [];

  const internshipSection = resume.sections.find(
    (section) => section.id === "internships",
  );

  if (!internships.length) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          internshipSection?.displayTitle?.trim() ||
          internshipSection?.title ||
          "Internships"
        }
      />

      <div className={`${T.spacing.itemHeader} space-y-4`}>
        {internships.map((item, index) => (
          <div
            key={index}
            className={index !== 0 ? T.spacing.item : ""}
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              {/* Left */}
              <div>
                <h3
                  className={`
                    ${T.fontSize.itemTitle}
                    ${T.fontWeight.heading}
                    ${T.colors.heading}
                    ${T.lineHeight.title}
                  `}
                >
                  {item.company}
                </h3>

                <p
                  className={`
                    mt-1
                    ${T.fontSize.itemSubtitle}
                    ${T.colors.muted}
                    ${T.lineHeight.title}
                  `}
                >
                  {item.role}
                </p>
              </div>

              {/* Right */}
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
            {item.responsibilities?.length > 0 && (
              <ul
                className={`
                  ${T.spacing.itemHeader}
                  ${T.spacing.bullet}
                  ml-5
                  list-disc
                  ${T.fontSize.body}
                  ${T.colors.body}
                  ${T.lineHeight.body}
                `}
              >
                {item.responsibilities.map((responsibility, i) => (
                  <li key={i}>{responsibility}</li>
                ))}
              </ul>
            )}

            {/* Achievements */}
            {item.achievements?.length > 0 && (
              <ul
                className={`
                  ${T.spacing.itemHeader}
                  ${T.spacing.bullet}
                  ml-5
                  list-disc
                  ${T.fontSize.body}
                  ${T.colors.body}
                  ${T.lineHeight.body}
                `}
              >
                {item.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}