import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { HarvardATSTheme as T } from "../theme.harvard-ats";

export default function ProjectsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const projects = resume.projects ?? [];

  if (!projects.length) return null;

  const section = resume.sections.find(
    (section) => section.type === "projects"
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

      <div className={T.project.container}>
        {projects.map((project, index) => (
          <div key={index}>
            {/* Header */}
            <div className={T.layout.between}>
              <div>
                <h3
                  className={`
                    ${T.fontSize.itemTitle}
                    ${T.fontWeight.bold}
                    ${T.colors.heading}
                  `}
                >
                  {project.title}
                </h3>

                {project.role && (
                  <p
                    className={`
                      ${T.fontSize.itemSubtitle}
                      italic
                      ${T.colors.body}
                    `}
                  >
                    {project.role}
                  </p>
                )}

                {project.technologies.length > 0 && (
                  <p
                    className={`
                      ${T.fontSize.body}
                      ${T.colors.body}
                    `}
                  >
                    <span className={T.fontWeight.bold}>Tech:</span>{" "}
                    {project.technologies.join(", ")}
                  </p>
                )}
              </div>

              <div className="text-right">
                <p
                  className={`
                    ${T.fontSize.date}
                    ${T.colors.muted}
                  `}
                >
                  {project.startDate} -{" "}
                  {project.currentlyWorking
                    ? "Present"
                    : project.endDate || "Present"}
                </p>
                {/* Links */}
            {(project.github || project.link) && (
              <div
                className={`
                  flex
                  gap-4
                  ${T.spacing.itemHeader}
                  ${T.fontSize.body}
                `}
              >
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

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className={T.links.default}
                  >
                    Live Demo
                  </a>
                )}
              </div>
            )}
              </div>
            </div>

            {/* Description */}
            {/* {project.description && (
              <p
                className={`
                  ${T.spacing.itemHeader}
                  ${T.fontSize.body}
                  ${T.lineHeight.body}
                  ${T.colors.body}
                  whitespace-pre-line
                `}
              >
                {project.description}
              </p>
            )}
            
            
            */}


            {project.description && (
  <ul
    className={`
      ${T.spacing.itemHeader}
      ${T.fontSize.body}
      ${T.lineHeight.body}
      ${T.colors.body}
      list-disc pl-5
    `}
  >
    {project.description
      .split("\n")
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