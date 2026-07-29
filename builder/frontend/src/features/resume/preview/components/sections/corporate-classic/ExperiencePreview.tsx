import { useResumeStore } from "../../../../../../store/resume.store";

export default function ExperiencePreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.experience.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="border-y border-slate-700 py-1 text-center text-[12px] font-bold uppercase tracking-[0.6px] text-slate-900">
        Professional Experience
      </h2>

      <div className="mt-3 space-y-4">
        {resume.experience.map((exp, index) => (
          <div key={index} className="flex justify-between gap-6">
            <div className="flex-1">
              <p className="text-[12px] font-bold text-slate-900">
                {exp.company}
              </p>
              {exp.position && (
                <p className="text-[11px] italic text-slate-700">
                  {exp.position}
                </p>
              )}
              {exp.responsibilities.length > 0 && (
                <ul className="mt-1.5 space-y-0.5 text-[11px] leading-5 text-slate-700">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {exp.achievements?.length ? (
                <ul className="mt-1.5 space-y-0.5 text-[11px] leading-5 text-slate-700">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="whitespace-nowrap text-right text-[11px] text-slate-600">
              <p>{exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}</p>
              {exp.location && <p>{exp.location}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}