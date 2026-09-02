import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { HarvardATSTheme as T } from "../theme.harvard-ats";

export default function InterestsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const interests = resume.interests ?? [];

  if (!interests.length) return null;

  const section = resume.sections.find(
    (section) => section.type === "interests",
  );

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Interests"
        }
      />

      <ul
        className={`
          ${T.list.bullet}
          ${T.spacing.bullet}
          ${T.spacing.itemHeader}
          ${T.fontSize.body}
          ${T.lineHeight.body}
          ${T.colors.body}
        `}
      >
        {interests.map((interest, index) => (
          <li key={index}>{interest}</li>
        ))}
      </ul>
    </section>
  );
}
