import { useResumeStore } from "../../../../../../store/resume.store";
import { formatMonthYear } from "../../../../editor/utils/formatDate";

import SectionHeader from "../shared/SectionHeader";
import { ExecutiveSidebarTheme as T } from "../theme.executive-sidebar";

export default function ProjectsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const projects = resume.projects ?? [];

  if (!projects.length) return null;

  const section = resume.sections.find(
    (section) => section.type === "projects",
  );

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Projects"
        }
      />

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index}>
            <div className="flex justify-between items-start gap-3">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3
                  className={`${T.fontSize.itemTitle} ${T.fontWeight.bold} ${T.colors.heading}`}
                >
                  {project.title}
                </h3>
                {(project.github || project.link) && (
                  <span className={`${T.fontSize.small} flex gap-2`}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className={T.links.default}>
                        GitHub
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" className={T.links.default}>
                        Live
                      </a>
                    )}
                  </span>
                )}
              </div>

              <p className={`${T.fontSize.date} ${T.colors.muted} shrink-0 whitespace-nowrap`}>
                {formatMonthYear(project.startDate)}
                {project.startDate && (project.currentlyWorking || project.endDate) && " - "}
                {project.currentlyWorking ? "Present" : formatMonthYear(project.endDate)}
              </p>
            </div>

            {project.technologies.length > 0 && (
              <p className={`${T.fontSize.small} ${T.colors.muted} italic mt-0.5`}>
                {project.technologies.join(", ")}
              </p>
            )}

            {project.description && (
              <ul
                className={`
                  ${T.list.bullet}
                  ${T.spacing.bullet}
                  ${T.spacing.itemHeader}
                  ${T.fontSize.body}
                  ${T.lineHeight.body}
                  ${T.colors.body}
                `}
              >
                {project.description
                  .filter((line) => line.trim() !== "")
                  .map((line, i) => (
                    <li key={i}>{line.replace(/^•\s*/, "")}</li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
