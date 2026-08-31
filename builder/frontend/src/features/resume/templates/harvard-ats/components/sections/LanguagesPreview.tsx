import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { HarvardATSTheme as T } from "../theme.harvard-ats";

export default function LanguagesPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const languages = resume.languages ?? [];

  if (!languages.length) return null;

  const section = resume.sections.find(
    (section) => section.type === "languages",
  );

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Languages"
        }
      />

      <div className="space-y-1">
        {languages.map((language, index) => (
          <div
            key={index}
            className={`
              flex
              gap-4
              items-center
              ${T.fontSize.body}
              ${T.colors.body}
            `}
          >
            <span className={T.fontWeight.bold}>{language.name}</span>

            <span>{language.level}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
