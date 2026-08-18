import { useResumeStore } from "../../../../../../store/resume.store";
import { ExecutiveBlueTheme as T } from "../../theme.executive-blue";

export default function ExperiencePreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  const experienceSection = resume.sections.find(
    (section) => section.id === "experience",
  );
  return (
    <section className="mt-5">
      <h2
        className={`border-b ${T.colors.sectionBorder} pb-1 ${T.fontSize.sectionHeader} font-bold uppercase tracking-wide ${T.colors.heading}`}
      >
        {experienceSection?.displayTitle?.trim() ||
          experienceSection?.title ||
          "Professional Experience"}
      </h2>

      {resume.experience.length === 0 ? (
        <p className={`mt-2 ${T.fontSize.body} ${T.colors.muted}`}>
          No experience added.
        </p>
      ) : (
        <div className="mt-3 space-y-3">
          {resume.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex items-baseline justify-between">
                <p
                  className={`${T.fontSize.itemTitle} font-bold ${T.colors.heading}`}
                >
                  {exp.position} {exp.company && <span>| {exp.company}</span>}
                </p>
                <span className={`${T.fontSize.date} ${T.colors.muted}`}>
                  {exp.startDate} -{" "}
                  {exp.currentlyWorking ? "Present" : exp.endDate}
                </span>
              </div>
              {exp.location && (
                <p
                  className={`italic ${T.fontSize.itemSubtitle} ${T.colors.muted}`}
                >
                  {exp.location}
                </p>
              )}

              {exp.responsibilities.length > 0 && (
                <ul
                  className={`mt-1 space-y-0.5 pl-4 ${T.fontSize.body} leading-5 ${T.colors.body}`}
                >
                  {exp.responsibilities.map((item, i) => (
                    <li key={i} className="list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {exp.achievements?.length ? (
                <ul
                  className={`mt-1 space-y-0.5 pl-4 ${T.fontSize.body} leading-5 ${T.colors.body}`}
                >
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
