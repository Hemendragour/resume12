import { Languages } from "lucide-react";

import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";

import { EnhancvModernTheme as T } from "../theme.enhancv-modern";

export default function LanguagesPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const languages = resume.languages ?? [];

  const languagesSection = resume.sections.find(
    (section) => section.id === "languages"
  );

  if (languages.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          languagesSection?.displayTitle?.trim() ||
          languagesSection?.title ||
          "Languages"
        }
        // icon={<Languages size={16} />}
      />

      <div className="mt-4 space-y-3">
        {languages.map((language, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-l-2 border-slate-300 pl-4"
          >
            <span
              className={`
                ${T.fontSize.body}
                ${T.colors.heading}
              `}
            >
              {language.name}
            </span>

            <span
              className={`
                ${T.fontSize.date}
                ${T.colors.muted}
              `}
            >
              {language.level}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}