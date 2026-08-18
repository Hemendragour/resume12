import { useResumeStore } from "../../../../../../store/resume.store";

export default function ExperiencePreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || resume.experience.length === 0) return null;
  const experienceSection = resume.sections.find(
    (section) => section.id === "experience",
  );
  return (
    <section className="mt-6">
      <h2 className="mb-3 border-b border-slate-700 pb-1 text-[13px] font-bold uppercase tracking-[0.6px] text-black">
        {experienceSection?.displayTitle?.trim() ||
          experienceSection?.title ||
          "Professional Experience"}
      </h2>

      <div className="space-y-5">
        {resume.experience.map((exp, index) => (
          <div key={index}>
            {/* Company + Position + Date */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <p className="text-[12px] text-black">
                  <span className="font-bold">{exp.company}</span>

                  {exp.position && (
                    <span className="italic font-normal text-slate-700">
                      , {exp.position}
                    </span>
                  )}
                </p>
              </div>

              <div className="whitespace-nowrap text-right text-[11px] text-slate-700">
                {exp.startDate} –{" "}
                {exp.currentlyWorking ? "Present" : exp.endDate}
                {exp.location && <> | {exp.location}</>}
              </div>
            </div>

            {/* Responsibilities */}
            {exp.responsibilities?.length > 0 && (
              <ul className="mt-1.5 space-y-1 text-[11.5px] leading-[1.55] text-slate-800">
                {exp.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 mt-[2px]">-</span>
                    <span className="flex-1 text-justify">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Achievements */}
            {exp.achievements?.length ? (
              <ul className="mt-1.5 space-y-1 text-[11.5px] leading-[1.55] text-slate-800">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 mt-[2px]">-</span>
                    <span className="flex-1 text-justify">{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
