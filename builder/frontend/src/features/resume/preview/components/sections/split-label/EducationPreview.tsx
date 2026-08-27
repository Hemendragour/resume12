import { useResumeStore } from "../../../../../../store/resume.store";
import { splitLabelTheme as theme } from "../../../themes/split-label.theme";

export default function EducationPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  if (!resume.education.length) return null;

  const educationSection = resume.sections.find((s) => s.id === "education");
  const isSplit = theme.section.layout === "split";

  const title = (
    <h2
      className={`text-[12px] font-semibold ${theme.section.uppercase ? "uppercase" : ""}`}
      style={{ color: theme.colors.text }}
    >
      {educationSection?.displayTitle?.trim() ||
        educationSection?.title ||
        "Education"}
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
        {resume.education.map((edu, index) => (
          <div key={index}>
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
                  {edu.startYear} –{" "}
                  {edu.current ? "Present" : ` ${edu.endYear}`}
                </span>
              )}
            </div>
            <div className="flex justify-between">
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
    </section>
  );
}
