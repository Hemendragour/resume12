import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { LatexSidebarTheme as T } from "../theme.latex-sidebar";

export default function AchievementsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || !resume.achievements?.length) return null;

  const section = resume.sections.find((s) => s.type === "achievements");

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Achievements"
        }
      />

      <ul
        className={`
          ${T.list.bullet}
          ${T.spacing.itemHeader}
          ${T.spacing.bullet}
          ${T.fontSize.body}
          ${T.lineHeight.body}
          ${T.colors.body}
        `}
      >
        {resume.achievements.map((achievement, index) => {
          const text = achievement?.trim();
          if (!text) return null;
          return <li key={`${index}-${text}`}>{text}</li>;
        })}
      </ul>
    </section>
  );
}
