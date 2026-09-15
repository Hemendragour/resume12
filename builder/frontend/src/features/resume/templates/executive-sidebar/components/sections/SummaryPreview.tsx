import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { ExecutiveSidebarTheme as T } from "../theme.executive-sidebar";

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
            : section?.title || "Profile"
        }
      />

      <p
        className={`
          ${T.fontSize.body}
          ${T.lineHeight.body}
          ${T.colors.body}
          whitespace-pre-line
        `}
      >
        {resume.summary}
      </p>
    </section>
  );
}
