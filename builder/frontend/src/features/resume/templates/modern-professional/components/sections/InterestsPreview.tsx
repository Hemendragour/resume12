import { useResumeStore } from "../../../../../../store/resume.store";
import { FaHeart } from "react-icons/fa6";

import { ModernProfessionalTheme as T } from "../theme.modern-professional";
import SectionHeader from "../shared/SectionHeader";

export default function InterestsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || resume.interests.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title="Interests"
        icon={<FaHeart size={T.sectionHeader.badgeIconSize} />}
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {resume.interests.map((interest, index) => (
          <span
            key={index}
            className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-[11.5px] font-medium text-slate-700"
          >
            {interest}
          </span>
        ))}
      </div>
    </section>
  );
}
