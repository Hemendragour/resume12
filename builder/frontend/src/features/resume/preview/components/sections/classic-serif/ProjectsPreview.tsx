import { useResumeStore } from "../../../../../../store/resume.store";
import { formatMonthYear } from "../../../../editor/utils/formatDate";

export default function ProjectsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.projects.length === 0) return null;

  const projectSection = resume.sections.find(
    (section) => section.id === "projects",
  );

  return (
    <section className="mt-6">
      <h2 className="mb-3 border-b border-slate-700 pb-1 text-[13px] font-bold uppercase tracking-[0.6px] text-black">
        {projectSection?.displayTitle?.trim() ||
          projectSection?.title ||
          "Projects"}
      </h2>

      <div className="space-y-4">
        {resume.projects.map((proj, index) => {
          const bullets = (proj.description || [])
            .map((line) => line.trim())
            .filter(Boolean);

          const hasLinks = Boolean(proj.link) || Boolean(proj.github);

          return (
            <div key={index}>
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <p className="text-[12px] text-black">
                    <span className="font-bold">{proj.title}</span>
                  </p>
                  {proj.technologies?.length > 0 && (
                    <p className="italic text-[11px] text-slate-700">
                      {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>

                <div className="whitespace-nowrap text-right text-[11px] text-slate-700">
                  {formatMonthYear(proj.startDate)} –{" "}
                  {proj.currentlyWorking
                    ? "Present"
                    : formatMonthYear(proj.endDate)}
                </div>
              </div>

              {bullets.length > 0 && (
                <ul className="mt-1.5 space-y-1 text-[11.5px] leading-[1.55] text-slate-800">
                  {bullets.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 mt-[2px]">-</span>
                      <span className="flex-1 text-justify">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {hasLinks && (
                <div className="mt-1 flex gap-3 text-[11px]">
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 underline hover:text-black"
                    >
                      Live Demo
                    </a>
                  )}
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 underline hover:text-black"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
