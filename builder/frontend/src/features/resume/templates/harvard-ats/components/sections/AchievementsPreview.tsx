import { useResumeStore } from "../../../../../../store/resume.store";

// import { ModernProfessionalTheme as T } from "../theme.modern-professional";
import { HarvardATSTheme as T } from "../theme.harvard-ats";
import SectionHeader from "../shared/SectionHeader";

export default function AchievementsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || !resume.achievements?.length) {
    return null;
  }

  return (
    <section className={T.spacing.section}>
      <SectionHeader title="Achievements" />

      <ul className="mt-5 list-disc space-y-2 pl-5 text-[14px] leading-6 text-slate-700">
        {resume.achievements.map((achievement, index) => {
          const text = achievement?.trim();

          if (!text) return null;

          return (
            <li key={`${index}-${text}`}>
              {text}
            </li>
          );
        })}
      </ul>
    </section>
  );
}