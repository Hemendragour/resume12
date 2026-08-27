import { useResumeStore } from "../../../../../../store/resume.store";
import { formatMonthYear } from "../../../../editor/utils/formatDate";
import { splitLabelTheme as theme } from "../../../themes/split-label.theme";

export default function ExperiencePreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  if (!resume.experience.length) return null;

  const experienceSection = resume.sections.find((s) => s.id === "experience");
  const isSplit = theme.section.layout === "split";

  const title = (
    <h2
      className={`text-[12px] font-semibold ${theme.section.uppercase ? "uppercase" : ""}`}
      style={{ color: theme.colors.text }}
    >
      {experienceSection?.displayTitle?.trim() ||
        experienceSection?.title ||
        "Work Experience"}
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

      <div className={isSplit ? "col-span-3 space-y-4" : "mt-3 space-y-4"}>
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
                  {formatMonthYear(exp.startDate)} –{" "}
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
    </section>
  );
}
