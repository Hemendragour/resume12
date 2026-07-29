import { useResumeStore } from "../../../../../../store/resume.store";
import { ExecutiveBlueTheme as T } from "../../theme.executive-blue";

function formatMonthYear(value?: string) {
  if (!value) return "";
  const [year, month] = value.split("-");
  if (!year || !month) return value;

  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function ProjectsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  return (
    <section className="mt-5">
      <h2
        className={`border-b ${T.colors.sectionBorder} pb-1 ${T.fontSize.sectionHeader} font-bold uppercase tracking-wide ${T.colors.heading}`}
      >
        Projects
      </h2>

      {resume.projects.length === 0 ? (
        <p className={`mt-2 ${T.fontSize.body} ${T.colors.muted}`}>
          No projects added.
        </p>
      ) : (
        <div className="mt-3 space-y-3">
          {resume.projects.map((proj, index) => {
            const lines = (proj.description || "")
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean);

            const [introLine, ...bulletLines] = lines;

            return (
              <div key={index}>
                <div className="flex items-baseline justify-between">
             <p className={`${T.fontSize.itemTitle} font-bold ${T.colors.heading}`}>
  {proj.title}

  {proj.github && (
    <>
      <span className={T.colors.muted}> | </span>
      <a
        href={proj.github}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-normal ${T.colors.accent} underline`}
      >
        GitHub
      </a>
    </>
  )}

  {proj.link && (
    <>
      <span className={T.colors.muted}> | </span>
      <a
        href={proj.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-normal ${T.colors.accent} underline`}
      >
        Live Demo
      </a>
    </>
  )}
</p>
                  <span className={`${T.fontSize.date} ${T.colors.muted}`}>
                    {formatMonthYear(proj.startDate)} –{" "}
                    {proj.currentlyWorking
                      ? "Present"
                      : formatMonthYear(proj.endDate)}
                  </span>
                </div>

                {proj.technologies?.length > 0 && (
                  <p
                    className={`italic ${T.fontSize.itemSubtitle} ${T.colors.muted}`}
                  >
                    {proj.technologies.join(", ")}
                  </p>
                )}

                {introLine && (
                  <p className={`italic ${T.fontSize.body} ${T.colors.body}`}>
                    {introLine}
                  </p>
                )}

                {bulletLines.length > 0 && (
                  <ul
                    className={`mt-1 space-y-0.5 pl-4 ${T.fontSize.body} leading-5 ${T.colors.body}`}
                  >
                    {bulletLines.map((line, i) => (
                      <li key={i} className="list-disc">
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
