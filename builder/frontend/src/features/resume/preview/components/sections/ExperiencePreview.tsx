import { useResumeStore } from "../../../../../store/resume.store";
import { formatMonthYear } from "../../../editor/utils/formatDate";
import { useTheme } from "../../themes/ThemeProvider";

export default function ExperiencePreview() {
  const resume = useResumeStore((state) => state.resume);
  const theme = useTheme();

  if (!resume) return null;
  if (!resume.experience.length) return null;
  const isSplit = theme.section.layout === "split";

  const title = (
    <h2
      className={`pb-1 text-[13px] font-bold tracking-wide ${
        theme.section.uppercase ? "uppercase" : ""
      } ${theme.section.divider ? "border-b" : ""}`}
      style={{ color: theme.colors.primary, borderColor: theme.colors.muted }}
    >
      Work Experience
    </h2>
  );

  const content =
    resume.experience.length === 0 ? (
      <p className="text-[11px]" style={{ color: theme.colors.muted }}>
        No experience added.
      </p>
    ) : (
      <div className="space-y-4">
        {resume.experience.map((exp, index) => (
          <div key={index}>
            <div className="flex items-start justify-between">
              <h3
                className="text-[12px] font-bold"
                style={{ color: theme.colors.secondary }}
              >
                {theme.experience.companyLeft
                  ? `${exp.company}${exp.position ? " - " + exp.position : ""}`
                  : exp.position}
              </h3>

              {theme.experience.dateRight && (
                <span
                  className="text-[11px]"
                  style={{ color: theme.colors.muted }}
                >
                  {formatMonthYear(exp.startDate)} -{" "}
                  {exp.currentlyWorking
                    ? "Present"
                    : formatMonthYear(exp.endDate)}
                </span>
              )}
            </div>

            {!theme.experience.companyLeft && (
              <p
                className={`text-[11px] ${theme.experience.roleItalic ? "italic" : ""}`}
                style={{ color: theme.colors.text }}
              >
                {exp.company}
              </p>
            )}

            {theme.experience.bullets && exp.responsibilities.length > 0 && (
              <ul
                className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4"
                style={{ color: theme.colors.text }}
              >
                {exp.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {theme.experience.bullets && exp.achievements?.length ? (
              <ul
                className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4"
                style={{ color: theme.colors.text }}
              >
                {exp.achievements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    );

  return (
    <section style={{ marginTop: theme.section.spacing }}>
      {isSplit ? (
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">{title}</div>
          <div className="col-span-3">{content}</div>
        </div>
      ) : (
        <>
          {title}
          <div className="mt-3">{content}</div>
        </>
      )}
    </section>
  );
}
