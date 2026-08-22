import { useResumeStore } from "../../../../../store/resume.store";
import { useTheme } from "../../themes/ThemeProvider";

export default function SkillsPreview() {
  const resume = useResumeStore((state) => state.resume);
  const theme = useTheme();

  if (!resume) return null;

  const isSplit = theme.section.layout === "split";

  const title = (
    <h2
      className={`text-[12px] font-semibold tracking-wide ${
        theme.section.uppercase ? "uppercase" : ""
      }`}
      style={{ color: theme.colors.text }}
    >
      Relevant Skills
    </h2>
  );

  const content =
    resume.skills.length === 0 ? (
      <p className="text-[11px]" style={{ color: theme.colors.muted }}>
        No skills added.
      </p>
    ) : theme.skills.layout === "tags" ? (
      <div className="grid grid-cols-3 gap-x-6 gap-y-1">
        {resume.skills
          .flatMap((c) => c.skills)
          .map((skill, i) => (
            <div
              key={i}
              className="text-[11px]"
              style={{ color: theme.colors.text }}
            >
              • {skill}
            </div>
          ))}
      </div>
    ) : (
      <div className="space-y-3">
        {resume.skills.map((category, index) => (
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
        ))}
      </div>
    );

  return (
    <section
      className={isSplit ? "grid grid-cols-4 gap-6" : ""}
      style={{
        marginTop: theme.section.spacing,
        paddingBottom: theme.section.divider ? "16px" : "0",
        borderBottom: theme.section.divider ? `1px solid #e5e7eb` : "none",
      }}
    >
      {isSplit ? (
        <>
          <div className="col-span-1">{title}</div>
          <div className="col-span-3">{content}</div>
        </>
      ) : (
        <>
          <div
            className={`pb-1 ${theme.section.divider ? "border-b" : ""}`}
            style={{ borderColor: theme.colors.muted }}
          >
            {title}
          </div>
          <div className="mt-3">{content}</div>
        </>
      )}
    </section>
  );
}
