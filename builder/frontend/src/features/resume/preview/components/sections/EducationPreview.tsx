import { useResumeStore } from "../../../../../store/resume.store";
import { formatMonthYear } from "../../../editor/utils/formatDate";
import { useTheme } from "../../themes/ThemeProvider";

export default function EducationPreview() {
  const resume = useResumeStore((state) => state.resume);
  const theme = useTheme();

  if (!resume) return null;

  return (
    <section style={{ marginTop: theme.section.spacing }}>
      <h2
        className={`pb-1 text-[13px] font-bold tracking-wide ${
          theme.section.uppercase ? "uppercase" : ""
        } ${theme.section.divider ? "border-b" : ""}`}
        style={{ color: theme.colors.primary, borderColor: theme.colors.muted }}
      >
        Education
      </h2>

      {resume.education.length === 0 ? (
        <p className="mt-3 text-[11px]" style={{ color: theme.colors.muted }}>
          No education added.
        </p>
      ) : (
        <div className="mt-2 space-y-4">
          {resume.education.map((edu, index) => (
            <div key={index}>
              {/* Institution + Date range */}
              <div className="flex justify-between">
                <h3
                  className="text-[12px] font-bold"
                  style={{ color: theme.colors.secondary }}
                >
                  {edu.institution}
                </h3>

                {theme.education.dateRight && (
                  <span
                    className="text-[11px]"
                    style={{ color: theme.colors.muted }}
                  >
                    {formatMonthYear(edu.startMonth)} {edu.startYear} –{" "}
                    {edu.current
                      ? "Present"
                      : `${formatMonthYear(edu.endMonth)} ${edu.endYear}`}
                  </span>
                )}
              </div>

              {/* Degree + Field, CGPA on the right */}
              <div className="mt-0.5 flex justify-between">
                <p className="text-[11px]" style={{ color: theme.colors.text }}>
                  {edu.degree}
                  {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                </p>

                {edu.cgpa && (
                  <span
                    className="text-[11px]"
                    style={{ color: theme.colors.text }}
                  >
                    CGPA: {edu.cgpa}
                  </span>
                )}
              </div>

              {/* Relevant Coursework */}
              {edu.coursework && (
                <p
                  className="mt-1 text-[11px]"
                  style={{ color: theme.colors.text }}
                >
                  <span className="font-semibold">Relevant Coursework:</span>{" "}
                  {edu.coursework}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
