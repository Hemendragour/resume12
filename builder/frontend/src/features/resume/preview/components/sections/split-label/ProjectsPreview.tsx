import { useResumeStore } from "../../../../../../store/resume.store";
import { formatMonthYear } from "../../../../editor/utils/formatDate";
import { splitLabelTheme as theme } from "../../../themes/split-label.theme";

export default function ProjectsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  if (!resume.projects.length) return null;

  const projectSection = resume.sections.find((s) => s.id === "projects");
  const isSplit = theme.section.layout === "split";

  const title = (
    <h2
      className={
        "text-[12px] font-semibold " +
        (theme.section.uppercase ? "uppercase" : "")
      }
      style={{ color: theme.colors.text }}
    >
      {projectSection?.displayTitle?.trim() ||
        projectSection?.title ||
        "Projects"}
    </h2>
  );

  return (
    <section
      className={isSplit ? "grid grid-cols-4 gap-6" : ""}
      style={{
        marginTop: theme.section.spacing,
        paddingBottom: theme.section.divider ? "16px" : "0",
        borderBottom: theme.section.divider
          ? "1px solid " + theme.colors.muted + "33"
          : "none",
      }}
    >
      {isSplit ? <div className="col-span-1">{title}</div> : title}

      <div className={isSplit ? "col-span-3 space-y-4" : "mt-3 space-y-4"}>
        {resume.projects.map(function renderProject(project, index) {
          const bullets = project.description
            .map(function stripBullet(item) {
              return item.replace(/^-\s*/, "").trim();
            })
            .filter(Boolean);

          const dateLabel = project.currentlyWorking
            ? "Present"
            : project.endDate;

          const hasLinks = Boolean(project.link) || Boolean(project.github);
          const hasTech =
            theme.projects.technologiesInline &&
            Boolean(project.technologies) &&
            project.technologies.length > 0;
          const hasBullets = theme.projects.bullets && bullets.length > 0;

          return (
            <div key={index}>
              <div className="flex items-start justify-between gap-4">
                <h3
                  className="text-[12px] font-bold"
                  style={{ color: theme.colors.secondary }}
                >
                  {project.title}
                </h3>

                <div className="flex flex-col items-end shrink-0">
                  {theme.projects.dateRight ? (
                    <span
                      className="text-[11px]"
                      style={{ color: theme.colors.muted }}
                    >
                      {formatMonthYear(project.startDate)} -{" "}
                      {formatMonthYear(dateLabel)}
                    </span>
                  ) : null}

                  {hasLinks ? (
                    <div
                      className={
                        "flex gap-3 text-[11px] " +
                        (theme.projects.linksBelowDate ? "mt-1" : "")
                      }
                    >
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                          style={{ color: theme.colors.primary }}
                        >
                          Live Demo
                        </a>
                      ) : null}
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                          style={{ color: theme.colors.primary }}
                        >
                          GitHub
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>

              {hasTech ? (
                <p
                  className="mt-1 text-[11px]"
                  style={{ color: theme.colors.muted }}
                >
                  {project.technologies.join(", ")}
                </p>
              ) : null}

              {hasBullets ? (
                <ul
                  className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4"
                  style={{ color: theme.colors.text }}
                >
                  {bullets.map(function renderBullet(item, i) {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
