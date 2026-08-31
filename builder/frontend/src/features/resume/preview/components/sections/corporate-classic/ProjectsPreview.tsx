import { useResumeStore } from "../../../../../../store/resume.store";
import { formatMonthYear } from "../../../../editor/utils/formatDate";

export default function ProjectsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.projects.length === 0) return null;

  const projectsSection = resume.sections.find(
    (section) => section.id === "projects",
  );

  return (
    <section className="mt-6">
      <h2 className="border-y border-slate-700 py-1 text-center text-[12px] font-bold uppercase tracking-[0.6px] text-slate-900">
        {projectsSection?.displayTitle?.trim() ||
          projectsSection?.title ||
          "Projects"}
      </h2>

      <div className="mt-3 space-y-4">
        {resume.projects.map((proj, index) => {
          const bullets = (proj.description || [])
            .map((line) => line.trim())
            .filter(Boolean);

          const hasLinks = Boolean(proj.link) || Boolean(proj.github);

          return (
            <div key={index} className="flex justify-between gap-6">
              <div className="flex-1">
                <p className="text-[12px] font-bold text-slate-900">
                  {proj.title}
                </p>

                {proj.technologies?.length > 0 && (
                  <p className="text-[11px] italic text-slate-700">
                    {proj.technologies.join(", ")}
                  </p>
                )}

                {bullets.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5 text-[11px] leading-5 text-slate-700">
                    {bullets.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {hasLinks && (
                  <div className="mt-1.5 flex gap-3 text-[11px]">
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-700 underline hover:text-slate-900"
                      >
                        Live Demo
                      </a>
                    )}
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-700 underline hover:text-slate-900"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="whitespace-nowrap text-right text-[11px] text-slate-600">
                <p>
                  {formatMonthYear(proj.startDate)} –{" "}
                  {proj.currentlyWorking
                    ? "Present"
                    : formatMonthYear(proj.endDate)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
