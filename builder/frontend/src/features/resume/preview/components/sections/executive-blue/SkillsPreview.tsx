import { useResumeStore } from "../../../../../../store/resume.store";
import { ExecutiveBlueTheme as T } from "../../theme.executive-blue";

export default function SkillsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const categories = resume.skills.filter((cat) => cat.skills.length > 0);
  if (categories.length === 0) return null;

  const skillsSection = resume.sections.find(
    (section) => section.id === "skills",
  );

  return (
    <section className="mt-5">
      <h2
        className={`border-b ${T.colors.sectionBorder} pb-1 ${T.fontSize.sectionHeader} font-bold uppercase tracking-wide ${T.colors.heading}`}
      >
        {skillsSection?.displayTitle?.trim() ||
          skillsSection?.title ||
          "Technical Skills"}
      </h2>

      <div className="mt-2 space-y-1">
        {categories.map((cat) => (
          <p key={cat.title} className={`${T.fontSize.body} ${T.colors.body}`}>
            <span className="font-bold">{cat.title}:</span>{" "}
            {cat.skills.join(", ")}
          </p>
        ))}
      </div>
    </section>
  );
}
