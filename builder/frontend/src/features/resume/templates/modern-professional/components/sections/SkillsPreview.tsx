import { useResumeStore } from "../../../../../../store/resume.store";
import { FaGear } from "react-icons/fa6";

import { ModernProfessionalTheme as T } from "../theme.modern-professional";
import SectionHeader from "../shared/SectionHeader";

export default function SkillsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || resume.skills.length === 0) return null;

  // Flatten all categories into a single list of individual skills
  const allSkills = resume.skills.flatMap((category) => category.skills);

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title="Skills"
        icon={<FaGear size={T.sectionHeader.badgeIconSize} />}
      />

      <div className="mt-3">
        <ul className="space-y-0.5 pl-4 list-disc">
          {allSkills.map((skill, index) => (
            <li
              key={`${skill}-${index}`}
              className="text-[12.5px] leading-[1.6] text-slate-700"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
