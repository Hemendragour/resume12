import { FolderKanban } from "lucide-react";

import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../../shared/professional-modern/SectionHeader";

import { ProfessionalModernTheme as T } from "../../theme.professional-modern";

export default function ProjectsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const projects = resume.projects ?? [];
  const projectSection = resume.sections.find(
  (section) => section.id === "projects"
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
            <h3 className={`font-semibold ${T.fontSize.itemTitle} ${T.colors.heading}`}>
              {project.title}
            </h3>

            <p className={`${T.fontSize.date} ${T.colors.muted}`}>
              {project.startDate} - {project.currentlyWorking ? "Present" : project.endDate}
            </p>

            <p className={`mt-2 ${T.fontSize.body} ${T.colors.body}`}>
              {project.description}
            </p>

            {project.technologies.length > 0 && (
              <p className={`mt-2 ${T.fontSize.body} ${T.colors.body}`}>
                <strong>Tech:</strong> {project.technologies.join(", ")}
              </p>
            )}

            {project.github && (
              <p className={`${T.fontSize.body} text-blue-600`}>
                GitHub : {project.github}
              </p>
            )}

            {project.link && (
              <p className={`${T.fontSize.body} text-blue-600`}>
                Live : {project.link}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}