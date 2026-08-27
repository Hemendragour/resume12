import { useResumeStore } from "../../../../../../store/resume.store";
import { splitLabelTheme as theme } from "../../../themes/split-label.theme";

export default function SkillsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  if (!resume.skills.length) return null;

  const skillsSection = resume.sections.find((s) => s.id === "skills");
  const isSplit = theme.section.layout === "split";

  const title = (
    <h2
      className={`text-[12px] font-semibold ${theme.section.uppercase ? "uppercase" : ""}`}
      style={{ color: theme.colors.text }}
    >
      {skillsSection?.displayTitle?.trim() ||
        skillsSection?.title ||
        "Relevant Skills"}
    </h2>
  );

  return (
    <section
      className={isSplit ? "grid grid-cols-4 gap-6" : ""}
      style={{
        marginTop: theme.section.spacing,
        paddingBottom: theme.section.divider ? "16px" : "0",
        borderBottom: theme.section.divider
          ? `1px solid ${theme.colors.muted}33`
          : "none",
      }}
    >
      {isSplit ? <div className="col-span-1">{title}</div> : title}

      <div className={isSplit ? "col-span-3 space-y-3" : "mt-3 space-y-3"}>
        {resume.skills.map((category, index) =>
          theme.skills.layout === "tags" ? (
            <div key={index}>
              <p
                className="text-[11px] font-semibold uppercase"
                style={{ color: theme.colors.secondary }}
              >
                {category.title}
              </p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded border px-2 py-0.5 text-[11px]"
                    style={{
                      borderColor: theme.colors.muted,
                      color: theme.colors.text,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div key={index}>
              <p
                className="text-[11px] font-semibold uppercase"
                style={{ color: theme.colors.secondary }}
              >
                {category.title}
              </p>
              <p
                className="text-[11px] leading-4 mt-0.5"
                style={{ color: theme.colors.text }}
              >
                {category.skills.join(", ")}
              </p>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
