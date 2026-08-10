import { useResumeStore } from "../../../../../../store/resume.store";

import { ModernProfessionalTheme as T } from "../theme.modern-professional";
import SectionHeader from "../shared/SectionHeader";

export default function AwardsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || resume.awards.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader title="Achievements" />

      <ul className="mt-4 space-y-3">
        {resume.awards.map((award, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-[7px] h-2 w-2 rounded-full bg-blue-600 shrink-0" />

            <span
              className={`
                ${T.fontSize.body}
                ${T.colors.body}
                ${T.lineHeight.body}
              `}
            >
              {award}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
