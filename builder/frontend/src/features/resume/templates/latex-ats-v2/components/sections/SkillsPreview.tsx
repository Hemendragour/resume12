import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { LatexATSV2Theme as T } from "../theme.latex-ats-v2";

export default function SkillsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const skills = resume.skills ?? [];

  if (!skills.length) return null;

  const section = resume.sections.find((section) => section.type === "skills");

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Skills"
        }
      />

      <div className="space-y-0.5 mt-1.5">
        {skills.map((category, index) => {
          if (!category.skills.length) return null;

          return (
            <p
              key={index}
              className={`
                ${T.fontFamily.body}
                ${T.fontSize.body}
                ${T.colors.body}
                ${T.lineHeight.body}
              `}
            >
              <span className={T.fontWeight.bold}>{category.title}:</span>{" "}
              {category.skills.join(", ")}
            </p>
          );
        })}
      </div>
    </section>
  );
}
