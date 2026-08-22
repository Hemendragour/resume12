import { useResumeStore } from "../../../../../store/resume.store";
import { useTheme } from "../../themes/ThemeProvider";

export default function ProjectsPreview() {
  const resume = useResumeStore((state) => state.resume);
  const theme = useTheme();

  if (!resume || resume.projects.length === 0) return null;

  return (
    <section style={{ marginTop: theme.section.spacing }}>
      <h2
        className={`pb-1 text-[13px] font-bold tracking-wide ${
          theme.section.uppercase ? "uppercase" : ""
        } ${theme.section.divider ? "border-b" : ""}`}
        style={{ color: theme.colors.primary, borderColor: theme.colors.muted }}
      >
        Projects
      </h2>

      <div className="mt-2 space-y-4">
        {resume.projects.map((project, index) => {
          const bullets = project.description
            .split("\n")
            .map((item) => item.replace(/^•\s*/, "").trim())
            .filter(Boolean);

          return (
            <div key={index} className="break-inside-avoid">
              <div className="flex items-start justify-between gap-4">
                <h3
                  className="text-[12px] font-bold leading-tight"
                  style={{ color: theme.colors.secondary }}
                >
                  {project.title}
                </h3>

                <div className="flex flex-col items-end shrink-0">
                  {theme.projects.dateRight && (
                    <span
                      className="text-[11px]"
                      style={{ color: theme.colors.muted }}
                    >
                      {project.startDate} –{" "}
                      {project.currentlyWorking ? "Present" : project.endDate}
                    </span>
                  )}

                  {(project.link || project.github) && (
                    <div className="mt-1.5 flex gap-3 text-[11px] whitespace-nowrap">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium hover:underline"
                          style={{ color: theme.colors.primary }}
                        >
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium hover:underline"
                          style={{ color: theme.colors.primary }}
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {theme.projects.technologiesInline &&
                project.technologies?.length > 0 && (
                  <p
                    className="mt-1 text-[11px]"
                    style={{ color: theme.colors.muted }}
                  >
                    {project.technologies.join(" • ")}
                  </p>
                )}

              {theme.projects.bullets && bullets.length > 0 && (
                <ul
                  className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4"
                  style={{ color: theme.colors.text }}
                >
                  {bullets.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
