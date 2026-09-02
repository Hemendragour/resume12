import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { HarvardATSTheme as T } from "../theme.harvard-ats";

export default function StrengthsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const strengths = resume.strengths ?? [];

  if (!strengths.length) return null;

  const section = resume.sections.find(
    (section) => section.type === "strengths",
  );

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Strengths"
        }
      />

      <div className={T.spacing.itemHeader}>
        {strengths.map((strength, index) => (
          <div key={index}>
            <h3
              className={`
                ${T.fontSize.itemTitle}
                ${T.fontWeight.bold}
                ${T.colors.heading}
              `}
            >
              {strength.title}
            </h3>

            <p
              className={`
                ${T.spacing.itemHeader}
                ${T.fontSize.body}
                ${T.lineHeight.body}
                ${T.colors.body}
              `}
            >
              {strength.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
