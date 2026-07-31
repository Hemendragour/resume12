import { Wrench } from "lucide-react";

import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../../shared/professional-modern/SectionHeader";

import { ProfessionalModernTheme as T } from "../../theme.professional-modern";

export default function SkillsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const skills = resume.skills ?? [];

  const skillsSection = resume.sections.find(
    (section) => section.id === "skills"
  );

  if (skills.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          skillsSection?.displayTitle?.trim() ||
          skillsSection?.title ||
          "Skills"
        }
        icon={<Wrench size={16} />}
      />

      <div
        className={`
          mt-3
          space-y-2
          ${T.fontSize.body}
          ${T.colors.body}
        `}
      >
        {skills.map((category) => (
          <div key={category.title}>
            <span className="font-semibold">{category.title}:</span>{" "}
            {category.skills.join(", ")}
          </div>
        ))}
      </div>
    </section>
  );
}