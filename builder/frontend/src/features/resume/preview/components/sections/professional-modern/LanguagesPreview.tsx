import { Languages } from "lucide-react";

import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../../shared/professional-modern/SectionHeader";

import { ProfessionalModernTheme as T } from "../../theme.professional-modern";

export default function LanguagesPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const languages = resume.languages ?? [];

  if (languages.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader title="Languages" icon={<Languages size={16} />} />

      <div className="mt-3 space-y-2">
        {languages.map((language, index) => (
          <div key={index} className="flex justify-between">
            <span>{language.name}</span>
            <span>{language.level}</span>
          </div>
        ))}
      </div>
    </section>
  );
}