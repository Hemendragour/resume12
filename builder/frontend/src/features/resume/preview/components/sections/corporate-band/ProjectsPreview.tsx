import { useResumeStore } from "../../../../../../store/resume.store";

export default function ProjectsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.projects.length === 0) return null;
  const projectSection = resume.sections.find(
    (section) => section.id === "projects",
  );

  return (
    <section className="mt-5">
      <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
        {projectSection?.displayTitle?.trim() ||
          projectSection?.title ||
          "Projects"}
      </h2>

      <div className="mt-2 space-y-4">
        {resume.projects.map((project, index) => {
          const bullets = project.description
            .map((item) => item.replace(/^•\s*/, "").trim())
            .filter(Boolean);

          return (
            <div key={index}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[12px] font-bold text-slate-900">
                  {project.title}
                </h3>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[11px] text-slate-600">
                    {project.startDate} –{" "}
                    {project.currentlyWorking ? "Present" : project.endDate}
                  </span>
                  {(project.link || project.github) && (
                    <div className="mt-1 flex gap-3 text-[11px]">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-700 hover:underline"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-700 hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {project.technologies?.length > 0 && (
                <p className="mt-1 text-[11px] text-slate-600">
                  {project.technologies.join(" • ")}
                </p>
              )}

              {bullets.length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4 text-slate-700">
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
