import { FolderKanban } from "lucide-react";

import { useResumeStore } from "../../../../../../store/resume.store";
import SectionHeader from "../../shared/professional-modern/SectionHeader";
import { ProfessionalModernTheme as T } from "../../theme.professional-modern";
import { formatMonthYear } from "../../../../editor/utils/formatDate";

export default function ProjectsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const projects = resume.projects ?? [];
  const projectSection = resume.sections.find(
    (section) => section.id === "projects",
  );

  if (projects.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          projectSection?.displayTitle?.trim() ||
          projectSection?.title ||
          "Projects"
        }
        icon={<FolderKanban size={16} />}
      />

      <div className="mt-3 space-y-6">
        {projects.map((project, index) => (
          <div key={index}>
            {/* Title row: title + links on the left, date pinned to the far right */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3
                  className={`font-semibold ${T.fontSize.itemTitle} ${T.colors.heading}`}
                >
                  {project.title}
                </h3>

                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`${T.fontSize.date} text-blue-600 hover:underline`}
                  >
                    Live
                  </a>
                ) : null}

                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className={`${T.fontSize.date} text-blue-600 hover:underline`}
                  >
                    GitHub
                  </a>
                ) : null}
              </div>

              <span
                className={`shrink-0 whitespace-nowrap ${T.fontSize.date} ${T.colors.muted}`}
              >
                {formatMonthYear(project.startDate)} -{" "}
                {project.currentlyWorking
                  ? "Present"
                  : formatMonthYear(project.endDate)}
              </span>
            </div>

            {/* Technologies directly under the title */}
            {project.technologies.length > 0 ? (
              <p className={`mt-1 ${T.fontSize.body} ${T.colors.body}`}>
                <strong>Tech:</strong> {project.technologies.join(", ")}
              </p>
            ) : null}

            {/* Description bullets */}
            {project.description?.length > 0 ? (
              <ul
                className={`mt-2 list-disc pl-5 ${T.fontSize.body} ${T.colors.body}`}
              >
                {project.description.map((item, i) => (
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
