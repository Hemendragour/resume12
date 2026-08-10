import { useResumeStore } from "../../../../../../store/resume.store";
import { FaStar } from "react-icons/fa6";

import { ModernProfessionalTheme as T } from "../theme.modern-professional";
import SectionHeader from "../shared/SectionHeader";

export default function StrengthsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || resume.strengths.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title="Strengths"
        icon={<FaStar size={T.sectionHeader.badgeIconSize} />}
      />

      <div className="mt-3 space-y-4">
        {resume.strengths.map((strength, index) => (
          <div
            key={index}
            className="border-b border-slate-200 pb-3.5 last:border-b-0"
          >
            <h3 className="text-[13px] font-bold text-slate-900">
              {strength.title}
            </h3>

            <p className="mt-1.5 text-[12.5px] leading-[1.6] text-slate-700">
              {strength.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
