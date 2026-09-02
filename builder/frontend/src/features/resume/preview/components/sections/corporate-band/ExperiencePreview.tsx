import { useResumeStore } from "../../../../../../store/resume.store";
import { formatMonthYear } from "../../../../editor/utils/formatDate";

export default function ExperiencePreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.experience.length === 0) return null;

  const experienceSection = resume.sections.find(
    (section) => section.id === "experience",
  );
  return (
    <section className="mt-5">
      <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
        {experienceSection?.displayTitle?.trim() ||
          experienceSection?.title ||
          "Experience"}
      </h2>

      <div className="mt-2 space-y-2">
        {resume.experience.map((exp, index) => (
          <div key={index}>
            <div className="flex items-start justify-between">
              <h3 className="text-[12px] font-bold text-slate-900">
                {exp.position}
              </h3>
              <span className="text-[11px] text-slate-600">
                {formatMonthYear(exp.startDate)} -{" "}
                {exp.currentlyWorking
                  ? "Present"
                  : formatMonthYear(exp.endDate)}
              </span>
            </div>
            <p className="text-[11px] italic text-slate-600 mt-[-5px]">
              {exp.company}
            </p>
            {exp.responsibilities.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4 text-slate-700">
                {exp.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {exp.achievements?.length ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4 text-slate-700">
                {exp.achievements.map((item, i) => (
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
