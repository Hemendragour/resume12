import { User } from "lucide-react";

import { ProfessionalModernTheme as T } from "../../theme.professional-modern";
import { useResumeStore } from "../../../../../../store/resume.store";
import SectionHeader from "../../shared/professional-modern/SectionHeader";

export default function SummaryPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const summary = resume.summary?.trim();

  const summarySection = resume.sections.find(
    (section) => section.id === "summary",
  );

  if (!summary) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          summarySection?.displayTitle?.trim() ||
          summarySection?.title ||
          "Professional Summary"
        }
        icon={<User size={16} />}
      />

      <p
        className={`
          mt-3
          leading-7
          whitespace-pre-line
          ${T.fontSize.body}
          ${T.colors.body}
        `}
      >
        {summary}
      </p>
    </section>
  );
}
