import { useResumeStore } from "../../../../../../store/resume.store";
import { ExecutiveBlueTheme as T } from "../../theme.executive-blue";

export default function AchievementsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const achievements = resume.achievements ?? [];
  if (!achievements.length) return null;

  return (
    <section className="mt-5">
      <h2
        className={`border-b ${T.colors.sectionBorder} pb-1 ${T.fontSize.sectionHeader} font-bold uppercase tracking-wide ${T.colors.heading}`}
      >
        Achievements
      </h2>

      <ul className="mt-2 space-y-1">
        {achievements.map((item, i) => (
          <li
            key={i}
            className={`flex gap-2 ${T.fontSize.body} ${T.colors.body}`}
          >
            <span className={T.colors.accent}>●</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
