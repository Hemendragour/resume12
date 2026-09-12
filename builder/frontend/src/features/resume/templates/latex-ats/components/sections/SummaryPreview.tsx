import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { LatexATSTheme as T } from "../theme.latex-ats";

export default function SummaryPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  if (!resume.summary?.trim()) return null;

  const section = resume.sections.find((section) => section.type === "summary");

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Summary"
        }
      />

      <p
        className={`
          ${T.fontFamily.body}
          ${T.fontSize.body}
          ${T.fontWeight.normal}
          ${T.lineHeight.body}
          ${T.colors.body}
          whitespace-pre-line
          mt-1.5
        `}
      >
        {resume.summary}
      </p>
    </section>
  );
}
