import { useResumeStore } from "../../../../../../store/resume.store";

export default function InternshipPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  return (
    <section className="mt-5">
      <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
        Internships
      </h2>

      {resume.internships.length === 0 ? (
        <p className="mt-3 text-[11px] text-slate-500">No internships added.</p>
      ) : (
        <div className="mt-0.5 space-y-2">
          {resume.internships.map((intern, index) => (
            <div key={index}>
              <div className="flex items-start justify-between">
                <h3 className="text-[12px] font-bold text-slate-900">
                  {intern.role}
                </h3>
                <span className="text-[11px] text-slate-600">
                  {intern.startDate} -{" "}
                  {intern.currentlyInterning ? "Present" : intern.endDate}
                </span>
              </div>
              <p className="text-[11px] italic text-slate-600 mt-[-5px]">
                {intern.company}
              </p>
              {intern.responsibilities.length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4 text-slate-700">
                  {intern.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {intern.achievements?.length ? (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4 text-slate-700">
                  {intern.achievements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}