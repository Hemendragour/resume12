import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";

import { EnhancvModernTheme as T } from "../theme.enhancv-modern";

export default function AchievementsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const achievements = resume.achievements ?? [];

  const achievementsSection = resume.sections.find(
    (section) => section.id === "achievements",
  );

  if (achievements.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          achievementsSection?.displayTitle?.trim() ||
          achievementsSection?.title ||
          "Achievements"
        }
      />

      <div className="mt-4 space-y-3">
        {achievements.map((item, index) => (
          <div key={index} className="">
            <p
              className={`
                ${T.fontSize.body}
                ${T.colors.body}
              `}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
