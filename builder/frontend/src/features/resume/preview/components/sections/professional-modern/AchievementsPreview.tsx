import { Award } from "lucide-react";

import { useResumeStore } from "../../../../../../store/resume.store";
import SectionHeader from "../../shared/professional-modern/SectionHeader";
import { ProfessionalModernTheme as T } from "../../theme.professional-modern";

export default function AchievementsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const achievements = resume.achievements ?? [];

  if (achievements.length === 0) return null;

  const achievementsSection = resume.sections.find(
    (section) => section.id === "achievements",
  );

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          achievementsSection?.displayTitle?.trim() ||
          achievementsSection?.title ||
          "Achievements"
        }
        icon={<Award size={16} />}
      />

      <ul
        className={`
          mt-3
          list-disc
          list-inside
          space-y-1
          ${T.fontSize.body}
          ${T.colors.body}
        `}
      >
        {achievements.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
