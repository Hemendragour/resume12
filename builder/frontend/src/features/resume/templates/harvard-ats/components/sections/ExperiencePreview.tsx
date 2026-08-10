import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { HarvardATSTheme as T } from "../theme.harvard-ats";

export default function ExperiencePreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const experience = resume.experience ?? [];

  if (!experience.length) return null;

  const section = resume.sections.find(
    (section) => section.type === "experience"
  );

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Professional Experience"
        }
      />

      <div className={T.experience.container}>
        {experience.map((item, index) => (
          <div key={index}>
            {/* Company + Date */}
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
                    ${T.colors.body}
                    italic
                  `}
                >
                  {item.position}
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
                  {item.currentlyWorking
                    ? "Present"
                    : item.endDate || "Present"}
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

            {/* Responsibilities */}
            {item.responsibilities?.length > 0 && (
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
           {/* Achievements */}
{item.achievements?.length ? (
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
) : null}
          </div>
        ))}
      </div>
    </section>
  );
}