import { useResumeStore } from "../../../../../../store/resume.store";
import { formatMonthYear } from "../../../../editor/utils/formatDate";

import SectionHeader from "../shared/SectionHeader";
import { LatexATSPhotoTheme as T } from "../theme.latex-ats-photo";

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

      <div className={`${T.spacing.itemHeader} ${T.project.container}`}>
        {projects.map((project, index) => (
          <div key={index}>
            {/* Title | tech stack | links — one row, date on the right,
                mirroring \resumeProjectHeading{Title $|$ {Tech} $|$ {Links}}{Date} */}
            <div className={T.project.header}>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3
                  className={`
                    ${T.fontSize.itemTitle}
                    ${T.fontWeight.bold}
                    ${T.colors.heading}
                  `}
                >
                  {project.title}
                </h3>

                {project.technologies.length > 0 && (
                  <>
                    <span className={T.colors.muted}>|</span>
                    <span className={`${T.fontSize.body} ${T.colors.body}`}>
                      {project.technologies.join(", ")}
                    </span>
                  </>
                )}

                {(project.github || project.link) && (
                  <>
                    <span className={T.colors.muted}>|</span>
                    <span className={`${T.project.links} ${T.fontSize.body}`}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className={T.links.default}
                        >
                          GitHub
                        </a>
                      )}
                      {project.github && project.link && <span>|</span>}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className={T.links.default}
                        >
                          Live
                        </a>
                      )}
                    </span>
                  </>
                )}
              </div>

              <p
                className={`
                  ${T.fontSize.date}
                  ${T.fontWeight.bold}
                  ${T.colors.muted}
                  shrink-0
                `}
              >
                {formatMonthYear(project.startDate)}
                {project.startDate &&
                  (project.currentlyWorking || project.endDate) &&
                  " - "}
                {project.currentlyWorking
                  ? "Present"
                  : formatMonthYear(project.endDate)}
              </p>
            </div>

            {project.description && (
              <ul
                className={`
                  ${T.list.bullet}
                  ${T.spacing.itemHeader}
                  ${T.spacing.bullet}
                  ${T.fontSize.body}
                  ${T.lineHeight.body}
                  ${T.colors.body}
                `}
              >
                {project.description
                  .filter((line) => line.trim() !== "")
                  .map((line, index) => (
                    <li key={index}>{line.replace(/^•\s*/, "")}</li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
