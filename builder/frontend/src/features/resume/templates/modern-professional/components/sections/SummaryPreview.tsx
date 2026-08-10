import { useResumeStore } from "../../../../../../store/resume.store";
import { FaUser } from "react-icons/fa6";

import { ModernProfessionalTheme as T } from "../theme.modern-professional";
import SectionHeader from "../shared/SectionHeader";

export default function SummaryPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || !resume.summary?.trim()) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title="Professional Summary"
        icon={<FaUser size={T.sectionHeader.badgeIconSize} />}
      />

      <p
        className={`
          mt-2
          ${T.fontSize.body}
          ${T.fontWeight.normal}
          ${T.colors.body}
          ${T.lineHeight.body}
          text-justify
          whitespace-pre-line
        `}
      >
        {resume.summary}
      </p>
    </section>
  );
}
