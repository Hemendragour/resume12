import { useResumeStore } from "../../../../../../store/resume.store";
import { ExecutiveBlueTheme as T } from "../../theme.executive-blue";

export default function SkillsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const categories = resume.skills.filter((cat) => cat.skills.length > 0);

  return (
    <section className="mt-5">
      <h2
        className={`border-b ${T.colors.sectionBorder} pb-1 ${T.fontSize.sectionHeader} font-bold uppercase tracking-wide ${T.colors.heading}`}
      >
        Technical Skills
      </h2>

      {categories.length === 0 ? (
        <p className={`mt-2 ${T.fontSize.body} ${T.colors.muted}`}>
          No skills added.
        </p>
      ) : (
        <div className="mt-2 space-y-1">
          {categories.map((cat) => (
            <p
              key={cat.title}
              className={`${T.fontSize.body} ${T.colors.body}`}
            >
              <span className="font-bold">{cat.title}:</span>{" "}
              {cat.skills.join(", ")}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
