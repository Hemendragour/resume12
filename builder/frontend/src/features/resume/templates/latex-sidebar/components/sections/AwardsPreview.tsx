import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { LatexSidebarTheme as T } from "../theme.latex-sidebar";

export default function AwardsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const awards = resume.awards ?? [];
  if (!awards.length) return null;

  const section = resume.sections.find((s) => s.type === "awards");

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Awards & Achievements"
        }
      />

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
        {awards.map((award, index) => (
          <li key={index}>{award}</li>
        ))}
      </ul>
    </section>
  );
}
